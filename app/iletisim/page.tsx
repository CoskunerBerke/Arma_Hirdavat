import type { Metadata } from "next";
import { CreditCard, ExternalLink, Mail, MapPin, Phone, Printer } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "İletişim & Kurumsal Toptan Teklif Hattı | Arma Hırdavat",
  description: `Arma Hırdavat toptan teknik hırdavat sipariş ve kurumsal teklif hattı. Organize sanayi bölgeleri, fabrikalar ve şantiyeler için koli/palet ambar sevkiyatı ve toptan iskonto desteği. İletişim: ${COMPANY.phones[0].label}, ${COMPANY.email}.`,
  alternates: { canonical: "/iletisim" },
};

const CARDS = [
  {
    icon: Phone,
    label: "Telefon & Toptan Sipariş Hattı",
    lines: COMPANY.phones.map((p) => ({ text: p.label, href: p.href })),
  },
  { icon: Printer, label: "Faks", lines: [{ text: COMPANY.fax }] },
  { icon: Mail, label: "Kurumsal E-posta", lines: [{ text: COMPANY.email, href: `mailto:${COMPANY.email}` }] },
  { icon: MapPin, label: "Merkez Depo & Sevkiyat Adresi", lines: [{ text: COMPANY.address.full, href: COMPANY.mapLink }] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim & Toptan Tedarik"
        title="Kurumsal Toptan Teklif ve Sipariş Hattı"
        description="Organize sanayi bölgeleri ve ağır sanayi tesislerine koli ve palet bazında toptan teknik hırdavat sevkiyatı yapıyoruz. Fiyat teklifi, toptan iskonto ve ambar teslimat süreleri için bize dilediğiniz kanaldan ulaşabilirsiniz."
        crumbs={[{ label: "İletişim", href: "/iletisim" }]}
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          {/* İletişim bilgileri */}
          <div className="space-y-4 lg:col-span-5">
            {CARDS.map((c, i) => (
              <Reveal key={c.label} delay={i * 60} className="surface flex gap-4 p-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-brand-50">
                  <c.icon className="h-5 w-5 text-brand" aria-hidden />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-ink-muted">{c.label}</h2>
                  {c.lines.map((l) =>
                    "href" in l && l.href ? (
                      <a
                        key={l.text}
                        href={l.href}
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 block text-[15px] font-medium text-ink hover:text-brand"
                      >
                        {l.text}
                      </a>
                    ) : (
                      <p key={l.text} className="mt-1 text-[15px] font-medium text-ink">
                        {l.text}
                      </p>
                    )
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <a href={COMPANY.paymentUrl} target="_blank" rel="noopener noreferrer" className="surface flex items-center justify-between gap-4 p-5 transition hover:border-brand/30">
                <span className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-brand-50">
                    <CreditCard className="h-5 w-5 text-brand" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-ink">Online tahsilat</span>
                    <span className="block text-sm text-ink-muted">Kredi kartı ile güvenli ödeme</span>
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 text-ink-muted" aria-hidden />
              </a>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal className="glass p-6 sm:p-8 lg:col-span-7" delay={80}>
            <h2 className="text-xl font-semibold text-ink">Teklif formu</h2>
            <p className="mt-1.5 text-sm text-ink-soft">İhtiyacınızı yazın, en kısa sürede dönüş yapalım.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-24">
        <Reveal className="surface overflow-hidden">
          <div className="flex flex-col gap-2 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-ink">Konum</h2>
            <a href={COMPANY.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand">
              Google Haritalar&apos;da aç <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <iframe
            src={COMPANY.mapEmbed}
            title="Arma Hırdavat konumu – Tekkeköy, Samsun"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[380px] w-full border-0"
          />
        </Reveal>
      </section>
    </>
  );
}
