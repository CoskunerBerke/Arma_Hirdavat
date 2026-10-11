"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CATEGORY_VIDEOS, type CategoryVideo as CategoryVideoEntry } from "@/data/videos";

/*
 * Kategori tanıtım videosu — yalnızca ürün fotoğrafları + ürün kodlarından oluşan sessiz döngü.
 *
 * Performans / erişilebilirlik:
 * - Poster hemen görünür; video preload="none" ve src yalnızca kutu ekrana girince eklenir.
 * - Hareket azaltma (prefers-reduced-motion) veya veri tasarrufu (saveData) açıksa kendiliğinden
 *   OYNAMAZ; poster + oynat düğmesi gösterilir, kullanıcı isterse başlatır.
 * - Ekrandan çıkınca durur; kullanıcı durdurduysa geri gelince yeniden başlamaz.
 */


function autoplayAllowed(): boolean {
  // İşletme tercihi: ekrana gelince her zaman otomatik ve döngüde oynar.
  return typeof window !== "undefined";
}

function attachSource(v: HTMLVideoElement, src: string): void {
  if (v.getAttribute("src")) return;
  v.muted = true;
  v.defaultMuted = true;
  v.src = src;
}

interface CategoryVideoProps {
  /** data/categories.ts → CATEGORY_PAGES[].slug */
  slug: string;
  /** Altyazıda gösterilecek başlık (ör. kategori adı) */
  title: string;
  className?: string;
  /** Kategori dışı video (ör. ürün videosu, data/videos.ts → PRODUCT_VIDEOS) */
  video?: CategoryVideoEntry;
}

export default function CategoryVideo({ slug, title, className = "", video }: CategoryVideoProps) {
  const entry = video ?? CATEGORY_VIDEOS[slug];
  if (!entry) return null;
  // key: slug değişirse oynatıcı durumu sıfırlanır
  return <CategoryVideoPlayer key={slug} entry={entry} title={title} className={className} />;
}

function CategoryVideoPlayer({
  entry,
  title,
  className,
}: {
  entry: CategoryVideoEntry;
  title: string;
  className: string;
}) {
  const figRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [shown, setShown] = useState(false); // ilk kare oynatıldı → videoyu posterin üstünde göster
  const [playing, setPlaying] = useState(false);
  const { src } = entry;

  useEffect(() => {
    const fig = figRef.current;
    if (!fig || typeof IntersectionObserver === "undefined") return;
    const auto = autoplayAllowed();
    const io = new IntersectionObserver(
      ([e]) => {
        const v = videoRef.current;
        if (!e || !v) return;
        if (e.isIntersecting) {
          if (!auto || userPausedRef.current) return;
          attachSource(v, src);
          v.play().catch(() => undefined);
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(fig);
    return () => io.disconnect();
  }, [src]);


  return (
    <figure ref={figRef} className={`m-0 ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-slate-950 shadow-sm">
        <Image
          src={entry.poster}
          alt=""
          width={entry.width}
          height={entry.height}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          width={entry.width}
          height={entry.height}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          onPlaying={() => {
            setShown(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setShown(false);
            setPlaying(false);
          }}
        />
      </div>
      <figcaption className="mt-2 text-sm leading-snug text-ink-muted">
        <span className="font-semibold text-ink-soft">Ürün tanıtım videosu</span>
        <span aria-hidden="true"> · </span>
        <span className="sr-only">: </span>
        {title}
      </figcaption>
    </figure>
  );
}
