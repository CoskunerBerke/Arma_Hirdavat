import React from "react";
import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, Factory, MapPin, ShieldCheck, Truck } from "lucide-react";
import { TURKEY_PROVINCES } from "@/data/company";
import RfqTriggerButton from "./RfqTriggerButton";

const MAJOR_TRADE_HUBS = [
  {
    id: "marmara",
    region: "Marmara Sanayi Havzası",
    badge: "En Yüksek Hacim",
    badgeColor: "bg-blue-50 text-brand border-blue-200",
    desc: "Otomotiv yan sanayi, makine imalatı, metal işleme ve kimya sanayi tesisleri.",
    leadHubs: ["Gebze OSB", "Dilovası", "İkitelli OSB", "Çerkezköy", "Bursa Nilüfer"],
    delivery: "Günlük Ambar & Koli Çıkışı",
  },
  {
    id: "icanadolu",
    region: "İç Anadolu İmalat & Savunma",
    badge: "Savunma & Ağır Makine",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    desc: "Talaşlı imalat, döküm sanayii, tarım makineleri ve savunma sanayi yüklenicileri.",
    leadHubs: ["Ankara (OSTİM & İvedik)", "Konya (Karatay & Büsan)", "Kayseri OSB", "Eskişehir"],
    delivery: "24-48 Saat Paletli Ambar",
  },
  {
    id: "ege-akdeniz",
    region: "Ege & Akdeniz Sanayi Koridoru",
    badge: "Petrokimya & Ağır Sanayi",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    desc: "Ağır sanayi, rafineri, tersane/liman ekipmanları, mermer ve gıda işleme tesisleri.",
    leadHubs: ["İzmir (Aliağa & Çiğli)", "Manisa OSB", "Denizli", "Adana-Mersin OSB"],
    delivery: "Düzenli Ambar & Parsiyel Sevk",
  },
  {
    id: "karadeniz",
    region: "Merkez Lojistik Üssümüz (Samsun Çıkış)",
    badge: "Ana Depo & Hızlı Stok",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
    isHomeBase: true,
    desc: "Tekkeköy ana depomuzdan hazır stok sevkiyatı ve aynı gün ambar teslimatı.",
    leadHubs: ["Samsun Tekkeköy (Ana Merkez)", "Samsun OSB", "Trabzon", "Kdz. Ereğli Demir-Çelik"],
    delivery: "Aynı Gün / 24 Saatte Hızlı Sevk",
  },
  {
    id: "guneydogu",
    region: "Güneydoğu & Çukurova Sanayi Hattı",
    badge: "Üretim & İhracat",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    desc: "Tekstil dokuma, çelik konstrüksiyon, gıda imalatı ve sınır ötesi sanayi projeleri.",
    leadHubs: ["Gaziantep Başpınar OSB", "İskenderun Demir-Çelik", "Şanlıurfa OSB"],
    delivery: "Düzenli Ambar & Tır Sevkiyatı",
  },
];

