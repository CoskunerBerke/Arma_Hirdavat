import HeaderClient from "@/components/nav/HeaderClient";
import type { NavCategory } from "@/components/nav/types";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { PRODUCT_GROUPS } from "@/data/products";

/**
 * Site başlığı (sunucu bileşeni). Kategori adları ve ürün sayıları burada, sunucuda
 * hesaplanır; böylece ürün verisi istemci paketine girmez. Etkileşim HeaderClient'ta.
 */
export default function Header() {
  const counts = new Map<string, number>();
  for (const p of PRODUCT_GROUPS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  const categories: NavCategory[] = CATEGORY_PAGES.map((c) => ({
    name: c.name,
    shortName: c.shortName,
    href: categoryHref(c.name),
    count: counts.get(c.name) ?? 0,
  }));

  return <HeaderClient categories={categories} totalProducts={PRODUCT_GROUPS.length} />;
}
