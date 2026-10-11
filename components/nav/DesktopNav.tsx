"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronRight, ClipboardList, Truck } from "lucide-react";
import { CTA, PROMISES } from "@/data/company";
import { useQuote } from "@/components/QuoteContext";
import { buildMainMenu, isMenuItemActive } from "./nav-utils";
import type { HeaderNavProps, NavMenuItem } from "./types";

interface DesktopNavProps extends HeaderNavProps {
  pathname: string;
}

/** Üst menü metin rengi: koyu gri, etkin/üzerine gelince vurgu rengi (beyaz zeminde 5:1). */
function tone(active: boolean) {
  return active ? "text-navy" : "text-ink-soft hover:text-navy";
}

/** Metnin altındaki vurgu çizgisi: etkin sayfada sürekli, üzerine gelince kayarak belirir. */
function Underline({ active, className = "inset-x-3" }: { active: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bottom-0 h-[3px] origin-left rounded-full bg-accent transition-transform duration-300 ${className} ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

/**
 * Masaüstü ana menü satırı (lg ve üzeri): Kurumsal · Ürün Grupları · Markalarımız · E-Kataloglar · İletişim.
 * "Kurumsal" basit açılır liste, "Ürün Grupları" iki sütunlu dengeli geniş menüdür.
 */
export default function DesktopNav({ categories, pathname }: DesktopNavProps) {
  const menu = buildMainMenu(categories);

  return (
    <nav aria-label="Ana menü" className="relative flex h-11 items-center justify-between gap-6">
      <ul className="-ml-3 flex items-center whitespace-nowrap xl:-ml-4">
        {menu.map((item) => {
          const active = isMenuItemActive(pathname, item);
          if (item.children?.length || item.columns?.length) {
            return (
              <li key={item.label} className={item.columns ? "" : "relative"}>
                <MenuDropdown item={item} active={active} pathname={pathname} />
              </li>
            );
          }
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative inline-flex h-11 items-center px-3 text-[15px] font-semibold transition-colors xl:px-4 ${tone(active)}`}
              >
                {item.label}
                <Underline active={active} className="inset-x-3 xl:inset-x-4" />
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="hidden items-center gap-2 text-[13px] font-medium text-ink-muted xl:inline-flex">
        <Truck className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
        {PROMISES.deliveryShort}
      </p>
    </nav>
  );
}

interface MenuDropdownProps {
  item: NavMenuItem;
  active: boolean;
  pathname: string;
}

/**
 * Açılır menü (disclosure deseni):
 * - Metin bağlantısı öğenin sayfasına gider; yanındaki ok düğmesi menüyü açar/kapatır (aria-expanded)
 * - Fareyle üzerine gelince açılır, ayrılınca kısa gecikmeyle kapanır
 * - Escape kapatır ve odağı düğmeye döndürür; odak menü dışına çıkınca kapanır
 * - Kapalıyken de DOM'da (hidden) kalır: bağlantılar her sayfada taranabilir
 */
function MenuDropdown({ item, active, pathname }: MenuDropdownProps) {
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

  const mega = Boolean(item.columns?.length);

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
        className={`group relative inline-flex h-11 items-center pl-3 pr-0.5 text-[15px] font-semibold transition-colors xl:pl-4 ${tone(
          active || open
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
        className={`inline-flex h-11 w-7 items-center justify-center transition-colors xl:w-8 ${tone(active || open)}`}
      >
        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div id={panelId} hidden={!open} className="absolute left-0 top-full z-50 whitespace-normal pt-px">
        {mega ? (
          <ProductsPanel item={item} pathname={pathname} onNavigate={close} />
        ) : (
          <ul className="w-64 overflow-hidden rounded-b-xl border border-t-[3px] border-line border-t-accent bg-white py-1.5 text-ink shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
            {item.children!.map((c) => {
              const here = pathname === c.href;
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    onClick={close}
                    aria-current={here ? "page" : undefined}
                    className={`group flex min-h-[44px] items-center justify-between gap-3 px-4 text-sm transition-colors hover:bg-slate-50 hover:text-navy ${
                      here ? "font-semibold text-navy" : "text-ink-soft"
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

/**
 * Dengeli ürün menüsü: solda "Endüstriyel Malzemeler", sağda "İş Güvenliği · FABA" (eşit genişlik),
 * altta teklif şeridi. İki sütun da aynı görsel ağırlıktadır: site yalnızca KKD sitesi gibi okunmaz.
 */
function ProductsPanel({ item, pathname, onNavigate }: { item: NavMenuItem; pathname: string; onNavigate: () => void }) {
  const { openModal: openQuote } = useQuote();
  const columns = item.columns ?? [];

  return (
    <div className="w-[min(64rem,calc(100vw-3rem))] overflow-hidden rounded-b-2xl border border-t-[3px] border-line border-t-accent bg-white text-ink shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
      <div className="grid grid-cols-2 divide-x divide-line">
        {columns.map((col) => (
          <div key={col.title} className="p-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-ink">
              <span aria-hidden className="h-1 w-5 rounded-full bg-accent" />
              {col.title}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-3">
              {col.links.map((c) => {
                const here = pathname === c.href;
                return (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={onNavigate}
                      aria-current={here ? "page" : undefined}
                      className={`group flex min-h-[40px] items-center gap-2 rounded-lg px-2 py-1.5 text-sm leading-snug transition-colors hover:bg-slate-50 hover:text-navy ${
                        here ? "font-semibold text-navy" : "text-ink-soft"
                      }`}
                    >
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-line-strong transition-colors group-hover:text-accent-ink"
                        aria-hidden
                      />
                      {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={col.all.href}
              onClick={onNavigate}
              className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 text-sm font-bold text-navy hover:text-accent-ink"
            >
              {col.all.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line bg-slate-50 px-5 py-3.5">
        <p className="min-w-0 text-sm text-ink-soft">
          <strong className="font-semibold text-ink">Aradığınız malzeme listede yok mu?</strong> İhtiyacınızı yazın;{" "}
          {PROMISES.quoteShort.toLocaleLowerCase("tr-TR")} hazırlayalım.
        </p>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => {
            onNavigate();
            openQuote("menu_urun_gruplari");
          }}
          className="btn-action min-h-[44px] shrink-0 px-5 py-2 text-sm"
        >
          <ClipboardList className="h-4 w-4" aria-hidden />
          {CTA.primary}
        </button>
      </div>
    </div>
  );
}
