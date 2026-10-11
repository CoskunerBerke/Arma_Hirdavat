"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Yatay çip şeridi: yüklenince etkin çipi ([data-active]) şeridin görünür alanına kaydırır.
 * Yalnızca şeridin kendi yatay kaydırması değişir (sayfa dikey kaydırılmaz).
 */
export default function ActiveChipScroller({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = ref.current;
    const chip = row?.querySelector<HTMLElement>("[data-active]");
    if (!row || !chip) return;
    const left = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollLeft = Math.max(0, left);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
}
