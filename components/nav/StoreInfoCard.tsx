"use client";

import { Clock, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { COMPANY, HOURS_TEXT, PRIMARY_PHONE } from "@/data/company";
import { track, EVENTS } from "@/lib/track";

/** Üst şerit kartının ve mobil menünün ortak mağaza metni (işletme sahibinin brifinden). */
export const STORE_CARD_TITLE = "Arma Hırdavat – Samsun Tekkeköy Merkez Mağaza";
export const STORE_CARD_TEXT =
  "Tekil parça, atölye ve bireysel teknik hırdavat ihtiyaçlarınız için Tekkeköy mağazamızda hizmetinizdeyiz. Web portalımız fabrikaların ve sanayi tesislerinin yüksek hacimli koli ve palet sevkiyatlarına tahsis edilmiştir.";

interface StoreInfoCardProps {
  /** Başlığın id'si (popover aria-labelledby için) */
  titleId?: string;
  /** Analitik kaynağı */
  source: string;
  /** Başlığı gösterme (mobil menüde düğme başlığı zaten var) */
  hideTitle?: boolean;
}

/**
 * Fiziki mağaza bilgi kartı: başlık, açıklama, adres, saatler, (doğrulanmışsa) telefon ve yol tarifi.
 * Hem üst şeritteki "Fiziki Mağazamız & Perakende" açılır kartında hem mobil menüde kullanılır.
 */
export default function StoreInfoCard({ titleId, source, hideTitle = false }: StoreInfoCardProps) {
  return (
    <div className="text-sm text-ink-soft">
      {!hideTitle && (
        <p id={titleId} className="pr-8 text-[15px] font-bold leading-snug text-navy">
          {STORE_CARD_TITLE}
        </p>
      )}
      <p className={`leading-relaxed ${hideTitle ? "" : "mt-2"}`}>{STORE_CARD_TEXT}</p>

      <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
        <li className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
          <span>
            <span className="sr-only">Adres: </span>
            <address className="not-italic text-ink">{COMPANY.address.full}</address>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
          <span className="text-ink">
            <span className="sr-only">Çalışma saatleri: </span>
            {HOURS_TEXT}
            <span className="block text-xs text-ink-muted">Pazar kapalı</span>
          </span>
        </li>
        {PRIMARY_PHONE && (
          <li className="flex items-start gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
            <a
              href={PRIMARY_PHONE.href}
              onClick={() => track(EVENTS.phoneClick, { kaynak: source })}
              className="font-semibold text-ink hover:text-accent-ink"
            >
              <span className="sr-only">Telefon: </span>
              {PRIMARY_PHONE.label}
            </a>
          </li>
        )}
      </ul>

      <a
        href={COMPANY.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 text-sm font-bold text-white transition-colors hover:bg-navy-light"
      >
        <Navigation className="h-4 w-4 text-accent" aria-hidden />
        Google Haritalar&apos;da yol tarifi al
        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        <span className="sr-only">(yeni sekmede açılır)</span>
      </a>
    </div>
  );
}
