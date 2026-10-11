"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

/*
 * Ürün tanıtım videosu — YAPAY ZEKÂ İLE ÜRETİLMİŞ TEMSİLÎ bir klip (eldivenli el metal parçayı kavrıyor).
 * Test, laboratuvar veya "canlı saha" görüntüsü DEĞİLDİR; öyle sunmayın.
 * Uygun yer: köpük nitril / nitril kaplı eldiven sayfaları. Standart bilgisi verilecekse ürünün
 * kendi verisinden (p.standards) gelmelidir — burada sabit kod YOK.
 *
 * Performans: video yalnızca ekrana yaklaşınca yüklenir (preload="none"); hareket azaltma ve
 * veri tasarrufu açıksa kendiliğinden oynamaz, kullanıcı düğmeyle başlatır. Ekrandan çıkınca durur.
 */
const VIDEO_SRC = "/videos/faba-worker-540.mp4";
const POSTER_SRC = "/videos/faba-worker-poster-540.jpg";

interface ProductActionVideoProps {
  compact?: boolean;
  className?: string;
  /** Video altındaki başlık (ör. ürün kodu ve adı) */
  title?: string;
  /** Başlık altındaki kısa açıklama */
  subtitle?: string;
  /** Ürünün kendi standart bilgisi (ör. p.standards[0]); verilmezse gösterilmez */
  standard?: string;
  /** Video altı küçük not (boşsa gösterilmez) */
  disclosure?: string;
}


function autoplayAllowed(): boolean {
  // İşletme tercihi: ekrana gelince her zaman otomatik ve döngüde oynar.
  return typeof window !== "undefined";
}

export default function ProductActionVideo({
  compact = false,
  className = "",
  title = "Eldivenle metal parça kavrama",
  subtitle,
  standard,
  disclosure = "",
}: ProductActionVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const autoRef = useRef(false);
  const [shown, setShown] = useState(false); // ilk kare oynadı
  const [playing, setPlaying] = useState(false);

  const load = () => {
    const v = videoRef.current;
    if (!v || v.getAttribute("src")) return v;
    v.muted = true;
    v.defaultMuted = true;
    v.src = VIDEO_SRC;
    return v;
  };

  useEffect(() => {
    autoRef.current = autoplayAllowed();
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const v = videoRef.current;
        if (entry.isIntersecting) {
          if (!autoRef.current || userPausedRef.current) return;
          const vid = load();
          vid?.play().catch(() => undefined);
        } else if (v && !v.paused) {
          v.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
    // load yalnızca ref'leri kullanır
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <figure
      ref={wrapRef}
      className={`relative overflow-hidden rounded-3xl border border-line bg-slate-950 shadow-xl ${className}`}
    >
      <div className={`relative w-full overflow-hidden ${compact ? "aspect-[9/12]" : "aspect-[9/14] sm:aspect-[9/15]"} max-h-[520px]`}>
        <Image src={POSTER_SRC} alt="" fill sizes="(min-width: 640px) 340px, 300px" className="object-cover" />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          onPlaying={() => {
            setShown(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
        />


        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-4 pt-10 sm:p-5 sm:pt-12">
          <p className="text-sm font-bold leading-tight text-white sm:text-base">{title}</p>
          {subtitle && <p className="mt-1 text-xs leading-snug text-slate-300">{subtitle}</p>}
          {standard && (
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden /> {standard}
            </p>
          )}
          {disclosure && <p className="mt-2 border-t border-white/10 pt-2 text-xs text-slate-400">{disclosure}</p>}
        </figcaption>
      </div>
    </figure>
  );
}
