import { Quote } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

/**
 * Yorum nehri: sağdan sola yavaşça ve kesintisiz akar.
 * Hareket hassasiyeti olan kullanıcılarda (prefers-reduced-motion) durur ve yatay kaydırılabilir hale gelir.
 */
export default function ReviewsRiver() {
  const items = [...REVIEWS, ...REVIEWS];

  return (
    <section aria-labelledby="yorumlar-baslik" className="section overflow-hidden">
      <div className="container-x">
        <p className="eyebrow">Müşteri görüşleri</p>
        <h2 id="yorumlar-baslik" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Birlikte çalıştığımız işletmeler ne diyor?
        </h2>
      </div>

      <div className="river-viewport relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent sm:w-40" />

        <ul className="river-track flex w-max animate-river gap-5 py-2">
          {items.map((r, i) => (
            <li
              key={`${r.name}-${i}`}
              aria-hidden={i >= REVIEWS.length ? true : undefined}
              className="surface flex w-[300px] shrink-0 flex-col justify-between p-6 sm:w-[360px]"
            >
              <div>
                <Quote className="h-5 w-5 text-brand-soft/60" aria-hidden />
                <p className="mt-3 text-[15px] leading-relaxed text-fg">{r.comment}</p>
              </div>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="text-xs text-fg-muted">{r.sector}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="container-x mt-8 text-xs text-fg-muted">
        Demo içerik: Yorumlar örnek amaçlıdır, yayına alınmadan önce işletmenin gerçek Google yorumlarıyla değiştirilecektir.
      </p>
    </section>
  );
}
