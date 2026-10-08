import Image from "next/image";
import { ArrowUpRight, Award, Building2, CheckCircle2 } from "lucide-react";
import { CLIENT_REFERENCES } from "@/data/company";
import Reveal from "./Reveal";

export default function ClientLogos() {
  return (
    <section
      aria-label="Çalıştığımız ve Tedarik Sağladığımız Sanayi Kuruluşları"
      className="border-b border-line bg-white py-12 sm:py-16 relative overflow-hidden"
    >
      <div className="container-x">
        {/* Üst Başlık & B2B Güven Mesajı */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 sm:pb-10 border-b border-line/60">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-action">
              <Award className="h-3.5 w-3.5 text-action" />
              <span>GÜVENİLİR B2B SANAYİ ORTAĞI</span>
            </div>
            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Türkiye&apos;nin Öncü Sanayi Kuruluşlarının Malzeme Tedarikçisiyiz
            </h2>
            <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-ink-soft">
              Üretim tesisleri, ağır sanayi fabrikaları ve global şantiyelerin yüksek hacimli teknik hırdavat, KKD ve endüstriyel tesis ihtiyaçlarını düzenli koli ve palet sevkiyatlarıyla karşılıyoruz.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-line">
            <CheckCircle2 className="h-4 w-4 text-action" />
            <span>Doğrudan Toptan & Kurumsal İskonto</span>
          </div>
        </Reveal>

        {/* 5 Sanayi Devi Logo Kartları — Mobilde dengeli 2+2+1 grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {CLIENT_REFERENCES.map((client, i) => (
            <Reveal
              key={client.name}
              delay={i * 60}
              className={`flex h-full ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full flex-col justify-between rounded-2xl border border-line bg-canvas/30 p-3.5 sm:p-5 transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-lg hover:-translate-y-1"
              >
                {/* Üst Rozet */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-50/80 px-2 py-0.5 rounded truncate max-w-[85%]">
                    {client.badge}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-brand shrink-0" />
                </div>

                {/* Logo Alanı */}
                <div className="relative flex h-12 sm:h-14 w-full items-center justify-center py-1">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logosu`}
                    width={220}
                    height={56}
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-10 sm:max-h-12 w-auto max-w-[90%] object-contain filter grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>

                {/* Alt Bilgi */}
                <div className="mt-4 border-t border-line/50 pt-2.5 text-center">
                  <h3 className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand transition-colors">
                    {client.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-snug text-ink-muted line-clamp-1">
                    {client.sector}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
