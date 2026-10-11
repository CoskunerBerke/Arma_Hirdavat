import { ArrowRight, ClipboardList, FileCheck2, Mail, MessageCircle, Phone } from "lucide-react";
import RfqTriggerButton from "./RfqTriggerButton";
import Reveal from "./Reveal";
import TrackedLink from "./home/TrackedLink";
import { COMPANY, CTA, PRIMARY_PHONE, PROMISES, mailtoHref, whatsappHref } from "@/data/company";

interface CtaBandProps {
  title?: string;
  /** Başlığın altındaki isteğe bağlı kısa açıklama */
  description?: string;
}

/*
 * Sayfa sonu teklif bandı (sunucu bileşeni). Birincil düğme teklif penceresini açar.
 * İkincil kanallar: e-posta her zaman; telefon / WhatsApp yalnızca numaralar doğrulandıysa.
 */
export default function CtaBand({
  title = "İhtiyaç listenizi gönderin, resmi teknik teklifiniz aynı gün elinizde olsun.",
  description,
}: CtaBandProps) {
  const waHref = whatsappHref("Merhaba, teklif almak istiyorum.");

  return (
    <section className="container-x pb-20 sm:pb-24" aria-labelledby="cta-band-baslik">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy p-6 shadow-2xl sm:p-12">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-accent" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-accent">Kurumsal teklif</p>
            <h2 id="cta-band-baslik" className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            {description && <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>}
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-slate-300">
              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>{PROMISES.quoteTurnaround}</span>
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
              <li>
                <TrackedLink
                  href={mailtoHref("Teklif talebi")}
                  eventKey="emailClick"
                  placement="cta_band"
                  className="inline-flex min-h-[44px] items-center gap-2 break-all hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden /> {COMPANY.email}
                </TrackedLink>
              </li>
              {PRIMARY_PHONE && (
                <li>
                  <TrackedLink
                    href={PRIMARY_PHONE.href}
                    eventKey="phoneClick"
                    placement="cta_band"
                    className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden /> {PRIMARY_PHONE.label}
                  </TrackedLink>
                </li>
              )}
              {waHref && (
                <li>
                  <TrackedLink
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventKey="whatsappClick"
                    placement="cta_band"
                    className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden /> WhatsApp ile yazın
                  </TrackedLink>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:items-start lg:items-center">
            <RfqTriggerButton source="cta_band" className="btn-action min-h-[52px] px-7 text-base shadow-xl shadow-black/30">
              <ClipboardList className="h-5 w-5" aria-hidden />
              <span>{CTA.primary}</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </RfqTriggerButton>
            <p className="text-center text-xs text-slate-300">{PROMISES.quoteReassurance}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
