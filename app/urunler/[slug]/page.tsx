import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, BookOpen, FileText, Ruler } from "lucide-react";
import ProductActionVideo from "@/components/ProductActionVideo";
import CategoryVideo from "@/components/catalog/CategoryVideo";
import { PRODUCT_VIDEOS } from "@/data/videos";
import ProductCard from "@/components/ProductCard";
import ProductItemsSelector from "@/components/ProductItemsSelector";
import ProductRfqBox from "@/components/ProductRfqBox";
import { splitSizes } from "@/components/quote/koli";
import { PageBanner } from "@/components/PageHero";
import CategorySidebar, { CategoryChips } from "@/components/catalog/CategorySidebar";
import ContactLinks from "@/components/catalog/ContactLinks";
import JsonLd from "@/components/catalog/JsonLd";
import QuoteSteps from "@/components/catalog/QuoteSteps";
import { GUIDES, isGloveCategory } from "@/components/catalog/guides";
import {
  catalogPageFor,
  featureBullets,
  hasSizeOptions,
  koliLabel,
  mainStandard,
  productMetaDescription,
  productSeoTitle,
  productShortLabel,
  quoteSizes,
  safeBadge,
  sizeFact,
} from "@/components/catalog/productFacts";
import { OG_BASE, absoluteUrl, breadcrumbNode, type Crumb } from "@/components/catalog/seo";
import { explainStandard } from "@/components/catalog/standards";
import { categoryHref } from "@/data/categories";
import { CTA, HOURS_TEXT, latestCatalogFor } from "@/data/company";
import {
  PRODUCT_GROUPS,
  getProduct,
  getProductsByCategory,
  getRelated,
  isFeatured,
  productHref,
  resolveLegacySlug,
  type CategoryName,
  type ProductGroup,
} from "@/data/products";

/*
 * Ürün sayfası. Eski adresler (data/legacy-slugs.ts) next.config.mjs → redirects() ile zaten
 * 308 yönlendirilir; sayfadaki resolveLegacySlug yalnızca yedek güvencedir.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_GROUPS.map((p) => ({ slug: p.slug }));
}

/** Ürün fotoğrafları 800×800 px (public/images/products/faba_<id>.jpg). */
const IMAGE_SIZE = 800;

/** Eldiven tanıtım videosu yalnızca nitril / köpük nitril kaplı eldiven sayfalarında gösterilir. */
const VIDEO_CATEGORIES: readonly CategoryName[] = ["Nitril Kaplı İş Eldivenleri", "Köpük Nitril Eldivenler"];

/** İlgili ürün ızgarası: mobil 2, lg 4 sütun. */
const RELATED_SIZES = "(min-width:1280px) 280px, (min-width:1024px) 22vw, 46vw";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  const title = productSeoTitle(p);
  const description = productMetaDescription(p);
  const url = productHref(p);
  return {
    title: title.absolute ? { absolute: title.text } : title.text,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      url,
      title: title.text,
      description,
      images: [{ url: p.image, width: IMAGE_SIZE, height: IMAGE_SIZE, alt: p.title }],
    },
  };
}

