"use client";

import { Phone } from "lucide-react";
import { COMPANY } from "@/data/company";
import { useQuote } from "./QuoteContext";

/** Sabit hızlı arama butonu — Teklif sepeti barı varken çakışmaması için yukarı kayar */
export default function FloatingCall() {
  const { items, isOpen } = useQuote();
  const hasQuoteBar = items.length > 0 && !isOpen;

  return (
    <a
      href={COMPANY.phones[0].href}
      aria-label={`Hemen arayın: ${COMPANY.phones[0].label}`}
      className={`fixed right-4 sm:right-6 z-40 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-brand text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-brand-hover ${
        hasQuoteBar ? "bottom-24 sm:bottom-28" : "bottom-4 sm:bottom-6"
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-brand/30 [animation-duration:2.5s]" aria-hidden />
      <Phone className="relative h-5 w-5" aria-hidden />
    </a>
  );
}
