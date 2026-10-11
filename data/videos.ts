/* ────────────────────────────────────────────────────────────────────────────
 * KATEGORİ TANITIM VİDEOLARI — /videos/kategori/<slug>.mp4
 *
 * Yalnızca mevcut FABA ürün fotoğraflarından (public/images/products) üretilmiş,
 * sessiz ve kesintisiz döngü klipler: lacivert zemin, beyaz kart içinde yavaş yakınlaşma
 * (Ken Burns), ürün kodları. İddia, test etiketi veya puan İÇERMEZ.
 * 1280×720, H.264 (yuv420p, BT.709), 25 fps, ses yok. Poster = videonun ilk karesi.
 *
 * Anahtar: data/categories.ts → CATEGORY_PAGES[].slug
 * ──────────────────────────────────────────────────────────────────────────── */

export interface CategoryVideo {
  src: string;
  poster: string;
  width: number;
  height: number;
  durationSec: number;
}

const video = (slug: string, durationSec: number): CategoryVideo => ({
  src: `/videos/kategori/${slug}.mp4`,
  poster: `/videos/kategori/${slug}.jpg`,
  width: 1280,
  height: 720,
  durationSec,
});

export const CATEGORY_VIDEOS: Record<string, CategoryVideo> = {
  "nitril-kapli-is-eldiveni": video("nitril-kapli-is-eldiveni", 13.2),
  "kopuk-nitril-eldiven": video("kopuk-nitril-eldiven", 13),
  "kesilmeye-direncli-eldiven": video("kesilmeye-direncli-eldiven", 10.8),
  "kaynakci-eldiveni": video("kaynakci-eldiveni", 13),
  "kimyasal-koruyucu-tulum": video("kimyasal-koruyucu-tulum", 12),
  "tek-kullanimlik-tulum": video("tek-kullanimlik-tulum", 12),
  "onluk-laboratuvar-onlugu": video("onluk-laboratuvar-onlugu", 10.8),
  "kolluk-galos-baslik": video("kolluk-galos-baslik", 13.2),
};
