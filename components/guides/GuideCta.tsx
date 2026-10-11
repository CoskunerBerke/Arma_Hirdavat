import Link from "next/link";
import { ArrowRight, ClipboardList, Clock, Mail, Phone } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { COMPANY, CTA, PRIMARY_PHONE, PROMISES, mailtoHref } from "@/data/company";

interface Props {
  title?: string;
  text: string;
  /** İkincil bağlantı (ör. ilgili kategori) */
  browseHref?: string;
  browseLabel?: string;
  /** Başlık id'si (sayfada birden fazla kutu olursa benzersiz olmalı) */
  id?: string;
}

/**
 * Rehber sonundaki yumuşak teklif kutusu: tek birincil eylem (CTA.primary), risk azaltıcı mikro metin,
 * dönüş sözü çalışma saatleriyle birlikte. Telefon yalnızca doğrulanmışsa gösterilir.
 */
export default function GuideCta({
  title = "Bu ürünler için kurumsal teklif alın",
  text,
  browseHref,
  browseLabel = "Ürünleri inceleyin",
  id = "rehber-teklif",
}: Props) {
  return (
    <section
      aria-labelledby={id}
      className="rounded-2xl border border-action-border bg-gradient-to-br from-action-light via-white to-white p-5 shadow-xs sm:p-8"
    >
      <h2 id={id} className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft">{text}</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <RfqTriggerButton className="btn-action min-h-[48px] px-6 text-base">
          <ClipboardList className="h-5 w-5" aria-hidden />
          <span>{CTA.primary}</span>
        </RfqTriggerButton>
        {browseHref && (
          <Link href={browseHref} className="btn-ghost min-h-[48px]">
            {browseLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>

      <p className="mt-3 text-sm font-medium text-action-active">{PROMISES.quoteReassurance}</p>

      <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-6">
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          <span>{PROMISES.quoteShort}</span>
        </li>
        <li className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          <a href={mailtoHref("Teklif talebi")} className="underline decoration-line-strong underline-offset-2 hover:text-brand">
            {COMPANY.email}
          </a>
        </li>
        {PRIMARY_PHONE && (
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
            <a href={PRIMARY_PHONE.href} className="underline decoration-line-strong underline-offset-2 hover:text-brand">
              {PRIMARY_PHONE.label}
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
