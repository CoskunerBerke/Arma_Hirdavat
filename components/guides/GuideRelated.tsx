import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductById, getProductsByCategory, parseKoli, productHref, type ProductGroup } from "@/data/products";
import { categoryHref, getCategoryBySlug, type CategoryPage } from "@/data/categories";
import GuideAddToList from "./GuideAddToList";
import { parseChemProtection, parseEn12477Type, parseEn388 } from "./standards";

/** Ürünün en ayırt edici standart bilgisi (kısa): EN 388 kodu, EN 12477 tipi, kimyasal tip… */
function keySpec(p: ProductGroup): string | null {
  const parts: string[] = [];
  const t = parseEn12477Type(p);
  if (t) parts.push(`EN 12477 Tip ${t}`);
  const e388 = parseEn388(p);
  if (e388) parts.push(`EN 388 ${e388.code}`);
  if (parts.length === 0) {
    const c = parseChemProtection(p);
    const types = [...c.fullBody, ...c.partialBody];
    if (types.length) parts.push(`Tip ${types.join("/")}`);
  }
  return parts.length ? parts.join(" · ") : null;
}

function koliText(p: ProductGroup): string {
  const k = parseKoli(p.koli);
  return k ? `Koli içi ${k.perCarton.toLocaleString("tr-TR")} ${k.unit}` : `Koli içi ${p.koli}`;
}

/** "İlgili ürünler": kategori bağlantıları + listeye eklenebilen ürün satırları. */
export default function GuideRelated({
  categorySlugs,
  productIds,
}: {
  categorySlugs: string[];
  productIds: number[];
}) {
  const cats = categorySlugs.map(getCategoryBySlug).filter((c): c is CategoryPage => Boolean(c));
  const products = productIds.map(getProductById).filter((p): p is ProductGroup => Boolean(p));
  if (cats.length === 0 && products.length === 0) return null;

  return (
    <section aria-labelledby="ilgili-urunler" className="scroll-mt-28">
      <h2 id="ilgili-urunler" className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
        İlgili ürünler
      </h2>

      {cats.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {cats.map((c) => (
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
      )}

      {products.length > 0 && (
        <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {products.map((p) => {
            const spec = keySpec(p);
            return (
              <li key={p.id} className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="photo-well relative h-16 w-16 shrink-0 bg-slate-50">
                    <Image src={p.image} alt="" fill sizes="64px" className="object-contain p-1.5" />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={productHref(p)}
                      className="line-clamp-2 text-sm font-semibold leading-snug text-ink hover:text-brand sm:text-base"
                    >
                      {p.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-muted sm:text-sm">
                      {[spec, koliText(p)].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                  <Link
                    href={productHref(p)}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl px-3 text-sm font-medium text-brand hover:bg-brand-50 sm:flex-none"
                    aria-label={`İncele: ${p.title}`}
                  >
                    İncele <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <GuideAddToList productId={p.id} productSlug={p.slug} productTitle={p.title} koli={p.koli} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
