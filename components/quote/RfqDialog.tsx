"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * TEKLİF PENCERESİ (components/RfqModal.tsx tarafından yalnızca açıkken, tembel yüklenir)
 *
 *  Adım 1 — Liste: miktar (yazılabilir + ±), birim, sil, "Listede olmayan bir ürün ekle"
 *  Adım 2 — İletişim: 4 zorunlu alan (Ad Soyad, Firma, Telefon, E-posta) + isteğe bağlılar
 *  Sonuç  — Başarılı: referans no + dürüst sonraki adımlar (liste ancak şimdi temizlenir)
 *         — Yedek kanal: "henüz ulaşmadı" + e-posta taslağı / kopyala (liste korunur)
 *
 * Kapatma yolları (X, arka plan, Escape, "Kapat") hepsi closeModal() çağırır; bileşen
 * kaldırıldığı için adım ve sonuç durumu her açılışta sıfırdan başlar. Yazılan iletişim
 * bilgileri yanlışlıkla kapatmada kaybolmasın diye yalnızca bellekte (sayfa oturumu) tutulur.
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  PackageOpen,
  Plus,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { CTA, HOURS_TEXT, PROMISES, TURKEY_PROVINCES } from "@/data/company";
import {
  LEAD_LIMITS,
  LEAD_MIN_FILL_MS,
  leadItemFromQuote,
  submitLead,
  validateLead,
  type LeadErrorCode,
  type LeadFieldErrors,
  type LeadItem,
  type LeadPayload,
} from "@/lib/lead";
import { track } from "@/lib/track";
import { useModal } from "@/lib/useModal";
import { CUSTOM_UNITS, PRODUCT_UNITS, quoteItemKey, useQuote, type QuoteItem, type SupplyUnit } from "../QuoteContext";
import KvkkNote from "./KvkkNote";
import LeadFallback from "./LeadFallback";
import QtyStepper from "./QtyStepper";
import { QUOTE_EVENTS } from "./events";
import { formatKoliConversion } from "./koli";

const SECTORS = [
  "Metal ve makine imalatı",
  "Otomotiv ve yan sanayi",
  "Demir-çelik ve döküm",
  "İnşaat ve taahhüt",
  "Gıda üretimi",
  "Kimya, plastik ve boya",
  "Enerji ve altyapı",
  "Tersane ve denizcilik",
  "Lojistik ve depolama",
  "Tarım ve hayvancılık",
  "Kamu kurumu / belediye",
  "Atölye / küçük işletme",
  "Bayi / yeniden satış",
  "Diğer",
];

const PROVINCES = [...TURKEY_PROVINCES].sort((a, b) => a.localeCompare(b, "tr"));

type ContactKey = "name" | "company" | "phone" | "email" | "role" | "sector" | "city" | "message";
type ContactDraft = Record<ContactKey, string>;

const EMPTY_DRAFT: ContactDraft = { name: "", company: "", phone: "", email: "", role: "", sector: "", city: "", message: "" };
const FIELD_ORDER: ContactKey[] = ["name", "company", "phone", "email", "role", "sector", "city", "message"];

/* Sayfa oturumu boyunca bellekte (depoya yazılmaz) */
let memoryDraft: ContactDraft = { ...EMPTY_DRAFT };
let firstOpenedAt: number | null = null;

type Step = "list" | "contact" | "success" | "fallback";

interface FieldOpts {
  required?: boolean;
  type?: "text" | "tel" | "email";
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  autoCapitalize?: string;
  spellCheck?: boolean;
  maxLength?: number;
  placeholder?: string;
}

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const itemName = (it: QuoteItem) => (it.spec ? `${it.productTitle} (${it.spec})` : it.productTitle);

function buildPayload(f: ContactDraft, items: LeadItem[]): LeadPayload {
  return {
    kind: "rfq",
    name: f.name,
    company: f.company,
    phone: f.phone,
    email: f.email,
    role: f.role || undefined,
    sector: f.sector || undefined,
    city: f.city || undefined,
    message: f.message || undefined,
    items,
  };
}

