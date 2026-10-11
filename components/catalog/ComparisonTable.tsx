import Link from "next/link";
import { productHref, type ProductGroup } from "@/data/products";
import { koliLabel, safeBadge, sizeText } from "./productFacts";

/** "FABA EP-1301 Nitril Kaplı İş Eldiveni" → "Nitril Kaplı İş Eldiveni" (kod sütunda ayrıca yazıyor). */
function nameWithoutCode(p: ProductGroup): string {
  const prefix = `FABA ${p.code}`;
  const rest = p.title.startsWith(prefix) ? p.title.slice(prefix.length).trim() : p.title;
  return rest || p.title;
}

/**
 * Kategori karşılaştırma tablosu (sunucuda çizilir). Tüm değerler data/products.ts'den,
 * standartlar veride yazıldığı gibi. Dar ekranda tablo kendi içinde yatay kayar.
 */
export default function ComparisonTable({
  products,
  headingId,
  caption,
}: {
  products: ProductGroup[];
  headingId: string;
  caption: string;
}) {
  return (
    <div
      role="region"
      aria-labelledby={headingId}
      tabIndex={0}
      className="w-full overflow-x-auto rounded-2xl border border-line bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-50 text-xs font-semibold text-ink-soft">
          <tr>
            <th scope="col" className="px-4 py-3">
              Kod
            </th>
            <th scope="col" className="px-4 py-3">
              Ürün
            </th>
            <th scope="col" className="px-4 py-3">
              Standartlar
            </th>
            <th scope="col" className="px-4 py-3">
              Beden / ölçü
            </th>
            <th scope="col" className="px-4 py-3">
              Koli içi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line align-top">
          {products.map((p) => {
            const badge = safeBadge(p);
            return (
              <tr key={p.id}>
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-mono text-[13px] font-bold text-brand">
                  <Link href={productHref(p)} className="inline-flex min-h-[24px] items-center hover:underline">
                    {p.code}
                  </Link>
                </th>
                <td className="px-4 py-3">
                  <Link href={productHref(p)} className="font-medium text-ink hover:text-brand hover:underline">
                    {nameWithoutCode(p)}
                  </Link>
                  {badge && <span className="mt-1 block text-xs text-ink-muted">{badge}</span>}
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {p.standards.length > 0 ? (
                    <ul className="space-y-0.5">
                      {p.standards.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-ink-muted">Belirtilmemiş</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-soft">{sizeText(p)}</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink">{koliLabel(p)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
