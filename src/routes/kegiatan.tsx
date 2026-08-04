import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Megaphone, CalendarDays, Loader2, AlertCircle } from "lucide-react";
import { AnnouncementCard } from "@/components/announcement-card";
import { EventCard } from "@/components/event-card";
import {
  pengumumanRWQueryOptions,
  kegiatanRWQueryOptions,
} from "@/data/pengumuman-api";


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
  const {
    data: pengumuman,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(pengumumanRWQueryOptions);
  const {
    data: kegiatan,
    isLoading: kegiatanLoading,
    isError: kegiatanError,
    error: kegiatanErrorObj,
    refetch: refetchKegiatan,
  } = useQuery(kegiatanRWQueryOptions);

  const pengumumanSorted = (pengumuman ?? [])
    .slice()
    .sort((a, b) => +new Date(b.tanggal) - +new Date(a.tanggal));

  const kegiatanSorted = (kegiatan ?? [])
    .slice()
    .sort((a, b) => +new Date(a.tanggal) - +new Date(b.tanggal));


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

        {isLoading ? (
          <div className="flex items-center gap-2 rounded-md border border-dashed p-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat pengumuman terbaru…
          </div>
        ) : isError ? (
          <div className="flex flex-col items-start gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-6 text-sm">
            <div className="flex items-center gap-2 font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              Gagal memuat pengumuman
            </div>
            <p className="text-muted-foreground">
              {(error as Error)?.message ?? "Terjadi kesalahan tak terduga."}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Coba lagi
            </button>
          </div>
        ) : pengumumanSorted.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
            Belum ada pengumuman.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pengumumanSorted.map((p) => (
              <AnnouncementCard key={p.id} item={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" /> Jadwal Kegiatan
        </div>
        {kegiatanLoading ? (
          <div className="flex items-center gap-2 rounded-md border border-dashed p-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat jadwal kegiatan…
          </div>
        ) : kegiatanError ? (
          <div className="flex flex-col items-start gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-6 text-sm">
            <div className="flex items-center gap-2 font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              Gagal memuat jadwal kegiatan
            </div>
            <p className="text-muted-foreground">
              {(kegiatanErrorObj as Error)?.message ?? "Terjadi kesalahan tak terduga."}
            </p>
            <button
              onClick={() => refetchKegiatan()}
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Coba lagi
            </button>
          </div>
        ) : kegiatanSorted.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
            Belum ada kegiatan terjadwal.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {kegiatanSorted.map((k) => (
              <EventCard key={k.id} item={k} />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}

