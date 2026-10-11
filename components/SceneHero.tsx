import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowRight, Clock, ClipboardList, ShieldCheck, Store, Truck, Wrench } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import HeroVideo from "./home/HeroVideo";
import HeroSearchButton from "./home/HeroSearchButton";
import { CTA, HARDWARE_GROUPS, HOURS_SHORT, PROMISES } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

/*
 * Ana sayfa karşılama bölümü (sunucu bileşeni).
 * - LCP: poster görseli (next/image, priority). Yatay ekranda geniş kırpım, dikeyde portre.
 * - Video yalnızca sayfa yüklendikten sonra yüklenir (components/home/HeroVideo.tsx).
 * - Bu bölümü <Reveal> ile SARMALAMAYIN.
 *
 * Dosyalar /videos altında 1 yıl "immutable" önbelleklenir: içerik değişirse yeni dosya adı verin.
 */
const WIDE_MEDIA = "(min-width: 768px) and (orientation: landscape)";
const VIDEO = {
  wide: "/videos/hero-drone-wide-1080.mp4",
  portrait: "/videos/hero-drone-540.mp4",
};
const POSTER = {
  wide: "/videos/hero-poster-wide-1080.jpg",
  portrait: "/videos/hero-poster-portrait-720.jpg",
};

export default function SceneHero() {
  // Arka plan görseli dekoratiftir (alt=""); koyu degrade metnin okunurluğunu sağlar.
  const posterBase = { alt: "", fill: true, priority: true, sizes: "100vw", quality: 60 } as const;
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...posterBase, src: POSTER.wide });
  const { props: portraitImg } = getImageProps({ ...posterBase, src: POSTER.portrait });

  const productCount = PRODUCT_GROUPS.length;

  const trust = [
    { icon: Truck, text: PROMISES.deliveryShort },
    { icon: ShieldCheck, text: "EN standart kodları açıkça yazılı" },
    { icon: Store, text: "Tekkeköy'de fiziki mağaza" },
    { icon: Wrench, text: `${HARDWARE_GROUPS.length} ürün grubunda teknik hırdavat` },
  ];

  return (
    <section
      aria-labelledby="hero-baslik"
      className="relative isolate flex min-h-[calc(100svh-72px)] flex-col justify-end overflow-hidden bg-slate-950 pb-8 pt-20 sm:pb-14 lg:pb-16"
    >
      {/* LCP: poster (yön değişince doğru kırpım) */}
      <picture>
        <source media={WIDE_MEDIA} srcSet={wideSrcSet} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...portraitImg} alt="" className="-z-30 object-cover object-center" />
      </picture>

      <HeroVideo wideSrc={VIDEO.wide} portraitSrc={VIDEO.portrait} wideMedia={WIDE_MEDIA} />

      {/* Okunurluk için degrade katmanları */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent md:block"
      />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Fabrika, şantiye ve atölyeler için
          </p>

          <h1
            id="hero-baslik"
            className="mt-4 text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Samsun&apos;dan toptan{" "}
            <span className="bg-gradient-to-r from-sky-300 via-emerald-200 to-white bg-clip-text text-transparent">
              iş eldiveni, koruyucu tulum
            </span>{" "}
            ve teknik hırdavat
          </h1>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-200 sm:text-lg">
            {productCount} FABA iş güvenliği ürününde koli bazında toptan teklif veriyoruz. Listenizi gönderin,
            firmanıza özel fiyat e-postanıza gelsin.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
            <RfqTriggerButton className="btn-action min-h-[52px] w-full px-7 text-base shadow-xl shadow-black/30 sm:w-auto">
              <ClipboardList className="h-5 w-5" aria-hidden />
              <span>{CTA.primary}</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </RfqTriggerButton>
            <Link
              href="/urunler"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/20 sm:w-auto"
            >
              {CTA.browse}
            </Link>
          </div>

          <ul className="mt-3 flex flex-col gap-1 text-xs text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
              {PROMISES.quoteReassurance}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
              {PROMISES.quoteShort} (mesai: {HOURS_SHORT})
            </li>
          </ul>

          <div className="mt-5">
            <HeroSearchButton />
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-white/15 pt-5 text-xs text-slate-200 sm:mt-8 sm:text-sm lg:grid-cols-4">
          {trust.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-2">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
