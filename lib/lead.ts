/* ────────────────────────────────────────────────────────────────────────────
 * TEKLİF / İLETİŞİM TALEBİ (LEAD) — istemci + sunucu ortak modülü
 *
 * - Tipler: LeadItem, LeadPayload, SubmitLeadResult
 * - submitLead(payload): /api/teklif'e POST (zaman aşımlı). Hiç throw etmez.
 * - validateLead(payload): istemci ve sunucunun AYNI kuralları kullanması için.
 * - buildLeadText / buildLeadMailto / buildLeadWhatsApp: e-posta gövdesi, mailto yedeği,
 *   WhatsApp yedeği (WHATSAPP_ENABLED false iken null).
 *
 * Bu dosya tarayıcıda da çalışır: Node API'si veya gizli anahtar KULLANMAYIN.
 * ──────────────────────────────────────────────────────────────────────────── */

import { COMPANY, mailtoHref, whatsappHref } from "@/data/company";

/** Talep edilen tek kalem. */
export interface LeadItem {
  /** Ürün adı veya serbest metin (ör. "M12 cıvata DIN 933"). */
  title: string;
  /** Ürün kodu (başlıkta zaten geçiyorsa tekrar yazılmaz). */
  code?: string;
  quantity: number;
  /** "Koli", "Palet", "Adet"… (metinde küçük harfle yazılır). */
  unit: string;
  /** Beden / ölçü / not (ör. "Beden 9"). */
  spec?: string;
  /** Ürün sayfası yolu ("/urunler/…") veya tam adres. */
  url?: string;
}

export interface LeadPayload {
  /** "rfq": teklif listesi; "contact": genel iletişim mesajı */
  kind: "rfq" | "contact";
  name: string;
  company?: string;
  role?: string;
  sector?: string;
  phone?: string;
  email: string;
  /** Teslimat ili */
  city?: string;
  message?: string;
  items?: LeadItem[];
  /** Formun gönderildiği sayfa (location.href) */
  pageUrl?: string;
  /** Bal küpü (honeypot): görünmez alan, insan kullanıcıda HER ZAMAN boş kalır. */
  website?: string;
  /** Form ilk etkileşim / açılış zamanı (Date.now()). Çok hızlı gönderimler bot sayılır. */
  startedAt?: number;
}

export type LeadErrorCode = "NOT_CONFIGURED" | "VALIDATION" | "RATE_LIMIT" | "SERVER" | "NETWORK";

export type SubmitLeadResult =
  | { ok: true; id: string }
  | { ok: false; code: LeadErrorCode; message: string; fields?: LeadFieldErrors };

export type LeadField = "kind" | "name" | "company" | "role" | "sector" | "phone" | "email" | "city" | "message" | "items";
export type LeadFieldErrors = Partial<Record<LeadField, string>>;

/** Uzunluk / adet sınırları (istemci maxLength için de kullanın). */
export const LEAD_LIMITS = {
  name: 120,
  company: 160,
  role: 120,
  sector: 120,
  phone: 40,
  email: 160,
  city: 60,
  message: 4000,
  pageUrl: 500,
  itemTitle: 200,
  itemCode: 60,
  itemUnit: 40,
  itemSpec: 200,
  itemUrl: 500,
  maxItems: 100,
  maxQuantity: 1_000_000,
} as const;

/** Formun açılmasından bu yana bundan kısa sürede gelen gönderimler bot sayılır (ms). */
export const LEAD_MIN_FILL_MS = 2500;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** Kullanıcıya gösterilecek hata mesajları (Türkçe). */
export const LEAD_ERROR_MESSAGES: Record<LeadErrorCode, string> = {
  NOT_CONFIGURED:
    "Form şu anda e-posta gönderemiyor. Talebinizi e-posta uygulamanızla iletebilirsiniz; liste hazır olarak açılır.",
  VALIDATION: "Lütfen işaretli alanları kontrol edin.",
  RATE_LIMIT: "Kısa sürede çok fazla gönderim yapıldı. Lütfen bir dakika sonra tekrar deneyin.",
  SERVER: "Talebiniz şu anda iletilemedi. Lütfen tekrar deneyin veya e-posta ile gönderin.",
  NETWORK: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin veya e-posta ile gönderin.",
};

const clean = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/**
 * Talebi doğrular. İstemcide alan hatalarını göstermek, sunucuda da aynı kuralları
 * uygulamak için kullanılır.
 * Kurallar: ad + e-posta zorunlu; "rfq" için ayrıca firma + telefon + en az 1 kalem.
 */
