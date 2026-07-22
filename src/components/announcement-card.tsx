import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatTanggal, type Pengumuman } from "@/data/rw";

export function AnnouncementCard({ item }: { item: Pengumuman }) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="shrink-0">{item.kategori}</Badge>
        </div>
        <CardTitle className="mt-2 font-serif text-lg leading-snug">{item.judul}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatTanggal(item.tanggal)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{item.ringkasan}</p>
      </CardContent>
    </Card>
  );
}
