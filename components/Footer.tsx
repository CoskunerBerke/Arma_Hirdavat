import Image from "next/image";
import Link from "next/link";
import { Clock, CreditCard, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone, Printer } from "lucide-react";
import {
  COMPANY,
  CONTACT_NUMBERS_VERIFIED,
  HOURS_TEXT,
  PROMISES,
  VISIBLE_PHONES,
  mailtoHref,
  whatsappHref,
} from "@/data/company";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import RfqTriggerButton from "@/components/RfqTriggerButton";

/** Derleme (sunucu) anında hesaplanır. */
const YEAR = new Date().getFullYear();

const CORPORATE_LINKS = [
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/markalar", label: "Markalar" },
  { href: "/urun-gruplari", label: "Teknik Hırdavat" },
  { href: "/katalog", label: "Katalog" },
  { href: "/rehber", label: "Rehberler" },
  { href: "/#sss", label: "Sıkça Sorulan Sorular" },
] as const;

const linkBase = "inline-flex min-h-[32px] items-center py-1 transition-colors hover:text-white focus-visible:text-white";
const linkClass = `${linkBase} text-slate-300`;
const strongLinkClass = `${linkBase} font-semibold text-white hover:underline`;

const NEW_TAB = <span className="sr-only"> (yeni sekmede açılır)</span>;

export default function Footer() {
  const whatsapp = whatsappHref();

  return (
    <footer className="border-t border-slate-800 bg-[#0B1328] text-slate-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        {/* Marka + birincil eylem */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex rounded-md">
            <Image src="/images/logo.png" alt={COMPANY.name} width={133} height={44} className="h-11 w-auto rounded-md" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300">{COMPANY.tagline}.</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
            FABA iş eldiveni ve koruyucu giyimde koli ve palet bazında toptan teklif. {PROMISES.quoteShort}.
          </p>
          <RfqTriggerButton
            source="footer"
            aria-describedby="footer-teklif-notu"
            className="btn-action mt-6 min-h-[48px] px-5"
          />
          <p id="footer-teklif-notu" className="mt-2 text-xs text-slate-400">
            {PROMISES.quoteReassurance}
          </p>
        </div>

        {/* Ürünler: 8 kategori */}
        <nav aria-labelledby="footer-urunler" className="lg:col-span-3">
          <h2 id="footer-urunler" className="text-sm font-semibold text-white">
            Ürünler
          </h2>
          <ul className="mt-3 space-y-0.5 text-sm">
            {CATEGORY_PAGES.map((c) => (
              <li key={c.slug}>
                <Link href={categoryHref(c.name)} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/urunler" className={strongLinkClass}>
                Tüm ürünler
              </Link>
            </li>
          </ul>
        </nav>

        {/* Kurumsal */}
        <nav aria-labelledby="footer-kurumsal" className="lg:col-span-2">
          <h2 id="footer-kurumsal" className="text-sm font-semibold text-white">
            Kurumsal
          </h2>
          <ul className="mt-3 space-y-0.5 text-sm">
            {CORPORATE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* İletişim (NAP) */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">İletişim</h2>
          <address className="mt-4 space-y-3.5 text-sm not-italic text-slate-300">
            <div className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
              <div>
                <p className="font-semibold text-white">{COMPANY.name}</p>
                <p>{COMPANY.address.full}</p>
                <a
                  href={COMPANY.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-[32px] items-center gap-1.5 font-semibold text-sky-300 hover:text-white"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden />
                  Yol tarifi al
                  {NEW_TAB}
                </a>
              </div>
            </div>
            <p className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
              <span>{HOURS_TEXT}</span>
            </p>
            <p className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
              <a href={mailtoHref()} className="break-all hover:text-white">
                {COMPANY.email}
              </a>
            </p>
            {VISIBLE_PHONES.length > 0 && (
              <p className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
                <span className="flex flex-col">
                  {VISIBLE_PHONES.map((p) => (
                    <a key={p.href} href={p.href} className="hover:text-white">
                      {p.label}
                    </a>
                  ))}
                </span>
              </p>
            )}
            {CONTACT_NUMBERS_VERIFIED && COMPANY.fax && (
              <p className="flex gap-2.5">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
                <span>Faks: {COMPANY.fax}</span>
              </p>
            )}
            {whatsapp && (
              <p className="flex gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp
                  {NEW_TAB}
                </a>
              </p>
            )}
          </address>
          <Link href="/iletisim" className={`${strongLinkClass} mt-2`}>
            İletişim sayfası
          </Link>
        </div>
      </div>

      {/* Yasal + ödeme */}
      <div className="border-t border-slate-800/80">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              © {YEAR} {COMPANY.legalName}
            </p>
            <p>Web sitemiz {COMPANY.onlineSince} yılından beri yayında.</p>
          </div>
          <nav aria-label="Yasal ve ödeme">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <li>
                <Link href="/kvkk" className="inline-flex min-h-[32px] items-center hover:text-white">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <a
                  href={COMPANY.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[32px] items-center gap-1.5 hover:text-white"
                >
                  <CreditCard className="h-3.5 w-3.5" aria-hidden />
                  Online Ödeme
                  <ExternalLink className="h-3 w-3" aria-hidden />
                  {NEW_TAB}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
