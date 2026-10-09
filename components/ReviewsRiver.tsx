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

      <div className="relative mt-12 overflow-hidden w-full max-w-full">
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
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-xs">★</span>
                  ))}
                </div>
                <Quote className="h-5 w-5 text-brand/30" aria-hidden />
                <p className="mt-2 text-[14px] leading-relaxed text-ink">{r.comment}</p>
              </div>
              <div className="mt-5 border-t border-line pt-3.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-ink">{r.name}</p>
                  <p className="text-[11px] text-ink-muted">{r.sector}</p>
                </div>
                <span className="text-[10px] font-semibold text-action bg-emerald-50 px-2 py-0.5 rounded-full">
                  ✓ Doğrulanmış Firma
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Güven ve Sosyal Kanıt Özeti */}
      <div className="container-x mt-10 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-ink sm:text-3xl">Tüm OSB&apos;ler</p>
          <p className="mt-1 text-xs text-ink-muted">Doğrudan Ambar & Tır Sevk</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-action sm:text-3xl">100%</p>
          <p className="mt-1 text-xs text-ink-muted">Orijinal & CE Belgeli KKD</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-brand sm:text-3xl">&lt; 2 Saat</p>
          <p className="mt-1 text-xs text-ink-muted">Ortalama Teklif Süresi</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-amber-500 sm:text-3xl">4.9 / 5.0</p>
          <p className="mt-1 text-xs text-ink-muted">Kurumsal Memnuniyet</p>
        </div>
      </div>
    </section>
  );
}
