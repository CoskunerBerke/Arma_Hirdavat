import React from "react";
import { HelpCircle } from "lucide-react";
import { SITE_URL } from "@/data/company";

export const FAQS = [
  {
    q: "Türkiye'nin hangi illerine toptan teknik hırdavat sevkiyatı yapıyorsunuz?",
    a: "Arma Hırdavat olarak Türkiye'nin 81 ilindeki tüm organize sanayi bölgelerine (OSB), fabrikalara, tersanelere ve şantiyelere koli ve palet bazında anlaşmalı ambar ve kargo ağımızla düzenli sevkiyat gerçekleştirmekteyiz. İstanbul, Ankara, İzmir, Bursa, Kocaeli, Gaziantep, Konya, Kayseri, Adana ve Samsun başta olmak üzere tüm illere doğrudan teslimat sağlanır.",
  },
  {
    q: "Minimum sipariş miktarı (MOQ) ve koli/palet zorunluluğu var mı?",
    a: "Evet. B2B portalımız üzerinden yalnızca koli, palet ve tesis ambalajı ölçeğindeki yüksek hacimli kurumsal talepler işleme alınmaktadır. Perakende veya tek parça satışlarımız yalnızca Samsun Tekkeköy'deki fiziki mağazamızda devam etmektedir.",
  },
  {
    q: "Birim fiyatlar neden sitede listelenmiyor? Teklif nasıl belirlenir?",
    a: "Endüstriyel ürünlerde fiyatlar talep edilen miktar (koli/palet adedi), sipariş sıklığı ve teslimat yapılacak şehrin lojistik şartlarına göre belirlenir. Listenizi ilettiğinizde firmanıza özel iskonto matrisi uygulanarak en rekabetçi toptan fiyat teklifi resmi belge olarak tarafınıza sunulur.",
  },
  {
    q: "Fatura ve ödeme süreci nasıl işlemektedir?",
    a: "Teklif onayınızın ardından şirket ve vergi levhası bilgileriniz doğrulanarak resmi kurumsal e-faturanız tanzim edilir. Ödemeler banka havalesi/EFT ya da Param POS altyapılı resmi Arma Online E-Tahsilat portalımız (odeme.armahirdavat.com.tr) üzerinden kredi kartına taksit veya tek çekim ile güvenle gerçekleştirilir.",
  },
  {
    q: "Özel teknik şartname, kalite sertifikası ve DIN/ISO normlarına uygun malzeme temin ediyor musunuz?",
    a: "Evet. Ağır sanayi, makine imalatı ve otomotiv yan sanayinin gerektirdiği 8.8, 10.9, 12.9 kalite çelik civatalar, paslanmaz A2/A4 bağlantı elemanları, CE belgeli iş güvenliği ekipmanları ve TSE/DIN standartlarına haiz tüm teknik malzemeler şartnamelerinize uygun olarak temin edilip sevk edilir.",
  },
];

export default function FaqSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <section className="section bg-white border-b border-line" aria-labelledby="faq-heading">
      <div className="container-x max-w-4xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand">
            <HelpCircle className="h-4 w-4" />
            <span>SIKÇA SORULAN SORULAR</span>
          </span>
          <h2 id="faq-heading" className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Kurumsal Satın Alma ve Sevkiyat Hakkında Merak Edilenler
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Türkiye geneli 81 il toptan malzeme tedarik süreçlerimiz ve kurumsal prosedürler.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-line bg-canvas/40 p-5 transition-all open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-ink">
                <span>{faq.q}</span>
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-ink-muted transition-transform group-open:rotate-180 group-open:bg-brand group-open:text-white">
                  &darr;
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft border-t border-line/50 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* JSON-LD Schema for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  );
}
