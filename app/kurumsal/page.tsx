import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  Mail,
  MessageSquareText,
  Navigation,
  Truck,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import MapEmbed from "@/app/iletisim/MapEmbed";
import {
  CLIENT_REFERENCES,
  COMPANY,
  HOURS_TEXT,
  PROMISES,
  SITE_URL,
  mailtoHref,
} from "@/data/company";

const PATH = "/kurumsal";
const TITLE = "Hakkımızda – Endüstriyel Tedarik";
const DESCRIPTION = `${COMPANY.name}: fabrikalara, şantiyelere ve imalat hatlarına teknik hırdavat, endüstriyel sarf ve iş güvenliği tedariki. Merkez: Samsun Tekkeköy.`;

const { street, district, city } = COMPANY.address;
const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${COMPANY.name}, ${street}, ${district}, ${city}`);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: PATH,
    title: `${TITLE} | ${COMPANY.name}`,
    description: DESCRIPTION,
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name} – hakkımızda` }],
  },
};

/** Beyaz (koyu zemin için hazırlanmış) logolar: açık kartta görünsün diye renkleri ters çevrilir. */
const LIGHT_LOGOS: ReadonlySet<string> = new Set(["/images/clients/sampa.png"]);

const FACTS: { term: string; value: string }[] = [
  { term: "Unvan", value: COMPANY.legalName },
  { term: "Mağaza ve depo", value: COMPANY.address.full },
  { term: "Web sitemiz", value: `${COMPANY.onlineSince} yılından beri yayında` },
  {
    term: "Ürün kapsamı",
    value: "Bağlantı elemanı, hortum, pompa, vana, kesici taş, el aletleri, kaynak malzemeleri ve FABA iş güvenliği ürünleri",
  },
  { term: "Satış", value: `${COMPANY.minOrderType}; mağazada perakende` },
  { term: "Sevkiyat", value: PROMISES.deliveryShort },
];

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Talebinizi iletin",
    text: `Ürünleri teklif listesine ekleyin, formu doldurun ya da ${COMPANY.email} adresine yazın. Üyelik gerekmez.`,
  },
  {
    icon: ClipboardList,
    title: "Teklifinizi alın",
    text: `${PROMISES.quoteTurnaround} Teklifiniz e-postanıza gelir; fiyat, ambalaj ve sevkiyat koşulları teklifte yazılıdır.`,
  },
  {
    icon: Truck,
    title: "Sevkiyat veya mağazadan teslim",
    text: `${PROMISES.delivery} Dilerseniz siparişinizi Tekkeköy mağazamızdan teslim alabilirsiniz.`,
  },
  {
    icon: FileCheck2,
    title: "Belgeler",
    text: `${PROMISES.documentation} FABA ürün kataloğunu PDF olarak da indirebilirsiniz.`,
  },
];

