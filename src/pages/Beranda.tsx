import { useState } from "react";
import { ArrowRight, MapPin, FileText, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ponkesdes.jpg";

const Beranda = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full " />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full " />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Layanan Kesehatan Desa Terpercaya
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Kesehatan Anda,{" "}
                <span className="text-gradient">Prioritas Kami</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Ponkesdes hadir memberikan layanan kesehatan dasar yang berkualitas untuk seluruh
                masyarakat desa. Kami berkomitmen menjadi mitra kesehatan keluarga Anda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/layanan">
                    Lihat Layanan Kami
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/jadwal">Jadwal Pelayanan</Link>
                </Button>
              </div>

            </div>

            {/* Video Hero */}
            <div className="relative animate-slide-in-right">
              <div className="relative rounded-3xl overflow-hidden shadow-card aspect-video">
                <video
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  poster={heroImage}
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                  <img
                    src={heroImage}
                    alt="Ponkesdes - Pondok Kesehatan Desa"
                    className="w-full h-auto object-cover"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-card animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Jam Operasional</p>
                    <p className="text-sm text-muted-foreground">07.30 - 12.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            {/* Address & Map Card */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 flex flex-col animate-fade-in w-full">
              <div className="p-6 md:p-8 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Alamat Kantor</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Desa Wiloso, Jl. Wiloso Gondowangi, RT.20/RW.04, Gondowangi, Kec. Wagir, Kabupaten Malang.
                  </p>
                  <Button variant="outline" size="sm" className="h-9 gap-2" asChild>
                    <a
                      href="https://maps.app.goo.gl/eQ6ZrG4xG7hUsVju5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka di Google Maps
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex-grow min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.92682669924784!2d112.58034965643901!3d-8.016539527906241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789d25a20780b9%3A0x775a4a74cb8989e!2sTaman%20Kanak%20Kanak%20Dharma%20Wanita%20-%2002!5e0!3m2!1id!2sid!4v1769871884902!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Ponkesdes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
