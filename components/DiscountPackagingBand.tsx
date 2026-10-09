"use client";

import React from "react";
import { Package, Archive, Layers, ShieldCheck, ArrowRight, ClipboardList, Calculator } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import Reveal from "./Reveal";

/**
 * 4. İSKONTO & AMBALAJ BİLGİ KUTUSU (Civtec Modeli)
 * Ağır sanayi satın alma standartları:
 * - Standart liste fiyatı yerine tonaj/hacim iskonto matrisi
 * - 4 ambalaj tipi güvencesi
 */
export default function DiscountPackagingBand() {
  const PACKAGING_BADGES = [
    {
      title: "Koli & Kutu Bazlı Sevk",
      desc: "İç ambalajı bozulmamış, barkodlu standart fabrika kolileri.",
      icon: Package,
      tone: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Çuval & Endüstriyel Paket",
      desc: "Ağır cıvata, somun ve döküm parçalar için yırtılmaz sanayi çuvalları.",
      icon: Archive,
      tone: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Çemberli Palet Sevkiyatı",
      desc: "Forklift yüklemesine hazır, dağılmayan çemberli streçli paletler.",
      icon: Layers,
      tone: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Orijinal Fabrika Ambalajı",
      desc: "Yetkili üretici garantisi, parti no ve tam teknik uygunluk sertifikası.",
      icon: ShieldCheck,
      tone: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
  ];

  return (
    <section className="container-x py-8 sm:py-12" aria-labelledby="iskonto-matrisi-baslik">
      <Reveal className="overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white via-canvas to-slate-50 p-6 sm:p-8 lg:p-10 shadow-sm ring-1 ring-black/[0.04]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Sol Kolon: Başlık, Vurgulu İskonto Metni & RFQ Butonu */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-brand">
              <Calculator className="h-3.5 w-3.5 text-brand" />
              <span>B2B TOPTAN SATIN ALMA POLİTİKASI</span>
            </div>

            <h2 id="iskonto-matrisi-baslik" className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Kurumsal Fiyatlandırma ve İskonto Matrisi
            </h2>

            {/* Vurgulu Cümle */}
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs sm:text-sm font-medium leading-relaxed text-slate-900">
              <span className="font-bold text-emerald-800 block text-xs uppercase tracking-wider mb-1">
                Tesis İskontosu İlkesi:
              </span>
              &ldquo;Endüstriyel ürünlerimizde standart liste fiyatları yerine; malzeme çeşitliliğine ve tonaj/koli hacmine göre kurumsal iskonto matrisi uygulanır.&rdquo;
            </div>

            <p className="mt-3.5 text-xs sm:text-sm text-ink-soft leading-relaxed">
              Satın alma listenizi portalımız üzerinden ilettiğinizde, sipariş hacminiz analiz edilerek firmanıza özel resmi proforma teklif mektubu 2 saat içinde hazırlanır.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <RfqTriggerButton className="btn-action shadow-md">
                <ClipboardList className="h-4 w-4" />
                <span>Tesisiniz İçin Fiyat Teklifi Alın</span>
                <ArrowRight className="h-4 w-4" />
              </RfqTriggerButton>
            </div>
          </div>

          {/* Sağ Kolon: Yan Yana 4 Ambalaj Rozeti */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {PACKAGING_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="rounded-2xl border border-line bg-white p-4 shadow-2xs transition-all hover:border-slate-300 hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${badge.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-ink">
                        {badge.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-ink-muted">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
