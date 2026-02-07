import { Clock } from "lucide-react";
import headerBg from "@/assets/header-bg.png";

const Kontak = () => {

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
              Hubungi Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Informasi <span className="text-gradient">Kontak</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Jangan ragu untuk menghubungi kami atau mengunjungi langsung lokasi Ponkesdes.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {/* Schedule Table */}
            <div className="animate-slide-in-right">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
