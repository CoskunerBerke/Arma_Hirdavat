/** Header menülerinde gösterilen kategori bağlantısı (sunucuda data/categories.ts'ten üretilir). */
export interface NavCategory {
  /** Görünen tam kategori adı (CategoryName) */
  name: string;
  /** Dar alanlar için kısa ad */
  shortName: string;
  /** "/kategori/<slug>" */
  href: string;
}

export interface HeaderNavProps {
  categories: NavCategory[];
}

/** Açılır menüdeki tek bağlantı */
export interface NavLinkItem {
  label: string;
  href: string;
  /** Alt çizgiyle ayrılan vurgulu bağlantı (ör. "Tüm ürün grupları") */
  strong?: boolean;
}

/** Geniş ürün menüsündeki sütun (ör. "Endüstriyel Malzemeler" / "İş Güvenliği · FABA") */
export interface NavColumn {
  title: string;
  links: NavLinkItem[];
  /** Sütunun altındaki "tümü" bağlantısı */
  all: NavLinkItem;
}

/** Ana menü öğesi. children / columns varsa masaüstünde açılır menü, mobilde akordeon olur. */
export interface NavMenuItem {
  label: string;
  href: string;
  /** Bu öğeyi etkin sayan yol önekleri */
  match: readonly string[];
  /** Basit açılır liste */
  children?: NavLinkItem[];
  /** Geniş (mega) menü sütunları */
  columns?: NavColumn[];
}
