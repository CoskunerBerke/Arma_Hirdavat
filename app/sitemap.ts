import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/data/company";
import { PRODUCT_GROUPS, productHref } from "@/data/products";
import { CATEGORY_PAGES } from "@/data/categories";
import { GUIDES } from "@/data/guides";

/**
 * İçeriğin son anlamlı güncelleme tarihi. Her derlemede "şimdi" yazmak Google'ın lastmod'a
 * güvenmemesine yol açar; içerik gerçekten değiştiğinde bu tarihi elle güncelleyin.
 */
const CONTENT_UPDATED = new Date("2026-10-11");

const STATIC_PATHS = [
  "/",
  "/urunler",
  "/urun-gruplari",
  "/kurumsal",
  "/markalar",
  "/katalog",
  "/iletisim",
  "/rehber",
  ...GUIDES.map((g) => `/rehber/${g.slug}`),
  "/kvkk",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview / localhost derlemeleri indekslenmez → boş site haritası
  if (!IS_INDEXABLE) return [];

  const url = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

  return [
    ...STATIC_PATHS.map((path) => ({ url: url(path), lastModified: CONTENT_UPDATED })),
    ...CATEGORY_PAGES.map((c) => ({ url: url(`/kategori/${c.slug}`), lastModified: CONTENT_UPDATED })),
    ...PRODUCT_GROUPS.map((p) => ({ url: url(productHref(p)), lastModified: CONTENT_UPDATED })),
  ];
}
