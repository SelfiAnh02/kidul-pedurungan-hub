import { queryOptions } from "@tanstack/react-query";
import type { Pengumuman } from "./rw";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzdSoI3ya62KrkHHBIi0t8bLYH0jufOZbCEGYsTvifmyod41ELAytoRsghRTLkM8C4p/exec?sheet=pengumuman_rw";

type ApiRow = {
  Judul?: string;
  Tanggal?: string;
  Kategori?: string;
  Isi?: string;
};

export async function fetchPengumumanRW(): Promise<Pengumuman[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Gagal memuat pengumuman (${res.status})`);
  const rows: ApiRow[] = await res.json();
  return rows.map((r, i) => ({
    id: `api-${i}`,
    judul: r.Judul ?? "(Tanpa judul)",
    tanggal: r.Tanggal ?? new Date().toISOString(),
    kategori: r.Kategori ?? "Umum",
    ringkasan: r.Isi ?? "",
  }));
}

export const pengumumanRWQueryOptions = queryOptions({
  queryKey: ["pengumuman-rw"],
  queryFn: fetchPengumumanRW,
  staleTime: 5 * 60_000,
});
