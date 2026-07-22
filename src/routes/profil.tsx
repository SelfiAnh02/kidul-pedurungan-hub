import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Home, Target } from "lucide-react";
import { infoRW, pengurusRW, dataRT, rtList } from "@/data/rw";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil RW — RW 02 Pedurungan Kidul" },
      {
        name: "description",
        content:
          "Profil lengkap RW 02 Pedurungan Kidul: visi misi, struktur pengurus, dan data wilayah 4 RT.",
      },
      { property: "og:title", content: "Profil RW 02 Pedurungan Kidul" },
      {
        property: "og:description",
        content: "Struktur pengurus, visi misi, dan wilayah RW 02 Pedurungan Kidul.",
      },
    ],
  }),
  component: ProfilPage,
});

function ProfilPage() {
  const totalKK = rtList.reduce((sum, id) => sum + dataRT[id].jumlahKK, 0);
  const totalWarga = rtList.reduce((sum, id) => sum + dataRT[id].jumlahWarga, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <div className="text-sm font-medium text-primary">Tentang Kami</div>
        <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">Profil RW 02</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          RW 02 merupakan bagian dari Kelurahan {infoRW.kelurahan}, Kecamatan{" "}
          {infoRW.kecamatan}, {infoRW.kota}, Provinsi {infoRW.provinsi}. Terdiri
          dari 4 RT dengan total {totalKK} kepala keluarga dan sekitar {totalWarga} jiwa.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold">4 RT</div>
              <div className="text-sm text-muted-foreground">Rukun Tetangga</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold">{totalKK}</div>
              <div className="text-sm text-muted-foreground">Kepala Keluarga</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold">{totalWarga}</div>
              <div className="text-sm text-muted-foreground">Jiwa Warga</div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Visi Misi */}
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Target className="h-3.5 w-3.5" /> Visi
            </div>
            <h2 className="font-serif text-xl font-bold">
              Terwujudnya lingkungan RW 02 yang guyub, aman, sehat, dan sejahtera
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Menjadikan RW 02 sebagai lingkungan percontohan di Kelurahan
              Pedurungan Kidul yang mengedepankan gotong royong, kebersihan, dan
              pemberdayaan warga.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Target className="h-3.5 w-3.5" /> Misi
            </div>
            <ul className="mt-1 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>1. Menumbuhkan semangat gotong royong antar warga.</li>
              <li>2. Meningkatkan keamanan, kebersihan, dan kesehatan lingkungan.</li>
              <li>3. Menyediakan informasi warga yang transparan dan mudah diakses.</li>
              <li>4. Mendukung kegiatan sosial, keagamaan, dan pemberdayaan ekonomi.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Struktur Pengurus */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Struktur Pengurus</h2>
        <p className="mt-1 text-sm text-muted-foreground">Periode 2024 – 2027</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pengurusRW.map((p) => (
            <Card key={p.nama}>
              <CardContent className="p-5 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary font-serif text-2xl font-bold text-primary-foreground">
                  {p.inisial}
                </div>
                <div className="mt-4 font-serif font-bold">{p.nama}</div>
                <div className="text-xs text-muted-foreground">{p.jabatan}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Wilayah */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Data Wilayah</h2>
        <div className="mt-6 overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3 font-semibold">RT</th>
                <th className="p-3 font-semibold">Ketua</th>
                <th className="p-3 font-semibold">Wilayah</th>
                <th className="p-3 text-right font-semibold">KK</th>
                <th className="p-3 text-right font-semibold">Warga</th>
              </tr>
            </thead>
            <tbody>
              {rtList.map((id) => {
                const d = dataRT[id];
                return (
                  <tr key={id} className="border-t border-border">
                    <td className="p-3 font-serif font-bold text-primary">RT {id}</td>
                    <td className="p-3">{d.ketua}</td>
                    <td className="p-3 text-muted-foreground">{d.wilayah}</td>
                    <td className="p-3 text-right">{d.jumlahKK}</td>
                    <td className="p-3 text-right">{d.jumlahWarga}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sekretariat */}
      <section className="mt-12">
        <Card>
          <CardContent className="grid gap-4 p-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="grid h-14 w-14 place-items-center rounded-md bg-primary text-primary-foreground">
              <MapPin className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Sekretariat RW 02</h3>
              <p className="text-sm text-muted-foreground">{infoRW.alamatSekretariat}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
