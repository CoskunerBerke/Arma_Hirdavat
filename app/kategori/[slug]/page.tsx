import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, FileText, LayoutGrid, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import CategoryFaq from "@/components/catalog/CategoryFaq";
import ComparisonTable from "@/components/catalog/ComparisonTable";
import ContactLinks from "@/components/catalog/ContactLinks";
import JsonLd from "@/components/catalog/JsonLd";
import PromiseChips from "@/components/catalog/PromiseChips";
import QuoteSteps from "@/components/catalog/QuoteSteps";
import CategoryVideo from "@/components/catalog/CategoryVideo";
import CategorySidebar, { CategoryChips } from "@/components/catalog/CategorySidebar";
import { CATEGORY_VIDEOS } from "@/data/videos";
import { guidesForCategory } from "@/components/catalog/guides";
import { koliRange } from "@/components/catalog/productFacts";
import { DEFAULT_OG_IMAGE, OG_BASE, absoluteUrl, breadcrumbNode, type Crumb } from "@/components/catalog/seo";
import { CATEGORY_PAGES, getCategoryBySlug, introParagraphs, type CategoryPage } from "@/data/categories";
import { CTA, PROMISES, latestCatalogFor } from "@/data/company";
import { CATEGORIES, getFeaturedProducts, getProductsByCategory, productHref } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_PAGES.map((c) => ({ slug: c.slug }));
}

/** Layout şablonu " | Arma Hırdavat" (16 karakter) ekler; toplam 60'ı aşacaksa marka eklenmez. */
function pageTitle(c: CategoryPage): Metadata["title"] {
  return c.seoTitle.length + 16 > 60 ? { absolute: c.seoTitle } : c.seoTitle;
}

/** Kategori için paylaşım görseli: kategorinin öne çıkan ürün fotoğrafı (yoksa ilk ürün). */
function categoryImage(c: CategoryPage) {
  const products = getProductsByCategory(c.name);
  const lead = getFeaturedProducts().find((p) => p.category === c.name) ?? products[0];
  return lead ? { url: lead.image, width: 800, height: 800, alt: lead.title } : DEFAULT_OG_IMAGE;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCategoryBySlug(params.slug);
  if (!c) return {};
  const url = `/kategori/${c.slug}`;
  return {
    title: pageTitle(c),
    description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      url,
      title: c.seoTitle,
      description: c.metaDescription,
      images: [categoryImage(c)],
    },
  };
}

/** Ürün ızgarası: mobil 2, md 3, xl 4 sütun (lg'de solda kategori menüsü var). */
const GRID_SIZES = "(min-width:1280px) 240px, (min-width:768px) 30vw, 46vw";

