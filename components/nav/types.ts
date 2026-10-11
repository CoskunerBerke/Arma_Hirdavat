/** Header menülerinde gösterilen kategori bağlantısı (sunucuda data/categories.ts'ten üretilir). */
export interface NavCategory {
  /** Görünen tam kategori adı (CategoryName) */
  name: string;
  /** Dar alanlar için kısa ad */
  shortName: string;
  /** "/kategori/<slug>" */
  href: string;
  /** Kategorideki ürün sayısı (gerçek katalog verisi) */
  count: number;
}

export interface HeaderNavProps {
  categories: NavCategory[];
  /** Online katalogdaki toplam ürün sayısı */
  totalProducts: number;
}

/** Açılır menüdeki tek bağlantı */
export interface NavLinkItem {
  label: string;
  href: string;
  /** Sağda gösterilen kısa not (ör. "6 ürün") */
  hint?: string;
  /** Alt çizgiyle ayrılan vurgulu bağlantı (ör. "Tüm ürünler") */
  strong?: boolean;
}

/** Ana menü öğesi. children varsa masaüstünde açılır menü, mobilde akordeon olur. */
export interface NavMenuItem {
  label: string;
  href: string;
  /** Bu öğeyi etkin sayan yol önekleri (boşsa hiçbir sayfada etkin değildir; ör. "/#hizmetler") */
  match: readonly string[];
  children?: NavLinkItem[];
  /** "products": geniş ürün paneli (iki sütun + teklif kutusu) */
  panel?: "list" | "products";
}
