import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { formatTanggal, type Kegiatan } from "@/data/rw";

export function EventCard({ item }: { item: Kegiatan }) {
  const d = new Date(item.tanggal);
  const day = d.toLocaleDateString("id-ID", { day: "2-digit" });
  const month = d.toLocaleDateString("id-ID", { month: "short" });

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="flex gap-4 p-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
          <div className="text-center leading-tight">
            <div className="font-serif text-2xl font-bold">{day}</div>
            <div className="text-[10px] uppercase tracking-wider">{month}</div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-serif text-base font-semibold text-foreground">{item.nama}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{formatTanggal(item.tanggal)}</p>
          <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {item.waktu}
            </span>
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{item.lokasi}</span>
            </span>
          </div>
          {item.keterangan ? (
            <p className="mt-2 text-xs text-muted-foreground">{item.keterangan}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
