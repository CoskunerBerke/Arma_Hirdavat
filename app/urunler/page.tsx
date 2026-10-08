import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductCatalog from "@/components/ProductCatalog";
import CtaBand from "@/components/CtaBand";
import { SITE_URL } from "@/data/company";

export const metadata: Metadata = {
  title: "FABA İş Güvenliği ve KKD Ürünleri | 81 İl Toptan Sevkiyat - Arma Hırdavat",
  description:
    "39 profesyonel FABA KKD ürünü: Nitril ve köpük nitril eldivenler, Seviye D kesilmez eldivenler, Zevahir kaynak eldivenleri, Tip 3B/4B kimyasal tulumlar ve lamineli koruyucular. Koli ve palet bazlı kurumsal toptan satış.",
  keywords: [
    "faba eldiven toptan",
    "faba kimyasal tulum",
    "faba zevahir kaynak eldiveni",
    "truflex en-1501",
    "trucut ek-5000",
    "truchem t-800",
    "toptan kkd ürünleri türkiye",
    "81 il iş güvenliği toptan satışı"
  ],
  alternates: { canonical: "/urunler" },
  openGraph: {
    title: "FABA İş Güvenliği ve KKD Ürünleri | 81 İl Toptan Sevkiyat - Arma Hırdavat",
    description: "39 profesyonel FABA iş eldiveni ve koruyucu tulum. Koli ve palet bazında toptan B2B tedarik.",
    url: `${SITE_URL}/urunler`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="FABA KKD Kataloğu"
        title="39 Profesyonel İş Güvenliği Ürünü"
        description="FABA Kastamonu OSB tesislerinde üretilen işçi eldivenleri, köpük nitril, kesilmez eldivenler, kaynak eldivenleri ve Tip 3B/4B kimyasal koruyucu tulumlar. Koli ve palet bazlı kurumsal sipariş oluşturabilirsiniz."
        crumbs={[{ label: "Ürünler", href: "/urunler" }]}
      />
      <section className="section overflow-hidden w-full max-w-full">
        <div className="container-x w-full max-w-full min-w-0">
          <ProductCatalog />
        </div>
      </section>
      <CtaBand title="Aradığınız ürünü bulamadınız mı? Listenizi gönderin." />
    </>
  );
}
