import React from "react";
import { ArrowRight, Boxes, ShieldCheck, Truck } from "lucide-react";
import { TURKEY_PROVINCES } from "@/data/company";
import RfqTriggerButton from "./RfqTriggerButton";

export default function NationwideDeliveryBand() {
  return (
    <section className="section bg-gradient-to-b from-canvas via-white to-canvas border-y border-line" aria-labelledby="nationwide-heading">
      <div className="container-x">
        {/* Sade, Anlaşılır ve Net 81 İl Vurgusu */}
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-brand shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span>TÜRKİYE GENELİ 81 İL SEVKİYAT</span>
            </div>

            <h2 id="nationwide-heading" className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Türkiye&apos;nin 81 İline Koli ve Palet Bazında Toptan Sevkiyat
            </h2>

            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-[17px]">
              Samsun merkez lojistik depomuzdan; <strong>Türkiye&apos;nin 81 ilindeki</strong> tüm organize sanayi bölgelerine (OSB), fabrikalara, imalat atölyelerine ve kurumsal şantiyelere anlaşmalı ambar ve kargo ağımızla <strong>koli ve palet bazında</strong> toptan teknik hırdavat tedariği sağlıyoruz.
            </p>
          </div>

          {/* 3 Sade ve Net Güvence Kartı */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="group rounded-2xl border border-line bg-canvas/40 p-6 transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand transition-transform duration-300 group-hover:scale-110">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">81 İle Ambar & Kargo Teslimatı</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Türkiye&apos;nin neresinde olursanız olun; sanayi ambarları veya kargo filolarıyla doğrudan fabrikanıza veya şantiyenize teslimat yapıyoruz.
              </p>
            </div>

            <div className="group rounded-2xl border border-line bg-canvas/40 p-6 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                <Boxes className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">Yalnızca Toptan (Koli & Palet)</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Perakende satışımız yoktur. Sanayi kuruluşları ve kurumsal alıcılar için koli, palet ve çemberli ambalajlarda güvenli sevk garantisi sunuyoruz.
              </p>
            </div>

            <div className="group rounded-2xl border border-line bg-canvas/40 p-6 transition-all duration-300 hover:border-amber-500/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">Kurumsal İskonto & Hızlı Teklif</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Malzeme listenizi ister WhatsApp&apos;tan ister teklif formundan iletin; alım hacminize en uygun fabrika iskonto oranlarıyla aynı gün fiyatlandıralım.
              </p>
            </div>
          </div>

          {/* Aksiyon Alanı */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-6">
            <div className="text-xs text-ink-soft sm:text-sm">
              Tesisiniz veya şantiyeniz için <strong>toplu malzeme listenizi</strong> iletin, aynı gün koli/palet bazlı teklifinizi hazırlayalım.
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <RfqTriggerButton className="btn-primary py-3 px-6 text-xs sm:text-sm font-semibold shadow-md">
                81 İl İçin Teklif İste (RFQ) <ArrowRight className="h-4 w-4" />
              </RfqTriggerButton>
            </div>
          </div>

          {/* 81 İl SEO İndeksi (Google Botlarının 81 şehri taraması için derli toplu ve şık akordeon) */}
          <div className="mt-8 border-t border-line pt-6">
            <details className="group cursor-pointer">
              <summary className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-brand flex items-center justify-between select-none">
                <span>Türkiye&apos;nin 81 İline Malzeme Tedariği Yaptığımız Şehirler (Google İndeksi)</span>
                <span className="text-brand group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-soft">
                {TURKEY_PROVINCES.map((prov) => (
                  <span key={prov} className="rounded bg-slate-100 px-2 py-1 text-slate-700">
                    {prov} Toptan Hırdavat
                  </span>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
