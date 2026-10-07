import Link from "next/link";
import { ArrowRight, Boxes, Building2, Receipt } from "lucide-react";
import SceneHero from "@/components/SceneHero";
import ProductCard from "@/components/ProductCard";
import ReviewsRiver from "@/components/ReviewsRiver";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PRODUCT_GROUPS } from "@/data/products";

const HOME_PRODUCTS = [2, 5, 13, 18, 19, 28].map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);

const VALUES = [
  {
    icon: Boxes,
    title: "30 ürün grubu, tek tedarikçi",
    text: "Bağlantı elemanından pompaya, kaynaktan iş güvenliğine kadar ihtiyaçlarınızı farklı firmalarla uğraşmadan tek noktadan karşılayın.",
  },
  {
    icon: Building2,
    title: "Sanayinin içinde, Tekkeköy'de",
    text: "Adnan Kahveci Bulvarı üzerindeki konumumuzla Samsun ve çevresindeki fabrika, atölye ve şantiyelere yakınız.",
  },
  {
    icon: Receipt,
    title: "Kurumsal alım kolaylığı",
    text: "İhtiyaç listenize göre teklif hazırlıyor, kurumsal faturalandırma ve online tahsilat ile süreci sadeleştiriyoruz.",
  },
];

export default function HomePage() {
  return (
    <>
      <SceneHero />

      {/* Ürün önizleme — yalnızca 6 grup, tamamı kendi sayfasında */}
      <section className="section">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Ürün grupları</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Sanayinin ihtiyaç duyduğu her şey</h2>
            </div>
            <Link href="/urunler" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-soft hover:text-white">
              Tüm 30 grubu görün <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_PRODUCTS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Değer önerisi — üç madde */}
      <section className="section border-y border-white/[0.06] bg-ink-950/40">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Neden Arma?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Tedariği sadeleştiriyoruz.</h2>
            <Link href="/kurumsal" className="btn-ghost mt-8">
              Kurumsal <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="surface p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <v.icon className="h-5 w-5 text-brand-soft" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewsRiver />
      <CtaBand />
    </>
  );
}
