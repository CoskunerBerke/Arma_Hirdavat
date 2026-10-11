import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, LayoutGrid } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import HeroVideo from "./home/HeroVideo";
import { CTA } from "@/data/company";

/*
 * Ana sayfa karşılama bölümü (sunucu bileşeni) — yalnızca dron videolu hero (işletme kararı: KALDIRMAYIN).
 * - LCP: poster görseli (priority). Yatay ekranda geniş kırpım, dikeyde portre.
 * - Video yalnızca sayfa yüklendikten sonra yüklenir (components/home/HeroVideo.tsx), sürekli döner, düğme yoktur.
 * - Bu bölümü <Reveal> ile SARMALAMAYIN.
 *
 * Yükseklik (.hero-box, app/globals.css): masaüstünde referans logo şeridi ilk ekranda görünsün diye
 * ekran − başlık − ~170px (en az 460px; kısa ekranda 400px). Mobilde daha uzun kalabilir.
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

/** Hero kutusu: alttan hizalı içerik (yükseklik .hero-box sınıfından) */
const SLIDE_BOX =
  "hero-box relative isolate flex w-full flex-col justify-end overflow-hidden pb-10 pt-16 lg:pb-12 lg:pt-12 [@media(max-height:500px)]:pb-8 [@media(max-height:500px)]:pt-6";
const SLIDE_INNER = "container-x relative";

/** Teklif güven rozetleri (işletme sahibinin brifinden) */
const TRUST_BADGES = ["Resmi Teknik Teklif Hazırlığı", "Bağlayıcı Değildir", "Üyelik Gerekmez"];


export default function SceneHero() {
  // Yalnızca dron videolu hero (işletme tercihi: yana kaydırmalı slayt yok)
  return (
    <section aria-labelledby="hero-baslik" className="relative isolate overflow-hidden bg-slate-950">
      <DroneSlide />
    </section>
  );
}

/** Dron videolu hero: başlık, açıklama, teklif düğmeleri ve güven rozetleri */
function DroneSlide() {
  // Arka plan görseli dekoratiftir (alt=""); koyu degrade metnin okunurluğunu sağlar.
  const posterBase = { alt: "", fill: true, priority: true, sizes: "100vw", quality: 60 } as const;
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...posterBase, src: POSTER.wide });
  const { props: portraitImg } = getImageProps({ ...posterBase, src: POSTER.portrait });

  return (
    <div className={`${SLIDE_BOX} bg-slate-950`}>
      {/* LCP: poster (yön değişince doğru kırpım) */}
      <picture>
        <source media={WIDE_MEDIA} srcSet={wideSrcSet} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...portraitImg} alt="" className="-z-30 object-cover object-center" />
      </picture>

      <HeroVideo wideSrc={VIDEO.wide} portraitSrc={VIDEO.portrait} wideMedia={WIDE_MEDIA} />

      {/* Okunurluk: yalnızca metnin olduğu alt-sol bölge koyulaşır; video aydınlık ve görünür kalır */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-950/60 via-transparent to-transparent md:block"
      />

      <div className={SLIDE_INNER}>
        <div className="max-w-4xl">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:text-[13px]">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="truncate">Endüstriyel Tedarik &amp; Tesis Malzemeleri B2B Portalı</span>
          </p>

          <h1
            id="hero-baslik"
            className="hero-title mt-4 max-w-[56rem] text-[1.95rem] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.25rem]"
          >
            Endüstriyel Tesisler İçin <br className="hidden lg:inline" />
            <span className="text-accent">Yüksek Hacimli Teknik Tedarik</span>
          </h1>

          <p className="hero-lead mt-4 max-w-2xl text-base leading-relaxed text-slate-100 drop-shadow sm:text-lg">
            Fabrikaların, şantiyelerin ve imalat hatlarının ihtiyaç duyduğu tüm teknik donanım ve endüstriyel sarf
            malzemelerini; koli, çuval ve palet bazında doğrudan sevk ediyoruz.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RfqTriggerButton
              source="hero"
              className="btn-action min-h-[52px] w-full px-7 text-base shadow-xl shadow-black/30 sm:w-auto"
            >
              <ClipboardList className="h-5 w-5" aria-hidden />
              <span>{CTA.primary}</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </RfqTriggerButton>
            <Link
              href="/urun-gruplari"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/20 sm:w-auto sm:text-base"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              {CTA.browse}
            </Link>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-slate-100 sm:text-sm">
            {TRUST_BADGES.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
