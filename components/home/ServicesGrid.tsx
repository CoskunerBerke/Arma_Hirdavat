import Link from "next/link";
import { ArrowRight, FileText, Package, Truck, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { HARDWARE_GROUPS, PROMISES } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

/*
 * "Hizmetlerimiz" (#hizmetler) — kompakt ikonlu kartlar (sunucu bileşeni).
 * Perakende satış ayrı ve vurgulu bölümdedir (components/RetailStoreSection.tsx).
 */
const SERVICES = [
  {
    icon: Package,
    title: "Toptan satış (koli & palet)",
    text: `Online katalogdaki ${PRODUCT_GROUPS.length} üründe koli ve palet bazında firmanıza özel teklif.`,
    href: "/urunler",
    cta: "Ürünleri inceleyin",
  },
  {
    icon: Truck,
    title: "Türkiye geneli sevkiyat",
    text: `${PROMISES.deliveryShort.charAt(0).toUpperCase()}${PROMISES.deliveryShort.slice(1)}. Nakliye koşulları teklifte yazılır.`,
    href: "/#kurumsal-tedarik",
    cta: "Tedarik standartlarımız",
  },
  {
    icon: Wrench,
    title: "Teknik hırdavat tedariki",
    text: `Bağlantı elemanından kaynak ekipmanına ${HARDWARE_GROUPS.length} ürün grubunda tedarik.`,
    href: "/urun-gruplari",
    cta: "Ürün grupları",
  },
  {
    icon: FileText,
    title: "Ürün belgeleri ve katalog",
    text: "EN standart kodları ürün sayfalarında; üretici kataloğu ücretsiz PDF.",
    href: "/katalog",
    cta: "Kataloğu açın",
  },
];

export default function ServicesGrid() {
  return (
    <section id="hizmetler" aria-labelledby="hizmetler-baslik" className="scroll-mt-24 bg-canvas py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading
          id="hizmetler-baslik"
          eyebrow="Hizmetlerimiz"
          title="Mağazadan fabrikaya tedarik hizmetlerimiz"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className="min-w-0">
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-amber-300 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-navy">
                  <s.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                  {s.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
