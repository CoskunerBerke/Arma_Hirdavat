"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Ürün arama penceresi (components/ProductSearchModal.tsx içinden tembel yüklenir).
 *
 * Erişilebilirlik
 * - role="dialog" + aria-modal; ad gizli <h2>'den gelir (arama kutusundan değil)
 * - Odak tuzağı, Escape, kaydırma kilidi, kapanınca odağın açan düğmeye dönmesi: lib/useModal
 * - Ok tuşları: arama kutusu ↔ sonuç bağlantıları arasında gezinme (roving focus);
 *   Enter: arama kutusunda ilk sonucu, bağlantıda o ürünü açar. Sonuç sayısı canlı bölgede okunur.
 *
 * Dönüşüm
 * - Sonuçtan tek tıkla 1 koli teklif listesine ekleme
 * - Sonuç yoksa / teknik hırdavat terimiyse: serbest kalem olarak listeye ekleme,
 *   /urun-gruplari bağlantısı ve e-posta
 * ──────────────────────────────────────────────────────────────────────────── */

import React, { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ChevronRight, ClipboardList, Mail, Phone, Plus, Search, Wrench, X } from "lucide-react";
import { getHardwareHint, searchProducts, HARDWARE_GROUPS_HREF, type HardwareHint, type SearchMatch } from "@/lib/search";
import { getFeaturedProducts, productHref, type ProductGroup } from "@/data/products";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { CTA, PRIMARY_PHONE, PROMISES, mailtoHref } from "@/data/company";
import { useQuote } from "@/components/QuoteContext";
import { useModal } from "@/lib/useModal";
import { track, EVENTS } from "@/lib/track";

interface SearchDialogProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

/** Pencerede gösterilen en fazla sonuç (fazlası için katalog bağlantısı) */
const MAX_RESULTS = 12;
const QUERY_MAX = 100;

const POPULAR: readonly { label: string; q: string }[] = [
  { label: "Nitril eldiven", q: "nitril eldiven" },
  { label: "Kesilmeye dirençli", q: "kesilmeye dirençli" },
  { label: "Kaynakçı eldiveni", q: "kaynakçı eldiveni" },
  { label: "Köpük nitril", q: "köpük nitril" },
  { label: "Kimyasal tulum", q: "kimyasal tulum" },
  { label: "Tek kullanımlık tulum", q: "tek kullanımlık tulum" },
  { label: "Galoş ve kolluk", q: "galoş kolluk" },
  { label: "EP-1301", q: "EP-1301" },
  { label: "Cıvata", q: "cıvata" },
];

/** Ok tuşlarıyla gezilen öğeler bu öznitelikle işaretlenir */
const NAV_ITEM_SELECTOR = "[data-search-item]";

