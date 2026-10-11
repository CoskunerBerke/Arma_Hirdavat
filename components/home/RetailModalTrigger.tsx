"use client";

import type { ReactNode } from "react";
import { useRetailModal } from "@/components/RetailStoreModal";

/** Tekkeköy mağazası penceresini açan düğme (sunucu bileşenlerinden kullanılmak üzere). */
export default function RetailModalTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { openModal } = useRetailModal();
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => openModal()} className={className}>
      {children}
    </button>
  );
}
