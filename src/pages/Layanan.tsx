import {
  Stethoscope,
  Baby,
  Syringe,
  Heart,
  Pill,
  Clipboard,
  ArrowRight,
  FileText,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import headerBg from "@/assets/header-bg.png";
import { branding } from "@/config/branding";

const Layanan = () => {
  const services = [
    {
      icon: Baby,
      title: "Pelayanan Kesehatan Klaster 2",
      description: "Pelayanan kesehatan yang ditujukan untuk ibu hamil, bayi, balita dan remaja.",
      details: [
        "Pemeriksaan kehamilan",
        "Pemeriksaan bayi",
        "Pemeriksaan balita",
        "Pemeriksaan remaja",
        "Konseling kesehatan ibu dan anak"
      ]
    },
    {
      icon: Stethoscope,
      title: "Pelayanan Kesehatan Klaster 3",
      description: "Layanan kesehatan untuk masyarakat usia dewasa hingga lanjut usia.",
      details: [
        "Pemeriksaan kesehatan umum dewasa",
        "Konsultasi keluhan kesehatan",
        "Pemeriksaan lansia",
        "Edukasi kesehatan"
      ]
    },
    {
      icon: Syringe,
      title: "Pelayanan Luar Gedung Ponkesdes",
      description: "Pelayanan kesehatan yang dilakukan di luar fasilitas Ponkesdes.",
      details: [
        "ILP (Integrasi Layanan Primer) / Posyandu",
        "Pemeriksaan & skrining anak sekolah dasar",
        "Pembagian tablet Fe untuk anak sekolah",
        "Pembagian obat cacing untuk balita & pra sekolah",
        "Kunjungan rumah",
        "Penyelidikan Epidemiologi (PE) untuk kasus penyakit menular"
      ]
    },
    // {
    //   icon: Heart,
    //   title: "Program Posbindu",
    //   description: "Deteksi dini penyakit tidak menular seperti hipertensi dan diabetes mellitus.",
    //   details: [
    //     "Pemeriksaan gula darah",
    //     "Pemeriksaan kolesterol",
    //     "Pengukuran lingkar perut",
    //     "Edukasi gaya hidup sehat"
    //   ]
    // },
    // {
    //   icon: Pill,
    //   title: "Pemberian Obat",
    //   description: "Penyediaan obat-obatan esensial untuk pengobatan penyakit ringan.",
    //   details: [
    //     "Obat-obatan generik",
    //     "Vitamin dan suplemen",
    //     "Obat P3K",
    //     "Obat program pemerintah"
    //   ]
    // },
    // {
    //   icon: Clipboard,
    //   title: "Konsultasi Kesehatan",
    //   description: "Layanan konsultasi dan edukasi kesehatan untuk masyarakat desa.",
    //   details: [
    //     "Konsultasi gizi",
    //     "Edukasi kesehatan",
    //     "Penyuluhan kesehatan",
    //     "Rujukan ke fasilitas lanjutan"
    //   ]
    // },
  ];

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
              Layanan Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pelayanan Kesehatan <span className="text-gradient">Lengkap</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Kami menyediakan berbagai layanan kesehatan dasar untuk memenuhi kebutuhan
              kesehatan masyarakat desa secara menyeluruh.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Requirements Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Persyaratan <span className="text-gradient">Administrasi</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Berikut adalah dokumen yang perlu Anda siapkan sebelum mendapatkan pelayanan kesehatan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pelayanan Kesehatan Klaster 2",
                icon: Baby,
                items: [
                  "Membawa Kartu Tanda Penduduk (KTP) asli / fotokopi",
                  "Membawa Kartu Keluarga (KK) jika belum memiliki KTP",
                  "Membawa Buku KIA (Kesehatan Ibu dan Anak)"
                ]
              },
              {
                title: "Pelayanan Kesehatan Klaster 3",
                icon: Activity,
                items: [
                  "Membawa Kartu Tanda Penduduk (KTP) asli / fotokopi",
                  "Membawa Kartu Keluarga (KK) jika belum memiliki KTP"
                ]
              },
              {
                title: "Pelayanan Luar Gedung Ponkesdes",
                icon: Clipboard,
                items: [
                  "Membawa Kartu Tanda Penduduk (KTP) asli / fotokopi",
                  "Membawa Kartu Keluarga (KK) jika belum memiliki KTP"
                ]
              }
            ].map((req, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 text-primary-foreground shadow-soft">
                    <req.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4">{req.title}</h3>

                  <ul className="space-y-3">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card rounded-2xl p-8 md:p-12 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Hak dan Kewajiban <span className="text-gradient">Pasien</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Hak Pasien */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 text-primary">Hak Pasien</h3>
                <ul className="space-y-3">
                  {[
                    "Memperoleh informasi mengenai tata tertib dan peraturan yang berlaku",
                    "Memperoleh layanan yang bermutu, aman, nyaman, adil, jujur dan manusiawi",
                    "Mengajukan pengaduan atas kualitas pelayanan yang didapatkan",
                    "Mendapat informasi hasil pemeriksaan yang meliputi diagnosis dan tata cara tindakan, tujuan tindakan, alternatif tindakan, resiko, biaya dan komplikasi yang dan prognosis terhadap tindakan yang dilakukan",
                    "Memberikan persetujuan atau menolak atas tindakan yang akan dilakukan oleh tenaga kesehatan terhadap penyakit yang dideritanya",
                    "Keluarga dapat mendampingi saat menerima pelayanan kesehatan"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kewajiban Pasien */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 text-primary">Kewajiban Pasien</h3>
                <ul className="space-y-3">
                  {[
                    "Memeriksakan diri sedini mungkin",
                    "Memberikan informasi yang benar dan lengkap tentang masalah kesehatannya kepada tenaga kesehatan di ponkesdes",
                    "Mematuhi nasehat dan petunjuk tenaga kesehatan di ponkesdes",
                    "Membayar biaya sesuai peraturan yang berlaku"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layanan;
