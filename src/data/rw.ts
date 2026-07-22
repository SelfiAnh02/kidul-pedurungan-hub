export type Pengumuman = {
  id: string;
  judul: string;
  tanggal: string; // ISO
  kategori: string;
  ringkasan: string;
};

export type Kegiatan = {
  id: string;
  nama: string;
  tanggal: string; // ISO
  waktu: string;
  lokasi: string;
  keterangan?: string;
};

export type Pengurus = {
  nama: string;
  jabatan: string;
  inisial: string;
};

export const infoRW = {
  nama: "RW 02",
  kelurahan: "Pedurungan Kidul",
  kecamatan: "Pedurungan",
  kota: "Kota Semarang",
  provinsi: "Jawa Tengah",
  alamatSekretariat:
    "Jl. Brigjen Sudiarto Gg. Melati No. 12, Pedurungan Kidul, Semarang",
  kontak: "0812-3456-7890",
  email: "rw02.pedurungankidul@gmail.com",
};

export const pengurusRW: Pengurus[] = [
  { nama: "H. Sutrisno, S.Pd.", jabatan: "Ketua RW", inisial: "SU" },
  { nama: "Bambang Widodo", jabatan: "Wakil Ketua RW", inisial: "BW" },
  { nama: "Siti Nurhayati", jabatan: "Sekretaris", inisial: "SN" },
  { nama: "Agus Prasetyo", jabatan: "Bendahara", inisial: "AP" },
];

export const sambutanKetua =
  "Selamat datang di website resmi RW 02 Kelurahan Pedurungan Kidul. Website ini kami hadirkan sebagai media informasi dan komunikasi antara pengurus dan seluruh warga. Semoga bermanfaat dan mari bersama-sama menjaga kerukunan serta kemajuan lingkungan kita.";

export const pengumumanRW: Pengumuman[] = [
  {
    id: "p1",
    judul: "Kerja Bakti Bulanan RW 02",
    tanggal: "2026-08-02",
    kategori: "Kebersihan",
    ringkasan:
      "Kerja bakti membersihkan saluran air dan taman lingkungan. Warga dimohon berpartisipasi.",
  },
  {
    id: "p2",
    judul: "Pembayaran Iuran Sampah Bulan Juli",
    tanggal: "2026-07-25",
    kategori: "Iuran",
    ringkasan:
      "Iuran sampah Rp 25.000 per KK dapat disetorkan ke bendahara RT masing-masing paling lambat 31 Juli 2026.",
  },
  {
    id: "p3",
    judul: "Rapat Koordinasi Pengurus RW & Ketua RT",
    tanggal: "2026-07-20",
    kategori: "Rapat",
    ringkasan:
      "Rapat koordinasi persiapan HUT RI ke-81 di sekretariat RW pukul 19.30 WIB.",
  },
  {
    id: "p4",
    judul: "Pendataan Warga Baru",
    tanggal: "2026-07-15",
    kategori: "Administrasi",
    ringkasan:
      "Warga pindahan wajib melapor ke ketua RT setempat maksimal 2x24 jam.",
  },
];

export const kegiatanRW: Kegiatan[] = [
  {
    id: "k1",
    nama: "Lomba HUT RI ke-81",
    tanggal: "2026-08-17",
    waktu: "08.00 - selesai",
    lokasi: "Lapangan RW 02",
    keterangan: "Berbagai lomba anak & dewasa. Pendaftaran di RT masing-masing.",
  },
  {
    id: "k2",
    nama: "Posyandu Balita & Lansia",
    tanggal: "2026-08-05",
    waktu: "09.00 - 12.00",
    lokasi: "Balai RW 02",
  },
  {
    id: "k3",
    nama: "Kerja Bakti Bulanan",
    tanggal: "2026-08-02",
    waktu: "06.30 - 09.00",
    lokasi: "Seluruh wilayah RW 02",
  },
  {
    id: "k4",
    nama: "Pengajian Rutin Ibu-Ibu",
    tanggal: "2026-07-28",
    waktu: "15.30 - 17.00",
    lokasi: "Musholla Al-Ikhlas",
  },
];

export type RTId = "01" | "02" | "03" | "04";

export type DataRT = {
  ketua: string;
  wilayah: string;
  jumlahKK: number;
  jumlahWarga: number;
  pengumuman: Pengumuman[];
  kegiatan: Kegiatan[];
};

