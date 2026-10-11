import { ArrowRight, ClipboardList, ListChecks, Mail, Truck } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { CTA, HOURS_SHORT, PROMISES } from "@/data/company";
import { formatKoliTotal, getProductById } from "@/data/products";

/*
 * "Nasıl çalışır?" — belirsizliği azaltan 3 adım (sunucu bileşeni).
 * Süre / sevkiyat ifadeleri yalnızca PROMISES sabitlerinden gelir.
 */
export default function HowItWorks() {
  // Gerçek koli adediyle miktar çapası (ör. "5 koli = 1.260 çift")
  const example = getProductById(7) ?? getProductById(1);
  const anchor = example ? formatKoliTotal(example, 5) : null;

  const steps = [
    {
      icon: ListChecks,
      title: "Listenizi oluşturun",
      text: `Ürün sayfalarında “${CTA.addToList}” ile ürün, beden ve koli adedini seçin. Listede olmayan ürünleri serbest metinle ekleyebilirsiniz.`,
      note: example && anchor ? `Örnek: ${example.code} · ${anchor}` : null,
    },
    {
      icon: Mail,
      title: "Teklifiniz e-postanıza gelsin",
      text: "Birim fiyat, toplam tutar, tahmini teslim süresi ve nakliye koşullarını içeren yazılı teklifi e-postanıza gönderiyoruz.",
      note: `${PROMISES.quoteShort} (mesai: ${HOURS_SHORT})`,
    },
    {
      icon: Truck,
      title: "Onaylayın, sevk edelim",
      text: "Teklifi onaylarsanız faturanızı düzenler, siparişinizi Tekkeköy depomuzdan yola çıkarırız.",
      note: PROMISES.deliveryShort,
    },
  ];

  return (
    <section aria-labelledby="nasil-calisir-baslik" className="bg-canvas py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Nasıl çalışır?</p>
          <h2 id="nasil-calisir-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Üç adımda toptan fiyat teklifi
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            Teklif almak ücretsizdir ve sizi bağlamaz. Listenizi gönderirsiniz, fiyatı görüp sonra karar verirsiniz.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((s, i) => (
            <li key={s.title} className="surface relative flex flex-col p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <s.icon className="h-5 w-5 text-brand" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                <span className="sr-only">{i + 1}. adım: </span>
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              {s.note && (
                <p className="mt-4 rounded-lg bg-action-light px-3 py-2 text-xs font-semibold text-action-active">{s.note}</p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
          <RfqTriggerButton className="btn-action min-h-[48px] w-full px-6 sm:w-auto">
            <ClipboardList className="h-4 w-4" aria-hidden />
            <span>{CTA.primary}</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </RfqTriggerButton>
          <p className="text-xs text-ink-muted sm:text-sm">{PROMISES.quoteReassurance}</p>
        </div>
      </div>
    </section>
  );
}
