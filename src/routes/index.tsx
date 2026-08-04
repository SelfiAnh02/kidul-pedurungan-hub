import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Users,
  Megaphone,
  CalendarDays,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnnouncementCard } from "@/components/announcement-card";
import { EventCard } from "@/components/event-card";
import {
  infoRW,
  sambutanKetua,
  pengurusRW,
  rtList,
  dataRT,
} from "@/data/rw";
import {
  pengumumanRWQueryOptions,
  kegiatanRWQueryOptions,
} from "@/data/pengumuman-api";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beranda — RW 02 Pedurungan Kidul" },
      {
        name: "description",
        content:
          "Selamat datang di website resmi RW 02 Pedurungan Kidul. Lihat sambutan ketua RW, pengumuman terbaru, dan jadwal kegiatan warga.",
      },
      { property: "og:title", content: "Beranda — RW 02 Pedurungan Kidul" },
      {
        property: "og:description",
        content: "Informasi resmi warga RW 02 Pedurungan Kidul, Semarang.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.prefetchQuery(pengumumanRWQueryOptions),
  component: Index,
});

function Index() {
  const ketua = pengurusRW[0];
  const {
    data: pengumuman,
    isLoading,
    isError,
    error,
  } = useQuery(pengumumanRWQueryOptions);
  const pengumumanTerbaru = (pengumuman ?? [])
    .slice()
    .sort((a, b) => +new Date(b.tanggal) - +new Date(a.tanggal))
    .slice(0, 3);
  const kegiatanTerdekat = [...kegiatanRW]
    .sort((a, b) => +new Date(a.tanggal) - +new Date(b.tanggal))
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
              {infoRW.kelurahan} · {infoRW.kecamatan} · {infoRW.kota}
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Selamat Datang di {infoRW.nama} Pedurungan Kidul
            </h1>
            <p className="mt-4 text-base opacity-90 sm:text-lg">
              Portal resmi informasi warga — pengumuman, jadwal kegiatan, dan
              profil pengurus dalam satu tempat.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/profil">
                  Lihat Profil RW <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/kegiatan">Kegiatan & Pengumuman</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Sambutan */}
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-primary font-serif text-3xl font-bold text-primary-foreground">
                {ketua.inisial}
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold">{ketua.nama}</h3>
              <p className="text-sm text-muted-foreground">{ketua.jabatan}</p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> Sambutan Ketua RW
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Assalamu'alaikum & salam sejahtera
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{sambutanKetua}</p>
            </CardContent>
          </Card>
        </section>

        {/* Pengumuman terbaru */}
        <section className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Megaphone className="h-3.5 w-3.5" /> Terbaru
              </div>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">Pengumuman RW</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/kegiatan">Lihat semua <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-2 rounded-md border border-dashed p-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Memuat pengumuman terbaru…
            </div>
          ) : isError ? (
            <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {(error as Error)?.message ?? "Gagal memuat pengumuman."}
            </div>
          ) : pengumumanTerbaru.length === 0 ? (
            <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
              Belum ada pengumuman.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {pengumumanTerbaru.map((p) => (
                <AnnouncementCard key={p.id} item={p} />
              ))}
            </div>
          )}
        </section>

        {/* Kegiatan terdekat */}
        <section className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" /> Agenda
              </div>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">Kegiatan Terdekat</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/kegiatan">Lihat semua <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kegiatanTerdekat.map((k) => (
              <EventCard key={k.id} item={k} />
            ))}
          </div>
        </section>

        {/* RT navigation */}
        <section className="mt-14">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Halaman RT</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pilih RT untuk melihat pengumuman dan jadwal kegiatan khusus.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rtList.map((id) => {
              const d = dataRT[id];
              return (
                <Link key={id} to="/rt/$rtId" params={{ rtId: id }}>
                  <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="font-serif text-3xl font-bold text-primary">RT {id}</div>
                      <div className="mt-2 text-sm font-medium text-foreground">{d.ketua}</div>
                      <div className="text-xs text-muted-foreground">Ketua RT</div>
                      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                        <span>{d.jumlahKK} KK</span>
                        <span className="inline-flex items-center gap-1 text-primary">
                          Lihat <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
