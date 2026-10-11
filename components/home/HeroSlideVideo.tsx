"use client";

import { useEffect, useRef, useState } from "react";
import { useHeroSlideActive } from "./heroSlideContext";

interface HeroSlideVideoProps {
  src: string;
  /** object-position (ör. "70% 50%"): dikey ekranda ürün kartı ortada kalsın */
  objectPosition?: string;
}

/**
 * Hero kaydırıcısındaki kategori videosu (arka plan, dekoratif).
 * - Kaynak yalnızca slayt ilk kez etkin olunca atanır (ilk yüklemede indirilmez).
 * - Sessiz, döngü, playsInline; slayt etkinken oynar, değilken durur. Düğme yoktur.
 * - Oynatma engellenirse (ör. iOS düşük güç modu) alttaki poster görünür kalır.
 */
export default function HeroSlideVideo({ src, objectPosition = "70% 50%" }: HeroSlideVideoProps) {
  const active = useHeroSlideActive();
  const ref = useRef<HTMLVideoElement>(null);
  const assigned = useRef(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      if (!assigned.current) {
        v.muted = true;
        v.defaultMuted = true;
        v.src = src;
        assigned.current = true;
      }
      v.play().catch(() => undefined);
    } else if (!v.paused) {
      v.pause();
    }
  }, [active, src]);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"}`}
      style={{ objectPosition }}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      onPlaying={() => setShown(true)}
    />
  );
}
