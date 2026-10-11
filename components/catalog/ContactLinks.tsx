import { Mail, MessageCircle, Phone } from "lucide-react";
import { COMPANY, PRIMARY_PHONE, mailtoHref, whatsappHref } from "@/data/company";

/**
 * Doğrudan iletişim bağlantıları. Telefon yalnızca doğrulanmış numara varsa (PRIMARY_PHONE),
 * WhatsApp yalnızca WHATSAPP_ENABLED iken (whatsappHref null değilse) gösterilir.
 * E-posta her zaman görünür; böylece numaralar gizliyken de blok eksik görünmez.
 */
export default function ContactLinks({
  subject,
  body,
  whatsappText,
  className = "",
}: {
  subject?: string;
  body?: string;
  whatsappText?: string;
  className?: string;
}) {
  const wa = whatsappHref(whatsappText);
  const linkCls =
    "inline-flex min-h-[44px] items-center gap-2.5 rounded-lg text-sm font-medium text-ink-soft transition-colors hover:text-brand";

  return (
    <ul className={`flex flex-col ${className}`}>
      <li>
        <a href={mailtoHref(subject, body)} className={linkCls}>
          <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          <span className="break-all">{COMPANY.email}</span>
        </a>
      </li>
      {PRIMARY_PHONE && (
        <li>
          <a href={PRIMARY_PHONE.href} className={linkCls}>
            <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
            {PRIMARY_PHONE.label}
          </a>
        </li>
      )}
      {wa && (
        <li>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={linkCls}>
            <MessageCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden />
            WhatsApp ile yazın
          </a>
        </li>
      )}
    </ul>
  );
}
