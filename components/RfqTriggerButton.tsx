"use client";

import React from "react";
import { ClipboardList } from "lucide-react";
import { CTA } from "@/data/company";
import { QUOTE_DEFAULT_QTY, useQuote, type QuoteItemKind, type SupplyUnit } from "./QuoteContext";

interface RfqTriggerButtonProps {
  /** Verilirse etiket yerine bu içerik gösterilir (liste sayısı eklenmez) */
  children?: React.ReactNode;
  /** Varsayılan "btn-action" */
  className?: string;
  item?: {
    productTitle: string;
    productSlug?: string;
    productId?: number;
    quantity?: number;
    unit?: SupplyUnit;
    spec?: string;
    koli?: string;
    kind?: QuoteItemKind;
  };
  /** "open": pencereyi açar · "add_and_open": item'ı ekleyip pencereyi açar */
  mode?: "open" | "add_and_open";
  /** children yokken liste boşsa gösterilecek etiket (varsayılan CTA.primary) */
  label?: string;
  /** children yokken ve liste doluyken "Teklif Listesi (n)" göster (varsayılan true) */
  showCount?: boolean;
  /** Analitik: hangi düğmeden açıldı (ör. "hero", "bant") */
  source?: string;
  id?: string;
  "aria-describedby"?: string;
}

export default function RfqTriggerButton({
  children,
  className = "btn-action",
  item,
  mode = item ? "add_and_open" : "open",
  label,
  showCount = true,
  source,
  id,
  "aria-describedby": describedBy,
}: RfqTriggerButtonProps) {
  const { openModal, addItem, items } = useQuote();
  const count = items.length;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mode === "add_and_open" && item) {
      addItem(
        {
          ...item,
          quantity: item.quantity ?? QUOTE_DEFAULT_QTY,
          unit: item.unit ?? "Koli",
        },
        true
      );
    } else {
      openModal(source);
    }
  };

  const text = showCount && count > 0 ? `${CTA.openList} (${count})` : (label ?? CTA.primary);

  return (
    <button type="button" id={id} aria-describedby={describedBy} onClick={handleClick} className={className}>
      {children ?? (
        <>
          <ClipboardList className="h-4 w-4" aria-hidden />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
