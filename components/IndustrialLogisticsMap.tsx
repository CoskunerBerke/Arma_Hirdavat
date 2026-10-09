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

  // Otomatik şehir & havza seçimi döngüsü (kullanıcı tıklamış gibi yavaş yavaş sırayla renklenir)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveZone((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const INDUSTRIAL_ZONES = [
    {
      id: "karadeniz",
      name: "Karadeniz Ağır Sanayi Hattı",
      hubs: "Samsun Merkez Depo, Trabzon, Çorum, Ordu",
      details: "Tekkeköy ana sevkiyat merkezimizden günlük doğrudan tır ve ambar çıkışı.",
      badge: "Ana Lojistik Üssü",
      isHQ: true,
      color: "#10b981",
    },
    {
      id: "marmara",
      name: "Marmara Sanayi Havzası",
      hubs: "Kocaeli, Gebze OSB, Bursa, Sakarya, Tekirdağ",
      details: "Ağır sanayi, otomotiv yan sanayi ve kimya OSB'lerine palet bazlı 24-48 saat ambar teslimatı.",
      badge: "24-48 Saat Teslimat",
      isHQ: false,
      color: "#38bdf8",
    },
    {
      id: "icanadolu",
      name: "İç Anadolu Sanayi Omurgası",
      hubs: "Ankara OSTİM, İvedik OSB, Sincan, Konya, Kayseri, Eskişehir",
      details: "Savunma sanayii, makine imalatı ve döküm tesislerine çemberli palet ve çuval sevkiyatı.",
      badge: "Günlük Ambar Seferleri",
      isHQ: false,
      color: "#60a5fa",
    },
    {
      id: "ege-cukurova",
      name: "Ege & Çukurova Üretim Merkezleri",
      hubs: "İzmir Aliağa, Manisa OSB, Adana Hacı Sabancı OSB, Mersin",
      details: "Demir-çelik, liman tesisleri ve petrokimya komplekslerine sertifikalı endüstriyel teslimat.",
      badge: "Düzenli Ağır Yük Hatları",
      isHQ: false,
      color: "#2dd4bf",
    },
  ];

  // Harita üzerindeki stratejik sanayi şehirleri
  const CITIES = [
    // Karadeniz (Zone 0)
    { id: "samsun", name: "Samsun (HQ)", x: 370, y: 76, zone: 0, isHQ: true },
    { id: "trabzon", name: "Trabzon", x: 475, y: 82, zone: 0 },
    { id: "corum", name: "Çorum", x: 335, y: 106, zone: 0 },
    { id: "ordu", name: "Ordu", x: 420, y: 86, zone: 0 },

    // Marmara (Zone 1)
    { id: "kocaeli", name: "Kocaeli & Gebze", x: 175, y: 92, zone: 1 },
    { id: "istanbul", name: "İstanbul", x: 145, y: 80, zone: 1 },
    { id: "bursa", name: "Bursa", x: 145, y: 114, zone: 1 },
    { id: "sakarya", name: "Sakarya", x: 198, y: 94, zone: 1 },
    { id: "tekirdag", name: "Tekirdağ", x: 100, y: 80, zone: 1 },

    // İç Anadolu (Zone 2)
    { id: "ankara", name: "Ankara OSTİM", x: 265, y: 124, zone: 2 },
    { id: "konya", name: "Konya", x: 255, y: 198, zone: 2 },
    { id: "kayseri", name: "Kayseri", x: 345, y: 168, zone: 2 },
    { id: "eskisehir", name: "Eskişehir", x: 190, y: 130, zone: 2 },

    // Ege & Çukurova (Zone 3)
    { id: "izmir", name: "İzmir Aliağa", x: 85, y: 180, zone: 3 },
    { id: "manisa", name: "Manisa", x: 98, y: 168, zone: 3 },
    { id: "adana", name: "Adana OSB", x: 340, y: 232, zone: 3 },
    { id: "mersin", name: "Mersin", x: 312, y: 240, zone: 3 },
    { id: "gaziantep", name: "Gaziantep", x: 405, y: 230, zone: 3 },
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
        {/* TEKNİK TÜRKİYE ENDÜSTRİYEL HARİTASI (GRİ TÜRKİYE HARİTASI & SIRAYLA RENKLENEN ŞEHİRLER) */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Sol Taraf: İnteraktif Havza Kartları */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Stratejik Sanayi Sevkiyat Odakları:
              </span>
              {INDUSTRIAL_ZONES.map((zone, idx) => {
                const isActive = activeZone === idx;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(idx)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-500 ${
                      isActive
                        ? "border-emerald-500/70 bg-slate-800 shadow-xl shadow-emerald-950/50 ring-1 ring-emerald-500/40 translate-x-1"
                        : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
                            zone.isHQ
                              ? "bg-emerald-400 animate-pulse"
                              : isActive
                              ? "bg-sky-400"
                              : "bg-slate-600"
                          }`}
                        />
                        <h3 className="text-sm font-bold text-white">
                          {zone.name}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-500 ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-slate-800 text-slate-400 border border-white/10"
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

            {/* Sağ Taraf: GRİ TÜRKİYE HARİTASI & SIRAYLA RENKLENEN ŞEHİRLER */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 min-h-[380px] sm:min-h-[440px] overflow-hidden shadow-inner">
              {/* Arka Plan Koordinat Grid Çizgileri */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="h-[340px] w-[340px] rounded-full border border-dashed border-emerald-500/20" />
                <div className="absolute inset-x-0 h-px bg-slate-800/70" />
                <div className="absolute inset-y-0 w-px bg-slate-800/70" />
              </div>

              {/* TÜRKİYE HARİTASI SVG */}
              <div className="relative w-full aspect-[16/10] max-w-2xl z-10">
                <svg viewBox="0 0 680 320" className="w-full h-full filter drop-shadow-2xl select-none">
                  <defs>
                    <filter id="glow-hq" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="corridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>

                  {/* ============================================================== */}
                  {/* GRİ TÜRKİYE SİLÜETİ VE KARA PARÇASI (Trakya + Anadolu) */}
                  {/* ============================================================== */}
                  {/* Trakya */}
                  <path
                    d="M 72,96 C 62,84 66,60 84,52 C 104,48 120,54 136,65 C 146,74 150,80 142,88 C 128,94 104,95 88,104 C 80,108 74,104 72,96 Z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1.75"
                    className="transition-colors duration-700"
                  />

                  {/* Anadolu Ana Karası */}
                  <path
                    d="M 148,82 C 170,78 198,82 232,75 C 275,65 330,50 354,54 C 368,68 388,74 418,82 C 458,84 498,80 542,76 C 568,82 588,102 612,126 C 626,146 618,176 608,216 C 614,236 608,246 580,244 C 540,240 480,244 430,246 C 380,244 350,250 338,278 C 330,284 324,270 330,248 C 318,248 290,260 265,268 C 240,272 210,254 185,264 C 150,268 120,250 105,242 C 80,235 65,220 70,195 C 60,185 52,175 65,155 C 55,138 65,122 80,118 C 96,116 116,118 136,112 C 152,110 166,112 186,102 C 206,95 210,88 190,88 C 170,88 155,85 148,82 Z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1.75"
                    className="transition-colors duration-700"
                  />

                  {/* İç Göller & Boğazlar (Hafif Sanayi Detayı) */}
                  {/* Van Gölü */}
                  <ellipse cx="580" cy="182" rx="14" ry="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  {/* Tuz Gölü */}
                  <ellipse cx="282" cy="162" rx="12" ry="16" fill="#0f172a" stroke="#334155" strokeWidth="1" />

                  {/* ============================================================== */}
                  {/* SAMSUN HQ'DAN AKTİF HAVZAYA SEVKİYAT AKIŞI KORİDORLARI */}
                  {/* ============================================================== */}
                  {CITIES.filter((c) => !c.isHQ && c.zone === activeZone).map((city) => (
                    <path
                      key={`corridor-${city.id}`}
                      d={`M 370,76 Q ${(370 + city.x) / 2},${(76 + city.y) / 2 - 25} ${city.x},${city.y}`}
                      fill="none"
                      stroke="url(#corridor-gradient)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="animate-pulse transition-all duration-700"
                    />
                  ))}

                  {/* ============================================================== */}
                  {/* TÜM ŞEHİRLER & OSB NOKTALARI (GRİDEN RENKLİYE GEÇİŞ) */}
                  {/* ============================================================== */}
                  {CITIES.map((city) => {
                    const isZoneActive = city.zone === activeZone;
                    const isHQ = city.isHQ;

                    // Şehir aktif renkleri
                    let activeFill = "#38bdf8"; // Marmara
                    if (city.zone === 0) activeFill = "#10b981"; // Karadeniz
                    if (city.zone === 2) activeFill = "#60a5fa"; // İç Anadolu
                    if (city.zone === 3) activeFill = "#2dd4bf"; // Ege & Çukurova

                    return (
                      <g
                        key={city.id}
                        className="cursor-pointer transition-all duration-500"
                        onClick={() => setActiveZone(city.zone)}
                      >
                        {/* Aktif olduğunda yayılan beacon halkası */}
                        {isZoneActive && (
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={isHQ ? 16 : 11}
                            fill={activeFill}
                            opacity="0.25"
                            className="animate-ping"
                          />
                        )}

                        {/* Şehir Noktası (Gri -> Kullanıcı tıklamış gibi Renkli) */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isHQ ? 8 : isZoneActive ? 6.5 : 4}
                          fill={isZoneActive ? activeFill : "#475569"}
                          stroke={isZoneActive ? "#ffffff" : "#334155"}
                          strokeWidth={isZoneActive ? 1.75 : 1}
                          className="transition-all duration-700"
                        />

                        {/* Merkez Beyaz Çekirdek */}
                        {isZoneActive && (
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={isHQ ? 3.5 : 2}
                            fill="#ffffff"
                          />
                        )}

                        {/* Samsun HQ Başlık Rozeti */}
                        {isHQ ? (
                          <g>
                            <rect
                              x={city.x - 72}
                              y={city.y - 32}
                              width="144"
                              height="22"
                              rx="6"
                              fill="#064e3b"
                              stroke="#10b981"
                              strokeWidth="1.2"
                              opacity="0.95"
                            />
                            <text
                              x={city.x}
                              y={city.y - 18}
                              textAnchor="middle"
                              fill="#a7f3d0"
                              fontSize="10"
                              fontWeight="bold"
                              fontFamily="sans-serif"
                            >
                              Samsun Merkez Depo (HQ)
                            </text>
                          </g>
                        ) : (
                          /* Normal Şehir Yazısı (Seçilince parlar, seçili değilken gri) */
                          <text
                            x={city.x}
                            y={city.y + 14}
                            textAnchor="middle"
                            fill={isZoneActive ? "#f8fafc" : "#64748b"}
                            fontSize={isZoneActive ? "9.5" : "8"}
                            fontWeight={isZoneActive ? "bold" : "500"}
                            fontFamily="sans-serif"
                            className="transition-colors duration-500"
                          >
                            {city.name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Alt Durum Rozeti (Otomatik Tarama & Seçili Bölge Bildirimi) */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-lg rounded-xl border border-white/10 bg-slate-900/95 px-4 py-2 text-xs text-slate-300 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    Aktif Sevkiyat Hattı: <strong className="text-white">{INDUSTRIAL_ZONES[activeZone].name}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-white/10">
                  Otomatik Canlı Simülasyon
                </span>
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
