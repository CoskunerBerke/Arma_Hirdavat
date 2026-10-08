import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/urunler", changeFrequency: "daily" as const, priority: 0.95 },
    { path: "/kurumsal", changeFrequency: "monthly" as const, priority: 0.75 },
    { path: "/markalar", changeFrequency: "monthly" as const, priority: 0.75 },
    { path: "/katalog", changeFrequency: "monthly" as const, priority: 0.70 },
    { path: "/iletisim", changeFrequency: "weekly" as const, priority: 0.80 },
  ].map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const products = PRODUCT_GROUPS.map((p) => ({
    url: `${SITE_URL}/urunler/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...pages, ...products];
}