function productJsonLd(p: ProductGroup, crumbs: Crumb[]) {
  const url = absoluteUrl(productHref(p));
  const size = sizeFact(p);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#urun`,
        name: p.title,
        description: p.description,
        sku: p.code,
        mpn: p.code,
        brand: { "@type": "Brand", name: "FABA" },
        category: p.category,
        image: absoluteUrl(p.image),
        url,
        additionalProperty: [
          ...p.standards.map((s) => ({ "@type": "PropertyValue", name: "Standart", value: s })),
          { "@type": "PropertyValue", name: "Koli içi adet", value: p.koli },
          ...(p.sizes ? [{ "@type": "PropertyValue", name: size.label, value: p.sizes }] : []),
        ],
      },
      breadcrumbNode(crumbs, `${url}#breadcrumb`),
    ],
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) {
    const moved = resolveLegacySlug(params.slug);
    if (moved) permanentRedirect(productHref(moved));
    notFound();
  }

  const href = productHref(p);
  const catHref = categoryHref(p.category);
  const crumbs: Crumb[] = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Ürünler", href: "/urunler" },
    { label: p.category, href: catHref },
    { label: productShortLabel(p), href },
  ];

  const related = getRelated(p, 4);
  const categoryCount = getProductsByCategory(p.category).length;
  const features = featureBullets(p);
  // Aynı rehber (ör. kimyasal tulum tipleri) birden çok standart satırında tekrar etmesin: yalnızca ilk satırda.
  const seenGuides = new Set<string>();
  const standards = p.standards.map(explainStandard).map((s) => {
    if (!s.guide) return s;
    if (seenGuides.has(s.guide.href)) return { ...s, guide: undefined };
    seenGuides.add(s.guide.href);
    return s;
  });
  const main = mainStandard(p);
  const size = sizeFact(p);
  const badge = isFeatured(p.id) ? "Öne çıkan" : safeBadge(p);
  const catalog = latestCatalogFor("FABA");
  const catalogPage = catalogPageFor(p.id);
  const showVideo = VIDEO_CATEGORIES.includes(p.category);
  const isGlove = isGloveCategory(p.category);
  const rfqProduct: ProductGroup = { ...p, sizes: quoteSizes(p) };

  const facts: { label: string; value: ReactNode; wide?: boolean }[] = [
    { label: "Kod", value: <span className="font-mono">{p.code}</span> },
    {
      label: "Kategori",
      value: (
        <Link href={catHref} className="text-brand underline-offset-2 hover:underline">
          {p.category}
        </Link>
      ),
    },
    { label: "Koli içi", value: koliLabel(p) },
    { label: size.label, value: size.value },
    ...(main ? [{ label: "Ana standart", value: main }] : []),
    ...(p.origin ? [{ label: "Üretim yeri", value: p.origin, wide: true }] : []),
  ];

  return (
    <>
      <JsonLd data={productJsonLd(p, crumbs)} />

      <PageBanner
        crumbs={crumbs}
        label="Ürünlerimiz"
        image={PRODUCT_VIDEOS[p.id]?.poster}
        imagePosition="88% 50%"
        compact
      />

      <section className="relative isolate border-b border-line">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_100%)]" />
        <div className="container-x pb-12 lg:pb-16">
          <CategoryChips activeName={p.category} from="xl" />
          {/* Kurumsal düzen: xl+ solda kategori menüsü (lg'de içerik sütunları dar kalmasın diye xl) */}
          <div className="xl:flex xl:gap-10">
            <CategorySidebar activeName={p.category} from="xl" source={`urun-${p.slug}-yan`} className="pt-8" />
            <div className="min-w-0 flex-1">
          <div className="mt-5 grid gap-6 sm:mt-6 lg:grid-cols-12 lg:gap-10 xl:mt-8">
            {/* 1 — Başlık, görsel, künye (mobilde ilk) */}
            <div className="min-w-0 lg:col-span-7">
              <p className="eyebrow">FABA · {p.category}</p>
              <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{p.title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{p.description}</p>

              <div className="glass mt-5 rounded-3xl p-2.5 sm:p-3">
                <div className="photo-well relative aspect-[4/3] w-full rounded-2xl bg-white sm:aspect-square">
                  <Image
                    src={p.image}
                    alt={`${p.title} ürün fotoğrafı`}
                    fill
                    priority
                    sizes="(min-width:1280px) 640px, (min-width:1024px) 55vw, 92vw"
                    className="object-contain p-4 sm:p-8"
                  />
                  {badge && (
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        badge === "Öne çıkan"
                          ? "bg-amber-700 text-white"
                          : "border border-brand/20 bg-brand-50 text-brand"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className={`min-w-0 rounded-xl border border-line/70 bg-white px-3 py-2.5 ${f.wide ? "col-span-2 sm:col-span-3" : ""}`}
                  >
                    <dt className="text-xs text-ink-muted">{f.label}</dt>
                    <dd className="mt-0.5 break-words font-semibold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* 2 — Teklif kutusu: mobilde görsel ve künyenin hemen altında, masaüstünde yapışkan sağ sütun */}
            <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
              {/* Yalnızca kutu ekrana sığacak yükseklikte yapışkan: kısa ekranda (ör. 1366×768) "Listeye ekle" düğmesi ekran dışında kalıyordu */}
              <div className="space-y-4 lg:top-24 [@media(min-width:1024px)_and_(min-height:1040px)]:sticky">
                <ProductRfqBox product={rfqProduct} />
                <section aria-labelledby="urun-iletisim" className="surface p-5">
                  <h2 id="urun-iletisim" className="text-sm font-semibold text-ink">
                    Sorunuz mu var?
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    Doğru modeli veya bedeni birlikte seçelim. Çalışma saatlerimiz: {HOURS_TEXT}.
                  </p>
                  <ContactLinks
                    className="mt-2"
                    subject={`Teklif talebi – ${p.code}`}
                    body={`Merhaba,\n\n${p.title} (${p.code}) için teklif almak istiyorum.\nMiktar (koli):\nBeden:\nTeslimat ili:\n`}
                    whatsappText={`Merhaba, ${p.title} (${p.code}) için teklif almak istiyorum.`}
                  />
                </section>
              </div>
            </div>

            {/* 3 — Ayrıntılar */}
            <div className="min-w-0 space-y-6 lg:col-span-7">
              <ProductItemsSelector
                productTitle={p.title}
                productSlug={p.slug}
                items={features}
                hasSizeChoice={splitSizes(p.sizes).length > 1}
              />

              {/* Standartlar */}
              <section aria-labelledby="standartlar" className="surface p-5 sm:p-6">
                <h2 id="standartlar" className="text-base font-bold text-ink">
                  Standartlar ve anlamları
                </h2>
                {standards.length > 0 ? (
                  <ul className="mt-4 divide-y divide-line">
                    {standards.map((s) => (
                      <li key={s.raw} className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-semibold text-ink">{s.raw}</p>
                        {s.meaning && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.meaning}</p>}
                        {s.levels && s.levels.length > 0 && (
                          <dl className="mt-2 grid gap-x-4 gap-y-1 rounded-xl bg-slate-50 px-3 py-2 text-xs sm:grid-cols-2">
                            {s.levels.map((l) => (
                              <div key={l.label} className="flex justify-between gap-3">
                                <dt className="text-ink-muted">{l.label}</dt>
                                <dd className="shrink-0 font-semibold text-ink">{l.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {s.guide && (
                          <Link
                            href={s.guide.href}
                            className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                          >
                            <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
                            {s.guide.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Bu ürün için norm bilgisi listelenmiyor. Ürünün belge durumunu teklif aşamasında üretici
                    bilgisinden teyit ederiz.
                  </p>
                )}
              </section>

              {p.applications && (
                <section aria-labelledby="kullanim-alanlari" className="surface p-5 sm:p-6">
                  <h2 id="kullanim-alanlari" className="text-base font-bold text-ink">
                    Kullanım alanları
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.applications}</p>
                  <p className="mt-2 text-xs text-ink-muted">
                    Kaynak: üretici kataloğundaki önerilen kullanım alanları.
                  </p>
                </section>
              )}

              {PRODUCT_VIDEOS[p.id] && (
                <section aria-labelledby="urun-tanitimi" className="surface p-5 sm:p-6">
                  <h2 id="urun-tanitimi" className="text-base font-bold text-ink">
                    Ürün tanıtımı
                  </h2>
                  <CategoryVideo slug={`urun-${p.id}`} title={p.title} video={PRODUCT_VIDEOS[p.id]} className="mt-4" />
                </section>
              )}

              {showVideo && (
                <section aria-labelledby="tanitim-videosu" className="surface p-5 sm:p-6">
                  <h2 id="tanitim-videosu" className="text-base font-bold text-ink">
                    Tanıtım videosu
                  </h2>
                  <ProductActionVideo
                    className="mx-auto mt-4 max-w-[340px]"
                    title={p.title}
                    subtitle="Eldivenli elle metal parça kavrama"
                    standard={main || undefined}
                  />
                </section>
              )}

              {/* Belgeler ve katalog */}
              <section aria-labelledby="belgeler" className="surface p-5 sm:p-6">
                <h2 id="belgeler" className="text-base font-bold text-ink">
                  Katalog ve belgeler
                </h2>
                <ul className="mt-2">
                  {catalogPage && (
                    <li>
                      <a
                        href={`${catalog.url}#page=${catalogPage}`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand hover:underline"
                      >
                        <FileText className="h-4 w-4 shrink-0" aria-hidden />
                        Üretici kataloğunda bu ürünün sayfası (s. {catalogPage})
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={catalog.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand hover:underline"
                    >
                      <FileText className="h-4 w-4 shrink-0" aria-hidden />
                      {CTA.catalog}
                      <span className="font-normal text-ink-muted">· {catalog.size}</span>
                    </a>
                  </li>
                  {isGlove && hasSizeOptions(p.sizes) && (
                    <li>
                      <Link
                        href={GUIDES.beden.href}
                        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand hover:underline"
                      >
                        <Ruler className="h-4 w-4 shrink-0" aria-hidden />
                        {GUIDES.beden.label}
                      </Link>
                    </li>
                  )}
                </ul>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  CE uygunluk beyanı veya teknik föy gerekiyorsa teklif formundaki not alanına yazın; temin
                  edebileceğimiz belgeleri teklifle birlikte bildiririz.
                </p>
              </section>

              <QuoteSteps headingId="urun-teklif-sureci" />
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benzer ürünler */}
      {related.length > 0 && (
        <section aria-labelledby="benzer-urunler" className="bg-slate-50/60 py-12 sm:py-16">
          <div className="container-x">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="benzer-urunler" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Benzer ürünler
              </h2>
              <Link
                href={catHref}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                Tüm {p.category} ({categoryCount})
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id} className="min-w-0">
                  <ProductCard product={r} sizes={RELATED_SIZES} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
