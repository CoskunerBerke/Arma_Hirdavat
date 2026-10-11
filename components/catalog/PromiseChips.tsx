import { FileCheck2, Truck } from "lucide-react";
import { PROMISES } from "@/data/company";

/**
 * Teklif ve sevkiyat sözleri — metinler YALNIZCA data/company.ts → PROMISES'tan gelir.
 */
export default function PromiseChips({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 text-xs text-ink-soft sm:text-[13px] ${className}`}>
      <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5">
        <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
        <span>{PROMISES.quoteShort}</span>
      </li>
      <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5">
        <Truck className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
        <span>{PROMISES.deliveryShort}</span>
      </li>
    </ul>
  );
}
