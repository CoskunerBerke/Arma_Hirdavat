"use client";

import { Suspense, useEffect, useMemo, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Info, Search, X } from "lucide-react";
import { CATEGORIES, PRODUCT_GROUPS, type CategoryName } from "@/data/products";
import { categoryHref, getCategoryByName } from "@/data/categories";
import { HARDWARE_GROUPS, PROMISES } from "@/data/company";
import { getHardwareHint, searchProducts } from "@/lib/search";
import { EVENTS, track } from "@/lib/track";
import ProductCard from "./ProductCard";
import CustomRequest from "./catalog/CustomRequest";
import { resolveCategoryParam } from "./catalog/categoryParam";

/** Izgara: mobil 2, lg 2 (kenar çubuğuyla %75 genişlik), xl 3 sütun. */
const CARD_SIZES = "(min-width:1280px) 24vw, (min-width:1024px) 36vw, 46vw";

const COUNTS: ReadonlyMap<CategoryName, number> = (() => {
  const m = new Map<CategoryName, number>();
  PRODUCT_GROUPS.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
  return m;
})();

/**
 * /urunler ürün listesi: arama + kategori filtresi.
 *
 * - Sunucu HTML'i tüm ürünleri içerir (Suspense yedeği parametresiz listeyi çizer); böylece
 *   ürün bağlantıları JS olmadan da taranır.
 * - ?q= (WebSite SearchAction) ve ?kategori= (yeni ad, kategori slug'ı veya eski kategori adı)
 *   istemcide useSearchParams ile uygulanır; başlıktaki aramadan gelen yeni parametreler de izlenir.
 * - Kategori çipleri gerçek <a href="/kategori/…"> bağlantılarıdır (taranabilir). Sade tıklamada
 *   sayfa değiştirmeden filtreler; ctrl/⌘/orta tık kategori sayfasını açar.
 */
export default function ProductCatalog() {
  return (
    <Suspense fallback={<CatalogView urlQuery="" urlCategory={null} />}>
      <CatalogWithParams />
    </Suspense>
  );
}

function CatalogWithParams() {
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";
  const urlCategory = resolveCategoryParam(params.get("kategori"));
  return <CatalogView urlQuery={urlQuery} urlCategory={urlCategory} />;
}