export const dataRT: Record<RTId, DataRT> = {
  "01": {
    ketua: "Slamet Riyadi",
    wilayah: "Jl. Melati I - II",
    jumlahKK: 48,
    jumlahWarga: 176,
    pengumuman: [
      {
        id: "rt1-p1",
        judul: "Ronda Malam Jadwal Baru",
        tanggal: "2026-07-22",
        kategori: "Keamanan",
        ringkasan:
          "Jadwal ronda malam RT 01 diperbarui. Silakan cek grup WhatsApp RT.",
      },
      {
        id: "rt1-p2",
        judul: "Pengumpulan Iuran Kas RT",
        tanggal: "2026-07-18",
        kategori: "Iuran",
        ringkasan: "Iuran kas RT 01 sebesar Rp 20.000 dibayarkan tiap Minggu.",
      },
    ],
    kegiatan: [
      {
        id: "rt1-k1",
        nama: "Arisan Bulanan RT 01",
        tanggal: "2026-08-10",
        waktu: "19.30 - 21.00",
        lokasi: "Rumah Bpk. Slamet",
      },
      {
        id: "rt1-k2",
        nama: "Kerja Bakti RT 01",
        tanggal: "2026-08-02",
        waktu: "06.30 - 09.00",
        lokasi: "Gang Melati I",
      },
    ],
  },
  "02": {
    ketua: "Hartono, S.E.",
    wilayah: "Jl. Melati III - IV",
    jumlahKK: 52,
    jumlahWarga: 198,
    pengumuman: [
      {
        id: "rt2-p1",
        judul: "Perbaikan Lampu Jalan",
        tanggal: "2026-07-24",
        kategori: "Infrastruktur",
        ringkasan:
          "Lampu jalan di ujung gang akan diperbaiki tanggal 26 Juli 2026.",
      },
      {
        id: "rt2-p2",
        judul: "Pendaftaran Vaksinasi",
        tanggal: "2026-07-19",
        kategori: "Kesehatan",
        ringkasan:
          "Pendaftaran vaksinasi lansia dibuka. Hubungi sekretaris RT 02.",
      },
    ],
    kegiatan: [
      {
        id: "rt2-k1",
        nama: "Rapat Warga RT 02",
        tanggal: "2026-08-08",
        waktu: "20.00 - 22.00",
        lokasi: "Rumah Bpk. Hartono",
      },
      {
        id: "rt2-k2",
        nama: "Senam Sehat Bersama",
        tanggal: "2026-08-04",
        waktu: "06.00 - 07.30",
        lokasi: "Lapangan RT 02",
      },
    ],
  },
  "03": {
    ketua: "Yusuf Maulana",
    wilayah: "Jl. Mawar I - III",
    jumlahKK: 45,
    jumlahWarga: 164,
    pengumuman: [
      {
        id: "rt3-p1",
        judul: "Gotong Royong Perbaikan Pos Ronda",
        tanggal: "2026-07-26",
        kategori: "Infrastruktur",
        ringkasan:
          "Perbaikan pos ronda RT 03 hari Minggu, 27 Juli 2026 pukul 07.00.",
      },
      {
        id: "rt3-p2",
        judul: "Bantuan Sembako Warga",
        tanggal: "2026-07-17",
        kategori: "Sosial",
        ringkasan:
          "Pembagian sembako untuk warga kurang mampu, silakan daftar ke RT.",
      },
    ],
    kegiatan: [
      {
        id: "rt3-k1",
        nama: "Pengajian Bapak-Bapak",
        tanggal: "2026-08-09",
        waktu: "19.30 - 21.30",
        lokasi: "Musholla Al-Ikhlas",
      },
      {
        id: "rt3-k2",
        nama: "PKK RT 03",
        tanggal: "2026-08-06",
        waktu: "15.00 - 17.00",
        lokasi: "Rumah Ibu Yusuf",
      },
    ],
  },
  "04": {
    ketua: "Drs. Wahyudi",
    wilayah: "Jl. Mawar IV - V & Cempaka",
    jumlahKK: 50,
    jumlahWarga: 182,
    pengumuman: [
      {
        id: "rt4-p1",
        judul: "Lomba Kebersihan Antar Gang",
        tanggal: "2026-07-30",
        kategori: "Kebersihan",
        ringkasan:
          "Menyambut HUT RI, RT 04 mengadakan lomba kebersihan antar gang.",
      },
      {
        id: "rt4-p2",
        judul: "Pertemuan Karang Taruna",
        tanggal: "2026-07-21",
        kategori: "Pemuda",
        ringkasan:
          "Karang Taruna RT 04 berkumpul di balai RT membahas kegiatan agustusan.",
      },
    ],
    kegiatan: [
      {
        id: "rt4-k1",
        nama: "Karang Taruna Meeting",
        tanggal: "2026-08-07",
        waktu: "19.30 - 21.00",
        lokasi: "Balai RT 04",
      },
      {
        id: "rt4-k2",
        nama: "Bakti Sosial",
        tanggal: "2026-08-11",
        waktu: "08.00 - 12.00",
        lokasi: "Wilayah RT 04",
      },
    ],
  },
};

export const rtList: RTId[] = ["01", "02", "03", "04"];

export function formatTanggal(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
