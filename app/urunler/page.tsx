import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCatalog from "@/components/ProductCatalog";
import CustomRequest from "@/components/catalog/CustomRequest";
import PromiseChips from "@/components/catalog/PromiseChips";
import { DEFAULT_OG_IMAGE, OG_BASE } from "@/components/catalog/seo";
import { CATEGORY_PAGES } from "@/data/categories";
import { HARDWARE_GROUPS } from "@/data/company";
import { PRODUCT_GROUPS, getProductsByCategory, parseKoli } from "@/data/products";

const TITLE = "FABA İş Eldiveni ve Koruyucu Tulum Ürünleri";
const DESCRIPTION =
  "Nitril ve köpük nitril iş eldiveni, kesilmeye dirençli ve kaynakçı eldiveni, Tip 3–6 kimyasal tulum, önlük ve galoş. Koli bazında ücretsiz teklif alın.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/urunler" },
  openGraph: {
    ...OG_BASE,
    url: "/urunler",
    images: [DEFAULT_OG_IMAGE],
  },
};

/** Kategori kutusu için gerçek koli içi aralığı: "192–252 çift" */
function koliRange(name: (typeof CATEGORY_PAGES)[number]["name"]): string | null {
  const infos = getProductsByCategory(name)
    .map((p) => parseKoli(p.koli))
    .filter((k): k is NonNullable<typeof k> => Boolean(k));
  if (!infos.length || infos.some((k) => k.unit !== infos[0].unit)) return null;
  const min = Math.min(...infos.map((k) => k.perCarton));
  const max = Math.max(...infos.map((k) => k.perCarton));
  const unit = infos[0].unit;
  return min === max ? `${min} ${unit}` : `${min}–${max} ${unit}`;
}

export default function ProductsPage() {
  const total = PRODUCT_GROUPS.length;

  return (
    <>
      <PageHero
        eyebrow={`FABA KKD kataloğu · ${total} ürün`}
        title={TITLE}
        description={`Online kataloğumuzda ${CATEGORY_PAGES.length} kategoride ${total} FABA kişisel koruyucu donanım ürünü var. Her ürün sayfasında EN standart kodu, bedenler ve koli içi adet yazılıdır; siparişler koli ve palet bazında teklifle verilir.`}
        crumbs={[{ label: "Ürünler", href: "/urunler" }]}
      >
        <PromiseChips />
      </PageHero>

      {/* Taranabilir kategori bağlantıları */}
      <section aria-labelledby="kategoriler" className="border-b border-line bg-white py-10 sm:py-12">
        <div className="container-x">
          <h2 id="kategoriler" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Kategoriye göre seçin
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Her kategori sayfasında modellerin karşılaştırma tablosu, standartların anlamı ve sık sorulan sorular yer alır.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_PAGES.map((c) => {
              const count = getProductsByCategory(c.name).length;
              const koli = koliRange(c.name);
              return (
                <li key={c.slug}>
                  <Link
                    href={`/kategori/${c.slug}`}
                    className="group flex h-full min-h-[44px] items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 transition-colors hover:border-brand/40 hover:bg-slate-50"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink group-hover:text-brand">{c.name}</span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {count} model{koli ? ` · koli içi ${koli}` : ""}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-x">
          <ProductCatalog />
        </div>
      </section>

      {/* Aradığınızı bulamadınız mı? */}
      <section aria-labelledby="bulamadiniz-mi" className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="grid gap-6 rounded-3xl border border-line bg-slate-50 p-5 sm:p-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 id="bulamadiniz-mi" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Aradığınızı bulamadınız mı?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                Online katalogda yalnızca FABA iş güvenliği ürünleri listelenir. Tekkeköy&apos;deki mağazamızda ve tedarik
                ağımızda bağlantı elemanlarından el aletlerine, kaynak ekipmanından hortum ve vanalara kadar{" "}
                {HARDWARE_GROUPS.length} teknik hırdavat ürün grubu daha bulunur.
              </p>
              <Link
                href="/urun-gruplari"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                <Wrench className="h-4 w-4" aria-hidden />
                {HARDWARE_GROUPS.length} teknik hırdavat ürün grubunu görün
              </Link>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
              <p className="mb-3 text-sm leading-relaxed text-ink-soft">
                Ürün adını, ölçüsünü ve yaklaşık miktarını yazın; teklif listenize serbest kalem olarak eklenir.
              </p>
              <CustomRequest />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
