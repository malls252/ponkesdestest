import { useState } from "react";
import { Menu, X, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { branding } from "@/config/branding";
import { usePWA } from "@/hooks/usePWA";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactButtons = ({ title = "Hubungi Kami" }: { title?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="hero" size="default" className="w-full md:w-auto">
          <Phone className="w-4 h-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Pilih Kontak WhatsApp</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Array.isArray(branding.whatsapp) ? (
            branding.whatsapp.map((item: any, index: number) => (
              <Button key={index} variant="hero" className="w-full justify-start gap-3" asChild>
                <a href={`https://wa.me/${item.number}`} target="_blank" rel="noopener noreferrer">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold">{item.label}</span>
                    <span className="text-xs opacity-70">+{item.number}</span>
                  </div>
                </a>
              </Button>
            ))
          ) : (
            <Button variant="hero" className="w-full" asChild>
              <a href={`https://wa.me/${branding.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                Hubungi Sekarang
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isInstallable, installPWA } = usePWA();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/layanan", label: "Layanan" },
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/gallery", label: "Galeri" },
    { href: "/jadwal", label: "Jadwal" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            {branding.logo.type === "image" ? (
              <img
                src={branding.logo.imagePath}
                alt={branding.name}
                className="w-8 h-8 md:w-12 md:h-12 object-contain"
              />
            ) : (
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-base md:text-xl">{branding.logo.icon}</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-base md:text-xl leading-tight">{branding.name}</span>
              <span className="text-xs text-muted-foreground hidden md:block">{branding.description}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`transition-colors duration-200 ${isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-muted-foreground font-medium hover:text-brand-yellow"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="default" onClick={installPWA}>
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
            <ContactButtons />
            <Button variant="outline" size="default" asChild>
              <Link to="/login">Login Admin</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${isActive(link.href)
                    ? "text-primary bg-secondary font-bold"
                    : "text-muted-foreground font-medium hover:text-brand-yellow hover:bg-secondary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-3">
                <Button variant="outline" size="sm" className="w-full">
                  Login Admin
                </Button>
              </Link>
              <div className="px-4 pt-2">
                <div className="mb-2">
                  <Button variant="outline" size="sm" onClick={installPWA} className="w-full mb-2">
                    <Download className="w-4 h-4 mr-2" />
                    Install App
                  </Button>
                  <ContactButtons />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
