"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, CheckCircle2, MessageSquare, ArrowUpRight, Filter } from "lucide-react";
import { PRODUCT_GROUPS, CATEGORIES, ProductGroup } from "@/data/products";
import { COMPANY_INFO } from "@/data/company";

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductGroup | null>(null);

  // Filtreleme mantığı
  const filteredProducts = useMemo(() => {
    return PRODUCT_GROUPS.filter((product) => {
      const matchesCategory =
        selectedCategory === "Tümü" || product.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.items.some((item) => item.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="urunler" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-arma-blue text-xs font-bold uppercase tracking-wider mb-2">
              Kapsamlı Ürün Portföyü
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight">
              ARMA / Ürün Gruplarımız
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Civatadan ağır tonajlı kaldırma ekipmanlarına, 3M iş güvenliğinden kaynak makinelerine kadar 30 ana kategoride 10.000+ ürün.
            </p>
          </div>

          {/* Arama Kutusu */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün, marka veya parça ara..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-arma-blue focus:border-transparent transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Kategori Filtre Butonları */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrele:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-industrial-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sonuç Sayısı ve Bilgi */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>Toplam <strong>{filteredProducts.length}</strong> ürün grubu listeleniyor.</span>
          {(searchQuery || selectedCategory !== "Tümü") && (
            <button
              onClick={() => {
                setSelectedCategory("Tümü");
                setSearchQuery("");
              }}
              className="text-arma-blue hover:underline font-medium"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>

        {/* 30 Ürün Kartı Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Görsel Alanı */}
                <div
                  onClick={() => setActiveModalProduct(product)}
                  className="relative h-60 w-full bg-slate-100 cursor-pointer overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority={product.id <= 6}
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-industrial-900/80 backdrop-blur-sm text-white text-[11px] font-semibold">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/90 text-slate-700 text-[11px] font-medium border border-slate-200 shadow-sm">
                    {product.category}
                  </div>
                </div>

                {/* İçerik Alanı */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveModalProduct(product)}
                      className="text-lg font-bold text-industrial-900 group-hover:text-arma-blue transition-colors cursor-pointer leading-snug"
                    >
                      {product.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Popüler Parçalar */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      {product.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(product)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Detayları İncele</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappFormatted}?text=${encodeURIComponent(`Merhaba Arma Hırdavat, "${product.title}" ürün grubu hakkında stok ve fiyat teklifi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      title="WhatsApp'tan Teklif İste"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Teklif İste</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-base">
              Arama kriterlerinize uygun ürün grubu bulunamadı.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Tümü");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-industrial-900 text-white text-xs font-semibold rounded-lg"
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        )}

        {/* Modal: Ürün Grubu Detayları */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
                <div>
                  <span className="text-xs font-semibold text-arma-blue uppercase tracking-wider">
                    {activeModalProduct.category}
                  </span>
                  <h4 className="text-xl font-bold text-industrial-900">
                    {activeModalProduct.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Modal Görsel */}
                <div className="relative h-72 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <Image
                    src={activeModalProduct.image}
                    alt={activeModalProduct.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Açıklama ve Kullanım Alanları
                  </h5>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {activeModalProduct.description}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                    Stokta Bulunan Temel Çeşitler ve Normlar
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalProduct.items.map((it, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  <strong>Not:</strong> İlgili ürün grubunda özel ölçü, toptan koli/palet bazında fabrika siparişleri ve kurumsal vadeli cari alımlar için müşteri temsilcimizle irtibata geçebilirsiniz.
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappFormatted}?text=${encodeURIComponent(`Merhaba Arma Hırdavat, web sitenizdeki "${activeModalProduct.title}" kategorisi için toptan/perakende fiyat teklifi almak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp ile Hemen Fiyat Al</span>
                  </a>

                  <a
                    href="#teklif"
                    onClick={() => setActiveModalProduct(null)}
                    className="w-full sm:w-auto py-3 px-5 rounded-xl bg-industrial-900 hover:bg-slate-800 text-white font-semibold text-sm text-center transition-all"
                  >
                    Teklif Formuna Git
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