export default function NationwideDeliveryBand() {
  return (
    <section className="section bg-gradient-to-b from-canvas via-white to-canvas border-y border-line" aria-labelledby="nationwide-heading">
      <div className="container-x">
        {/* Başlık ve SEO Açıklaması */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-brand shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            <span>81 İL AMBAR & SEVKİYAT AĞI</span>
          </div>
          <h2 id="nationwide-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Sadece Samsun&apos;a Değil, Türkiye&apos;nin 81 İline Toptan Sevkiyat
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-[17px]">
            Samsun Tekkeköy sanayi aksındaki lojistik merkezimizden; <strong>Türkiye&apos;nin 81 ilindeki</strong> organize sanayi bölgelerine (OSB), fabrikalara ve büyük şantiyelere anlaşmalı ambar ağımızla <strong>koli ve palet bazında</strong> toptan malzeme sevkiyatı gerçekleştiriyoruz.
          </p>
        </div>

        {/* 4 Temel Lojistik ve Satın Alma Avantajı */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group surface rounded-2xl p-5 border border-line bg-white shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand transition-transform duration-300 group-hover:scale-110">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">81 İl Ambar & Kargo Ağı</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Türkiye&apos;nin her bölgesindeki fabrika depolarına ve şantiye sahalarına ambar veya parsiyel teslimat.
            </p>
          </div>

          <div className="group surface rounded-2xl p-5 border border-line bg-white shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
              <Boxes className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">Koli & Palet Ambalajı</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Yüksek hacimli kurumsal ihtiyaçlar için palet streçli, çemberli ve hasarsız sevk garantili endüstriyel ambalaj.
            </p>
          </div>

          <div className="group surface rounded-2xl p-5 border border-line bg-white shadow-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">Kurumsal İskonto Matrisi</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Alım hacminize ve teslimat lokasyonunuza göre firmanıza özel toptan iskonto oranları uygulanır.
            </p>
          </div>

          <div className="group surface rounded-2xl p-5 border border-line bg-white shadow-sm transition-all duration-300 hover:border-purple-500/40 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110">
              <Factory className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">OSB & Şantiye Odaklı</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Otomotiv yan sanayi, makine imalatı, çelik konstrüksiyon ve şantiye şartnamelerine tam uyumlu malzeme stoğu.
            </p>
          </div>
        </div>

        {/* Bölgesel Sanayi Koridorları — Sade, Efektli & Hacimli Merkez Odaklı */}
        <div className="mt-12 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
          <div className="border-b border-line pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  Bölgesel Sanayi Havzaları ve Büyük Ticaret Merkezleri
                </h3>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Türkiye&apos;nin en yüksek üretim ve satın alma hacmine sahip sanayi hatlarına düzenli sevkiyat yapıyoruz.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1 text-xs font-semibold text-ink-soft">
                <Truck className="h-3.5 w-3.5 text-brand" />
                81 İl Ambar Kapsamı
              </span>
            </div>
          </div>

          {/* Efektli ve Sade Kartlar */}
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MAJOR_TRADE_HUBS.map((hub) => (
              <div
                key={hub.id}
                className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  hub.isHomeBase
                    ? "border-amber-300/80 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 shadow-sm hover:border-amber-400"
                    : "border-line bg-white hover:border-brand/40 hover:bg-slate-50/40 shadow-sm"
                }`}
              >
                <div>
                  {/* Başlık ve Rozet */}
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${hub.badgeColor}`}>
                      {hub.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted">
                      <Truck className="h-3 w-3 text-brand" />
                      {hub.delivery}
                    </span>
                  </div>

                  <h4 className="mt-3.5 text-base font-bold text-ink tracking-tight flex items-center gap-1.5 group-hover:text-brand transition-colors">
                    <MapPin className={`h-4 w-4 shrink-0 ${hub.isHomeBase ? "text-amber-700" : "text-brand"}`} />
                    {hub.region}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {hub.desc}
                  </p>
                </div>

                {/* En Yüksek Ticaret Hacmine Sahip Odak Noktalar */}
                <div className="mt-5 border-t border-line/60 pt-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    Öne Çıkan Sanayi Merkezleri:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {hub.leadHubs.map((loc) => (
                      <span
                        key={loc}
                        className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                          hub.isHomeBase
                            ? "border-amber-200 bg-amber-50 text-amber-900 group-hover:bg-amber-100/70"
                            : "border-slate-200/80 bg-slate-100 text-slate-800 group-hover:border-blue-200 group-hover:bg-blue-50/60 group-hover:text-brand"
                        }`}
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 81 İl Tam Liste Dizin (SEO Crawler'ların tüm şehir isimlerini ve anahtar kelimeleri okuması için sade akordeon) */}
          <div className="mt-8 border-t border-line pt-6">
            <details className="group cursor-pointer">
              <summary className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-brand flex items-center justify-between">
                <span>Türkiye&apos;nin 81 İline Malzeme Tedariği Yaptığımız Şehirlerin Tam Listesi</span>
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

          {/* Alt Çağrı Butonları */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-6 bg-slate-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
            <div className="text-xs text-ink-soft sm:text-sm">
              Tesisiniz veya şantiyeniz için <strong>toplu malzeme listesi</strong> iletin, aynı gün koli ve palet bazlı teklifinizi iletelim.
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <RfqTriggerButton className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-semibold shadow-md">
                81 İl İçin Teklif İste (RFQ) <ArrowRight className="h-4 w-4" />
              </RfqTriggerButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
