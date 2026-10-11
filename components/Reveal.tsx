"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Görünme animasyonu gecikmesi (ms) */
  delay?: number;
}

/**
 * Görünür alana girdiğinde yumuşakça beliren sarmalayıcı.
 *
 * - İçerik sunucuda ve JS olmadan GÖRÜNÜR üretilir; yalnızca ekranın altında kalan öğeler
 *   bileşen yüklendikten sonra "reveal-armed" ile gizlenir ve kaydırınca belirir.
 * - Yüklendiğinde zaten ekranda (veya üstünde) olan öğeler hiç gizlenmez.
 * - IntersectionObserver yoksa veya kullanıcı hareket azaltmayı seçtiyse her şey hemen görünür.
 * - Ekranın üst kısmındaki (LCP) içeriği Reveal ile SARMALAMAYIN.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    // Ekranda veya ekranın üstünde kalmış öğeler: gizleme yok
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (el.getBoundingClientRect().top < viewportH * 0.9) {
      el.classList.add("is-visible");
      return;
    }

    el.classList.add("reveal-armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