export default function SearchDialog({ query, setQuery, onClose }: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { panelRef } = useModal<HTMLDivElement>({ open: true, onClose, initialFocusRef: inputRef });
  const { items, addItem, addCustomItem, openModal } = useQuote();
  const router = useRouter();

  const titleId = useId();
  const inputId = useId();
  const resultsId = useId();
  const helpId = useId();

  const deferred = useDeferredValue(query);
  const q = deferred.trim();
  const matches = useMemo(() => (q ? searchProducts(q) : []), [q]);
  const hardware = useMemo(() => (q ? getHardwareHint(q) : null), [q]);
  const featured = useMemo(() => getFeaturedProducts(4), []);
  const shown = matches.slice(0, MAX_RESULTS);
  const [announce, setAnnounce] = useState("");

  // Analitik: yazmayı bitirince bir kez (sorgu metni gönderilmez, yalnızca uzunluk ve sonuç sayısı)
  useEffect(() => {
    if (q.length < 2) return;
    const t = window.setTimeout(() => {
      track("arama", { sorgu_uzunlugu: q.length, sonuc: matches.length, hirdavat_grubu: hardware !== null });
    }, 1200);
    return () => window.clearTimeout(t);
  }, [q, matches.length, hardware]);

  const isInList = (p: ProductGroup) => items.some((it) => it.productSlug === p.slug);

  const openList = (source: string) => {
    onClose();
    openModal(source);
  };

  const addProduct = (p: ProductGroup) => {
    if (isInList(p)) {
      openList("arama");
      return;
    }
    addItem({
      kind: "product",
      productId: p.id,
      productSlug: p.slug,
      productTitle: p.title,
      unit: "Koli",
      quantity: 1,
      koli: p.koli,
    });
    setAnnounce(`${p.title}: 1 koli teklif listesine eklendi.`);
  };

  /** Katalogda olmayan ürünü (kullanıcının yazdığı metin) serbest kalem olarak ekler ve listeyi açar */
  const addCustom = () => {
    const title = query.trim().slice(0, QUERY_MAX);
    if (!title) return;
    addCustomItem({ title });
    openList("arama_serbest_kalem");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    const first = searchProducts(term)[0];
    if (first) {
      onClose();
      router.push(productHref(first.product));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    const input = inputRef.current;
    if (!panel || !input) return;
    const active = document.activeElement;
    const navItems = Array.from(panel.querySelectorAll<HTMLElement>(NAV_ITEM_SELECTOR));
    const idx = active instanceof HTMLElement ? navItems.indexOf(active) : -1;
    const inInput = active === input;

    // Sonuç bağlantısındayken harf yazılırsa arama kutusuna dön (yazı kutuya düşer)
    if (idx !== -1 && e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey) {
      input.focus();
      return;
    }

    if (!navItems.length || (!inInput && idx === -1)) return;
    let next: HTMLElement | null = null;
    if (e.key === "ArrowDown") next = inInput ? navItems[0] : navItems[Math.min(idx + 1, navItems.length - 1)];
    else if (e.key === "ArrowUp") next = inInput ? null : idx <= 0 ? input : navItems[idx - 1];
    else if (e.key === "Home" && !inInput) next = navItems[0];
    else if (e.key === "End" && !inInput) next = navItems[navItems.length - 1];
    if (!next) return;
    e.preventDefault();
    next.focus();
    next.scrollIntoView({ block: "nearest" });
  };

  const resultStatus = !q
    ? ""
    : matches.length > 0
    ? `${matches.length} ürün bulundu.${hardware ? " İlgili teknik hırdavat grubu da gösteriliyor." : ""}`
    : hardware
    ? `Online katalogda ürün yok. İlgili teknik hırdavat grubu: ${hardware.groups.join(", ")}.`
    : "Online katalogda eşleşen ürün yok.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[70] flex items-start justify-center sm:p-6 sm:pt-[8vh]"
    >
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      />

      <div
        ref={panelRef}
        onKeyDown={onKeyDown}
        className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150 sm:h-auto sm:max-h-[84vh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-line"
      >
        <h2 id={titleId} className="sr-only">
          Ürün ara
        </h2>

        {/* Arama kutusu */}
        <div className="shrink-0 border-b border-line bg-slate-50/80 p-3 sm:p-4">
          <form role="search" onSubmit={onSubmit} className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <label htmlFor={inputId} className="sr-only">
                Ürün adı, kodu veya ihtiyacınız
              </label>
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
              />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                maxLength={QUERY_MAX}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (announce) setAnnounce("");
                }}
                aria-controls={resultsId}
                aria-describedby={helpId}
                placeholder="Malzeme adı, parça veya standart ara…"
                className="h-12 w-full rounded-2xl border border-line-input bg-white pl-11 pr-11 text-base font-medium text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Aramayı temizle"
                  className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-ink-muted hover:bg-slate-100 hover:text-ink"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Aramayı kapat (Esc)"
              className="inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-xl text-ink-soft hover:bg-slate-100 hover:text-ink sm:border sm:border-line sm:bg-white sm:px-3 sm:text-xs sm:font-semibold"
            >
              <X className="h-5 w-5 sm:hidden" aria-hidden />
              <span className="hidden sm:inline" aria-hidden>
                Esc
              </span>
            </button>
          </form>
          <p id={helpId} className="sr-only">
            Sonuçlar yazdıkça listelenir. Aşağı ok tuşuyla sonuçlara geçebilir, Enter ile ilk sonucu açabilirsiniz.
          </p>
        </div>

        {/* Sonuçlar */}
        <div id={resultsId} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5">
          {!q ? (
            <StartView
              featured={featured}
              onClose={onClose}
              onPick={(value) => {
                setQuery(value);
                inputRef.current?.focus();
              }}
            />
          ) : (
            <div className="space-y-4">
              {hardware && (
                <HardwareCard hint={hardware} query={q} onAddCustom={addCustom} onClose={onClose} />
              )}

              {shown.length > 0 ? (
                <section aria-label="Ürün sonuçları">
                  <div className="mb-2 flex items-center justify-between gap-3 px-1 text-xs">
                    <span className="font-semibold text-ink-soft">{matches.length} ürün</span>
                    <Link
                      href={`/urunler?q=${encodeURIComponent(q)}`}
                      onClick={onClose}
                      className="inline-flex min-h-[32px] items-center gap-1 font-semibold text-brand hover:underline"
                    >
                      Katalogda göster
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {shown.map((m, i) => (
                      <ResultRow
                        key={m.product.id}
                        match={m}
                        first={i === 0}
                        inList={isInList(m.product)}
                        onOpen={onClose}
                        onAdd={() => addProduct(m.product)}
                      />
                    ))}
                  </ul>
                  {!hardware && (
                    <div className="mt-4 flex flex-col items-start gap-2 rounded-2xl border border-dashed border-line-strong p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-ink-soft">Aradığınız ürün listede yok mu?</p>
                      <button
                        type="button"
                        onClick={addCustom}
                        className="btn-ghost min-h-[44px] px-4 py-2 text-sm"
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                        &ldquo;{truncate(q, 32)}&rdquo; teklif listeme ekle
                      </button>
                    </div>
                  )}
                </section>
              ) : (
                !hardware && <NoResults query={q} onAddCustom={addCustom} onClose={onClose} featured={featured} />
              )}
            </div>
          )}
        </div>

        {/* Alt çubuk */}
        <div
          className={`${items.length === 0 && q ? "hidden sm:flex" : "flex"} shrink-0 items-center justify-between gap-3 border-t border-line bg-slate-50/80 px-3 py-2.5 sm:px-5`}
        >
          <p className="hidden text-xs text-ink-muted sm:block" aria-hidden>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> gezin · <Kbd>Enter</Kbd> aç · <Kbd>Esc</Kbd> kapat
          </p>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => openList("arama")}
              aria-haspopup="dialog"
              className="btn-action min-h-[44px] w-full px-4 py-2 text-sm sm:w-auto"
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              {CTA.openList} ({items.length})
            </button>
          ) : !q ? (
            <p className="w-full text-center text-xs text-ink-muted sm:w-auto sm:text-right">{PROMISES.quoteReassurance}</p>
          ) : null}
        </div>

        <p role="status" className="sr-only">
          {resultStatus}
        </p>
        <p aria-live="polite" className="sr-only">
          {announce}
        </p>
      </div>
    </div>
  );
}

