/* ────────────────────────────────────────────────────────────────────────────
 * POST /api/teklif — teklif ve iletişim taleplerini e-posta ile iletir.
 *
 * Ortam değişkenleri (Vercel > Settings > Environment Variables; ayrıntı README.md):
 *   RESEND_API_KEY        Resend API anahtarı (birincil kanal: e-posta)
 *   LEAD_TO_EMAIL         Talebin gideceği adres(ler), virgülle ayrılabilir. Varsayılan: COMPANY.email
 *   LEAD_FROM_EMAIL       Gönderen. Varsayılan: "Arma Hırdavat Web <onboarding@resend.dev>"
 *                         (alan adı Resend'de doğrulanınca ör. "Arma Hırdavat Web <teklif@armahirdavat.com.tr>")
 *   LEAD_WEBHOOK_URL      İsteğe bağlı yedek kanal: talep JSON olarak buraya da POST edilir
 *   LEAD_WEBHOOK_SECRET   İsteğe bağlı: webhook isteğine "Authorization: Bearer <secret>" eklenir
 * İkisi de (RESEND_API_KEY, LEAD_WEBHOOK_URL) yoksa 503 NOT_CONFIGURED döner; istemci
 * e-posta (mailto) yedeğini önerir.
 *
 * Gizlilik: kişisel veriler loglanmaz; yalnızca referans no ve hata durumu yazılır.
 * ──────────────────────────────────────────────────────────────────────────── */

import { NextResponse } from "next/server";
import { COMPANY, SITE_URL } from "@/data/company";
import {
  LEAD_ERROR_MESSAGES,
  LEAD_MIN_FILL_MS,
  buildLeadText,
  formatLeadItem,
  normalizeLead,
  validateLead,
  type LeadErrorCode,
  type LeadFieldErrors,
  type LeadPayload,
} from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;
const SEND_TIMEOUT_MS = 10_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const DEFAULT_FROM = "Arma Hırdavat Web <onboarding@resend.dev>";

/* ── yardımcılar ─────────────────────────────────────────────────────────── */

function reply(status: number, body: { ok: true; id: string } | { ok: false; code: LeadErrorCode; message: string; fields?: LeadFieldErrors }) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function fail(status: number, code: LeadErrorCode, fields?: LeadFieldErrors) {
  return reply(status, { ok: false, code, message: LEAD_ERROR_MESSAGES[code], ...(fields ? { fields } : {}) });
}

/** Kısa referans numarası: "AR-" + base36 zaman + 2 rastgele karakter. */
function makeId(): string {
  const rand = Math.random().toString(36).slice(2, 4).padEnd(2, "0");
  return `AR-${Date.now().toString(36)}${rand}`.toUpperCase();
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Yalnızca site içi yol veya http(s) adresine izin verir; aksi hâlde null. */
function safeLink(url: string | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/") && !url.startsWith("//")) return `${SITE_URL}${url}`;
  if (/^https?:\/\//i.test(url)) return url;
  return null;
}

/** Hata mesajlarındaki e-posta adreslerini gizler (loglara kişisel veri yazmamak için). */
function scrub(text: string): string {
  return text.replace(/[^\s@"'<>]+@[^\s@"'<>]+/g, "[e-posta]").slice(0, 200);
}

/* ── hız sınırı (en iyi çaba; sunucusuz örnekler arasında paylaşılmaz) ───────── */

const hits = new Map<string, number[]>();

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = (fwd ? fwd.split(",")[0] : null)?.trim() || req.headers.get("x-real-ip")?.trim() || "unknown";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    // bellek sınırı: en eski anahtarları at
    for (const k of Array.from(hits.keys()).slice(0, 1000)) hits.delete(k);
  }
  return false;
}

/* ── e-posta içeriği ─────────────────────────────────────────────────────── */

function buildSubject(lead: LeadPayload, id: string): string {
  const who = lead.company || lead.name;
  const base =
    lead.kind === "rfq"
      ? `Yeni teklif talebi – ${who} (${lead.items?.length ?? 0} kalem)`
      : `Yeni iletişim mesajı – ${lead.name}`;
  return `${base} · ${id}`.replace(/[\r\n]+/g, " ").slice(0, 200);
}

function buildHtml(lead: LeadPayload, id: string): string {
  const rows: Array<[string, string | undefined]> = [
    ["Ad soyad", lead.name],
    ["Firma", lead.company],
    ["Görev", lead.role],
    ["Sektör", lead.sector],
    ["Telefon", lead.phone],
    ["E-posta", lead.email],
    ["Teslimat ili", lead.city],
  ];
  const td = 'style="padding:6px 12px 6px 0;vertical-align:top;border-bottom:1px solid #E2E8F0"';
  const fieldRows = rows
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => {
      let value = escapeHtml(v);
      if (k === "E-posta") value = `<a href="mailto:${escapeHtml(v)}">${value}</a>`;
      if (k === "Telefon") value = `<a href="tel:${escapeHtml(String(v).replace(/[^\d+]/g, ""))}">${value}</a>`;
      return `<tr><td ${td}><strong>${escapeHtml(k)}</strong></td><td ${td}>${value}</td></tr>`;
    })
    .join("");

  const items = lead.items ?? [];
  const itemList = items.length
    ? `<h3 style="margin:24px 0 8px;font-size:16px">Talep edilen ürünler (${items.length} kalem)</h3><ol style="margin:0;padding-left:20px">${items
        .map((it) => {
          const link = safeLink(it.url);
          const label = escapeHtml(formatLeadItem(it));
          return `<li style="margin:4px 0">${link ? `<a href="${escapeHtml(link)}">${label}</a>` : label}</li>`;
        })
        .join("")}</ol>`
    : "";

  const message = lead.message
    ? `<h3 style="margin:24px 0 8px;font-size:16px">Not</h3><p style="margin:0;white-space:pre-wrap">${escapeHtml(lead.message)}</p>`
    : "";

  const page = lead.pageUrl ? `<p style="margin:24px 0 0;color:#64748B;font-size:12px">Gönderildiği sayfa: ${escapeHtml(lead.pageUrl)}</p>` : "";

  return `<!doctype html><html lang="tr"><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#0F172A">
<h2 style="margin:0 0 4px;font-size:20px">${lead.kind === "rfq" ? "Yeni teklif talebi" : "Yeni iletişim mesajı"}</h2>
<p style="margin:0 0 16px;color:#64748B">Referans: ${escapeHtml(id)} · Yanıtla dediğinizde müşteriye gider.</p>
<table style="border-collapse:collapse">${fieldRows}</table>
${itemList}
${message}
${page}
</body></html>`;
}

/* ── teslim kanalları ───────────────────────────────────────────────────── */

async function postJson(url: string, headers: Record<string, string>, body: unknown): Promise<{ ok: boolean; status: number; detail?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
    let detail: string | undefined;
    if (!res.ok) {
      try {
        detail = scrub(await res.text());
      } catch {
        detail = undefined;
      }
    }
    return { ok: res.ok, status: res.status, detail };
  } catch (err) {
    return { ok: false, status: 0, detail: err instanceof Error ? err.name : "error" };
  } finally {
    clearTimeout(timer);
  }
}

