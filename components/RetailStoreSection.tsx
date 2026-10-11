import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Navigation, Phone, Store } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import TrackedLink from "./home/TrackedLink";
import { COMPANY, CTA, HARDWARE_GROUPS, HOURS_TEXT, PRIMARY_PHONE, mailtoHref } from "@/data/company";

/*
 * Tekkeköy mağazası (sunucu bileşeni). Küçük alıcıları geri çevirmez, doğru kanala yönlendirir:
 * koli / palet → online teklif, tekil ve az miktar → mağaza.
 * Adres, saat, telefon yalnızca data/company.ts'ten gelir; telefon doğrulanmadıysa gösterilmez.
 */
export default function RetailStoreSection() {
  return (
    <section id="fiziki-magaza" className="container-x scroll-mt-24 py-10 sm:py-16" aria-labelledby="fiziki-magaza-baslik">
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-white shadow-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
              <Store className="h-3.5 w-3.5" aria-hidden />
              Tekkeköy mağazamız
            </p>

            <h2 id="fiziki-magaza-baslik" className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Birkaç parça mı lazım? Mağazamıza bekleriz.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Online tekliflerimiz koli ve palet bazındadır. Tekil ürün, birkaç çift eldiven ya da atölyenizin günlük
              ihtiyaçları için Samsun Tekkeköy&apos;deki mağazamızdan doğrudan alışveriş yapabilirsiniz.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Koli ve palet alımı</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Listenizi gönderin, fiyatınız e-postanıza gelsin.
                </p>
                <RfqTriggerButton className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                  <span>{CTA.primary}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </RfqTriggerButton>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Tekil ve az miktarda alım</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Mağazamıza uğrayın; {HARDWARE_GROUPS.length} ürün grubunda teknik hırdavat tedarik ediyoruz.
                </p>
                <Link
                  href="/urun-gruplari"
                  className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-amber-200 hover:text-amber-100"
                >
                  Ürün gruplarını görün <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6 lg:col-span-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-amber-300" aria-hidden>
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400">Adres</p>
                <address className="text-sm not-italic leading-snug text-white">{COMPANY.address.full}</address>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-white/10 pt-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-300" aria-hidden>
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400">Çalışma saatleri</p>
                <p className="text-sm text-white">{HOURS_TEXT}</p>
              </div>
            </div>

            {PRIMARY_PHONE && (
              <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sky-300" aria-hidden>
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Telefon</p>
                  <TrackedLink
                    href={PRIMARY_PHONE.href}
                    eventKey="phoneClick"
                    placement="store_section"
                    className="text-sm font-semibold text-white hover:text-amber-200"
                  >
                    {PRIMARY_PHONE.label}
                  </TrackedLink>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 border-t border-white/10 pt-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sky-300" aria-hidden>
                <Mail className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400">E-posta</p>
                <TrackedLink
                  href={mailtoHref("Mağaza hakkında bilgi")}
                  eventKey="emailClick"
                  placement="store_section"
                  className="break-all text-sm font-semibold text-white hover:text-amber-200"
                >
                  {COMPANY.email}
                </TrackedLink>
              </div>
            </div>

            <a
              href={COMPANY.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-300"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              <span>Google Haritalar&apos;da yol tarifi al</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              <span className="sr-only">(yeni sekmede açılır)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
