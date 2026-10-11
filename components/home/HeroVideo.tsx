"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

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

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** Hareket azaltma, veri tasarrufu veya 2G bağlantıda video hiç indirilmez; poster kalır. */
function shouldSkipVideo(): boolean {
  if (typeof window === "undefined") return true;
  if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && /2g$/.test(conn.effectiveType)) return true; // "2g" | "slow-2g"
  return false;
}

/**
 * Hero arka plan videosu.
 * - LCP posterdir (SceneHero içinde next/image ile, priority). Video ilk boyamayı geciktirmez:
 *   kaynak yalnızca sayfa yüklendikten sonra, tarayıcı boştayken atanır.
 * - Ekran yönüne göre küçük kodlama seçilir (dikey 540p / yatay 1080×608).
 * - Görünür bir duraklat / oynat düğmesi vardır (WCAG 2.2.2). Hero ekrandan çıkınca video durur.
 */
export default function HeroVideo({ wideSrc, portraitSrc, wideMedia, children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [active, setActive] = useState(false); // kaynak atandı
  const [shown, setShown] = useState(false); // ilk kare oynadı, poster üzerine yumuşakça gelir
  const [playing, setPlaying] = useState(false);

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
      // Otomatik oynatma engellenirse (ör. iOS düşük güç modu) poster kalır, kullanıcı düğmeyle başlatabilir
      v.play().catch(() => setPlaying(false));
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
          if (!userPausedRef.current && v.paused) v.play().catch(() => undefined);
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      v.play().catch(() => undefined);
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  };

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
        {active && (
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Arka plan videosunu duraklat" : "Arka plan videosunu oynat"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/60 text-white backdrop-blur-md transition hover:bg-slate-900/80"
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="ml-0.5 h-4 w-4" aria-hidden />}
          </button>
        )}
      </div>
    </>
  );
}
