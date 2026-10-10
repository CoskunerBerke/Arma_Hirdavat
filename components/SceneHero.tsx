"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, MapPin, Search } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import { useProductSearch } from "./ProductSearchModal";

export default function SceneHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openSearch } = useProductSearch();

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
            Endüstriyel Tedarik & Tesis Malzemeleri B2B Portalı
          </span>
        </div>

        {/* Ana Başlık (H1) */}
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl leading-[1.15]">
          Endüstriyel Tesisler İçin <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-emerald-200 to-white">
            Yüksek Hacimli Teknik Tedarik
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 drop-shadow sm:text-lg">
          Üretimin sürekliliği için gereken tüm teknik sarf ve donanım gruplarını; Samsun merkez depomuzdan Türkiye&apos;nin 81 ilindeki fabrikalara doğrudan teslim ediyoruz.
        </p>

        {/* Yüksek Dönüşümlü Aksiyon Butonları (Sade & Dengeli) */}
        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <RfqTriggerButton className="btn-action py-3.5 px-6 sm:px-7 text-sm font-bold shadow-xl shadow-action/40 justify-center w-full sm:w-auto">
            <ClipboardList className="h-4 w-4" />
            <span>Tesisiniz İçin Fiyat Teklifi Alın</span>
            <ArrowRight className="h-4 w-4" />
          </RfqTriggerButton>

          <Link
            href="/urunler"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50 w-full sm:w-auto"
          >
            <span>Ürün Gruplarını İnceleyin</span>
          </Link>
        </div>

        {/* Akıllı & Toleranslı Ürün Arama Çubuğu (Sade & Efektli) */}
        <div className="mt-5 w-full max-w-xl">
          <div
            onClick={() => openSearch()}
            className="group relative flex cursor-pointer items-center justify-between rounded-2xl border border-white/20 bg-slate-950/75 py-2.5 pl-4 pr-3 text-xs sm:text-sm text-slate-300 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/60 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-emerald-950/40"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Search className="h-4 w-4 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate text-slate-400 group-hover:text-slate-200">
                Aradığınız ürün veya kodu yazın (örn: nitril, kesilmez, 1301)...
              </span>
            </div>
            <span className="shrink-0 rounded-xl bg-white/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-400/30">
              Ara ↵
            </span>
          </div>
        </div>

        {/* 4 Güven Unsuru (Ağır Sanayi Standartları) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-4 border-t border-white/15 pt-5 sm:pt-6 sm:grid-cols-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-xs">✓</span>
            <span className="truncate">100% Orijinal & CE Standart</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 text-xs">⚡</span>
            <span className="truncate">2 Saatte Proforma Teklif</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 text-xs">📦</span>
            <span className="truncate">Çemberli Palet Sevkiyatı</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-xs">🚛</span>
            <span className="truncate">81 İle Ambar Teslimatı</span>
          </div>
        </div>
      </div>
    </section>
  );
}
