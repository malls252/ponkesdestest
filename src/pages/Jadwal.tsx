import { Clock, Phone, Mail, FileText } from "lucide-react";
import headerBg from "@/assets/header-bg.png";
import { branding } from "@/config/branding";

const Jadwal = () => {
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

  const schedule = [
    { day: "Senin", time: "07.30 - 12.00 WIB", service: "Pelayanan Klaster 2 dan 3" },
    { day: "Selasa", time: "07.30 - 12.00 WIB", service: "Pelayanan Klaster 2 dan 3" },
    { day: "Rabu", time: "07.30 - 12.00 WIB", service: "Pelayanan Klaster 2 dan 3" },
    { day: "Kamis", time: "07.30 - 12.00 WIB", service: "Pelayanan Klaster 2 dan 3" },
    { day: "Jumat", time: "Tutup", service: "Petugas berkegiatan di puskesmas" },
    { day: "Sabtu", time: "07.30 - 11.00 WIB", service: "Pelayanan Klaster 2 dan 3" },
    { day: "Minggu", time: "Tutup", service: "Libur" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background w-full">
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
              Jadwal
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Jadwal <span className="text-gradient">Pelayanan</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Berikut jadwal pelayanan rutin Ponkesdes. Periksa juga catatan penting di bawah.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 animate-slide-in-left">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Jadwal Pelayanan
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-muted-foreground font-medium">Hari</th>
                      <th className="text-left py-3 text-muted-foreground font-medium">Jam</th>
                      <th className="text-left py-3 text-muted-foreground font-medium">Layanan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 last:border-0">
                        <td className="py-4 text-foreground font-medium">{item.day}</td>
                        <td className="py-4 text-primary font-semibold">{item.time}</td>
                        <td className="py-4 text-muted-foreground">{item.service}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="animate-slide-in-right space-y-6">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Catatan Penting</h3>
                </div>
                <ul className="mt-3 space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Membawa kartu identitas (KTP/KK) saat berkunjung.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Pendaftaran pasien umum ditutup sesuai jam operasional.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Jadwal pelayanan sewaktu-waktu dapat berubah.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;
