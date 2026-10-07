import Link from "next/link";
import { ArrowRight, Boxes, Building2, Receipt } from "lucide-react";
import SceneHero from "@/components/SceneHero";
import ProductCard from "@/components/ProductCard";
import ReviewsRiver from "@/components/ReviewsRiver";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { BEST_SELLER_IDS, PRODUCT_GROUPS } from "@/data/products";

const BEST_SELLERS = BEST_SELLER_IDS.map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);

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

      {/* B2B Kurumsal & Toptan Çözümler Bandı */}
      <section className="relative z-20 -mt-10 sm:-mt-12 container-x" aria-label="Kurumsal B2B çözümleri">
        <Reveal className="rounded-2xl border border-line-strong/70 bg-white p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(15,27,45,0.18)] ring-1 ring-black/[0.04]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand">
                  B2B & KURUMSAL TEDARİK
                </div>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Yalnızca Toptan ve Endüstriyel Çözümler
                </h2>
                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">
                  B2B portalımız üzerinden firmanıza özel hacimli alım tekliflerinizi iletebilir, kurumsal iskonto avantajlarımızdan yararlanabilirsiniz.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link href="/iletisim" className="btn-primary shadow-lg shadow-brand/20 whitespace-nowrap">
                Kurumsal Teklif İste <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* En çok satanlar — 5 grup, tamamı kendi sayfasında */}
      <section className="section" aria-labelledby="best-sellers">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">En çok satanlar</p>
              <h2 id="best-sellers" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                En çok tercih edilen ürün gruplarımız
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Eldivenden hortuma, İzeltaş el aletlerinden matkap uçlarına ve kesme-taşlama taşlarına; sahada en sık ihtiyaç duyulan ürünler.
              </p>
            </div>
            <Link href="/urunler" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover">
              Tüm 30 grubu görün <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {BEST_SELLERS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Değer önerisi — üç madde */}
      <section className="section border-y border-line bg-gradient-to-b from-white to-canvas">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Neden Arma?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Tedariği sadeleştiriyoruz.</h2>
            <Link href="/kurumsal" className="btn-ghost mt-8">
              Kurumsal <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="surface p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-brand-50">
                  <v.icon className="h-5 w-5 text-brand" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
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
