"use client";

import { useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { MapPin } from "lucide-react";

/**
 * Teslimat haritasının etkileşim katmanı (harita SVG'si sunucuda üretilir ve children olarak gelir).
 * Masaüstünde il üzerine gelince, dokunmatik ekranda ile dokununca adı alttaki satırda yazılır
 * ve il vurgulanır (data-selected). Masaüstünde ayrıca SVG <title> ipucu görünür.
 */
export default function DeliveryMapFrame({ children, hint }: { children: ReactNode; hint: string }) {
  const [name, setName] = useState<string | null>(null);
  const selected = useRef<Element | null>(null);

  const pick = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return;
    const el = target.closest("[data-il]");
    if (!el || el === selected.current) return;
    selected.current?.removeAttribute("data-selected");
    el.setAttribute("data-selected", "");
    selected.current = el;
    setName(el.getAttribute("data-il"));
  };

  return (
    <div
      onPointerOver={(e: PointerEvent) => {
        if (e.pointerType === "mouse") pick(e.target);
      }}
      onClick={(e: MouseEvent) => pick(e.target)}
    >
      {children}
      <p
        aria-live="polite"
        className="mt-3 flex min-h-[24px] items-center gap-1.5 text-xs font-medium text-slate-200 sm:text-sm"
      >
        <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        {name ? (
          <span>
            <span className="font-bold text-white">{name}</span> · teslimat bölgemizde
          </span>
        ) : (
          <span>{hint}</span>
        )}
      </p>
    </div>
  );
}
