import { Clock, Truck } from "lucide-react";
import { HOURS_SHORT, PROMISES } from "@/data/company";

/**
 * Teklif ve sevkiyat sözleri — metinler YALNIZCA data/company.ts → PROMISES'tan gelir.
 * Dönüş sözü mesai saatleriyle birlikte gösterilir (dürüst aciliyet).
 */
export default function PromiseChips({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 text-xs text-ink-soft sm:text-[13px] ${className}`}>
      <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5">
        <Clock className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
        <span>
          {PROMISES.quoteShort} <span className="text-ink-muted">({HOURS_SHORT})</span>
        </span>
      </li>
      <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5">
        <Truck className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
        <span>{PROMISES.deliveryShort}</span>
      </li>
    </ul>
  );
}
