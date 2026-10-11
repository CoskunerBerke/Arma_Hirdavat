import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowRight, ClipboardList, ShieldCheck } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import HeroVideo from "./home/HeroVideo";
import { CTA, PROMISES } from "@/data/company";

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
      {/* Okunurluk: yalnızca metnin olduğu alt-sol bölge koyulaşır; video aydınlık ve görünür kalır */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-950/60 via-transparent to-transparent md:block"
      />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <h1
            id="hero-baslik"
            className="text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl"
          >
            Samsun&apos;dan toptan{" "}
            <span className="bg-gradient-to-r from-sky-300 via-emerald-200 to-white bg-clip-text text-transparent">
              iş eldiveni, koruyucu tulum
            </span>{" "}
            ve teknik hırdavat
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-100 drop-shadow sm:text-lg">
            Listenizi gönderin, firmanıza özel fiyat e-postanıza gelsin.
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

          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-200 sm:text-sm">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
            {PROMISES.quoteReassurance}
          </p>
        </div>
      </div>
    </section>
  );
}
