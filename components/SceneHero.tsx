"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import GlobeCanvas from "./GlobeCanvas";
import { FEATURED_IDS, PRODUCT_GROUPS } from "@/data/products";

const SCENES = FEATURED_IDS.map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);
const DURATION = 7000;

export default function SceneHero() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = useCallback((next: number) => {
    const target = (next + SCENES.length) % SCENES.length;
    setShown(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIndex(target);
      setShown(true);
    }, 220);
  }, []);

  // Otomatik geçiş — fareyle üzerine gelince / klavyeyle odaklanınca durur
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Bazı tarayıcılarda autoplay için muted özelliğinin JS ile de set edilmesi gerekir
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const p = SCENES[index];
  const num = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Öne çıkan ürün grupları"
      className="relative isolate overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {/* Açık zemin + yumuşak mavi ışıma + nokta ızgara */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_75%_45%,rgba(0,80,230,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#C9D2DE_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_60%_at_60%_40%,#000,transparent)]" />

      <div className="container-x flex min-h-[calc(100svh-72px)] flex-col py-6 sm:py-8">
        {/* Üst satır */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <h1 className="text-xs font-semibold text-ink sm:text-[13px]">Samsun Teknik Hırdavat ve Fabrika Malzemeleri</h1>
            <span className="hidden items-center gap-1 text-xs text-ink-muted sm:inline-flex">
              <MapPin className="h-3 w-3" aria-hidden /> Tekkeköy
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 font-mono text-xs shadow-sm backdrop-blur-md sm:inline-flex" aria-live="polite">
            <span className="font-bold text-brand">{num(index + 1)}</span>
            <span className="text-ink-muted">/ {num(SCENES.length)}</span>
            <span className="ml-1 border-l border-line pl-2 font-sans font-semibold text-ink">{p.category}</span>
          </div>
        </div>

        {/* Ana sahne */}
        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-12 lg:gap-10">
          <article
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${SCENES.length}: ${p.title}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className={`glass order-2 p-6 transition-all duration-300 ease-out sm:p-8 lg:order-1 lg:col-span-6 xl:col-span-6 ${shown ? "scene-in" : "scene-out"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand">{p.category}</span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{p.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{p.description}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={`/urunler/${p.slug}`} className="btn-primary">
                Ürün grubunu incele <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/urunler" className="btn-ghost">
                30 ürün grubu
              </Link>
            </div>
          </article>

          {/* Video: döngüde oynayan drone çekimi + arkada dönen küre */}
          <div className="relative order-1 lg:order-2 lg:col-span-6 xl:col-span-6">
            <GlobeCanvas tint="0, 80, 230" className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 lg:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />

            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="overflow-hidden rounded-[28px] bg-ink shadow-[0_40px_80px_-30px_rgba(15,27,45,0.55)] ring-1 ring-black/5">
                <video
                  ref={videoRef}
                  className="block aspect-[4/3] w-full object-cover object-[50%_58%] lg:aspect-[4/5]"
                  src="/videos/hero-drone.mp4"
                  poster="/videos/hero-drone-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Arma Hırdavat binasının drone ile çekilmiş görüntüsü"
                />
              </div>

              {/* Yüzen bilgi kartları */}
              <div className="absolute -left-6 bottom-10 hidden animate-float-slow sm:block">
                <div className="glass rounded-2xl px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">Merkez</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden /> Tekkeköy / Samsun
                  </p>
                </div>
              </div>
              <div className="absolute -right-5 top-10 hidden animate-float-fast sm:block">
                <div className="glass rounded-2xl px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">Ürün grubu</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">30 kategori</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sahne gezinmesi */}
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => go(index - 1)} aria-label="Önceki ürün grubu" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition hover:border-ink/30">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="grid flex-1 grid-cols-6 gap-2">
            {SCENES.map((s, i) => (
              <button key={s.id} type="button" onClick={() => go(i)} aria-label={`${s.title} sahnesine geç`} aria-current={i === index} className="group text-left">
                <span className="block h-[3px] overflow-hidden rounded-full bg-line">
                  {i === index && (
                    <span
                      key={index}
                      className="block h-full origin-left rounded-full bg-brand"
                      style={{ animation: `progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                  {i < index && <span className="block h-full rounded-full bg-line-strong" />}
                </span>
                <span className={`mt-2 hidden truncate text-xs transition-colors md:block ${i === index ? "font-semibold text-ink" : "text-ink-muted group-hover:text-ink-soft"}`}>{s.title}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Sonraki ürün grubu" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition hover:border-ink/30">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
