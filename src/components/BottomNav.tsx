import { Home, Stethoscope, Info, Image, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/layanan", label: "Layanan", icon: Stethoscope },
    { href: "/tentang", label: "Tentang", icon: Info },
    { href: "/gallery", label: "Galeri", icon: Image },
    { href: "/jadwal", label: "Jadwal", icon: Calendar },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border" style={{ position: 'fixed' }}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
