import type { CategoryName } from "./products";

/* ────────────────────────────────────────────────────────────────────────────
 * PDF KATALOGLAR — YENİ KATALOG EKLEMEK
 *  1. PDF'i public/catalogs/ klasörüne kopyalayın (dosya adında Türkçe karakter ve boşluk olmasın,
 *     ör. "FABA-Katalog-2027.pdf"). 15 MB üstündeyse önce sıkıştırın (README > Kataloglar).
 *  2. Aşağıdaki CATALOG_LIST dizisine bir kayıt ekleyin. publishedAt alanı (YYYY-MM-DD) sıralamayı belirler:
 *     en yeni tarihli katalog /katalog sayfasında "En güncel katalog" olarak öne çıkar ve
 *     ürün sayfalarındaki "Kataloğu indir" bağlantısı (LATEST_CATALOG) otomatik olarak ona döner.
 *  3. chapters (bölüm/sayfa listesi) isteğe bağlıdır; doldurulursa "Katalogda aç (s. X)" bağlantıları oluşur.
 * ──────────────────────────────────────────────────────────────────────────── */

export interface CatalogChapter {
  title: string;
  /** Görünen sayfa aralığı (ör. "4–9") */
  pages: string;
  /** PDF'in açılacağı sayfa (#page=) */
  startPage: number;
  desc: string;
  /** İlgili site kategorileri (bağlantı için) */
  categories: CategoryName[];
}

export interface Catalog {
  /** Benzersiz kısa kimlik (ör. "faba-kkd-2026") */
  id: string;
  /** Marka / üretici (ör. "FABA") */
  brand: string;
  title: string;
  description: string;
  /** Kataloğun siteye eklendiği / yayın tarihi (YYYY-MM-DD) — sıralama buna göre */
  publishedAt: string;
  /** Rozet metni (ör. "Üretici kataloğu (FABA)") */
  updated: string;
  /** Görünen dosya boyutu (ör. "8,8 MB") */
  size: string;
  /** Görünen sayfa sayısı (ör. "48 Sayfa") */
  pages: string;
  /** public/ altındaki yol */
  url: string;
  /** İndirilirken önerilen dosya adı */
  fileName: string;
  chapters?: CatalogChapter[];
}

const CATALOG_LIST: Catalog[] = [
  {
    id: "faba-kkd",
    brand: "FABA",
    title: "FABA İş Güvenliği ve KKD Ürün Kataloğu",
    description:
      "İş eldivenleri, köpük nitril ve kesilmeye dirençli eldivenler, Zevahir kaynakçı eldivenleri, kimyasal koruyucu ve tek kullanımlık tulumlar.",
    publishedAt: "2026-10-08",
    updated: "Üretici kataloğu (FABA)",
    /** Web için sıkıştırılmış sürüm (görseller ~150 dpi; metin ve sayfa düzeni orijinalle aynı). */
    size: "8,8 MB",
    pages: "48 Sayfa",
    url: "/catalogs/FABA-Catalog-TR.pdf",
    fileName: "FABA-Katalog.pdf",
    /** Sayfa numaraları PDF'in içindekiler sayfasından alındı. */
    chapters: [
      {
        title: "Nitril kaplı iş eldivenleri",
        pages: "4–9",
        startPage: 4,
        desc: "FABA EP serisi: EP-1301, EP-1302, EP-1303, EP-1401, EP-1402, EP-1403",
        categories: ["Nitril Kaplı İş Eldivenleri"],
      },
      {
        title: "Köpük nitril eldivenler",
        pages: "10–14",
        startPage: 10,
        desc: "TruFlex EN-1501, EN-1502, EN-1503, EN-1511, EN-1512",
        categories: ["Köpük Nitril Eldivenler"],
      },
      {
        title: "Kesilmeye dirençli eldivenler",
        pages: "16–18",
        startPage: 16,
        desc: "TruCut EK-5000 (kaplamasız), EK-5610 ve EK-5620 (nitril kaplı); kesilme seviyesi C",
        categories: ["Kesilmeye Dirençli Eldivenler"],
      },
      {
        title: "Zevahir kaynakçı ve sürücü eldivenleri",
        pages: "20–26",
        startPage: 20,
        desc: "D200-35, D200-40, D300-35, D300-40 kaynakçı; D-105 sürücü; D-100 ve D-101 argon kaynak eldivenleri",
        categories: ["Kaynakçı ve Sürücü Eldivenleri"],
      },
      {
        title: "Kimyasal koruyucu tulumlar",
        pages: "29–32",
        startPage: 29,
        desc: "TruChem T-800, T-800-G, T-630, T-630-G",
        categories: ["Kimyasal Koruyucu Tulumlar"],
      },
      {
        title: "Tek kullanımlık tulumlar",
        pages: "33–36",
        startPage: 33,
        desc: "T-535 ve T-530 lamineli, T-500 SMS, T-300",
        categories: ["Tek Kullanımlık Tulumlar"],
      },
      {
        title: "Önlük, kolluk, galoş ve başlık",
        pages: "37–46",
        startPage: 37,
        desc: "LO-530, LO-531, KO-800 önlükler; LK-530, KK-800 kolluklar; AG-530, BG-530, BG-630, BG-800 galoşlar; LB-530 başlık",
        categories: ["Önlük ve Laboratuvar Önlüğü", "Kolluk, Galoş ve Başlık"],
      },
      {
        title: "Standartlar kılavuzu",
        pages: "47",
        startPage: 47,
        desc: "Koruyucu giysilerde Tip 1–6 koruma seviyeleri ve ilgili EN standartlarının kısa açıklaması",
        categories: [],
      },
    ],
  },
];

/** En yeniden eskiye sıralı katalog listesi. CATALOGS[0] her zaman en güncel katalogdur. */
export const CATALOGS: Catalog[] = [...CATALOG_LIST].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** En güncel katalog (ürün sayfalarındaki indirme bağlantısı bunu kullanır). */
export const LATEST_CATALOG: Catalog = CATALOGS[0];

/** Belirli bir markanın en güncel kataloğu (yoksa genel en güncel katalog). */
export function latestCatalogFor(brand: string): Catalog {
  const b = brand.toLocaleLowerCase("tr-TR");
  return CATALOGS.find((c) => c.brand.toLocaleLowerCase("tr-TR") === b) ?? LATEST_CATALOG;
}

/** "2026-10-08" → "Ekim 2026" */
export function formatCatalogDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
}
