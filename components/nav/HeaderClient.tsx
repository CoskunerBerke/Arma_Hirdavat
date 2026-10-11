"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, FileCheck2, Mail, Menu, Search, Store, X } from "lucide-react";
import { COMPANY, PROMISES, mailtoHref } from "@/data/company";
import { track, EVENTS } from "@/lib/track";
import { preloadSearch, useProductSearch } from "@/components/ProductSearchModal";
import DesktopNav from "./DesktopNav";
import MobileMenu, { MOBILE_MENU_ID } from "./MobileMenu";
import QuoteButton from "./QuoteButton";
import StoreInfoCard from "./StoreInfoCard";
import type { HeaderNavProps } from "./types";

/** Arama çubuğundaki yer tutucu metin (masaüstü ve mobilde aynı) */
const SEARCH_PLACEHOLDER = "Malzeme adı, parça veya standart ara…";

/*
 * Başlık düzeni:
 * 1) İnce lacivert üst şerit (kaydırınca yukarıda kalır): solda teklif taahhüdü, sağda e-posta ve
 *    "Fiziki Mağazamız & Perakende" açılır kartı. Çalışma saatleri burada GÖSTERİLMEZ (işletme kararı).
 * 2) Yapışkan beyaz başlık: logo + yazı kilidi, ortada geniş arama çubuğu, sağda teklif listesi düğmesi.
 *    Mobilde arama çubuğu logonun altında tam genişlik satırdır.
 * 3) Yapışkan menü satırı (lg+): Kurumsal · Ürün Grupları · Markalarımız · E-Kataloglar · İletişim.
 */
export default function HeaderClient({ categories }: HeaderNavProps) {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { openSearch } = useProductSearch();

  // Sayfa değişince mobil menüyü kapat
  useEffect(() => setMenuOpen(false), [pathname]);

  // Masaüstü genişliğe geçilince mobil menüyü kapat (görünmez kaydırma kilidi kalmasın)
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Yapışkan başlığın yüksekliğini sayfaya bildir: çapa (#sss gibi) başlıkları menünün altında kalmasın
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const root = document.documentElement;
    const apply = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h <= 0) return;
      root.style.setProperty("--header-h", `${h}px`);
      root.style.scrollPaddingTop = `${h + 16}px`;
    };
    apply();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* İnce üst şerit (yapışkan değil). relative + z: açılır mağaza kartı yapışkan başlığın üstünde kalır. */}
      <div className="relative z-[55] bg-navy text-white">
        <div className="container-x flex h-10 items-center justify-between gap-3 text-xs sm:text-[13px]">
          <p className="flex min-w-0 items-center gap-1.5 text-slate-200" title={PROMISES.quoteTurnaround}>
            <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
            <span className="truncate md:hidden">{PROMISES.quoteShort}</span>
            <span className="hidden truncate md:inline">{PROMISES.quoteTurnaround}</span>
          </p>
          <ul className="flex shrink-0 items-center gap-1 sm:gap-3">
            <li>
              <a
                href={mailtoHref()}
                onClick={() => track(EVENTS.emailClick, { kaynak: "ust_serit" })}
                aria-label={`E-posta: ${COMPANY.email}`}
                className="inline-flex h-10 min-w-[40px] items-center justify-center gap-1.5 rounded px-1 font-medium text-slate-100 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent sm:h-3.5 sm:w-3.5" aria-hidden />
                <span className="hidden sm:inline">{COMPANY.email}</span>
              </a>
            </li>
            <li className="hidden md:block">
              <StorePopover />
            </li>
          </ul>
        </div>
      </div>

      <header ref={headerRef} className="sticky top-0 z-50 w-full">
        <div className="border-b border-line bg-white text-ink shadow-[0_8px_24px_-18px_rgba(15,27,45,0.35)]">
          {/* 1. satır: logo · arama · teklif listesi */}
          <div className="container-x flex h-14 items-center gap-2 sm:h-16 sm:gap-4 lg:h-[68px] lg:gap-6">
            <Link href="/" className="group flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-md" aria-label={`${COMPANY.name} ana sayfa`}>
              <Image
                src="/images/logo.png"
                alt=""
                width={109}
                height={36}
                loading="eager"
                className="h-8 w-auto rounded-md transition-transform duration-300 group-hover:scale-[1.02] sm:h-9"
              />
              <span className="hidden min-w-0 flex-col border-l border-line pl-2.5 leading-none min-[480px]:flex md:hidden lg:flex">
                <span className="text-lg font-black tracking-tight text-navy lg:text-xl">Arma</span>
                <span className="mt-0.5 max-w-[9rem] text-xs font-semibold leading-[1.2] text-ink-muted lg:max-w-[10.5rem]">
                  Fabrika Malzemeleri Teknik Hırdavat
                </span>
              </span>
            </Link>

            {/* Orta: geniş arama çubuğu (md+). Bir girdi gibi görünür; arama penceresini açar. */}
            <div className="hidden min-w-0 flex-1 justify-center md:flex">
              <SearchBar onOpen={() => openSearch()} />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
              <QuoteButton />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls={MOBILE_MENU_ID}
                aria-haspopup="dialog"
                aria-label="Menüyü aç"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink transition-colors hover:bg-slate-100 lg:hidden"
              >
                <Menu className="h-6 w-6" aria-hidden />
              </button>
            </div>
          </div>

          {/* Mobil: tam genişlik arama satırı */}
          <div className="container-x pb-2.5 md:hidden">
            <SearchBar onOpen={() => openSearch()} compact />
          </div>

          {/* 2. satır: ana menü (lg+) */}
          <div className="hidden border-t border-line lg:block">
            <div className="container-x">
              <DesktopNav categories={categories} pathname={pathname} />
            </div>
          </div>
        </div>

        {menuOpen && <MobileMenu categories={categories} pathname={pathname} onClose={() => setMenuOpen(false)} />}
      </header>
    </>
  );
}

