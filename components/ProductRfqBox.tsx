"use client";

import { useState } from "react";
import { Check, ClipboardList, Info, Package, ShieldCheck } from "lucide-react";
import { useQuote, type SupplyUnit } from "./QuoteContext";
import type { ProductGroup } from "@/data/products";

const UNITS: { label: SupplyUnit; desc: string }[] = [
  { label: "Koli", desc: "Orta-yüksek hacim" },
  { label: "Palet", desc: "Toptan fabrika sevki" },
  { label: "Tesis Ambalajı", desc: "Sanayi kurgusu" },
];

export default function ProductRfqBox({ product }: { product: ProductGroup }) {
  const { addItem, setIsOpen, items } = useQuote();
  const [selectedUnit, setSelectedUnit] = useState<SupplyUnit>("Koli");
  const [quantity, setQuantity] = useState<number>(50);
  const [spec, setSpec] = useState<string>("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        productId: product.id,
        productSlug: product.slug,
        productTitle: product.title,
        unit: selectedUnit,
        quantity: Number(quantity) || 1,
        spec: spec.trim() || undefined,
      },
      false // Do not force open modal!
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="surface rounded-2xl border border-line bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-brand">
            <Package className="h-3.5 w-3.5" /> B2B Toptan Sipariş
          </span>
          <h3 className="mt-1 text-base font-bold text-ink">Fiyat Teklifi Listesine Ekle</h3>
        </div>
        <span className="text-xs text-ink-muted">Fabrika İskontosu</span>
      </div>

      {/* Tedarik Şekli Seçimi */}
      <div className="mt-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Tedarik Şekli Seçin
        </label>
        <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2">
          {UNITS.map((u) => {
            const active = selectedUnit === u.label;
            return (
              <button
                key={u.label}
                type="button"
                onClick={() => setSelectedUnit(u.label)}
                className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center transition ${
                  active
                    ? "border-brand bg-brand/5 text-brand ring-2 ring-brand/20 font-semibold"
                    : "border-line bg-canvas text-ink hover:border-brand/40 hover:bg-white"
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{u.label}</span>
                <span className="mt-0.5 text-[9px] sm:text-[10px] text-ink-muted truncate max-w-full">{u.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Miktar ve Ölçü/Şartname */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <label className="text-xs font-semibold text-ink-soft">Miktar ({selectedUnit})</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-ink-soft">Beden / Çeşit / Not (Opsiyonel)</label>
          <input
            type="text"
            placeholder="Örn: Beden 9 (L), Beden XL, Mavi..."
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </div>
      </div>

      {/* Hızlı Çeşit Önerileri (Tıkla ve Seç) */}
      {product.items && product.items.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] text-ink-muted mb-1.5">Hızlı Çeşit Seç:</p>
          <div className="flex flex-wrap gap-1.5">
            {product.items.slice(0, 4).map((it) => (
              <button
                key={it}
                type="button"
                onClick={() => setSpec(it)}
                className={`rounded-lg border px-2 py-1 text-[11px] transition ${
                  spec === it
                    ? "border-brand bg-brand text-white font-semibold"
                    : "border-line bg-slate-50 text-ink-soft hover:border-brand/40 hover:text-ink"
                }`}
              >
                + {it}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sepete Ekle Butonu */}
      <div className="mt-5">
        <button
          type="button"
          onClick={handleAdd}
          className="btn-action w-full py-3.5 text-sm font-bold shadow-md shadow-action/30"
        >
          {added ? (
            <>
              <Check className="h-4 w-4 text-white" />
              <span>✓ Teklif Listenize Eklendi!</span>
            </>
          ) : (
            <>
              <ClipboardList className="h-4 w-4" />
              <span>{quantity} {selectedUnit} Teklife Ekle</span>
            </>
          )}
        </button>

        {items.length > 0 && (
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="text-ink-muted">Listenizde {items.length} kalem ürün var</span>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="font-bold text-action hover:underline"
            >
              Listeyi Gör & Teklif Al &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Kurumsal İskonto Bilgisi */}
      <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-action" />
          <div className="text-xs leading-relaxed text-slate-700">
            <strong className="font-semibold text-slate-900">Kurumsal İskonto Garantisi: </strong>
            Koli ve palet hacimli siparişlerinizde doğrudan fabrika iskonto matrisi uygulanarak en rekabetçi toptan birim maliyet resmi proforma teklif olarak iletilir.
          </div>
        </div>
      </div>
    </div>
  );
}
