"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Store, X } from "lucide-react";
import StoreInfoCard from "./StoreInfoCard";

/**
 * Üst şerit: "Perakende Satış & Mağazamız" düğmesi + küçük açılır kart (popover).
 * Tam ekran pencere değil; dışarı tıklayınca veya Escape ile kapanır, odak düğmeye döner.
 */
export default function StorePopover() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded px-1 font-semibold text-white transition-colors hover:text-accent sm:ml-1 sm:border-l sm:border-white/20 sm:pl-4"
      >
        <Store className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
        <span className="hidden min-[420px]:inline">Perakende Satış &amp; Mağazamız</span>
        <span className="min-[420px]:hidden">Perakende</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="absolute right-0 top-full z-[70] mt-2 w-[min(340px,calc(100vw-24px))] rounded-2xl border border-line bg-white p-5 text-left shadow-2xl outline-none"
        >
          <span aria-hidden className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 border-l border-t border-line bg-white" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              btnRef.current?.focus();
            }}
            aria-label="Kapat"
            className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-slate-100 hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            <Store className="h-3.5 w-3.5" aria-hidden />
            Perakende satış
          </p>
          <StoreInfoCard titleId={titleId} source="ust_serit_popover" />
        </div>
      )}
    </div>
  );
}
