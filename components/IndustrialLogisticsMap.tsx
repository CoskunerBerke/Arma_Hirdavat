"use client";

import React, { useState } from "react";
import { Warehouse, Truck, ShieldCheck, MapPin, Network, Layers, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import RfqTriggerButton from "./RfqTriggerButton";

/**
 * 5. SANAYİ BÖLGELERİ & LOJİSTİK HARİTASI (Civtec Modeli)
 * Koyu / teknik zeminli, şık bir Türkiye endüstriyel network radar şeması.
 * 81 il klişesi yerine organize sanayi havzaları ve ambar ağı.
 */
export default function IndustrialLogisticsMap() {
  const [activeZone, setActiveZone] = useState<number>(0);

  const INDUSTRIAL_ZONES = [
    {
      id: "karadeniz",
      name: "Karadeniz Ağır Sanayi Hattı",
      hubs: "Samsun Merkez Depo, Trabzon, Çorum, Ordu",
      details: "Tekkeköy ana sevkiyat merkezimizden günlük doğrudan tır ve ambar çıkışı.",
      badge: "Ana Lojistik Üssü",
      isHQ: true,
      x: "60%",
      y: "28%",
    },
    {
      id: "marmara",
      name: "Marmara Sanayi Havzası",
      hubs: "Kocaeli, Gebze OSB, Bursa, Sakarya, Tekirdağ",
      details: "Ağır sanayi, otomotiv yan sanayi ve kimya OSB'lerine palet bazlı 24-48 saat ambar teslimatı.",
      badge: "24-48 Saat Teslimat",
      isHQ: false,
      x: "24%",
      y: "32%",
    },
    {
      id: "icanadolu",
      name: "İç Anadolu Sanayi Omurgası",
      hubs: "Ankara OSTİM, İvedik OSB, Sincan, Konya, Kayseri, Eskişehir",
      details: "Savunma sanayii, makine imalatı ve döküm tesislerine çemberli palet ve çuval sevkiyatı.",
      badge: "Günlük Ambar Seferleri",
      isHQ: false,
      x: "45%",
      y: "48%",
    },
    {
      id: "ege-cukurova",
      name: "Ege & Çukurova Üretim Merkezleri",
      hubs: "İzmir Aliağa, Manisa OSB, Adana Hacı Sabancı OSB, Mersin",
      details: "Demir-çelik, liman tesisleri ve petrokimya komplekslerine sertifikalı endüstriyel teslimat.",
      badge: "Düzenli Ağır Yük Hatları",
      isHQ: false,
      x: "30%",
      y: "75%",
    },
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
      desc: "Tüm OSB'lere teslimat. Fabrika kapısına veya şantiye sahasına ambar tırlarıyla güvenli sevk.",
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
      <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />

      <div className="container-x relative z-10">
        {/* Üst Başlık */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <Network className="h-3.5 w-3.5 text-blue-400" />
            <span>ORGANİZE SANAYİ AMBAR AĞI</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
            Türkiye&apos;nin önde gelen organize sanayi bölgelerine ve ağır sanayi havzalarına, anlaşmalı ambar ağımızla doğrudan tesis teslimatı sağlıyoruz.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Perakende kargo gecikmeleri yerine; ağır yük taşıyan anlaşmalı sanayi ambarlarımız ve tır sevkiyatımızla fabrikaların üretim hatlarını kesintisiz besliyoruz.
          </p>
        </Reveal>

        {/* ========================================================================= */}
        {/* TEKNİK TÜRKİYE ENDÜSTRİYEL NETWORK ŞEMASI (RADAR / HARİTA HİSSİ) */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Sol Taraf: İnteraktif Havza Kartları */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Stratejik Sanayi Sevkiyat Odakları:
              </span>
              {INDUSTRIAL_ZONES.map((zone, idx) => {
                const isActive = activeZone === idx;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(idx)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                      isActive
                        ? "border-emerald-500/60 bg-slate-800/90 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30"
                        : "border-white/10 bg-slate-900/50 hover:border-white/20 hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-2.5 w-2.5 rounded-full ${
                            zone.isHQ
                              ? "bg-emerald-400 animate-pulse"
                              : isActive
                              ? "bg-blue-400"
                              : "bg-slate-500"
                          }`}
                        />
                        <h3 className="text-sm font-bold text-white">
                          {zone.name}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          zone.isHQ
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-300 border border-white/10"
                        }`}
                      >
                        {zone.badge}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-200">
                      {zone.hubs}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                      {zone.details}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Sağ Taraf: Görsel Ağ & Lojistik Şeması */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950 to-slate-900/90 p-5 sm:p-7 min-h-[360px] sm:min-h-[420px] overflow-hidden shadow-inner">
              {/* Arka Plan Koordinat Izgarası & Menzil Halkaları */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="h-80 w-80 rounded-full border border-dashed border-emerald-500/30" />
                <div className="absolute h-56 w-56 rounded-full border border-slate-700/60" />
                <div className="absolute h-32 w-32 rounded-full border border-slate-700/40" />
                <div className="absolute inset-x-0 h-px bg-slate-800/60" />
                <div className="absolute inset-y-0 w-px bg-slate-800/60" />
              </div>

              {/* Lojistik Sevkiyat Ağı SVG Şeması */}
              <div className="relative w-full aspect-[16/10] max-w-lg z-10">
                <svg viewBox="0 0 500 300" className="w-full h-full filter drop-shadow-xl select-none">
                  <defs>
                    <linearGradient id="grad-marmara" x1="100%" y1="0%" x2="0%" y2="50%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                    <linearGradient id="grad-ic" x1="80%" y1="0%" x2="20%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                    <linearGradient id="grad-guney" x1="60%" y1="0%" x2="40%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>

                  {/* Kavisli Sevkiyat Koridorları (Samsun HQ -> Havzalar) */}
                  {/* Samsun -> Marmara */}
                  <path
                    d="M 315,90 Q 220,65 130,105"
                    fill="none"
                    stroke={activeZone === 1 ? "#38bdf8" : "#334155"}
                    strokeWidth={activeZone === 1 ? "2.5" : "1.75"}
                    strokeDasharray={activeZone === 1 ? "6 3" : "4 4"}
                    className={activeZone === 1 ? "animate-pulse" : "opacity-60"}
                  />

                  {/* Samsun -> İç Anadolu (OSTİM) */}
                  <path
                    d="M 315,90 Q 275,115 225,150"
                    fill="none"
                    stroke={activeZone === 2 ? "#38bdf8" : "#334155"}
                    strokeWidth={activeZone === 2 ? "2.5" : "1.75"}
                    strokeDasharray={activeZone === 2 ? "6 3" : "4 4"}
                    className={activeZone === 2 ? "animate-pulse" : "opacity-60"}
                  />

                  {/* Samsun -> Çukurova / Ege */}
                  <path
                    d="M 315,90 Q 320,165 285,230"
                    fill="none"
                    stroke={activeZone === 3 ? "#38bdf8" : "#334155"}
                    strokeWidth={activeZone === 3 ? "2.5" : "1.75"}
                    strokeDasharray={activeZone === 3 ? "6 3" : "4 4"}
                    className={activeZone === 3 ? "animate-pulse" : "opacity-60"}
                  />

                  {/* Samsun -> Trabzon Sahil Hattı */}
                  <path
                    d="M 315,90 Q 370,85 425,95"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.75"
                    strokeDasharray="4 4"
                    className="opacity-70"
                  />

                  {/* SAMSUN MERKEZ DEPO (HQ BEACON) */}
                  <g className="cursor-pointer" onClick={() => setActiveZone(0)}>
                    <circle cx="315" cy="90" r="14" fill="#10b981" opacity="0.2" className="animate-ping" />
                    <circle cx="315" cy="90" r="8" fill="#10b981" className="shadow-lg" />
                    <circle cx="315" cy="90" r="3.5" fill="#ffffff" />
                    <rect x="235" y="52" width="160" height="24" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" opacity="0.95" />
                    <text x="315" y="68" textAnchor="middle" fill="#a7f3d0" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                      Samsun Merkez Depo (HQ)
                    </text>
                  </g>

                  {/* MARMARA (Kocaeli, Gebze, Bursa) */}
                  <g className="cursor-pointer" onClick={() => setActiveZone(1)}>
                    <circle
                      cx="130"
                      cy="105"
                      r={activeZone === 1 ? "9" : "6"}
                      fill={activeZone === 1 ? "#38bdf8" : "#64748b"}
                      className="transition-all duration-300"
                    />
                    <circle cx="130" cy="105" r="2.5" fill="#ffffff" />
                    <text
                      x="130"
                      y="130"
                      textAnchor="middle"
                      fill={activeZone === 1 ? "#38bdf8" : "#94a3b8"}
                      fontSize={activeZone === 1 ? "10.5" : "9.5"}
                      fontWeight="600"
                      fontFamily="sans-serif"
                    >
                      Marmara OSB Havzası
                    </text>
                  </g>

                  {/* İÇ ANADOLU (OSTİM, İvedik, Konya) */}
                  <g className="cursor-pointer" onClick={() => setActiveZone(2)}>
                    <circle
                      cx="225"
                      cy="150"
                      r={activeZone === 2 ? "9" : "6"}
                      fill={activeZone === 2 ? "#38bdf8" : "#64748b"}
                      className="transition-all duration-300"
                    />
                    <circle cx="225" cy="150" r="2.5" fill="#ffffff" />
                    <text
                      x="225"
                      y="174"
                      textAnchor="middle"
                      fill={activeZone === 2 ? "#38bdf8" : "#94a3b8"}
                      fontSize={activeZone === 2 ? "10.5" : "9.5"}
                      fontWeight="600"
                      fontFamily="sans-serif"
                    >
                      Ankara OSTİM & Konya
                    </text>
                  </g>

                  {/* ÇUKUROVA & EGE (İzmir, Adana, Mersin) */}
                  <g className="cursor-pointer" onClick={() => setActiveZone(3)}>
                    <circle
                      cx="285"
                      cy="230"
                      r={activeZone === 3 ? "9" : "6"}
                      fill={activeZone === 3 ? "#38bdf8" : "#64748b"}
                      className="transition-all duration-300"
                    />
                    <circle cx="285" cy="230" r="2.5" fill="#ffffff" />
                    <text
                      x="285"
                      y="254"
                      textAnchor="middle"
                      fill={activeZone === 3 ? "#38bdf8" : "#94a3b8"}
                      fontSize={activeZone === 3 ? "10.5" : "9.5"}
                      fontWeight="600"
                      fontFamily="sans-serif"
                    >
                      Çukurova & Ege Sanayi
                    </text>
                  </g>

                  {/* DOĞU KARADENİZ (Trabzon) */}
                  <g className="cursor-pointer" onClick={() => setActiveZone(0)}>
                    <circle cx="425" cy="95" r="5" fill="#10b981" opacity="0.8" />
                    <circle cx="425" cy="95" r="2" fill="#ffffff" />
                    <text x="425" y="118" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="500" fontFamily="sans-serif">
                      Trabzon & Doğu Karadeniz
                    </text>
                  </g>
                </svg>
              </div>

              {/* Alt Bilgi Rozeti */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2 text-xs text-slate-300 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ağır Sanayi Standardı: <strong>Tüm OSB&apos;lere Doğrudan Ambar & Tır Sevkiyatı</strong></span>
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
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm transition-colors hover:border-emerald-500/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
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
