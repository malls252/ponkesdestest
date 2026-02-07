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
    <div className="pt-20 min-h-screen bg-background w-full">
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
                  className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 animate-fade-in flex flex-col bg-gradient-to-br from-card via-card/95 to-card/80 border border-border/20 cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:rotate-0.5"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setSelectedImageIndex(0);
                  }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                  </div>

                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {folder.images.length > 0 ? (
                        <>
                          <img
                            src={folder.images[0].image_url}
                            alt={folder.name}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110 group-hover:saturate-110"
                          />
                          {/* Multi-layer overlay effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center relative">
                          <div className="text-center relative z-10">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                              <svg className="w-10 h-10 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-muted-foreground font-semibold text-sm">Tidak ada gambar</p>
                          </div>
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
                          </div>
                        </div>
                      )}


                    </div>
                  </div>

                  <div className="p-7 relative z-20">
                    {/* Enhanced header with better spacing */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-foreground font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-500 flex-1 mr-3">
                        {folder.name}
                      </h3>
                      <div className="flex items-center gap-2 text-primary/70 group-hover:text-primary transition-colors duration-500 bg-primary/5 group-hover:bg-primary/10 px-3 py-1.5 rounded-xl">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold">{folder.images.length}</span>
                      </div>
                    </div>

                    {/* Enhanced description */}
                    {folder.description && (
                      <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-500">
                        {folder.description}
                      </p>
                    )}

                    {/* Enhanced footer with better layout */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-muted-foreground/80 text-xs bg-secondary/30 px-3 py-1.5 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{new Date(folder.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>

                      <div className="flex items-center gap-2 text-primary/70 group-hover:text-primary transition-colors duration-500 bg-primary/5 group-hover:bg-primary/10 px-4 py-2 rounded-xl hover:px-5 transition-all duration-300">
                        <span className="text-xs font-semibold">Lihat Album</span>
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modern Light Image Modal */}
      <Dialog open={!!selectedFolder} onOpenChange={(open) => !open && setSelectedFolder(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 border-0 bg-background/95 backdrop-blur-xl [&>button]:hidden">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            {/* Header with Folder Info */}
            <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-foreground">{selectedFolder?.name}</h2>
                    {selectedFolder?.description && (
                      <p className="text-muted-foreground text-xs md:text-sm">{selectedFolder.description}</p>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="p-1 rounded-full hover:bg-secondary transition-colors"
                >
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative bg-muted/30">
              {/* Navigation Buttons */}
              {selectedFolder && selectedFolder.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-card/90 hover:bg-card shadow-lg backdrop-blur-sm text-foreground p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-card/90 hover:bg-card shadow-lg backdrop-blur-sm text-foreground p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="flex items-center justify-center min-h-[40vh] md:min-h-[50vh] max-h-[60vh] md:max-h-[70vh] p-4 md:p-8">
                {selectedFolder && selectedFolder.images[selectedImageIndex] && (
                  <div className="relative max-w-full max-h-full">
                    <img
                      src={selectedFolder.images[selectedImageIndex].image_url}
                      alt={selectedFolder.images[selectedImageIndex].title}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                    {/* Image Info Overlay - Mobile Optimized */}
                    <div className="absolute bottom-1 md:bottom-2 left-2 md:left-4 right-2 md:right-4 bg-card/95 backdrop-blur-sm rounded-lg p-2 md:p-3 shadow-lg">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-muted-foreground text-xs md:text-sm truncate">
                            {new Date(selectedFolder.images[selectedImageIndex].created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {selectedFolder && (
                            <span className="text-xs md:text-sm text-muted-foreground bg-secondary px-2 md:px-3 py-1 rounded-full">
                              {selectedImageIndex + 1} / {selectedFolder.images.length}
                            </span>
                          )}
                          <Button
                            onClick={handleDownload}
                            disabled={downloading}
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-xs md:text-sm px-2 md:px-3 h-7 md:h-8"
                          >
                            <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                            <span className="hidden sm:inline">{downloading ? 'Mengunduh...' : 'Unduh'}</span>
                            <span className="sm:hidden">↓</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {selectedFolder && selectedFolder.images.length > 1 && (
              <div className="bg-card/50 border-t border-border/50 p-3 md:p-4">
                <div className="flex justify-center gap-2 md:gap-3 overflow-x-auto max-w-full pb-2">
                  {selectedFolder.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === selectedImageIndex
                          ? 'border-primary shadow-lg scale-105 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:scale-102'
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
