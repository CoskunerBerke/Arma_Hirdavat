import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
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
          </Reveal>

          <Reveal className="lg:col-span-5" delay={80}>
            <h2 className="text-xl font-semibold text-white">Bu grupta neler var?</h2>
            <ul className="mt-5 space-y-3">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[15px] text-fg">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-soft" aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-fg-muted">
              Ölçü, adet ve marka tercihlerinize göre stok durumu ve fiyat bilgisi için bize ulaşın.
            </p>

            <div className="surface mt-8 p-6">
              <h3 className="text-base font-semibold text-white">Teklif ve stok bilgisi</h3>
              <div className="mt-4 space-y-2.5 text-sm">
                <a href={COMPANY.phones[0].href} className="flex items-center gap-2.5 text-fg-soft hover:text-white">
                  <Phone className="h-4 w-4 text-brand-soft" aria-hidden /> {COMPANY.phones[0].label}
                </a>
                <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Teklif talebi – ${p.title}`)}`} className="flex items-center gap-2.5 text-fg-soft hover:text-white">
                  <Mail className="h-4 w-4 text-brand-soft" aria-hidden /> {COMPANY.email}
                </a>
              </div>
              <Link href={`/iletisim?urun=${p.slug}`} className="btn-accent mt-6 w-full">
                Bu grup için teklif isteyin <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section border-t border-white/[0.06] pt-16">
          <div className="container-x">
            <h2 className="text-2xl font-bold tracking-tight text-white">Aynı kategorideki diğer gruplar</h2>
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
