import { MapPin, Phone, Mail } from "lucide-react";
import { infoRW } from "@/data/rw";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold">RW 02 Pedurungan Kidul</h3>
            <p className="mt-2 text-sm opacity-80">
              Website resmi warga RW 02 Kelurahan Pedurungan Kidul, Kecamatan Pedurungan, {infoRW.kota}.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">Sekretariat</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                <span>{infoRW.alamatSekretariat}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                <span>{infoRW.kontak}</span>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                <span>{infoRW.email}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">Jam Layanan</h4>
            <ul className="mt-3 space-y-1 text-sm">
              <li>Senin – Jumat: 19.00 – 21.00 WIB</li>
              <li>Sabtu: 16.00 – 20.00 WIB</li>
              <li>Minggu: Libur</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs opacity-70">
          © {new Date().getFullYear()} RW 02 Pedurungan Kidul. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
