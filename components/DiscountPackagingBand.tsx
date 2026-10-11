import { ArrowRight, CheckCircle2, ClipboardList, Layers, MapPin, Package } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import { CTA, HOURS_SHORT, PROMISES } from "@/data/company";
import { formatKoliTotal, getProductById } from "@/data/products";

/*
 * "Fiyatlar neden sitede yok?" — şeffaflık bandı (sunucu bileşeni).
 * Dosya adı geriye dönük uyumluluk için korunuyor. İskonto oranı, "en uygun fiyat" veya
 * süre vaadi YAZMAYIN; süreler yalnızca PROMISES sabitlerinden gelir.
 */
export default function DiscountPackagingBand() {
  const example = getProductById(1);
  const anchor = example ? formatKoliTotal(example, 3) : null;

  const factors = [
    {
      icon: Package,
      title: "Miktar",
      text: anchor && example ? `Kaç koli alacağınız. Örnek: ${example.code} için ${anchor}.` : "Kaç koli alacağınız.",
    },
    { icon: Layers, title: "Koli veya palet", text: "Siparişin koli koli mi, palet halinde mi gönderileceği." },
    { icon: MapPin, title: "Teslimat ili", text: "Nakliye bedeli ve süresi teslimat iline göre değişir." },
  ];

  const included = [
    "Ürün bazında birim fiyat",
    "Toplam tutar",
    "Tahmini teslim süresi",
    "Nakliye koşulları",
    "Ödeme seçenekleri",
  ];

  return (
    <section className="container-x py-10 sm:py-14" aria-labelledby="fiyatlandirma-baslik">
      <div className="overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white via-canvas to-slate-50 p-6 shadow-sm ring-1 ring-black/[0.04] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow">Şeffaf fiyatlandırma</p>
            <h2 id="fiyatlandirma-baslik" className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Fiyatlar neden sitede yok?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              Toptan alımda birim fiyat; miktara, koli ya da palet tercihine ve teslimat iline göre değişir. Herkese aynı
              liste fiyatını yazmak yerine, sizin ihtiyacınıza göre hesaplanmış fiyatı yazılı olarak iletiyoruz.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {factors.map((f) => (
                <li key={f.title} className="rounded-2xl border border-line bg-white p-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <f.icon className="h-4 w-4 text-brand" aria-hidden />
                    {f.title}
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft sm:text-[13px]">{f.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <RfqTriggerButton className="btn-action min-h-[48px] w-full px-6 sm:w-auto">
                <ClipboardList className="h-4 w-4" aria-hidden />
                <span>{CTA.primary}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </RfqTriggerButton>
              <p className="text-xs text-ink-muted sm:text-sm">{PROMISES.quoteReassurance}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-xs sm:p-6 lg:col-span-5">
            <h3 className="text-base font-semibold text-ink">Teklifinizde neler yer alır?</h3>
            <ul className="mt-4 space-y-2.5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-muted sm:text-sm">
              {PROMISES.quoteTurnaround} <span className="whitespace-nowrap">({HOURS_SHORT})</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