export default function CorporatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}${PATH}#webpage`,
    url: `${SITE_URL}${PATH}`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#store` },
    mainEntity: { "@id": `${SITE_URL}/#store` },
  };

  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title={`${COMPANY.name}: fabrikalara ve sanayi tesislerine kurumsal tedarik`}
        description="Fabrikaların, şantiyelerin ve imalat hatlarının ihtiyaç duyduğu teknik hırdavat, endüstriyel sarf ve iş güvenliği malzemelerini koli ve palet bazında tedarik ediyoruz. Merkez mağazamız Samsun Tekkeköy'dedir."
        crumbs={[{ label: "Kurumsal", href: PATH }]}
      />

      {/* Biz kimiz (ekranın üst kısmı: Reveal yok) */}
      <section className="section pt-12 sm:pt-16" aria-labelledby="biz-kimiz">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-5 text-base leading-[1.75] text-ink-soft sm:text-[17px] lg:col-span-7">
            <h2 id="biz-kimiz" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Biz kimiz?
            </h2>
            <p>
              <strong className="font-semibold text-ink">{COMPANY.legalName}</strong>, fabrikalara ve sanayi tesislerine
              teknik hırdavat, endüstriyel sarf ve iş güvenliği malzemesi tedarik eden bir kurumsal tedarikçidir. Merkez
              mağaza ve depomuz Samsun Tekkeköy&apos;dedir. Web sitemiz {COMPANY.onlineSince}{" "}
              yılından beri yayında.
            </p>
            <p>
              Mağazamızda bağlantı elemanlarından el ve elektrikli aletlere, kaynak ekipmanlarından hortum ve aşındırıcılara
              kadar geniş bir endüstriyel malzeme yelpazesi bulunur. Online kataloğumuzda ise FABA marka iş eldivenleri,
              kimyasal koruyucu ve tek kullanımlık tulumlar, önlük, kolluk ve galoşlar yer alır.
            </p>
            <p>
              Fabrikaların satın alma birimleri, iş güvenliği uzmanları, şantiye şefleri ve atölyeler için koli ve palet
              bazında kurumsal teklif hazırlıyoruz. Tekkeköy mağazamızda ise perakende satış yapıyoruz.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Link href="/urun-gruplari" className="btn-ghost min-h-[48px] px-5">
                Teknik hırdavat ürün grupları <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/urunler" className="btn-ghost min-h-[48px] px-5">
                İş güvenliği ürünleri <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="surface p-6 lg:col-span-5">
            <h2 className="text-base font-semibold text-ink">Kısaca {COMPANY.name}</h2>
            <dl className="mt-4 divide-y divide-line text-sm">
              {FACTS.map((f) => (
                <div key={f.term} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="font-medium text-ink-muted">{f.term}</dt>
                  <dd className="text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Nasıl çalışırız */}
      <section className="section border-y border-line bg-white" aria-labelledby="nasil-calisiriz">
        <div className="container-x">
          <p className="eyebrow">Çalışma şeklimiz</p>
          <h2 id="nasil-calisiriz" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Nasıl çalışırız?
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="surface flex flex-col p-6">
                <span className="icon-tile">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  <span className="text-brand">{i + 1}.</span> {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-soft">
            FABA kataloğu için{" "}
            <Link href="/katalog" className="font-medium text-brand underline-offset-2 hover:underline">
              katalog sayfasına
            </Link>{" "}
            bakın.
          </p>
        </div>
      </section>

      {/* Referanslar (sade, bağlantısız logolar) */}
      {CLIENT_REFERENCES.length > 0 && (
        <section className="section" aria-labelledby="referanslar">
          <div className="container-x">
            <p className="eyebrow">Referanslar</p>
            <h2 id="referanslar" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Tedarik sağladığımız firmalardan bazıları
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {CLIENT_REFERENCES.map((c) => (
                <li key={c.name} className="surface flex flex-col items-center justify-center gap-3 p-5 text-center">
                  <div className="relative h-12 w-full">
                    <Image
                      src={c.logo}
                      alt={`${c.name} logosu`}
                      fill
                      sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
                      unoptimized={c.logo.endsWith(".svg")}
                      className={`object-contain opacity-80 grayscale ${LIGHT_LOGOS.has(c.logo) ? "invert" : ""}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-ink-soft">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Misyon / vizyon */}
      <section className="section border-y border-line bg-white" aria-label="Misyon ve vizyon">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <div className="surface p-6 sm:p-8">
            <h2 className="eyebrow">Misyonumuz</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Fabrikaların, şantiyelerin ve atölyelerin ihtiyaç duyduğu teknik hırdavat ve iş güvenliği malzemesini doğru
              ürün, açık teklif ve planlı sevkiyatla sağlamak.
            </p>
          </div>
          <div className="surface p-6 sm:p-8">
            <h2 className="eyebrow">Vizyonumuz</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Türkiye&apos;nin dört bir yanındaki sanayi tesislerinin güvenle çalıştığı tedarikçilerden biri olmak.
            </p>
          </div>
        </div>
      </section>

      {/* Konum */}
      <section className="section" aria-labelledby="konum">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="eyebrow">Konum</p>
            <h2 id="konum" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {district} mağaza ve depomuz
            </h2>
            <address className="mt-4 not-italic text-base leading-relaxed text-ink-soft">{COMPANY.address.full}</address>
            <p className="mt-2 text-sm text-ink-muted">{HOURS_TEXT}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[48px] px-5">
                <Navigation className="h-4 w-4" aria-hidden /> Yol tarifi al
              </a>
              <Link href="/iletisim" className="btn-ghost min-h-[48px] px-5">
                İletişim <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="surface overflow-hidden lg:col-span-8">
            <MapEmbed
              src={COMPANY.mapEmbed}
              title={`${COMPANY.name} konumu – ${district}, ${city}`}
              className="h-[280px] sm:h-[340px]"
            />
          </div>
        </div>
      </section>

      {/* Kariyer */}
      <section className="container-x pb-12 sm:pb-16" id="kariyer" aria-labelledby="kariyer-baslik">
        <div className="surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 id="kariyer-baslik" className="text-lg font-semibold text-ink">
              Kariyer
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Ekibimize katılmak isterseniz özgeçmişinizi e-postayla gönderebilirsiniz. Tüm başvuruları gizlilikle
              değerlendiririz.
            </p>
          </div>
          <a href={mailtoHref("İş başvurusu")} className="btn-ghost min-h-[48px] shrink-0 px-5">
            <Mail className="h-4 w-4" aria-hidden /> {COMPANY.email}
          </a>
        </div>
      </section>

      {/* Kapanış CTA */}
      <section className="container-x pb-20 sm:pb-24" aria-labelledby="cta-baslik">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1B2D] via-[#0B1528] to-[#003EA8] p-8 shadow-xl sm:p-12">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 id="cta-baslik" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                İhtiyaç listenizi gönderin, teklifinizi hazırlayalım.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{PROMISES.quoteTurnaround}</p>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:items-start lg:items-end">
              <RfqTriggerButton mode="open" source="kurumsal-1" className="btn-action min-h-[48px] px-7" />
              <p className="text-center text-xs text-slate-300 sm:text-left lg:text-right">{PROMISES.quoteReassurance}</p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
