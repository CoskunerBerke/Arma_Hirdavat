import Link from "next/link";
import { ArrowRight, Hand, Layers, Package } from "lucide-react";
import ProductActionVideo from "@/components/ProductActionVideo";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { categoryHref } from "@/data/categories";
import { PRODUCT_GROUPS } from "@/data/products";
import { PROMISES } from "@/data/company";
import { koliLabel, mainStandard } from "@/components/catalog/productFacts";

/*
 * Ana sayfa vitrin videosu: köpük nitril eldiven tanıtımı (temsilî klip).
 * Videonun üzerinde/altında test, laboratuvar veya ürün kodu iddiası yoktur; ürün bilgileri
 * (standart, koli içi) data/products.ts'ten okunur.
 */
const SHOWCASE_CODE = "TruFlex EN-1501";

export default function ShowcaseVideo() {
  const p = PRODUCT_GROUPS.find((x) => x.code === SHOWCASE_CODE);
  if (!p) return null;
  const standard = mainStandard(p);

  const facts = [
    { icon: Layers, label: "Kaplama", value: "Köpük nitril, 15 gauge naylon örgü" },
    { icon: Hand, label: "Standart", value: standard || "Ürün sayfasında" },
    { icon: Package, label: "Koli içi", value: koliLabel(p) },
  ];

  return (
    <section className="section" aria-labelledby="vitrin-baslik">
      <div className="container-x">
        <div className="grid gap-8 rounded-3xl border border-line bg-gradient-to-br from-white via-slate-50/70 to-white p-6 shadow-sm sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Yakından bakın</p>
            <h2 id="vitrin-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Hassas montaj için ele oturan köpük nitril eldiven
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{p.description}</p>

            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl border border-line bg-white p-3">
                  <dt className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <f.icon className="h-3.5 w-3.5 text-brand" aria-hidden />
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <RfqTriggerButton mode="open" source="anasayfa-vitrin" className="btn-action min-h-[48px] px-6" />
              <Link
                href={`/urunler/${p.slug}`}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
              >
                {p.code} ürün sayfası <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={categoryHref(p.category)}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
              >
                Tüm köpük nitril eldivenler
              </Link>
            </div>
            <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
          </div>

          <div className="flex justify-center lg:col-span-5">
            <div className="w-full max-w-[340px]">
              <ProductActionVideo
                title={`FABA ${p.code}`}
                subtitle="Köpük nitril kaplı iş eldiveni"
                standard={standard || undefined}
                disclosure="Temsilî ürün tanıtım videosu"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
