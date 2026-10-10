"use client";

import React from "react";
import { Warehouse, Truck, ShieldCheck, Network, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import RfqTriggerButton from "./RfqTriggerButton";

/**
 * 5. SANAYİ BÖLGELERİ & LOJİSTİK HARİTASI
 * 3D Türkiye haritası ve ambar/koli lojistik dağıtım animasyonu videosu.
 * Karartma, yan maskeler veya kapamalar olmadan direkt dümdüz ve kesintisiz loop oynar.
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
      {/* Teknik Izgara ve Arka Plan Efekti */}
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
        {/* DÜMDÜZ AÇIK KESİNTİSİZ LOOP TÜRKİYE LOJİSTİK DAĞITIM VİDEOSU */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-black overflow-hidden shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/videos/corporate-logistics-poster.jpg"
            className="w-full h-auto aspect-video block object-cover select-none"
          >
            <source src="/videos/corporate-logistics-loop.mp4" type="video/mp4" />
          </video>
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