export default function CategoryLandingPage({ params }: { params: { slug: string } }) {
  const c = getCategoryBySlug(params.slug);
  if (!c) notFound();

  const products = getProductsByCategory(c.name);
  const url = `/kategori/${c.slug}`;
  const pageUrl = absoluteUrl(url);
  const paragraphs = introParagraphs(c);
  const koli = koliRange(products);
  const guides = guidesForCategory(c.name);
  const catalog = latestCatalogFor("FABA");
  const chapter = catalog.chapters?.find((ch) => ch.categories.includes(c.name));
  const others = CATEGORIES.filter((name) => name !== c.name)
    .map((name) => CATEGORY_PAGES.find((x) => x.name === name))
    .filter((x): x is CategoryPage => Boolean(x));

  const crumbs: Crumb[] = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Ürünler", href: "/urunler" },
    { label: c.name, href: url },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbNode(crumbs, `${pageUrl}#breadcrumb`),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#urunler`,
        name: c.name,
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(productHref(p)),
          name: p.title,
        })),
      },
      ...(c.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#sss`,
              mainEntity: c.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        eyebrow="İş güvenliği · FABA"
        title={c.h1}
        description={`FABA modellerinin standart kodlarını, beden ve koli bilgilerini karşılaştırın${
          koli ? ` (koli içi ${koli})` : ""
        }; koli ve palet bazında kurumsal teklif alın.`}
        crumbs={crumbs.slice(1)}
        emitJsonLd={false}
        label="Ürünlerimiz"
        image={CATEGORY_VIDEOS[c.slug]?.poster}
        imagePosition="88% 50%"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <RfqTriggerButton className="btn-action min-h-[44px]" source={`kategori-${c.slug}-hero`} />
          <a href="#karsilastirma" className="btn-ghost min-h-[44px]">
            <LayoutGrid className="h-4 w-4" aria-hidden />
            Modelleri karşılaştırın
          </a>
        </div>
        <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
        <PromiseChips className="mt-4 justify-center" />
      </PageHero>

      {/* Kurumsal düzen: solda kategori menüsü (lg+), dar ekranda çip şeridi */}
      <div className="container-x">
        <CategoryChips activeName={c.name} />
        <div className="lg:flex lg:gap-8 xl:gap-10">
          <CategorySidebar activeName={c.name} source={`kategori-${c.slug}-yan`} className="pb-14 pt-14" />
          <div className="sidebar-content min-w-0 flex-1">

      {/* Giriş metni + kısa künye */}
      <section aria-label={`${c.name} hakkında`} className="py-10 sm:py-14">
        <div className="container-x grid gap-8 xl:grid-cols-12 xl:gap-12">
          {paragraphs.length > 0 && (
            <div className="min-w-0 xl:col-span-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{c.name} hakkında</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                {paragraphs.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
          )}

          <aside
            aria-label="Kategori özeti"
            className={`min-w-0 ${paragraphs.length > 0 ? "xl:col-span-4" : "xl:col-span-6"}`}
          >
            <div className="surface p-5 sm:p-6">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 px-3 py-2">
                  <dt className="text-xs text-ink-muted">Model sayısı</dt>
                  <dd className="font-semibold text-ink">{products.length}</dd>
                </div>
                {koli && (
                  <div className="rounded-xl bg-slate-50 px-3 py-2">
                    <dt className="text-xs text-ink-muted">Koli içi</dt>
                    <dd className="font-semibold text-ink">{koli}</dd>
                  </div>
                )}
              </dl>

              {guides.length > 0 && (
                <>
                  <p className="mt-5 text-sm font-semibold text-ink">Seçim rehberleri</p>
                  <ul className="mt-1">
                    {guides.map((g) => (
                      <li key={g.href}>
                        <Link
                          href={g.href}
                          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand hover:underline"
                        >
                          <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
                          {g.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="mt-4 text-sm font-semibold text-ink">Üretici kataloğu</p>
              <a
                href={chapter ? `${catalog.url}#page=${chapter.startPage}` : catalog.url}
                target="_blank"
                rel="noopener"
                className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand hover:underline"
              >
                <FileText className="h-4 w-4 shrink-0" aria-hidden />
                {chapter ? `Katalogda inceleyin (s. ${chapter.pages})` : CTA.catalog}
                <span className="font-normal text-ink-muted">· PDF, {catalog.size}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Kategori tanıtım videosu (ürün fotoğraflarından üretildi) */}
      {CATEGORY_VIDEOS[c.slug] && (
        <section aria-label={`${c.name} tanıtım videosu`} className="pb-10 sm:pb-14">
          <div className="container-x max-w-4xl">
            <CategoryVideo slug={c.slug} title={c.name} />
          </div>
        </section>
      )}

      {/* Karşılaştırma tablosu */}
      <section
        aria-labelledby="karsilastirma-baslik"
        id="karsilastirma"
        className="scroll-mt-24 border-t border-line py-10 sm:py-14"
      >
        <div className="container-x">
          <h2 id="karsilastirma-baslik" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Modelleri karşılaştırın
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Standartlar üretici verisinde yazıldığı gibidir. Ayrıntı ve standartların açıklaması için ürün koduna
            tıklayın.
          </p>
          <div className="mt-6">
            <ComparisonTable
              products={products}
              headingId="karsilastirma-baslik"
              caption={`${c.name}: kod, standart, beden ve koli içi adet karşılaştırması`}
            />
          </div>
        </div>
      </section>

      {/* Ürün ızgarası */}
      <section aria-labelledby="modeller-baslik" id="modeller" className="scroll-mt-24 bg-slate-50/60 py-10 sm:py-14">
        <div className="container-x">
          <h2 id="modeller-baslik" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {c.name}: modeller
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <li key={p.id} className="min-w-0">
                <ProductCard product={p} sizes={GRID_SIZES} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Teklif çağrısı */}
      <section aria-labelledby="kategori-teklif" className="py-10 sm:py-14">
        <div className="container-x grid gap-6 xl:grid-cols-12 xl:gap-10">
          <div className="min-w-0 rounded-3xl border border-line bg-white p-5 sm:p-8 xl:col-span-7">
            <p className="eyebrow">Kurumsal teklif</p>
            <h2 id="kategori-teklif" className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {c.name} için kurumsal teklif alın
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              İhtiyacınız olan modelleri, bedenleri ve koli adedini teklif listenize ekleyin. Fiyatı miktar ve teslimat
              iline göre hazırlayıp e-postanıza göndeririz. Hangi modelin uygun olduğundan emin değilseniz işinizi ve
              riskleri not alanına yazmanız yeterli.
            </p>
            <div className="mt-5">
              <RfqTriggerButton
                className="btn-action min-h-[44px] w-full sm:w-auto"
                source={`kategori-${c.slug}-cta`}
              />
              <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">Doğrudan yazın</p>
              <ContactLinks
                className="mt-1"
                subject={`Teklif talebi – ${c.name}`}
                whatsappText={`Merhaba, ${c.name} için teklif almak istiyorum.`}
              />
            </div>
          </div>
          <QuoteSteps headingId="kategori-teklif-sureci" className="min-w-0 xl:col-span-5" />
        </div>
      </section>

      {/* Sık sorulan sorular */}
      {c.faqs.length > 0 && (
        <section aria-labelledby="kategori-sss" className="border-t border-line py-10 sm:py-14">
          <div className="container-x max-w-4xl">
            <h2 id="kategori-sss" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Sık sorulan sorular
            </h2>
            <div className="mt-6">
              <CategoryFaq faqs={c.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Diğer kategoriler ve rehberler */}
      <section aria-labelledby="diger-kategoriler" className="border-t border-line bg-slate-50/60 py-10 sm:py-14">
        <div className="container-x">
          <h2 id="diger-kategoriler" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Diğer kategoriler
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/kategori/${o.slug}`}
                  className="group flex h-full min-h-[44px] items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 transition-colors hover:border-brand/40"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink group-hover:text-brand">{o.name}</span>
                    <span className="mt-0.5 block text-xs text-ink-muted">
                      {getProductsByCategory(o.name).length} model
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Link
              href="/urunler"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Tüm ürünler
            </Link>
            <Link
              href="/urun-gruplari"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <Wrench className="h-4 w-4" aria-hidden />
              Endüstriyel malzeme ürün grupları
            </Link>
          </div>
        </div>
      </section>
          </div>
        </div>
      </div>
    </>
  );
}
