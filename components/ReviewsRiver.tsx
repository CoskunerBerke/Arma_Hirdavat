"use client";

import { useState } from "react";
import { ExternalLink, Pause, Play, Quote } from "lucide-react";
import { GOOGLE_RATING, REVIEWS, type Review } from "@/data/reviews";

/*
 * Müşteri yorumları — kayan "nehir" şeridi, YALNIZCA data/reviews.ts'teki gerçek Google yorumları.
 * - Üstteki puan ve yorum sayısı Google İşletme Profili'nden okunur (GOOGLE_RATING); uydurma istatistik yok.
 * - "Doğrulanmış" rozeti ve AggregateRating/Review şeması YOK (Google kendi sitedeki işletme yorumu
 *   işaretlemesini desteklemez).
 * - Şerit fareyle üzerine gelince / klavye odağında durur, ayrıca görünür bir durdur düğmesi vardır
 *   (WCAG 2.2.2). Hareket azaltma tercihinde kaymaz; yatay kaydırılabilir liste olur.
 */

/** Metin tabanlı yıldızlar (SVG yerine): 16 kartta yüzlerce SVG'nin HTML'i şişirmesini önler. */
function Stars({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(5, value)) * 20;
  return (
    <span className="relative inline-block whitespace-nowrap text-base leading-none tracking-[0.12em]" aria-hidden>
      <span className="text-slate-300">★★★★★</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden text-amber-400" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

function ReviewCard({ r, hidden }: { r: Review; hidden: boolean }) {
  return (
    <li className="surface flex min-h-[188px] w-[280px] shrink-0 flex-col p-5 sm:w-[330px] sm:p-6">
      <div className="flex items-center justify-between">
        {typeof r.rating === "number" ? <Stars value={r.rating} /> : <span />}
        <Quote className="h-5 w-5 text-brand/25" aria-hidden />
      </div>
      {typeof r.rating === "number" && <span className="sr-only">{r.rating} üzerinden 5 yıldız.</span>}
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">“{r.comment}”</blockquote>
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3 text-xs">
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{r.name}</p>
          {(r.role || r.company) && (
            <p className="truncate text-ink-muted">{[r.role, r.company].filter(Boolean).join(", ")}</p>
          )}
        </div>
        {r.sourceUrl ? (
          <a
            href={r.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            className="shrink-0 text-ink-muted underline-offset-2 hover:text-brand hover:underline"
          >
            {r.source === "google" ? "Google yorumu" : "Referans"}
            <span className="sr-only"> (yeni sekmede açılır)</span>
          </a>
        ) : (
          <span className="shrink-0 text-ink-muted">{r.source === "google" ? "Google yorumu" : "Referans"}</span>
        )}
      </div>
    </li>
  );
}

export default function ReviewsRiver() {
  const [paused, setPaused] = useState(false);
  if (REVIEWS.length === 0) return null;

  // Şerit süresi kart sayısıyla orantılı: kısa listede de okunabilir hızda akar.
  const duration = Math.max(40, REVIEWS.length * 7);
  const ratingText = GOOGLE_RATING.value.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <section aria-labelledby="yorumlar-baslik" className="section overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Müşteri yorumları</p>
            <h2 id="yorumlar-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Mağazamızı ziyaret edenler ne diyor?
            </h2>
          </div>

          <a
            href={GOOGLE_RATING.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[44px] items-center gap-3 self-start rounded-2xl border border-line bg-white px-4 py-2.5 shadow-sm transition-colors hover:border-brand/40 sm:self-auto"
          >
            <span className="text-2xl font-bold leading-none text-ink">{ratingText}</span>
            <span className="flex flex-col">
              <Stars value={GOOGLE_RATING.value} />
              <span className="mt-1 text-xs text-ink-soft">
                Google&apos;da {GOOGLE_RATING.count} yorum
              </span>
            </span>
            <ExternalLink className="h-4 w-4 text-ink-muted group-hover:text-brand" aria-hidden />
            <span className="sr-only">
              : Google Haritalar&apos;da 5 üzerinden {ratingText} puan, {GOOGLE_RATING.count} yorum. Tüm yorumları yeni sekmede okuyun.
            </span>
          </a>
        </div>
      </div>

      {/* Kayan şerit — iki özdeş yarım: animasyon %50 kaydırınca kesintisiz döner */}
      <div
        className="relative mt-8 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        role="region"
        aria-label="Google yorumları"
      >
        <div
          className="river-track flex w-max"
          style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : undefined }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className={`flex gap-4 pr-4 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {REVIEWS.map((r) => (
                <ReviewCard key={`${copy}-${r.name}`} r={r} hidden={copy === 1} />
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container-x mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-muted">
          Yorumlar Google Haritalar&apos;daki işletme profilimizden alınmıştır; ad-soyadlar kısaltılmıştır.
        </p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-xs font-semibold text-ink-soft hover:text-brand motion-reduce:hidden"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          {paused ? "Akışı başlat" : "Akışı durdur"}
        </button>
      </div>
    </section>
  );
}
