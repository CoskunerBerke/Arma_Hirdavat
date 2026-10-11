"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { CTA } from "@/data/company";
import { QUOTE_DEFAULT_QTY, useQuote } from "./QuoteContext";

interface ProductCardQuickAddProps {
  title: string;
  slug: string;
  /** Koli içi adet ("252 Çift"): teklif listesinde "3 koli = 756 çift" dönüşümü için (isteğe bağlı) */
  koli?: string;
  productId?: number;
  className?: string;
}

/** Ürün kartında hızlı ekleme: 1 koli, beden belirtilmeden. Bedenler ürün sayfasında seçilir. */
export default function ProductCardQuickAdd({ title, slug, koli, productId, className = "" }: ProductCardQuickAddProps) {
  const { addItem } = useQuote();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ kind: "product", productTitle: title, productSlug: slug, productId, koli, unit: "Koli", quantity: QUOTE_DEFAULT_QTY });
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-bold transition-colors duration-200 sm:text-sm ${
          added
            ? "bg-action text-white"
            : "border border-action-border bg-action-light text-action-hover hover:bg-action hover:text-white"
        } ${className}`}
      >
        {added ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
        <span className="sr-only">{title}: </span>
        {added ? (
          CTA.added
        ) : (
          <>
            <span className="sm:hidden">Ekle</span>
            <span className="hidden sm:inline">{CTA.addShort}</span>
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {added ? `${CTA.added}: ${title}` : ""}
      </span>
    </>
  );
}
