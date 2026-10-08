import Link from "next/link";
import { ArrowRight, Boxes, Building2, ClipboardList, Receipt, ShieldCheck } from "lucide-react";
import SceneHero from "@/components/SceneHero";
import ProductCard from "@/components/ProductCard";
import ReviewsRiver from "@/components/ReviewsRiver";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import RfqTriggerButton from "@/components/RfqTriggerButton";
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

      {/* Endüstriyel B2B Tedarik ve Perakende Ayrımı Bilgilendirme Bandı */}
      <section className="container-x pt-10 pb-4 sm:pt-14 sm:pb-6" aria-label="Endüstriyel Tedarik ve Tesis Malzemeleri B2B Portalı">
        <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-sm ring-1 ring-black/[0.04] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-brand sm:flex">
                <Boxes className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-md bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                  PERAKENDE VE KURUMSAL AYRIMI
                </div>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Endüstriyel Tedarik ve Tesis Malzemeleri B2B Portalı
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                  Sitemiz; üretim tesisleri, fabrikalar ve kurumsal işletmelerin yüksek hacimli malzeme ihtiyaçlarını karşılamak üzere kurgulanmıştır.
                </p>
                <div className="mt-3.5 rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5 text-xs leading-relaxed text-amber-900 sm:text-sm">
                  &ldquo;Bu portal üzerinden yalnızca kurumsal firmaların <strong>koli ve palet bazındaki yüksek hacimli teklif talepleri</strong> işleme alınır. Bireysel ve parça bazlı satışlarımız fiziki mağazamızda devam etmektedir.&rdquo;
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Koli / Palet / Tesis Ambalajı
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand" /> Kurumsal İskonto Matrisi
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> Fatura & Online E-Tahsilat
                  </span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <RfqTriggerButton className="btn-primary shadow-md">
                <ClipboardList className="h-4 w-4" />
                Teklif Sepeti (RFQ) İlet
              </RfqTriggerButton>
              <Link href="/iletisim" className="btn-ghost">
                İletişim & Konum
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
