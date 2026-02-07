import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/hooks/use-toast'
import imageCompression from 'browser-image-compression'
import './AdminDashboard.css'

interface GalleryFolder {
  id: number
  name: string
  description: string
  created_at: string
  images: GalleryImage[]
}

interface GalleryImage {
  id: number
  folder_id: number
  title: string
  image_url: string
  created_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [folders, setFolders] = useState<GalleryFolder[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'success' })
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [folderName, setFolderName] = useState('')
  const [folderDescription, setFolderDescription] = useState('')
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    loadGallery()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
      } else {
        setUser(user)
      }
    } catch (error) {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: 'success' }), 5000)
  }

  const loadGallery = async () => {
    try {
      // Fetch folders with their images
      const { data: foldersData, error: foldersError } = await supabase
        .from('gallery_folders')
        .select('*')
        .order('created_at', { ascending: false })

      if (foldersError) {
        console.error('Error loading folders:', foldersError)
        return
      }

      if (foldersData && foldersData.length > 0) {
        // Fetch images for each folder
        const foldersWithImages = await Promise.all(
          foldersData.map(async (folder) => {
            const { data: images, error: imagesError } = await supabase
              .from('gallery_images')
              .select('*')
              .eq('folder_id', folder.id)
              .order('created_at', { ascending: false })

            if (imagesError) {
              console.error('Error loading images for folder:', folder.id, imagesError)
              return { ...folder, images: [] }
            }

            return { ...folder, images: images || [] }
          })
        )

        setFolders(foldersWithImages)
      } else {
        setFolders([])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!folderName.trim()) {
      showMessage('Masukkan nama folder!', 'error')
      return
    }

    try {
      const { error } = await supabase
        .from('gallery_folders')
        .insert([{
          name: folderName.trim(),
          description: folderDescription.trim()
        }])

      if (error) {
        showMessage('Gagal membuat folder: ' + error.message, 'error')
      } else {
        showMessage('Folder berhasil dibuat!', 'success')
        setFolderName('')
        setFolderDescription('')
        loadGallery()
      }
    } catch (error: any) {
      showMessage('Error: ' + error.message, 'error')
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFolderId) {
      showMessage('Pilih folder dulu!', 'error')
      return
    }

    if (!imageFiles || imageFiles.length === 0) {
      showMessage('Pilih gambar dulu!', 'error')
      return
    }

    setUploading(true)
    let successCount = 0
    let errorCount = 0

    try {
      // Upload each file
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]

        try {
          // 1. Proses Kompresi
          console.log('Sedang mengompres gambar:', file.name)
          const options = {
            maxSizeMB: 0.2,          // Target ukuran (200KB)
            maxWidthOrHeight: 1280, // Resolusi maksimal
            useWebWorker: true,
            fileType: 'image/webp'  // Mengubah format ke WebP agar lebih ringan
          }
          const compressedFile = await imageCompression(file, options)
          console.log(`Ukuran awal: ${(file.size / 1024 / 1024).toFixed(2)} MB`)
          console.log(`Ukuran akhir: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`)

          // 2. Upload ke Storage
          const fileName = `img_${Date.now()}_${i}_${compressedFile.name}`
          const { error: uploadError } = await supabase.storage
            .from('gallery-images')
            .upload(fileName, compressedFile)

          if (uploadError) {
            console.error('Upload error for file:', compressedFile.name, uploadError)
            errorCount++
            continue
          }

          // 3. Dapatkan Public URL
          const urlData = supabase.storage
            .from('gallery-images')
            .getPublicUrl(fileName)

          const publicUrl = urlData.data.publicUrl

          // 4. Simpan ke Database
          const { error: dbError } = await supabase
            .from('gallery_images')
            .insert([{
              folder_id: selectedFolderId,
              title: compressedFile.name.split('.')[0], // Use compressed filename as title
              image_url: publicUrl
            }])

          if (dbError) {
            console.error('Database error for file:', compressedFile.name, dbError)
            errorCount++
          } else {
            successCount++
          }
        } catch (fileError: any) {
          console.error('Error processing file:', file.name, fileError)
          errorCount++
        }
      }

      // Show result message
      if (successCount > 0 && errorCount === 0) {
        showMessage(`Berhasil upload ${successCount} gambar!`, 'success')
        // Show toast notification for successful upload
        toast({
          title: "✅ Upload Berhasil!",
          description: `${successCount} gambar berhasil diupload ke galeri.`,
          duration: 5000,
        })
      } else if (successCount > 0 && errorCount > 0) {
        showMessage(`Berhasil upload ${successCount} gambar, ${errorCount} gagal.`, 'error')
        // Show toast notification for partial success
        toast({
          title: "⚠️ Upload Sebagian Berhasil",
          description: `${successCount} gambar berhasil, ${errorCount} gambar gagal diupload.`,
          duration: 5000,
        })
      } else {
        showMessage('Gagal upload semua gambar.', 'error')
      }

      // Reset form
      setImageFiles(null)
      const fileInput = document.getElementById('imageInput') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      // Reload gallery if any uploads succeeded
      if (successCount > 0) {
        loadGallery()
      }

    } catch (error: any) {
      showMessage('Error: ' + error.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (id: number, imageUrl: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus gambar ini?')) return

    try {
      const fileName = imageUrl.split('/').pop()

      if (fileName) {
        const { error: deleteError } = await supabase.storage
          .from('gallery-images')
          .remove([fileName])

        if (deleteError) {
          showMessage('Gagal menghapus file: ' + deleteError.message, 'error')
          return
        }
      }

      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

      if (dbError) {
        showMessage('Gagal menghapus dari database: ' + dbError.message, 'error')
      } else {
        showMessage('Gambar berhasil dihapus!', 'success')
        loadGallery()
      }
    } catch (error: any) {
      showMessage('Error: ' + error.message, 'error')
    }
  }

  const deleteFolder = async (folderId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus folder ini? Semua gambar di dalam folder akan ikut terhapus.')) return

    try {
      const { error } = await supabase
        .from('gallery_folders')
        .delete()
        .eq('id', folderId)

      if (error) {
        showMessage('Gagal menghapus folder: ' + error.message, 'error')
      } else {
        showMessage('Folder berhasil dihapus!', 'success')
        loadGallery()
      }
    } catch (error: any) {
      showMessage('Error: ' + error.message, 'error')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return <div className="admin-container"><p className="loading">Loading...</p></div>
  }

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Admin Dashboard - Upload Galeri</h1>
        <div className="header-buttons">
          <Link to="/">
            <button className="home-btn">← Kembali ke Beranda</button>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type} show`}>
          {message.text}
        </div>
      )}

      {/* Folder Creation Section */}
      <div className="folder-section">
        <h2>Buat Folder Baru</h2>
        <form onSubmit={handleCreateFolder}>
          <div className="form-group">
            <label htmlFor="folderName">Nama Folder:</label>
            <input
              type="text"
              id="folderName"
              placeholder="Masukkan nama folder"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="folderDescription">Deskripsi Folder (Opsional):</label>
            <textarea
              id="folderDescription"
              placeholder="Masukkan deskripsi folder"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              rows={3}
            />
          </div>

          <button type="submit" className="create-btn">
            Buat Folder
          </button>
        </form>
      </div>

      {/* Image Upload Section */}
      <div className="upload-section">
        <h2>Upload Gambar ke Folder</h2>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label htmlFor="folderSelect">Pilih Folder:</label>
            <select
              id="folderSelect"
              value={selectedFolderId || ''}
              onChange={(e) => setSelectedFolderId(e.target.value ? parseInt(e.target.value) : null)}
              required
            >
              <option value="">-- Pilih Folder --</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name} ({folder.images.length} gambar)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imageInput">Pilih Gambar (Bisa multiple):</label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
              required
            />
            {imageFiles && imageFiles.length > 0 && (
              <p className="file-count">{imageFiles.length} file(s) dipilih</p>
            )}
          </div>

          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload ke Folder'}
          </button>
        </form>
      </div>

      <div className="gallery-section">
        <h2>Kelola Folder dan Gambar</h2>
        {folders.length === 0 ? (
          <p className="loading">Belum ada folder di galeri</p>
        ) : (
          <div className="folders-grid">
            {folders.map((folder) => (
              <div key={folder.id} className="folder-card">
                <div className="folder-header">
                  <h3>{folder.name}</h3>
                  <button
                    className="delete-folder-btn"
                    onClick={() => deleteFolder(folder.id)}
                    title="Hapus folder"
                  >
                    🗑️
                  </button>
                </div>

                {folder.description && (
                  <p className="folder-description">{folder.description}</p>
                )}

                <p className="folder-stats">
                  {folder.images.length} gambar • Dibuat {new Date(folder.created_at).toLocaleDateString('id-ID')}
                </p>

                <div className="folder-images">
                  {folder.images.length === 0 ? (
                    <p className="no-images">Belum ada gambar di folder ini</p>
                  ) : (
                    <div className="images-grid">
                      {folder.images.map((image) => (
                        <div key={image.id} className="image-item">
                          <img src={image.image_url} alt={image.title} />
                          <div className="image-overlay">
                            <p className="image-title">{image.title}</p>
                            <button
                              className="delete-image-btn"
                              onClick={() => deleteImage(image.id, image.image_url)}
                              title="Hapus gambar"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
