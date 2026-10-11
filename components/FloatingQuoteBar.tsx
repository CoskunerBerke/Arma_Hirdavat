"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Sabit teklif listesi çubuğu (liste doluyken, pencere kapalıyken görünür).
 * - Mobilde tek satır: [temizle] [Teklif Listesini Gönder (n)]
 * - "Teklif listesine eklendi" bildirimi + ekran okuyucu duyurusu (role=status)
 * - "Listeyi temizle" geri alınabilir (10 sn; üzerine gelince / odaktayken süre durur)
 * - Çubuk görünürken sayfa sonuna aynı yükseklikte boşluk eklenir: içerik çubuğun altında kalmaz.
 *   <html data-quote-bar="visible"> diğer sabit öğeler (ör. ürün sayfası alt çubuğu) için ipucudur.
 * - z-40: başlık (z-50) ve pencerelerin (z-50 / z-[70]) altında kalır.
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ClipboardList, Trash2, X } from "lucide-react";
import { PROMISES } from "@/data/company";
import { useQuote, type QuoteItem } from "./QuoteContext";
import { unitLower } from "./quote/koli";

const TOAST_MS = 4000;
const UNDO_MS = 10000;

export default function FloatingQuoteBar() {
  const { items, isOpen, openModal, clearQuote, restoreItems, lastAdded, hydrated } = useQuote();
  const [toast, setToast] = useState<string | null>(null);
  const [spoken, setSpoken] = useState<{ text: string; key: number } | null>(null);
  const [undoItems, setUndoItems] = useState<QuoteItem[] | null>(null);
  const [undoPaused, setUndoPaused] = useState(false);
  const undoBtnRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const focusCtaNext = useRef(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const count = items.length;
  const hasItems = count > 0;
  const visible = hydrated && hasItems && !isOpen;

  /* Eklendi bildirimi (pencere açıkken pencerenin kendi duyurusu var) */
  useEffect(() => {
    if (!lastAdded || isOpenRef.current) return;
    const text = `${lastAdded.qty.toLocaleString("tr-TR")} ${unitLower(lastAdded.unit)} ${lastAdded.title}`;
    setToast(text);
    setSpoken({ text: `Teklif listesine eklendi: ${text}`, key: lastAdded.at });
    const t = window.setTimeout(() => setToast(null), TOAST_MS);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  /* Geri al: yeni ürün eklenince veya liste geri yüklenince düşer */
  useEffect(() => {
    if (hasItems) setUndoItems(null);
  }, [hasItems]);

  useEffect(() => {
    if (!undoItems || undoPaused) return;
    const t = window.setTimeout(() => setUndoItems(null), UNDO_MS);
    return () => window.clearTimeout(t);
  }, [undoItems, undoPaused]);

  useEffect(() => {
    if (undoItems) undoBtnRef.current?.focus();
  }, [undoItems]);

  // Çubuk yeniden görününce (geri al / çubuktan açılan pencere kapanınca) odak kaybolduysa düğmeye al.
  // Çubuğun düğmesi pencere açıkken DOM'dan kalktığı için useModal odağı geri veremez.
  useEffect(() => {
    if (visible && focusCtaNext.current) {
      focusCtaNext.current = false;
      const active = document.activeElement;
      if (!active || active === document.body) ctaRef.current?.focus();
    }
  }, [visible]);

  /* Sayfa sonu boşluğu dışındaki sabit öğeler için ipucu */
  useEffect(() => {
    const html = document.documentElement;
    if (visible) html.setAttribute("data-quote-bar", "visible");
    else html.removeAttribute("data-quote-bar");
    return () => html.removeAttribute("data-quote-bar");
  }, [visible]);

  const handleClear = () => {
    setUndoPaused(false);
    setUndoItems(items);
    setToast(null);
    clearQuote();
    setSpoken({ text: "Teklif listesi temizlendi. Geri almak için Geri al düğmesini kullanabilirsiniz.", key: Date.now() });
  };

  const handleUndo = () => {
    if (!undoItems) return;
    focusCtaNext.current = true;
    restoreItems(undoItems);
    setUndoItems(null);
    setSpoken({ text: "Teklif listesi geri yüklendi.", key: Date.now() });
  };

  return (
    <>
      {/* Ekran okuyucu duyuruları: bölge her zaman DOM'da, içerik değişince okunur */}
      <div className="sr-only" role="status" aria-live="polite">
        {spoken && <span key={spoken.key}>{spoken.text}</span>}
      </div>

      {undoItems && !hasItems && !isOpen && (
        <div
          className="fixed inset-x-3 bottom-3 z-[45] mx-auto flex max-w-md items-center gap-2 rounded-2xl bg-slate-900 py-1.5 pl-4 pr-1.5 text-sm text-white shadow-2xl sm:bottom-6"
          onMouseEnter={() => setUndoPaused(true)}
          onMouseLeave={() => setUndoPaused(false)}
          onFocus={() => setUndoPaused(true)}
          onBlur={() => setUndoPaused(false)}
        >
          <span className="min-w-0 flex-1">Teklif listesi temizlendi.</span>
          <button
            ref={undoBtnRef}
            type="button"
            onClick={handleUndo}
            className="inline-flex min-h-[44px] items-center rounded-xl px-3 font-bold text-emerald-300 underline underline-offset-2 hover:bg-white/10"
          >
            Geri al
          </button>
          <button
            type="button"
            onClick={() => setUndoItems(null)}
            aria-label="Bildirimi kapat"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      {visible && (
        <>
          <aside aria-label="Teklif listesi" className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl sm:inset-x-6 sm:bottom-6">
            {toast && (
              <div className="mb-2 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-950/95 py-1 pl-3 pr-1 text-xs text-emerald-100 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 sm:text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 truncate">
                  Teklif listesine eklendi: <strong className="font-semibold text-white">{toast}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  aria-label="Bildirimi kapat"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-emerald-200 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-white shadow-2xl backdrop-blur sm:gap-3 sm:p-3">
              <div className="hidden min-w-0 flex-1 items-center gap-3 sm:flex">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10" aria-hidden="true">
                  <ClipboardList className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-slate-900">
                    {count}
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">
                    Teklif listeniz: <span className="text-emerald-300">{count} kalem</span>
                  </p>
                  <p className="truncate text-xs text-slate-300">{PROMISES.quoteReassurance}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClear}
                aria-label="Listeyi temizle"
                title="Listeyi temizle"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>

              <button
                ref={ctaRef}
                type="button"
                onClick={() => {
                  focusCtaNext.current = true;
                  openModal("alt_cubuk");
                }}
                className="btn-action min-h-[44px] flex-1 px-3 text-[13px] sm:flex-initial sm:px-6 sm:text-sm"
              >
                <ClipboardList className="hidden h-4 w-4 min-[380px]:block sm:hidden" aria-hidden />
                <span>Teklif Listesini Gönder ({count})</span>
                <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden />
              </button>
            </div>
          </aside>
          {/* Sayfa sonu boşluğu: altbilgi (#0B1328) ile aynı renk, içerik çubuğun altında kalmaz */}
          <div aria-hidden="true" className="h-24 shrink-0 bg-[#0B1328] sm:h-28" />
        </>
      )}
    </>
  );
}

