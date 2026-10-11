"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Beden matrisi: ürünün `sizes` alanından her beden için koli (veya palet) adedi.
 *  - Birden çok beden: her satır 0'dan başlar; "Seçilen bedenleri teklif listesine ekle"
 *    her beden için ayrı satır ekler (spec "Beden 9"). Hiç beden seçilmezse ürün
 *    1 koli, "Beden belirtilmedi" notuyla eklenir.
 *  - Tek beden ("10 (Standart)", "Standart" …): yalnızca miktar seçilir (varsayılan 1).
 *  - Canlı dönüşüm: "3 koli = 756 çift" (koli içi adet ürün verisinden).
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ClipboardList } from "lucide-react";
import { CTA, PROMISES } from "@/data/company";
import { PRODUCT_UNITS, QUOTE_DEFAULT_QTY, useQuote, type SupplyUnit } from "../QuoteContext";
import QtyStepper from "./QtyStepper";
import { SIZE_UNSPECIFIED, formatKoliConversion, parseKoliInfo, sizeSpec, splitSizes, unitLower } from "./koli";

export interface SizeQuotePickerProduct {
  id?: number;
  slug: string;
  title: string;
  sizes?: string;
  koli?: string;
}

export interface SizeQuotePickerProps {
  product: SizeQuotePickerProduct;
  /** Ekledikten sonra teklif penceresini aç (varsayılan false: kullanıcı alışverişe devam eder) */
  openOnAdd?: boolean;
  className?: string;
}

const MAX_SUMMARY = 3;

