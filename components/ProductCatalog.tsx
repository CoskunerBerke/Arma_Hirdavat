"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
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
      return [p.title, p.description, p.category, ...p.items].some((t) => normalize(t).includes(q));
    });
  }, [category, query]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    PRODUCT_GROUPS.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Kenar filtre — az seçenek, tek sütun (Hick yasası) */}
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <label htmlFor="urun-ara" className="sr-only">
            Ürün ara
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              id="urun-ara"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün veya parça ara"
              className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-10 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Aramayı temizle" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-brand">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {(["Tümü", ...CATEGORIES] as const).map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors ${
                    active ? "bg-brand-50 font-semibold text-ink" : "text-ink-soft hover:bg-canvas hover:text-brand"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-brand-accent" : "bg-line-strong"}`} aria-hidden />
                    {c}
                  </span>
                  <span className="hidden text-xs text-ink-muted lg:inline">{c === "Tümü" ? PRODUCT_GROUPS.length : counts.get(c)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="lg:col-span-9">
        {/* B2B Toptan ve İskonto Matrisi Bilgilendirme Notu (Image 3) */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-relaxed text-ink-soft sm:text-[13px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <strong className="font-semibold text-ink">B2B Portal Notu: </strong>
              Birim fiyat listelenmemektedir. Koli ve palet bazlı talepleriniz doğrultusunda, firmanıza özel <strong>iskonto matrisi</strong> uygulanarak resmi teklif belgesi hazırlanır.
            </p>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between text-sm text-ink-muted" aria-live="polite">
          <span>{list.length} ürün grubu</span>
          <span className="text-xs font-semibold text-brand">Tedarik: Koli • Palet • Tesis Ambalajı</span>
        </div>
        {list.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface p-10 text-center">
            <p className="text-ink-soft">Aramanıza uygun ürün grubu bulunamadı.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("Tümü");
              }}
              className="btn-ghost mt-5"
            >
              Filtreleri temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
