"use client";

import { ClipboardList } from "lucide-react";
import { CTA } from "@/data/company";
import { useQuote } from "@/components/QuoteContext";
import { splitLeadWord } from "./nav-utils";

interface QuoteButtonProps {
  /**
   * "header": dar ekranda kısa etiket ("Teklif Al" / "Teklif 3"), sm ve üzerinde tam etiket.
   * "block": her ekranda tam etiket, tam genişlik (mobil menü).
   */
  variant?: "header" | "block";
  className?: string;
  /** Teklif penceresi açılmadan hemen önce (ör. menüyü kapatmak için) */
  onBeforeOpen?: () => void;
  /** Analitik için açılış kaynağı (QuoteContext.openModal) */
  source?: string;
}

/**
 * Sitenin birincil eylemi. Liste boşken CTA.primary ("Ücretsiz Teklif Al"),
 * listede ürün varken CTA.openList + adet gösterir.
 */
export default function QuoteButton({ variant = "header", className = "", onBeforeOpen, source = "header" }: QuoteButtonProps) {
  const { items, openModal } = useQuote();
  const count = items.length;
  const split = splitLeadWord(CTA.primary);
  const shortList = CTA.openList.split(" ")[0] || CTA.openList;

  const label = count > 0 ? `${CTA.openList} (${count} ürün)` : CTA.primary;

  const onClick = () => {
    onBeforeOpen?.();
    openModal(source);
  };

  if (variant === "block") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-label={label}
        className={`btn-action min-h-[48px] w-full justify-between px-4 text-base ${className}`}
      >
        <span className="inline-flex items-center gap-2">
          <ClipboardList className="h-5 w-5 shrink-0" aria-hidden />
          {count > 0 ? CTA.openList : CTA.primary}
        </span>
        {count > 0 && (
          <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white px-2 text-xs font-black text-action-active">
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={label}
      className={`btn-action h-11 shrink-0 gap-2 whitespace-nowrap px-3 py-0 text-sm sm:px-4 ${className}`}
    >
      <ClipboardList className="h-4 w-4 shrink-0" aria-hidden />
      {count > 0 ? (
        <>
          <span className="sm:hidden">{shortList}</span>
          <span className="hidden sm:inline">{CTA.openList}</span>
          <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-black text-action-active">
            {count}
          </span>
        </>
      ) : split ? (
        <span>
          <span className="hidden sm:inline">{split[0]} </span>
          {split[1]}
        </span>
      ) : (
        <span>{CTA.primary}</span>
      )}
    </button>
  );
}
