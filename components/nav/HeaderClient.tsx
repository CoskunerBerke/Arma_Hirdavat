"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, Menu, Phone, Search, Store } from "lucide-react";
import { COMPANY, HOURS_SHORT, PRIMARY_PHONE, PROMISES, mailtoHref } from "@/data/company";
import { track, EVENTS } from "@/lib/track";
import { useRetailModal } from "@/components/RetailStoreModal";
import { preloadSearch, useProductSearch } from "@/components/ProductSearchModal";
import DesktopNav from "./DesktopNav";
import MobileMenu, { MOBILE_MENU_ID } from "./MobileMenu";
import QuoteButton from "./QuoteButton";
import type { HeaderNavProps } from "./types";


export default function HeaderClient({ categories, totalProducts }: HeaderNavProps) {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useProductSearch();
  const { openModal: openRetailModal } = useRetailModal();

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
      <div className="bg-navy text-white">
        <div className="container-x flex h-10 items-center justify-between gap-3 text-xs sm:text-[13px]">
          <p className="hidden min-w-0 items-center gap-1.5 truncate text-slate-200 md:inline-flex">
            <Clock className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
            <span className="truncate">
              {HOURS_SHORT}
              <span className="hidden lg:inline"> · {PROMISES.deliveryShort}</span>
            </span>
          </p>
          <ul className="ml-auto flex min-w-0 items-center gap-1 sm:gap-3">
            <li className="min-w-0">
              <a
                href={mailtoHref()}
                onClick={() => track(EVENTS.emailClick, { kaynak: "ust_serit" })}
                className="inline-flex h-10 min-w-0 items-center gap-1.5 rounded px-1 font-medium text-slate-100 transition-colors hover:text-accent"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                <span className="truncate">{COMPANY.email}</span>
              </a>
            </li>
            {PRIMARY_PHONE && (
              <li className="hidden sm:block">
                <a
                  href={PRIMARY_PHONE.href}
                  onClick={() => track(EVENTS.phoneClick, { kaynak: "ust_serit" })}
                  className="inline-flex h-10 items-center gap-1.5 rounded px-1 font-medium text-slate-100 transition-colors hover:text-accent"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  {PRIMARY_PHONE.label}
                </a>
              </li>
            )}
            <li className="shrink-0">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => openRetailModal()}
                className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded px-1 font-semibold text-white transition-colors hover:text-accent sm:ml-1 sm:border-l sm:border-white/20 sm:pl-4"
              >
                <Store className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                <span className="hidden min-[400px]:inline">Tekkeköy mağazamız</span>
                <span className="min-[400px]:hidden">Mağazamız</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full">
        {/* Beyaz menü satırı (tüm sayfalarda, ana sayfa dahil) */}
        <div className="border-b border-line bg-white text-ink shadow-[0_1px_0_#E2E7EE,0_8px_24px_-16px_rgba(15,27,45,0.25)]">
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

            <DesktopNav categories={categories} totalProducts={totalProducts} pathname={pathname} />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openSearch()}
                onPointerEnter={preloadSearch}
                onFocus={preloadSearch}
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K"
                title="Ürün ara (Ctrl+K)"
                className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-xl border border-line-strong bg-white px-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-accent hover:text-ink xl:px-3"
              >
                <Search className="h-[18px] w-[18px] shrink-0 text-brand" aria-hidden />
                <span className="sr-only xl:not-sr-only">Ürün ara</span>
                <kbd
                  aria-hidden
                  className="hidden rounded border border-line-strong px-1.5 py-0.5 text-[11px] font-bold text-ink-muted xl:inline-flex"
                >
                  Ctrl K
                </kbd>
              </button>

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
