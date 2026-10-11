import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  CreditCard,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Printer,
} from "lucide-react";
import {
  COMPANY,
  CONTACT_NUMBERS_VERIFIED,
  HARDWARE_GROUPS,
  HOURS_TEXT,
  PROMISES,
  VISIBLE_PHONES,
  mailtoHref,
  whatsappHref,
} from "@/data/company";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { GUIDES, guideHref } from "@/data/guides";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import FooterSkyline from "@/components/FooterSkyline";
import { formatTrDate } from "@/components/guides/jsonld";

/** Derleme (sunucu) anında hesaplanır. */
const YEAR = new Date().getFullYear();

const CORPORATE_LINKS = [
  { href: "/kurumsal", label: "Hakkımızda" },
  { href: "/#referanslar", label: "Referanslarımız" },
  { href: "/#hizmetler", label: "Hizmetlerimiz" },
  { href: "/#teslimat", label: "81 ile teslimat" },
  { href: "/markalar", label: "Markalar" },
  { href: "/katalog", label: "Katalog" },
  { href: "/#sss", label: "Sıkça Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
] as const;

const linkBase =
  "group inline-flex min-h-[40px] items-center gap-1.5 py-1 transition-colors hover:text-accent focus-visible:text-accent sm:min-h-[32px]";
const linkClass = `${linkBase} text-slate-300`;
const strongLinkClass = `${linkBase} font-semibold text-white`;
const headingClass = "text-base font-bold text-white";

const NEW_TAB = <span className="sr-only"> (yeni sekmede açılır)</span>;

/** Sütun başlığının altındaki kısa vurgu çizgisi */
function Bar() {
  return <span aria-hidden className="mt-2 block h-0.5 w-10 bg-accent" />;
}

/**
 * Alt bilgi (kurumsal düzen): üstte sanayi silueti, koyu lacivert zemin;
 * sütunlar: logo + iletişim · Kurumsal · Ürünler · Rehberler; altta KVKK ve telif satırı.
 * İletişim verisi yalnızca data/company.ts'ten (telefon yalnızca doğrulanınca görünür).
 */
export default function Footer() {
  const whatsapp = whatsappHref();
  const guides = [...GUIDES].sort((a, b) => b.dateModified.localeCompare(a.dateModified)).slice(0, 4);

  return (
    <footer className="text-slate-300">
      {/* Sanayi silueti (dekoratif): alt bilginin üst kenarı */}
      <FooterSkyline className="h-14 text-navy-deep sm:h-20 lg:h-auto" />

      <div className="bg-navy-deep">
        <div className="container-x grid gap-10 pb-12 pt-6 sm:grid-cols-2 sm:pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-14">
          {/* Logo + iletişim (NAP) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex rounded-md">
              <Image src="/images/logo.png" alt={COMPANY.name} width={133} height={44} className="h-11 w-auto rounded-md" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">{COMPANY.tagline}.</p>

            <address className="mt-5 space-y-3 text-sm not-italic text-slate-300">
              <div className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-white">{COMPANY.name}</p>
                  <p>{COMPANY.address.full}</p>
                  <a
                    href={COMPANY.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-[40px] items-center gap-1.5 font-semibold text-accent hover:text-white sm:min-h-[32px]"
                  >
                    <Navigation className="h-3.5 w-3.5" aria-hidden />
                    Yol tarifi al
                    {NEW_TAB}
                  </a>
                </div>
              </div>
              <p className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a href={mailtoHref()} className="inline-flex min-h-[32px] items-center break-all hover:text-accent">
                  {COMPANY.email}
                </a>
              </p>
              <p className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>{HOURS_TEXT}</span>
              </p>
              {VISIBLE_PHONES.length > 0 && (
                <p className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="flex flex-col">
                    {VISIBLE_PHONES.map((p) => (
                      <a key={p.href} href={p.href} className="hover:text-accent">
                        {p.label}
                      </a>
                    ))}
                  </span>
                </p>
              )}
              {CONTACT_NUMBERS_VERIFIED && COMPANY.fax && (
                <p className="flex gap-2.5">
                  <Printer className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>Faks: {COMPANY.fax}</span>
                </p>
              )}
              {whatsapp && (
                <p className="flex gap-2.5">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    WhatsApp
                    {NEW_TAB}
                  </a>
                </p>
              )}
            </address>

            <RfqTriggerButton
              source="footer"
              aria-describedby="footer-teklif-notu"
              className="btn-action mt-6 min-h-[48px] px-5"
            />
            <p id="footer-teklif-notu" className="mt-2 text-xs text-slate-400">
              {PROMISES.quoteReassurance}
            </p>
          </div>

          {/* Kurumsal */}
          <nav aria-labelledby="footer-kurumsal" className="lg:col-span-2">
            <h2 id="footer-kurumsal" className={headingClass}>
              Kurumsal
            </h2>
            <Bar />
            <ul className="mt-3 space-y-0.5 text-sm">
              {CORPORATE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ürünler: 8 kategori */}
          <nav aria-labelledby="footer-urunler" className="lg:col-span-3">
            <h2 id="footer-urunler" className={headingClass}>
              Ürünler
            </h2>
            <Bar />
            <ul className="mt-3 space-y-0.5 text-sm">
              {CATEGORY_PAGES.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c.name)} className={linkClass}>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/urunler" className={strongLinkClass}>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  Tüm ürünler
                </Link>
              </li>
              <li>
                <Link href="/urun-gruplari" className={strongLinkClass}>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  Teknik hırdavat ({HARDWARE_GROUPS.length} grup)
                </Link>
              </li>
            </ul>
          </nav>

          {/* Rehberler (tarihli) */}
          <nav aria-labelledby="footer-rehberler" className="lg:col-span-3">
            <h2 id="footer-rehberler" className={headingClass}>
              Rehberler
            </h2>
            <Bar />
            <ul className="mt-3 space-y-2 text-sm">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={guideHref(g.slug)} className="block py-1 text-slate-300 transition-colors hover:text-accent">
                    <span className="block font-medium leading-snug">{g.h1}</span>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-400">
                      <CalendarDays className="h-3 w-3 shrink-0" aria-hidden />
                      <time dateTime={g.dateModified}>{formatTrDate(g.dateModified)}</time>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rehber" className={strongLinkClass}>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  Tüm rehberler
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Yasal + ödeme */}
        <div className="border-t border-white/10">
          <div className="container-x flex flex-col gap-3 py-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p>
                © {YEAR} {COMPANY.legalName}
              </p>
              <p>Web sitemiz {COMPANY.onlineSince} yılından beri yayında.</p>
            </div>
            <nav aria-label="Yasal ve ödeme">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <li>
                  <Link href="/kvkk" className="inline-flex min-h-[40px] items-center hover:text-accent">
                    KVKK Aydınlatma Metni
                  </Link>
                </li>
                <li>
                  <a
                    href={COMPANY.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-1.5 hover:text-accent"
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
      </div>
    </footer>
  );
}
