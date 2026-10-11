import { COMPANY, SITE_URL } from "@/data/company";

/**
 * Sayfa düzeyindeki openGraph nesnesi kökteki nesnenin YERİNE geçer (Next birleştirmez);
 * bu yüzden her sayfa bu tabanı yayıp kendi url / images alanını ekler.
 */
export const OG_BASE = {
  type: "website",
  locale: "tr_TR",
  siteName: COMPANY.name,
} as const;

/** public/og/arma-og.png: varsayılan paylaşım görseli. */
export const DEFAULT_OG_IMAGE = {
  url: "/og/arma-og.png",
  width: 1200,
  height: 630,
  alt: `${COMPANY.name}: FABA iş eldiveni ve koruyucu giyim, koli bazında kurumsal teklif`,
} as const;

/** "/urunler/x" → "https://alanadi/urunler/x" */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface Crumb {
  label: string;
  href: string;
}

/** Ana Sayfa dahil tam kırıntı listesinden schema.org BreadcrumbList düğümü. */
export function breadcrumbNode(crumbs: Crumb[], id?: string) {
  return {
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}