/** Amazon / Trendyol tarzı geniş arama çubuğu (gerçekte arama penceresini açan bir düğme). */
function SearchBar({ onOpen, compact = false }: { onOpen: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={preloadSearch}
      onFocus={preloadSearch}
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K"
      aria-label={`Ürün ara: ${SEARCH_PLACEHOLDER}`}
      className={`group flex w-full max-w-2xl items-center gap-2.5 rounded-xl border border-line-strong bg-slate-50 pl-3.5 pr-1.5 text-left transition-colors hover:border-accent hover:bg-white focus-visible:border-accent focus-visible:bg-white ${
        compact ? "h-11" : "h-11 lg:h-12"
      }`}
    >
      <Search className="h-[18px] w-[18px] shrink-0 text-navy" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-sm text-ink-muted sm:text-[15px]">{SEARCH_PLACEHOLDER}</span>
      <kbd
        aria-hidden
        className="hidden shrink-0 rounded-md border border-line-strong bg-white px-2 py-1 text-xs font-bold text-ink-muted lg:inline-flex [@media(pointer:coarse)]:!hidden"
      >
        Ctrl + K
      </kbd>
      <span
        aria-hidden
        className={`hidden shrink-0 items-center justify-center rounded-lg bg-navy text-white transition-colors group-hover:bg-navy-light sm:inline-flex ${
          compact ? "h-8 w-8" : "h-8 w-10 lg:h-9"
        }`}
      >
        <Search className="h-4 w-4" />
      </span>
    </button>
  );
}

/**
 * Üst şeritteki "Fiziki Mağazamız & Perakende" düğmesi + düğmenin altında açılan küçük kart (popover).
 * Tam ekran pencere DEĞİLDİR: dışarı tıklayınca, Escape ile veya odak karttan çıkınca kapanır;
 * açılınca odak karta geçer, Escape ile kapanınca düğmeye döner.
 */
function StorePopover() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && e.target instanceof Node && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        const next = e.relatedTarget;
        if (open && next instanceof Node && !wrapRef.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) track(EVENTS.storeInfoOpen, { kaynak: "ust_serit" });
        }}
        className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded border-l border-white/20 pl-4 pr-1 font-semibold text-white transition-colors hover:text-accent"
      >
        <Store className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
        Fiziki Mağazamız &amp; Perakende
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="absolute right-0 top-full z-[70] mt-2 w-[min(23rem,calc(100vw-2rem))] rounded-2xl border border-line border-t-[3px] border-t-accent bg-white p-5 text-left shadow-2xl outline-none animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <span
            aria-hidden
            className="absolute -top-[9px] right-8 h-4 w-4 rotate-45 border-l-[3px] border-t-[3px] border-accent bg-white"
          />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
            aria-label="Mağaza bilgisini kapat"
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted hover:bg-slate-100 hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
          <StoreInfoCard titleId={titleId} source="ust_serit_magaza" />
        </div>
      )}
    </div>
  );
}