export function validateLead(payload: Partial<LeadPayload>): { ok: true } | { ok: false; fields: LeadFieldErrors } {
  const f: LeadFieldErrors = {};
  const kind = payload.kind === "rfq" ? "rfq" : payload.kind === "contact" ? "contact" : null;

  const name = clean(payload.name);
  if (!name) f.name = "Ad soyad gerekli.";
  else if (name.length > LEAD_LIMITS.name) f.name = `En fazla ${LEAD_LIMITS.name} karakter.`;

  const email = clean(payload.email);
  if (!email) f.email = "E-posta adresi gerekli.";
  else if (email.length > LEAD_LIMITS.email || !EMAIL_RE.test(email)) f.email = "Geçerli bir e-posta adresi yazın.";

  const company = clean(payload.company);
  if (kind === "rfq" && !company) f.company = "Firma adı gerekli.";
  else if (company.length > LEAD_LIMITS.company) f.company = `En fazla ${LEAD_LIMITS.company} karakter.`;

  const phone = clean(payload.phone);
  if (kind === "rfq" && !phone) f.phone = "Telefon numarası gerekli.";
  else if (phone && (phone.length > LEAD_LIMITS.phone || phone.replace(/\D/g, "").length < 7))
    f.phone = "Geçerli bir telefon numarası yazın.";

  if (clean(payload.role).length > LEAD_LIMITS.role) f.role = `En fazla ${LEAD_LIMITS.role} karakter.`;
  if (clean(payload.sector).length > LEAD_LIMITS.sector) f.sector = `En fazla ${LEAD_LIMITS.sector} karakter.`;
  if (clean(payload.city).length > LEAD_LIMITS.city) f.city = `En fazla ${LEAD_LIMITS.city} karakter.`;
  if (clean(payload.message).length > LEAD_LIMITS.message) f.message = `En fazla ${LEAD_LIMITS.message} karakter.`;

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (kind === "rfq" && items.length === 0) f.items = "Teklif listesine en az bir ürün ekleyin.";
  else if (items.length > LEAD_LIMITS.maxItems) f.items = `En fazla ${LEAD_LIMITS.maxItems} kalem gönderilebilir.`;
  else {
    for (const it of items) {
      const qty = Number(it?.quantity);
      if (
        !it ||
        !clean(it.title) ||
        clean(it.title).length > LEAD_LIMITS.itemTitle ||
        clean(it.unit).length > LEAD_LIMITS.itemUnit ||
        clean(it.code).length > LEAD_LIMITS.itemCode ||
        clean(it.spec).length > LEAD_LIMITS.itemSpec ||
        clean(it.url).length > LEAD_LIMITS.itemUrl ||
        !Number.isFinite(qty) ||
        qty <= 0 ||
        qty > LEAD_LIMITS.maxQuantity
      ) {
        f.items = "Listedeki bir kalemin adı veya miktarı geçersiz.";
        break;
      }
    }
  }

  if (!kind) f.kind = "Geçersiz talep türü.";

  return Object.keys(f).length ? { ok: false, fields: f } : { ok: true };
}

/** Girdiyi sınırlarla kırpılmış, güvenli bir kopyaya çevirir (sunucu ve metin üretimi için). */
export function normalizeLead(payload: LeadPayload): LeadPayload {
  const cut = (v: unknown, max: number) => clean(v).slice(0, max);
  const opt = (v: unknown, max: number) => cut(v, max) || undefined;
  // Yalnızca site içi yol veya http(s) adresi kabul edilir (javascript: vb. atılır)
  const link = (v: unknown, max: number) => {
    const u = cut(v, max);
    return (u.startsWith("/") && !u.startsWith("//")) || /^https?:\/\//i.test(u) ? u : undefined;
  };
  const items = (Array.isArray(payload.items) ? payload.items : []).slice(0, LEAD_LIMITS.maxItems).map((it) => ({
    title: cut(it.title, LEAD_LIMITS.itemTitle),
    code: opt(it.code, LEAD_LIMITS.itemCode),
    quantity: Math.min(Math.max(Number(it.quantity) || 0, 0), LEAD_LIMITS.maxQuantity),
    unit: cut(it.unit, LEAD_LIMITS.itemUnit) || "adet",
    spec: opt(it.spec, LEAD_LIMITS.itemSpec),
    url: link(it.url, LEAD_LIMITS.itemUrl),
  }));
  return {
    kind: payload.kind === "rfq" ? "rfq" : "contact",
    name: cut(payload.name, LEAD_LIMITS.name),
    company: opt(payload.company, LEAD_LIMITS.company),
    role: opt(payload.role, LEAD_LIMITS.role),
    sector: opt(payload.sector, LEAD_LIMITS.sector),
    phone: opt(payload.phone, LEAD_LIMITS.phone),
    email: cut(payload.email, LEAD_LIMITS.email),
    city: opt(payload.city, LEAD_LIMITS.city),
    message: opt(payload.message, LEAD_LIMITS.message),
    items,
    pageUrl: link(payload.pageUrl, LEAD_LIMITS.pageUrl),
  };
}

