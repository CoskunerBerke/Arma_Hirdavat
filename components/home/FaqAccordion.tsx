"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";

export interface FaqItem {
  q: string;
  /** Düz metin yanıt (FAQPage yapısal verisine de aynen yazılır). */
  a: string;
  /** Yanıtın altında gösterilecek isteğe bağlı bağlantı. */
  link?: { href: string; label: string; external?: boolean };
}

/**
 * Erişilebilir akordeon (WAI-ARIA APG): başlık içinde düğme, aria-expanded / aria-controls.
 * Yanıtlar sunucu HTML'inde vardır (kapalıyken `hidden`), arama motorları okuyabilir.
 */
export default function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set(defaultOpen === null ? [] : [defaultOpen]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-soru-${i}`;
        const panelId = `${baseId}-yanit-${i}`;
        return (
          <li key={f.q} className={`rounded-2xl border bg-white transition-shadow ${isOpen ? "border-brand/30 shadow-sm" : "border-line"}`}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[15px] font-semibold text-ink hover:text-brand sm:text-base"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand" : "text-ink-muted"}`}
                  aria-hidden
                />
              </button>
            </h3>
            <div id={panelId} hidden={!isOpen} className="border-t border-line/70 px-5 pb-5 pt-3 text-sm leading-relaxed text-ink-soft">
              <p>{f.a}</p>
              {f.link &&
                (f.link.external ? (
                  <a
                    href={f.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-brand hover:text-brand-hover"
                  >
                    {f.link.label} <ExternalLink className="h-4 w-4" aria-hidden />
                    <span className="sr-only">(yeni sekmede açılır)</span>
                  </a>
                ) : (
                  <Link
                    href={f.link.href}
                    className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-brand hover:text-brand-hover"
                  >
                    {f.link.label} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
