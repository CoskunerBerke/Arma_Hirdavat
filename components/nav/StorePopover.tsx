"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Store, X } from "lucide-react";
import StoreInfoCard from "./StoreInfoCard";

/**
 * Üst şerit: "Perakende Satış & Mağazamız" düğmesi + küçük açılır kart (popover).
 * Tam ekran pencere değil; dışarı tıklayınca veya Escape ile kapanır, odak düğmeye döner.
 */
export default function StorePopover({ dark = false }: { dark?: boolean }) {
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
        aria-label="Perakende satış ve mağazamız"
        className={`inline-flex h-11 min-w-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-2.5 text-sm font-semibold transition-colors xl:px-3 ${
          dark
            ? "border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-accent hover:text-accent"
            : "border-line-strong bg-white text-ink-soft hover:border-accent hover:text-ink"
        }`}
      >
        <Store className={`h-[18px] w-[18px] shrink-0 ${dark ? "text-accent" : "text-brand"}`} aria-hidden />
        <span className="hidden 2xl:inline">Perakende Satış &amp; Mağazamız</span>
        <span className="hidden sm:inline lg:hidden xl:inline 2xl:hidden">Perakende</span>
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
