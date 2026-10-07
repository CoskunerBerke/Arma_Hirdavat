"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
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
      {/* Tam arka plan: döngüde oynayan drone videosu */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[50%_55%]"
        src="/videos/hero-drone.mp4"
        poster="/videos/hero-drone-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Sinematik kontrast örtüsü: Solda kartın ve yazıların net okunması için koyu ton, sağda videonun canlı ve net görünmesi için transparan */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-slate-950/40 lg:bg-[linear-gradient(90deg,rgba(11,21,40,0.88)_0%,rgba(11,21,40,0.65)_45%,rgba(11,21,40,0.20)_75%,rgba(11,21,40,0.35)_100%)]" />

      {/* Üstte hafif koyuluk, altta sonraki açık renkli ürün bölümüne yumuşak geçiş */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-slate-950/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />

      <div className="container-x flex min-h-[calc(100svh-72px)] flex-col py-6 sm:py-8">
        {/* Üst satır */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/70 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <h1 className="text-xs font-semibold text-white sm:text-[13px]">Samsun Teknik Hırdavat ve Fabrika Malzemeleri</h1>
            <span className="hidden items-center gap-1 text-xs text-slate-300 sm:inline-flex">
              <MapPin className="h-3 w-3 text-brand" aria-hidden /> Tekkeköy
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3.5 py-1.5 font-mono text-xs shadow-lg backdrop-blur-md sm:inline-flex" aria-live="polite">
            <span className="font-bold text-blue-400">{num(index + 1)}</span>
            <span className="text-slate-400">/ {num(SCENES.length)}</span>
            <span className="ml-1 border-l border-white/20 pl-2 font-sans font-semibold text-slate-200">{p.category}</span>
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
            className={`rounded-3xl border border-white/15 bg-slate-950/80 p-6 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300 ease-out sm:p-8 lg:order-1 lg:col-span-6 xl:col-span-6 ${
              shown ? "scene-in" : "scene-out"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-lg border border-brand/40 bg-brand/20 px-3 py-1 text-xs font-semibold text-blue-300">
              {p.category}
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{p.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{p.description}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 backdrop-blur-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={`/urunler/${p.slug}`} className="btn-primary shadow-lg shadow-brand/30">
                Ürün grubunu incele <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/urunler" className="btn border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                30 ürün grubu
              </Link>
            </div>
          </article>

          {/* Sağ taraf: video arka planda net görünür, üzerinde yüzen bilgi kartları */}
          <div className="relative hidden h-full min-h-[420px] lg:order-2 lg:col-span-6 lg:block" aria-hidden>
            <div className="absolute right-0 top-[12%] animate-float-fast">
              <div className="rounded-2xl border border-white/15 bg-slate-950/75 px-4 py-3 text-white shadow-xl backdrop-blur-xl">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Ürün grubu</p>
                <p className="mt-0.5 text-sm font-semibold text-white">30 kategori</p>
              </div>
            </div>
            <div className="absolute bottom-[14%] right-[30%] animate-float-slow">
              <div className="rounded-2xl border border-white/15 bg-slate-950/75 px-4 py-3 text-white shadow-xl backdrop-blur-xl">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Merkez</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" aria-hidden /> Tekkeköy / Samsun
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sahne gezinmesi */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Önceki ürün grubu"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white shadow-md backdrop-blur-md transition hover:bg-slate-900 hover:border-white/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="grid flex-1 grid-cols-6 gap-2">
            {SCENES.map((s, i) => (
              <button key={s.id} type="button" onClick={() => go(i)} aria-label={`${s.title} sahnesine geç`} aria-current={i === index} className="group text-left">
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/20">
                  {i === index && (
                    <span
                      key={index}
                      className="block h-full origin-left rounded-full bg-blue-500"
                      style={{ animation: `progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                  {i < index && <span className="block h-full rounded-full bg-white/60" />}
                </span>
                <span className={`mt-2 hidden truncate text-xs transition-colors md:block ${i === index ? "font-semibold text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Sonraki ürün grubu"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white shadow-md backdrop-blur-md transition hover:bg-slate-900 hover:border-white/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