export default function SizeQuotePicker({ product, openOnAdd = false, className = "" }: SizeQuotePickerProps) {
  const { items, addItem, addMultipleItems, openModal } = useQuote();
  const uid = useId();
  const sizes = useMemo(() => splitSizes(product.sizes), [product.sizes]);
  const multi = sizes.length > 1;
  const koli = useMemo(() => parseKoliInfo(product.koli), [product.koli]);

  const [unit, setUnit] = useState<SupplyUnit>("Koli");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [single, setSingle] = useState(QUOTE_DEFAULT_QTY);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const total = multi ? sizes.reduce((acc, s) => acc + (counts[s] ?? 0), 0) : single;
  const u = unitLower(unit);
  const inList = items.filter((x) => x.kind === "product" && x.productSlug === product.slug);

  const changeUnit = (next: SupplyUnit) => {
    if (next === unit) return;
    setUnit(next);
    // Birim değişince miktar sıfırlanır: "50 koli" yanlışlıkla "50 palet" olmasın
    setCounts({});
    setSingle(QUOTE_DEFAULT_QTY);
  };

  const handleAdd = () => {
    const base = {
      kind: "product" as const,
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      unit,
      koli: product.koli,
    };
    if (multi) {
      const chosen = sizes.filter((s) => (counts[s] ?? 0) > 0);
      if (chosen.length > 0) {
        addMultipleItems(
          chosen.map((s) => ({ ...base, spec: sizeSpec(s), quantity: counts[s] })),
          openOnAdd
        );
      } else {
        addItem({ ...base, spec: SIZE_UNSPECIFIED, quantity: QUOTE_DEFAULT_QTY }, openOnAdd);
      }
      setCounts({});
    } else {
      addItem({ ...base, quantity: single }, openOnAdd);
      setSingle(QUOTE_DEFAULT_QTY);
    }
    setJustAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 3000);
  };

  const conversionFor = (n: number): string | null => {
    if (unit !== "Koli" || !koli || n <= 0) return null;
    return `${(n * koli.perCarton).toLocaleString("tr-TR")} ${koli.unit}`;
  };

  const totalLine =
    total > 0 ? (
      unit === "Koli" && koli ? (
        <>
          Toplam: <strong className="font-semibold text-ink">{formatKoliConversion(product.koli, total)}</strong>
        </>
      ) : (
        <>
          Toplam:{" "}
          <strong className="font-semibold text-ink">
            {total.toLocaleString("tr-TR")} {u}
          </strong>
          {unit === "Palet" && <> · Palet başına koli adedi teklifte bildirilir.</>}
        </>
      )
    ) : (
      <>Beden seçmezseniz ürün 1 {u} olarak, &ldquo;{SIZE_UNSPECIFIED}&rdquo; notuyla eklenir.</>
    );

  const summary = inList
    .slice(0, MAX_SUMMARY)
    .map((x) => `${x.spec ? `${x.spec}: ` : ""}${x.quantity.toLocaleString("tr-TR")} ${unitLower(x.unit)}`)
    .join(", ");

  return (
    <div className={className}>
      {/* Birim */}
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Birim</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {PRODUCT_UNITS.map((opt) => (
            <label
              key={opt}
              className="flex min-h-[48px] cursor-pointer flex-col items-center justify-center rounded-xl border border-line-strong bg-white px-2 py-1.5 text-center transition hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:checked]:ring-1 has-[:checked]:ring-brand has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/25"
            >
              <input
                type="radio"
                name={`${uid}-unit`}
                value={opt}
                checked={unit === opt}
                onChange={() => changeUnit(opt)}
                className="sr-only"
              />
              <span className="text-sm font-semibold text-ink">{opt}</span>
              <span className="text-xs leading-tight text-ink-muted">
                {opt === "Koli" ? (product.koli ? `Koli içi ${product.koli.toLocaleLowerCase("tr-TR")}` : "Koli bazında") : "Koli adedi teklifte"}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Miktar */}
      {multi ? (
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-ink">
            Beden dağılımı <span className="font-normal text-ink-muted">({u} adedi)</span>
          </legend>
          <ul className="mt-1 divide-y divide-line">
            {sizes.map((s) => {
              const n = counts[s] ?? 0;
              const conv = conversionFor(n);
              return (
                <li key={s} className="flex items-center gap-2 py-1.5">
                  <span className="w-12 shrink-0 text-sm font-semibold text-ink" aria-hidden="true">
                    {s}
                  </span>
                  <QtyStepper
                    value={n}
                    min={0}
                    onChange={(v) => setCounts((c) => ({ ...c, [s]: v }))}
                    label={`Beden ${s} ${u} adedi`}
                    announce={false}
                  />
                  <span className="ml-auto min-w-0 text-right text-xs tabular-nums text-ink-muted">{conv ? `= ${conv}` : ""}</span>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ) : (
        <div className="mt-4">
          <p className="text-sm font-semibold text-ink" aria-hidden="true">
            Miktar ({u})
            {sizes[0] && <span className="ml-1 font-normal text-ink-muted">· Beden: {sizes[0]}</span>}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <QtyStepper value={single} onChange={setSingle} label={`${unit} adedi`} announce={false} />
          </div>
        </div>
      )}

      <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-ink-soft" aria-live="polite">
        {totalLine}
      </p>

      <button type="button" onClick={handleAdd} className="btn-action mt-4 min-h-[48px] w-full text-base sm:text-sm">
        {justAdded ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            {CTA.added}
          </>
        ) : (
          <>
            <ClipboardList className="h-4 w-4 shrink-0" aria-hidden />
            {multi && total > 0 ? "Seçilen bedenleri teklif listesine ekle" : CTA.addToList}
          </>
        )}
      </button>
      <p className="mt-2 text-center text-xs font-medium text-ink-soft">{PROMISES.quoteReassurance}</p>

      {inList.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-action-border bg-action-light py-1 pl-3 pr-1 text-sm">
          <p className="flex min-w-0 items-start gap-1.5 py-2 text-action-hover">
            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              <strong className="font-semibold">{CTA.added}</strong>
              {summary && <span>: {summary}</span>}
              {inList.length > MAX_SUMMARY && <span> +{inList.length - MAX_SUMMARY}</span>}
            </span>
          </p>
          <button
            type="button"
            onClick={() => openModal("urun_kutusu")}
            className="inline-flex min-h-[44px] items-center rounded-lg px-2 font-bold text-action-hover underline underline-offset-2 hover:bg-white/60"
          >
            Listeyi görüntüle
          </button>
        </div>
      )}
    </div>
  );
}
