import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { HARDWARE_GROUPS } from "@/data/company";
import { getProductsByCategory, isFeatured, parseKoli, PRODUCT_GROUPS, type ProductGroup } from "@/data/products";

/*
 * Hero'nun hemen altındaki taranabilir kategori ızgarası (sunucu bileşeni).
 * Bağlantı metni = kategori adı (alıcıların arama dili). Sayılar ve koli aralıkları veriden üretilir.
 * Kısa açıklamalar kullanım alanını anlatır; performans iddiası (EN kodu, seviye) İÇERMEZ.
 */
const BLURB: Record<string, string> = {
  "nitril-kapli-is-eldiveni": "Genel montaj, taşıma ve depo işleri",
  "kopuk-nitril-eldiven": "Hassas montaj ve güvenli kavrama",
  "kesilmeye-direncli-eldiven": "Keskin kenarlı sac, cam ve parça ile çalışma",
  "kaynakci-eldiveni": "Elektrot, gazaltı ve TIG kaynağı; deri sürücü eldiveni",
  "kimyasal-koruyucu-tulum": "Sıvı jeti, sprey, toz ve sıçramaya karşı Tip 3–6 tulumlar",
  "tek-kullanimlik-tulum": "Toz ve hafif sıvı sıçramasına karşı lamineli, SMS ve ekonomik tulumlar",
  "onluk-laboratuvar-onlugu": "Laboratuvar ve kimyasal işlemler için önlükler",
  "kolluk-galos-baslik": "Kolluk, ayakkabı ve bot galoşu, koruyucu başlık",
};

/** "Koli içi 192–252 çift" (birimler farklıysa veya veri yoksa null) */
function koliRange(products: ProductGroup[]): string | null {
  const infos = products.map((p) => parseKoli(p.koli)).filter((i): i is NonNullable<typeof i> => i !== null);
  if (infos.length === 0) return null;
  const units = new Set(infos.map((i) => i.unit));
  if (units.size !== 1) return null;
  const unit = infos[0].unit;
  const min = Math.min(...infos.map((i) => i.perCarton));
  const max = Math.max(...infos.map((i) => i.perCarton));
  const fmt = (n: number) => n.toLocaleString("tr-TR");
  return min === max ? `Koli içi ${fmt(min)} ${unit}` : `Koli içi ${fmt(min)}–${fmt(max)} ${unit}`;
}

export default function CategoryGrid() {
  const tiles = CATEGORY_PAGES.map((c) => {
    const products = getProductsByCategory(c.name);
    const cover = products.find((p) => isFeatured(p.id)) ?? products[0];
    return { c, count: products.length, cover, koli: koliRange(products) };
  }).filter((t) => t.count > 0);

  return (
    <section aria-labelledby="kategoriler-baslik" className="border-b border-line bg-white py-12 sm:py-16">
      <div className="container-x">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Kategoriler</p>
            <h2 id="kategoriler-baslik" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Kategoriye göre iş güvenliği ürünleri
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft sm:text-base">
              {tiles.length} kategoride {PRODUCT_GROUPS.length} FABA ürünü. Her ürün sayfasında EN standartları, bedenler
              ve koli içi adet yazılıdır.
            </p>
          </div>
          <Link
            href="/urunler"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
          >
            Tüm ürünler <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {tiles.map(({ c, count, cover, koli }) => (
            <li key={c.slug} className="min-w-0">
              <Link
                href={categoryHref(c.name)}
                className="surface group flex h-full items-center gap-4 p-3 hover:border-brand/40 hover:shadow-md sm:p-4"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-line sm:h-20 sm:w-20">
                  {cover && (
                    <Image src={cover.image} alt="" fill sizes="80px" className="object-contain p-1.5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-snug text-ink group-hover:text-brand sm:text-base">
                    {c.name}
                  </h3>
                  {BLURB[c.slug] && (
                    <p className="mt-0.5 hidden text-sm leading-relaxed text-ink-soft sm:block">{BLURB[c.slug]}</p>
                  )}
                  <p className="mt-1 text-xs text-ink-muted">
                    {count} ürün{koli ? ` · ${koli}` : ""}
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden
                />
              </Link>
            </li>
          ))}

          <li className="min-w-0">
            <Link
              href="/urun-gruplari"
              className="surface group flex h-full items-center gap-4 border-dashed p-3 hover:border-brand/40 hover:shadow-md sm:p-4"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand ring-1 ring-brand/15 sm:h-20 sm:w-20">
                <Wrench className="h-7 w-7" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug text-ink group-hover:text-brand sm:text-base">
                  Teknik hırdavat: {HARDWARE_GROUPS.length} ürün grubu
                </h3>
                <p className="mt-0.5 hidden text-sm leading-relaxed text-ink-soft sm:block">
                  Bağlantı elemanı, el aletleri, kaynak ve pnömatik ürünler
                </p>
                <p className="mt-1 text-xs text-ink-muted">Serbest metinle teklif isteyin</p>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
