import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductCatalog from "@/components/ProductCatalog";
import CtaBand from "@/components/CtaBand";
import { SITE_URL } from "@/data/company";

export const metadata: Metadata = {
  title: "Toptan Teknik Hırdavat ve Fabrika Malzemeleri | 81 İl Sevkiyat - Arma Hırdavat",
  description:
    "30 ürün grubunda koli ve palet bazlı toptan teknik hırdavat satışı. Bağlantı elemanları, çelik halat, el aletleri, kaynak, iş güvenliği ve pompa ürünlerinde Türkiye geneli 81 ile ambar teslimatı. Özel iskonto teklifi alın.",
  keywords: [
    "toptan teknik hırdavat ürünleri",
    "toptan fabrika malzemeleri kataloğu",
    "81 il hırdavat toptan satışı",
    "koli palet teknik hırdavat",
    "toptan sanayi malzemeleri"
  ],
  alternates: { canonical: "/urunler" },
  openGraph: {
    title: "Toptan Teknik Hırdavat ve Fabrika Malzemeleri | 81 İl Sevkiyat - Arma Hırdavat",
    description: "30 ürün grubunda koli ve palet bazında toptan teknik hırdavat. Türkiye geneli fabrika ve şantiye sevkiyatı.",
    url: `${SITE_URL}/urunler`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ürün grupları"
        title="30 ürün grubunda teknik hırdavat"
        description="Aradığınız ürünü arayın veya kategoriye göre filtreleyin. Listede göremediğiniz ürünler için bize ulaşabilirsiniz."
        crumbs={[{ label: "Ürünler", href: "/urunler" }]}
      />
      <section className="section">
        <div className="container-x">
          <ProductCatalog />
        </div>
      </section>
      <CtaBand title="Aradığınız ürünü bulamadınız mı? Listenizi gönderin." />
    </>
  );
}