/** Kalem satırı: "3 koli – FABA EP-1301 Nitril Kaplı İş Eldiveni (Beden 9)" */
export function formatLeadItem(item: LeadItem): string {
  const qty = Number(item.quantity) || 0;
  const unit = clean(item.unit).toLocaleLowerCase("tr-TR") || "adet";
  const title = clean(item.title);
  const code = clean(item.code);
  const withCode = code && !title.toLocaleLowerCase("tr-TR").includes(code.toLocaleLowerCase("tr-TR")) ? `${title} [${code}]` : title;
  const spec = clean(item.spec);
  return `${qty.toLocaleString("tr-TR")} ${unit} – ${withCode}${spec ? ` (${spec})` : ""}`;
}

/** Göreli ürün yolunu tam adrese çevirir (origin verilmezse olduğu gibi bırakır). */
function absoluteUrl(url: string | undefined, origin?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (origin && url.startsWith("/")) return `${origin.replace(/\/+$/, "")}${url}`;
  return url;
}

/**
 * Talebin okunabilir Türkçe düz metni (e-posta gövdesi, mailto, WhatsApp).
 * @param options.origin  "/urunler/…" yollarını tam adrese çevirmek için (ör. SITE_URL)
 * @param options.id      Sunucunun verdiği referans numarası
 */
export function buildLeadText(payload: LeadPayload, options: { origin?: string; id?: string } = {}): string {
  const p = payload;
  const items = Array.isArray(p.items) ? p.items : [];
  const lines: string[] = [];

  lines.push(p.kind === "rfq" ? "Teklif talebi" : "İletişim mesajı");
  if (options.id) lines.push(`Referans: ${options.id}`);
  lines.push("");

  const row = (label: string, value?: string) => {
    const v = clean(value);
    if (v) lines.push(`${label}: ${v}`);
  };
  row("Ad soyad", p.name);
  row("Firma", p.company);
  row("Görev", p.role);
  row("Sektör", p.sector);
  row("Telefon", p.phone);
  row("E-posta", p.email);
  row("Teslimat ili", p.city);

  if (items.length) {
    lines.push("");
    lines.push(`Talep edilen ürünler (${items.length} kalem):`);
    items.forEach((it, i) => {
      lines.push(`${i + 1}. ${formatLeadItem(it)}`);
      const url = absoluteUrl(clean(it.url) || undefined, options.origin);
      if (url) lines.push(`   ${url}`);
    });
  }

  const message = clean(p.message);
  if (message) {
    lines.push("");
    lines.push("Not:");
    lines.push(message);
  }

  const page = clean(p.pageUrl);
  if (page) {
    lines.push("");
    lines.push(`Gönderildiği sayfa: ${page}`);
  }

  return lines.join("\n");
}

/** E-posta konusu için kısa başlık (firma yoksa ad). */
function leadSubjectName(p: LeadPayload): string {
  return (clean(p.company) || clean(p.name) || "Web sitesi").replace(/[\r\n]+/g, " ");
}

/**
 * mailto bağlantıları bazı istemcilerde ~2000 karakterde kesilir. Sınır KODLANMIŞ uzunluğa
 * uygulanır: Türkçe karakterler encodeURIComponent ile 6 karaktere kadar büyür.
 */
const MAILTO_BODY_ENCODED_MAX = 1800;
const MAILTO_TRUNCATED_NOTE = "\n… (metin kısaltıldı; tamamını “kopyala” düğmesiyle alıp e-postaya yapıştırabilirsiniz)";

/** Yarım kalan UTF-16 vekil çiftini (ör. emoji) atar; aksi hâlde encodeURIComponent URIError fırlatır. */
function dropLoneSurrogate(s: string): string {
  return /[\uD800-\uDBFF]$/.test(s) ? s.slice(0, -1) : s;
}

/**
 * Yedek kanal: kullanıcının e-posta uygulamasında hazır taslak açar.
 * Konu: "Teklif talebi – <firma veya ad>" (iletişim için "İletişim – …").
 */
