import { Check } from "lucide-react";
import SizeQuotePicker from "./quote/SizeQuotePicker";

interface ProductItemsSelectorProps {
  productTitle: string;
  productSlug: string;
  /** Ürün özellik maddeleri (salt okunur gösterilir; teklif kalemi DEĞİLDİR) */
  items: string[];
  /** Verilirse beden/koli seçici gösterilir (ürün sayfasında ProductRfqBox zaten içerir; ikisini birden vermeyin) */
  sizes?: string;
  koli?: string;
  productId?: number;
  /** false → "#teklif-kutusu" bağlantısında beden yerine yalnızca koli adedinden söz edilir. */
  hasSizeChoice?: boolean;
}

/* Beden ve koli bilgisi teklif kutusunda ayrıca gösterildiği için bu maddeler tekrar listelenmez. */
const REDUNDANT = /^(beden seçenekleri|koli içi adet)\s*:/i;

/**
 * Geriye dönük uyumlu ince sarmalayıcı.
 * - `sizes` verilmezse: özellik maddelerini SALT OKUNUR listeler (eskiden maddeler "varyant" gibi
 *   seçilip teklife ekleniyordu; bu yanlış teklif kalemleri üretiyordu).
 * - `sizes` verilirse: beden matrisi (SizeQuotePicker) gösterir.
 */
export default function ProductItemsSelector({
  productTitle,
  productSlug,
  items,
  sizes,
  koli,
  productId,
  hasSizeChoice = true,
}: ProductItemsSelectorProps) {
  if (sizes !== undefined) {
    return (
      <div className="surface p-5 sm:p-6">
        <SizeQuotePicker product={{ id: productId, slug: productSlug, title: productTitle, sizes, koli }} />
      </div>
    );
  }

  const features = items.filter((it) => !REDUNDANT.test(it.trim()));
  if (features.length === 0) return null;

  return (
    <section aria-labelledby={`ozellikler-${productSlug}`} className="surface p-5 sm:p-6">
      <h2 id={`ozellikler-${productSlug}`} className="text-base font-bold text-ink">
        Öne çıkan özellikler
      </h2>
      <ul className="mt-3 space-y-2.5">
        {features.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <a
        href="#teklif-kutusu"
        className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand underline underline-offset-2"
      >
        {hasSizeChoice ? "Beden ve koli adedini seçin" : "Koli adedini seçin"}
      </a>
    </section>
  );
}