function isPlainLeftClick(e: MouseEvent) {
  return !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

function CatalogView({ urlQuery, urlCategory }: { urlQuery: string; urlCategory: CategoryName | null }) {
  const [category, setCategory] = useState<CategoryName | null>(urlCategory);
  const [query, setQuery] = useState(urlQuery);

  // Adres çubuğu dışarıdan değişirse (ör. başlıktaki arama) filtreyi eşitle.
  useEffect(() => setCategory(urlCategory), [urlCategory]);
  useEffect(() => setQuery(urlQuery), [urlQuery]);

  const q = query.trim();

  const list = useMemo(() => {
    const base = q ? searchProducts(q).map((m) => m.product) : PRODUCT_GROUPS;
    return category ? base.filter((p) => p.category === category) : base;
  }, [q, category]);

  const hardwareHint = useMemo(() => (q ? getHardwareHint(q) : null), [q]);

  // Arama analitiği: yalnızca sonuç sayısı (sorgu metni kişisel veri içerebilir, gönderilmez).
  useEffect(() => {
    if (q.length < 2) return;
    const t = window.setTimeout(() => {
      track(EVENTS.search, { results: list.length, source: "urunler" });
    }, 1200);
    return () => window.clearTimeout(t);
  }, [q, list.length]);

  const writeUrl = (nextCategory: CategoryName | null) => {
    const sp = new URLSearchParams();
    const slug = nextCategory ? getCategoryByName(nextCategory)?.slug : undefined;
    if (slug) sp.set("kategori", slug);
    if (q) sp.set("q", q);
    const qs = sp.toString();
    try {
      window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
    } catch {
      // adres güncellenemese de filtre çalışır
    }
  };

  const onChipClick = (e: MouseEvent<HTMLAnchorElement>, c: CategoryName | null) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    setCategory(c);
    writeUrl(c);
  };

  const clearAll = () => {
    setQuery("");
    setCategory(null);
    try {
      window.history.replaceState(null, "", window.location.pathname);
    } catch {
      /* yok say */
    }
  };

  const heading = category ?? (q ? `“${q}” için sonuçlar` : "Tüm ürünler");
  const activeCategoryPage = category ? getCategoryByName(category) : undefined;

  return (
    <div className="grid w-full min-w-0 gap-6 lg:grid-cols-12 lg:gap-10">
      {/* Arama + kategori çipleri */}
      <aside className="w-full min-w-0 lg:col-span-3" aria-label="Ürün filtresi">
        <div className="w-full min-w-0 lg:sticky lg:top-24">
          <label htmlFor="urun-ara" className="mb-1.5 block text-sm font-semibold text-ink">
            Ürün, kod veya standart ara
          </label>
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              id="urun-ara"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Örn: 1301, T-800, kaynak"
              autoComplete="off"
              enterKeyHint="search"
              className="field min-h-[44px] pl-10 pr-11"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Aramayı temizle"
                className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-ink-muted hover:text-brand"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>

          <nav aria-label="Ürün kategorileri" className="mt-4">
            <p className="mb-2 hidden text-xs font-semibold text-ink-muted lg:block">Kategoriler</p>
            <ul className="-mx-4 flex w-auto min-w-0 gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
              {([null, ...CATEGORIES] as const).map((c) => {
                const active = category === c;
                const count = c ? COUNTS.get(c) ?? 0 : PRODUCT_GROUPS.length;
                const href = c ? categoryHref(c) : "/urunler";
                return (
                  <li key={c ?? "tumu"} className="shrink-0 lg:shrink">
                    <Link
                      href={href}
                      scroll={false}
                      onClick={(e) => onChipClick(e, c)}
                      aria-current={active ? "true" : undefined}
                      className={`flex min-h-[44px] items-center justify-between gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm transition-colors lg:min-h-[40px] lg:whitespace-normal lg:rounded-lg lg:px-3 ${
                        active
                          ? "bg-brand font-semibold text-white shadow-xs"
                          : "border border-line bg-white text-ink-soft hover:bg-slate-50 hover:text-ink lg:border-transparent lg:bg-transparent"
                      }`}
                    >
                      <span>{c ?? "Tüm ürünler"}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                          active ? "bg-white/20 text-white" : "bg-slate-100 text-ink-muted"
                        }`}
                      >
                        {count}
                        <span className="sr-only"> ürün</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="w-full min-w-0 lg:col-span-9">
        <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-line bg-white p-3.5 text-sm leading-relaxed text-ink-soft sm:mb-6 sm:p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
          <p>
            Fiyatlar sipariş miktarına ve teslim iline göre değiştiği için teklifle verilir. Ürünleri listenize ekleyip
            tek formla gönderin. <span className="font-medium text-ink">{PROMISES.quoteReassurance}</span>
          </p>
        </div>

        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="urun-listesi" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {heading}
          </h2>
          <p className="text-sm text-ink-muted" aria-live="polite">
            {list.length} ürün listeleniyor
          </p>
        </div>

        {activeCategoryPage && (
          <p className="mb-4 text-sm text-ink-soft">
            <Link
              href={categoryHref(activeCategoryPage.name)}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-brand hover:underline"
            >
              {activeCategoryPage.shortName}: karşılaştırma tablosu ve sık sorulan sorular
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        )}

        {list.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3" aria-labelledby="urun-listesi">
            {list.map((p, i) => (
              <li key={p.id} className="min-w-0">
                <ProductCard product={p} priority={i < 2} sizes={CARD_SIZES} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface p-5 sm:p-8">
            <p className="text-base font-semibold text-ink">
              {q ? `“${q}” için online katalogda ürün bulamadık.` : "Bu filtreyle eşleşen ürün yok."}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Online katalogda FABA iş güvenliği ürünleri listelenir. Mağazamızda ve tedarikte ayrıca{" "}
              {HARDWARE_GROUPS.length} teknik hırdavat ürün grubu bulunur. İhtiyacınızı yazın; temin edebildiğimiz ürünler
              için fiyat teklifi gönderelim.
            </p>
            {hardwareHint && (
              <p className="mt-3 text-sm text-ink-soft">
                İlgili ürün grupları:{" "}
                <span className="font-medium text-ink">{hardwareHint.groups.join(", ")}</span>.{" "}
                <Link href={hardwareHint.href} className="font-semibold text-brand hover:underline">
                  Teknik hırdavat ürün gruplarını görün
                </Link>
              </p>
            )}
            <CustomRequest key={q} defaultValue={q} className="mt-5" />
            <button type="button" onClick={clearAll} className="btn-ghost mt-4 min-h-[44px]">
              Filtreleri temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
