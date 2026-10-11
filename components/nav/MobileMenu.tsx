"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Clock, Mail, MessageCircle, Phone, Search, Store, X } from "lucide-react";
import {
  COMPANY,
  HOURS_TEXT,
  PRIMARY_PHONE,
  PROMISES,
  mailtoHref,
  whatsappHref,
} from "@/data/company";
import { useModal } from "@/lib/useModal";
import { track, EVENTS } from "@/lib/track";
import { useRetailModal } from "@/components/RetailStoreModal";
import { preloadSearch, useProductSearch } from "@/components/ProductSearchModal";
import QuoteButton from "./QuoteButton";
import { buildMainMenu, isMenuItemActive } from "./nav-utils";
import type { HeaderNavProps } from "./types";

export const MOBILE_MENU_ID = "mobil-menu";

interface MobileMenuProps extends HeaderNavProps {
  pathname: string;
  onClose: () => void;
}

/**
 * Mobil menü (lg altı): tam ekran erişilebilir diyalog.
 * Odak tuzağı, Escape, kaydırma kilidi ve kapanınca odağın menü düğmesine dönmesi useModal'dan gelir.
 */
export default function MobileMenu({ categories, totalProducts, pathname, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { panelRef } = useModal<HTMLDivElement>({ open: true, onClose, initialFocusRef: closeRef });
  const { openSearch } = useProductSearch();
  const { openModal: openRetailModal } = useRetailModal();
  const menu = buildMainMenu(categories, totalProducts);
  // Bulunulan sayfanın grubu açık başlar (ör. kategori sayfasında "Ürünler")
  const [openGroup, setOpenGroup] = useState<number | null>(() => {
    const i = menu.findIndex((m) => m.children?.length && isMenuItemActive(pathname, m));
    return i >= 0 ? i : null;
  });
  const groupBaseId = useId();
  const titleId = useId();
  const wa = whatsappHref();

  return (
    <div id={MOBILE_MENU_ID} role="dialog" aria-modal="true" aria-labelledby={titleId} className="fixed inset-0 z-[60] lg:hidden">
      <div ref={panelRef} className="absolute inset-0 flex flex-col bg-white text-ink animate-in fade-in duration-150">
        <h2 id={titleId} className="sr-only">
          Menü
        </h2>

        <div className="container-x flex h-16 shrink-0 items-center justify-between gap-3 border-b border-line">
          <Link href="/" onClick={onClose} className="inline-flex shrink-0 items-center rounded-md">
            <Image src="/images/logo.png" alt={COMPANY.name} width={97} height={32} className="h-8 w-auto rounded-md" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-slate-100"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="container-x flex flex-col gap-3 py-4">
            <button
              type="button"
              onPointerEnter={preloadSearch}
              onClick={() => {
                onClose();
                openSearch();
              }}
              aria-haspopup="dialog"
              className="flex min-h-[48px] w-full items-center gap-2.5 rounded-xl border border-line-input bg-white px-3.5 text-left text-base text-ink-muted"
            >
              <Search className="h-5 w-5 shrink-0 text-brand" aria-hidden />
              <span>Ürün, kod veya ihtiyaç ara</span>
            </button>

            <div>
              <QuoteButton variant="block" source="mobil_menu" onBeforeOpen={onClose} />
              <p className="mt-1.5 text-center text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
            </div>

            <nav aria-label="Mobil menü" className="mt-1">
              <ul className="divide-y divide-line border-y border-line">
                {menu.map((item, idx) => {
                  const active = isMenuItemActive(pathname, item);
                  if (item.children?.length) {
                    const isOpen = openGroup === idx;
                    const groupId = `${groupBaseId}-${idx}`;
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={groupId}
                          onClick={() => setOpenGroup(isOpen ? null : idx)}
                          className={`flex min-h-[56px] w-full items-center justify-between gap-3 text-left text-lg font-semibold ${
                            active ? "text-accent-ink" : "text-ink"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden
                            className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <ul id={groupId} hidden={!isOpen} className="border-l-[3px] border-accent pb-3 pl-1">
                          {item.children.map((c) => {
                            const here = pathname === c.href;
                            return (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={onClose}
                                  aria-current={here ? "page" : undefined}
                                  className={`flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 text-base hover:bg-slate-50 ${
                                    here
                                      ? "font-semibold text-accent-ink"
                                      : c.strong
                                        ? "font-semibold text-brand"
                                        : "text-ink-soft"
                                  }`}
                                >
                                  <span>{c.label}</span>
                                  {c.hint ? (
                                    <span className="shrink-0 text-xs text-ink-muted">{c.hint}</span>
                                  ) : (
                                    <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-[56px] items-center justify-between gap-3 text-lg font-semibold ${
                          active ? "text-accent-ink" : "text-ink"
                        }`}
                      >
                        {item.label}
                        <ChevronRight className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                onClose();
                openRetailModal();
              }}
              className="mt-2 flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl border border-line bg-slate-50 px-4 text-left"
            >
              <span className="flex items-center gap-3">
                <Store className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
                <span>
                  <span className="block text-sm font-semibold text-ink">Tekkeköy mağazamız</span>
                  <span className="block text-xs text-ink-muted">Adres, çalışma saatleri ve perakende alım</span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
            </button>

            <div className="mt-1 rounded-2xl border border-line p-4 text-sm">
              <p className="flex items-center gap-2 font-semibold text-ink">
                <Clock className="h-4 w-4 shrink-0 text-action" aria-hidden />
                {PROMISES.quoteShort}
              </p>
              <p className="mt-1 pl-6 text-ink-soft">{HOURS_TEXT}</p>
              <div className="mt-3 grid gap-2">
                <a
                  href={mailtoHref()}
                  onClick={() => track(EVENTS.emailClick, { kaynak: "mobil_menu" })}
                  className="btn-ghost min-h-[44px] w-full justify-start px-4 py-2 text-sm"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span className="truncate">{COMPANY.email}</span>
                </a>
                {PRIMARY_PHONE && (
                  <a
                    href={PRIMARY_PHONE.href}
                    onClick={() => track(EVENTS.phoneClick, { kaynak: "mobil_menu" })}
                    className="btn-ghost min-h-[44px] w-full justify-start px-4 py-2 text-sm"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {PRIMARY_PHONE.label}
                  </a>
                )}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track(EVENTS.whatsappClick, { kaynak: "mobil_menu" })}
                    className="btn-ghost min-h-[44px] w-full justify-start px-4 py-2 text-sm"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-action" aria-hidden />
                    WhatsApp&apos;tan yazın
                    <span className="sr-only"> (yeni sekmede açılır)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
