import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  ArrowRight,
  Bolt,
  Cable,
  CircleDot,
  Clock,
  Construction,
  Cylinder,
  Disc,
  Disc3,
  Drill,
  Droplets,
  Fan,
  Flame,
  FlaskConical,
  Gauge,
  Hammer,
  Hand,
  HardHat,
  Mail,
  MapPin,
  Nut,
  Package,
  Plug,
  Ruler,
  Scissors,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Truck,
  Waves,
  Waypoints,
  Weight,
  Wind,
  Wrench,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import GroupQuoteButton from "./GroupQuoteButton";
import {
  BRANDS,
  COMPANY,
  HARDWARE_GROUPS,
  HOURS_SHORT,
  HOURS_TEXT,
  PROMISES,
  SITE_URL,
  mailtoHref,
} from "@/data/company";
import { PRODUCT_GROUPS, slugify } from "@/data/products";

const PATH = "/urun-gruplari";
const TITLE = "Teknik Hırdavat Ürün Grupları – Samsun";
const DESCRIPTION = `Tekkeköy, Samsun'da teknik hırdavat: bağlantı elemanı, el aleti, kaynak, hortum ve aşındırıcı dahil ${HARDWARE_GROUPS.length} ürün grubu. İhtiyacınızı yazın, teklif verelim.`;
const H1 = `Samsun Tekkeköy'de Teknik Hırdavat: ${HARDWARE_GROUPS.length} Ürün Grubu`;

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
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name} – teknik hırdavat ürün grupları` }],
  },
};

type HardwareGroup = (typeof HARDWARE_GROUPS)[number];

/** Grup simgeleri (eşleşmeyen grup Wrench ile gösterilir). */
const GROUP_ICONS: Partial<Record<HardwareGroup, LucideIcon>> = {
  "Bağlantı Elemanları": Nut,
  "Diğer Bağlantı Elemanları": Bolt,
  "Çelik Halat ve Gemi Halatı": Anchor,
  "Polyester Halat, Kaldırma ve İndirme Ekipmanları": Weight,
  "Havalı El Aletleri": Wind,
  "Elektrikli El Aletleri": Plug,
  "Vana, Flanş ve Boru Ek Parçaları": Waypoints,
  "Hortum Çeşitleri": Cable,
  "El Aletleri": Wrench,
  "İzeltaş El Aletleri": Hammer,
  "Eldiven Çeşitleri": Hand,
  "İş Güvenliği Ekipmanları": HardHat,
  "3M Ürünleri": ShieldCheck,
  "Ölçü Aletleri": Ruler,
  "Kaynak Makinaları": Flame,
  "Elektrot ve Gazaltı Kaynak Teli Ekipmanları": Sparkles,
  "Gaz ve Gaz Aletleri": Cylinder,
  "Pnömatik Ürünler (Pakkens)": Gauge,
  "Matkap Ucu, Kılavuz ve Pafta": Drill,
  "Testere, Profil Kesme, Karot ve Sarf Malzemeleri": Scissors,
  "Kesme ve Taşlama Taşları": Disc3,
  "Aşındırıcı Ürünler": Disc,
  "Yıkama ve Yağlama Ekipmanları": Droplets,
  "Kompresör ve Airless Boya Makinası": SprayCan,
  "Endüstriyel Kimyasallar ve Yapıştırıcılar": FlaskConical,
  "Sanayi Bantları ve Ambalaj Ürünleri": Package,
  "Aspiratör, Mengene, İşkence ve Boya Sarf Malzemeleri": Fan,
  "Sanayi Tekerleri": CircleDot,
  "Merdiven, İnşaat Makinaları ve İnşaat El Aletleri": Construction,
  "Domak Pompa ve Sufil Ürünleri": Waves,
};

/** Online katalogda karşılığı olan gruplar (FABA KKD ürünleri). */
const ONLINE_GROUPS: ReadonlySet<string> = new Set<HardwareGroup>(["Eldiven Çeşitleri", "İş Güvenliği Ekipmanları"]);

const brandsByGroup = (group: string) => BRANDS.filter((b) => b.group === group).map((b) => b.name);

/**
 * Gruplar taranabilir olsun diye 8 tematik başlık altında gösterilir.
 * HARDWARE_GROUPS'a yeni bir grup eklenirse ve burada yoksa "Diğer ürün grupları" altında çıkar.
 */
const CLUSTERS: { id: string; title: string; groups: HardwareGroup[] }[] = [
  {
    id: "baglanti-ve-halat",
    title: "Bağlantı elemanları ve halatlar",
    groups: [
      "Bağlantı Elemanları",
      "Diğer Bağlantı Elemanları",
      "Çelik Halat ve Gemi Halatı",
      "Polyester Halat, Kaldırma ve İndirme Ekipmanları",
    ],
  },
  {
    id: "aletler",
    title: "El aletleri ve elektrikli aletler",
    groups: [
      "El Aletleri",
      "İzeltaş El Aletleri",
      "Elektrikli El Aletleri",
      "Havalı El Aletleri",
      "Matkap Ucu, Kılavuz ve Pafta",
      "Ölçü Aletleri",
    ],
  },
  {
    id: "kesme-ve-asindirma",
    title: "Kesme, taşlama ve aşındırma",
    groups: ["Kesme ve Taşlama Taşları", "Aşındırıcı Ürünler", "Testere, Profil Kesme, Karot ve Sarf Malzemeleri"],
  },
  {
    id: "kaynak-ve-gaz",
    title: "Kaynak ve gaz",
    groups: ["Kaynak Makinaları", "Elektrot ve Gazaltı Kaynak Teli Ekipmanları", "Gaz ve Gaz Aletleri"],
  },
  {
    id: "tesisat-ve-pompa",
    title: "Tesisat, pompa ve basınçlı hava",
    groups: [
      "Vana, Flanş ve Boru Ek Parçaları",
      "Hortum Çeşitleri",
      "Domak Pompa ve Sufil Ürünleri",
      "Pnömatik Ürünler (Pakkens)",
      "Kompresör ve Airless Boya Makinası",
    ],
  },
  {
    id: "is-guvenligi",
    title: "İş güvenliği",
    groups: ["Eldiven Çeşitleri", "İş Güvenliği Ekipmanları", "3M Ürünleri"],
  },
  {
    id: "kimyasal-ve-sarf",
    title: "Kimyasal, bakım ve sarf malzemeleri",
    groups: [
      "Endüstriyel Kimyasallar ve Yapıştırıcılar",
      "Yıkama ve Yağlama Ekipmanları",
      "Sanayi Bantları ve Ambalaj Ürünleri",
      "Aspiratör, Mengene, İşkence ve Boya Sarf Malzemeleri",
    ],
  },
  {
    id: "atolye-ve-santiye",
    title: "Atölye ve şantiye ekipmanı",
    groups: ["Sanayi Tekerleri", "Merdiven, İnşaat Makinaları ve İnşaat El Aletleri"],
  },
];

function clusteredGroups() {
  const known = new Set<string>(HARDWARE_GROUPS);
  const used = new Set<string>();
  const out = CLUSTERS.map((c) => {
    const groups = c.groups.filter((g) => known.has(g) && !used.has(g));
    groups.forEach((g) => used.add(g));
    return { ...c, groups: groups as string[] };
  }).filter((c) => c.groups.length > 0);
  const rest = HARDWARE_GROUPS.filter((g) => !used.has(g));
  if (rest.length > 0) out.push({ id: "diger", title: "Diğer ürün grupları", groups: [...rest] });
  return out;
}

const BRAND_STRIP = BRANDS.filter((b) => b.logo).slice(0, 12);

const FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "Listede olmayan bir ürünü de sorabilir miyim?",
    a: "Evet. Teklif penceresine ürün adını, ölçüsünü ve miktarını yazın. Tedarik edebiliyorsak teklifte belirtiriz; edemiyorsak bunu da açıkça bildiririz.",
  },
  {
    q: "Fiyatlar neden sitede yazmıyor?",
    a: "Teknik hırdavatta fiyat; marka, ölçü, miktar ve güncel tedarik koşullarına göre değişir. Bu yüzden her talebe özel teklif hazırlıyoruz. Teklif ücretsizdir ve sizi bağlamaz.",
  },
  {
    q: "Az miktarda alım yapabilir miyim?",
    a: `Evet. Tekkeköy mağazamızdan perakende alım yapabilirsiniz (${HOURS_TEXT}). Kurumsal ve toptan alımlarda koli veya palet bazında teklif veriyoruz.`,
  },
  {
    q: "Ödemeyi nasıl yapabilirim?",
    a: "Ödeme koşulları teklifte belirtilir. Onaylanan siparişlerin ödemesi için online ödeme sayfamızı da kullanabilirsiniz.",
    link: { href: COMPANY.paymentUrl, label: "Online ödeme sayfası" },
  },
];

export default function HardwareGroupsPage() {
  const clusters = clusteredGroups();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${PATH}#webpage`,
    url: `${SITE_URL}${PATH}`,
    name: H1,
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#store` },
    mainEntity: {
      "@type": "ItemList",
      name: "Teknik hırdavat ürün grupları",
      numberOfItems: HARDWARE_GROUPS.length,
      itemListElement: HARDWARE_GROUPS.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g })),
    },
  };

  return (
    <>
      <PageHero
        eyebrow="Teknik hırdavat"
        title={H1}
        description="Tekkeköy'deki mağaza ve depomuzdan fabrikalara, şantiyelere ve atölyelere teknik hırdavat tedarik ediyoruz. Online katalogda FABA iş güvenliği ürünleri yer alır; aşağıdaki gruplar için ihtiyacınızı yazın, teklifle dönelim."
        crumbs={[{ label: "Teknik Hırdavat", href: PATH }]}
      />

      {/* Hızlı bilgiler + birincil eylem (ekranın üst kısmı: Reveal yok) */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-6 py-8 lg:grid-cols-12 lg:items-center">
          <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
            <li className="flex items-start gap-3">
              <span className="icon-tile">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm leading-snug">
                <strong className="block font-semibold text-ink">Mağaza ve depo</strong>
                <span className="text-ink-soft">
                  {COMPANY.address.district} / {COMPANY.address.city} · {HOURS_SHORT}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="icon-tile">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm leading-snug">
                <strong className="block font-semibold text-ink">{PROMISES.quoteShort}</strong>
                <span className="text-ink-soft">Mesai saatlerinde gelen taleplere</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="icon-tile">
                <Truck className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm leading-snug">
                <strong className="block font-semibold text-ink">Sevkiyat</strong>
                <span className="text-ink-soft">{PROMISES.deliveryShort}</span>
              </span>
            </li>
          </ul>
          <div className="flex flex-col gap-2 lg:col-span-4 lg:items-end">
            <RfqTriggerButton mode="open" source="urun-gruplari-1" className="btn-action min-h-[48px] w-full px-6 sm:w-auto" />
            <p className="text-center text-xs text-ink-muted sm:text-left lg:text-right">{PROMISES.quoteReassurance}</p>
          </div>
        </div>
      </section>

      {/* 30 ürün grubu (SSR liste; yalnızca düğmeler istemci adası) */}
      <section className="section" aria-labelledby="gruplar-baslik">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Mağaza ve tedarik</p>
              <h2 id="gruplar-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {HARDWARE_GROUPS.length} ürün grubu
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Her grupta farklı ölçü, kalite ve marka seçenekleri bulunur. Aradığınız ürünü, ölçüsünü ve miktarını yazın;
                uygun seçenekleri ve fiyatı teklifle iletelim.
              </p>
            </div>
            <Link
              href="/urunler"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              {PRODUCT_GROUPS.length} FABA iş güvenliği ürünü online <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <nav aria-label="Ürün grubu başlıkları" className="-mx-4 mt-8 sm:mx-0">
            <ul className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0">
              {clusters.map((c) => (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#${c.id}`}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {c.title}
                    <span className="text-xs text-ink-muted">{c.groups.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 space-y-12">
            {clusters.map((c) => (
              <div key={c.id} id={c.id} className="scroll-mt-28">
                <h3 className="text-lg font-bold text-ink sm:text-xl">{c.title}</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {c.groups.map((group) => {
                    const Icon = GROUP_ICONS[group as HardwareGroup] ?? Wrench;
                    const brands = brandsByGroup(group);
                    const online = ONLINE_GROUPS.has(group);
                    return (
                      <li
                        key={group}
                        id={slugify(group)}
                        className="surface flex scroll-mt-28 items-center gap-3 p-3 sm:gap-4 sm:p-4"
                      >
                        <span className="icon-tile hidden sm:inline-flex">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[15px] font-semibold leading-snug text-ink">{group}</h4>
                          {brands.length > 0 && (
                            <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{brands.join(", ")}</p>
                          )}
                          {online && (
                            <Link
                              href="/urunler"
                              className="mt-0.5 inline-flex min-h-[32px] items-center gap-1 text-xs font-semibold text-brand hover:underline"
                            >
                              FABA ürünleri online <ArrowRight className="h-3 w-3" aria-hidden />
                            </Link>
                          )}
                        </div>
                        <GroupQuoteButton group={group} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl teklif alınır */}
      <section className="section border-y border-line bg-white" aria-labelledby="nasil-baslik">
        <div className="container-x">
          <p className="eyebrow">Teklif süreci</p>
          <h2 id="nasil-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Üç adımda teklif
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            <li className="surface p-6">
              <span className="text-sm font-bold text-brand">1</span>
              <h3 className="mt-2 text-base font-semibold text-ink">İhtiyacınızı yazın</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Ürün adını, ölçü veya standardını (ör. DIN 933 M12) ve miktarını teklif penceresine yazın. Hazır bir listeniz
                varsa{" "}
                <a href={mailtoHref("Teklif talebi – teknik hırdavat")} className="font-medium text-brand underline-offset-2 hover:underline">
                  {COMPANY.email}
                </a>{" "}
                adresine de gönderebilirsiniz.
              </p>
            </li>
            <li className="surface p-6">
              <span className="text-sm font-bold text-brand">2</span>
              <h3 className="mt-2 text-base font-semibold text-ink">Teklifinizi alın</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {PROMISES.quoteTurnaround} Teklifiniz e-postanıza gelir.
              </p>
            </li>
            <li className="surface p-6">
              <span className="text-sm font-bold text-brand">3</span>
              <h3 className="mt-2 text-base font-semibold text-ink">Teslim alın ya da sevk edelim</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Siparişinizi Tekkeköy mağazamızdan teslim alabilirsiniz. {PROMISES.delivery}
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Çalıştığımız markalar */}
      <section className="section" aria-labelledby="markalar-baslik">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Markalar</p>
              <h2 id="markalar-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Çalıştığımız markalar
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Mağazamızda ve tedarik ağımızda yer alan markalardan bazıları.
              </p>
            </div>
            <Link
              href="/markalar"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Tüm markalar <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BRAND_STRIP.map((b) => (
              <li key={b.name} className="surface flex h-24 items-center justify-center p-3">
                <div className="relative h-full w-full">
                  <Image
                    src={b.logo as string}
                    alt={`${b.name} logosu`}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sık sorulanlar (itiraz giderme) */}
      <section className="section border-t border-line bg-white" aria-labelledby="sss-baslik">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Sık sorulanlar</p>
            <h2 id="sss-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Aklınıza takılanlar
            </h2>
          </div>
          <div className="divide-y divide-line rounded-2xl border border-line lg:col-span-8">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-ink-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {f.a}
                  {f.link && (
                    <>
                      {" "}
                      <a
                        href={f.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand underline-offset-2 hover:underline"
                      >
                        {f.link.label}
                      </a>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kapanış CTA */}
      <section className="container-x pb-20 pt-4 sm:pb-24" aria-labelledby="cta-baslik">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1B2D] via-[#0B1528] to-[#003EA8] p-8 shadow-xl sm:p-12">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 id="cta-baslik" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Aradığınız ürünü yazın, teklifinizi hazırlayalım.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{PROMISES.quoteTurnaround}</p>
              <a
                href={mailtoHref("Teklif talebi – teknik hırdavat")}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden /> {COMPANY.email}
              </a>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:items-start lg:items-end">
              <RfqTriggerButton mode="open" source="urun-gruplari-2" className="btn-action min-h-[48px] px-7" />
              <p className="text-center text-xs text-slate-300 sm:text-left lg:text-right">{PROMISES.quoteReassurance}</p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
