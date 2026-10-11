import HeaderClient from "@/components/nav/HeaderClient";
import type { NavCategory } from "@/components/nav/types";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";

/**
 * Site başlığı (sunucu bileşeni). FABA kategori adları burada, sunucuda hazırlanır;
 * böylece ürün verisi istemci paketine girmez. Etkileşim HeaderClient'ta.
 */
export default function Header() {
  const categories: NavCategory[] = CATEGORY_PAGES.map((c) => ({
    name: c.name,
    shortName: c.shortName,
    href: categoryHref(c.name),
  }));

  return <HeaderClient categories={categories} />;
}
