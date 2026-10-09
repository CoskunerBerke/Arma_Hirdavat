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

            {/* Sağ Taraf: Görsel Radar & Ağ Şeması */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950 p-6 min-h-[340px] sm:min-h-[400px] overflow-hidden">
              {/* Radar Konsantrik Daireleri */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="h-64 w-64 rounded-full border border-blue-400 animate-ping duration-1000" />
                <div className="absolute h-96 w-96 rounded-full border border-slate-700" />
                <div className="absolute h-48 w-48 rounded-full border border-slate-700" />
              </div>

              {/* Türkiye Ağ Şeması SVG Harita Hatları */}
              <div className="relative w-full aspect-[16/10] max-w-lg">
                <svg viewBox="0 0 500 300" className="w-full h-full filter drop-shadow">
                  {/* Bağlantı Yolları (Samsun Merkez Depo -> Havzalar) */}
                  {/* Samsun -> Marmara (Gebze/Kocaeli) */}
                  <line x1="310" y1="90" x2="130" y2="105" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                  {/* Samsun -> İç Anadolu (OSTİM/Ankara) */}
                  <line x1="310" y1="90" x2="225" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Samsun -> Çukurova (Adana/Mersin) */}
                  <line x1="310" y1="90" x2="290" y2="230" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Samsun -> Trabzon */}
                  <line x1="310" y1="90" x2="420" y2="95" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

                  {/* SAMSUN MERKEZ DEPO (HQ BEACON) */}
                  <g>
                    <circle cx="310" cy="90" r="16" fill="#10b981" opacity="0.25" className="animate-ping" />
                    <circle cx="310" cy="90" r="9" fill="#10b981" />
                    <circle cx="310" cy="90" r="4" fill="#ffffff" />
                    <text x="310" y="70" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                      Samsun Merkez Depo (HQ)
                    </text>
                  </g>

                  {/* MARMARA (Kocaeli, Gebze, Bursa) */}
                  <g>
                    <circle cx="130" cy="105" r="7" fill={activeZone === 1 ? "#38bdf8" : "#64748b"} />
                    <circle cx="130" cy="105" r="3" fill="#ffffff" />
                    <text x="130" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                      Marmara OSB Havzası
                    </text>
                  </g>

                  {/* İÇ ANADOLU (OSTİM, İvedik, Konya) */}
                  <g>
                    <circle cx="225" cy="150" r="7" fill={activeZone === 2 ? "#38bdf8" : "#64748b"} />
                    <circle cx="225" cy="150" r="3" fill="#ffffff" />
                    <text x="225" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                      Ankara OSTİM & Konya
                    </text>
                  </g>

                  {/* ÇUKUROVA & EGE (İzmir, Adana, Mersin) */}
                  <g>
                    <circle cx="290" cy="230" r="7" fill={activeZone === 3 ? "#38bdf8" : "#64748b"} />
                    <circle cx="290" cy="230" r="3" fill="#ffffff" />
                    <text x="290" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                      Çukurova & Ege Sanayi
                    </text>
                  </g>
                </svg>
              </div>

              {/* Alt Bilgi Rozeti */}
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2 text-xs text-slate-300">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
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
            <span>Tesisiniz İçin Sevkiyat & Teklif İsteyin (RFQ)</span>
            <ArrowRight className="h-4 w-4" />
          </RfqTriggerButton>
        </div>
      </div>
    </section>
  );
}
