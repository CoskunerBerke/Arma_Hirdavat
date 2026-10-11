import { COMPANY, SITE_URL } from "@/data/company";
import { GUIDE_HUB, GUIDES, guideHref, guideWordCount, type Guide } from "@/data/guides";

/*
 * Rehber yapısal verisi. Yazar / yayıncı, app/layout.tsx'teki işletme düğümüne
 * (@id: SITE_URL/#store) bağlanır; site düğümü @id: SITE_URL/#website.
 * Yorum, puan veya ürün fiyatı içermez.
 */

const STORE_ID = `${SITE_URL}/#store`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

const organization = {
  "@type": "Organization",
  "@id": STORE_ID,
  name: COMPANY.name,
  url: SITE_URL,
};

const publisher = {
  ...organization,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 256, height: 256 },
};

function breadcrumb(id: string, items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function guideJsonLd(g: Guide) {
  const url = abs(guideHref(g.slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.h1,
        description: g.metaDescription,
        image: [`${SITE_URL}/og/arma-og.png`],
        datePublished: g.datePublished,
        dateModified: g.dateModified,
        inLanguage: "tr-TR",
        wordCount: guideWordCount(g),
        author: organization,
        publisher,
        mainEntityOfPage: { "@type": "WebPage", "@id": url, url, name: g.title, inLanguage: "tr-TR", isPartOf: { "@id": WEBSITE_ID } },
        isPartOf: { "@id": `${abs(GUIDE_HUB.path)}#page` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(`${url}#breadcrumb`, [
        { name: "Ana Sayfa", path: "/" },
        { name: "Rehberler", path: GUIDE_HUB.path },
        { name: g.h1, path: guideHref(g.slug) },
      ]),
    ],
  };
}

export function hubJsonLd() {
  const url = abs(GUIDE_HUB.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: GUIDE_HUB.h1,
        description: GUIDE_HUB.metaDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": STORE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: GUIDES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: abs(guideHref(g.slug)),
            name: g.h1,
          })),
        },
      },
      breadcrumb(`${url}#breadcrumb`, [
        { name: "Ana Sayfa", path: "/" },
        { name: "Rehberler", path: GUIDE_HUB.path },
      ]),
    ],
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** "2026-10-11" → "11 Ekim 2026" (sunucu saat diliminden bağımsız) */
export function formatTrDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}
