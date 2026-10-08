"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, Package } from "lucide-react";
import { CATEGORIES, PRODUCT_GROUPS, type CategoryName } from "@/data/products";
import ProductCard from "./ProductCard";

const normalize = (s: string) => s.toLocaleLowerCase("tr-TR");

export default function ProductCatalog() {
  const [category, setCategory] = useState<CategoryName | "Tümü">("Tümü");
  const [query, setQuery] = useState("");

  // ?kategori=... ile gelinirse filtreyi uygula
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("kategori");
    const match = CATEGORIES.find((c) => c === k);
    if (match) setCategory(match);
  }, []);

  const list = useMemo(() => {
    const q = normalize(query.trim());
    return PRODUCT_GROUPS.filter((p) => {
      if (category !== "Tümü" && p.category !== category) return false;
      if (!q) return true;
      return [
        p.code,
        p.title,
        p.description,
        p.category,
        ...(p.standards || []),
        ...p.items,
      ].some((t) => normalize(t).includes(q));
    });
  }, [category, query]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    PRODUCT_GROUPS.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, []);

  return (
    <div className="grid gap-6 lg:gap-10 lg:grid-cols-12">
      {/* Kenar filtre / Mobil Kategori Barı */}
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <label htmlFor="urun-ara" className="sr-only">
            Ürün veya kod ara
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              id="urun-ara"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün adı, kod veya standart ara (örn: 1301, T-800)..."
              className="w-full rounded-xl border border-line bg-white py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none shadow-2xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Aramayı temizle"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-brand"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Kategori Seçici: Mobilde kaydırılabilir hap butonlar, masaüstünde dikey liste */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {(["Tümü", ...CATEGORIES] as const).map((c) => {
              const active = category === c;
              const count = c === "Tümü" ? PRODUCT_GROUPS.length : counts.get(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs sm:text-sm transition-colors ${
                    active
                      ? "bg-brand text-white font-semibold shadow-xs"
                      : "bg-white border border-line text-ink-soft hover:bg-slate-50 hover:text-ink lg:border-transparent lg:bg-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-white" : "bg-line-strong"
                      }`}
                      aria-hidden
                    />
                    {c}
                  </span>
                  <span
                    className={`text-[11px] rounded-full px-1.5 py-0.2 ${
                      active ? "bg-white/20 text-white" : "text-ink-muted bg-slate-100"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="lg:col-span-9 min-w-0">
        {/* B2B Toptan ve İskonto Matrisi Bilgilendirme Notu */}
        <div className="mb-4 sm:mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 sm:p-4 text-xs leading-relaxed text-slate-700">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <strong className="font-bold text-slate-900">Doğrudan Fabrika Tedariği: </strong>
              Tüm ürünler FABA resmi üretim kataloğundan temin edilir. Koli ve palet bazlı taleplerinizde firmanıza özel <strong>fabrika iskonto matrisi</strong> uygulanarak resmi teklif mektubu sunulur.
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between text-xs sm:text-sm text-ink-muted" aria-live="polite">
          <span className="font-medium text-ink">{list.length} ürün listeleniyor</span>
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand">
            <Package className="h-3.5 w-3.5" /> Koli & Palet Sevkiyatı
          </span>
        </div>

        {list.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((p, i) => (
              <li key={p.id} className="min-w-0">
                <ProductCard product={p} priority={i < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface p-8 sm:p-12 text-center">
            <p className="text-sm text-ink-soft">Aramanıza uygun ürün bulunamadı.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("Tümü");
              }}
              className="btn-ghost mt-4 text-xs sm:text-sm py-2 px-4"
            >
              Filtreleri temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
