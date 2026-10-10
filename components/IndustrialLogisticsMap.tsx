"use client";

import React, { useState, useEffect } from "react";
import { Warehouse, Truck, ShieldCheck, MapPin, Network, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import RfqTriggerButton from "./RfqTriggerButton";
import { TURKEY_PROVINCES, Province } from "./turkeyMapData";

/**
 * 5. SANAYİ BÖLGELERİ & LOJİSTİK HARİTASI
 * Kocaman, sade ve şık gri / monokrom Türkiye haritası.
 * 81 ilin tamamı sırasıyla tek tek yanıp sönerek Türkiye'nin
 * tüm illerine kesintisiz ambar ve tesis teslimatını simgeler.
 */
export default function IndustrialLogisticsMap() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);

  // 81 ilin sırasıyla tek tek yanıp sönmesi döngüsü (~130ms hızında pürüzsüz tarama)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TURKEY_PROVINCES.length);
    }, 140);
    return () => clearInterval(timer);
  }, []);

  const activeProvince = TURKEY_PROVINCES[activeIndex];
  const displayProvince = hoveredProvince || activeProvince;

  // Önceki 3 ili hafif iz bırakarak radar akışı oluşturma
  const prevIndices = [
    (activeIndex - 1 + TURKEY_PROVINCES.length) % TURKEY_PROVINCES.length,
    (activeIndex - 2 + TURKEY_PROVINCES.length) % TURKEY_PROVINCES.length,
    (activeIndex - 3 + TURKEY_PROVINCES.length) % TURKEY_PROVINCES.length,
  ];

  const ASSURANCES = [
    {
      icon: Warehouse,
      title: "Tekkeköy Merkez Depo",
      desc: "Doğrudan stoktan çıkış. 10.000+ kalem endüstriyel malzeme raf hazır bekletilir.",
    },
    {
      icon: Truck,
      title: "Anlaşmalı Sanayi Ambarları",
      desc: "81 ilin tamamına teslimat. Fabrika kapısına veya şantiye sahasına ambar tırlarıyla güvenli sevk.",
    },
    {
      icon: ShieldCheck,
      title: "Tesis Tipi Güvenli Ambalaj",
      desc: "Dağılmayan çemberli palet. Forkliftle indirmeye uygun, firesiz ve hasarsız teslim güvencesi.",
    },
  ];

  return (
    <section id="lojistik" className="bg-slate-950 py-16 sm:py-24 text-white relative overflow-hidden scroll-mt-20">
      {/* Teknik Izgara ve Arka Plan Radar Efekti */}
      <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-slate-700/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-slate-600/10 blur-3xl" />

      <div className="container-x relative z-10">
        {/* Üst Başlık */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3.5 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md">
            <Network className="h-3.5 w-3.5 text-slate-400" />
            <span>TÜRKİYE GENELİ LOJİSTİK AĞI</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
            Türkiye&apos;nin 81 ilindeki tüm organize sanayi bölgelerine, anlaşmalı ambar ağımızla doğrudan tesis teslimatı sağlıyoruz.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Perakende kargo gecikmeleri yerine; ağır yük taşıyan anlaşmalı sanayi ambarlarımız ve tır filomuzla Türkiye genelindeki fabrikaların üretim hatlarını kesintisiz besliyoruz.
          </p>
        </Reveal>

        {/* ========================================================================= */}
        {/* KOCAMAN VE SADE GRİ TÜRKİYE HARİTASI (81 İL TEK TEK SIRAYLA YANIP SÖNER) */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 w-full rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 p-4 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          
          {/* Üst Bilgi Barı: Lojistik Telsiz & Aktif Sevkiyat Durumu */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
                  81 İle Doğrudan Tesis Sevkiyatı
                </span>
                <span className="hidden sm:inline-block mx-2 text-slate-600">|</span>
                <span className="text-xs text-slate-400 font-medium">
                  Samsun Tekkeköy Merkez Çıkışlı Düzenli Ambar Seferleri
                </span>
              </div>
            </div>

            {/* Aktif Rota Rozeti */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 border border-white/10 px-3.5 py-1.5 text-xs">
              <span className="text-slate-400 font-mono">Aktif Sevk Noktası:</span>
              <span className="font-bold text-white font-mono bg-slate-700/80 px-2 py-0.5 rounded border border-white/10">
                {displayProvince.plate < 10 ? `0${displayProvince.plate}` : displayProvince.plate} - {displayProvince.name}
              </span>
              <span className="text-[11px] text-slate-400">({displayProvince.region})</span>
            </div>
          </div>

          {/* HARİTA SVG KAPSAYICISI (KOCAMAN VE MERKEZDE) */}
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7.5] min-h-[380px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* Arka Plan Hassas Koordinat Izgarası */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="h-[480px] w-[480px] rounded-full border border-dashed border-slate-500/20" />
              <div className="absolute inset-x-0 h-px bg-slate-700/40" />
              <div className="absolute inset-y-0 w-px bg-slate-700/40" />
            </div>

            <svg
              viewBox="0 0 680 320"
              className="w-full h-full filter drop-shadow-2xl select-none"
            >
              <defs>
                <filter id="glow-city" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* ============================================================== */}
              {/* SADE VE TEKNİK GRİ TÜRKİYE SİLÜETİ (TRAKYA + ANADOLU) */}
              {/* ============================================================== */}
              {/* Trakya */}
              <path
                d="M 72,96 C 62,84 66,60 84,52 C 104,48 120,54 136,65 C 146,74 150,80 142,88 C 128,94 104,95 88,104 C 80,108 74,104 72,96 Z"
                fill="#1e2536"
                stroke="#334155"
                strokeWidth="1.5"
                className="transition-colors duration-500"
              />

              {/* Anadolu Ana Karası */}
              <path
                d="M 148,82 C 170,78 198,82 232,75 C 275,65 330,50 354,54 C 368,68 388,74 418,82 C 458,84 498,80 542,76 C 568,82 588,102 612,126 C 626,146 618,176 608,216 C 614,236 608,246 580,244 C 540,240 480,244 430,246 C 380,244 350,250 338,278 C 330,284 324,270 330,248 C 318,248 290,260 265,268 C 240,272 210,254 185,264 C 150,268 120,250 105,242 C 80,235 65,220 70,195 C 60,185 52,175 65,155 C 55,138 65,122 80,118 C 96,116 116,118 136,112 C 152,110 166,112 186,102 C 206,95 210,88 190,88 C 170,88 155,85 148,82 Z"
                fill="#1e2536"
                stroke="#334155"
                strokeWidth="1.5"
                className="transition-colors duration-500"
              />

              {/* İç Göller (Koyu Gri) */}
              <ellipse cx="580" cy="182" rx="14" ry="10" fill="#0b0f19" stroke="#334155" strokeWidth="1" />
              <ellipse cx="282" cy="162" rx="12" ry="16" fill="#0b0f19" stroke="#334155" strokeWidth="1" />

              {/* ============================================================== */}
              {/* SAMSUN HQ'DAN AKTİF YANIP SÖNEN ŞEHRE LAZER / RADAR SEVKİYAT HATTI */}
              {/* ============================================================== */}
              {activeProvince.plate !== 55 && (
                <path
                  key={`route-${activeProvince.plate}`}
                  d={`M 370,76 Q ${(370 + activeProvince.x) / 2},${Math.min(76, activeProvince.y) - 22} ${activeProvince.x},${activeProvince.y}`}
                  fill="none"
                  stroke="url(#beam-gradient)"
                  strokeWidth="1.75"
                  strokeDasharray="4 3"
                  className="transition-all duration-300"
                />
              )}

              {/* ============================================================== */}
              {/* 81 İLİN TAMAMI (GRİ TABAN + SIRAYLA YANIP SÖNEN PARLAK NOKTA) */}
              {/* ============================================================== */}
              {TURKEY_PROVINCES.map((prov) => {
                const isActive = prov.plate === activeProvince.plate;
                const isHovered = hoveredProvince?.plate === prov.plate;
                const isHQ = prov.isHQ;
                const isTrail = prevIndices.some((idx) => TURKEY_PROVINCES[idx]?.plate === prov.plate);

                return (
                  <g
                    key={prov.plate}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredProvince(prov)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  >
                    {/* Aktif İlin Yanıp Sönme (Beacon Ping) Efekti */}
                    {(isActive || isHovered) && (
                      <circle
                        cx={prov.x}
                        cy={prov.y}
                        r={isHQ ? 16 : 13}
                        fill="#ffffff"
                        opacity="0.35"
                        className="animate-ping"
                      />
                    )}

                    {/* Dış Işıma Aurası */}
                    {(isActive || isHovered) && (
                      <circle
                        cx={prov.x}
                        cy={prov.y}
                        r={isHQ ? 9 : 7}
                        fill="#ffffff"
                        opacity="0.25"
                      />
                    )}

                    {/* Şehir Noktası */}
                    <circle
                      cx={prov.x}
                      cy={prov.y}
                      r={isHQ ? 5 : isActive || isHovered ? 4.5 : isTrail ? 3.5 : 2.5}
                      fill={
                        isHQ
                          ? "#34d399"
                          : isActive || isHovered
                          ? "#ffffff"
                          : isTrail
                          ? "#cbd5e1"
                          : "#475569"
                      }
                      stroke={
                        isHQ
                          ? "#ffffff"
                          : isActive || isHovered
                          ? "#f8fafc"
                          : "#1e293b"
                      }
                      strokeWidth={isActive || isHovered || isHQ ? 1.5 : 0.75}
                      className="transition-all duration-200"
                    />

                    {/* SAMSUN HQ ETİKETİ (SABİT) */}
                    {isHQ && (
                      <g>
                        <rect
                          x={prov.x - 70}
                          y={prov.y - 30}
                          width="140"
                          height="20"
                          rx="5"
                          fill="#0f172a"
                          stroke="#34d399"
                          strokeWidth="1.2"
                          opacity="0.95"
                        />
                        <text
                          x={prov.x}
                          y={prov.y - 16}
                          textAnchor="middle"
                          fill="#34d399"
                          fontSize="9.5"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          Samsun Merkez Depo (HQ)
                        </text>
                      </g>
                    )}

                    {/* AKTİF VEYA ÜZERİNE GELİNEN İLİN ETİKETİ */}
                    {(isActive || isHovered) && !isHQ && (
                      <g filter="url(#glow-city)">
                        <rect
                          x={prov.x - 42}
                          y={prov.y - 24}
                          width="84"
                          height="18"
                          rx="4"
                          fill="#0f172a"
                          stroke="#ffffff"
                          strokeWidth="1"
                          opacity="0.95"
                        />
                        <text
                          x={prov.x}
                          y={prov.y - 12}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {prov.plate < 10 ? `0${prov.plate}` : prov.plate} {prov.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Alt Özet / İlerleme Çubuğu */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              <span>Samsun Merkez Depomuzdan 81 İlin Tüm Sanayi Ambarlarına Günlük Sevkiyat</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-300">
                Taranan İl: <strong className="text-white">{activeIndex + 1}</strong> / 81
              </span>
              <div className="w-28 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-slate-300 transition-all duration-150"
                  style={{ width: `${((activeIndex + 1) / 81) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 GÜVENCE MADDESİ */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-3">
          {ASSURANCES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm transition-colors hover:border-slate-500"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-sm sm:text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Alt Aksiyon Butonu */}
        <div className="mt-8 flex justify-center">
          <RfqTriggerButton className="btn-action py-3 px-8 text-sm font-bold shadow-xl shadow-action/30">
            <span>Tesisiniz İçin Fiyat Teklifi Alın</span>
            <ArrowRight className="h-4 w-4" />
          </RfqTriggerButton>
        </div>
      </div>
    </section>
  );
}
