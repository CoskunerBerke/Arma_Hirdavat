"use client";

import React from "react";
import { Warehouse, Truck, ShieldCheck, Network, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import RfqTriggerButton from "./RfqTriggerButton";

/**
 * 5. SANAYİ BÖLGELERİ & LOJİSTİK HARİTASI
 * 3D animasyonlu, gri monokrom Türkiye haritası ve lojistik sevkiyat ağı videosu.
 * Kusursuz kesintisiz döngü (seamless loop) ve yumuşak kenar erimesiyle entegre edilmiştir.
 */
export default function IndustrialLogisticsMap() {
  const ASSURANCES = [
    {
      icon: Warehouse,
      title: "Tekkeköy Merkez Depo",
      desc: "Doğrudan stoktan çıkış. 10.000+ kalem endüstriyel malzeme raf hazır bekletilir.",
    },
    {
      icon: Truck,
      title: "Anlaşmalı Sanayi Ambarları",
      desc: "Türkiye'nin 81 iline teslimat. Fabrika kapısına veya şantiye sahasına ambar tırlarıyla güvenli sevk.",
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
            <span>TÜRKİYE GENELİ LOJİSTİK VE AMBAR DAĞITIM AĞI</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
            Türkiye&apos;nin 81 ilindeki tüm organize sanayi bölgelerine, anlaşmalı ambar ağımızla doğrudan tesis teslimatı sağlıyoruz.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Perakende kargo gecikmeleri yerine; ağır yük taşıyan anlaşmalı sanayi ambarlarımız ve tır filomuzla Türkiye genelindeki fabrikaların üretim hatlarını kesintisiz besliyoruz.
          </p>
        </Reveal>

        {/* ========================================================================= */}
        {/* KESİNTİSİZ LOOP 3D GRİ TÜRKİYE HARİTASI VİDEOSU */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 w-full rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black p-3 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          
          {/* Video Vitrin Kapsayıcısı */}
          <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-inner">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/videos/turkey-map-poster.jpg"
              className="w-full h-full object-cover sm:object-contain pointer-events-none select-none"
            >
              <source src="/videos/turkey-map-loop.mp4" type="video/mp4" />
            </video>

            {/* Sırıtmayı Önleyen Yumuşak Degrade ve Vignette Maskeleri */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,6,23,0.85)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-slate-950/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-slate-950/80 to-transparent" />

            {/* Video Üzeri Canlı Lojistik HUD Rozeti */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/75 px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="font-semibold text-white">Canlı Dağıtım Simülasyonu</span>
              <span className="hidden sm:inline-block text-slate-500">|</span>
              <span className="hidden sm:inline-block text-slate-300 font-mono text-[11px]">81 İl Organize Sanayi Ağı</span>
            </div>

            {/* Sağ Üst Sevkiyat Üssü Rozeti */}
            <div className="hidden sm:flex absolute top-5 right-5 items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-1.5 text-[11px] text-slate-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span>Merkez Üs: <strong>Samsun Tekkeköy (HQ)</strong></span>
            </div>
          </div>

          {/* Alt Özet ve Bilgi Çubuğu */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              <span>Samsun Tekkeköy Merkez Depomuzdan 81 İlin Tüm Sanayi Ambarlarına Günlük Doğrudan Çıkış</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-slate-300">
              <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-white/10 text-slate-300 text-[11px]">
                Tüm OSB Havzalarına 24-48 Saat Teslimat
              </span>
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