/* ── Parçalar ─────────────────────────────────────────────────────────────── */

function truncate(s: string, max: number) {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.5rem] items-center justify-center rounded border border-line-strong bg-white px-1 py-0.5 font-sans text-xs font-bold text-ink-soft">
      {children}
    </kbd>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="eyebrow mb-2 px-1 text-ink-muted">{children}</h3>;
}

function ResultRow({
  match,
  first,
  inList,
  onOpen,
  onAdd,
}: {
  match: SearchMatch;
  first: boolean;
  inList: boolean;
  onOpen: () => void;
  onAdd: () => void;
}) {
  const p = match.product;
  return (
    <li className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-2 transition-colors hover:border-brand/40 sm:flex-row sm:items-center sm:gap-3">
      <Link
        href={productHref(p)}
        onClick={onOpen}
        data-search-item=""
        className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1.5 focus-visible:bg-slate-50"
      >
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line/70 bg-slate-50">
          <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-brand-50 px-1.5 py-0.5 font-mono text-xs font-bold text-brand">{p.code}</span>
            <span className="text-xs text-ink-muted">{p.category}</span>
          </span>
          <span className="mt-0.5 line-clamp-2 block text-sm font-bold leading-snug text-ink group-hover:text-brand">
            {p.title}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
            {p.koli && <span>Koli içi: {p.koli}</span>}
            {match.matchReasons.map((r) => (
              <span
                key={r}
                className="hidden items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-800 sm:inline-flex"
              >
                <Check className="h-3 w-3" aria-hidden />
                {r}
              </span>
            ))}
          </span>
        </span>
        {first && (
          <span aria-hidden className="hidden shrink-0 sm:block">
            <Kbd>Enter</Kbd>
          </span>
        )}
      </Link>
      <button
        type="button"
        onClick={onAdd}
        aria-haspopup={inList ? "dialog" : undefined}
        className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 self-end rounded-xl border px-4 py-2 text-sm font-bold transition-colors sm:min-w-[9.5rem] sm:self-auto ${
          inList
            ? "border-action-border bg-action-light text-action-active hover:bg-emerald-100"
            : "border-action/40 bg-white text-action-active hover:border-action hover:bg-action hover:text-white"
        }`}
      >
        {inList ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            {CTA.added}
            <span className="sr-only">: {p.title}. Teklif listesini aç</span>
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" aria-hidden />
            <span className="sr-only">{p.title}: </span>
            {CTA.addShort}
          </>
        )}
      </button>
    </li>
  );
}

function ProductLink({ p, onClose }: { p: ProductGroup; onClose: () => void }) {
  return (
    <Link
      href={productHref(p)}
      onClick={onClose}
      data-search-item=""
      className="group flex items-center gap-3 rounded-xl border border-line bg-white p-2 transition-colors hover:border-brand/40 focus-visible:bg-slate-50"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-50">
        <Image src={p.image} alt="" fill sizes="44px" className="object-contain p-0.5" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-xs font-bold text-brand">{p.code}</span>
        <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">{p.title}</span>
      </span>
    </Link>
  );
}

function StartView({
  featured,
  onClose,
  onPick,
}: {
  featured: ProductGroup[];
  onClose: () => void;
  onPick: (q: string) => void;
}) {
  return (
    <div className="space-y-6">
      <section>
        <SectionTitle>Sık aranan</SectionTitle>
        <ul className="flex flex-wrap gap-2">
          {POPULAR.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => onPick(item.q)}
                className="inline-flex h-9 items-center rounded-full border border-line bg-white px-3.5 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Kategoriler</SectionTitle>
        <ul className="grid gap-1 sm:grid-cols-2">
          {CATEGORY_PAGES.map((c) => (
            <li key={c.slug}>
              <Link
                href={categoryHref(c.name)}
                onClick={onClose}
                data-search-item=""
                className="flex min-h-[44px] items-center justify-between gap-2 rounded-xl px-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 hover:text-brand focus-visible:bg-slate-50"
              >
                {c.name}
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Öne çıkan ürünler</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.id}>
              <ProductLink p={p} onClose={onClose} />
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={HARDWARE_GROUPS_HREF}
        onClick={onClose}
        data-search-item=""
        className="flex min-h-[48px] items-center justify-between gap-3 rounded-2xl border border-line bg-slate-50 px-4 py-3 text-sm transition-colors hover:border-brand/40"
      >
        <span className="flex items-center gap-3">
          <Wrench className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
          <span>
            <span className="block font-semibold text-ink">Endüstriyel malzeme ürün gruplarımız</span>
            <span className="block text-xs text-ink-muted">
              Cıvata, hortum, pompa, kesici taş, el aletleri, kaynak…
            </span>
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
      </Link>
    </div>
  );
}

function emailLink(query: string) {
  return mailtoHref(
    `Ürün sorusu: ${query}`,
    `Merhaba,\n\n"${query}" için fiyat ve temin bilgisi rica ederim.\n\nMiktar:\nFirma:\nTelefon:\n`
  );
}

function ContactLinks({ query }: { query: string }) {
  return (
    <>
      <a
        href={emailLink(query)}
        onClick={() => track(EVENTS.emailClick, { kaynak: "arama" })}
        className="btn-ghost min-h-[44px] px-4 py-2 text-sm"
      >
        <Mail className="h-4 w-4 text-brand" aria-hidden />
        E-postayla sorun
      </a>
      {PRIMARY_PHONE && (
        <a
          href={PRIMARY_PHONE.href}
          onClick={() => track(EVENTS.phoneClick, { kaynak: "arama" })}
          className="btn-ghost min-h-[44px] px-4 py-2 text-sm"
        >
          <Phone className="h-4 w-4 text-brand" aria-hidden />
          {PRIMARY_PHONE.label}
        </a>
      )}
    </>
  );
}

function HardwareCard({
  hint,
  query,
  onAddCustom,
  onClose,
}: {
  hint: HardwareHint;
  query: string;
  onAddCustom: () => void;
  onClose: () => void;
}) {
  return (
    <section aria-label="Teknik hırdavat" className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <p className="flex items-start gap-2 text-sm font-bold text-ink">
        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-amber-800" aria-hidden />
        <span>Teknik hırdavat: {hint.groups.join(" · ")}</span>
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        Bu ürün grubu mağazamızda ve tedarikte yer alır; online ürün sayfası yoktur. Ölçü ve adediyle listenize
        ekleyin, fiyat ve temin süresiyle dönüş yapalım.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={onAddCustom} aria-haspopup="dialog" className="btn-action min-h-[44px] px-4 py-2 text-sm">
          <Plus className="h-4 w-4" aria-hidden />
          Bu ürünü teklif listeme ekle
        </button>
        <Link href={hint.href} onClick={onClose} className="btn-ghost min-h-[44px] px-4 py-2 text-sm">
          <Wrench className="h-4 w-4 text-ink-muted" aria-hidden />
          Teknik hırdavat ürün gruplarımız
        </Link>
        <ContactLinks query={query} />
      </div>
      <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
    </section>
  );
}

function NoResults({
  query,
  onAddCustom,
  onClose,
  featured,
}: {
  query: string;
  onAddCustom: () => void;
  onClose: () => void;
  featured: ProductGroup[];
}) {
  return (
    <div className="space-y-6">
      <section aria-label="Sonuç bulunamadı" className="rounded-2xl border border-line p-4 sm:p-5">
        <p className="text-base font-bold text-ink">&ldquo;{truncate(query, 60)}&rdquo; online katalogda yok</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          Online katalogda FABA iş güvenliği ürünleri listelenir; tedarik ağımızda ise fabrikanızın ihtiyaç duyduğu
          endüstriyel malzemeler de var. Bu ürünü listenize ekleyin; temin edebiliyorsak resmi teknik teklifle dönüş
          yapalım.
        </p>
        <button
          type="button"
          onClick={onAddCustom}
          aria-haspopup="dialog"
          className="btn-action mt-4 min-h-[48px] w-full px-5 text-sm sm:w-auto"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Bu ürünü teklif listeme ekle
        </button>
        <p className="mt-1.5 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link href={HARDWARE_GROUPS_HREF} onClick={onClose} className="btn-ghost min-h-[44px] px-4 py-2 text-sm">
            <Wrench className="h-4 w-4 text-ink-muted" aria-hidden />
            Teknik hırdavat ürün gruplarımız
          </Link>
          <ContactLinks query={query} />
        </div>
      </section>

      <section>
        <SectionTitle>Öne çıkan ürünler</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.id}>
              <ProductLink p={p} onClose={onClose} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
