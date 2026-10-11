"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import { CTA, NAV, PROMISES } from "@/data/company";
import { useQuote } from "@/components/QuoteContext";
import { PRODUCTS_HREF, isNavActive } from "./nav-utils";
import type { HeaderNavProps } from "./types";

interface DesktopNavProps extends HeaderNavProps {
  pathname: string;
  /** Ana sayfanın koyu hero alanı üzerinde mi (açık renk metin) */
  dark: boolean;
}

function linkTone(dark: boolean, active: boolean) {
  if (dark) return active ? "text-white" : "text-slate-300 hover:text-white";
  return active ? "text-brand" : "text-ink-soft hover:text-ink";
}

/** Masaüstü ana menü (lg ve üzeri). "İş Güvenliği Ürünleri" öğesi kategori menüsü açar. */
export default function DesktopNav({ categories, totalProducts, pathname, dark }: DesktopNavProps) {
  return (
    <nav aria-label="Ana menü" className="hidden lg:block">
      <ul className="flex items-center whitespace-nowrap xl:gap-1">
        {NAV.map((item) => {
          const active = isNavActive(pathname, item.href);
          if (item.href === PRODUCTS_HREF) {
            return (
              <li key={item.href}>
                <ProductsMenu
                  label={item.label}
                  href={item.href}
                  active={active}
                  dark={dark}
                  pathname={pathname}
                  categories={categories}
                  totalProducts={totalProducts}
                />
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex h-11 items-center rounded-lg px-2 text-sm font-semibold transition-colors xl:px-3 ${linkTone(dark, active)}`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className={`absolute inset-x-2 bottom-1 h-0.5 xl:inset-x-3 rounded-full ${dark ? "bg-sky-400" : "bg-brand"}`}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

interface ProductsMenuProps extends HeaderNavProps {
  label: string;
  href: string;
  active: boolean;
  dark: boolean;
  pathname: string;
}

/**
 * Açılır kategori menüsü (disclosure deseni):
 * - Metin bağlantısı /urunler'e gider; yanındaki ok düğmesi menüyü açar/kapatır (aria-expanded)
 * - Fareyle üzerine gelince açılır, ayrılınca kısa gecikmeyle kapanır
 * - Escape kapatır ve odağı düğmeye döndürür; odak menü dışına çıkınca kapanır
 * - Kapalıyken de DOM'da (hidden) kalır: kategori bağlantıları her sayfada taranabilir
 */
function ProductsMenu({ label, href, active, dark, pathname, categories, totalProducts }: ProductsMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);
  const hoverOpenedAt = useRef(0);
  const panelId = useId();
  const { openModal: openQuote } = useQuote();

  const clearTimer = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => clearTimer, []);
  useEffect(() => setOpen(false), [pathname]);

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && e.target instanceof Node && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const close = () => {
    clearTimer();
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimer();
        timer.current = window.setTimeout(() => {
          hoverOpenedAt.current = Date.now();
          setOpen(true);
        }, 120);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimer();
        timer.current = window.setTimeout(() => setOpen(false), 220);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          close();
          buttonRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        const next = e.relatedTarget;
        if (!(next instanceof Node) || !wrapRef.current?.contains(next)) close();
      }}
    >
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative inline-flex h-11 items-center rounded-lg pl-2 pr-0.5 text-sm font-semibold xl:pl-3 transition-colors ${linkTone(dark, active)}`}
      >
        {label}
        {active && (
          <span aria-hidden className={`absolute bottom-1 left-2 right-0.5 h-0.5 xl:left-3 rounded-full ${dark ? "bg-sky-400" : "bg-brand"}`} />
        )}
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label}: kategoriler`}
        onClick={() => {
          clearTimer();
          // Fareyle az önce açıldıysa tıklama menüyü kapatmasın
          if (open && Date.now() - hoverOpenedAt.current < 500) return;
          setOpen((v) => !v);
        }}
        className={`inline-flex h-11 w-8 items-center justify-center rounded-lg transition-colors ${linkTone(dark, active)}`}
      >
        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div id={panelId} hidden={!open} className="absolute left-0 top-full z-50 whitespace-normal pt-2">
        <div className="w-[min(46rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-[minmax(0,1fr)_15rem]">
            <div className="p-3">
              <ul className="grid grid-cols-2 gap-1">
                {categories.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={close}
                      className="group flex min-h-[48px] flex-col justify-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                    >
                      <span className="text-sm font-semibold leading-snug text-ink group-hover:text-brand">{c.name}</span>
                      <span className="text-xs text-ink-muted">{c.count} ürün</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                onClick={close}
                className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-brand hover:underline"
              >
                Tüm ürünler ({totalProducts})
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="flex flex-col gap-3 border-l border-line bg-slate-50 p-5">
              <p className="text-sm font-bold leading-snug text-ink">Aradığınız ürün listede yok mu?</p>
              <p className="text-xs leading-relaxed text-ink-soft">
                İhtiyacınızı yazın; temin edebildiğimiz ürünler için fiyatıyla dönüş yapalım. {PROMISES.quoteShort}.
              </p>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => {
                  close();
                  openQuote("menu_kategori");
                }}
                className="btn-action min-h-[44px] w-full px-3 py-2 text-sm"
              >
                {CTA.primary}
              </button>
              <p className="text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
              <Link
                href="/katalog"
                onClick={close}
                className="mt-auto inline-flex min-h-[32px] items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-brand"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                FABA ürün kataloğu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
