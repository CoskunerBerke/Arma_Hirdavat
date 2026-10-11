"use client";

import { useId, useMemo, useState } from "react";
import { Check, ClipboardList, Plus } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import { CTA, PROMISES } from "@/data/company";

export interface SizeMixerProduct {
  id: number;
  code: string;
  title: string;
  slug: string;
  sizes: string[];
  /** Koli içi adet metni ("252 Çift") */
  koli: string;
  perCarton: number | null;
  unit: string | null;
}

const MAX_CARTONS = 999;

function toCount(v: string | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.min(MAX_CARTONS, Math.floor(n)) : 0;
}

/**
 * Beden bazında teklif listesi: bir eldiven seçilir, her beden için koli adedi yazılır,
 * satırlar ("Beden 9" notuyla) tek seferde teklif listesine eklenir. Fiyat göstermez.
 */
export default function GuideSizeMixer({ products, title }: { products: SizeMixerProduct[]; title: string }) {
  const { addMultipleItems, setIsOpen } = useQuote();
  const uid = useId();
  const [productId, setProductId] = useState<number>(products[0]?.id ?? 0);
  const [counts, setCounts] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<{ lines: number; cartons: number } | null>(null);

  const product = products.find((p) => p.id === productId) ?? products[0];

  const totalCartons = useMemo(
    () => (product ? product.sizes.reduce((sum, s) => sum + toCount(counts[s]), 0) : 0),
    [product, counts],
  );

  if (!product) return null;

  const totalText =
    totalCartons > 0 && product.perCarton && product.unit
      ? `${totalCartons.toLocaleString("tr-TR")} koli = ${(totalCartons * product.perCarton).toLocaleString("tr-TR")} ${product.unit}`
      : null;

  const onAdd = () => {
    const lines = product.sizes
      .map((s) => ({ size: s, n: toCount(counts[s]) }))
      .filter((x) => x.n > 0)
      .map((x) => ({
        productId: product.id,
        productSlug: product.slug,
        productTitle: product.title,
        unit: "Koli" as const,
        quantity: x.n,
        spec: `Beden ${x.size}`,
        koli: product.koli,
      }));
    if (lines.length === 0) return;
    addMultipleItems(lines, false);
    setAdded({ lines: lines.length, cartons: totalCartons });
    setCounts({});
  };

  const headingId = `${uid}-baslik`;

  return (
    <section aria-labelledby={headingId} className="my-8 rounded-2xl border border-line bg-white p-4 shadow-xs sm:p-6">
      <h3 id={headingId} className="text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        Eldiveni seçin, her beden için koli adedini yazın. Satırlar beden notuyla teklif listenize eklenir; talebi
        göndermeden önce listeyi düzenleyebilirsiniz.
      </p>

      <div className="mt-4">
        <label htmlFor={`${uid}-urun`} className="block text-sm font-medium text-ink">
          Eldiven modeli (koli içi adet)
        </label>
        <select
          id={`${uid}-urun`}
          className="field mt-1.5 min-h-[44px]"
          value={product.id}
          onChange={(e) => {
            setProductId(Number(e.target.value));
            setCounts({});
            setAdded(null);
          }}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              FABA {p.code} ({p.koli.toLocaleLowerCase("tr-TR")})
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">Beden başına koli adedi</legend>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {product.sizes.map((s) => (
            <div key={s}>
              <label htmlFor={`${uid}-b${s}`} className="block text-xs font-medium text-ink-soft">
                {s} numara
              </label>
              <input
                id={`${uid}-b${s}`}
                type="number"
                inputMode="numeric"
                min={0}
                max={MAX_CARTONS}
                step={1}
                placeholder="0"
                value={counts[s] ?? ""}
                onChange={(e) => {
                  setCounts((c) => ({ ...c, [s]: e.target.value }));
                  setAdded(null);
                }}
                className="field mt-1 min-h-[44px]"
              />
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft" aria-live="polite">
          {totalText ? (
            <>
              Toplam: <strong className="font-semibold text-ink">{totalText}</strong>
            </>
          ) : (
            "Henüz koli adedi girilmedi."
          )}
        </p>
        <button
          type="button"
          onClick={onAdd}
          disabled={totalCartons === 0}
          className="btn-action min-h-[48px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden />
          {CTA.addToList}
        </button>
      </div>

      <div role="status" aria-live="polite">
        {added && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-action-border bg-action-light p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-sm text-action-active">
              <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>
                {added.lines} beden satırı ({added.cartons.toLocaleString("tr-TR")} koli) teklif listenize eklendi.
              </span>
            </p>
            <button type="button" onClick={() => setIsOpen(true)} className="btn-ghost min-h-[44px]">
              <ClipboardList className="h-4 w-4" aria-hidden />
              {CTA.openList}
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
    </section>
  );
}
