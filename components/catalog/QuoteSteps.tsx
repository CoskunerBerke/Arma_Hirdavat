import { CTA, PROMISES } from "@/data/company";

/**
 * "Teklif sürecinde neler olur?" — taahhüt merdiveni (listeye ekle → gönder → teklif e-postada).
 * Süre / sevkiyat cümleleri yalnızca PROMISES sabitlerinden gelir.
 */
export default function QuoteSteps({
  headingId = "teklif-sureci",
  as: Heading = "h2",
  className = "",
}: {
  headingId?: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  const steps = [
    {
      title: "Ürünü teklif listenize ekleyin",
      text: "Koli adedini ve gerekiyorsa bedeni yazın. Birden fazla ürünü tek talepte toplayabilirsiniz.",
    },
    {
      title: "Talebinizi gönderin",
      text: `Firma ve iletişim bilgilerinizi yazıp “${CTA.submit}” deyin. ${PROMISES.quoteReassurance}.`,
    },
    {
      title: "Resmi teknik teklifiniz gelir",
      text: PROMISES.quoteTurnaround,
    },
    {
      title: "Onaylarsanız sevk edilir",
      text: PROMISES.delivery,
    },
  ];

  return (
    <section aria-labelledby={headingId} className={`rounded-2xl border border-line bg-white p-5 sm:p-6 ${className}`}>
      <Heading id={headingId} className="text-lg font-bold text-ink">
        Teklif sürecinde neler olur?
      </Heading>
      <ol className="mt-4 space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand"
              aria-hidden
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
