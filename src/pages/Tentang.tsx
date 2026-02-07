import { CheckCircle, Target, Eye, Phone, Mail, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import nurseImage from "@/assets/nurse-1.jpg";
import bidanImage from "@/assets/bidan-1.jpg";
import headerBg from "@/assets/header-bg.png";
import { branding } from "@/config/branding";
import { brandingfooter } from "@/config/brandingfooter";

const Tentang = () => {
  const currentYear = new Date().getFullYear();

  const features = [
    "Tenaga kesehatan profesional dan berpengalaman",
    "Pelayanan ramah dan bersahabat",
    "Fasilitas kesehatan yang memadai",
    "Obat-obatan berkualitas",
    "Biaya terjangkau untuk masyarakat",
    "Jam operasional yang fleksibel",
  ];

  const team = [
    {
      name: "Ibu Wayan",
      role: "Bidan Desa",
      image: bidanImage,
    },
    {
      name: "Ibu Frida",
      role: "Perawat Desa",
      image: nurseImage,
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Perawat Desa (Ibu Frida)",
      content: `+${branding.whatsapp[0].number}`,
    },
    {
      icon: Phone,
      title: "Bidan Desa (Ibu Wayan)",
      content: `+${branding.whatsapp[1].number}`,
    },
    {
      icon: Mail,
      title: "Email",
      content: "ponkesdes.wiloso@gmail.com",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Sabtu: 07.30 - 12.00 WIB",
    },
  ];

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
              Tentang Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Mitra Kesehatan <span className="text-gradient">Keluarga Anda</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ponkesdes hadir untuk memberikan pelayanan kesehatan dasar yang berkualitas
              kepada seluruh masyarakat desa.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: About + Features + Team */}
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Apa Itu Ponkesdes?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ponkesdes (Pondok Kesehatan Desa) adalah fasilitas kesehatan tingkat pertama yang
                  didirikan untuk memberikan pelayanan kesehatan dasar kepada masyarakat desa.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kami berkomitmen untuk meningkatkan derajat kesehatan masyarakat melalui pelayanan
                  yang profesional, ramah, dan terjangkau. Dengan tenaga kesehatan yang berpengalaman
                  dan fasilitas yang memadai, kami siap melayani kebutuhan kesehatan Anda.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Keunggulan Kami</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Section (below Keunggulan) */}
              <div className="pt-12 border-t border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Tim Kesehatan Kami</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="group bg-card rounded-xl overflow-hidden shadow-soft border border-border/50 flex flex-col"
                    >
                      <div className="relative overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 bg-card mt-auto">
                        <p className="text-foreground font-bold text-base">{member.name}</p>
                        <p className="text-muted-foreground text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visi / Misi / Tujuan then Contact */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Visi</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Terwujudnya Kabupaten Malang yang Maju , Sejahtera, Berdaya Saing dan Berkelanjutan dengan Semangat Gotong Royong berdasarkan Pancasila dalam Negara Kesatuan Republik Indonesia yang Bhineka Tunggal Ika.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Misi</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Mewujudkan kesejahteran rakyat membangun sumber daya manusia unggul.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-4">Tujuan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menyelenggarakan pelayanan kesehatan yang berkualitas serta meningkatkan kesadaran, kemauan dan kemampuan hidup sehat bagi setiap orang yang bertempat tinggal di desa/kelurahan, agar terwujud derajat kesehatan masyarakat di desa/kelurahan yang setinggi-tingginya.
                </p>
              </div>

              <div className="pt-4">
                <h2 className="text-2xl font-bold text-foreground mb-4">Informasi Kontak</h2>
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft border border-border/50 mb-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alur Pelayanan Section */}
      <div className="py-16 md:py-24 bg-secondary/30 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Alur <span className="text-gradient">Pelayanan</span> & Struktur <span className="text-gradient">Organisasi</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Berikut adalah alur pelayanan pasien dan struktur organisasi Ponkesdes</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Alur Pelayanan */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 animate-slide-in-left flex items-center justify-center">
              <img
                src="/alur-pelayanan.png"
                alt="Alur Pelayanan Ponkesdes"
                className="w-full h-auto"
              />
            </div>

            {/* Struktur Organisasi */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 animate-slide-in-right flex items-center justify-center">
              <img
                src="/struktur-organisasi.png"
                alt="Struktur Organisasi Ponkesdes"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-card py-12 md:py-16" style={{ backgroundColor: "#123321" }}>
        <div className="container mx-auto px-4">
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
    </div>
  );
};

export default Tentang;
