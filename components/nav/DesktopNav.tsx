"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { CTA, PROMISES } from "@/data/company";
import { useQuote } from "@/components/QuoteContext";
import { buildMainMenu, isMenuItemActive } from "./nav-utils";
import type { HeaderNavProps, NavMenuItem } from "./types";

interface DesktopNavProps extends HeaderNavProps {
  pathname: string;
  /** Eski koyu hero varyantı için bırakıldı; artık başlık her sayfada beyazdır (yok sayılır). */
  dark?: boolean;
}

/** Üst menü metin rengi: koyu gri, etkin/üzerine gelince vurgu rengi (beyaz zeminde 5:1). */
function tone(active: boolean, dark = false) {
  if (dark) return active ? "text-accent" : "text-white/90 hover:text-accent";
  return active ? "text-accent-ink" : "text-ink-soft hover:text-accent-ink";
}

/** Metnin altındaki vurgu çizgisi: etkin sayfada sürekli, üzerine gelince kayarak belirir. */
function Underline({ active, className = "inset-x-3" }: { active: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bottom-1 h-[3px] origin-left rounded-full bg-accent transition-transform duration-300 ${className} ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

/**
 * Masaüstü ana menü (lg ve üzeri): klasik kurumsal yatay metin menüsü.
 * "Kurumsal" ve "Ürünler" üzerine gelince (veya ok düğmesiyle) açılan menüye sahiptir.
 */
export default function DesktopNav({ categories, totalProducts, pathname, dark = false }: DesktopNavProps) {
  const menu = buildMainMenu(categories, totalProducts);

  return (
    <nav aria-label="Ana menü" className="relative hidden lg:block">
      <ul className="flex items-center whitespace-nowrap xl:gap-1">
        {menu.map((item) => {
          const active = isMenuItemActive(pathname, item);
          if (item.children?.length) {
            return (
              <li key={item.label} className={item.panel === "products" ? "" : "relative"}>
                <MenuDropdown item={item} active={active} pathname={pathname} dark={dark} />
              </li>
            );
          }
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative inline-flex h-11 items-center px-3 text-[15px] font-medium transition-colors xl:px-4 ${tone(active, dark)}`}
              >
                {item.label}
                <Underline active={active} className="inset-x-3 xl:inset-x-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

interface MenuDropdownProps {
  item: NavMenuItem;
  active: boolean;
  pathname: string;
  dark?: boolean;
}

/**
 * Açılır menü (disclosure deseni):
 * - Metin bağlantısı öğenin sayfasına gider; yanındaki ok düğmesi menüyü açar/kapatır (aria-expanded)
 * - Fareyle üzerine gelince açılır, ayrılınca kısa gecikmeyle kapanır
 * - Escape kapatır ve odağı düğmeye döndürür; odak menü dışına çıkınca kapanır
 * - Kapalıyken de DOM'da (hidden) kalır: bağlantılar her sayfada taranabilir
 */
function MenuDropdown({ item, active, pathname, dark = false }: MenuDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);
  const hoverOpenedAt = useRef(0);
  const panelId = useId();

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

  const products = item.panel === "products";

  return (
    <div
      ref={wrapRef}
      className="flex items-center"
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
        href={item.href}
        aria-current={active && pathname === item.href ? "page" : undefined}
        className={`group relative inline-flex h-11 items-center pl-3 pr-0.5 text-[15px] font-medium transition-colors xl:pl-4 ${tone(
          active || open,
          dark
        )}`}
      >
        {item.label}
        <Underline active={active || open} className="left-3 right-0.5 xl:left-4" />
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${item.label}: alt menü`}
        onClick={() => {
          clearTimer();
          // Fareyle az önce açıldıysa tıklama menüyü kapatmasın
          if (open && Date.now() - hoverOpenedAt.current < 500) return;
          setOpen((v) => !v);
        }}
        className={`inline-flex h-11 w-7 items-center justify-center transition-colors xl:w-8 ${tone(active || open, dark)}`}
      >
        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={`absolute top-full z-50 whitespace-normal pt-2 ${products ? "left-1/2 -translate-x-1/2" : "left-0"}`}
      >
        {products ? (
          <ProductsPanel item={item} pathname={pathname} onNavigate={close} />
        ) : (
          <ul className="w-60 overflow-hidden rounded-b-xl border border-t-[3px] border-line border-t-accent bg-white py-1.5 text-ink shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
            {item.children!.map((c) => {
              const here = pathname === c.href;
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    onClick={close}
                    aria-current={here ? "page" : undefined}
                    className={`group flex min-h-[44px] items-center justify-between gap-3 px-4 text-sm transition-colors hover:bg-slate-50 hover:text-accent-ink ${
                      here ? "font-semibold text-accent-ink" : "text-ink-soft"
                    }`}
                  >
                    {c.label}
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-accent-ink" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Geniş ürün paneli: 8 kategori (iki sütun) + tüm ürünler / teknik hırdavat + teklif kutusu. */
function ProductsPanel({ item, pathname, onNavigate }: { item: NavMenuItem; pathname: string; onNavigate: () => void }) {
  const { openModal: openQuote } = useQuote();
  const children = item.children ?? [];
  const cats = children.filter((c) => !c.strong);
  const strong = children.filter((c) => c.strong);

  return (
    <div className="w-[min(46rem,calc(100vw-3rem))] overflow-hidden rounded-b-2xl border border-t-[3px] border-line border-t-accent bg-white text-ink shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
      <div className="grid grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-3">
          <ul className="grid grid-cols-2 gap-1">
            {cats.map((c) => {
              const here = pathname === c.href;
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    onClick={onNavigate}
                    aria-current={here ? "page" : undefined}
                    className="group flex min-h-[48px] flex-col justify-center rounded-lg px-3 py-2 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                  >
                    <span
                      className={`text-sm font-semibold leading-snug group-hover:text-accent-ink ${here ? "text-accent-ink" : "text-ink"}`}
                    >
                      {c.label}
                    </span>
                    {c.hint && <span className="text-xs text-ink-muted">{c.hint}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 flex flex-wrap gap-x-4 border-t border-line px-1 pt-1">
            {strong.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={onNavigate}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm font-bold text-brand hover:text-accent-ink hover:underline"
              >
                {c.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ))}
          </div>
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
              onNavigate();
              openQuote("menu_kategori");
            }}
            className="btn-action min-h-[44px] w-full px-3 py-2 text-sm"
          >
            {CTA.primary}
          </button>
          <p className="text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
          <Link
            href="/katalog"
            onClick={onNavigate}
            className="mt-auto inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-accent-ink"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            FABA ürün kataloğu
          </Link>
        </div>
      </div>
    </div>
  );
}
