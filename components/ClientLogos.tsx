"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutGrid,
  Pause,
  Play,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { CLIENT_REFERENCES, type ClientReference } from "@/data/company";
import Reveal from "./Reveal";

interface Dimensions {
  rx: number;
  rz: number;
  ry: number;
  cardWidth: number;
  cardHeight: number;
  logoWidth: number;
  logoHeight: number;
}

export default function ClientLogos() {
  const [mode, setMode] = useState<"orbit" | "grid">("orbit");
  const [angle, setAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({
    rx: 370,
    rz: 105,
    ry: 20,
    cardWidth: 230,
    cardHeight: 145,
    logoWidth: 240,
    logoHeight: 105,
  });

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dragStartRef = useRef<{ x: number; angle: number }>({ x: 0, angle: 0 });
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const targetAngleRef = useRef<number | null>(null);

  // Responsive radii and logo sizing calculation
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDimensions({
          rx: 125,
          rz: 40,
          ry: 8,
          cardWidth: 145,
          cardHeight: 120,
          logoWidth: 135,
          logoHeight: 65,
        });
      } else if (w < 640) {
        setDimensions({
          rx: 140,
          rz: 48,
          ry: 10,
          cardWidth: 160,
          cardHeight: 128,
          logoWidth: 155,
          logoHeight: 74,
        });
      } else if (w < 1024) {
        setDimensions({
          rx: 260,
          rz: 75,
          ry: 15,
          cardWidth: 195,
          cardHeight: 135,
          logoWidth: 190,
          logoHeight: 88,
        });
      } else {
        setDimensions({
          rx: 370,
          rz: 105,
          ry: 20,
          cardWidth: 230,
          cardHeight: 145,
          logoWidth: 245,
          logoHeight: 105,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation loop with requestAnimationFrame
  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;

        // Smooth transition to target angle if user clicked a card or button
        if (targetAngleRef.current !== null) {
          setAngle((prev) => {
            const diff = targetAngleRef.current! - prev;
            if (Math.abs(diff) < 0.005) {
              const finalAngle = targetAngleRef.current!;
              targetAngleRef.current = null;
              return finalAngle;
            }
            return prev + diff * 0.08;
          });
        } else if (!isPaused && !isDragging) {
          // Standard rotation speed: ~28s for 1 full 360 revolution
          const speed = (2 * Math.PI) / (28 * 1000);
          setAngle((prev) => (prev + speed * delta) % (2 * Math.PI));
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [isPaused, isDragging]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // Pointer / Drag event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "orbit") return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setIsPaused(true);
    targetAngleRef.current = null;
    dragStartRef.current = { x: e.clientX, angle };

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const sensitivity = 0.006;
    setAngle(dragStartRef.current.angle + deltaX * sensitivity);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2800);
  };

  // Rotate to specific company index
  const rotateToIndex = (targetIndex: number) => {
    const N = CLIENT_REFERENCES.length;
    const step = (2 * Math.PI) / N;

    // Front center position is Math.PI / 2
    const targetTheta = Math.PI / 2 - targetIndex * step;

    const currentNorm = angle % (2 * Math.PI);
    let diff = (targetTheta - currentNorm) % (2 * Math.PI);
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    targetAngleRef.current = angle + diff;
    setIsPaused(true);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  const stepNext = () => {
    const step = (2 * Math.PI) / CLIENT_REFERENCES.length;
    targetAngleRef.current = (targetAngleRef.current ?? angle) - step;
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 3500);
  };

  const stepPrev = () => {
    const step = (2 * Math.PI) / CLIENT_REFERENCES.length;
    targetAngleRef.current = (targetAngleRef.current ?? angle) + step;
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 3500);
  };

  // Determine which card is currently closest to the front spotlight
  const N = CLIENT_REFERENCES.length;
  const step = (2 * Math.PI) / N;
  let activeIndex = 0;
  let maxZ = -Infinity;

  CLIENT_REFERENCES.forEach((_, i) => {
    const phi = angle + i * step;
    const z = Math.sin(phi); // 1 is front
    if (z > maxZ) {
      maxZ = z;
      activeIndex = i;
    }
  });

  return (
    <section
      aria-label="Çalıştığımız ve Tedarik Sağladığımız Sanayi Kuruluşları"
      className="border-b border-line bg-gradient-to-b from-white via-slate-50/50 to-white py-12 sm:py-16 relative overflow-hidden w-full max-w-full"
    >
      <div className="container-x w-full max-w-full min-w-0">
        {/* Üst Başlık & B2B Güven Mesajı + Mod Değiştirici */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 sm:pb-8 border-b border-line/60">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-action">
              <Award className="h-3.5 w-3.5 text-action" />
              <span>GÜVENİLİR B2B SANAYİ ORTAĞI</span>
            </div>
            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Türkiye&apos;nin Öncü Sanayi Kuruluşlarının Malzeme Tedarikçisiyiz
            </h2>
            <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-ink-soft">
              Üretim tesisleri, ağır sanayi fabrikaları ve global şantiyelerin yüksek hacimli teknik hırdavat, KKD ve tesis ihtiyaçlarını düzenli koli ve palet sevkiyatlarıyla karşılıyoruz.
            </p>
          </div>

          {/* Sağ Aksiyonlar: Görünüm Modu Değiştirici (3D Yörünge vs Izgara) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-end">
            <div className="flex items-center rounded-xl border border-line bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setMode("orbit")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  mode === "orbit"
                    ? "bg-brand text-white shadow-xs"
                    : "text-ink-soft hover:text-ink hover:bg-slate-50"
                }`}
                title="Arma Merkezi Tedarik 3D Yörünge Modu"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>3D Tedarik Yörüngesi</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("grid")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  mode === "grid"
                    ? "bg-brand text-white shadow-xs"
                    : "text-ink-soft hover:text-ink hover:bg-slate-50"
                }`}
                title="Tüm Firmaları Liste / Izgara Olarak Gör"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Kart Izgarası</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* 1. MOD: 3D DÖNEN YÖRÜNGE ARENASI (MERKEZDE ARMA LOGOSU, ETRAFINDA SANAYİ DEVLERİ) */}
        {/* ========================================================================= */}
        {mode === "orbit" && (
          <div className="relative mt-6 sm:mt-10">
            {/* Üst Bilgi Rozeti & Çevirme İpucu */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-semibold text-slate-800">
                  Arma Tedarik Ekosistemi:
                </span>
                <span className="text-slate-500 hidden sm:inline">
                  Sanayi devleri, merkezdeki Arma Hırdavat etrafında 3D yörüngede dönmektedir.
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-brand bg-blue-50/70 border border-blue-100 rounded-full px-3 py-1">
                <RotateCw className="h-3 w-3 animate-spin [animation-duration:8s]" />
                <span>Yörüngeyi çevirmek için kaydırın veya logolara tıklayın</span>
              </div>
            </div>

            {/* 3D Yörünge Sahnesi */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative mx-auto h-[380px] sm:h-[430px] md:h-[460px] w-full max-w-5xl rounded-3xl border border-line/80 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              {/* Arka Plan Derinlik Parıltısı & Grid Aurası */}
              <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.25),transparent_70%)]" />
              <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

              {/* Tilted Orbital Ring Ellipse (Yörünge Halkası Çizgisi) */}
              <div
                style={{
                  width: `${dimensions.rx * 2}px`,
                  height: `${dimensions.rz * 2.2}px`,
                  transform: `translate(-50%, -50%) rotateX(68deg) rotateZ(-12deg)`,
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2 border-dashed border-sky-400/25 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
              />

              {/* ======================================================== */}
              {/* MERKEZ: ARMA RESMİ LOGOSU (MERKEZİ TEDARİK ÜSSÜ) */}
              {/* ======================================================== */}
              <div
                style={{
                  width: `${dimensions.logoWidth}px`,
                  height: `${dimensions.logoHeight}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 15,
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 flex items-center justify-center"
              >
                {/* Dış Parıltı / Atmosferik Halo */}
                <div className="absolute inset-0 rounded-3xl bg-blue-500/25 blur-2xl animate-pulse" />

                {/* Dönen Yörünge Halka Efekti (Merkezdeki logoyu çevreleyen ışıltılı dönen daire) */}
                <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-sky-400/30 border-dashed animate-[spin_30s_linear_infinite]" />
                <div className="absolute -inset-8 sm:-inset-10 rounded-full border border-emerald-400/20 border-dotted animate-[spin_45s_linear_infinite_reverse]" />

                {/* Arma Logo Kartı (Cam Şıklığı & Temiz Zemin) */}
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-2xl sm:rounded-3xl border-2 border-white/90 bg-white/95 p-2 sm:p-3.5 shadow-[0_0_50px_rgba(0,102,255,0.35),0_20px_50px_-10px_rgba(2,6,23,0.7)] backdrop-blur-xl">
                  <Image
                    src="/images/logo.png"
                    alt="Arma Hırdavat Logo"
                    width={305}
                    height={101}
                    priority
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-8 sm:max-h-11 w-auto max-w-[92%] object-contain"
                  />
                  <div className="mt-1 sm:mt-1.5 flex items-center gap-1 rounded-full bg-emerald-50 px-2 sm:px-2.5 py-0.5 border border-emerald-200/80">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-700">
                      Merkezi Tedarik Üssü
                    </span>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* ARMA'NIN ETRAFINDA 3D DÖNEN 5 ÖNCÜ FİRMA LOGO KARTLARI */}
              {/* ======================================================== */}
              {CLIENT_REFERENCES.map((client, i) => {
                const phi = angle + i * step;

                // 3D Orbital Coordinates
                const x = Math.cos(phi) * dimensions.rx;
                const z = Math.sin(phi) * dimensions.rz; // positive = front, negative = behind
                const y = Math.sin(phi) * dimensions.ry;

                // Depth factor: 0.0 (back) to 1.0 (front)
                const depth = (z + dimensions.rz) / (2 * dimensions.rz);

                // Dynamic scale & opacity based on 3D depth
                const scale = 0.7 + depth * 0.35; // 0.70x in back to 1.05x in front
                const opacity = Math.max(0.35, Math.min(1.0, 0.4 + depth * 0.6));

                // Z-index: passes behind Arma (zIndex < 15) and in front (zIndex > 15)
                const zIndex = z >= 0 ? Math.round(18 + depth * 15) : Math.round(4 + depth * 10);

                // SADECE en öndeki TEK firmaya ön odak verilir (kalabalık görüntüyü önler)
                const isFrontFocus = i === activeIndex && depth > 0.75;

                return (
                  <div
                    key={client.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFrontFocus) {
                        window.open(client.url, "_blank", "noopener,noreferrer");
                      } else {
                        rotateToIndex(i);
                      }
                    }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: `${dimensions.cardWidth}px`,
                      height: `${dimensions.cardHeight}px`,
                      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                      zIndex,
                      opacity,
                      filter: isFrontFocus
                        ? "none"
                        : depth < 0.35
                        ? "blur(0.8px) grayscale(60%)"
                        : "grayscale(20%)",
                      transition: isDragging
                        ? "none"
                        : "transform 0.08s ease-out, opacity 0.12s ease-out, filter 0.12s ease-out",
                      willChange: "transform, opacity",
                    }}
                    className={`group cursor-pointer rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-shadow duration-300 ${
                      isFrontFocus
                        ? "bg-white text-ink shadow-[0_20px_50px_-10px_rgba(0,102,255,0.45),0_0_0_2px_#10B981] ring-2 ring-emerald-400"
                        : "bg-white/90 text-slate-800 backdrop-blur-md border border-white/60 shadow-lg hover:bg-white hover:opacity-100"
                    }`}
                  >
                    {/* Üst Rozet & Dış Bağlantı */}
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded truncate max-w-[82%] ${
                          isFrontFocus
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {client.badge}
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full transition ${
                          isFrontFocus
                            ? "bg-brand text-white shadow-xs"
                            : "text-slate-400 group-hover:text-brand"
                        }`}
                      >
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>

                    {/* Logo Alanı */}
                    <div className="relative flex h-10 sm:h-12 w-full items-center justify-center py-0.5">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logosu`}
                        width={180}
                        height={46}
                        style={{ width: "auto", height: "auto" }}
                        className={`max-h-9 sm:max-h-11 w-auto max-w-[90%] object-contain transition-transform duration-300 ${
                          isFrontFocus ? "scale-105" : "group-hover:scale-105"
                        }`}
                      />
                    </div>

                    {/* Alt Firma İsmi & Sektör */}
                    <div className="border-t border-slate-100 pt-1.5 text-center">
                      <h3 className="text-[11px] sm:text-xs font-extrabold leading-tight text-ink group-hover:text-brand transition-colors truncate">
                        {client.name}
                      </h3>
                      <p className="mt-0.5 text-[9px] sm:text-[10px] leading-tight text-ink-muted truncate">
                        {isFrontFocus ? "Siteyi İncele ↗" : client.sector}
                      </p>
                    </div>

                    {/* Ön Odak Parıltı Rozeti */}
                    {isFrontFocus && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold text-white shadow-md flex items-center gap-1">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Doğrudan Sevkiyat
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Yörünge Altı Kontrol Çubuğu (Önceki / Duraklat / Sonraki / Firma Seçici) */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              {/* Oynat / Durdur & Ok Butonları */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={stepPrev}
                  className="inline-flex h-9 items-center gap-1 rounded-xl border border-line bg-white px-3 text-xs font-bold text-ink shadow-2xs transition hover:bg-slate-50 hover:border-brand/40 active:scale-95"
                  aria-label="Önceki Firma"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Önceki</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaused((v) => !v)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-xs font-bold text-ink shadow-2xs transition hover:bg-slate-50 active:scale-95"
                  title={isPaused ? "Dönüşü Başlat" : "Dönüşü Duraklat"}
                  aria-label={isPaused ? "Dönüşü Başlat" : "Dönüşü Duraklat"}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-3.5 w-3.5 text-action ml-0.5" />
                      <span>Dönüşü Başlat</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3.5 w-3.5 text-amber-600" />
                      <span>Duraklat</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={stepNext}
                  className="inline-flex h-9 items-center gap-1 rounded-xl border border-line bg-white px-3 text-xs font-bold text-ink shadow-2xs transition hover:bg-slate-50 hover:border-brand/40 active:scale-95"
                  aria-label="Sonraki Firma"
                >
                  <span className="hidden sm:inline">Sonraki</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* 5 Firma Hızlı Geçiş Hapları (Quick Dots / Pills) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {CLIENT_REFERENCES.map((c, i) => {
                  const isCurrent = activeIndex === i;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => rotateToIndex(i)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                        isCurrent
                          ? "bg-slate-900 text-white shadow-xs scale-105 ring-2 ring-emerald-400"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      aria-pressed={isCurrent}
                      title={`${c.name} logosunu öne getir`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isCurrent ? "bg-emerald-400" : "bg-slate-400"
                        }`}
                      />
                      <span>{c.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MOD: STATİK 5'Lİ KART IZGARASI (TÜMÜNÜ YAN YANA GÖRMEK İSTEYENLER İÇİN) */}
        {/* ========================================================================= */}
        {mode === "grid" && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 animate-in fade-in duration-300">
            {CLIENT_REFERENCES.map((client, i) => (
              <div
                key={client.name}
                className={`flex h-full ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full flex-col justify-between rounded-2xl border border-line bg-canvas/30 p-3.5 sm:p-5 transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Üst Rozet */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-50/80 px-2 py-0.5 rounded truncate max-w-[85%]">
                      {client.badge}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-brand shrink-0" />
                  </div>

                  {/* Logo Alanı */}
                  <div className="relative flex h-12 sm:h-14 w-full items-center justify-center py-1">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logosu`}
                      width={220}
                      height={56}
                      style={{ width: "auto", height: "auto" }}
                      className="max-h-10 sm:max-h-12 w-auto max-w-[90%] object-contain filter grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>

                  {/* Alt Bilgi */}
                  <div className="mt-4 border-t border-line/50 pt-2.5 text-center">
                    <h3 className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand transition-colors">
                      {client.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-snug text-ink-muted line-clamp-1">
                      {client.sector}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
