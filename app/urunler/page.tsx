import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductCatalog from "@/components/ProductCatalog";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Ürün Grupları – Teknik Hırdavat ve Fabrika Malzemeleri",
  description:
    "Bağlantı elemanları, çelik halat, kaldırma ekipmanları, el aletleri, kaynak makineleri, iş güvenliği, pnömatik ve pompa dahil 30 ürün grubu. Samsun Tekkeköy.",
  alternates: { canonical: "/urunler" },
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
