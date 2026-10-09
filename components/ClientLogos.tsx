"use client";

import Image from "next/image";
import { ArrowUpRight, Award, CheckCircle2 } from "lucide-react";
import { CLIENT_REFERENCES } from "@/data/company";
import Reveal from "./Reveal";

/**
 * Müşteri Referansları — Kesintisiz Sağdan Sola Nehir Akışı (Logo River / Marquee)
 * Sade, ferah, gereksiz yazılardan arındırılmış, sadece logo ve isim odaklı elit vitrin.
 */
export default function ClientLogos() {
  // Kesintisiz döngü için listeyi 4 kez tekrarlıyoruz
  const riverItems = [
    ...CLIENT_REFERENCES,
    ...CLIENT_REFERENCES,
    ...CLIENT_REFERENCES,
    ...CLIENT_REFERENCES,
  ];

  return (
    <section
      aria-label="Çalıştığımız ve Tedarik Sağladığımız Sanayi Kuruluşları"
      className="border-b border-line bg-gradient-to-b from-white via-slate-50/50 to-white py-12 sm:py-16 relative overflow-hidden w-full max-w-full"
    >
      <div className="container-x w-full max-w-full min-w-0">
        {/* Üst Başlık & B2B Güven Mesajı (Sade & Kurumsal) */}
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
              Üretim tesisleri, ağır sanayi fabrikaları ve global şantiyelerin yüksek hacimli teknik hırdavat ve KKD malzeme ihtiyaçlarını düzenli koli ve palet sevkiyatlarıyla karşılıyoruz.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-line self-start md:self-end">
            <CheckCircle2 className="h-4 w-4 text-action" />
            <span>Doğrudan Toptan & Kurumsal İskonto</span>
          </div>
        </Reveal>
      </div>

      {/* ========================================================================= */}
      {/* KESİNTİSİZ SAĞDAN SOLA NEHİR AKIŞI (LOGO & İSİM MARQUEE STREAM) */}
      {/* ========================================================================= */}
      <div className="relative mt-8 sm:mt-10 overflow-hidden w-full max-w-full group">
        {/* Sol ve Sağ Kenar Yumuşak Saydamlık Gradyanı (Görsel Akış Efekti) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Kayan Nehir Şeridi (Hover edildiğinde yavaşlar / duraklar) */}
        <ul className="river-track flex w-max py-4 group-hover:[animation-play-state:paused]">
          {riverItems.map((client, idx) => (
            <li
              key={`${client.name}-${idx}`}
              aria-hidden={idx >= CLIENT_REFERENCES.length ? true : undefined}
              className="mr-4 sm:mr-5 shrink-0"
            >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${client.name} resmi web sitesi`}
                className="group/card flex items-center gap-4 rounded-2xl border border-line bg-white/95 px-4 sm:px-6 py-3.5 sm:py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 min-w-[240px] sm:min-w-[280px]"
              >
                {/* Logo Alanı */}
                <div className="relative flex h-11 w-24 sm:h-12 sm:w-28 shrink-0 items-center justify-center p-1 border-r border-line/60 pr-3 sm:pr-4">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logosu`}
                    width={140}
                    height={48}
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-8 sm:max-h-9 w-auto max-w-full object-contain filter grayscale contrast-125 transition-all duration-300 group-hover/card:grayscale-0 group-hover/card:scale-105"
                  />
                </div>

                {/* Firma İsmi ve Sektör */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-ink transition-colors group-hover/card:text-brand truncate">
                      {client.name}
                    </h3>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-all duration-200 group-hover/card:text-brand group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 shrink-0" />
                  </div>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-500 truncate">
                    {client.badge}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Alt Güven & Kurumsal Sevkiyat İmzası */}
      <div className="container-x mt-8 pt-4">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            81 İle Doğrudan Toptan Sevkiyat
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            %100 Orijinal & CE Belgeli Malzemeler
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Kurumsal Fabrika İskonto Avantajı
          </span>
        </div>
      </div>
    </section>
  );
}
