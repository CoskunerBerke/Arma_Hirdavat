import Link from "next/link";
import { ArrowRight, Building2, Receipt, ShieldCheck } from "lucide-react";
import SceneHero from "@/components/SceneHero";
import ProductCard from "@/components/ProductCard";
import ReviewsRiver from "@/components/ReviewsRiver";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import FaqSection from "@/components/FaqSection";
import ClientLogos from "@/components/ClientLogos";
import DiscountPackagingBand from "@/components/DiscountPackagingBand";
import RetailStoreSection from "@/components/RetailStoreSection";
import ProductActionVideo from "@/components/ProductActionVideo";
import { BEST_SELLER_IDS, PRODUCT_GROUPS } from "@/data/products";

const BEST_SELLERS = BEST_SELLER_IDS.map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);

const VALUES = [
  {
    icon: ShieldCheck,
    title: "39 Profesyonel KKD & CE/EN Normları",
    text: "FABA resmi üretim kataloğundaki tüm iş eldivenleri ve kimyasal tulumlar; EN 388 mekanik, EN ISO 374 kimyasal ve Tip 3B/4B normlarına tam uygundur.",
  },
  {
    icon: Building2,
    title: "Türkiye Geneli 81 İle Ambar Teslimatı",
    text: "Samsun Tekkeköy merkez lojistik depomuzdan Türkiye'nin 81 ilindeki tüm organize sanayi bölgelerine, fabrikalara ve şantiyelere günlük doğrudan ambar tırlarımızla tesis teslimatı sağlıyoruz.",
  },
  {
    icon: Receipt,
    title: "2 Saatte Kurumsal Fiyat Teklifi",
    text: "Malzeme listenize göre en avantajlı fabrika iskonto oranlarıyla aynı gün resmi proforma teklif hazırlıyor, kurumsal e-fatura ile süreci hızlandırıyoruz.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 2. HERO BÖLÜMÜ (KARŞILAMA EKRANI) */}
      <SceneHero />

      {/* 3. REFERANS LOGOLARI (İLK EKRANDA GÖRÜNECEK - 5 DEV MONOKROM LOGO) */}
      <ClientLogos />

      {/* 4. İSKONTO & AMBALAJ BİLGİ KUTUSU */}
      <DiscountPackagingBand />

      {/* AI Üretimi Eldiven Sahada Performans & Dayanım Testi Videosu */}
      <section className="container-x py-8 sm:py-12" aria-label="FABA KKD Saha Performans Testi">
        <Reveal className="rounded-3xl border border-line bg-gradient-to-br from-white via-slate-50/70 to-white p-6 sm:p-10 shadow-sm ring-1 ring-black/[0.04]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Sol Taraf: Test Bilgileri ve Dayanım Standartları */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-action">
                <ShieldCheck className="h-3.5 w-3.5 text-action" />
                <span>SAHA VE ENDÜSTRİYEL KULLANIM TESTİ</span>
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Zorlu Fabrika Şartlarında Maksimum Tutuş ve Aşınma Dayanımı
              </h2>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed sm:text-[15px]">
                FABA mikro köpük nitril ve Seviye D kesilmez eldiven grupları, ağır sanayi parçalarının ve yağlı metal yüzeylerin taşınmasında elleri tam kavrar, kaymayı sıfıra indirir.
              </p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-line bg-white p-3 shadow-2xs">
                  <span className="text-xs font-bold text-ink block">EN 388: 4131X</span>
                  <span className="text-[11px] text-ink-muted">Mekanik Aşınma</span>
                </div>
                <div className="rounded-xl border border-line bg-white p-3 shadow-2xs">
                  <span className="text-xs font-bold text-ink block">Mikro Köpük</span>
                  <span className="text-[11px] text-ink-muted">Yağ İtici Tutuş</span>
                </div>
                <div className="rounded-xl border border-line bg-white p-3 shadow-2xs col-span-2 sm:col-span-1">
                  <span className="text-xs font-bold text-ink block">Koli & Palet</span>
                  <span className="text-[11px] text-ink-muted">Doğrudan Sevk</span>
                </div>
              </div>
            </div>

            {/* Sağ Taraf: AI Eldiven Test Videosu Oynatıcı */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px]">
                <ProductActionVideo />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* En çok satanlar — 5 grup, tamamı kendi sayfasında */}
      <section className="section" aria-labelledby="best-sellers">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">En çok satanlar</p>
              <h2 id="best-sellers" className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink lg:text-4xl">
                En çok tercih edilen profesyonel ürünlerimiz
              </h2>
              <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-ink-soft">
                FABA iş eldivenleri, mikro köpük nitril, Seviye D kesilmeye dirençli eldivenler, Zevahir kaynak eldivenleri ve Tip 3B/4B kimyasal tulumlar; sanayide en sık talep edilen KKD ürünleri.
              </p>
            </div>
            <Link href="/urunler" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover">
              Tüm 39 ürünü inceleyin <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <ul className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {BEST_SELLERS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 50} className="min-w-0">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. PERAKENDE / FİZİKİ MAĞAZA AYRIMI (CİVTEC MODELİ) */}
      <RetailStoreSection />

      {/* Değer önerisi — üç madde */}
      <section className="section border-y border-line bg-gradient-to-b from-white to-canvas">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Neden Arma Hırdavat?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Endüstriyel Tedariği Güvenceye Alıyoruz.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Fabrika ve tesislerin iş güvenliği ekipmanı ihtiyaçlarını doğrudan yetkili kaynaktan, koli ve palet bazında en avantajlı kurumsal maliyetle çözüyoruz.
            </p>
            <Link href="/kurumsal" className="btn-ghost mt-6">
              Kurumsal Profilimiz <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="surface p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-brand-50">
                  <v.icon className="h-5 w-5 text-brand" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewsRiver />

      {/* Sıkça Sorulan Sorular & FAQPage Schema */}
      <FaqSection />

      <CtaBand />
    </>
  );
}
