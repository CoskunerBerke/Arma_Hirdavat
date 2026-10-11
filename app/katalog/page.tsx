import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Package, Ruler, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import CatalogActions from "./CatalogActions";
import { COMPANY, PROMISES, SITE_URL, CTA } from "@/data/company";
import { CATALOGS, LATEST_CATALOG, formatCatalogDate, type Catalog } from "@/data/catalogs";
import { categoryHref } from "@/data/categories";

const PATH = "/katalog";
const latest = LATEST_CATALOG;
const olderCatalogs = CATALOGS.slice(1);
const single = CATALOGS.length === 1;

/* Sayfa adı "E-Kataloglar" (adres /katalog olarak kalır). Katalog sayısı yazılmaz (işletme kuralı). */
const TITLE = "E-Kataloglar – Üretici Katalogları (PDF)";
const DESCRIPTION = `Üretici ve distribütör e-kataloglarını PDF olarak görüntüleyin veya indirin. En güncel: ${latest.title}. Üyelik gerekmez.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: PATH,
    title: `${TITLE} | ${COMPANY.name}`,
    description: DESCRIPTION,
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name} – e-kataloglar` }],
  },
};

function CatalogMeta({ catalog, latestBadge }: { catalog: Catalog; latestBadge?: boolean }) {
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Katalog bilgileri">
      {latestBadge && (
        <li className="rounded-full bg-action px-2.5 py-0.5 text-xs font-semibold text-white">En güncel katalog</li>
      )}
      <li className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">{catalog.updated}</li>
      <li className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand">{catalog.pages}</li>
      <li className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">PDF · {catalog.size}</li>
      <li className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
        Eklenme: {formatCatalogDate(catalog.publishedAt)}
      </li>
    </ul>
  );
}

export default function CatalogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${PATH}#webpage`,
    url: `${SITE_URL}${PATH}`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#store` },
    hasPart: CATALOGS.map((c) => ({
      "@type": "DigitalDocument",
      name: c.title,
      url: `${SITE_URL}${c.url}`,
      encodingFormat: "application/pdf",
      datePublished: c.publishedAt,
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Üretici ve distribütör katalogları"
        title="E-Kataloglar"
        description="Çalıştığımız üretici ve distribütörlerin güncel e-kataloglarını görüntüleyin veya PDF olarak indirin. En yeni katalog en üstte yer alır; üyelik gerekmez."
        crumbs={[{ label: "E-Kataloglar", href: PATH }]}
      />

      <section className="section py-10 sm:py-16">
        <div className="container-x max-w-5xl">
          {/* En güncel katalog (ekranın üst kısmı: Reveal yok) */}
          <div className="surface rounded-3xl p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-md sm:h-16 sm:w-16">
                  <FileText className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                </span>
                <div className="min-w-0">
                  <CatalogMeta catalog={latest} latestBadge={!single} />
                  <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">{latest.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{latest.description}</p>
                </div>
              </div>

              <div className="shrink-0">
                <CatalogActions url={latest.url} fileName={latest.fileName} size={latest.size} downloadLabel={CTA.catalog} />
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-line pt-6 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-4">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden /> CE işareti ve EN standart kodları
              </li>
              <li className="flex items-center gap-2">
                <Ruler className="h-4 w-4 shrink-0 text-brand" aria-hidden /> Beden ve ölçü tabloları
              </li>
              <li className="flex items-center gap-2">
                <Package className="h-4 w-4 shrink-0 text-brand" aria-hidden /> Koli içi adet bilgileri
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0 text-brand" aria-hidden /> Bölümlerden ürün sayfalarına bağlantı
              </li>
            </ul>
          </div>

          {/* En güncel kataloğun içindekiler listesi */}
          {latest.chapters && latest.chapters.length > 0 && (
            <div className="mt-12 sm:mt-14">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Katalog içeriği</p>
                  <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">Bölümler ve sayfa numaraları</h2>
                </div>
                <Link
                  href="/urunler"
                  className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  Tüm ürünleri sitede inceleyin <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
                {latest.chapters.map((ch) => (
                  <li key={ch.title} className="surface flex flex-col p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-ink">{ch.title}</h3>
                      <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                        s. {ch.pages}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{ch.desc}</p>
                    <div className="mt-auto flex flex-wrap gap-x-4 pt-3">
                      <a
                        href={`${latest.url}#page=${ch.startPage}`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        Katalogda aç (s. {ch.startPage})<span className="sr-only">, PDF yeni sekmede açılır</span>
                      </a>
                      {ch.categories.map((c) => (
                        <Link
                          key={c}
                          href={categoryHref(c)}
                          className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand"
                        >
                          {c} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Diğer / önceki kataloglar */}
          {olderCatalogs.length > 0 && (
            <div className="mt-12 sm:mt-14">
              <p className="eyebrow">Arşiv</p>
              <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">Diğer e-kataloglar</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {olderCatalogs.map((c) => (
                  <li key={c.id} className="surface flex flex-col gap-4 p-5 sm:p-6">
                    <div className="min-w-0">
                      <CatalogMeta catalog={c} />
                      <h3 className="mt-2 text-base font-semibold text-ink sm:text-lg">{c.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                    </div>
                    <div className="mt-auto">
                      <CatalogActions url={c.url} fileName={c.fileName} size={c.size} downloadLabel={CTA.catalog} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-xs leading-relaxed text-ink-muted">
            Kataloglar ilgili üreticilere aittir; ürün bilgileri üreticinin beyanıdır. Web sürümleri sıkıştırılmıştır (metin ve
            sayfa düzeni aynıdır). Güncel ürün ve ambalaj bilgisini teklifinizde teyit ederiz.
          </p>
        </div>
      </section>

      {/* Teklif CTA */}
      <section className="container-x pb-20 sm:pb-24" aria-labelledby="cta-baslik">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1B2D] via-[#0B1528] to-[#003EA8] p-8 shadow-xl sm:p-12">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 id="cta-baslik" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Katalogda beğendiğiniz ürünler için teklif alın.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Ürün kodunu ve koli adedini yazmanız yeterli. {PROMISES.quoteTurnaround}
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:items-start lg:items-end">
              <RfqTriggerButton mode="open" source="katalog-1" className="btn-action min-h-[48px] px-7" />
              <p className="text-center text-xs text-slate-300 sm:text-left lg:text-right">{PROMISES.quoteReassurance}</p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
