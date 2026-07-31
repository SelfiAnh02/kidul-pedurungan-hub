import { queryOptions } from "@tanstack/react-query";
import type { Pengumuman } from "./rw";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxw8o0mWvFf_3FfydfzM34q7M4qUZnnKESMPDAXXiw-5fWQ8s7jp79D7M-KN0nQK5eR/exec?sheet=pengumuman_rw";

type ApiRow = {
  Judul?: string;
  Tanggal?: string;
  Kategori?: string;
  Isi?: string;
};

export async function fetchPengumumanRW(): Promise<Pengumuman[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Gagal memuat pengumuman (${res.status})`);
  const json: unknown = await res.json();
  if (!Array.isArray(json)) {
    const message =
      (json as { error?: string })?.error ?? "Format data tidak dikenali";
    throw new Error(`Gagal memuat pengumuman: ${message}`);
  }
  return (json as ApiRow[])
    .filter((r) => (r.Judul ?? "").trim() !== "" || (r.Isi ?? "").trim() !== "")
    .map((r, i) => ({
      id: `api-${i}`,
      judul: (r.Judul ?? "").trim() || "(Tanpa judul)",
      tanggal: r.Tanggal ?? new Date().toISOString(),
      kategori: (r.Kategori ?? "Umum").trim() || "Umum",
      ringkasan: (r.Isi ?? "").trim(),
    }));
}


export const pengumumanRWQueryOptions = queryOptions({
  queryKey: ["pengumuman-rw"],
  queryFn: fetchPengumumanRW,
  staleTime: 5 * 60_000,
});