async function sendWithResend(apiKey: string, lead: LeadPayload, id: string) {
  const to = (process.env.LEAD_TO_EMAIL || COMPANY.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return postJson(
    "https://api.resend.com/emails",
    { Authorization: `Bearer ${apiKey}` },
    {
      from: process.env.LEAD_FROM_EMAIL || DEFAULT_FROM,
      to,
      reply_to: lead.email,
      subject: buildSubject(lead, id),
      text: buildLeadText(lead, { origin: SITE_URL, id }),
      html: buildHtml(lead, id),
    }
  );
}

async function sendToWebhook(url: string, lead: LeadPayload, id: string) {
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  return postJson(url, secret ? { Authorization: `Bearer ${secret}` } : {}, {
    id,
    receivedAt: new Date().toISOString(),
    subject: buildSubject(lead, id),
    lead,
    text: buildLeadText(lead, { origin: SITE_URL, id }),
  });
}

/* ── handler ─────────────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY_BYTES) return fail(raw ? 413 : 400, "VALIDATION");

  let body: Partial<LeadPayload> & { elapsedMs?: unknown };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail(400, "VALIDATION");
    body = parsed as Partial<LeadPayload> & { elapsedMs?: unknown };
  } catch {
    return fail(400, "VALIDATION");
  }

  // Bot tuzakları: başarılı gibi yanıt ver, hiçbir şey gönderme.
  const honeypotFilled = typeof body.website === "string" && body.website.trim() !== "";
  const elapsed =
    typeof body.elapsedMs === "number" && Number.isFinite(body.elapsedMs)
      ? body.elapsedMs
      : typeof body.startedAt === "number" && Number.isFinite(body.startedAt)
        ? Date.now() - body.startedAt
        : null;
  // Negatif süre = istemci saati ileri; bot sayma.
  const tooFast = elapsed !== null && elapsed >= 0 && elapsed < LEAD_MIN_FILL_MS;
  if (honeypotFilled || tooFast) return reply(200, { ok: true, id: makeId() });

  const check = validateLead(body);
  if (!check.ok) return fail(400, "VALIDATION", check.fields);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!apiKey && !webhookUrl) return fail(503, "NOT_CONFIGURED");

  if (isRateLimited(clientKey(req))) return fail(429, "RATE_LIMIT");

  const lead = normalizeLead(body as LeadPayload);
  const id = makeId();

  const [mail, hook] = await Promise.all([
    apiKey ? sendWithResend(apiKey, lead, id) : Promise.resolve(null),
    webhookUrl ? sendToWebhook(webhookUrl, lead, id) : Promise.resolve(null),
  ]);

  if (mail && !mail.ok) console.error(`[teklif] ${id} resend başarısız: status=${mail.status} ${mail.detail ?? ""}`);
  if (hook && !hook.ok) console.error(`[teklif] ${id} webhook başarısız: status=${hook.status} ${hook.detail ?? ""}`);

  if (mail?.ok || hook?.ok) return reply(200, { ok: true, id });
  return fail(502, "SERVER");
}
