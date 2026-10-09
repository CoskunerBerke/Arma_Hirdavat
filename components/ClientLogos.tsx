"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  Factory,
  Layers,
  MousePointer2,
  Sparkles,
  Truck,
} from "lucide-react";
import { CLIENT_REFERENCES, type ClientReference } from "@/data/company";
import { useQuote } from "./QuoteContext";
import Reveal from "./Reveal";

export default function ClientLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setIsOpen: openRfq } = useQuote();

  const touchStartXRef = useRef<number | null>(null);
  const lastWheelTimeRef = useRef<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const total = CLIENT_REFERENCES.length;
  const current: ClientReference = CLIENT_REFERENCES[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((index + total) % total);
      setTimeout(() => setIsAnimating(false), 320);
    },
    [isAnimating, total]
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [goTo, activeIndex]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [goTo, activeIndex]);

  // Mouse Wheel / Trackpad scroll interaction over the showcase
  const handleWheel = (e: React.WheelEvent) => {
    // If delta is significant
    if (Math.abs(e.deltaY) > 30 || Math.abs(e.deltaX) > 30) {
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 480) {
        lastWheelTimeRef.current = now;
        if (e.deltaY > 0 || e.deltaX > 0) {
          next();
        } else {
          prev();
        }
      }
    }
  };

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation when user is focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Gentle auto-shift every 7 seconds, pauses on hover or interaction
  useEffect(() => {
    if (isHovered) return;
    autoPlayTimerRef.current = setInterval(() => {
      goTo(activeIndex + 1);
    }, 7000);
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isHovered, activeIndex, goTo]);

  return (
    <section
      aria-label="Çalıştığımız ve Tedarik Sağladığımız Sanayi Kuruluşları"
      className="border-b border-line bg-gradient-to-b from-white via-slate-50/60 to-white py-12 sm:py-16 relative overflow-hidden w-full max-w-full"
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
        {/* 1. ÜST ŞERİT: 5 FİRMANIN LOGO VE İSİM SEÇİCİ SEKMELERİ (TABS) */}
        {/* ========================================================================= */}
        <div className="mt-8 flex w-full max-w-full gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          {CLIENT_REFERENCES.map((client, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={client.name}
                type="button"
                onClick={() => goTo(idx)}
                aria-pressed={isActive}
                className={`group flex flex-1 min-w-[170px] sm:min-w-[190px] items-center gap-3 rounded-2xl p-3 text-left transition-all duration-300 border ${
                  isActive
                    ? "bg-white border-brand shadow-md shadow-brand/10 ring-2 ring-brand/15 scale-[1.01]"
                    : "bg-white/80 border-line text-ink-soft hover:bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                {/* Küçük Logo Alanı */}
                <div className="relative flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-1 border border-line/60">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logosu`}
                    width={90}
                    height={36}
                    style={{ width: "auto", height: "auto" }}
                    className={`max-h-7 w-auto max-w-full object-contain transition-all duration-200 ${
                      isActive ? "grayscale-0" : "grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100"
                    }`}
                  />
                </div>

                {/* İsim ve Kısa Sektör */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold truncate ${isActive ? "text-brand" : "text-ink"}`}>
                      {client.name}
                    </p>
                    {isActive && (
                      <span className="flex h-2 w-2 rounded-full bg-action animate-ping ml-1" />
                    )}
                  </div>
                  <p className="text-[10px] text-ink-muted truncate mt-0.5">
                    {client.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. ETKİLEŞİMLİ FİRMA TANITIM KARTI (DETAYLI AÇIKLAMA + SCROLL / SWIPE GEÇİŞİ) */}
        {/* ========================================================================= */}
        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-6 rounded-3xl border border-line bg-white shadow-xl shadow-slate-200/50 p-5 sm:p-8 lg:p-10 transition-all duration-300 relative overflow-hidden"
        >
          {/* Arka Plan Dekoratif Deseni */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-50/60 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-50/60 blur-3xl" />

          {/* Üst Kontrol & İpucu Şeridi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/70 pb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand/20 px-3 py-1 text-xs font-bold text-brand">
                <Building2 className="h-3.5 w-3.5" /> {current.badge}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                Firma {activeIndex + 1} / {total}
              </span>
            </div>

            {/* Mouse / Scroll ve Dokunma İpucu */}
            <div className="flex items-center gap-3 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-line/80 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600">
                <MousePointer2 className="h-3 w-3 text-brand" />
                <span>Scroll / kaydırarak veya oklarla değiştirin</span>
              </span>

              {/* Ok Butonları */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-ink hover:bg-slate-50 hover:text-brand transition shadow-2xs active:scale-95"
                  aria-label="Önceki Firma"
                  title="Önceki Firma (◀)"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-ink hover:bg-slate-50 hover:text-brand transition shadow-2xs active:scale-95"
                  aria-label="Sonraki Firma"
                  title="Sonraki Firma (▶)"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Ana İçerik Grid: Sol Kolon Firma Detayı & Tedarik, Sağ Kolon Logo ve Resmi Kart */}
          <div className={`mt-6 sm:mt-8 grid gap-8 lg:grid-cols-12 lg:items-center transition-opacity duration-300 ${
            isAnimating ? "opacity-50 scale-[0.99]" : "opacity-100 scale-100"
          }`}>
            {/* Sol Kolon: Firma Adı, Ne İş Yapar? ve Tedarik Kapsamı (7 Kolon) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight flex items-center gap-2.5">
                  {current.name}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-action bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="h-3 w-3" /> Düzenli Müşteri
                  </span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-brand">
                  {current.sector}
                </p>
              </div>

              {/* 1. KUTU: FİRMA NE İŞ YAPAR? (Detaylı Faaliyet Alanı) */}
              <div className="rounded-2xl border border-line/80 bg-slate-50/70 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  <Factory className="h-4 w-4 text-brand" />
                  <span>Kurumsal Faaliyet & Üretim Alanı (Ne Yapıyor?):</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-soft">
                  {current.description}
                </p>
              </div>

              {/* 2. KUTU: ARMA HIRDAVAT NE SAĞLIYOR? (Tedarik Kapsamı) */}
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                  <Truck className="h-4 w-4 text-action" />
                  <span>Arma Hırdavat Malzeme Tedarik Kapsamı:</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-emerald-950 font-medium">
                  {current.supplyScope}
                </p>
              </div>

              {/* Öne Çıkan Sanayi Standartları / Etiketler */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-soft shadow-2xs"
                  >
                    <Sparkles className="h-3 w-3 text-brand" /> {tag}
                  </span>
                ))}
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 text-xs sm:text-sm inline-flex items-center gap-2 shadow-md"
                >
                  <span>Resmi Web Sitesini İncele</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => openRfq(true)}
                  className="btn-action py-2.5 px-5 text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Bu Standartlarda Teklif İste</span>
                </button>
              </div>
            </div>

            {/* Sağ Kolon: Büyük Logo Vitrini & Resmi Doğrulama Kartı (5 Kolon) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border-2 border-line/80 bg-gradient-to-b from-white via-slate-50/50 to-white p-6 sm:p-8 text-center shadow-lg">
                {/* Üst Rozet */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-white shadow-sm mb-6">
                  <Layers className="h-3.5 w-3.5 text-action" />
                  <span>KURUMSAL SANAYİ REFERANSI</span>
                </div>

                {/* Büyük Resmi Logo Alanı */}
                <div className="relative flex h-28 sm:h-36 w-full items-center justify-center rounded-2xl bg-white border border-line/60 p-6 shadow-sm">
                  <Image
                    src={current.logo}
                    alt={`${current.name} logosu`}
                    width={280}
                    height={85}
                    priority
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-16 sm:max-h-20 w-auto max-w-[85%] object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Alt Sertifikasyon ve Doğrulama Notu */}
                <div className="mt-6 border-t border-line/60 pt-4 text-left space-y-2">
                  <div className="flex items-start gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="h-4 w-4 text-action shrink-0 mt-0.5" />
                    <span>Fabrika ve şantiyelerine doğrudan koli & palet ambar sevkiyatı</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="h-4 w-4 text-action shrink-0 mt-0.5" />
                    <span>Kurumsal cari hesap ve firmaya özel fabrika iskonto matrisi</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="h-4 w-4 text-action shrink-0 mt-0.5" />
                    <span>%100 Orijinal, CE ve EN standartlarına tam uygunluk garantisi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alt İlerleme Çubuğu & 5 Firma Gösterge Noktaları */}
          <div className="mt-8 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Nokta / Buton Göstergeler */}
            <div className="flex items-center gap-2">
              {CLIENT_REFERENCES.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-brand shadow-xs"
                      : "w-2.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`${c.name} firmasını göster`}
                  title={`${c.name} (${i + 1}/${total})`}
                />
              ))}
            </div>

            {/* Hızlı Gezinme Butonları */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="btn-ghost py-2 px-3 text-xs font-semibold"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Önceki Firma
              </button>
              <button
                type="button"
                onClick={next}
                className="btn-ghost py-2 px-3 text-xs font-semibold"
              >
                Sonraki Firma <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
