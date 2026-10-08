import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, Phone, Shield, Package, Ruler, Factory, FileCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import ProductItemsSelector from "@/components/ProductItemsSelector";
import ProductRfqBox from "@/components/ProductRfqBox";
import Reveal from "@/components/Reveal";
import { COMPANY, SITE_URL } from "@/data/company";
import { PRODUCT_GROUPS, getProduct, getRelated } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_GROUPS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  const title = `${p.code} ${p.title} | Toptan Fiyat Teklifi & 81 İl Sevkiyat`;
  const description = `${p.title} (${p.code}) koli ve palet alımlarında kurumsal iskonto. ${p.description} Koli içi: ${p.koli}. Beden: ${p.sizes}. FABA Kastamonu OSB üretimi toptan tedarik.`;

  return {
    title,
    description,
    keywords: [
      `toptan ${p.code.toLowerCase()}`,
      `faba ${p.code.toLowerCase()}`,
      `${p.title.toLowerCase()} toptan teklif`,
      `koli palet ${p.code.toLowerCase()}`,
      `${p.category.toLowerCase()} toptan`,
      "faba iş güvenliği kastamonu osb",
      "toptan kkd ürünleri türkiye",
    ],
    alternates: { canonical: `/urunler/${p.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/urunler/${p.slug}`,
      images: [{ url: p.image, alt: `${p.title} (${p.code}) Toptan KKD` }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = getRelated(p);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": `${p.title} (${p.code})`,
        "description": p.description,
        "image": `${SITE_URL}${p.image}`,
        "category": p.category,
        "sku": p.code,
        "brand": {
          "@type": "Brand",
          "name": "FABA Safety",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "TRY",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": COMPANY.name,
            "url": SITE_URL,
          },
          "areaServed": {
            "@type": "Country",
            "name": "Türkiye",
            "identifier": "TR",
          },
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitText": "Koli / Palet",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": SITE_URL,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Ürünler",
            "item": `${SITE_URL}/urunler`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${p.code} - ${p.title}`,
            "item": `${SITE_URL}/urunler/${p.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <PageHero
        eyebrow={`${p.category} • Kod: ${p.code}`}
        title={p.title}
        description={p.description}
        crumbs={[
          { label: "Ürünler", href: "/urunler" },
          { label: p.code, href: `/urunler/${p.slug}` },
        ]}
      />

      <section className="section py-8 sm:py-16">
        <div className="container-x grid gap-8 lg:gap-12 lg:grid-cols-12">
          {/* Sol Kolon: Görsel + Teknik Detay Tablosu + Ürün Kalemleri */}
          <Reveal className="lg:col-span-7 min-w-0">
            {/* Ürün Görsel Kartı */}
            <div className="glass mx-auto max-w-[620px] p-3 sm:p-4 rounded-3xl">
              <div className="photo-well relative aspect-square w-full rounded-2xl bg-white p-4 sm:p-8">
                <Image
                  src={p.image}
                  alt={`${p.title} (${p.code}) resmi ürün görseli`}
                  fill
                  priority
                  sizes="(min-width:1024px) 600px, 92vw"
                  className="object-contain p-4"
                />
                {p.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {p.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Teknik Özellikler Özeti (Teknik Tablo Kartı) */}
            <div className="mt-6 rounded-2xl border border-line bg-white p-4 sm:p-6 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-brand" /> Teknik Parametreler & Lojistik
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3 border border-line/60">
                  <span className="text-[11px] font-medium text-ink-muted block flex items-center gap-1">
                    <Package className="h-3.5 w-3.5 text-brand" /> Koli İçi Adet
                  </span>
                  <span className="mt-1 text-xs sm:text-sm font-bold text-ink block">
                    {p.koli}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-line/60">
                  <span className="text-[11px] font-medium text-ink-muted block flex items-center gap-1">
                    <Ruler className="h-3.5 w-3.5 text-brand" /> Mevcut Bedenler
                  </span>
                  <span className="mt-1 text-xs sm:text-sm font-bold text-ink block">
                    {p.sizes || "Standart"}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-50 p-3 border border-line/60">
                  <span className="text-[11px] font-medium text-ink-muted block flex items-center gap-1">
                    <Factory className="h-3.5 w-3.5 text-brand" /> Üretim Tesisi
                  </span>
                  <span className="mt-1 text-xs sm:text-sm font-bold text-emerald-700 block">
                    Kastamonu OSB (%100 Yerli)
                  </span>
                </div>
              </div>

              {/* Standartlar */}
              {p.standards && p.standards.length > 0 && (
                <div className="mt-4 pt-4 border-t border-line/60">
                  <span className="text-xs font-semibold text-ink-soft block mb-2 flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-brand" /> Sertifikalar & Standart Normları:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.standards.map((std) => (
                      <span
                        key={std}
                        className="inline-flex items-center rounded-lg bg-blue-50/80 border border-blue-200/80 px-2.5 py-1 text-xs font-semibold text-brand"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Uygulama / Kullanım Alanları */}
              {p.applications && (
                <div className="mt-4 pt-4 border-t border-line/60">
                  <span className="text-xs font-semibold text-ink-soft block mb-1">
                    Önerilen Uygulama ve Sektörler:
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-ink-soft">
                    {p.applications}
                  </p>
                </div>
              )}
            </div>

            {/* Ürün Maddeleri & Hızlı Çoklu Seçici */}
            <div className="mt-6">
              <ProductItemsSelector productTitle={p.title} productSlug={p.slug} items={p.items} />
            </div>
          </Reveal>

          {/* Sağ Kolon: Hacimli RFQ Teklif Kutusu & İletişim */}
          <Reveal className="lg:col-span-5 min-w-0" delay={80}>
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Hacimli Teklif Kutusu (RFQ) */}
              <ProductRfqBox product={p} />

              {/* Doğrudan İletişim & Danışma */}
              <div className="surface p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-ink">B2B Kurumsal Satış & Sevkiyat Hattı</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  81 il OSB ve fabrikalara doğrudan ambar ve tır sevkiyatı yapılmaktadır.
                </p>
                <div className="mt-3.5 space-y-2.5 text-xs sm:text-sm">
                  <a href={COMPANY.phones[0].href} className="flex items-center gap-2.5 text-ink-soft hover:text-brand font-medium">
                    <Phone className="h-4 w-4 text-brand shrink-0" aria-hidden /> {COMPANY.phones[0].label}
                  </a>
                  <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Teklif Talebi: ${p.code} - ${p.title}`)}`} className="flex items-center gap-2.5 text-ink-soft hover:text-brand font-medium">
                    <Mail className="h-4 w-4 text-brand shrink-0" aria-hidden /> {COMPANY.email}
                  </a>
                </div>
                <div className="mt-4 pt-3.5 border-t border-line/60">
                  <Link
                    href="/katalog"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                  >
                    Resmi FABA Kataloğunu İndir (PDF) <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benzer / Aynı Kategorideki Ürünler */}
      {related.length > 0 && (
        <section className="section border-t border-line py-12 sm:py-16 bg-slate-50/50">
          <div className="container-x">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Aynı Kategorideki Ürünler</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  {p.category} Grubu
                </h2>
              </div>
              <Link href="/urunler" className="text-xs sm:text-sm font-semibold text-brand hover:underline">
                Tümünü Gör →
              </Link>
            </div>
            <ul className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id} className="min-w-0">
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
