import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { BRANDS, CATALOGS, COMPANY, LEGACY_BRAND_NAMES, PROMISES, SITE_URL, mailtoHref, type Brand } from "@/data/company";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { getProductsByCategory, slugify } from "@/data/products";

const PATH = "/markalar";
const TITLE = "Markalarımız: Bosch, Makita, İzeltaş, 3M, FABA";
const DESCRIPTION =
  "FABA iş eldiveni ve koruyucu tulumlar online katalogda. Mağazamızdaki Bosch, Makita, İzeltaş, 3M, Askaynak, Loctite ve diğer markalar için teklif alın.";

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
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name} – markalar` }],
  },
};

/** "Domak Pompa A.Ş." ile "domak-pompa-a-s" gibi yazılışları aynı anahtara indirir. */
const brandKey = (name: string) => slugify(name).replace(/-/g, "");

const isFaba = (b: Brand) => brandKey(b.name).startsWith("faba");

/** BRANDS + LEGACY_BRAND_NAMES, isim (ve aliases) ile tekilleştirilmiş; FABA ayrı gösterilir. */
function mergedBrands(): Brand[] {
  const seen = new Set<string>();
  const out: Brand[] = [];
  for (const b of BRANDS) {
    const keys = [b.name, ...(b.aliases ?? [])].map(brandKey);
    if (keys.some((k) => seen.has(k))) continue;
    keys.forEach((k) => seen.add(k));
    out.push(b);
  }
  for (const name of LEGACY_BRAND_NAMES) {
    const k = brandKey(name);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ name });
  }
  return out;
}

export default function BrandsPage() {
  const all = mergedBrands();
  const faba = all.find(isFaba);
  const others = all.filter((b) => !isFaba(b));
  const catalog = CATALOGS[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${PATH}#webpage`,
    url: `${SITE_URL}${PATH}`,
    name: "Markalar",
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#store` },
    mentions: all.map((b) => ({ "@type": "Brand", name: b.name })),
  };

  return (
    <>
      <PageHero
        eyebrow="Markalarımız"
        title="Markalarımız: endüstriyel tedarikte çalıştığımız markalar"
        description="Bağlantı elemanından pompaya, el aletlerinden kaynak ekipmanına kadar tedarik ağımızdaki tanınmış markalar. Online kataloğumuzdaki iş güvenliği ürünleri FABA markalıdır."
        crumbs={[{ label: "Markalarımız", href: PATH }]}
      />

      {/* FABA — online katalogdaki tek marka (ekranın üst kısmı: Reveal yok) */}
      {faba && (
        <section className="section pb-10 sm:pb-12" aria-labelledby="faba-baslik">
          <div className="container-x">
            <div className="surface grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <div className="photo-well relative flex h-40 items-center justify-center p-6 sm:h-48">
                  {faba.logo ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={faba.logo}
                        alt={`${faba.name} logosu`}
                        fill
                        priority
                        sizes="(min-width: 1024px) 360px, 90vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-3xl font-black text-ink">{faba.name}</span>
                  )}
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="eyebrow">Online katalog</p>
                <h2 id="faba-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {faba.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  Sitemizdeki iş güvenliği ürünlerinin tamamı FABA markalıdır: nitril ve köpük nitril
                  iş eldivenleri, kesilmeye dirençli eldivenler, kaynakçı eldivenleri, kimyasal koruyucu ve tek kullanımlık
                  tulumlar, önlük, kolluk ve galoşlar. Her ürün sayfasında EN standart kodları, bedenler ve koli içi adet yazılıdır.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  FABA kataloğundaki bilgiye göre firma 2010&apos;da İstanbul&apos;da kurulmuş, 2017&apos;den bu yana
                  Kastamonu OSB&apos;deki tesisinde üretim yapıyor.
                </p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="FABA ürün kategorileri">
                  {CATEGORY_PAGES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={categoryHref(c.name)}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
                      >
                        {c.shortName}
                        <span className="text-xs text-ink-muted">{getProductsByCategory(c.name).length}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/urunler" className="btn-primary min-h-[48px] px-6">
                    FABA ürünlerini inceleyin <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="/katalog" className="btn-ghost min-h-[48px] px-6">
                    <FileText className="h-4 w-4" aria-hidden /> FABA kataloğu (PDF · {catalog.size})
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Diğer markalar */}
      <section className="section pt-10 sm:pt-12" aria-labelledby="diger-markalar-baslik">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Mağaza ve tedarik</p>
            <h2 id="diger-markalar-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Mağazamızda ve tedarik ağımızda yer alan markalar
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              Bu markaların ürünleri için fiyat teklifi alabilirsiniz. Model ve ölçü seçeneklerini teklifle bildiririz.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {others.map((b) => (
              <li key={b.name} className="surface flex flex-col p-3 sm:p-4">
                <div className="photo-well flex h-24 items-center justify-center p-3 sm:h-28">
                  {b.logo ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={b.logo}
                        alt={`${b.name} logosu`}
                        fill
                        sizes="(min-width: 1280px) 220px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="px-2 text-center text-lg font-extrabold leading-tight text-ink">{b.name}</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-1 pt-3">
                  <h3 className="text-sm font-semibold text-ink">{b.name}</h3>
                  {b.desc && <p className="mt-1 text-xs leading-relaxed text-ink-soft">{b.desc}</p>}
                  {b.group && (
                    <Link
                      href={`/urun-gruplari#${slugify(b.group)}`}
                      className="mt-auto inline-flex min-h-[36px] items-center pt-2 text-xs font-medium text-brand hover:underline"
                    >
                      {b.group}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-muted">
            Marka adları ve logoları ilgili sahiplerine aittir. Bir markanın bu sayfada yer alması, yetkili bayilik veya
            resmi iş ortaklığı anlamına gelmez. Güncel stok ve model bilgisini teklifinizde belirtiriz.
          </p>
        </div>
      </section>

      {/* Kapanış CTA */}
      <section className="container-x pb-20 sm:pb-24" aria-labelledby="cta-baslik">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1B2D] via-[#0B1528] to-[#003EA8] p-8 shadow-xl sm:p-12">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 id="cta-baslik" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Marka ve model belirtin, teklifinizi hazırlayalım.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{PROMISES.quoteTurnaround}</p>
              <a
                href={mailtoHref("Teklif talebi – marka / model")}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden /> {COMPANY.email}
              </a>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:items-start lg:items-end">
              <RfqTriggerButton mode="open" source="markalar-1" className="btn-action min-h-[48px] px-7" />
              <p className="text-center text-xs text-slate-300 sm:text-left lg:text-right">{PROMISES.quoteReassurance}</p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
