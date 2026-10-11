import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/data/company";

/**
 * Production: her şey açık + site haritası.
 * Preview / localhost: hiçbir yol ENGELLENMEZ (Disallow: / yok). Engellenirse Google sayfayı
 * okuyamaz ve "noindex" başlığını göremez; dizinden çıkarma noindex (next.config.mjs
 * X-Robots-Tag + layout robots meta) ile yapılır.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
