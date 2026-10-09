"use client";

import React from "react";
import { ClipboardList, Plus } from "lucide-react";
import { useQuote, type SupplyUnit } from "./QuoteContext";

interface RfqTriggerButtonProps {
  children?: React.ReactNode;
  className?: string;
  item?: {
    productTitle: string;
    productSlug?: string;
    quantity?: number;
    unit?: SupplyUnit;
    spec?: string;
  };
  mode?: "open" | "add_and_open";
}

export default function RfqTriggerButton({
  children,
  className = "btn-primary",
  item,
  mode = item ? "add_and_open" : "open",
}: RfqTriggerButtonProps) {
  const { setIsOpen, addItem } = useQuote();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mode === "add_and_open" && item) {
      addItem({
        productTitle: item.productTitle,
        productSlug: item.productSlug,
        quantity: item.quantity || 1,
        unit: item.unit || "Koli",
        spec: item.spec,
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children ? (
        children
      ) : (
        <>
          <ClipboardList className="h-4 w-4" aria-hidden />
          <span>Fiyat Teklifi Al</span>
        </>
      )}
    </button>
  );
}
