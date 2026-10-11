import { ArrowRight, BadgePercent, Boxes, ClipboardList, Forklift, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { CTA, PROMISES } from "@/data/company";

/*
 * "Kurumsal Fiyatlandırma ve Tedarik Standartlarımız" (#kurumsal-tedarik) — sunucu bileşeni.
 * Metinler işletme sahibinin brifinden birebir alındı. Sade: iki ilke + dört ambalaj/sevk rozeti + birincil eylem.
 */
const PRINCIPLES = [
  {
    icon: BadgePercent,
    title: "Temel ilkemiz",
    text: "Endüstriyel ürünlerimizde standart liste fiyatları yerine; malzeme çeşitliliğine ve tonaj/koli hacmine göre kurumsal iskonto matrisi uygulanır.",
  },
  {
    icon: Truck,
    title: "Lojistik ilkemiz",
    text: "Sanayi kuruluşlarının koli ve palet bazlı siparişlerini, Türkiye'nin organize sanayi bölgelerine kurumsal lojistik standartlarıyla sevk ediyoruz.",
  },
];

const BADGES = [
  { icon: Boxes, label: "Koli & Kutu Bazlı Sevk" },
  { icon: ShoppingBag, label: "Çuval & Endüstriyel Paket" },
  { icon: Forklift, label: "Çemberli Palet Sevkiyatı" },
  { icon: PackageCheck, label: "Orijinal Fabrika Ambalajı" },
];

export default function PricingLogistics() {
  return (
    <section id="kurumsal-tedarik" aria-labelledby="kurumsal-tedarik-baslik" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          id="kurumsal-tedarik-baslik"
          eyebrow="Kurumsal tedarik"
          title="Kurumsal Fiyatlandırma ve Tedarik Standartlarımız"
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="min-w-0">
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-canvas p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                  <p.icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-navy sm:text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {BADGES.map((b) => (
            <li
              key={b.label}
              className="group flex min-h-[64px] items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md sm:px-4"
            >
              <b.icon className="h-6 w-6 shrink-0 text-accent-ink transition-colors group-hover:text-navy" aria-hidden />
              <span className="text-sm font-semibold leading-snug text-ink">{b.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <RfqTriggerButton source="kurumsal_tedarik" className="btn-action min-h-[52px] w-full px-7 text-base sm:w-auto">
            <ClipboardList className="h-5 w-5" aria-hidden />
            <span>{CTA.primary}</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </RfqTriggerButton>
          <p className="text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
        </div>
      </div>
    </section>
  );
}
