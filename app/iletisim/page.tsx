import type { Metadata } from "next";
import {
  Clock,
  CreditCard,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Printer,
  Store,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import MapEmbed from "./MapEmbed";
import {
  COMPANY,
  CONTACT_NUMBERS_VERIFIED,
  HOURS_SHORT,
  HOURS_TEXT,
  PROMISES,
  SITE_URL,
  VISIBLE_PHONES,
  mailtoHref,
  whatsappHref,
} from "@/data/company";

const PATH = "/iletisim";
const TITLE = "İletişim ve Yol Tarifi – Tekkeköy, Samsun";
const { street, district, city } = COMPANY.address;
// Telefon numarası bilerek yok: doğrulanmamış numara Google snippet'ine girmesin.
const DESCRIPTION = `${COMPANY.name}: ${street} ${district}/${city}. ${HOURS_SHORT}. Yol tarifi, e-posta ve teklif formu.`;

/** Google Haritalar yol tarifi (adres COMPANY'den üretilir). */
const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${COMPANY.name}, ${street}, ${district}, ${city}`);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: PATH,
    title: `${TITLE} | ${COMPANY.name}`,
    description: DESCRIPTION,
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name} – Tekkeköy, Samsun` }],
  },
};

export default function ContactPage() {
  const wa = whatsappHref("Merhaba, teklif almak istiyorum.");

  // Tam LocalBusiness kaydı layout'ta (#store); burada yalnızca ona referans verilir.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}${PATH}#webpage`,
    url: `${SITE_URL}${PATH}`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#store` },
    mainEntity: { "@id": `${SITE_URL}/#store` },
  };

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={`${COMPANY.name} İletişim: ${district}, ${city}`}
        description={`Tekkeköy'deki mağazamıza gelebilir, teklif formunu doldurabilir ya da e-posta gönderebilirsiniz. ${PROMISES.quoteTurnaround}`}
        crumbs={[{ label: "İletişim", href: PATH }]}
      />

      {/* Hızlı eylemler (ekranın üst kısmı: Reveal yok) */}
      <section className="border-b border-line bg-white">
        <div className="container-x flex flex-col gap-3 py-6 sm:flex-row sm:flex-wrap sm:items-center">
          <RfqTriggerButton mode="open" source="iletisim-1" className="btn-action min-h-[48px] px-6" />
          <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[48px] px-5">
            <Navigation className="h-4 w-4" aria-hidden /> Yol tarifi al
          </a>
          <a href={mailtoHref("Bilgi talebi")} className="btn-ghost min-h-[48px] px-5">
            <Mail className="h-4 w-4" aria-hidden /> E-posta gönder
          </a>
          {VISIBLE_PHONES[0] && (
            <a href={VISIBLE_PHONES[0].href} className="btn-ghost min-h-[48px] px-5">
              <Phone className="h-4 w-4" aria-hidden /> Ara: {VISIBLE_PHONES[0].label}
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[48px] px-5">
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          )}
          <p className="text-xs text-ink-muted sm:ml-auto">{PROMISES.quoteReassurance}</p>
        </div>
      </section>

      <section className="section pt-10 sm:pt-14">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* NAP + saatler + iletişim */}
          <div className="space-y-4 lg:col-span-5">
            <div className="surface p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                <Store className="h-5 w-5 text-brand" aria-hidden /> Mağaza ve depo
              </h2>
              <address className="mt-3 not-italic text-[15px] leading-relaxed text-ink">
                <strong className="block font-semibold">{COMPANY.name}</strong>
                <span className="block text-sm text-ink-soft">{COMPANY.legalName}</span>
                <span className="mt-2 flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>
                    {street}
                    <br />
                    {COMPANY.address.postalCode} {district} / {city}
                  </span>
                </span>
              </address>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                <a
                  href={DIRECTIONS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  <Navigation className="h-4 w-4" aria-hidden /> Yol tarifi al
                </a>
                <a
                  href={COMPANY.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
                >
                  Google Haritalar&apos;da aç <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>

            <div className="surface p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                <Clock className="h-5 w-5 text-brand" aria-hidden /> Çalışma saatleri
              </h2>
              <p className="mt-3 text-[15px] font-medium text-ink">{HOURS_TEXT}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{PROMISES.quoteTurnaround}</p>
            </div>

            <div className="surface p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                <Mail className="h-5 w-5 text-brand" aria-hidden /> E-posta{VISIBLE_PHONES.length > 0 ? " ve telefon" : ""}
              </h2>
              <ul className="mt-2 space-y-0.5 text-[15px]">
                <li>
                  <a
                    href={mailtoHref()}
                    className="inline-flex min-h-[44px] items-center font-medium text-ink underline-offset-2 hover:text-brand hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </li>
                {VISIBLE_PHONES.map((p) => (
                  <li key={p.e164}>
                    <a href={p.href} className="inline-flex min-h-[44px] items-center gap-2 font-medium text-ink hover:text-brand">
                      <Phone className="h-4 w-4 text-brand" aria-hidden /> {p.label}
                    </a>
                  </li>
                ))}
                {CONTACT_NUMBERS_VERIFIED && COMPANY.fax && (
                  <li className="flex min-h-[44px] items-center gap-2 text-ink-soft">
                    <Printer className="h-4 w-4 text-brand" aria-hidden /> Faks: {COMPANY.fax}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink">Mesaj gönderin</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                Ürün, stok veya sipariş sorunuzu yazın; size e-postayla dönüş yapalım.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toptan / perakende yönlendirme */}
      <section className="container-x pb-12 sm:pb-16" aria-labelledby="alim-baslik">
        <h2 id="alim-baslik" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Size uygun alım şekli
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="surface p-6">
            <h3 className="text-base font-semibold text-ink">Kurumsal ve toptan alım</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Fabrika, şantiye ve atölyelere koli ve palet bazında teklif veriyoruz. {PROMISES.delivery}
            </p>
          </div>
          <div className="surface p-6">
            <h3 className="text-base font-semibold text-ink">Az miktar ve perakende</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Bir koliden azına mı ihtiyacınız var? {district} mağazamızdan perakende alım yapabilirsiniz. Mağaza saatleri:{" "}
              {HOURS_TEXT}.
            </p>
          </div>
        </div>
      </section>

      {/* Harita (tıklayınca yüklenir) */}
      <section className="container-x pb-20 sm:pb-24" aria-labelledby="konum-baslik">
        <div className="surface overflow-hidden">
          <div className="flex flex-col gap-2 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="konum-baslik" className="text-base font-semibold text-ink">
              Konum: {district}, {city}
            </h2>
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <Navigation className="h-4 w-4" aria-hidden /> Yol tarifi al
            </a>
          </div>
          <MapEmbed src={COMPANY.mapEmbed} title={`${COMPANY.name} konumu – ${district}, ${city}`} />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
