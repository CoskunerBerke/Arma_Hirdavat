import { slugify, type CategoryName } from "@/data/products";
import { CATEGORY_PAGES } from "@/data/categories";

/**
 * İlk yayındaki kategori adları (eski /urunler?kategori=<ad> bağlantıları için).
 * Sıra ve kapsam yeni adlarla birebir aynıdır.
 */
const LEGACY_CATEGORY_NAMES: Record<string, CategoryName> = {
  "İşçi Eldivenleri": "Nitril Kaplı İş Eldivenleri",
  "Köpük Nitril Eldivenleri": "Köpük Nitril Eldivenler",
  "Kesilmeye Dirençli Eldivenler": "Kesilmeye Dirençli Eldivenler",
  "Kaynak & Sürücü Eldivenleri": "Kaynakçı ve Sürücü Eldivenleri",
  "Kimyasal Koruyucu Tulumlar": "Kimyasal Koruyucu Tulumlar",
  "Lamineli & SMS Tulumlar": "Tek Kullanımlık Tulumlar",
  "Önlük & Laboratuvar": "Önlük ve Laboratuvar Önlüğü",
  "Kolluk, Galoş & Başlık": "Kolluk, Galoş ve Başlık",
};

/**
 * ?kategori= değerini kategoriye çözer. Kabul edilenler: yeni kategori adı, kategori slug'ı
 * (/kategori/<slug>) ve ilk yayındaki eski kategori adları. Büyük/küçük harf ve Türkçe karakter duyarsız.
 */
export function resolveCategoryParam(value: string | null | undefined): CategoryName | null {
  const key = slugify(value ?? "");
  if (!key) return null;
  for (const c of CATEGORY_PAGES) {
    if (key === c.slug || key === slugify(c.name)) return c.name;
  }
  for (const [old, current] of Object.entries(LEGACY_CATEGORY_NAMES)) {
    if (key === slugify(old)) return current;
  }
  return null;
}
