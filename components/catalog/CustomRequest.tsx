"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ClipboardList } from "lucide-react";
import { CTA, PROMISES } from "@/data/company";
import { useQuote } from "../QuoteContext";

/**
 * Sitede listelenmeyen bir ürünü serbest metinle teklif listesine ekler ve listeyi açar.
 * (QuoteContext.addCustomItem: "serbest kalem", varsayılan birim "Adet"; miktar pencerede düzenlenir.)
 */
export default function CustomRequest({
  defaultValue = "",
  className = "",
}: {
  defaultValue?: string;
  className?: string;
}) {
  const { addCustomItem } = useQuote();
  const [text, setText] = useState(defaultValue);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const inputId = `${id}-urun`;
  const hintId = `${id}-ipucu`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = text.trim();
    if (title.length < 2) {
      setError(true);
      inputRef.current?.focus();
      return;
    }
    setError(false);
    // Ekleme ve pencere açma olayları QuoteContext içinde izlenir.
    addCustomItem({ title: title.slice(0, 160) }, true);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <label htmlFor={inputId} className="block text-sm font-semibold text-ink">
        Aradığınız ürünü yazın
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={text}
          maxLength={160}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Örn: M12 cıvata DIN 933, 5 koli"
          aria-invalid={error || undefined}
          aria-describedby={hintId}
          autoComplete="off"
          className="field min-h-[44px] flex-1"
        />
        <button type="submit" className="btn-action min-h-[44px] shrink-0">
          <ClipboardList className="h-4 w-4" aria-hidden />
          {CTA.addToList}
        </button>
      </div>
      <p id={hintId} className={`mt-2 text-xs ${error ? "font-medium text-red-700" : "text-ink-muted"}`}>
        {error ? "Lütfen ürün adını veya ihtiyacınızı yazın." : PROMISES.quoteReassurance}
      </p>
    </form>
  );
}
