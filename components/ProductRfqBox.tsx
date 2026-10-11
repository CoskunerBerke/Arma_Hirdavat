import { Clock, Truck } from "lucide-react";
import { PROMISES } from "@/data/company";
import type { ProductGroup } from "@/data/products";
import SizeQuotePicker from "./quote/SizeQuotePicker";
import { splitSizes } from "./quote/koli";

/**
 * Ürün sayfası teklif kutusu (sunucu bileşeni; etkileşimli kısım SizeQuotePicker).
 * Kutunun kökü id="teklif-kutusu": sayfadaki "Beden ve koli seçin" bağlantıları buraya iner.
 */
export default function ProductRfqBox({ product }: { product: ProductGroup }) {
  const headingId = `teklif-kutusu-${product.id}`;
  // Beden seçimi yalnızca birden fazla beden listelenmişse sunulur (SizeQuotePicker ile aynı kural).
  const hasSizeChoice = splitSizes(product.sizes).length > 1;
  return (
    <section id="teklif-kutusu" aria-labelledby={headingId} className="surface scroll-mt-24 p-5 sm:p-6">
      <p className="eyebrow">Kurumsal teklif</p>
      <h2 id={headingId} className="mt-1 text-lg font-bold leading-snug text-ink">
        Bu ürün için kurumsal teklif alın
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        {hasSizeChoice ? "Beden ve koli adedini" : "Koli adedini"} seçip listenize ekleyin. Fiyatı miktar ve teslimat
        iline göre hazırlayıp e-postanıza göndeririz.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <dt className="text-xs text-ink-muted">Koli içi adet</dt>
          <dd className="font-semibold text-ink">{product.koli}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <dt className="text-xs text-ink-muted">Beden / ölçü</dt>
          <dd className="font-semibold text-ink">{product.sizes || "Standart"}</dd>
        </div>
      </dl>

      <SizeQuotePicker
        className="mt-5"
        product={{ id: product.id, slug: product.slug, title: product.title, sizes: product.sizes, koli: product.koli }}
      />

      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-ink-soft">
        <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5">
          <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
          {PROMISES.quoteShort}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5">
          <Truck className="h-3.5 w-3.5 text-brand" aria-hidden />
          {PROMISES.deliveryShort}
        </li>
      </ul>
    </section>
  );
}
