"use client";

import { ClipboardList, Clock, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone, Store, X } from "lucide-react";
import { useModal } from "@/lib/useModal";
import { useQuote } from "@/components/QuoteContext";
import TrackedLink from "./TrackedLink";
import { COMPANY, CTA, HOURS_TEXT, PRIMARY_PHONE, PROMISES, mailtoHref, whatsappHref } from "@/data/company";

/**
 * Tekkeköy mağazası penceresi (components/RetailStoreModal.tsx tarafından tembel yüklenir).
 * Küçük alıcıyı geri çevirmez: tekil alım → mağaza, koli / palet → teklif.
 */
export default function RetailStoreDialog({ onClose }: { onClose: () => void }) {
  const { panelRef } = useModal({ open: true, onClose });
  const { setIsOpen: openQuote } = useQuote();
  const waHref = whatsappHref("Merhaba, mağazanızdaki bir ürün hakkında bilgi almak istiyorum.");

  const goToQuote = () => {
    onClose();
    openQuote(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="retail-modal-title"
      aria-describedby="retail-modal-desc"
    >
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in" onClick={onClose} aria-hidden />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-white shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-amber-300" aria-hidden>
              <Store className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-medium text-ink-muted">Fiziki mağaza</p>
              <h2 id="retail-modal-title" className="text-base font-bold text-ink sm:text-lg">
                Tekkeköy mağazamız
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink-muted transition hover:bg-slate-200 hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="space-y-4 p-5 text-sm text-ink-soft sm:p-6">
          <p id="retail-modal-desc" className="leading-relaxed">
            Tekil ürün ve az miktardaki ihtiyaçlarınız için mağazamıza bekleriz. Koli ve palet alımlarında ise online
            teklif alabilirsiniz; fiyatınız e-postanıza gelir.
          </p>

          <div className="space-y-3 rounded-2xl border border-line bg-canvas/60 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Adres</p>
                <address className="not-italic">{COMPANY.address.full}</address>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Çalışma saatleri</p>
                <p>{HOURS_TEXT}</p>
              </div>
            </div>
            {PRIMARY_PHONE && (
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Telefon</p>
                  <TrackedLink
                    href={PRIMARY_PHONE.href}
                    eventKey="phoneClick"
                    placement="store_modal"
                    className="font-medium text-brand hover:underline"
                  >
                    {PRIMARY_PHONE.label}
                  </TrackedLink>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <div className="min-w-0">
                <p className="font-semibold text-ink">E-posta</p>
                <TrackedLink
                  href={mailtoHref("Mağaza hakkında bilgi")}
                  eventKey="emailClick"
                  placement="store_modal"
                  className="break-all font-medium text-brand hover:underline"
                >
                  {COMPANY.email}
                </TrackedLink>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <a
              href={COMPANY.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-h-[48px] w-full sm:flex-1"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              <span>Yol tarifi al</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              <span className="sr-only">(Google Haritalar, yeni sekmede açılır)</span>
            </a>
            <button type="button" onClick={goToQuote} className="btn-action min-h-[48px] w-full sm:flex-1">
              <ClipboardList className="h-4 w-4" aria-hidden />
              <span>{CTA.primary}</span>
            </button>
          </div>

          {waHref && (
            <TrackedLink
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              eventKey="whatsappClick"
              placement="store_modal"
              className="btn-ghost min-h-[48px] w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span>WhatsApp ile stok sorun</span>
            </TrackedLink>
          )}

          <p className="text-center text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
        </div>
      </div>
    </div>
  );
}
