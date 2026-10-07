import { Quote } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

/**
 * Yorum nehri: kartlar sağdan sola yavaşça ve kesintisiz akar.
 * Liste iki kez yan yana basılır; şerit -%50 kaydığında başa sarar, böylece boşluk oluşmaz.
 */
export default function ReviewsRiver() {
  const items = [...REVIEWS, ...REVIEWS];

  return (
    <section aria-labelledby="yorumlar-baslik" className="section overflow-hidden">
      <div className="container-x">
        <p className="eyebrow">Müşteri görüşleri</p>
        <h2 id="yorumlar-baslik" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Birlikte çalıştığımız işletmeler ne diyor?
        </h2>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-40" />

        <ul className="river-track flex w-max py-3">
          {items.map((r, i) => (
            <li
              key={`${r.name}-${i}`}
              aria-hidden={i >= REVIEWS.length ? true : undefined}
              className="surface mr-5 flex w-[300px] shrink-0 flex-col justify-between p-6 sm:w-[360px]"
            >
              <div>
                <Quote className="h-5 w-5 text-brand/40" aria-hidden />
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{r.comment}</p>
              </div>
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-semibold text-ink">{r.name}</p>
                <p className="text-xs text-ink-muted">{r.sector}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="container-x mt-8 text-xs text-ink-muted">
        Demo içerik: Yorumlar örnek amaçlıdır, yayına alınmadan önce işletmenin gerçek Google yorumlarıyla değiştirilecektir.
      </p>
    </section>
  );
}
