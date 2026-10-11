import type { CategoryName } from "@/data/products";

/**
 * Rehber sayfalarına giden bağlantılar (rehber sorumlusunun oluşturduğu adresler).
 * Adres değişirse yalnızca burayı güncelleyin.
 */
export interface GuideLink {
  href: string;
  label: string;
}

export const GUIDES = {
  en388: { href: "/rehber/en-388-eldiven-kodlari", label: "EN 388 eldiven kodları nasıl okunur?" },
  kimyasalTipler: { href: "/rehber/kimyasal-tulum-tipleri", label: "Kimyasal tulum tipleri: Tip 3, 4, 5 ve 6" },
  kaynak: { href: "/rehber/kaynakci-eldiveni-tip-a-tip-b", label: "Kaynakçı eldiveni: Tip A mı, Tip B mi?" },
  beden: { href: "/rehber/is-eldiveni-beden-tablosu", label: "İş eldiveni beden tablosu" },
} as const satisfies Record<string, GuideLink>;

const GLOVE_CATEGORIES: readonly CategoryName[] = [
  "Nitril Kaplı İş Eldivenleri",
  "Köpük Nitril Eldivenler",
  "Kesilmeye Dirençli Eldivenler",
  "Kaynakçı ve Sürücü Eldivenleri",
];

export function isGloveCategory(name: CategoryName): boolean {
  return GLOVE_CATEGORIES.includes(name);
}

/** Bir kategori için ilgili rehberler (önem sırasıyla). */
export function guidesForCategory(name: CategoryName): GuideLink[] {
  if (name === "Kaynakçı ve Sürücü Eldivenleri") return [GUIDES.kaynak, GUIDES.en388, GUIDES.beden];
  if (isGloveCategory(name)) return [GUIDES.en388, GUIDES.beden];
  return [GUIDES.kimyasalTipler];
}
