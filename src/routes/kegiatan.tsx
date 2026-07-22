import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, CalendarDays } from "lucide-react";
import { AnnouncementCard } from "@/components/announcement-card";
import { EventCard } from "@/components/event-card";
import { pengumumanRW, kegiatanRW } from "@/data/rw";

export const Route = createFileRoute("/kegiatan")({
  head: () => ({
    meta: [
      { title: "Kegiatan & Pengumuman — RW 02 Pedurungan Kidul" },
      {
        name: "description",
        content:
          "Daftar lengkap pengumuman dan jadwal kegiatan RW 02 Pedurungan Kidul.",
      },
      { property: "og:title", content: "Kegiatan & Pengumuman RW 02" },
      {
        property: "og:description",
        content: "Semua pengumuman dan jadwal kegiatan warga RW 02.",
      },
    ],
  }),
  component: KegiatanPage,
});

function KegiatanPage() {
  const pengumumanSorted = [...pengumumanRW].sort(
    (a, b) => +new Date(b.tanggal) - +new Date(a.tanggal),
  );
  const kegiatanSorted = [...kegiatanRW].sort(
    (a, b) => +new Date(a.tanggal) - +new Date(b.tanggal),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <div className="text-sm font-medium text-primary">Informasi Warga</div>
        <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
          Kegiatan & Pengumuman
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Semua pengumuman resmi dan jadwal kegiatan tingkat RW 02. Untuk
          pengumuman spesifik RT, silakan kunjungi halaman RT masing-masing.
        </p>
      </header>

      <section>
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Megaphone className="h-3.5 w-3.5" /> Pengumuman
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pengumumanSorted.map((p) => (
            <AnnouncementCard key={p.id} item={p} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" /> Jadwal Kegiatan
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {kegiatanSorted.map((k) => (
            <EventCard key={k.id} item={k} />
          ))}
        </div>
      </section>
    </div>
  );
}
