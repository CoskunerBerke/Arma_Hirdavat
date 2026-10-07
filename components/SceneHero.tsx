"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import GlobeCanvas from "./GlobeCanvas";
import { FEATURED_IDS, PRODUCT_GROUPS } from "@/data/products";

const TINTS = ["110, 156, 242", "125, 185, 232", "110, 156, 242", "240, 207, 74", "125, 185, 232", "110, 156, 242"];
const SCENES = FEATURED_IDS.map((id, i) => ({
  product: PRODUCT_GROUPS.find((p) => p.id === id)!,
  tint: TINTS[i % TINTS.length],
}));
const DURATION = 7000;

export default function SceneHero() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((next: number) => {
    const target = (next + SCENES.length) % SCENES.length;
    setShown(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIndex(target);
      setShown(true);
    }, 220);
  }, []);

  // Otomatik geçiş — üzerine gelince / odaklanınca durur (WCAG 2.2.2)
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduce, go]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const scene = SCENES[index];
  const p = scene.product;
  const num = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Öne çıkan ürün grupları"
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {/* Zemin: tek tonlu lacivert, yumuşak radyal ışıma */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0B1830_0%,#0A1424_55%,#08111F_100%)]" />
      <div
        className="absolute inset-0 -z-10 transition-[background] duration-1000"
        style={{ background: `radial-gradient(60% 55% at 72% 50%, rgba(${scene.tint}, 0.20) 0%, rgba(0,0,0,0) 70%)` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />

      <div className="container-x flex min-h-[calc(100svh-72px)] flex-col py-6 sm:py-8">
        {/* Üst satır: H1 rozet + ilerleme rozeti */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-950/50 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-soft" />
            </span>
            <h1 className="text-xs font-semibold text-fg sm:text-[13px]">
              Samsun Teknik Hırdavat ve Fabrika Malzemeleri
            </h1>
            <span className="hidden items-center gap-1 text-xs text-fg-muted sm:inline-flex">
              <MapPin className="h-3 w-3" aria-hidden /> Tekkeköy
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-ink-950/50 px-3.5 py-1.5 font-mono text-xs backdrop-blur-md sm:inline-flex" aria-live="polite">
            <span className="font-bold text-brand-soft">{num(index + 1)}</span>
            <span className="text-fg-muted">/ {num(SCENES.length)}</span>
            <span className="ml-1 hidden border-l border-white/15 pl-2 font-sans font-semibold text-fg sm:inline">{p.category}</span>
          </div>
        </div>

        {/* Ana sahne */}
        <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-12 lg:gap-8">
          <article
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${SCENES.length}: ${p.title}`}
            className={`glass p-6 transition-all duration-300 ease-out sm:p-8 lg:col-span-6 xl:col-span-5 ${shown ? "scene-in" : "scene-out"}`}
          >
            <span
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: `rgba(${scene.tint}, 0.12)`, borderColor: `rgba(${scene.tint}, 0.4)` }}
            >
              {p.category}
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{p.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-fg-soft">{p.description}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-fg">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={`/urunler/${p.slug}`} className="btn-accent">
                Ürün grubunu incele <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/urunler" className="btn-ghost">
                30 ürün grubu
              </Link>
            </div>
          </article>

          {/* Görsel: dönen küre + yüzen ürün fotoğrafı */}
          <div className="relative hidden h-[460px] lg:col-span-6 lg:block xl:col-span-7 xl:h-[520px]">
            <div
              className="pointer-events-none absolute right-[4%] top-1/2 h-[1.5px] w-[85%] -translate-y-1/2 opacity-40"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 50%, transparent)",
                boxShadow: `0 0 18px 2px rgba(${scene.tint}, 0.8)`,
              }}
            />
            <GlobeCanvas tint={scene.tint} className="absolute inset-y-0 right-0 h-full w-[88%]" />
            <div
              className={`absolute left-[2%] top-1/2 w-[38%] max-w-[300px] -translate-y-1/2 transition-all duration-500 ${
                shown ? "opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="animate-float-slow">
                <div className="glass p-2" style={{ boxShadow: `0 30px 70px -25px rgba(0,0,0,.85), 0 0 50px -12px rgba(${scene.tint}, .45)` }}>
                  <div className="photo-well aspect-[4/5]">
                    <Image src={p.image} alt={p.title} fill sizes="300px" className="object-contain p-1.5" priority={index === 0} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`absolute bottom-[10%] right-[6%] transition-all duration-500 ${shown ? "opacity-100" : "translate-y-2 opacity-0"}`}
            >
              <div className="animate-float-fast glass rounded-2xl px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-fg-muted">Kategori</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{p.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sahne gezinmesi */}
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => go(index - 1)} aria-label="Önceki ürün grubu" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-fg transition hover:border-white/30 hover:bg-white/5">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="grid flex-1 grid-cols-6 gap-2">
            {SCENES.map((s, i) => (
              <button
                key={s.product.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`${s.product.title} sahnesine geç`}
                aria-current={i === index}
                className="group text-left"
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/10">
                  {i === index && (
                    <span
                      key={`${index}-${reduce}`}
                      className="block h-full origin-left rounded-full bg-brand-soft"
                      style={{
                        animation: reduce ? "none" : `progress ${DURATION}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                        transform: reduce ? "scaleX(1)" : undefined,
                      }}
                    />
                  )}
                  {i < index && <span className="block h-full rounded-full bg-white/30" />}
                </span>
                <span className={`mt-2 hidden truncate text-xs transition-colors md:block ${i === index ? "text-fg" : "text-fg-muted group-hover:text-fg-soft"}`}>
                  {s.product.title}
                </span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Sonraki ürün grubu" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-fg transition hover:border-white/30 hover:bg-white/5">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
