import type { Metadata } from "next";
import SceneHero from "@/components/SceneHero";
import CategoryGrid from "@/components/home/CategoryGrid";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ShowcaseVideo from "@/components/home/ShowcaseVideo";
import ClientLogos from "@/components/ClientLogos";
import PricingLogistics from "@/components/home/PricingLogistics";
import ReviewsRiver from "@/components/ReviewsRiver";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import IntroSection from "@/components/home/IntroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import CatalogsCertificates from "@/components/home/CatalogsCertificates";
import StatsBand from "@/components/home/StatsBand";
import GuidesSection from "@/components/home/GuidesSection";
import { COMPANY } from "@/data/company";

/*
 * Ana sayfa (kurumsal düzen) — ilgiden "Ücretsiz Teklif Al"a giden sıra:
 * Hero kaydırıcısı → referanslar (#referanslar) → tanıtım metni → hizmetlerimiz (#hizmetler) →
 * ürün katalogları ve sertifika belgeleri (#belgeler) → kategoriler → sayaç bandı → öne çıkan ürünler → ürün videosu →
 * nasıl çalışır → mağaza → yorumlar (varsa) → rehberler → SSS → teklif bandı.
 *
 * Kök layout canonical vermez; ana sayfanın canonical'ı burada. OG görseli: public/og/arma-og.png.
 * Ürün tanıtım videosu (yapay zekâ ile üretilmiş) sayfa ağırlığı için ana sayfada kullanılmıyor.
 */
export const metadata: Metadata = {
  title: { absolute: "Samsun Hırdavat ve İş Eldiveni Toptan | Arma Hırdavat" },
  description:
    "Samsun Tekkeköy'de teknik hırdavat mağazası ve iş güvenliği tedarikçisi. FABA iş eldiveni, koruyucu tulum ve KKD ürünlerinde koli bazında teklif alın.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: "/",
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name}: FABA iş eldiveni ve koruyucu giyim` }],
  },
};

export default function HomePage() {
  return (
    <>
      <SceneHero />
      <ClientLogos />
      <PricingLogistics />
      <IntroSection />
      <ServicesGrid />
      <CatalogsCertificates />
      <CategoryGrid />
      <StatsBand />
      <FeaturedProducts />
      <ShowcaseVideo />
      <HowItWorks />
      <ReviewsRiver />
      <GuidesSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
