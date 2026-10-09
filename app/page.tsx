import Link from "next/link";
import { ArrowRight, Boxes, Building2, ClipboardList, Receipt, ShieldCheck } from "lucide-react";
import SceneHero from "@/components/SceneHero";
import ProductCard from "@/components/ProductCard";
import ReviewsRiver from "@/components/ReviewsRiver";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import NationwideDeliveryBand from "@/components/NationwideDeliveryBand";
import FaqSection from "@/components/FaqSection";
import ProductActionVideo from "@/components/ProductActionVideo";
import ClientLogos from "@/components/ClientLogos";
import { BEST_SELLER_IDS, PRODUCT_GROUPS } from "@/data/products";

const BEST_SELLERS = BEST_SELLER_IDS.map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);

const VALUES = [
  {
    icon: ShieldCheck,
    title: "39 Profesyonel KKD & CE/EN Normları",
    text: "FABA resmi üretim kataloğundaki tüm iş eldivenleri ve kimyasal tulumlar; EN 388 mekanik, EN ISO 374 kimyasal ve Tip 3B/4B normlarına tam uygundur.",
  },
  {
    icon: Building2,
    title: "Samsun Tekkeköy Lojistik Üssü",
    text: "Adnan Kahveci Bulvarı lojistik depomuzdan Türkiye'nin 81 ilindeki organize sanayi bölgelerine ve şantiyelere doğrudan ambar sevkiyatı sağlıyoruz.",
  },
  {
    icon: Receipt,
    title: "2 Saatte Kurumsal Fiyat Teklifi",
    text: "Malzeme listenize göre en avantajlı fabrika iskonto oranlarıyla aynı gün resmi proforma teklif hazırlıyor, kurumsal e-fatura ile süreci hızlandırıyoruz.",
  },
];

export default function HomePage() {
  return (
    <>
      <SceneHero />

      {/* Çalıştığımız ve Tedarik Sağladığımız Öncü Sanayi Kuruluşları */}
      <ClientLogos />

      {/* Kurumsal B2B Tedarik, Hacimli Alım Avantajları ve Sahada Canlı Test Bandı */}
      <section id="canli-test" className="container-x pt-10 pb-4 sm:pt-14 sm:pb-6 scroll-mt-24" aria-label="Endüstriyel Tedarik ve Tesis Malzemeleri B2B Portalı">
        <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-sm ring-1 ring-black/[0.04] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Sol Taraf: B2B Avantajları ve İskonto Açıklaması */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-action">
                <ShieldCheck className="h-3.5 w-3.5 text-action" />
                KURUMSAL B2B AYRICALIKLARI
              </div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl">
                Sanayi ve Tesisler İçin Doğrudan Fabrika İskontosu
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                Bu portal; fabrikalar, üretim tesisleri ve kurumsal şantiyelerin <strong>koli ve palet ölçeğindeki</strong> yüksek hacimli malzeme ihtiyaçlarını en rekabetçi toptan fiyatlarla karşılamak üzere kurgulanmıştır.
              </p>
              <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-xs leading-relaxed text-slate-800 sm:text-sm">
                &ldquo;Teklif listenize eklediğiniz her ürün grubu için alım hacminize göre <strong>fabrika iskonto matrisi</strong> uygulanır ve resmi proforma teklif belgesi hazırlanarak tarafınıza iletilir.&rdquo;
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-ink-muted">
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-action" /> Koli & Palet Fabrika Ambalajı
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Kurumsal İskonto Avantajı
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-action" /> Resmi E-Fatura & Hızlı Sevkiyat
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <RfqTriggerButton className="btn-action shadow-md">
                  <ClipboardList className="h-4 w-4" />
                  Hızlı Fiyat Teklifi Al
                </RfqTriggerButton>
                <Link href="/urunler" className="btn-ghost">
                  Toptan Ürünleri İncele
                </Link>
              </div>
            </div>

            {/* Sağ Taraf: Google Flow ile Üretilen Canlı Ürün Performans Videosu */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px]">
                <ProductActionVideo />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Türkiye Geneli 81 İl Lojistik ve Sevkiyat Ağı */}
      <NationwideDeliveryBand />

      {/* En çok satanlar — 5 grup, tamamı kendi sayfasında */}
      <section className="section" aria-labelledby="best-sellers">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">En çok satanlar</p>
              <h2 id="best-sellers" className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink lg:text-4xl">
                En çok tercih edilen profesyonel ürünlerimiz
              </h2>
              <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-ink-soft">
                FABA iş eldivenleri, mikro köpük nitril, Seviye D kesilmeye dirençli eldivenler, Zevahir kaynak eldivenleri ve Tip 3B/4B kimyasal tulumlar; sanayide en sık talep edilen KKD ürünleri.
              </p>
            </div>
            <Link href="/urunler" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover">
              Tüm 39 ürünü inceleyin <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <ul className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {BEST_SELLERS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 50} className="min-w-0">
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
            <p className="eyebrow">Neden Arma Hırdavat?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Endüstriyel Tedariği Güvenceye Alıyoruz.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Fabrika ve tesislerin iş güvenliği ekipmanı ihtiyaçlarını doğrudan yetkili kaynaktan, koli ve palet bazında en avantajlı kurumsal maliyetle çözüyoruz.
            </p>
            <Link href="/kurumsal" className="btn-ghost mt-6">
              Kurumsal Profilimiz <ArrowRight className="h-4 w-4" aria-hidden />
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

      {/* Sıkça Sorulan Sorular & FAQPage Schema */}
      <FaqSection />

      <CtaBand />
    </>
  );
}
