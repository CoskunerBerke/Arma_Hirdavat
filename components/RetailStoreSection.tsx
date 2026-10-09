"use client";

import React from "react";
import { Store, MapPin, Phone, ExternalLink, ShieldAlert, Clock, Navigation } from "lucide-react";
import { COMPANY } from "@/data/company";
import Reveal from "./Reveal";

/**
 * 6. PERAKENDE / FİZİKİ MAĞAZA AYRIMI (CİVTEC MODELİ)
 * B2B sitemizi boğmamak için ayrı tuttuğumuz mağaza köşesi.
 * Tekkeköy fiziki mağazasını net bir sınırla tanıtır.
 */
export default function RetailStoreSection() {
  return (
    <section id="fiziki-magaza" className="container-x py-10 sm:py-16 scroll-mt-24" aria-labelledby="fiziki-magaza-baslik">
      <Reveal className="overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Sol Kolon: Başlık ve Açıklama */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Store className="h-3.5 w-3.5 text-amber-400" />
              <span>PERAKENDE & ATÖLYE HİZMET NOKTAMIZ</span>
            </div>

            <h2 id="fiziki-magaza-baslik" className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Arma Hırdavat – Samsun Tekkeköy Merkez Mağaza
            </h2>

            {/* Civtec Modeli Açıklama */}
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
              Tekil parça, atölye ve bireysel teknik hırdavat ihtiyaçlarınız için Tekkeköy&apos;deki fiziki mağazamızda hizmetinizdeyiz. Web portalımız fabrikaların ve sanayi tesislerinin yüksek hacimli koli ve palet sevkiyatlarına tahsis edilmiştir.
            </p>

            {/* Önemli Ayrım Notu */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Portalımız üzerinden yalnızca <strong>koli ve palet bazlı kurumsal toptan alımlar</strong> kabul edilmektedir. Tekli perakende alımlarınız için mağazamızı ziyaret edebilirsiniz.
                </span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Adres, Telefon & Yol Tarifi Butonu */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-amber-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Mağaza Adresi:</span>
                <span className="text-xs sm:text-sm font-medium text-white leading-snug">
                  Şabanoğlu Mah. 512. Sok. No: 3 Tekkeköy / SAMSUN
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Doğrudan Mağaza Tel:</span>
                <a href={COMPANY.phones[0].href} className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                  +90 (362) 266 60 95
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-xs text-slate-300">
                <span className="text-[11px] font-semibold text-slate-400 block">Çalışma Saatleri:</span>
                Hafta İçi & Cumartesi 08:00 - 18:30
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
              >
                <Navigation className="h-4 w-4" />
                <span>Google Haritalar&apos;da Yol Tarifi Al</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
