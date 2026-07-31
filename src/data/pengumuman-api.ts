import { queryOptions } from "@tanstack/react-query";
import type { Pengumuman } from "./rw";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxw8o0mWvFf_3FfydfzM34q7M4qUZnnKESMPDAXXiw-5fWQ8s7jp79D7M-KN0nQK5eR/exec?sheet=Form%20Responses%201";

type ApiRow = {
  Judul?: string;
  Isi?: string;
  [key: string]: unknown;
};

function getNormalizedField(row: ApiRow, fieldName: string): string {
  const entry = Object.entries(row).find(
    ([key]) => key.replace(/\s+/g, " ").trim() === fieldName,
  );
  return typeof entry?.[1] === "string" ? entry[1] : "";
}

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
      tanggal: getNormalizedField(r, "Tanggal") || new Date().toISOString(),
      kategori: getNormalizedField(r, "Kategori").trim() || "Umum",
      ringkasan: (r.Isi ?? "").trim(),
    }));
}


export const pengumumanRWQueryOptions = queryOptions({
  queryKey: ["pengumuman-rw"],
  queryFn: fetchPengumumanRW,
  staleTime: 5 * 60_000,
});
