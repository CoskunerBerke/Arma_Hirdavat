import Link from "next/link";
import { ArrowRight, FileText, HardHat, Package, Store, Truck, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { PROMISES } from "@/data/company";

/*
 * "Hizmetlerimiz" (#hizmetler) — kompakt ikonlu kartlar (sunucu bileşeni).
 * Denge: endüstriyel malzeme ve FABA iş güvenliği eşit; kurumsal tedarik ve perakende birlikte.
 * Sayısal sınır (il / ürün / grup sayısı) yazılmaz (işletme kuralı).
 */
const SERVICES = [
  {
    icon: Package,
    title: "Koli ve palet bazında kurumsal tedarik",
    text: "Fabrikaların ve sanayi tesislerinin yüksek hacimli siparişleri için hacme göre kurumsal teklif.",
    href: "/#kurumsal-tedarik",
    cta: "Tedarik standartlarımız",
  },
  {
    icon: Wrench,
    title: "Endüstriyel malzeme tedariki",
    text: "Bağlantı elemanı, hortum, pompa, kesici taş ve el aletlerinde marka ve ölçü seçenekleriyle tedarik.",
    href: "/urun-gruplari",
    cta: "Ürün grupları",
  },
  {
    icon: HardHat,
    title: "İş güvenliği · FABA",
    text: "İş eldiveni, kimyasal koruyucu ve tek kullanımlık tulumlarda EN standartlı FABA ürünleri.",
    href: "/urunler",
    cta: "FABA ürünleri",
  },
  {
    icon: Truck,
    title: "Kurumsal sevkiyat",
    text: `${PROMISES.deliveryShort}. Nakliye koşulları ve tahmini teslim süresi teklifte yazılır.`,
    href: "/#kurumsal-tedarik",
    cta: "Lojistik ilkemiz",
  },
  {
    icon: Store,
    title: "Perakende satış – Tekkeköy mağazası",
    text: "Tekil parça, atölye ve bireysel teknik hırdavat ihtiyaçları için merkez mağazamızdan doğrudan alışveriş.",
    href: "/#fiziki-magaza",
    cta: "Mağaza bilgileri",
  },
  {
    icon: FileText,
    title: "E-Kataloglar ve teknik belgeler",
    text: "Üretici ve distribütör e-katalogları; EN standart kodları her ürün sayfasında.",
    href: "/katalog",
    cta: "E-Kataloglar",
  },
];

export default function ServicesGrid() {
  return (
    <section id="hizmetler" aria-labelledby="hizmetler-baslik" className="scroll-mt-24 bg-canvas py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading
          id="hizmetler-baslik"
          eyebrow="Hizmetlerimiz"
          title="Kurumsal tedarikten perakendeye hizmetlerimiz"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
