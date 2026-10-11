import FaqAccordion, { type FaqItem } from "./home/FaqAccordion";
import { COMPANY, HARDWARE_GROUPS, HOURS_TEXT, PROMISES } from "@/data/company";
import { getProductById, parseKoli } from "@/data/products";

export type { FaqItem };

/*
 * Sıkça sorulan sorular (sunucu bileşeni) + yalnızca BU görünür içerikten üretilen FAQPage JSON-LD.
 * Yanıtlar dürüst ve doğrulanabilir olmalı: süre / sevkiyat ifadeleri PROMISES'tan gelir,
 * belgelenmemiş vaat (vade, iade süresi, ücretsiz kargo vb.) EKLEMEYİN — işletme sahibi onaylarsa ekleyin.
 * Başka sayfalar kendi sorularını `items` ile verebilir.
 */
function koliExample(): string {
  const p = getProductById(1);
  const info = p ? parseKoli(p.koli) : null;
  return p && info ? ` (ör. ${p.code}: 1 koli = ${info.perCarton.toLocaleString("tr-TR")} ${info.unit})` : "";
}

export const FAQS: FaqItem[] = [
  {
    q: "En az ne kadar sipariş vermem gerekiyor?",
    a: `Online teklifler koli bazındadır; kaç koli alacağınıza siz karar verirsiniz. Koli içi adet her ürün sayfasında yazılıdır${koliExample()}. Daha az miktar ya da tekil ürün için Tekkeköy'deki mağazamızdan alışveriş yapabilirsiniz.`,
    link: { href: "/#fiziki-magaza", label: "Mağaza adresi ve saatleri" },
  },
  {
    q: "Fiyatlar neden sitede yazmıyor?",
    a: "Toptan alımda birim fiyat; miktara, koli ya da palet tercihine ve teslimat iline göre değişir. Bu yüzden herkese aynı liste fiyatını yazmak yerine, talebinize göre hazırlanmış yazılı bir teklif gönderiyoruz. Teklifte birim fiyat, toplam tutar, tahmini teslim süresi ve nakliye koşulları yer alır.",
  },
  {
    q: "Teklif istemek ücretli mi, beni bağlar mı?",
    a: `Hayır. Teklif ücretsizdir ve bağlayıcı değildir; üyelik de gerekmez. Teklifi inceleyip onaylarsanız sipariş oluşur. ${PROMISES.quoteTurnaround} Çalışma saatlerimiz: ${HOURS_TEXT}.`,
  },
  {
    q: "Ödeme ve faturalandırma nasıl yapılıyor?",
    a: "Tüm satışlarımız faturalıdır. Geçerli ödeme yöntemleri ve koşulları teklifinizde yazılı olarak belirtilir. Onaylanan siparişlerin ödemesi için online ödeme sayfamızı da kullanabilirsiniz.",
    link: { href: COMPANY.paymentUrl, label: "Online ödeme sayfası", external: true },
  },
  {
    q: "Sevkiyat nasıl yapılıyor, teslim ne kadar sürer?",
    a: PROMISES.delivery,
  },
  {
    q: "CE uygunluk beyanı veya teknik föy alabilir miyim?",
    a: `${PROMISES.documentation} Uygunluk beyanı ya da teknik föy ihtiyacınızı teklif formundaki not alanına yazın; temin edebileceğimiz belgeleri teklifle birlikte bildiririz.`,
  },
  {
    q: "Aradığım ürün listede yok. Yine de teklif alabilir miyim?",
    a: `Evet. Online katalogda FABA iş güvenliği ürünleri yer alır; bunların yanında ${HARDWARE_GROUPS.length} ürün grubunda teknik hırdavat tedarik ediyoruz. İhtiyacınızı teklif formuna serbest metinle yazın; tedarik edebildiğimiz ürünleri fiyatıyla birlikte bildirelim.`,
    link: { href: "/urun-gruplari", label: "Teknik hırdavat ürün grupları" },
  },
  {
    q: "Doğru eldiven bedenini nasıl seçerim?",
    a: "Eldiven bedenleri ürüne göre 7 ile 11 arasında değişir ve her ürün sayfasında yazılıdır. Ölçüm için beden tablosu rehberimize bakabilirsiniz. Ekibiniz için farklı bedenler gerekiyorsa her bedeni teklif listesine ayrı satır olarak ekleyebilirsiniz.",
    link: { href: "/rehber/is-eldiveni-beden-tablosu", label: "İş eldiveni beden tablosu" },
  },
  {
    q: "Numune gönderiyor musunuz?",
    a: "Numune talebinizi teklif formundaki not alanına yazabilirsiniz. Ürüne ve miktara göre numune verip veremeyeceğimizi teklifte bildiririz.",
  },
];

interface FaqSectionProps {
  /** Varsayılan: ana sayfa soruları (FAQS) */
  items?: FaqItem[];
  title?: string;
  description?: string;
  eyebrow?: string;
  /** Bölüm kimliği (menüdeki /#sss bağlantısı için varsayılan "sss") */
  id?: string;
  /** FAQPage JSON-LD yazılsın mı (aynı sayfada ikinci bir SSS şeması varsa false verin) */
  withSchema?: boolean;
  className?: string;
}

export default function FaqSection({
  items = FAQS,
  title = "Toptan alım hakkında sık sorulan sorular",
  description = "Sipariş birimi, fiyat, ödeme, sevkiyat ve belgeler hakkında açık yanıtlar.",
  eyebrow = "Sıkça sorulan sorular",
  id = "sss",
  withSchema = true,
  className = "",
}: FaqSectionProps) {
  if (items.length === 0) return null;
  const headingId = `${id}-baslik`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id={id} className={`scroll-mt-24 border-b border-line bg-white py-14 sm:py-20 lg:py-24 ${className}`} aria-labelledby={headingId}>
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={headingId} className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {title}
            </h2>
            {description && <p className="mt-2 text-sm text-ink-soft sm:text-base">{description}</p>}
          </div>

          <div className="mt-8 sm:mt-10">
            <FaqAccordion items={items} />
          </div>
        </div>
      </div>

      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </section>
  );
}
