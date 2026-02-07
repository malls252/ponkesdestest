import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { brandingfooter } from "@/config/brandingfooter";
import { branding } from "@/config/branding";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block text-card py-12 md:py-16 w-full" style={{ backgroundColor: "#123321" }}>
      <div className="container mx-auto px-4 max-w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              {brandingfooter.footerLogo.type === "image" ? (
                <img
                  src={brandingfooter.footerLogo.imagePath}
                  alt={brandingfooter.name}
                  className="w-16 h-16 rounded-xl object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">{brandingfooter.footerLogo.icon}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">{brandingfooter.name}</span>
                <span className="text-xs text-card/60">{brandingfooter.description}</span>
              </div>
            </Link>
            <p className="text-card/70 text-sm leading-relaxed text-justify">
              {brandingfooter.footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-2 text-card/70 text-sm">
              <li><Link to="/" className="hover:text-brand-yellow transition-colors">Beranda</Link></li>
              <li><Link to="/layanan" className="hover:text-brand-yellow transition-colors">Layanan</Link></li>
              <li><Link to="/tentang" className="hover:text-brand-yellow transition-colors">Tentang Kami</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-yellow transition-colors">Galeri</Link></li>
              <li><Link to="/jadwal" className="hover:text-brand-yellow transition-colors">Jadwal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Layanan Kami</h4>
            <ul className="space-y-2 text-card/70 text-sm">
              <li>Pemeriksaan Umum</li>
              <li>Kesehatan Ibu & Anak</li>
              <li>Imunisasi</li>
              <li>Program Posyandu</li>
              <li>Konsultasi Kesehatan</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-card/70 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Ds.Wiloso, Jl. Wiloso Gondowangi, RT.20/RW.04, Poh Bener, Gondowangi, Kec. Wagir, Kabupaten Malang, Jawa Timur 65158</span>
              </li>
              {Array.isArray(branding.whatsapp) ? (
                branding.whatsapp.map((item: any, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href={`https://wa.me/${item.number}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
                      +{item.number} {item.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`https://wa.me/${branding.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
                    +{branding.whatsapp}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>ponkesdes.wiloso@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-card/10 pt-8">
          <div className="flex justify-center items-center gap-4">
            <p className="text-card/70 text-sm text-center">
              © {currentYear} KKN 10 Wiloso - Gondowangi - Universitas Merdeka Malang
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
