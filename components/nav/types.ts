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
