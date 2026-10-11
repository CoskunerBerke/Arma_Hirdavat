import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import GuideHero from "@/components/guides/GuideHero";
import GuideCard from "@/components/guides/GuideCard";
import GuideCta from "@/components/guides/GuideCta";
import { JsonLd, hubJsonLd } from "@/components/guides/jsonld";
import { COMPANY } from "@/data/company";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { GUIDES, GUIDE_HUB } from "@/data/guides";

export const metadata: Metadata = {
  // Marka eki yalnızca toplam 60 karakteri aşmıyorsa eklenir
  title: { absolute: GUIDE_HUB.title.length + 16 <= 60 ? `${GUIDE_HUB.title} | ${COMPANY.name}` : GUIDE_HUB.title },
  description: GUIDE_HUB.metaDescription,
  alternates: { canonical: GUIDE_HUB.path },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: GUIDE_HUB.path,
    title: GUIDE_HUB.title,
    description: GUIDE_HUB.metaDescription,
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: GUIDE_HUB.h1 }],
  },
};

export default function GuidesHubPage() {
  return (
    <>
      <GuideHero
        crumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Rehberler", href: GUIDE_HUB.path },
        ]}
        eyebrow="Satın alma rehberleri"
        title={GUIDE_HUB.h1}
        lead={GUIDE_HUB.intro}
      />

      <div className="container-x py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="sr-only">Rehberler</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} headingLevel="h3" />
              </li>
            ))}
          </ul>

          <section aria-labelledby="kategoriler" className="mt-14">
            <h2 id="kategoriler" className="text-2xl font-bold tracking-tight text-ink">
              Ürün kategorileri
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft">
              Rehberlerde anlatılan kodları ürün sayfalarında da görebilirsiniz. Her kategoride EN standartları, bedenler
              ve koli içi adetler yer alır.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {CATEGORY_PAGES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={categoryHref(c.name)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line-strong bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {c.name}
                    <span className="text-ink-muted">({getProductsByCategory(c.name).length})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
            <span className="icon-tile" aria-hidden>
              <BookOpen className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">
              Tüm ürün kodları, standartlar ve koli bilgileri{" "}
              <Link href="/katalog" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand">
                FABA ürün kataloğunda
              </Link>{" "}
              da yer alır. Kataloğu ücretsiz indirebilirsiniz.
            </p>
          </div>

          <div className="mt-12">
            <GuideCta
              title="İhtiyaç listenizi oluşturun, ücretsiz teklif alın"
              text="Rehberlerden sonra ihtiyacınız netleştiyse ürünü, bedeni ve koli adedini yazın; fiyat ve sevkiyat bilgisini içeren teklifiniz e-postanıza gelir."
              browseHref="/urunler"
            />
          </div>
        </div>
      </div>

      <JsonLd data={hubJsonLd()} />
    </>
  );
}
