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
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-slate-950/70 px-4 py-1.5 shadow-xl backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-action" />
          </span>
          <span className="text-xs font-semibold text-white sm:text-sm">
            FABA Yetkili B2B Toptan Tedarik Portalı
          </span>
          <span className="hidden items-center gap-1.5 text-xs text-slate-300 sm:inline-flex border-l border-white/20 pl-2.5">
            <MapPin className="h-3.5 w-3.5 text-blue-400" /> Samsun Merkez Depo • 81 İl Sevkiyat
          </span>
        </div>

        {/* Ana Slogan - Sade, Güçlü ve Anlaşılır */}
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl leading-[1.15]">
          Fabrikanız İçin Doğrudan <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-emerald-200 to-white">
            Toptan KKD Tedariği
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 drop-shadow sm:text-lg">
          FABA iş eldivenleri ve kimyasal koruyucu tulumlarda toptan fabrika fiyatları. Koli ve palet bazında özel kurumsal iskonto, aynı gün resmi teklif mektubu ve 81 ile ambar teslimatı.
        </p>

        {/* Yüksek Dönüşümlü Aksiyon Butonları (Yeşil Eylem + Şeffaf İkincil) */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <RfqTriggerButton className="btn-action py-3.5 px-7 text-sm font-bold shadow-xl shadow-action/40">
            <ClipboardList className="h-4 w-4" />
            <span>Teklif Sepeti (RFQ) İlet</span>
            <ArrowRight className="h-4 w-4" />
          </RfqTriggerButton>

          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50"
          >
            <span>39 Gerçek Ürünü İncele</span>
          </Link>
        </div>

        {/* 4 Güven Unsuru (Risk Azaltıcı Mikro Sinyaller) */}
        <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 sm:grid-cols-4 sm:gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">✓</span>
            <span>%100 Orijinal & CE Onaylı</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">⚡</span>
            <span>2 Saatte Resmi Teklif</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">📦</span>
            <span>Koli & Palet Sevkiyatı</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">🚚</span>
            <span>81 İle Anlaşmalı Ambar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
