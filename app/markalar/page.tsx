import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { BRANDS } from "@/data/company";

export const metadata: Metadata = {
  title: "Markalar – Domak, Sufil, İzeltaş, 3M, Pakkens",
  description: "Arma Hırdavat ürün gamında yer alan markalar: Domak pompa, Doğan Makina, Sufil, İzeltaş el aletleri, 3M iş güvenliği ve Pakkens pnömatik ürünleri.",
  alternates: { canonical: "/markalar" },
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Markalar"
        title="Ürün gamımızdaki markalar"
        description="Sektörün tanınmış üreticilerinin ürünlerini tek noktada sunuyoruz."
        crumbs={[{ label: "Markalar", href: "/markalar" }]}
      />

      <section className="section">
        <ul className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b, i) => (
            <Reveal as="li" key={b.name} delay={(i % 3) * 70} className="surface flex flex-col p-4">
              <div className="photo-well flex h-32 items-center justify-center">
                {b.logo ? (
                  <Image src={b.logo} alt={`${b.name} logosu`} width={220} height={90} className="h-16 w-auto object-contain" />
                ) : (
                  <span className="text-2xl font-black tracking-wide text-ink">{b.name.toLocaleUpperCase("tr-TR")}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <h2 className="text-base font-semibold text-ink">{b.name}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{b.desc}</p>
                {b.url && (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand hover:text-brand">
                    Web sitesi <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
