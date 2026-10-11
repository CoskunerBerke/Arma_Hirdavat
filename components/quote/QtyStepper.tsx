"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export interface QtyStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** Varsayılan 1 (beden matrisinde 0) */
  min?: number;
  /** Varsayılan 9999 */
  max?: number;
  /** Erişilebilir ad, ör. "Beden 9 koli adedi" */
  label: string;
  id?: string;
  describedBy?: string;
  /** Artır/azalt düğmeleriyle değişen değeri ekran okuyucuya duyur (varsayılan true) */
  announce?: boolean;
  className?: string;
}

/**
 * Elle yazılabilen miktar alanı + 44 px artır/azalt düğmeleri.
 * Yazarken ham metin tutulur (alan silinebilir); geçerli değer anında, geçersiz değer
 * odaktan çıkınca düzeltilir. Ok tuşları da değeri değiştirir.
 */
export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  label,
  id,
  describedBy,
  announce = true,
  className = "",
}: QtyStepperProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [spoken, setSpoken] = useState("");
  const maxLen = String(max).length;

  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n)));

  // Sınırdaki düğme disabled değil aria-disabled: odak kaybolmasın
  const step = (delta: number) => {
    const next = clamp(value + delta);
    setDraft(null);
    if (next !== value) onChange(next);
    if (announce) setSpoken(`${label}: ${next}`);
  };

  const btn =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink-soft transition hover:bg-slate-100 hover:text-ink aria-disabled:cursor-not-allowed aria-disabled:opacity-35 aria-disabled:hover:bg-transparent";

  return (
    <div className={`inline-flex items-stretch overflow-hidden rounded-xl border border-line-input bg-white ${className}`}>
      <button type="button" className={btn} onClick={() => step(-1)} aria-disabled={value <= min} aria-label={`${label}: bir azalt`}>
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        enterKeyHint="done"
        maxLength={maxLen}
        aria-label={label}
        aria-describedby={describedBy}
        value={draft ?? String(value)}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "").slice(0, maxLen);
          setDraft(digits);
          if (digits) {
            const n = parseInt(digits, 10);
            if (n >= min && n <= max && n !== value) onChange(n);
          }
        }}
        onBlur={() => {
          if (draft !== null && draft !== "") {
            const n = clamp(parseInt(draft, 10));
            if (n !== value) onChange(n);
          }
          setDraft(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            step(-1);
          }
        }}
        className="h-11 w-14 min-w-0 border-x border-line bg-white text-center text-base font-semibold tabular-nums text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:text-sm"
      />
      <button type="button" className={btn} onClick={() => step(1)} aria-disabled={value >= max} aria-label={`${label}: bir artır`}>
        <Plus className="h-4 w-4" aria-hidden />
      </button>
      {announce && (
        <span className="sr-only" aria-live="polite">
          {spoken}
        </span>
      )}
    </div>
  );
}
