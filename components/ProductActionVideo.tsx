"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ShieldCheck, Sparkles } from "lucide-react";

interface ProductActionVideoProps {
  compact?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function ProductActionVideo({
  compact = false,
  className = "",
  title = "FABA EP-1301 Mikro Köpük Nitril",
  subtitle = "Hassas Parça & Yağlı Çelik Tutuş Testi",
}: ProductActionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("playsinline", "true");
    v.setAttribute("webkit-playsinline", "true");
    const p = v.play();
    if (p !== undefined) {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-line bg-slate-950 shadow-xl ${className}`}>
      {/* 9:16 Video Container */}
      <div className="relative aspect-[9/14] sm:aspect-[9/15] w-full max-h-[520px] overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/faba-worker-in-action.mp4"
          poster="/videos/faba-worker-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-center cursor-pointer transition-transform duration-700 hover:scale-[1.02]"
          onClick={togglePlay}
          aria-label="FABA İş Güvenliği Eldiveni Saha Performans Testi Videosu"
        />

        {/* Canlı Gösterim Rozeti (Sol Üst) */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur-md border border-white/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-action" />
          </span>
          <span>SAHADA PERFORMANS</span>
        </div>

        {/* Ses & Oynat Kontrolleri (Sağ Üst) */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Videoyu Duraklat" : "Videoyu Oynat"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md transition hover:bg-slate-900 border border-white/20"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
          </button>
        </div>

        {/* Video İçi Alt Bilgi Katmanı (Gradient & Açıklama) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 sm:p-5">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="h-3 w-3" /> FABA KKD Laboratuvar Testi
          </div>
          <h4 className="mt-1 text-sm font-bold text-white sm:text-base leading-tight">
            {title}
          </h4>
          <p className="mt-1 text-xs text-slate-300 leading-snug">
            {subtitle}
          </p>

          <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400 border-t border-white/10 pt-2.5">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-action" /> EN 388 4131X
            </span>
            <span>•</span>
            <span>Kaymaz Tutuş (Grip)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
