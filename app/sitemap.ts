import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/urunler", "/kurumsal", "/markalar", "/katalog", "/iletisim"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p === "/urunler" ? 0.9 : 0.7,
  }));
  const products = PRODUCT_GROUPS.map((p) => ({
    url: `${SITE_URL}/urunler/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...pages, ...products];
}
