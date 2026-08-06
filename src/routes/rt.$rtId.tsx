import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Home, Users, MapPin, Megaphone, CalendarDays, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnnouncementCard } from "@/components/announcement-card";
import { EventCard } from "@/components/event-card";
import { dataRT, rtList, type RTId } from "@/data/rw";
import rt04Header from "@/assets/rt04-header.jpg.asset.json";

const headerBg: Partial<Record<RTId, string>> = {
  "04": rt04Header.url,
};

export const Route = createFileRoute("/rt/$rtId")({
  loader: ({ params }) => {
    if (!rtList.includes(params.rtId as RTId)) {
      throw notFound();
    }
    const rtId = params.rtId as RTId;
    return { rtId, data: dataRT[rtId] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "RT tidak ditemukan — RW 02 Pedurungan Kidul" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { rtId, data } = loaderData;
    return {
      meta: [
        { title: `RT ${rtId} — RW 02 Pedurungan Kidul` },
        {
          name: "description",
          content: `Halaman RT ${rtId} RW 02 Pedurungan Kidul. Ketua RT: ${data.ketua}. Lihat pengumuman dan jadwal kegiatan khusus RT ${rtId}.`,
        },
        { property: "og:title", content: `RT ${rtId} — RW 02 Pedurungan Kidul` },
        {
          property: "og:description",
          content: `Pengumuman dan kegiatan RT ${rtId} — Ketua: ${data.ketua}.`,
        },
      ],
    };
  },
  component: RTPage,
});

function RTPage() {
  const { rtId, data } = Route.useLoaderData();

  const pengumumanSorted = [...data.pengumuman].sort(
    (a, b) => +new Date(b.tanggal) - +new Date(a.tanggal),
  );
  const kegiatanSorted = [...data.kegiatan].sort(
    (a, b) => +new Date(a.tanggal) - +new Date(b.tanggal),
  );

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Button asChild variant="ghost" size="sm" className="mb-4 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground">
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Beranda</Link>
          </Button>
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-md bg-primary-foreground/10 font-serif text-4xl font-bold">
              RT {rtId}
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider opacity-70">
                RW 02 Pedurungan Kidul
              </div>
              <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
                Rukun Tetangga {rtId}
              </h1>
              <p className="mt-2 opacity-90">Ketua RT: <span className="font-semibold">{data.ketua}</span></p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Info stats */}
        <section className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">Wilayah</div>
                <div className="truncate font-medium">{data.wilayah}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Kepala Keluarga</div>
                <div className="font-medium">{data.jumlahKK} KK</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Jumlah Warga</div>
                <div className="font-medium">{data.jumlahWarga} jiwa</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pengumuman */}
        <section className="mt-12">
          <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Megaphone className="h-3.5 w-3.5" /> Pengumuman RT {rtId}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pengumumanSorted.map((p) => (
              <AnnouncementCard key={p.id} item={p} />
            ))}
          </div>
        </section>

        {/* Kegiatan */}
        <section className="mt-12">
          <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" /> Jadwal Kegiatan RT {rtId}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {kegiatanSorted.map((k) => (
              <EventCard key={k.id} item={k} />
            ))}
          </div>
        </section>

        {/* Other RTs */}
        <section className="mt-14">
          <h2 className="mb-4 font-serif text-xl font-bold">RT Lainnya</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rtList
              .filter((id) => id !== rtId)
              .map((id) => (
                <Link key={id} to="/rt/$rtId" params={{ rtId: id }}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="font-serif text-xl font-bold text-primary">RT {id}</div>
                      <div className="text-sm text-muted-foreground">{dataRT[id].ketua}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
