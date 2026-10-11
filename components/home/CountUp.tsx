"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Gerçek değer (sunucuda ve JS olmadan doğrudan bu gösterilir) */
  value: number;
  /** Sayının ardından gelen kısa ek (ör. "+") */
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Ekrana girince 0'dan değere sayan sayı.
 * - Sunucu çıktısı ve erişilebilir ad her zaman gerçek değerdir (animasyonlu kısım aria-hidden).
 * - Yüklendiğinde zaten ekranda olan sayı sayılmaz (yanıp sönme olmasın); yalnızca aşağıda kalanlar sayar.
 * - İşletme tercihi: animasyon her cihazda çalışır.
 */
export default function CountUp({ value, suffix = "", durationMs = 1600, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  const final = `${value.toLocaleString("tr-TR")}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden className="tabular-nums">
        {shown.toLocaleString("tr-TR")}
        {suffix}
      </span>
    </span>
  );
}
