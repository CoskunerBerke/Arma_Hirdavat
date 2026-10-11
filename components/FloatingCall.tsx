"use client";

import { Phone } from "lucide-react";
import { PRIMARY_PHONE } from "@/data/company";
import { EVENTS, track } from "@/lib/track";
import { useQuote } from "./QuoteContext";

/**
 * Sabit arama düğmesi. Yalnızca doğrulanmış bir telefon numarası varsa görünür
 * (data/company.ts → CONTACT_NUMBERS_VERIFIED). Teklif çubuğu görünürken mobilde gizlenir,
 * geniş ekranda çubuğun (ve "eklendi" bildiriminin) üstüne çıkar; asla üst üste binmez.
 */
export default function FloatingCall() {
  const { items, isOpen, hydrated } = useQuote();
  if (!PRIMARY_PHONE) return null;

  const quoteBarVisible = hydrated && items.length > 0 && !isOpen;

  return (
    <a
      href={PRIMARY_PHONE.href}
      onClick={() => track(EVENTS.phoneClick, { yer: "sabit_dugme" })}
      aria-label={`Telefonla arayın: ${PRIMARY_PHONE.label}`}
      className={`fixed right-4 z-40 h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-xl transition-colors duration-200 hover:bg-brand-hover sm:right-6 sm:h-14 sm:w-14 ${
        quoteBarVisible ? "bottom-4 hidden sm:inline-flex sm:bottom-40" : "bottom-4 inline-flex sm:bottom-6"
      }`}
    >
      <Phone className="h-5 w-5" aria-hidden />
    </a>
  );
}
