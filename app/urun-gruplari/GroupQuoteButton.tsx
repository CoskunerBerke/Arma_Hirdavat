"use client";

import { MessageSquarePlus } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import { CTA } from "@/data/company";

/**
 * /urun-gruplari kartlarındaki "Listeye Ekle" (CTA.addShort) düğmesi (sayfanın tek istemci adası).
 *
 * Bu gruplar için online ürün sayfası yok: düğme teklif listesine serbest metin kalemi
 * ("<grup> – ihtiyacınızı yazın") ekler ve teklif penceresini açar. Ekleme ve pencere
 * açılış olaylarını QuoteContext kendisi ölçer.
 */
export default function GroupQuoteButton({ group }: { group: string }) {
  const { addCustomItem } = useQuote();

  return (
    <button
      type="button"
      onClick={() => addCustomItem({ title: `${group} – ihtiyacınızı yazın`, unit: "Adet", quantity: 1 }, true)}
      aria-label={`${CTA.addShort}: ${group}`}
      className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border border-action/30 bg-action-light px-4 text-sm font-semibold text-action-hover transition-colors hover:border-action hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-action/25"
    >
      <MessageSquarePlus className="h-4 w-4" aria-hidden />
      {CTA.addShort}
    </button>
  );
}
