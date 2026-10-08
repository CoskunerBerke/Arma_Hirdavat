import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import ProductItemsSelector from "@/components/ProductItemsSelector";
import ProductRfqBox from "@/components/ProductRfqBox";
import Reveal from "@/components/Reveal";
import { COMPANY } from "@/data/company";
import { PRODUCT_GROUPS, getProduct, getRelated } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_GROUPS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} – Samsun`,
    description: `${p.description} Arma Hırdavat, Tekkeköy / Samsun.`,
    alternates: { canonical: `/urunler/${p.slug}` },
    openGraph: { title: `${p.title} | Arma Hırdavat`, description: p.description, images: [{ url: p.image }] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = getRelated(p);

  return (
    <>
      <PageHero
        eyebrow={p.category}
        title={p.title}
        description={p.description}
        crumbs={[
          { label: "Ürünler", href: "/urunler" },
          { label: p.title, href: `/urunler/${p.slug}` },
        ]}
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="glass mx-auto max-w-[620px] p-3">
              <div className="photo-well aspect-[4/5]">
                <Image src={p.image} alt={`${p.title} ürün görselleri`} fill priority sizes="(min-width:1024px) 680px, 92vw" className="object-contain p-4" />
              </div>
            </div>

            <div className="mt-8">
              <ProductItemsSelector productTitle={p.title} productSlug={p.slug} items={p.items} />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={80}>
            {/* Hacimli Teklif Kutusu (RFQ) - Koli / Palet / Tesis Ambalajı */}
            <ProductRfqBox product={p} />

            <div className="surface mt-6 p-5">
              <h3 className="text-sm font-semibold text-ink">Doğrudan İletişim & Danışma</h3>
              <div className="mt-3 space-y-2 text-sm">
                <a href={COMPANY.phones[0].href} className="flex items-center gap-2.5 text-ink-soft hover:text-brand">
                  <Phone className="h-4 w-4 text-brand" aria-hidden /> {COMPANY.phones[0].label}
                </a>
                <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Teklif talebi – ${p.title}`)}`} className="flex items-center gap-2.5 text-ink-soft hover:text-brand">
                  <Mail className="h-4 w-4 text-brand" aria-hidden /> {COMPANY.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section border-t border-line pt-16">
          <div className="container-x">
            <h2 className="text-2xl font-bold tracking-tight text-ink">Aynı kategorideki diğer gruplar</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
