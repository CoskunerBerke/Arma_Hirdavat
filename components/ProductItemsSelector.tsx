"use client";

import { useState } from "react";
import { Check, CheckSquare, Plus, Square } from "lucide-react";
import { useQuote, type SupplyUnit } from "./QuoteContext";

interface ProductItemsSelectorProps {
  productTitle: string;
  productSlug: string;
  items: string[];
}

export default function ProductItemsSelector({ productTitle, productSlug, items }: ProductItemsSelectorProps) {
  const { addItem, addMultipleItems } = useQuote();

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [unit, setUnit] = useState<SupplyUnit>("Koli");
  const [quantity, setQuantity] = useState<number>(50);
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});
  const [batchAdded, setBatchAdded] = useState(false);

  const toggleSelect = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectAll = () => {
    if (selectedIndices.length === items.length) {
      setSelectedIndices([]);
    } else {
      setSelectedIndices(items.map((_, i) => i));
    }
  };

  // Add a single specific item from the list
  const handleAddSingle = (spec: string, index: number) => {
    addItem({
      productSlug,
      productTitle,
      spec,
      unit,
      quantity,
    });
    setAddedItems((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [index]: false }));
    }, 2500);
  };

  // Add all selected items in batch
  const handleAddSelected = () => {
    if (selectedIndices.length === 0) return;
    const batch = selectedIndices.map((idx) => ({
      productSlug,
      productTitle,
      spec: items[idx],
      unit,
      quantity,
    }));
    addMultipleItems(batch);
    setBatchAdded(true);
    setTimeout(() => setBatchAdded(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-3.5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-ink">Öne Çıkan Ürün Özellikleri & Varyantlar</h2>
          <p className="mt-0.5 text-[11px] sm:text-xs text-ink-muted">
            İstediğiniz maddeleri işaretleyip tek tıkla teklif sepetine ekleyebilirsiniz.
          </p>
        </div>

        {/* Global Unit & Quantity for the list */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as SupplyUnit)}
            className="rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-xs font-semibold text-ink focus:border-brand focus:outline-none"
            aria-label="Varsayılan Ambalaj"
          >
            <option value="Koli">Koli</option>
            <option value="Palet">Palet</option>
            <option value="Tesis Ambalajı">Tesis Ambalajı</option>
          </select>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 rounded-lg border border-line bg-canvas px-2 py-1.5 text-center text-xs font-semibold text-ink focus:border-brand focus:outline-none"
            aria-label="Miktar"
          />
        </div>
      </div>

      {/* Select All Controls */}
      <div className="mt-3 flex items-center justify-between text-xs font-medium text-ink-soft">
        <button
          type="button"
          onClick={selectAll}
          className="inline-flex items-center gap-1.5 text-brand hover:underline"
        >
          {selectedIndices.length === items.length ? (
            <>
              <CheckSquare className="h-4 w-4" /> Tüm Seçimleri Kaldır
            </>
          ) : (
            <>
              <Square className="h-4 w-4" /> Tümünü Seç ({items.length} Madde)
            </>
          )}
        </button>

        {selectedIndices.length > 0 && (
          <span className="font-semibold text-ink">
            {selectedIndices.length} seçildi
          </span>
        )}
      </div>

      {/* Items List */}
      <ul className="mt-2.5 divide-y divide-line/60">
        {items.map((it, idx) => {
          const isSelected = selectedIndices.includes(idx);
          const isAdded = addedItems[idx];
          return (
            <li
              key={it}
              className={`flex flex-col gap-2 py-2.5 transition sm:flex-row sm:items-center sm:justify-between rounded-xl px-2 ${
                isSelected ? "bg-blue-50/50" : "hover:bg-slate-50/60"
              }`}
            >
              <div
                className="flex cursor-pointer items-start gap-2.5 flex-1 min-w-0"
                onClick={() => toggleSelect(idx)}
              >
                <button
                  type="button"
                  className="mt-0.5 text-brand shrink-0"
                  aria-label={isSelected ? "Seçimi kaldır" : "Seç"}
                >
                  {isSelected ? <CheckSquare className="h-4 w-4 text-brand" /> : <Square className="h-4 w-4 text-slate-400" />}
                </button>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-medium text-ink leading-snug block">{it}</span>
                  <span className="block text-[10px] text-ink-muted mt-0.5">
                    {productTitle} • {quantity} {unit}
                  </span>
                </div>
              </div>

              {/* Direct single add button */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pl-6 sm:pl-0">
                <span className="text-[10px] text-ink-muted sm:hidden">
                  {quantity} {unit}
                </span>
                <button
                  type="button"
                  onClick={() => handleAddSingle(it, idx)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] sm:text-xs font-semibold transition shrink-0 ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "border border-line bg-white text-ink hover:border-brand hover:text-brand"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Eklendi</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>+ Sepet</span>
                    </>
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Bottom Batch Action */}
      {selectedIndices.length > 0 && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/80 p-3.5">
          <div className="text-xs text-ink-soft">
            Seçilen <strong>{selectedIndices.length} Kalem</strong> için toplam <strong>{selectedIndices.length * quantity} {unit}</strong>
          </div>
          <button
            type="button"
            onClick={handleAddSelected}
            className="btn-primary py-2 px-4 text-xs font-bold shadow-md"
          >
            {batchAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Hepsi Sepete Eklendi!</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Seçilenleri Sepete Ekle ({selectedIndices.length})</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
