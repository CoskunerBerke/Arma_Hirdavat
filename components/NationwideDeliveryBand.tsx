import React from "react";
import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, Factory, MapPin, ShieldCheck, Truck } from "lucide-react";
import { TURKEY_PROVINCES } from "@/data/company";
import RfqTriggerButton from "./RfqTriggerButton";

const REGIONAL_HUBS = [
  {
    region: "Marmara Sanayi Havzası",
    desc: "Gebze, Dilovası, Çerkezköy, Çorlu ve Bursa OSB hatlarına günlük ambar ve koli sevkiyatı.",
    cities: ["İstanbul", "Kocaeli", "Bursa", "Tekirdağ", "Sakarya", "Balıkesir", "Yalova", "Çanakkale", "Edirne", "Kırklareli", "Bilecik"],
  },
  {
    region: "İç Anadolu İmalat & Savunma",
    desc: "OSTİM, İvedik, Sincan, Konya ve Kayseri sanayi sitelerine paletli ve koli bazlı sevkiyat.",
    cities: ["Ankara", "Konya", "Kayseri", "Eskişehir", "Sivas", "Aksaray", "Kırıkkale", "Karaman", "Nevşehir", "Niğde", "Kırşehir", "Yozgat", "Çankırı"],
  },
  {
    region: "Ege & Akdeniz Sanayi Hatları",
    desc: "Aliağa, Kemalpaşa, Manisa ve Adana-Mersin liman/sanayi koridorlarına düzenli lojistik sevk.",
    cities: ["İzmir", "Manisa", "Denizli", "Aydın", "Muğla", "Uşak", "Kütahya", "Afyonkarahisar", "Adana", "Mersin", "Antalya", "Hatay", "Kahramanmaraş", "Osmaniye", "Isparta", "Burdur"],
  },
  {
    region: "Güneydoğu & Doğu Anadolu",
    desc: "Gaziantep OSB, Malatya, Şanlıurfa ve Diyarbakır sanayi tesislerine güvenli nakliye.",
    cities: ["Gaziantep", "Şanlıurfa", "Diyarbakır", "Malatya", "Elazığ", "Erzurum", "Batman", "Mardin", "Adıyaman", "Van", "Erzincan", "Kars", "Iğdır", "Muş", "Bitlis", "Siirt", "Bingöl", "Ağrı", "Hakkari", "Şırnak", "Ardahan", "Tunceli", "Kilis"],
  },
  {
    region: "Karadeniz Lojistik Merkezi (Samsun Çıkışlı)",
    desc: "Merkezi depomuzdan Samsun, Trabzon, Ereğli ve tüm Karadeniz illerine doğrudan aynı gün/ertesi gün sevk.",
    cities: ["Samsun", "Trabzon", "Zonguldak", "Çorum", "Ordu", "Giresun", "Rize", "Karabük", "Düzce", "Bolu", "Kastamonu", "Amasya", "Tokat", "Sinop", "Bartın", "Artvin", "Bayburt", "Gümüşhane"],
  },
];

export default function NationwideDeliveryBand() {
  return (
    <section className="section bg-gradient-to-b from-canvas to-white border-y border-line" aria-labelledby="nationwide-heading">
      <div className="container-x">
        {/* Başlık ve SEO Açıklaması */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-brand">
            <Truck className="h-4 w-4" />
            <span>TÜRKİYE GENELİ LOJİSTİK VE SEVKİYAT AĞI</span>
          </div>
          <h2 id="nationwide-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Sadece Samsun&apos;a Değil, Türkiye&apos;nin 81 İline Toptan Sevkiyat
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-[17px]">
            Samsun Tekkeköy sanayi aksındaki lojistik merkezimizden; <strong>Türkiye&apos;nin 81 ilindeki</strong> tüm organize sanayi bölgelerine (OSB), fabrikalara, imalat atölyelerine, tersanelere ve kurumsal inşaat şantiyelerine anlaşmalı ambar ve kargo ağımızla <strong>koli ve palet bazında</strong> toptan malzeme sevkiyatı gerçekleştiriyoruz.
          </p>
        </div>

        {/* 4 Temel Lojistik ve Satın Alma Avantajı */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="surface rounded-2xl p-5 border border-line bg-white shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">81 İl Ambar & Kargo Ağı</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Türkiye&apos;nin her bölgesindeki fabrika depolarına ve şantiye sahalarına ambar, parsiyel veya komple araçla teslimat.
            </p>
          </div>

          <div className="surface rounded-2xl p-5 border border-line bg-white shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Boxes className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">Koli & Palet Ambalajı</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Yüksek hacimli kurumsal ihtiyaçlar için palet streçli, çemberli ve hasarsız sevk garantili endüstriyel ambalaj.
            </p>
          </div>

          <div className="surface rounded-2xl p-5 border border-line bg-white shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">Kurumsal İskonto Matrisi</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Alım hacminize, düzenli sipariş planınıza ve teslimat lokasyonunuza göre firmanıza özel iskonto oranları uygulanır.
            </p>
          </div>

          <div className="surface rounded-2xl p-5 border border-line bg-white shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Factory className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">OSB & Şantiye Odaklı</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Otomotiv yan sanayi, makine imalatı, çelik konstrüksiyon, enerji ve ağır sanayi şartnamelerine tam uyumlu ürün gamı.
            </p>
          </div>
        </div>

        {/* Bölgesel Sanayi Koridorları & 81 İl Dizin */}
        <div className="mt-12 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
          <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-ink">Türkiye Sanayi Havzaları ve Sevkiyat Noktaları</h3>
              <p className="text-xs text-ink-muted">81 ildeki Organize Sanayi Bölgelerine düzenli tedarik sağlıyoruz.</p>
            </div>
            <span className="text-xs font-semibold text-brand bg-blue-50 px-3 py-1 rounded-full">
              81 İl Kapsama Alanı
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REGIONAL_HUBS.map((hub) => (
              <div key={hub.region} className="rounded-2xl border border-line/70 bg-canvas/40 p-4">
                <h4 className="text-sm font-bold text-ink flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand shrink-0" />
                  {hub.region}
                </h4>
                <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">{hub.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {hub.cities.map((city) => (
                    <span
                      key={city}
                      className="inline-block rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-ink-soft"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 81 İl Tam Liste Dizin (SEO Crawler'ların tüm şehir isimlerini ve anahtar kelimeleri okuması için) */}
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
