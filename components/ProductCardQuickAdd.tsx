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
      className={`inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold transition shrink-0 sm:px-2.5 sm:text-xs ${
        added
          ? "bg-emerald-600 text-white shadow-sm"
          : "border border-line bg-canvas text-ink hover:border-brand/40 hover:bg-white hover:text-brand"
      }`}
      title="Koli olarak teklif sepetine ekle"
      aria-label={`${title} ürününü teklif sepetine ekle`}
    >
      {added ? (
        <>
          <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Eklendi</span>
        </>
      ) : (
        <>
          <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>+ Sepet</span>
        </>
      )}
    </button>
  );
}
