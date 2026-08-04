import { queryOptions } from "@tanstack/react-query";
import type { Kegiatan, Pengumuman } from "./rw";

const BASE_URL =
  "https://script.google.com/macros/s/AKfycbzsCJwVL70uPtpjBdXbYn-BziOhhvMOYbPTeMl4zNvZgEm-C_sVCZtQ-nqrrOdcybmoIQ/exec";

const PENGUMUMAN_URL = `${BASE_URL}?sheet=pengumuman_rw`;
const KEGIATAN_URL = `${BASE_URL}?sheet=kegiatan_rw`;

type ApiRow = Record<string, unknown>;

function getField(row: ApiRow, fieldName: string): string {
  const entry = Object.entries(row).find(
    ([key]) => key.replace(/\s+/g, " ").trim().toLowerCase() === fieldName.toLowerCase(),
  );
  return typeof entry?.[1] === "string" ? entry[1].trim() : "";
}

async function fetchSheet(url: string, label: string): Promise<ApiRow[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gagal memuat ${label} (${res.status})`);
  const json: unknown = await res.json();
  if (!Array.isArray(json)) {
    const message = (json as { error?: string })?.error ?? "Format data tidak dikenali";
    throw new Error(`Gagal memuat ${label}: ${message}`);
  }
  return json as ApiRow[];
}

/** Format nilai waktu dari Sheets (ISO 1899 atau teks) menjadi "HH.mm WIB". */
function formatWaktu(raw: string): string {
  if (!raw) return "-";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  const total = (d.getUTCHours() + 7) % 24;
  const hh = String(total).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}.${mm} WIB`;
}

export async function fetchPengumumanRW(): Promise<Pengumuman[]> {
  const rows = await fetchSheet(PENGUMUMAN_URL, "pengumuman");
  return rows
    .filter((r) => getField(r, "Judul") !== "" || getField(r, "Isi") !== "")
    .map((r, i) => ({
      id: `pengumuman-${i}`,
      judul: getField(r, "Judul") || "(Tanpa judul)",
      tanggal: getField(r, "Tanggal") || new Date().toISOString(),
      kategori: getField(r, "Kategori") || "Umum",
      ringkasan: getField(r, "Isi"),
    }));
}

export async function fetchKegiatanRW(): Promise<Kegiatan[]> {
  const rows = await fetchSheet(KEGIATAN_URL, "kegiatan");
  return rows
    .filter((r) => getField(r, "Judul") !== "" || getField(r, "Nama") !== "")
    .map((r, i) => ({
      id: `kegiatan-${i}`,
      nama: getField(r, "Judul") || getField(r, "Nama") || "(Tanpa nama)",
      tanggal: getField(r, "Tanggal") || new Date().toISOString(),
      waktu: formatWaktu(getField(r, "Waktu")),
      lokasi: getField(r, "Lokasi") || "-",
      keterangan: getField(r, "Keterangan") || undefined,
    }));
}

export const pengumumanRWQueryOptions = queryOptions({
  queryKey: ["pengumuman-rw"],
  queryFn: fetchPengumumanRW,
  staleTime: 5 * 60_000,
});

export const kegiatanRWQueryOptions = queryOptions({
  queryKey: ["kegiatan-rw"],
  queryFn: fetchKegiatanRW,
  staleTime: 5 * 60_000,
});
