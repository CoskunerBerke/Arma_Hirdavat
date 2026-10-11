"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronRight, FileCheck2, Mail, MessageCircle, Phone, Search, Store, X } from "lucide-react";
import { COMPANY, PRIMARY_PHONE, PROMISES, mailtoHref, whatsappHref } from "@/data/company";
import { useModal } from "@/lib/useModal";
import { track, EVENTS } from "@/lib/track";
import { preloadSearch, useProductSearch } from "@/components/ProductSearchModal";
import QuoteButton from "./QuoteButton";
import StoreInfoCard from "./StoreInfoCard";
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
export default function MobileMenu({ categories, pathname, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { panelRef } = useModal<HTMLDivElement>({ open: true, onClose, initialFocusRef: closeRef });
  const { openSearch } = useProductSearch();
  const menu = buildMainMenu(categories);
  // Bulunulan sayfanın grubu açık başlar (ör. kategori sayfasında "Ürünler")
  const [openGroup, setOpenGroup] = useState<number | null>(() => {
    const i = menu.findIndex((m) => (m.children?.length || m.columns?.length) && isMenuItemActive(pathname, m));
    return i >= 0 ? i : null;
  });
  const groupBaseId = useId();
  const storeId = useId();
  const [storeOpen, setStoreOpen] = useState(false);
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
              <span>Malzeme adı, parça veya standart ara…</span>
            </button>

            <div>
              <QuoteButton variant="block" source="mobil_menu" onBeforeOpen={onClose} />
              <p className="mt-1.5 text-center text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
            </div>

            <nav aria-label="Mobil menü" className="mt-1">
              <ul className="divide-y divide-line border-y border-line">
                {menu.map((item, idx) => {
                  const active = isMenuItemActive(pathname, item);
                  if (item.children?.length || item.columns?.length) {
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
                        <div id={groupId} hidden={!isOpen} className="border-l-[3px] border-accent pb-3 pl-1">
                          {item.columns ? (
                            item.columns.map((col) => (
                              <div key={col.title} className="mt-1 first:mt-0">
                                <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-ink">
                                  {col.title}
                                </p>
                                <ul>
                                  {[...col.links, col.all].map((c) => (
                                    <MenuLink key={c.href} label={c.label} href={c.href} strong={c.strong} pathname={pathname} onClose={onClose} />
                                  ))}
                                </ul>
                              </div>
                            ))
                          ) : (
                            <ul>
                              {item.children!.map((c) => (
                                <MenuLink key={c.href} label={c.label} href={c.href} strong={c.strong} pathname={pathname} onClose={onClose} />
                              ))}
                            </ul>
                          )}
                        </div>
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

            {/* Fiziki mağaza & perakende (masaüstünde üst şeritteki açılır kart) */}
            <div className="mt-2 overflow-hidden rounded-xl border border-line bg-slate-50">
              <button
                type="button"
                aria-expanded={storeOpen}
                aria-controls={storeId}
                onClick={() => setStoreOpen((v) => !v)}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 text-left"
              >
                <span className="flex items-center gap-3">
                  <Store className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden />
                  <span>
                    <span className="block text-sm font-bold text-ink">Fiziki Mağazamız &amp; Perakende</span>
                    <span className="block text-xs text-ink-muted">Tekkeköy merkez mağaza: adres, saatler, yol tarifi</span>
                  </span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 ${storeOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <div id={storeId} hidden={!storeOpen} className="border-t border-line bg-white p-4">
                <StoreInfoCard source="mobil_menu_magaza" />
              </div>
            </div>

            <div className="mt-1 rounded-2xl border border-line p-4 text-sm">
              <p className="flex items-start gap-2 font-semibold text-ink">
                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden />
                {PROMISES.quoteShort}
              </p>
              <p className="mt-1 pl-6 text-xs leading-relaxed text-ink-soft">{PROMISES.quoteTurnaround}</p>
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

/** Mobil menü alt bağlantısı */
function MenuLink({
  label,
  href,
  strong,
  pathname,
  onClose,
}: {
  label: string;
  href: string;
  strong?: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const here = pathname === href;
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        aria-current={here ? "page" : undefined}
        className={`flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 text-base hover:bg-slate-50 ${
          here ? "font-semibold text-accent-ink" : strong ? "font-bold text-navy" : "text-ink-soft"
        }`}
      >
        <span>{label}</span>
        {strong ? (
          <ArrowRight className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
        )}
      </Link>
    </li>
  );
}