const selectCls =
  "h-11 rounded-xl border border-line-input bg-white pl-3 pr-8 text-base font-semibold text-ink focus:border-brand focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:text-sm";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errCls = "mt-1 text-xs font-medium text-red-700";

export default function RfqDialog() {
  const { items, closeModal, removeItem, updateQuantity, updateUnit, addCustomItem, clearQuote } = useQuote();
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  const [step, setStep] = useState<Step>("list");
  const [form, setForm] = useState<ContactDraft>(() => ({ ...memoryDraft }));
  const [touched, setTouched] = useState<Partial<Record<ContactKey, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState<LeadFieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<{ id: string; email: string; count: number } | null>(null);
  const [fallback, setFallback] = useState<{ payload: LeadPayload; code: LeadErrorCode } | null>(null);
  const [announce, setAnnounce] = useState("");

  const [customOpen, setCustomOpen] = useState(() => items.length === 0);
  const [custom, setCustom] = useState<{ title: string; spec: string; quantity: number; unit: SupplyUnit }>({
    title: "",
    spec: "",
    quantity: 1,
    unit: "Adet",
  });
  const [customError, setCustomError] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const customTitleRef = useRef<HTMLInputElement>(null);
  const mounted = useRef(true);
  // Bot kontrolü için ilk açılış zamanı (sayfa oturumunda bir kez)
  const [startedAt] = useState(() => {
    if (firstOpenedAt === null) firstOpenedAt = Date.now();
    return firstOpenedAt;
  });

  // Gönderim sürerken kapatılamaz (sonuç kaybolmasın, liste yanlışlıkla iki kez gönderilmesin)
  const requestClose = () => {
    if (!sending) closeModal();
  };
  const { panelRef } = useModal<HTMLDivElement>({
    open: true,
    onClose: requestClose,
    initialFocusRef: headingRef,
    closeOnEscape: !sending,
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    memoryDraft = form;
  }, [form]);

  // Adım değişince içeriği başa al, odağı yeni adımın başına taşı (ilk açılışta useModal odaklar)
  const firstStepRender = useRef(true);
  useEffect(() => {
    if (firstStepRender.current) {
      firstStepRender.current = false;
      return;
    }
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    if (step === "contact") document.getElementById(`${uid}-name`)?.focus();
    else headingRef.current?.focus();
  }, [step, uid]);

  const leadItems = useMemo(() => items.map(leadItemFromQuote), [items]);
  const clientErrors = useMemo<LeadFieldErrors>(() => {
    const v = validateLead(buildPayload(form, leadItems));
    return v.ok ? {} : v.fields;
  }, [form, leadItems]);

  const errorFor = (k: ContactKey): string | undefined =>
    serverErrors[k] ?? (touched[k] || submitAttempted ? clientErrors[k] : undefined);

  const setField = (k: ContactKey, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (serverErrors[k]) {
      setServerErrors((s) => {
        const n = { ...s };
        delete n[k];
        return n;
      });
    }
  };
  const markTouched = (k: ContactKey) => setTouched((t) => (t[k] ? t : { ...t, [k]: true }));

  const focusFirstInvalid = (fields: LeadFieldErrors) => {
    const first = FIELD_ORDER.find((k) => fields[k]);
    if (first) window.setTimeout(() => document.getElementById(`${uid}-${first}`)?.focus());
  };

  /* ── gönderim ─────────────────────────────────────────────────────────── */

  const send = async (payload: LeadPayload) => {
    if (sending) return;
    setNotice(null);
    setSending(true);
    setAnnounce("Talebiniz gönderiliyor…");
    // Sunucu çok hızlı gönderimleri bot sayıp sessizce atar; gerçek kullanıcı hiç etkilenmesin diye bekle
    const wait = LEAD_MIN_FILL_MS + 300 - (Date.now() - startedAt);
    if (wait > 0) await sleep(wait);
    const res = await submitLead(payload);
    if (!mounted.current) return;
    setSending(false);
    setAnnounce("");

    if (res.ok) {
      track(QUOTE_EVENTS.submitted, { kalem: payload.items?.length ?? 0 });
      setSuccess({ id: res.id, email: payload.email.trim(), count: payload.items?.length ?? 0 });
      clearQuote(); // liste YALNIZCA sunucu onayından sonra temizlenir
      setForm((f) => ({ ...f, message: "" }));
      setFallback(null);
      setStep("success");
      return;
    }
    if (res.code === "VALIDATION") {
      const fields = res.fields ?? {};
      setServerErrors(fields);
      setNotice(res.message);
      if (fields.items) setStep("list");
      else {
        if (step !== "contact") setStep("contact");
        focusFirstInvalid(fields);
      }
      return;
    }
    if (res.code === "RATE_LIMIT") {
      setNotice(res.message);
      return;
    }
    // NOT_CONFIGURED / SERVER / NETWORK → dürüst yedek kanal; liste korunur
    track(QUOTE_EVENTS.fallback, { kod: res.code, tur: "rfq", kalem: payload.items?.length ?? 0 });
    setFallback({ payload, code: res.code });
    setStep("fallback");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSubmitAttempted(true);
    const payload: LeadPayload = {
      ...buildPayload(form, leadItems),
      website: honeypotRef.current?.value ?? "",
      startedAt,
    };
    const v = validateLead(payload);
    if (!v.ok) {
      if (v.fields.items) {
        setNotice(v.fields.items);
        setStep("list");
        return;
      }
      setNotice(null);
      focusFirstInvalid(v.fields);
      return;
    }
    void send(payload);
  };

  /* ── liste işlemleri ──────────────────────────────────────────────────── */

  const onRemove = (it: QuoteItem) => {
    removeItem(it.id);
    setAnnounce(`${itemName(it)} listeden çıkarıldı.`);
    window.setTimeout(() => (listHeadingRef.current ?? headingRef.current)?.focus());
  };

  const onUnitChange = (it: QuoteItem, unit: SupplyUnit) => {
    const merges = items.some((x) => x.id !== it.id && quoteItemKey(x) === quoteItemKey({ ...it, unit }));
    updateUnit(it.id, unit);
    if (merges) setAnnounce("Aynı ürün ve birimdeki satırla birleştirildi; miktarlar toplandı.");
  };

  const onCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const title = custom.title.trim();
    if (!title) {
      setCustomError("Ürün adını yazın.");
      customTitleRef.current?.focus();
      return;
    }
    addCustomItem({ title, spec: custom.spec.trim() || undefined, quantity: custom.quantity, unit: custom.unit });
    setAnnounce(`${title} listeye eklendi.`);
    setCustom({ title: "", spec: "", quantity: 1, unit: "Adet" });
    setCustomError(null);
    setNotice(null);
    customTitleRef.current?.focus();
  };

  /* ── alan çizimi (bileşen değil düz fonksiyon: her çizimde yeniden bağlanıp odak kaybetmesin) ── */

  const labelFor = (k: ContactKey, text: string, required?: boolean) => (
    <label htmlFor={`${uid}-${k}`} className={labelCls}>
      {text}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-red-700">
          *
        </span>
      )}
    </label>
  );

  const errorText = (k: ContactKey) => {
    const err = errorFor(k);
    return err ? (
      <p id={`${uid}-${k}-err`} className={errCls}>
        {err}
      </p>
    ) : null;
  };

  const a11yProps = (k: ContactKey, required?: boolean) => {
    const err = errorFor(k);
    return {
      id: `${uid}-${k}`,
      name: k,
      required,
      "aria-required": required || undefined,
      "aria-invalid": err ? (true as const) : undefined,
      "aria-describedby": err ? `${uid}-${k}-err` : undefined,
      onBlur: () => markTouched(k),
    };
  };

  const textField = (k: ContactKey, label: string, o: FieldOpts = {}) => (
    <div>
      {labelFor(k, label, o.required)}
      <input
        {...a11yProps(k, o.required)}
        type={o.type ?? "text"}
        inputMode={o.inputMode}
        autoComplete={o.autoComplete}
        autoCapitalize={o.autoCapitalize}
        spellCheck={o.spellCheck}
        maxLength={o.maxLength}
        placeholder={o.placeholder}
        value={form[k]}
        onChange={(e) => setField(k, e.target.value)}
        className="field"
      />
      {errorText(k)}
    </div>
  );

  const selectField = (k: ContactKey, label: string, options: readonly string[], autoComplete?: string) => (
    <div>
      {labelFor(k, label)}
      <select
        {...a11yProps(k)}
        autoComplete={autoComplete}
        value={form[k]}
        onChange={(e) => setField(k, e.target.value)}
        className="field"
      >
        <option value="">Seçiniz</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {errorText(k)}
    </div>
  );

  /* ── adımlar ──────────────────────────────────────────────────────────── */

  const hasPalet = items.some((x) => x.unit === "Palet" && x.kind === "product");
  const bodyCls = "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5";
  const footerCls =
    "shrink-0 border-t border-line bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-4";

  const noticeBox = notice ? (
    <p role="alert" className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
      {notice}
    </p>
  ) : null;

  const listStep = (
    <>
      <div ref={bodyRef} className={bodyCls}>
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong px-4 py-6 text-center">
            <PackageOpen className="mx-auto h-8 w-8 text-ink-muted" aria-hidden />
            <p className="mt-2 font-semibold text-ink">Teklif listeniz boş</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
              İş güvenliği ürünlerini listeye ekleyin ya da ihtiyacınızı aşağıya yazın.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link href="/urunler" onClick={closeModal} className="btn-ghost min-h-[44px]">
                {CTA.browse}
              </Link>
              <Link href="/urun-gruplari" onClick={closeModal} className="btn-ghost min-h-[44px]">
                Teknik hırdavat grupları
              </Link>
            </div>
          </div>
        ) : (
          <section aria-labelledby={`${uid}-list`}>
            <h3 id={`${uid}-list`} ref={listHeadingRef} tabIndex={-1} className="text-sm font-semibold text-ink outline-none">
              Listedeki ürünler ({items.length} kalem)
            </h3>
            <ul className="mt-1 divide-y divide-line">
              {items.map((it) => {
                const name = itemName(it);
                const conversion = it.unit === "Koli" ? formatKoliConversion(it.koli, it.quantity) : null;
                return (
                  <li key={it.id} className="py-3">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="text-sm font-semibold leading-snug text-ink">{it.productTitle}</p>
                        {(it.spec || it.kind === "custom") && (
                          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                            {it.spec && <span className="font-semibold text-brand">{it.spec}</span>}
                            {it.kind === "custom" && (
                              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-ink-soft">Serbest kalem</span>
                            )}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(it)}
                        aria-label={`${name} satırını listeden çıkar`}
                        className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink-muted transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <QtyStepper value={it.quantity} onChange={(n) => updateQuantity(it.id, n)} label={`${name} miktarı`} />
                      <select
                        value={it.unit}
                        onChange={(e) => onUnitChange(it, e.target.value as SupplyUnit)}
                        aria-label={`${name} birimi`}
                        className={selectCls}
                      >
                        {(it.kind === "custom" ? CUSTOM_UNITS : PRODUCT_UNITS).map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                      {conversion && <span className="text-xs tabular-nums text-ink-muted">{conversion}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
            {hasPalet && <p className="mt-1 text-xs text-ink-muted">Palet başına koli adedi teklifte bildirilir.</p>}
          </section>
        )}

        {/* Serbest kalem: katalogda olmayan ürünler (30 teknik hırdavat grubu vb.) */}
        <div className="mt-5 rounded-2xl border border-line bg-slate-50/70">
          <button
            type="button"
            aria-expanded={customOpen}
            aria-controls={`${uid}-custom`}
            onClick={() => {
              const next = !customOpen;
              setCustomOpen(next);
              if (next) window.setTimeout(() => customTitleRef.current?.focus());
            }}
            className="flex min-h-[48px] w-full items-center justify-between gap-2 rounded-2xl px-4 text-left text-sm font-semibold text-brand"
          >
            <span className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" aria-hidden />
              Listede olmayan bir ürün ekle
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${customOpen ? "rotate-180" : ""}`} aria-hidden />
          </button>
          {customOpen && (
            <form id={`${uid}-custom`} noValidate onSubmit={onCustomAdd} className="border-t border-line px-4 pb-4 pt-3">
              <p className="text-xs leading-relaxed text-ink-soft">
                Mağazamızdaki 30 ürün grubundan (cıvata, el aletleri, kaynak malzemesi, hortum vb.) ya da katalogda
                bulamadığınız her ürün için yazabilirsiniz.
              </p>
              <div className="mt-3 grid gap-3">
                <div>
                  <label htmlFor={`${uid}-ct`} className={labelCls}>
                    Ürün adı
                  </label>
                  <input
                    ref={customTitleRef}
                    id={`${uid}-ct`}
                    value={custom.title}
                    onChange={(e) => {
                      setCustom((c) => ({ ...c, title: e.target.value }));
                      if (customError) setCustomError(null);
                    }}
                    maxLength={LEAD_LIMITS.itemTitle}
                    placeholder="Örn: M12 cıvata DIN 933"
                    autoComplete="off"
                    aria-invalid={customError ? true : undefined}
                    aria-describedby={customError ? `${uid}-ct-err` : undefined}
                    className="field"
                  />
                  {customError && (
                    <p id={`${uid}-ct-err`} className={errCls}>
                      {customError}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-cs`} className={labelCls}>
                    Ölçü / özellik <span className="font-normal text-ink-muted">(isteğe bağlı)</span>
                  </label>
                  <input
                    id={`${uid}-cs`}
                    value={custom.spec}
                    onChange={(e) => setCustom((c) => ({ ...c, spec: e.target.value }))}
                    maxLength={LEAD_LIMITS.itemSpec}
                    placeholder="Örn: 8.8 galvaniz, 50 mm"
                    autoComplete="off"
                    className="field"
                  />
                </div>
                <div className="flex flex-wrap items-end gap-2">
                  <div>
                    <span className={labelCls} aria-hidden="true">
                      Miktar
                    </span>
                    <QtyStepper
                      value={custom.quantity}
                      onChange={(n) => setCustom((c) => ({ ...c, quantity: n }))}
                      label="Eklenecek ürünün miktarı"
                      announce={false}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-cu`} className={labelCls}>
                      Birim
                    </label>
                    <select
                      id={`${uid}-cu`}
                      value={custom.unit}
                      onChange={(e) => setCustom((c) => ({ ...c, unit: e.target.value as SupplyUnit }))}
                      className={selectCls}
                    >
                      {CUSTOM_UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn-primary min-h-[44px] flex-1 sm:flex-initial">
                    <Plus className="h-4 w-4" aria-hidden />
                    {CTA.addShort}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className={footerCls}>
        {noticeBox}
        <button
          type="button"
          onClick={() => {
            setNotice(null);
            setStep("contact");
          }}
          disabled={items.length === 0}
          className="btn-action min-h-[48px] w-full text-base disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          İletişim bilgilerine geç
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        <p className="mt-2 text-center text-xs font-medium text-ink-soft">
          {items.length === 0 ? "Devam etmek için listeye en az bir ürün ekleyin." : PROMISES.quoteReassurance}
        </p>
      </div>
    </>
  );

  const contactStep = (
    <form noValidate onSubmit={onSubmit} aria-busy={sending} className="flex min-h-0 flex-1 flex-col">
      <div ref={bodyRef} className={bodyCls}>
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 py-0.5 pl-3 pr-2 text-sm">
          <span className="text-ink-soft">
            <strong className="font-semibold text-ink">{items.length} kalem</strong> teklif listenizde
          </span>
          <button
            type="button"
            onClick={() => setStep("list")}
            className="inline-flex min-h-[44px] items-center px-1 font-semibold text-brand underline underline-offset-2"
          >
            Listeyi düzenle
          </button>
        </div>

        <p className="text-xs text-ink-muted">
          <span aria-hidden="true" className="text-red-700">
            *
          </span>{" "}
          işaretli alanlar zorunludur.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {textField("name", "Ad Soyad", {
            required: true,
            autoComplete: "name",
            autoCapitalize: "words",
            maxLength: LEAD_LIMITS.name,
            placeholder: "Örn: Ayşe Yılmaz",
          })}
          {textField("company", "Firma", {
            required: true,
            autoComplete: "organization",
            maxLength: LEAD_LIMITS.company,
            placeholder: "Örn: ABC Makina San. Tic. Ltd. Şti.",
          })}
          {textField("phone", "Telefon", {
            required: true,
            type: "tel",
            inputMode: "tel",
            autoComplete: "tel",
            maxLength: LEAD_LIMITS.phone,
            placeholder: "05xx xxx xx xx",
          })}
          {textField("email", "E-posta", {
            required: true,
            type: "email",
            inputMode: "email",
            autoComplete: "email",
            autoCapitalize: "none",
            spellCheck: false,
            maxLength: LEAD_LIMITS.email,
            placeholder: "ornek@firmaniz.com",
          })}
        </div>

        {/* Bal küpü: insanlar görmez ve doldurmaz; dolu gelirse sunucu talebi sessizce atar */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor={`${uid}-website`}>Web sitesi (boş bırakın)</label>
          <input
            ref={honeypotRef}
            id={`${uid}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 text-sm font-semibold text-ink">
          İsteğe bağlı <span className="font-normal text-ink-muted">— teklifi netleştirmemize yardımcı olur</span>
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {textField("role", "Görev / Unvan", {
            autoComplete: "organization-title",
            maxLength: LEAD_LIMITS.role,
            placeholder: "Örn: Satın alma sorumlusu, İSG uzmanı",
          })}
          {selectField("sector", "Sektör", SECTORS)}
          {selectField("city", "Teslimat ili", PROVINCES, "address-level1")}
          <div className="sm:col-span-2">
            {labelFor("message", "Not")}
            <textarea
              {...a11yProps("message")}
              rows={3}
              maxLength={LEAD_LIMITS.message}
              placeholder="Örn: beden dağılımı, belge veya numune talebi, istediğiniz teslim tarihi"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              className="field resize-y"
            />
            {errorText("message")}
          </div>
        </div>
      </div>

      <div className={footerCls}>
        {noticeBox}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep("list")}
            disabled={sending}
            className="btn-ghost min-h-[48px] px-4 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="sr-only sm:not-sr-only">Listeye dön</span>
          </button>
          <button
            type="submit"
            disabled={sending}
            aria-describedby={`${uid}-reassure`}
            className="btn-action min-h-[48px] flex-1 text-base disabled:cursor-wait disabled:opacity-80 sm:text-sm"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Gönderiliyor…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden />
                {CTA.submit}
              </>
            )}
          </button>
        </div>
        <p id={`${uid}-reassure`} className="mt-2 text-center text-xs font-medium text-ink-soft">
          {PROMISES.quoteReassurance}
        </p>
        <KvkkNote className="mt-1 text-center" />
      </div>
    </form>
  );

  const successStep = success ? (
    <>
      <div ref={bodyRef} className={bodyCls}>
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-action-light text-action">
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </span>
          <p className="mt-4 text-base font-semibold text-ink">Teklifiniz e-posta adresinize gönderilecek.</p>
          <p className="mt-1 break-all text-sm font-medium text-ink-soft">{success.email}</p>
          <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-1 rounded-xl bg-slate-50 px-3 py-2 text-sm text-ink-soft">
            Referans numaranız: <strong className="font-mono text-ink">{success.id}</strong>
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            {PROMISES.quoteTurnaround} Çalışma saatlerimiz: {HOURS_TEXT}.
          </p>
        </div>
        <h3 className="mt-6 text-sm font-semibold text-ink">Sonraki adımlar</h3>
        <ol className="mt-2 space-y-3 rounded-2xl border border-line p-4 text-sm text-ink-soft">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-action text-white">
              <Check className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span>
              <strong className="font-semibold text-ink">Talebinizi aldık</strong> ({success.count} kalem).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-ink">
              2
            </span>
            <span>Fiyat ve teslim koşullarını içeren teklifi e-postanıza göndeririz.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-ink">
              3
            </span>
            <span>Teklifi onaylarsanız siparişiniz hazırlanır ve sevk edilir.</span>
          </li>
        </ol>
      </div>
      <div className={footerCls}>
        <button type="button" onClick={closeModal} className="btn-action min-h-[48px] w-full text-base sm:text-sm">
          Kapat
        </button>
      </div>
    </>
  ) : null;

  const fallbackStep = fallback ? (
    <>
      <div ref={bodyRef} className={bodyCls}>
        <LeadFallback
          payload={fallback.payload}
          code={fallback.code}
          onRetry={() => void send(fallback.payload)}
          retrying={sending}
          onSentByEmail={() => {
            clearQuote();
            closeModal();
          }}
          sentByEmailLabel="E-postayı gönderdim, listeyi temizle"
        />
      </div>
      <div className={footerCls}>
        {noticeBox}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setNotice(null);
              setStep("contact");
            }}
            disabled={sending}
            className="btn-ghost min-h-[48px] flex-1 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Forma dön
          </button>
          <button type="button" onClick={requestClose} disabled={sending} className="btn-ghost min-h-[48px] flex-1 disabled:opacity-50">
            Kapat
          </button>
        </div>
      </div>
    </>
  ) : null;

  const titles: Record<Step, string> = {
    list: items.length > 0 ? `Teklif listeniz (${items.length})` : "Teklif listeniz",
    contact: "İletişim bilgileriniz",
    success: "Talebiniz bize ulaştı",
    fallback: "Talebiniz henüz bize ulaşmadı",
  };
  const subtitles: Record<Step, string> = {
    list: "Miktar ve birimleri kontrol edin; listede olmayan ürünleri de ekleyebilirsiniz.",
    contact: "Teklifiniz e-postanıza gelir. Yalnızca 4 alan zorunlu.",
    success: "Teşekkür ederiz.",
    fallback: "Tek tıkla e-postayla gönderin.",
  };
  const showProgress = step === "list" || step === "contact";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
    >
      <div
        aria-hidden="true"
        onClick={requestClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative flex h-full max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl outline-none animate-in fade-in slide-in-from-bottom-4 duration-200 sm:h-auto sm:max-h-[min(90vh,880px)] sm:max-w-2xl sm:rounded-3xl"
      >
        {/* Başlık */}
        <div className="shrink-0 border-b border-line px-4 pb-3 pt-3 sm:px-6 sm:pt-4">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              {showProgress && (
                <p className="text-xs font-semibold text-ink-muted">
                  Adım {step === "list" ? 1 : 2} / 2 · {step === "list" ? "Liste" : "İletişim"}
                </p>
              )}
              <h2
                id={titleId}
                ref={headingRef}
                tabIndex={-1}
                className="text-lg font-bold leading-snug text-ink outline-none sm:text-xl"
              >
                {titles[step]}
              </h2>
              <p id={descId} className="mt-0.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {subtitles[step]}
              </p>
            </div>
            <button
              type="button"
              onClick={requestClose}
              disabled={sending}
              aria-label="Kapat"
              className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted transition hover:bg-slate-100 hover:text-ink disabled:opacity-40"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {showProgress && (
            <div aria-hidden="true" className="mt-3 grid grid-cols-2 gap-1.5">
              <span className="h-1 rounded-full bg-action" />
              <span className={`h-1 rounded-full ${step === "contact" ? "bg-action" : "bg-line"}`} />
            </div>
          )}
        </div>

        {step === "list" && listStep}
        {step === "contact" && contactStep}
        {step === "success" && successStep}
        {step === "fallback" && fallbackStep}

        <p className="sr-only" role="status" aria-live="polite">
          {announce}
        </p>
      </div>
    </div>
  );
}
