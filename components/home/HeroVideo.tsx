"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHeroSlideActive } from "./heroSlideContext";

interface HeroVideoProps {
  /** Yatay (masaüstü) kırpım */
  wideSrc: string;
  /** Dikey (mobil) kodlama */
  portraitSrc: string;
  /** Yatay kaynağın seçildiği medya sorgusu (poster <picture> ile aynı olmalı) */
  wideMedia: string;
  /** Sağ üstteki kontrol satırında, düğmenin yanında gösterilecek içerik (ör. "Temsilî görüntü") */
  children?: ReactNode;
}


function shouldSkipVideo(): boolean {
  // İşletme tercihi: video her cihazda otomatik ve sürekli oynar (sessiz, döngü). Yalnızca SSR'da atlanır.
  return typeof window === "undefined";
}

/**
 * Hero arka plan videosu.
 * - LCP posterdir (SceneHero içinde next/image ile, priority). Video ilk boyamayı geciktirmez:
 *   kaynak yalnızca sayfa yüklendikten sonra, tarayıcı boştayken atanır.
 * - Ekran yönüne göre küçük kodlama seçilir (dikey 540p / yatay 1080×608).
 * - Düğme yok: video her zaman kendiliğinden oynar (işletme tercihi). Hero ekrandan çıkınca durur, dönünce sürer.
 * - Hero kaydırıcısında (HeroCarousel) başka slayda geçilince durur, bu slayda dönülünce sürer.
 *   Karusel dışında bağlamın varsayılanı "etkin"dir; davranış değişmez.
 */
export default function HeroVideo({ wideSrc, portraitSrc, wideMedia, children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [active, setActive] = useState(false); // kaynak atandı
  const [shown, setShown] = useState(false); // ilk kare oynadı, poster üzerine yumuşakça gelir
  const [playing, setPlaying] = useState(false);
  const slideActive = useHeroSlideActive();
  const slideActiveRef = useRef(slideActive);
  slideActiveRef.current = slideActive;

  // Gecikmeli yükleme
  useEffect(() => {
    if (shouldSkipVideo()) return;

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const start = () => {
      const v = videoRef.current;
      if (!v) return;
      const wide = typeof window.matchMedia === "function" && window.matchMedia(wideMedia).matches;
      v.muted = true;
      v.defaultMuted = true;
      v.src = wide ? wideSrc : portraitSrc;
      setActive(true);
      // Otomatik oynatma engellenirse (ör. iOS düşük güç modu) poster görünür kalır
      if (slideActiveRef.current) v.play().catch(() => setPlaying(false));
    };

    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(start, 1200);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [wideSrc, portraitSrc, wideMedia]);

  // Hero görünmüyorken çözümleme yapma (pil ve işlemci tasarrufu)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !active || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (!userPausedRef.current && slideActiveRef.current && v.paused) v.play().catch(() => undefined);
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  // Kaydırıcıda slayt değişince: etkin değilse dur, yeniden etkin olunca sür
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !active) return;
    if (!slideActive) {
      if (!v.paused) v.pause();
    } else if (!userPausedRef.current && v.paused) {
      v.play().catch(() => undefined);
    }
  }, [slideActive, active]);


  return (
    <>
      <video
        ref={videoRef}
        className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => {
          setShown(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
      />

      <div className="absolute right-3 top-3 z-10 flex items-center gap-2 sm:right-6 sm:top-5">
        {children}
      </div>
    </>
  );
}
