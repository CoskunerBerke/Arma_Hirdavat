import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ExternalLink, MapPin, Navigation, Phone, Store } from "lucide-react";
import TrackedLink from "./home/TrackedLink";
import RetailModalTrigger from "./home/RetailModalTrigger";
import { COMPANY, HARDWARE_GROUPS, HOURS_TEXT, PRIMARY_PHONE } from "@/data/company";

/*
 * Perakende satış — Tekkeköy mağazası (sunucu bileşeni), ana sayfada vurgulu bölüm.
 * Görsel: mağaza binası (hero posteri). Adres, saat, telefon yalnızca data/company.ts'ten gelir;
 * telefon doğrulanmadıysa gösterilmez.
 */
const POINTS = [
  "Tek parça ve az miktarda alım",
  "Ürünleri yerinde görüp seçme",
  `${HARDWARE_GROUPS.length} ürün grubunda teknik hırdavat`,
  "İş eldiveni, tulum ve iş güvenliği ürünleri",
];

export default function RetailStoreSection() {
  return (
    <section id="fiziki-magaza" className="scroll-mt-24 bg-white py-14 sm:py-20" aria-labelledby="fiziki-magaza-baslik">
      <div className="container-x">
        <div className="grid items-stretch gap-8 overflow-hidden rounded-3xl border border-line bg-canvas shadow-xl lg:grid-cols-2 lg:gap-0">
          {/* Mağaza fotoğrafı */}
          <div className="relative min-h-[260px] sm:min-h-[340px]">
            <Image
              src="/videos/hero-poster-wide-1080.jpg"
              alt="Arma Hırdavat Tekkeköy mağaza binası"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={70}
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-950 shadow-lg sm:left-6 sm:top-6">
              <Store className="h-4 w-4" aria-hidden />
              Perakende satış
            </span>
            <p className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white sm:bottom-6 sm:left-6">
              <MapPin className="h-4 w-4 text-amber-300" aria-hidden />
              {COMPANY.address.district} / {COMPANY.address.city}
            </p>
          </div>

          {/* İçerik */}
          <div className="p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Mağazamız</p>
            <h2 id="fiziki-magaza-baslik" className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Perakende satış: Tekkeköy mağazamıza bekleriz
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              Koli ve palet gerekmez. Tek ürün, birkaç çift eldiven ya da atölyenizin günlük ihtiyaçları için mağazamızdan
              doğrudan alışveriş yapabilirsiniz.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm font-medium text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3 rounded-2xl border border-line bg-white p-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                <div>
                  <dt className="sr-only">Adres</dt>
                  <dd>
                    <address className="not-italic text-ink">{COMPANY.address.full}</address>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                <div>
                  <dt className="sr-only">Çalışma saatleri</dt>
                  <dd className="text-ink">{HOURS_TEXT}</dd>
                </div>
              </div>
              {PRIMARY_PHONE && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                  <div>
                    <dt className="sr-only">Telefon</dt>
                    <dd>
                      <TrackedLink
                        href={PRIMARY_PHONE.href}
                        eventKey="phoneClick"
                        placement="store_section"
                        className="font-semibold text-ink hover:text-amber-700"
                      >
                        {PRIMARY_PHONE.label}
                      </TrackedLink>
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={COMPANY.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-300"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Yol tarifi al
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
                <span className="sr-only">(yeni sekmede açılır)</span>
              </a>
              <RetailModalTrigger className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 text-sm font-semibold text-ink transition-colors hover:border-amber-300">
                Mağaza bilgileri
              </RetailModalTrigger>
              <Link
                href="/urun-gruplari"
                className="inline-flex min-h-[48px] items-center justify-center gap-1.5 px-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
              >
                Ürün grupları <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
