"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, MapPin } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";

export default function SceneHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safari (iOS), Chrome ve tüm mobil tarayıcılarda sorunsuz sessiz video oynatma
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("playsinline", "true");
    v.setAttribute("webkit-playsinline", "true");
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <section
      aria-label="Arma Hırdavat Karşılama Ekranı"
      className="relative isolate flex min-h-[calc(100svh-72px)] flex-col justify-end overflow-hidden pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Tam ekran arka plan drone videosu */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        src="/videos/hero-drone.mp4"
        poster="/videos/hero-drone-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Şık ve hafif sinematik karartma: Video canlı ve ferah görünür, yazılar kusursuz okunur */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/40" />

      {/* Üstte hafif koyuluk (header geçişi için) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-slate-950/70 to-transparent" />

      {/* Ön plandaki sade, zarif içerik — Kapatıcı kutular ve karmaşık kartlar kaldırıldı */}
      <div className="container-x relative z-10 max-w-4xl">
        {/* Üst B2B Rozeti */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-slate-950/60 px-4 py-1.5 shadow-xl backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="text-xs font-semibold text-white sm:text-sm">
            Endüstriyel Tedarik & Tesis Malzemeleri B2B Portalı
          </span>
          <span className="hidden items-center gap-1.5 text-xs text-slate-300 sm:inline-flex border-l border-white/20 pl-2.5">
            <MapPin className="h-3.5 w-3.5 text-blue-400" /> Samsun Merkez Depo • 81 İl Sevkiyat
          </span>
        </div>

        {/* Ana Slogan */}
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl leading-[1.15]">
          Yalnızca Toptan ve <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
            Endüstriyel Çözümler
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 drop-shadow sm:text-lg">
          Üretim tesisleri, fabrikalar ve kurumsal işletmeler için koli ve palet bazında yüksek hacimli malzeme tedariği.
        </p>

        {/* Aksiyon Butonları */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/urunler" className="btn-primary py-3.5 px-7 shadow-xl shadow-brand/40 text-sm font-semibold">
            Ürün Kataloğunu İncele <ArrowRight className="h-4 w-4" />
          </Link>
          <RfqTriggerButton className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50">
            <ClipboardList className="h-4 w-4 text-blue-300" />
            <span>Teklif Sepeti (RFQ)</span>
          </RfqTriggerButton>
        </div>
      </div>
    </section>
  );
}
