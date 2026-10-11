"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * /iletisim formu: /api/teklif'e { kind: "contact" } olarak gönderir.
 * Zorunlu: Ad Soyad, E-posta, Mesaj · İsteğe bağlı: Firma, Telefon.
 * Sunucu iletemezse (NOT_CONFIGURED / SERVER / NETWORK) dürüst e-posta yedeği gösterilir.
 * ──────────────────────────────────────────────────────────────────────────── */

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CTA, HOURS_TEXT } from "@/data/company";
import {
  LEAD_LIMITS,
  LEAD_MIN_FILL_MS,
  submitLead,
  validateLead,
  type LeadErrorCode,
  type LeadFieldErrors,
  type LeadPayload,
} from "@/lib/lead";
import { track } from "@/lib/track";
import RfqTriggerButton from "./RfqTriggerButton";
import KvkkNote from "./quote/KvkkNote";
import LeadFallback from "./quote/LeadFallback";
import { QUOTE_EVENTS } from "./quote/events";

type Key = "name" | "email" | "message" | "company" | "phone";
type Draft = Record<Key, string>;

const EMPTY: Draft = { name: "", email: "", message: "", company: "", phone: "" };
const ORDER: Key[] = ["name", "company", "phone", "email", "message"];

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function toPayload(f: Draft): LeadPayload {
  return {
    kind: "contact",
    name: f.name,
    email: f.email,
    message: f.message,
    company: f.company || undefined,
    phone: f.phone || undefined,
  };
}

function validate(f: Draft): LeadFieldErrors {
  const v = validateLead(toPayload(f));
  const errors: LeadFieldErrors = v.ok ? {} : { ...v.fields };
  // validateLead mesajı zorunlu tutmaz; iletişim formunda zorunlu
  if (!f.message.trim()) errors.message = "Mesajınızı yazın.";
  return errors;
}

const labelCls = "mb-2 block text-sm font-medium text-ink";
const errCls = "mt-1 text-xs font-medium text-red-700";