export function buildLeadMailto(payload: LeadPayload, options: { origin?: string } = {}): string {
  const subject = `${payload.kind === "rfq" ? "Teklif talebi" : "İletişim"} – ${leadSubjectName(payload)}`;
  let body = buildLeadText(payload, { origin: options.origin });
  if (encodeURIComponent(dropLoneSurrogate(body)).length > MAILTO_BODY_ENCODED_MAX) {
    // Kodlanmış uzunluk sınıra sığana kadar en uzun öneki ikili aramayla bul
    let lo = 0;
    let hi = body.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      const candidate = dropLoneSurrogate(body.slice(0, mid)) + MAILTO_TRUNCATED_NOTE;
      if (encodeURIComponent(candidate).length <= MAILTO_BODY_ENCODED_MAX) lo = mid;
      else hi = mid - 1;
    }
    body = dropLoneSurrogate(body.slice(0, lo)) + MAILTO_TRUNCATED_NOTE;
  }
  return mailtoHref(subject, body);
}

/** Yedek kanal: WhatsApp mesajı. WHATSAPP_ENABLED false ise null döner (butonu gizleyin). */
export function buildLeadWhatsApp(payload: LeadPayload, options: { origin?: string } = {}): string | null {
  return whatsappHref(buildLeadText(payload, { origin: options.origin }));
}

/**
 * QuoteContext öğesini LeadItem'a çevirir (QuoteItem ile yapısal uyumlu; bağımlılık yaratmaz).
 * Örnek: items.map(leadItemFromQuote)
 */
export function leadItemFromQuote(q: {
  productTitle: string;
  productSlug?: string;
  quantity: number;
  unit: string;
  spec?: string;
}): LeadItem {
  return {
    title: q.productTitle,
    quantity: q.quantity,
    unit: q.unit,
    spec: q.spec || undefined,
    url: q.productSlug ? `/urunler/${q.productSlug}` : undefined,
  };
}

/** Talep gönderim uç noktası. */
export const LEAD_ENDPOINT = "/api/teklif";
const SUBMIT_TIMEOUT_MS = 15000;

/**
 * Talebi /api/teklif'e gönderir. Asla throw etmez.
 * Başarısızlıkta code'a göre davranın:
 *  - NOT_CONFIGURED / SERVER / NETWORK → buildLeadMailto() ile e-posta yedeğini önerin
 *  - VALIDATION → result.fields içindeki alan hatalarını gösterin
 *  - RATE_LIMIT → kısa süre sonra tekrar denemesini isteyin
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const local = validateLead(payload);
  if (!local.ok) {
    return { ok: false, code: "VALIDATION", message: LEAD_ERROR_MESSAGES.VALIDATION, fields: local.fields };
  }

  // İstemci saatinden bağımsız bot kontrolü için geçen süre istemcide hesaplanır.
  const elapsedMs =
    typeof payload.startedAt === "number" && Number.isFinite(payload.startedAt)
      ? Math.max(0, Date.now() - payload.startedAt)
      : undefined;
  const pageUrl =
    payload.pageUrl ?? (typeof window !== "undefined" ? window.location.href.slice(0, LEAD_LIMITS.pageUrl) : undefined);

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS) : null;

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, pageUrl, elapsedMs }),
      signal: controller?.signal,
      cache: "no-store",
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    const d = (data && typeof data === "object" ? data : {}) as {
      ok?: boolean;
      id?: string;
      code?: LeadErrorCode;
      message?: string;
      fields?: LeadFieldErrors;
    };

    if (res.ok && d.ok === true && typeof d.id === "string") return { ok: true, id: d.id };

    const code: LeadErrorCode =
      d.code && d.code in LEAD_ERROR_MESSAGES
        ? d.code
        : res.status === 503
          ? "NOT_CONFIGURED"
          : res.status === 429
            ? "RATE_LIMIT"
            : res.status === 400 || res.status === 413 || res.status === 422
              ? "VALIDATION"
              : "SERVER";
    return {
      ok: false,
      code,
      message: typeof d.message === "string" && d.message ? d.message : LEAD_ERROR_MESSAGES[code],
      fields: d.fields,
    };
  } catch {
    return { ok: false, code: "NETWORK", message: LEAD_ERROR_MESSAGES.NETWORK };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** E-posta kısa yolu (kullanıcıya gösterilecek adres). */
export const LEAD_FALLBACK_EMAIL = COMPANY.email;
