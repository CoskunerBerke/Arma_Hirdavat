"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { CLIENT_REFERENCES, type ClientReference } from "@/data/company";
import Reveal from "./Reveal";

const AUTO_SLIDE_DURATION = 5000; // 5 saniye otomatik geçiş

export default function ClientLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastWheelTimeRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);

  const total = CLIENT_REFERENCES.length;
  const current: ClientReference = CLIENT_REFERENCES[activeIndex];

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Otomatik 5 saniyede bir geçiş (Hover yapıldığında veya dokunulduğunda duraklar)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, AUTO_SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, next, activeIndex]);

  // Mouse Wheel (Tekerlek) ile kaydırınca geçiş
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 420) {
        lastWheelTimeRef.current = now;
        if (e.deltaY > 0 || e.deltaX > 0) {
          next();
        } else {
          prev();
        }
      }
    }
  };

  // Mobil Dokunmatik (Swipe) ile kaydırma
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      aria-label="Çalıştığımız ve Tedarik Sağladığımız Sanayi Kuruluşları"
      className="border-b border-line bg-gradient-to-b from-white via-slate-50/40 to-white py-12 sm:py-16 relative overflow-hidden w-full max-w-full"
    >
      <div className="container-x w-full max-w-full min-w-0">
        {/* Üst Başlık & B2B Güven Mesajı */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 sm:pb-8 border-b border-line/60">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-action">
              <Award className="h-3.5 w-3.5 text-action" />
              <span>GÜVENİLİR B2B SANAYİ ORTAĞI</span>
            </div>
            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Türkiye&apos;nin Öncü Sanayi Kuruluşlarının Malzeme Tedarikçisiyiz
            </h2>
            <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-ink-soft">
              Üretim tesisleri, ağır sanayi fabrikaları ve global şantiyelerin yüksek hacimli teknik hırdavat, KKD ve tesis ihtiyaçlarını düzenli koli ve palet sevkiyatlarıyla karşılıyoruz.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-line self-start md:self-end">
            <CheckCircle2 className="h-4 w-4 text-action" />
            <span>Doğrudan Toptan & Kurumsal İskonto</span>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* 1. SADELEŞTİRİLMİŞ 5 FİRMA SEKMESİ (5 SANİYE İLERLEME ÇUBUĞUYLA BİRLİKTE) */}
        {/* ========================================================================= */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full">
          {CLIENT_REFERENCES.map((client, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={client.name}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border text-center overflow-hidden ${
                  isActive
                    ? "bg-white border-brand shadow-sm shadow-brand/10 ring-2 ring-brand/15"
                    : "bg-white/70 border-line text-ink-soft hover:bg-white hover:border-slate-300"
                }`}
              >
                {/* Logo */}
                <div className="relative flex h-8 sm:h-9 w-full items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logosu`}
                    width={110}
                    height={36}
                    style={{ width: "auto", height: "auto" }}
                    className={`max-h-7 sm:max-h-8 w-auto max-w-[85%] object-contain transition-all duration-300 ${
                      isActive ? "grayscale-0 scale-105" : "grayscale opacity-60 hover:opacity-100"
                    }`}
                  />
                </div>

                {/* Kısa İsim */}
                <span className={`mt-2 text-xs font-bold truncate max-w-full ${
                  isActive ? "text-brand" : "text-ink-muted"
                }`}>
                  {client.name}
                </span>

                {/* Aktif İlerleme Çubuğu (5 Saniyede Dolar) */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-100 overflow-hidden">
                    <div
                      key={`progress-${activeIndex}`}
                      style={{ animationDuration: `${AUTO_SLIDE_DURATION}ms` }}
                      className={`h-full bg-brand origin-left animate-[progress_5s_linear_forwards] ${
                        isPaused ? "[animation-play-state:paused]" : ""
                      }`}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. SADE, AKICI VE EFEKTLİ GEÇİŞ KARTI (SCROLL / SWIPE / ZAMANLI) */}
        {/* ========================================================================= */}
        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mt-6 rounded-3xl border border-line bg-white shadow-xl shadow-slate-200/40 p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all"
        >
          {/* Arka Plan Yumuşak Işıma */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-50/50 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-50/50 blur-3xl" />

          {/* İçerik Kutusu (key={current.name} sayesinde her değişimde akıcı fade/slide efekti devreye girer) */}
          <div
            key={current.name}
            className="grid gap-8 lg:grid-cols-12 lg:items-center animate-in fade-in slide-in-from-right-4 duration-400 ease-out"
          >
            {/* Sol Kolon: Sade Firma Bilgisi & Ne Yapar & Tedarik */}
            <div className="lg:col-span-7 space-y-4">
              {/* Üst Rozet & Firma Sırası */}
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-xs font-bold text-brand">
                  <Sparkles className="h-3.5 w-3.5" /> {current.badge}
                </span>
                <span className="text-xs font-semibold text-ink-muted">
                  Referans {activeIndex + 1} / {total}
                </span>
              </div>

              {/* Firma Başlığı */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
                  {current.name}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-500">
                  {current.sector}
                </p>
              </div>

              {/* Ne İş Yapar? (Sade, Akıcı Anlatım) */}
              <p className="text-sm sm:text-base leading-relaxed text-ink-soft">
                {current.description}
              </p>

              {/* Arma Tedarik Kapsamı (Zarif Vurgulu Çizgi) */}
              <div className="border-l-2 border-emerald-500 pl-4 py-1 bg-emerald-50/40 rounded-r-xl pr-3">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
                  Arma Hırdavat Malzeme Tedarik Kapsamı:
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-emerald-950 font-medium">
                  {current.supplyScope}
                </p>
              </div>

              {/* Öne Çıkan Standartlar / Etiketler */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Sade Tek Buton */}
              <div className="pt-2">
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Resmi Web Sitesini İncele</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Sağ Kolon: Sade & Büyük Logo Alanı */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full rounded-2xl border border-line bg-gradient-to-b from-white to-slate-50/60 p-8 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="relative flex h-24 sm:h-28 w-full items-center justify-center p-2">
                  <Image
                    src={current.logo}
                    alt={`${current.name} logosu`}
                    width={260}
                    height={80}
                    priority
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-16 sm:max-h-20 w-auto max-w-[88%] object-contain"
                  />
                </div>

                <div className="mt-5 w-full border-t border-line/60 pt-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-action shrink-0" />
                  <span>Doğrudan Koli ve Palet Bazında Tedarik</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alt Kontrol Barı: Süre ve Ok Tuşları */}
          <div className="mt-8 pt-5 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <MousePointer2 className="h-3.5 w-3.5 text-brand" />
              <span>
                {isPaused
                  ? "İnceleme modundasınız (Duraklatıldı)"
                  : "Her 5 saniyede bir otomatik geçer • Scroll ederek veya tıklayarak değiştirebilirsiniz"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink hover:bg-slate-50 transition shadow-2xs active:scale-95"
                aria-label="Önceki Firma"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Önceki
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink hover:bg-slate-50 transition shadow-2xs active:scale-95"
                aria-label="Sonraki Firma"
              >
                Sonraki <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
