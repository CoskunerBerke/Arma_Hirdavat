"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Yedek kanal: sunucu talebi iletemediğinde (NOT_CONFIGURED / SERVER / NETWORK)
 * dürüstçe "henüz ulaşmadı" der ve tek tıkla e-posta taslağı, kopyalama ve
 * (numara doğrulanmışsa) WhatsApp sunar. Kullanıcının yazdıkları silinmez.
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Loader2, Mail, MessageCircle, RotateCcw } from "lucide-react";
import { COMPANY, mailtoHref } from "@/data/company";
import { buildLeadMailto, buildLeadText, buildLeadWhatsApp, type LeadErrorCode, type LeadPayload } from "@/lib/lead";
import { EVENTS, track } from "@/lib/track";

export interface LeadFallbackProps {
  payload: LeadPayload;
  code?: LeadErrorCode;
  /** Verilirse h3 başlık olarak gösterilir ve açılışta odaklanır (diyalogda başlık diyalogun kendisindedir) */
  heading?: string;
  onRetry?: () => void;
  retrying?: boolean;
  /** "E-postayı gönderdim" düğmesi (ör. listeyi temizlemek için) */
  onSentByEmail?: () => void;
  sentByEmailLabel?: string;
  className?: string;
}

export default function LeadFallback({
  payload,
  code,
  heading,
  onRetry,
  retrying = false,
  onSentByEmail,
  sentByEmailLabel = "E-postayı gönderdim",
  className = "",
}: LeadFallbackProps) {
  const origin = typeof window !== "undefined" ? window.location.origin : undefined;
  const text = useMemo(() => buildLeadText(payload, { origin }), [payload, origin]);
  const mailto = useMemo(() => buildLeadMailto(payload, { origin }), [payload, origin]);
  const whatsapp = useMemo(() => buildLeadWhatsApp(payload, { origin }), [payload, origin]);

  const [copyState, setCopyState] = useState<"idle" | "done" | "manual">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (heading) headingRef.current?.focus();
  }, [heading]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const isRfq = payload.kind === "rfq";
  const what = isRfq ? "Talebiniz" : "Mesajınız";
  const reason =
    code === "NETWORK"
      ? `Bağlantı kurulamadığı için ${isRfq ? "talebiniz" : "mesajınız"} iletilemedi.`
      : `Form şu anda ${isRfq ? "talebinizi" : "mesajınızı"} iletemiyor.`;

  const onCopy = async () => {
    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") throw new Error("clipboard");
      await navigator.clipboard.writeText(text);
      setCopyState("done");
    } catch {
      // Pano izni yok / güvenli olmayan bağlam: metni göster ve seç
      if (detailsRef.current) detailsRef.current.open = true;
      textRef.current?.focus();
      textRef.current?.select();
      setCopyState("manual");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopyState("idle"), 5000);
  };

  return (
    <div className={className}>
      {heading && (
        <h3 ref={headingRef} tabIndex={-1} className="text-lg font-bold text-ink outline-none">
          {heading}
        </h3>
      )}
      <p className={`${heading ? "mt-2" : ""} text-sm leading-relaxed text-ink-soft`}>
        {reason} {isRfq ? "Listeniz ve bilgileriniz silinmedi." : "Yazdıklarınız silinmedi."} Aşağıdaki düğme e-posta
        uygulamanızı {isRfq ? "talebiniz" : "mesajınız"} hazır yazılmış olarak açar; yalnızca &ldquo;Gönder&rdquo;e basmanız
        yeterli.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <a
          href={mailto}
          onClick={() => track(EVENTS.leadMailtoFallback, { tur: payload.kind })}
          className="btn-action min-h-[48px] text-base sm:col-span-2 sm:text-sm"
        >
          <Mail className="h-4 w-4" aria-hidden />
          E-posta ile gönder
        </a>
        <button type="button" onClick={onCopy} className="btn-ghost min-h-[44px]">
          {copyState === "done" ? (
            <>
              <Check className="h-4 w-4 text-action" aria-hidden /> Kopyalandı
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden /> {isRfq ? "Talebi kopyala" : "Mesajı kopyala"}
            </>
          )}
        </button>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { yer: "yedek_kanal" })}
            className="btn-ghost min-h-[44px]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp ile gönder
          </a>
        )}
        {onRetry && (
          <button type="button" onClick={onRetry} disabled={retrying} className="btn-ghost min-h-[44px] disabled:opacity-60">
            {retrying ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <RotateCcw className="h-4 w-4" aria-hidden />
            )}
            {retrying ? "Gönderiliyor…" : "Tekrar dene"}
          </button>
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {copyState === "done"
          ? `${what} metni panoya kopyalandı.`
          : copyState === "manual"
            ? "Otomatik kopyalama desteklenmiyor. Metin seçildi; kopyalama kısayoluyla kopyalayabilirsiniz."
            : ""}
      </p>

      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        E-posta uygulamanız açılmazsa metni kopyalayıp{" "}
        <a href={mailtoHref()} className="font-semibold text-brand underline underline-offset-2">
          {COMPANY.email}
        </a>{" "}
        adresine gönderebilirsiniz.
      </p>

      <details ref={detailsRef} className="mt-2 rounded-xl border border-line bg-slate-50 px-3">
        <summary className="flex min-h-[44px] cursor-pointer items-center text-sm font-semibold text-ink-soft">
          {isRfq ? "Talep metnini göster" : "Mesaj metnini göster"}
        </summary>
        <textarea
          ref={textRef}
          readOnly
          value={text}
          rows={8}
          aria-label={isRfq ? "Talep metni" : "Mesaj metni"}
          className="field mb-3 font-mono text-xs leading-relaxed"
        />
      </details>

      {onSentByEmail && (
        <button
          type="button"
          onClick={onSentByEmail}
          className="mt-2 inline-flex min-h-[44px] items-center text-sm font-medium text-ink-muted underline underline-offset-2 hover:text-ink"
        >
          {sentByEmailLabel}
        </button>
      )}
    </div>
  );
}
