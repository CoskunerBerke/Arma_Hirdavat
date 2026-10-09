"use client";

import React, { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useQuote } from "./QuoteContext";

export default function ProductCardQuickAdd({ title, slug }: { title: string; slug: string }) {
  const { addItem } = useQuote();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        productTitle: title,
        productSlug: slug,
        unit: "Koli",
        quantity: 50,
      },
      false // never auto-open modal!
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all duration-200 shrink-0 sm:px-3 sm:py-1.5 sm:text-xs active:scale-95 ${
        added
          ? "bg-action text-white shadow-xs ring-2 ring-action/20"
          : "bg-emerald-50 text-action hover:bg-action hover:text-white border border-emerald-200/90 shadow-2xs"
      }`}
      title="Teklif listesine ekle"
      aria-label={`${title} ürününü teklif listesine ekle`}
    >
      {added ? (
        <>
          <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden sm:inline">Eklendi</span>
          <span className="sm:hidden text-[10px]">✓</span>
        </>
      ) : (
        <>
          <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden sm:inline">+ Teklife Ekle</span>
          <span className="sm:hidden text-[10px]">+ Teklif</span>
        </>
      )}
    </button>
  );
}
