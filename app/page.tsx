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
import IndustrialLogisticsMap from "@/components/IndustrialLogisticsMap";
import RetailStoreSection from "@/components/RetailStoreSection";
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
    title: "Samsun Tekkeköy Lojistik Üssü",
    text: "Adnan Kahveci Bulvarı lojistik depomuzdan Türkiye'nin önde gelen organize sanayi bölgelerine, ağır sanayi havzalarına ve şantiyelere doğrudan ambar sevkiyatı sağlıyoruz.",
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

      {/* 5. SANAYİ BÖLGELERİ & LOJİSTİK HARİTASI (RADAR / AĞ ŞEMASI) */}
      <IndustrialLogisticsMap />

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
