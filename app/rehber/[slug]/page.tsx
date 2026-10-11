import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronDown, ClipboardList, Clock, Building2 } from "lucide-react";
import GuideHero from "@/components/guides/GuideHero";
import GuideToc from "@/components/guides/GuideToc";
import GuideSections from "@/components/guides/GuideSections";
import GuideRelated from "@/components/guides/GuideRelated";
import GuideCta from "@/components/guides/GuideCta";
import GuideCard from "@/components/guides/GuideCard";
import { renderRichText } from "@/components/guides/RichText";
import { JsonLd, formatTrDate, guideJsonLd } from "@/components/guides/jsonld";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { COMPANY, CTA, PROMISES } from "@/data/company";
import { categoryHref, getCategoryBySlug } from "@/data/categories";
import { GUIDES, GUIDE_HUB, getGuide, guideHref, guideReadingMinutes } from "@/data/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  const url = guideHref(g.slug);
  return {
    // Marka eki yalnızca toplam 60 karakteri aşmıyorsa eklenir (SERP'te kesilmesin)
    title: { absolute: g.title.length + 16 <= 60 ? `${g.title} | ${COMPANY.name}` : g.title },
    description: g.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: COMPANY.name,
      url,
      title: g.title,
      description: g.metaDescription,
      publishedTime: g.datePublished,
      modifiedTime: g.dateModified,
      authors: [COMPANY.name],
      images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: g.h1 }],
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  const toc = [
    ...g.sections.map((s) => ({ id: s.id, title: s.title })),
    ...(g.faqs.length > 0 ? [{ id: "sik-sorulan-sorular", title: "Sık sorulan sorular" }] : []),
    { id: "ilgili-urunler", title: "İlgili ürünler" },
  ];
  const primaryCategory = g.relatedCategorySlugs.map(getCategoryBySlug).find(Boolean);
  const others = GUIDES.filter((x) => x.slug !== g.slug);

  return (
    <>
      <article>
        <GuideHero
          crumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Rehberler", href: GUIDE_HUB.path },
            { label: g.h1, href: guideHref(g.slug) },
          ]}
          eyebrow={g.eyebrow}
          title={g.h1}
          lead={g.summary}
          meta={
            <>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Güncelleme: <time dateTime={g.dateModified}>{formatTrDate(g.dateModified)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {guideReadingMinutes(g)} dk okuma
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4" aria-hidden />
                Hazırlayan: {COMPANY.name}
              </span>
            </>
          }
        />

        <div className="container-x py-10 sm:py-14">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <aside aria-label="Rehber gezinme" className="lg:order-2">
              <div className="space-y-4 lg:sticky lg:top-28">
                <GuideToc items={toc} />
                <div className="hidden rounded-2xl border border-action-border bg-action-light p-5 lg:block">
                  <p className="text-sm font-semibold text-ink">Teklif listenizi oluşturun</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Ürünleri listeye ekleyin, tek formla fiyat isteyin. Teklifiniz e-postanıza gelir.
                  </p>
                  <RfqTriggerButton className="btn-action mt-3 min-h-[44px] w-full">
                    <ClipboardList className="h-4 w-4" aria-hidden />
                    <span>{CTA.primary}</span>
                  </RfqTriggerButton>
                  <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
                </div>
              </div>
            </aside>

            <div className="min-w-0 max-w-3xl lg:order-1">
              <GuideSections sections={g.sections} />

              {g.faqs.length > 0 && (
                <section id="sik-sorulan-sorular" aria-labelledby="sss-baslik" className="scroll-mt-28 pt-12">
                  <h2 id="sss-baslik" className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
                    Sık sorulan sorular
                  </h2>
                  <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
                    {g.faqs.map((f, i) => (
                      <details key={i} className="group">
                        <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 sm:px-5 [&::-webkit-details-marker]:hidden">
                          <h3 className="text-base font-semibold text-ink">{f.q}</h3>
                          <ChevronDown
                            className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                            aria-hidden
                          />
                        </summary>
                        <p className="px-4 pb-4 text-base leading-7 text-ink-soft sm:px-5">{renderRichText(f.a)}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="kaynaklar-baslik" className="mt-12 rounded-2xl border border-line bg-white p-5 text-sm">
                <h2 id="kaynaklar-baslik" className="text-base font-semibold text-ink">
                  Kaynaklar ve not
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
                  {g.sources.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  Bu rehber genel bilgi amaçlıdır. Kişisel koruyucu donanım seçimi işyerinizin risk değerlendirmesine
                  göre, iş güvenliği uzmanınızla birlikte yapılmalıdır. Standartların güncel sürümü esastır.
                </p>
              </section>

              <div className="mt-12">
                <GuideRelated categorySlugs={g.relatedCategorySlugs} productIds={g.relatedProductIds} />
              </div>

              <div className="mt-12">
                <GuideCta
                  text={g.ctaText}
                  browseHref={primaryCategory ? categoryHref(primaryCategory.name) : "/urunler"}
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="diger-rehberler" className="border-t border-line bg-white">
          <div className="container-x py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <h2 id="diger-rehberler" className="text-2xl font-bold tracking-tight text-ink">
                Diğer rehberler
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <GuideCard key={o.slug} guide={o} headingLevel="h3" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <JsonLd data={guideJsonLd(g)} />
    </>
  );
}
