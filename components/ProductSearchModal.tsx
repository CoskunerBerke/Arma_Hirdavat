"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Ürün arama: bağlam (SearchProvider / useProductSearch) + klavye kısayolları.
 * Pencerenin kendisi (components/nav/SearchDialog.tsx) yalnızca açılınca yüklenir;
 * ürün verisi ve arama motoru ilk sayfa yükünde indirilmez.
 *
 * Kısayollar: Ctrl+K / Cmd+K (aç/kapat), "/" (yazı alanında değilken aç).
 * Başka bir modal (teklif, mağaza, mobil menü) açıkken kısayollar devreye girmez.
 * ──────────────────────────────────────────────────────────────────────────── */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface SearchContextType {
  isOpen: boolean;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({
  isOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
});

function SearchLoading() {
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/70 p-4 pt-[15vh]">
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-ink shadow-2xl"
      >
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" aria-hidden />
        Arama açılıyor…
      </div>
    </div>
  );
}

const SearchDialog = dynamic(() => import("@/components/nav/SearchDialog"), {
  ssr: false,
  loading: () => <SearchLoading />,
});

/** Arama penceresinin kodunu önceden indirir (arama düğmesine fareyle gelince / odaklanınca). */
export function preloadSearch(): void {
  void import("@/components/nav/SearchDialog").catch(() => {
    // ağ hatası: pencere açılınca yeniden denenir
  });
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";
}

function anotherDialogOpen(): boolean {
  return document.querySelector('[role="dialog"][aria-modal="true"]') !== null;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isOpenRef = useRef(false);
  isOpenRef.current = isOpen;

  const openSearch = useCallback((initialQuery = "") => {
    setQuery(initialQuery);
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
      const key = e.key.toLowerCase();

      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && key === "k") {
        if (isOpenRef.current) {
          e.preventDefault();
          setIsOpen(false);
          return;
        }
        if (anotherDialogOpen()) return;
        e.preventDefault();
        setQuery("");
        setIsOpen(true);
        return;
      }

      if (
        e.key === "/" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !isOpenRef.current &&
        !isEditableTarget(e.target) &&
        !anotherDialogOpen()
      ) {
        e.preventDefault();
        setQuery("");
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(() => ({ isOpen, openSearch, closeSearch }), [isOpen, openSearch, closeSearch]);

  return (
    <SearchContext.Provider value={value}>
      {children}
      {isOpen && <SearchDialog query={query} setQuery={setQuery} onClose={closeSearch} />}
    </SearchContext.Provider>
  );
}

export function useProductSearch() {
  return useContext(SearchContext);
}
