"use client";

import { Children, useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSlideActiveContext } from "./heroSlideContext";

interface HeroCarouselProps {
  /** Her slaydın kısa adı (nokta düğmelerinin erişilebilir adı) — children ile aynı sırada */
  labels: string[];
  children: ReactNode;
  /** Otomatik geçiş aralığı (ms) */
  intervalMs?: number;
  ariaLabel?: string;
}

/** Yalnızca yazı alanlarında ok tuşlarını slayt geçişine çevirme */
function isTypingTarget(t: EventTarget | null) {
  return t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
}

/**
 * Ana sayfa hero kaydırıcısı (tam genişlik).
 * - İlk slayt sunucuda ilk sırada üretilir (LCP posteri değişmez); diğerleri sağda bekler.
 * - Sol/sağ ortada büyük kare oklar (md+), mobilde oklar ve noktalar altta küçük bir sırada.
 * - ~8 sn'de bir otomatik ilerler; fare üstündeyken veya klavye odağı içerideyken bekler,
 *   kullanıcı ok/nokta/kaydırma ile geçiş yaptığında otomatik geçiş tamamen durur.
 * - Dokunmatik ekranda yatay kaydırma ile geçilir; dikey sayfa kaydırması engellenmez.
 * - Yalnızca etkin slayttaki video oynar (HeroSlideActiveContext); hero ekrandan çıkınca hepsi durur.
 * - Etkin olmayan slaytlar aria-hidden + inert: odak ve ekran okuyucu yalnızca görünen slayda girer.
 */
export default function HeroCarousel({ labels, children, intervalMs = 8000, ariaLabel = "Öne çıkanlar" }: HeroCarouselProps) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);
  const userGo = useCallback(
    (i: number) => {
      setAuto(false);
      go(i);
    },
    [go]
  );

  // Otomatik geçiş
  useEffect(() => {
    if (!auto || hold || !inView || n < 2) return;
    const t = window.setTimeout(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      go(index + 1);
    }, intervalMs);
    return () => window.clearTimeout(t);
  }, [auto, hold, inView, index, n, intervalMs, go]);

  // Hero ekrandan çıkınca videolar ve otomatik geçiş durur
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => entry && setInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!s || !t) return;
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    userGo(dx < 0 ? index + 1 : index - 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (isTypingTarget(e.target)) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      userGo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      userGo(index - 1);
    }
  };

  const arrowBase =
    "inline-flex items-center justify-center border border-white/25 bg-slate-950/35 text-white backdrop-blur-sm transition-colors hover:border-accent hover:bg-slate-950/60 hover:text-accent";

  const prevLabel = "Önceki";
  const nextLabel = "Sonraki";

  const dots = (
    <div className="flex items-center">
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => userGo(i)}
          aria-label={`${i + 1}. slayt: ${labels[i] ?? ""}`}
          aria-current={i === index ? "true" : undefined}
          className="group inline-flex h-10 w-10 items-center justify-center"
        >
          <span
            aria-hidden
            className={`block h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-accent" : "w-2.5 bg-white/70 group-hover:bg-white"
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="relative isolate overflow-hidden bg-slate-950"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) setHold(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div
        aria-live={auto ? "off" : "polite"}
        className="flex touch-pan-y transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${n}: ${labels[i] ?? ""}`}
              aria-hidden={active ? undefined : true}
              // React 18 "inert"i tanımaz; boş dize özniteliği DOM'a olduğu gibi yazar
              {...(active ? {} : ({ inert: "" } as Record<string, string>))}
              className="flex w-full shrink-0"
            >
              <HeroSlideActiveContext.Provider value={active && inView}>{slide}</HeroSlideActiveContext.Provider>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <>
          {/* md+: sol/sağ ortada büyük kare oklar */}
          <button
            type="button"
            onClick={() => userGo(index - 1)}
            aria-label={prevLabel}
            className={`${arrowBase} absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 md:inline-flex lg:left-5 lg:h-14 lg:w-14`}
          >
            <ChevronLeft className="h-7 w-7" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => userGo(index + 1)}
            aria-label={nextLabel}
            className={`${arrowBase} absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 md:inline-flex lg:right-5 lg:h-14 lg:w-14`}
          >
            <ChevronRight className="h-7 w-7" aria-hidden />
          </button>

          {/* Alt sıra: mobilde küçük oklar + noktalar, md+ yalnızca noktalar */}
          <div className="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-1 md:bottom-3">
            <button
              type="button"
              onClick={() => userGo(index - 1)}
              aria-label={prevLabel}
              className={`${arrowBase} h-10 w-10 md:hidden`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            {dots}
            <button
              type="button"
              onClick={() => userGo(index + 1)}
              aria-label={nextLabel}
              className={`${arrowBase} h-10 w-10 md:hidden`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
