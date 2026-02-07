import { useState, useEffect } from "react";
import headerBg from "@/assets/header-bg.png";
import { supabase } from "@/lib/supabaseClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface GalleryFolder {
  id: number;
  name: string;
  description: string;
  created_at: string;
  images: GalleryImage[];
}

interface GalleryImage {
  id: number;
  folder_id: number;
  title: string;
  image_url: string;
  created_at: string;
}

const Gallery = () => {
  const [galleryFolders, setGalleryFolders] = useState<GalleryFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<GalleryFolder | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      // Fetch folders with their images
      const { data: folders, error: foldersError } = await supabase
        .from('gallery_folders')
        .select('*')
        .order('created_at', { ascending: false });

      if (foldersError) {
        console.error('Error loading folders:', foldersError);
        setLoading(false);
        return;
      }

      if (folders && folders.length > 0) {
        // Fetch images for each folder
        const foldersWithImages = await Promise.all(
          folders.map(async (folder) => {
            const { data: images, error: imagesError } = await supabase
              .from('gallery_images')
              .select('*')
              .eq('folder_id', folder.id)
              .order('created_at', { ascending: false });

            if (imagesError) {
              console.error('Error loading images for folder:', folder.id, imagesError);
              return { ...folder, images: [] };
            }

            return { ...folder, images: images || [] };
          })
        );

        setGalleryFolders(foldersWithImages);
      } else {
        setGalleryFolders([]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedFolder || selectedFolder.images.length === 0) return;

    const currentImage = selectedFolder.images[selectedImageIndex];
    if (!currentImage) return;

    try {
      setDownloading(true);
      const response = await fetch(currentImage.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentImage.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setDownloading(false);
    }
  };

  const nextImage = () => {
    if (!selectedFolder) return;
    setSelectedImageIndex((prev) =>
      prev === selectedFolder.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedFolder) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedFolder.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <div
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4">
              Galeri Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Dokumentasi <span className="text-gradient">Kegiatan</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Dokumentasi berbagai kegiatan pelayanan dan pengabdian kesehatan masyarakat di Ponkesdes.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Memuat galeri...</p>
            </div>
          ) : galleryFolders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Belum ada folder di galeri</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryFolders.map((folder, index) => (
                <div
                  key={folder.id}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col bg-card border border-border/50 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setSelectedImageIndex(0);
                  }}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      {folder.images.length > 0 ? (
                        <img
                          src={folder.images[0].image_url}
                          alt={folder.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <p className="text-muted-foreground">Tidak ada gambar</p>
                        </div>
                      )}
                    </div>
                    {folder.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                        +{folder.images.length - 1}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-foreground font-bold text-xl mb-2">{folder.name}</h3>
                    {folder.description && (
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{folder.description}</p>
                    )}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {folder.images.length} gambar • {new Date(folder.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedFolder} onOpenChange={(open) => !open && setSelectedFolder(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 border-0">
          <div className="relative w-full h-full bg-black/95 rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedFolder(null)}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {selectedFolder && selectedFolder.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                >
                  ›
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="flex items-center justify-center min-h-[60vh] p-4">
              {selectedFolder && selectedFolder.images[selectedImageIndex] && (
                <img
                  src={selectedFolder.images[selectedImageIndex].image_url}
                  alt={selectedFolder.images[selectedImageIndex].title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {/* Thumbnails */}
            {selectedFolder && selectedFolder.images.length > 1 && (
              <div className="absolute bottom-20 left-0 right-0 p-4">
                <div className="flex justify-center gap-2 overflow-x-auto max-w-full">
                  {selectedFolder.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? 'border-white shadow-lg scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer with Info and Download Button */}
            <div className="bg-gradient-to-t from-black/80 to-transparent p-6 absolute bottom-0 left-0 right-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-bold text-xl">{selectedFolder?.name}</h3>
                {selectedFolder && (
                  <span className="text-white/70 text-sm">
                    {selectedImageIndex + 1} / {selectedFolder.images.length}
                  </span>
                )}
              </div>
              {selectedFolder && selectedFolder.images[selectedImageIndex] && (
                <>
                  <h4 className="text-white/90 font-medium text-lg mb-1">
                    {selectedFolder.images[selectedImageIndex].title}
                  </h4>
                  <p className="text-white/70 text-sm mb-4">
                    {new Date(selectedFolder.images[selectedImageIndex].created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </>
              )}
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-[#871C1C] hover:bg-[#6b1818] text-white w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                {downloading ? 'Mengunduh...' : 'Unduh Gambar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
