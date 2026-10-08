"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, ClipboardList, Trash2, X } from "lucide-react";
import { useQuote } from "./QuoteContext";

export default function FloatingQuoteBar() {
  const { items, isOpen, setIsOpen, clearQuote, lastAdded } = useQuote();
  const [showToast, setShowToast] = useState(false);

  // Show a floating confirmation toast for 3 seconds whenever a new item is added
  useEffect(() => {
    if (!lastAdded) return;
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 3500);
    return () => clearTimeout(timer);
  }, [lastAdded]);

  if (items.length === 0 || isOpen) return null;

  const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 1), 0);

  return (
    <aside aria-label="Teklif Sepeti Özeti" className="fixed bottom-4 inset-x-3 z-40 mx-auto max-w-3xl sm:bottom-6 sm:inset-x-6">
      {/* Mini notification popup right above the bar when item is added */}
      {showToast && lastAdded && (
        <div className="mb-2 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/90 px-4 py-2.5 text-xs font-medium text-emerald-200 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>
              Sepete Eklendi: <strong>{lastAdded.qty} {lastAdded.unit} {lastAdded.title}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-emerald-300 hover:text-white ml-2"
            aria-label="Bildirimi kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main floating bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-slate-950/90 p-3.5 text-white shadow-2xl backdrop-blur-xl transition-all sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-action text-white shadow-md">
            <ClipboardList className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-900 ring-2 ring-slate-950 shadow-sm">
              {items.length}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white sm:text-base">
                Teklif Sepeti: <span className="text-emerald-300">{items.length} Kalem</span>
              </p>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                Toplam {totalQuantity} Birim
              </span>
            </div>
            <p className="truncate text-xs text-slate-400 sm:max-w-md">
              {items.map((x) => `${x.quantity} ${x.unit} ${x.productTitle}`).join(" • ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto pt-1 sm:pt-0 border-t border-white/10 sm:border-t-0">
          <button
            type="button"
            onClick={clearQuote}
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white shrink-0 transition"
            title="Sepeti Temizle"
            aria-label="Sepeti Temizle"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn-action flex-1 sm:flex-initial py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold shadow-xl shadow-action/40 justify-center"
          >
            <span className="hidden sm:inline">Sepeti İncele & Teklif İste (RFQ)</span>
            <span className="sm:hidden">Teklif İste ({items.length} Kalem)</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
