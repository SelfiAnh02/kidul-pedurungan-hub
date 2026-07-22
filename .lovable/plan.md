# Rencana: Website Profil RW02 Pedurungan Kidul

## Gambaran
Website statis (data mockup di file TS) bertema formal terpercaya untuk RW02 Kelurahan Pedurungan Kidul, Kecamatan Pedurungan, Kota Semarang. Bersih, modern, mobile-first.

## Design System
- Warna: Navy Trust — `#0f1b3d` (primary), `#1e3a5f` (secondary), `#3b6fa0` (accent), `#e8edf3` (background muted). Terapkan di `src/styles.css` sebagai token oklch.
- Font: Libre Baskerville (heading) + IBM Plex Sans (body). Dimuat via `<link>` Google Fonts di `__root.tsx`.
- Komponen: shadcn Card, Button, Badge, Sheet (mobile nav).

## Struktur Route
```
src/routes/
  __root.tsx          → header + nav + footer share, google fonts, meta dasar
  index.tsx           → Beranda
  profil.tsx          → Profil RW
  kegiatan.tsx        → Kegiatan & Pengumuman (gabungan RW)
  rt.$rtId.tsx        → Dinamis: /rt/01, /rt/02, /rt/03, /rt/04
```
Route dinamis `rt.$rtId.tsx` menghindari duplikasi 4 file identik; data per-RT diambil dari objek lookup. Tiap halaman punya `head()` unik.

## Data Mockup
File `src/data/rw.ts`:
- `pengurusRW` (Ketua RW, Sekretaris, Bendahara)
- `pengumumanRW[]` (judul, tanggal, isi ringkas, kategori)
- `kegiatanRW[]` (nama, tanggal, waktu, lokasi)
- `dataRT: Record<'01'|'02'|'03'|'04', { ketua, wilayah, jumlahKK, pengumuman[], kegiatan[] }>`

## Halaman

**Beranda (`/`)**
- Hero: nama RW + kelurahan + kecamatan + kota, tagline, tombol "Lihat Profil" & "Kegiatan".
- Grid Info (hero-grid): 
  - Kartu "Sambutan Ketua RW" (foto placeholder + kutipan pendek)
  - Kartu "Pengumuman Terbaru" (3 item terbaru dari RW)
  - Kartu "Kegiatan Terdekat" (3 item)
- Grid navigasi RT (4 kartu → /rt/01..04)

**Profil RW (`/profil`)**
- Sejarah singkat, visi & misi
- Struktur pengurus (grid kartu)
- Data wilayah (4 RT, jumlah KK, batas wilayah)
- Peta/alamat sekretariat

**Kegiatan & Pengumuman (`/kegiatan`)**
- Tab / section: "Pengumuman" (list lengkap) & "Jadwal Kegiatan" (list dengan tanggal, lokasi)
- Filter kategori sederhana (badge)

**Halaman RT (`/rt/$rtId`)**
- Header: "RT 0X" + nama ketua + wilayah + jumlah KK
- Section Pengumuman khusus RT (kartu list)
- Section Jadwal Kegiatan RT (kartu list dengan tanggal/waktu/lokasi)
- Breadcrumb kembali ke Beranda
- Jika `rtId` tidak valid → `notFound()`

## Navigasi
- Desktop: header sticky dengan logo RW02 + link Beranda, Profil RW, Kegiatan & Pengumuman, dropdown "RT" (RT01–RT04).
- Mobile: hamburger + Sheet drawer dengan link vertikal.
- Footer: alamat sekretariat, kontak, copyright.

## SEO / Head
Tiap route punya `head()` unik dengan title & description Indonesia yang spesifik (contoh: "Profil RW02 — Pedurungan Kidul, Semarang").

## Detail Teknis
- Tambah token warna navy ke `src/styles.css` (`@theme inline` + `:root`).
- Update `__root.tsx`: tambah `<link>` Google Fonts, ubah meta default, tambah komponen `<SiteHeader/>` & `<SiteFooter/>` di `RootComponent`.
- Komponen bersama: `src/components/site-header.tsx`, `site-footer.tsx`, `announcement-card.tsx`, `event-card.tsx`.
- Semua warna via token semantik (tidak ada hex/tailwind color literal di komponen).
- Placeholder foto pengurus: inisial dalam Avatar (tanpa generate image agar cepat).

## Non-scope
- Tidak ada backend, autentikasi, database, atau form submit (murni mockup tampilan).
