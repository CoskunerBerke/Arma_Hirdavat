"use client";

import { Check, Plus } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import { CTA } from "@/data/company";

interface Props {
  productId: number;
  productSlug: string;
  productTitle: string;
  /** Koli içi adet metni ("252 Çift") — teklif listesinde koli → adet dönüşümü için */
  koli?: string;
}

/**
 * Rehberdeki ürün satırından tek dokunuşla teklif listesine ekleme (pencere açılmaz).
 * Ürün zaten listedeyse düğme listeyi açar (miktar sessizce artmaz).
 */
export default function GuideAddToList({ productId, productSlug, productTitle, koli }: Props) {
  const { items, addItem, setIsOpen } = useQuote();
  const inList = items.some((x) => x.productSlug === productSlug);

  return (
    <button
      type="button"
      onClick={() =>
        inList
          ? setIsOpen(true)
          : addItem({ productId, productSlug, productTitle, unit: "Koli", quantity: 1, koli }, false)
      }
      aria-label={inList ? `${CTA.added}: ${productTitle} (${CTA.openList} açılır)` : `${CTA.addShort}: ${productTitle}`}
      className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-xl border px-3.5 text-sm font-semibold transition-colors ${
        inList
          ? "border-action-border bg-action-light text-action-active"
          : "border-action-border bg-white text-action-active hover:bg-action hover:text-white"
      }`}
    >
      {inList ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
      <span>{inList ? CTA.added : CTA.addShort}</span>
    </button>
  );
}
