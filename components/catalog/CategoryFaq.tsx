import { ChevronDown } from "lucide-react";
import type { CategoryFaq as Faq } from "@/data/categories";

/**
 * Görünür SSS listesi (details/summary: JS gerektirmez, klavyeyle açılır).
 * FAQPage JSON-LD'si sayfada BU metinlerden üretilir; ikisi her zaman aynıdır.
 */
export default function CategoryFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-4 sm:px-5">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-ink sm:text-base [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-ink-soft sm:text-base">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
