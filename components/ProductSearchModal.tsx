"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles, Plus, Check, Shield, Tag, CornerDownLeft } from "lucide-react";
import { searchProducts, type SearchMatch } from "@/lib/search";
import { useQuote } from "./QuoteContext";
import { BEST_SELLER_IDS, PRODUCT_GROUPS } from "@/data/products";

interface SearchContextType {
  isOpen: boolean;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({
  isOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = (initialQuery = "") => {
    setQuery(initialQuery);
    setIsOpen(true);
  };

  const closeSearch = () => setIsOpen(false);

  // Global Klavye Kısayolu: Ctrl+K / Cmd+K veya "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Sayfa kaydırmasını engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch }}>
      {children}
      {isOpen && <ProductSearchModal query={query} setQuery={setQuery} onClose={closeSearch} />}
    </SearchContext.Provider>
  );
}

export function useProductSearch() {
  return useContext(SearchContext);
}

function ProductSearchModal({
  query,
  setQuery,
  onClose,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem, items } = useQuote();
  const [addedIds, setAddedIds] = useState<number[]>([]);

  // Modal açıldığında otomatik odağı input'a ver
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results: SearchMatch[] = query.trim().length > 0 ? searchProducts(query) : [];

  const POPULAR_SEARCHES = [
    { label: "Nitril Eldiven", q: "nitril" },
    { label: "Kesilmez Seviye D", q: "kesilmez" },
    { label: "Zevahir Kaynak", q: "kaynak" },
    { label: "Tip 3B/4B Kimyasal Tulum", q: "kimyasal tulum" },
    { label: "Mikro Köpük Montaj", q: "kopuk nitril" },
    { label: "Cilt Deri Sürücü", q: "deri eldiven" },
    { label: "Lamineli Kolluk & Galoş", q: "kolluk galos" },
  ];

  const handleQuickAdd = (p: SearchMatch["product"], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productTitle: p.title,
      productSlug: p.slug,
      quantity: 1,
      unit: "Koli",
    });
    setAddedIds((prev) => [...prev, p.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== p.id));
    }, 2000);
  };

  const bestSellers = BEST_SELLER_IDS.map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-10 pt-16 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      {/* Karartma Zemin */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Arama Kutusu Modalı */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Arama Girişi (Input Bandı) */}
        <div className="relative border-b border-line bg-slate-50/60 p-4 sm:p-5">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
            <input
              ref={inputRef}
              id="search-modal-title"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün adı, kod veya benzer kelime yazın (örn: nitril, kesilmez, 1301, tulum, zevahir)..."
              className="w-full rounded-2xl border border-line bg-white py-3.5 pl-12 pr-24 text-sm sm:text-base font-semibold text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none shadow-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-12 text-slate-400 hover:text-ink p-1 rounded-md"
                aria-label="Aramayı temizle"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex absolute right-4 items-center gap-0.5 rounded border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
              ESC
            </kbd>
          </div>

          {/* Hızlı Arama Önerileri (Etiketler) */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-brand" /> Popüler:
            </span>
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setQuery(item.q)}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-brand hover:text-brand hover:bg-blue-50/50 transition-colors shadow-2xs"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sonuçlar / Liste Alanı */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1 mb-2">
                  <span>{results.length} benzer ürün bulundu</span>
                  <span className="text-[11px] text-emerald-600">En alakalı ürünler sıralandı</span>
                </div>

                <div className="space-y-2.5">
                  {results.map(({ product, matchReasons }) => {
                    const isAdded = addedIds.includes(product.id) || items.some((it) => it.productSlug === product.slug);
                    const primaryStandard = product.standards?.[0]?.split(":")?.[0] || product.standards?.[0];

                    return (
                      <div
                        key={product.id}
                        className="group flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-line bg-white p-3 sm:p-3.5 transition-all hover:border-brand/40 hover:bg-slate-50/70 hover:shadow-sm"
                      >
                        <Link
                          href={`/urunler/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3.5 flex-1 min-w-0"
                        >
                          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl bg-slate-50 p-1.5 border border-line/60">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="font-mono font-bold text-brand bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded text-[11px]">
                                {product.code}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                {product.category}
                              </span>
                              {primaryStandard && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-500 font-medium">
                                  <Shield className="h-3 w-3 text-slate-400" /> {primaryStandard}
                                </span>
                              )}
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand transition-colors line-clamp-1">
                              {product.title}
                            </h4>

                            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                              {matchReasons.map((reason, i) => (
                                <span key={i} className="inline-flex items-center gap-0.5 rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[10px] font-semibold">
                                  ✓ {reason}
                                </span>
                              ))}
                              <span className="truncate text-slate-400">
                                {product.koli ? `Koli: ${product.koli}` : ""}
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* Aksiyon Butonları */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(product, e)}
                            className={`flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition shadow-xs ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "btn-action py-2 text-xs"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                <span>Teklifte</span>
                              </>
                            ) : (
                              <>
                                <Plus className="h-3.5 w-3.5" />
                                <span>+ Teklife Ekle</span>
                              </>
                            )}
                          </button>

                          <Link
                            href={`/urunler/${product.slug}`}
                            onClick={onClose}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-line bg-white text-slate-500 hover:text-brand hover:border-brand transition-colors"
                            aria-label="Ürün detayına git"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-sm font-bold text-slate-800">
                  &ldquo;{query}&rdquo; için birebir eşleşen ürün bulunamadı.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Aşağıdaki en çok tercih edilen FABA KKD ürünlerimize göz atabilir veya listenizi doğrudan teklif olarak iletebilirsiniz:
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {bestSellers.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      href={`/urunler/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-2xl border border-line p-3 hover:border-brand hover:bg-slate-50 transition"
                    >
                      <div className="relative h-12 w-12 shrink-0 bg-white rounded-lg p-1">
                        <Image src={p.image} alt={p.title} fill className="object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-bold text-brand">{p.code}</span>
                        <h5 className="text-xs font-bold text-ink truncate">{p.title}</h5>
                        <p className="text-[10px] text-slate-400">{p.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* Arama yapılmadığında başlangıç vitrini */
            <div className="py-6 sm:py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-brand mb-3">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-ink sm:text-base">
                Akıllı Ürün & Kod Arama
              </h3>
              <p className="mt-1 max-w-md mx-auto text-xs text-slate-500 leading-relaxed">
                Ürün kodunu tam hatırlamıyorsanız bile &ldquo;kesilmez eldiven&rdquo;, &ldquo;kimyasal tulum&rdquo;, &ldquo;montaj&rdquo; veya &ldquo;1301&rdquo; gibi anahtar kelimelerle arama yapabilirsiniz.
              </p>

              {/* Sık Tercih Edilen Ürün Kısayolları */}
              <div className="mt-6 text-left border-t border-line/60 pt-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Sık Sipariş Verilen Sanayi Ürünleri:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {bestSellers.slice(0, 3).map((p) => (
                    <Link
                      key={p.id}
                      href={`/urunler/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas/40 p-2.5 hover:border-slate-400 transition"
                    >
                      <div className="relative h-10 w-10 shrink-0 bg-white rounded-lg p-1 border border-line/50">
                        <Image src={p.image} alt={p.title} fill className="object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-bold text-brand">{p.code}</span>
                        <h5 className="text-xs font-bold text-ink truncate">{p.title}</h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Alt Çubuğu */}
        <div className="border-t border-line bg-canvas/80 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Toleranslı arama: Yazım hataları otomatik algılanır.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-brand"
          >
            Pencereyi Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