export default function ContactForm() {
  const uid = useId();
  const [form, setForm] = useState<Draft>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState<LeadFieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<{ id: string; email: string } | null>(null);
  const [fallback, setFallback] = useState<{ payload: LeadPayload; code: LeadErrorCode } | null>(null);
  const startedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    startedAt.current = Date.now();
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  const clientErrors = useMemo(() => validate(form), [form]);
  const errorFor = (k: Key) => serverErrors[k] ?? (touched[k] || submitAttempted ? clientErrors[k] : undefined);

  const setField = (k: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (serverErrors[k]) {
      setServerErrors((s) => {
        const n = { ...s };
        delete n[k];
        return n;
      });
    }
  };

  const fieldProps = (k: Key, required = false) => {
    const err = errorFor(k);
    return {
      id: `${uid}-${k}`,
      name: k,
      required,
      "aria-required": required || undefined,
      "aria-invalid": err ? (true as const) : undefined,
      "aria-describedby": err ? `${uid}-${k}-err` : undefined,
      value: form[k],
      onChange: setField(k),
      onBlur: () => setTouched((t) => (t[k] ? t : { ...t, [k]: true })),
    };
  };

  const errorText = (k: Key) => {
    const err = errorFor(k);
    return err ? (
      <p id={`${uid}-${k}-err`} className={errCls}>
        {err}
      </p>
    ) : null;
  };

  const label = (k: Key, text: string, required = false) => (
    <label htmlFor={`${uid}-${k}`} className={labelCls}>
      {text}
      {required ? (
        <span aria-hidden="true" className="ml-0.5 text-red-700">
          *
        </span>
      ) : (
        <span className="ml-1 font-normal text-ink-muted">(isteğe bağlı)</span>
      )}
    </label>
  );

  const send = async (payload: LeadPayload) => {
    if (sending) return;
    setNotice(null);
    setSending(true);
    const wait = LEAD_MIN_FILL_MS + 300 - (Date.now() - startedAt.current);
    if (wait > 0) await sleep(wait);
    const res = await submitLead(payload);
    if (!mounted.current) return;
    setSending(false);

    if (res.ok) {
      track(QUOTE_EVENTS.contactSubmitted, { firma: Boolean(payload.company), telefon: Boolean(payload.phone) });
      setSuccess({ id: res.id, email: payload.email.trim() });
      setFallback(null);
      setForm(EMPTY);
      setTouched({});
      setSubmitAttempted(false);
      return;
    }
    if (res.code === "VALIDATION") {
      const fields = res.fields ?? {};
      setFallback(null);
      setServerErrors(fields);
      setNotice(res.message);
      const first = ORDER.find((k) => fields[k]);
      if (first) window.setTimeout(() => document.getElementById(`${uid}-${first}`)?.focus());
      return;
    }
    if (res.code === "RATE_LIMIT") {
      setNotice(res.message);
      return;
    }
    track(QUOTE_EVENTS.fallback, { kod: res.code, tur: "iletisim" });
    setFallback({ payload, code: res.code });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSubmitAttempted(true);
    const errors = validate(form);
    const first = ORDER.find((k) => errors[k]);
    if (first) {
      setNotice(null);
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    void send({ ...toPayload(form), website: honeypotRef.current?.value ?? "", startedAt: startedAt.current });
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-action-border bg-action-light p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-action" aria-hidden />
          <div className="min-w-0">
            <h3 ref={successRef} tabIndex={-1} className="text-lg font-bold text-ink outline-none">
              Mesajınız bize ulaştı
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Yanıtımızı <strong className="break-all font-semibold text-ink">{success.email}</strong> adresine
              göndereceğiz. Çalışma saatlerimiz: {HOURS_TEXT}.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Referans numaranız: <strong className="font-mono text-ink">{success.id}</strong>
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccess(null);
                startedAt.current = Date.now();
              }}
              className="btn-ghost mt-4 min-h-[44px]"
            >
              Yeni mesaj yaz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (fallback) {
    return (
      <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        <LeadFallback
          payload={fallback.payload}
          code={fallback.code}
          heading="Mesajınız henüz bize ulaşmadı — tek tıkla e-postayla gönderin"
          onRetry={() => void send(fallback.payload)}
          retrying={sending}
        />
        {notice && (
          <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {notice}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setFallback(null);
            setNotice(null);
          }}
          className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand underline underline-offset-2"
        >
          Forma dön
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={sending} className="grid gap-5">
      <p className="text-xs text-ink-muted">
        <span aria-hidden="true" className="text-red-700">
          *
        </span>{" "}
        işaretli alanlar zorunludur.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Ad Soyad", true)}
          <input {...fieldProps("name", true)} autoComplete="name" autoCapitalize="words" maxLength={LEAD_LIMITS.name} className="field" />
          {errorText("name")}
        </div>
        <div>
          {label("company", "Firma")}
          <input {...fieldProps("company")} autoComplete="organization" maxLength={LEAD_LIMITS.company} className="field" />
          {errorText("company")}
        </div>
        <div>
          {label("phone", "Telefon")}
          <input
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LEAD_LIMITS.phone}
            placeholder="05xx xxx xx xx"
            className="field"
          />
          {errorText("phone")}
        </div>
        <div>
          {label("email", "E-posta", true)}
          <input
            {...fieldProps("email", true)}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={LEAD_LIMITS.email}
            placeholder="ornek@firmaniz.com"
            className="field"
          />
          {errorText("email")}
        </div>
      </div>

      {/* Bal küpü: insanlar görmez ve doldurmaz */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor={`${uid}-website`}>Web sitesi (boş bırakın)</label>
        <input ref={honeypotRef} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        {label("message", "Mesajınız", true)}
        <textarea
          {...fieldProps("message", true)}
          rows={5}
          maxLength={LEAD_LIMITS.message}
          placeholder="Ürün, ölçü ve adet bilgilerini yazabilirsiniz."
          className="field resize-y"
        />
        {errorText("message")}
      </div>

      {notice && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {notice}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <KvkkNote purpose="mesajınızı yanıtlamak" className="sm:max-w-xs" />
        <button type="submit" disabled={sending} className="btn-primary min-h-[48px] px-6 disabled:cursor-wait disabled:opacity-80">
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Gönderiliyor…
            </>
          ) : (
            <>
              Mesajımı Gönder <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>

      <div className="rounded-xl border border-line bg-slate-50 p-4 text-sm text-ink-soft">
        <p>
          Ürün ve miktar listesiyle fiyat mı istiyorsunuz? Teklif listesini kullanın; beden ve koli adedini tek seferde
          iletebilirsiniz.
        </p>
        <RfqTriggerButton className="btn-action mt-3 min-h-[44px]" source="iletisim_formu" label={CTA.primary} />
      </div>
    </form>
  );
}
