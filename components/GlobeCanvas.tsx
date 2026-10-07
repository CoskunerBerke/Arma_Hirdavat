"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** "r, g, b" formatında renk */
  tint: string;
  className?: string;
}

/**
 * Noktalardan oluşan, yavaşça dönen küre + yörünge halkası.
 * Referans sitedeki canvas "gezegen" efektinin sade, performanslı karşılığı.
 * - Ekran dışındayken ve sekme gizliyken çizim durur.
 * - prefers-reduced-motion açıksa tek kare çizilir.
 */
export default function GlobeCanvas({ tint, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tintRef = useRef(tint);
  tintRef.current = tint;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const N = isSmall ? 420 : 900;

    // Fibonacci küre noktaları
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tilt = 0.38;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    let angle = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const draw = () => {
      const c = tintRef.current;
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.36;
      const cx = w / 2;
      const cy = h / 2;

      // Yörünge halkası (arka yarı)
      const ringRx = R * 1.55;
      const ringRy = R * 0.34;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${c}, 0.18)`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, ringRx, ringRy, -0.28, Math.PI, Math.PI * 2);
      ctx.stroke();

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0, z0] = pts[i];
        // Y ekseni etrafında dönüş
        const x1 = x0 * cosA - z0 * sinA;
        const z1 = x0 * sinA + z0 * cosA;
        // X ekseni etrafında eğim
        const y2 = y0 * cosT - z1 * sinT;
        const z2 = y0 * sinT + z1 * cosT;
        const depth = (z2 + 1) / 2; // 0 arka, 1 ön
        const px = cx + x1 * R;
        const py = cy + y2 * R;
        const size = 0.5 + depth * 1.3;
        ctx.fillStyle = `rgba(${c}, ${0.08 + depth * 0.72})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Yörünge halkası (ön yarı) + hareket eden uydu
      ctx.strokeStyle = `rgba(${c}, 0.38)`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, ringRx, ringRy, -0.28, 0, Math.PI);
      ctx.stroke();

      const s = angle * 1.6;
      const ex = Math.cos(s) * ringRx;
      const ey = Math.sin(s) * ringRy;
      const rot = -0.28;
      const mx = cx + ex * Math.cos(rot) - ey * Math.sin(rot);
      const my = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
      const front = Math.sin(s) > 0;
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, 14);
      g.addColorStop(0, `rgba(${c}, ${front ? 0.95 : 0.35})`);
      g.addColorStop(1, `rgba(${c}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mx, my, 14, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      angle += dt * 0.00012;
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      draw();
    } else {
      start();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) start();
    });
    io.observe(canvas);

    const onVis = () => {
      if (!document.hidden && visible && !reduce) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
