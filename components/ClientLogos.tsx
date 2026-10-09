"use client";

import Image from "next/image";
import { ArrowUpRight, Award, ShieldCheck } from "lucide-react";
import { CLIENT_REFERENCES } from "@/data/company";
import Reveal from "./Reveal";

/**
 * 5 Dev Sanayi Referansı — Kurumsal Tek Renk Monokrom Gri Vitrin
 * 1. Samsun Makina Sanayi
 * 2. Yeşilyurt Demir Çelik
 * 3. Sampa Otomotiv
 * 4. Rönesans Holding
 * 5. CNR (CRRC)
 */
const ORDERED_CLIENTS = [
  CLIENT_REFERENCES.find((c) => c.name.includes("Samsun Makina")) || CLIENT_REFERENCES[3],
  CLIENT_REFERENCES.find((c) => c.name.includes("Yeşilyurt")) || CLIENT_REFERENCES[2],
  CLIENT_REFERENCES.find((c) => c.name.includes("Sampa")) || CLIENT_REFERENCES[1],
  CLIENT_REFERENCES.find((c) => c.name.includes("Rönesans")) || CLIENT_REFERENCES[0],
  CLIENT_REFERENCES.find((c) => c.name.includes("CNR")) || CLIENT_REFERENCES[4],
];

export default function ClientLogos() {
  const riverItems = [
    ...ORDERED_CLIENTS,
    ...ORDERED_CLIENTS,
    ...ORDERED_CLIENTS,
  ];

  return (
    <section
      aria-label="Tedarik Sağladığımız Üretim Tesisleri ve Altyapı Projeleri"
      className="border-b border-line bg-gradient-to-b from-white via-slate-50/40 to-white py-10 sm:py-14 relative overflow-hidden w-full max-w-full"
    >
      <div className="container-x w-full max-w-full min-w-0">
        {/* Üst Başlık & B2B Güven Mesajı */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 sm:pb-8 border-b border-line/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
              <Award className="h-3.5 w-3.5 text-slate-600" />
              <span>KURUMSAL REFERANSLAR</span>
            </div>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink sm:text-2xl lg:text-3xl">
              Tedarik Sağladığımız Üretim Tesisleri ve Altyapı Projeleri
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-ink-soft">
              Ağır sanayi, dökümhane, haddehane ve uluslararası müteahhitlik projelerine endüstriyel ambalaj standartlarında kesintisiz sevkiyat sağlıyoruz.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs self-start md:self-end">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Doğrudan Toptan Sevkiyat</span>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* MASAÜSTÜ: 5 DEV MONOKROM LOGO KARTI (YAN YANA SABİT VE OTURAKLI) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-3.5 pt-8">
          {ORDERED_CLIENTS.map((client) => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${client.name} resmi web sitesi`}
              className="group/card flex flex-col items-center justify-center rounded-2xl border border-line/80 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md hover:shadow-slate-200/50"
            >
              {/* Tek Renk Monokrom Gri Logo */}
              <div className="relative flex h-14 w-full items-center justify-center p-1">
                <Image
                  src={client.logo}
                  alt={`${client.name} logosu`}
                  width={160}
                  height={56}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-9 w-auto max-w-[140px] object-contain filter grayscale contrast-125 opacity-70 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:scale-105"
                />
              </div>

              {/* Kurumsal Başlık & Badge */}
              <div className="mt-3 w-full border-t border-line/50 pt-2.5">
                <div className="flex items-center justify-center gap-1">
                  <h3 className="text-xs font-bold text-slate-800 transition-colors group-hover/card:text-ink truncate">
                    {client.name}
                  </h3>
                  <ArrowUpRight className="h-3 w-3 text-slate-400 transition-transform group-hover/card:text-brand group-hover/card:-translate-y-0.5" />
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-slate-500 truncate">
                  {client.badge}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBİL & TABLET: KESİNTİSİZ SAĞDAN SOLA NEHİR AKIŞI (MONOKROM MARQUEE) */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative mt-6 overflow-hidden w-full max-w-full group">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent" />

        <ul className="river-track flex w-max py-2">
          {riverItems.map((client, idx) => (
            <li
              key={`${client.name}-${idx}`}
              aria-hidden={idx >= ORDERED_CLIENTS.length ? true : undefined}
              className="mr-3 shrink-0"
            >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${client.name} resmi web sitesi`}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-2xs transition hover:border-slate-400 min-w-[210px]"
              >
                <div className="relative flex h-9 w-20 shrink-0 items-center justify-center border-r border-line pr-2.5">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logosu`}
                    width={120}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-7 w-auto max-w-full object-contain filter grayscale contrast-125 opacity-70"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {client.name}
                  </h3>
                  <p className="text-[10px] font-medium text-slate-500 truncate">
                    {client.badge}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
