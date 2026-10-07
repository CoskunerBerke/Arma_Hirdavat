import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Wrench, Layers, PhoneCall, Award } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-industrial-900 to-slate-900 text-white overflow-hidden py-16 sm:py-24">
      {/* Arka Plan Dekoratif Deseni */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-arma-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Üst Rozet */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <Award className="w-4 h-4 text-arma-orange" />
            <span>Samsun & Karadeniz Bölgesinin Lider Sanayi Tedarikçisi</span>
          </div>

          {/* Tek H1 Başlığı (Google SEO standardı) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            Endüstriyel Teknik Hırdavat ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">Fabrika Malzemeleri</span>
          </h1>

          {/* Açıklama Metni */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            10.000&apos;i aşkın sertifikalı ürün gamı, güçlü stok hacmi ve hızlı sevkiyat ağıyla; 
            imalathanelerden ağır sanayi fabrikalarına, tersanelerden inşaat şantiyelerine kadar tüm endüstriyel ihtiyaçlarınızda güvenilir çözüm ortağınız.
          </p>

          {/* Aksiyon Butonları */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#urunler"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-arma-blue hover:bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all group"
            >
              <span>30 Ürün Grubunu İncele</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#teklif"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white border border-slate-700 font-semibold text-sm sm:text-base transition-all"
            >
              <span>Hızlı Fiyat Teklifi Al</span>
            </Link>

            <a
              href={`tel:${COMPANY_INFO.phoneFormatted}`}
              className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium px-3 py-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-arma-orange" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Güven ve İstatistik Kartları Grid */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/70 border border-blue-800/50 text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">10.000+</div>
                <div className="text-xs text-slate-400">Aktif Stok Kalemi</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-800/50 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">Aynı Gün</div>
                <div className="text-xs text-slate-400">Bölgesel Hızlı Sevkiyat</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-800/50 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">%100 Orijinal</div>
                <div className="text-xs text-slate-400">Test Sertifikalı & CE</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-orange-950/70 border border-orange-800/50 text-orange-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">30+ Yıl</div>
                <div className="text-xs text-slate-400">Sanayi Tecrübesi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
