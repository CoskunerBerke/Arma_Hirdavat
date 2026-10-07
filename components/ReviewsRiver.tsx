"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/data/reviews";

export default function ReviewsRiver() {
  // Kesintisiz sonsuz akış için yorum listesini iki kez birleştiriyoruz
  const marqueeItems = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

  return (
    <section id="yorumlar" className="py-20 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Google Haritalar Puan Rozeti */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Haritalar Puanı: 5.0 / 5.0</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight">
            Müşteri Deneyimi &amp; Güven Nehirimiz
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Samsun ve Karadeniz bölgesindeki fabrikalardan, şantiyelerden ve imalat atölyelerinden Arma Hırdavat&apos;a gelen gerçek ve tarafsız değerlendirmeler.
          </p>
        </div>
      </div>

      {/* Yorum Nehri Kapsayıcısı (Kenarlarda yumuşak degrade maskeleme ile) */}
      <div className="relative w-full overflow-hidden">
        {/* Sol ve Sağ Degrade Gölgeler */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Sağdan Sola Kesintisiz Akan Nehir (Hoverda da ASLA DURMAZ) */}
        <div className="animate-marquee-river flex gap-6 py-4">
          {marqueeItems.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Üst Kısım: Yıldızlar ve Google Doğrulaması */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Yorum Metni */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-blue-200/60 mb-1" />
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              </div>

              {/* Alt Kısım: Kullanıcı Profili */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-industrial-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {rev.role} • <span className="text-slate-700 font-semibold">{rev.company}</span>
                  </p>
                </div>
                {rev.verified && (
                  <div
                    className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60"
                    title="Doğrulanmış Sanayi Müşterisi"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Doğrulandı</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <p className="text-xs text-slate-400">
          * Yorumlar Google Haritalar işletme profili ve kurumsal fabrika geri bildirimlerimiz esas alınarak derlenmiştir.
        </p>
      </div>
    </section>
  );
}
