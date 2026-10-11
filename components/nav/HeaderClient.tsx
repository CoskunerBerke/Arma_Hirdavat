"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, Menu, Phone, Search, Store, Truck } from "lucide-react";
import { COMPANY, HOURS_SHORT, PRIMARY_PHONE, PROMISES, mailtoHref } from "@/data/company";
import { track, EVENTS } from "@/lib/track";
import { useRetailModal } from "@/components/RetailStoreModal";
import { preloadSearch, useProductSearch } from "@/components/ProductSearchModal";
import DesktopNav from "./DesktopNav";
import MobileMenu, { MOBILE_MENU_ID } from "./MobileMenu";
import QuoteButton from "./QuoteButton";
import StorePopover from "./StorePopover";
import type { HeaderNavProps } from "./types";


export default function HeaderClient({ categories, totalProducts }: HeaderNavProps) {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useProductSearch();
  const { openModal: openRetailModal } = useRetailModal();

  // Ana sayfada en üstteyken header videonun üstünde şeffaf durur
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const overHero = pathname === "/" && !scrolled && !menuOpen;

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

  // Yapışkan menü satırının yüksekliğini sayfaya bildir: çapa (#sss gibi) başlıkları menünün altında kalmasın
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const root = document.documentElement;
    const apply = () => {
      const h = Math.round(row.getBoundingClientRect().height);
      if (h <= 0) return;
      root.style.setProperty("--header-h", `${h}px`);
      root.style.scrollPaddingTop = `${h + 16}px`;
    };
    apply();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(apply);
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* İnce üst şerit (kaydırınca yukarıda kalır; yapışkan olan yalnızca beyaz menü satırıdır) */}
      <header className="sticky top-0 z-50 w-full">
        {/* Menü satırı: ana sayfada en üstteyken videonun üstünde şeffaf; kaydırınca beyaz */}
        <div
          className={`border-b transition-colors duration-300 ${
            overHero
              ? "border-transparent bg-transparent text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]"
              : "border-line bg-white text-ink shadow-[0_1px_0_#E2E7EE,0_8px_24px_-16px_rgba(15,27,45,0.25)]"
          }`}
        >
          <div
            ref={rowRef}
            className="container-x flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-[72px] lg:gap-3 xl:gap-4"
          >
            <Link href="/" className="group flex shrink-0 items-center gap-3 rounded-md">
              <Image
                src="/images/logo.png"
                alt={COMPANY.name}
                width={109}
                height={36}
                loading="eager"
                className="h-8 w-auto rounded-md transition-transform duration-300 group-hover:scale-[1.02] sm:h-9"
              />
            </Link>

            <DesktopNav categories={categories} totalProducts={totalProducts} pathname={pathname} dark={overHero} />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openSearch()}
                onPointerEnter={preloadSearch}
                onFocus={preloadSearch}
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K"
                title="Ürün ara (Ctrl+K)"
                className={`inline-flex h-12 min-w-[44px] items-center justify-center gap-2.5 rounded-full border-2 px-3 text-sm font-semibold shadow-sm transition-all xl:min-w-[210px] xl:justify-start xl:px-4 2xl:min-w-[320px] ${overHero ? "border-white/50 bg-white/15 text-white backdrop-blur-md hover:border-accent hover:bg-white/25" : "border-brand/30 bg-white text-ink-soft hover:border-accent hover:shadow-md"}`}
              >
                <Search className={`h-5 w-5 shrink-0 ${overHero ? "text-accent" : "text-brand"}`} aria-hidden />
                <span className="sr-only xl:not-sr-only xl:flex-1 xl:truncate xl:whitespace-nowrap xl:text-left">
                  <span className="2xl:hidden">Ürün veya kod ara…</span>
                  <span className="hidden 2xl:inline">Ürün, kod veya standart ara…</span>
                </span>
                <kbd
                  aria-hidden
                  className={`hidden rounded border px-1.5 py-0.5 text-[11px] font-bold xl:inline-flex ${overHero ? "border-white/30 text-white/70" : "border-line-strong text-ink-muted"}`}
                >
                  Ctrl K
                </kbd>
              </button>

              <StorePopover dark={overHero} />

              <QuoteButton />

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls={MOBILE_MENU_ID}
                aria-haspopup="dialog"
                aria-label="Menüyü aç"
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors lg:hidden ${overHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-slate-100"}`}
              >
                <Menu className="h-6 w-6" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <MobileMenu
            categories={categories}
            totalProducts={totalProducts}
            pathname={pathname}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
}
