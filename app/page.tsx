import type { Metadata } from "next";
import SceneHero from "@/components/SceneHero";
import ClientLogos from "@/components/ClientLogos";
import RetailStoreSection from "@/components/RetailStoreSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import PricingLogistics from "@/components/home/PricingLogistics";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ShowcaseVideo from "@/components/home/ShowcaseVideo";
import CatalogCallout from "@/components/home/CatalogCallout";
import ReviewsRiver from "@/components/ReviewsRiver";
import GuidesSection from "@/components/home/GuidesSection";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import { COMPANY } from "@/data/company";

/*
 * Ana sayfa (işletme sahibinin brifindeki sıra — sade ve hızlı):
 * Dron videolu hero → referans şeridi (#referanslar) → perakende / fiziki mağaza (#fiziki-magaza) →
 * hizmetler (#hizmetler) → kurumsal fiyatlandırma ve tedarik standartları (#kurumsal-tedarik) →
 * dengeli ürün grupları (endüstriyel malzemeler + FABA iş güvenliği) → öne çıkan ürünler →
 * yapay zekâ eldiven videosu → e-katalog çağrısı → yorumlar → rehberler → SSS → teklif bandı.
 *
 * Bilerek çıkarılanlar: sayaç bandı (StatsBand, sayısal), Türkiye haritası (DeliveryMapSection),
 * tanıtım metni (IntroSection) ve "nasıl çalışır" (HowItWorks). Bileşen dosyaları duruyor.
 *
 * Kök layout canonical vermez; ana sayfanın canonical'ı burada. OG görseli: public/og/arma-og.png.
 */
export const metadata: Metadata = {
  title: { absolute: "Endüstriyel Tedarik ve Teknik Hırdavat | Arma Hırdavat" },
  description:
    "Fabrika ve OSB tesislerine bağlantı elemanı, hortum, kesici taş ve iş güvenliği ürünlerinde koli/palet bazlı kurumsal tedarik. Samsun Tekkeköy merkezli.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: "/",
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name}: endüstriyel tedarik ve teknik hırdavat` }],
  },
};

export default function HomePage() {
  return (
    <>
      <SceneHero />
      <ClientLogos />
      <RetailStoreSection />
      <ServicesGrid />
      <PricingLogistics />
      <CategoryGrid />
      <FeaturedProducts />
      <ShowcaseVideo />
      <CatalogCallout />
      <ReviewsRiver />
      <GuidesSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
