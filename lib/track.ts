/* ────────────────────────────────────────────────────────────────────────────
 * track — dönüşüm olayları (Vercel Web Analytics + varsa Google Tag Manager dataLayer)
 *
 *   import { track, EVENTS } from "@/lib/track";
 *   track(EVENTS.leadSubmitted, { kind: "rfq", items: 3 });
 *
 * - Yalnızca istemci bileşenlerinden çağırın (sunucuda sessizce hiçbir şey yapmaz).
 * - Asla hata fırlatmaz.
 * - Kişisel veri (ad, e-posta, telefon, firma) GÖNDERMEYİN; yalnızca sayı / tür / sayfa bilgisi.
 * - Olay adları için EVENTS sabitlerini kullanın ki raporlar tutarlı kalsın.
 * ──────────────────────────────────────────────────────────────────────────── */

import { track as vercelTrack } from "@vercel/analytics";

export type TrackProps = Record<string, string | number | boolean>;

/** Ortak olay adları (snake_case). Yeni olay gerekiyorsa buraya ekleyin. */
export const EVENTS = {
  /** Teklif listesi / modal açıldı */
  quoteOpen: "quote_open",
  /** Ürün teklif listesine eklendi */
  addToList: "add_to_list",
  /** Form gönderimi başladı */
  leadSubmit: "lead_submit",
  /** Talep sunucuya başarıyla iletildi */
  leadSubmitted: "lead_submitted",
  /** Talep iletilemedi (props.code: NOT_CONFIGURED | VALIDATION | …) */
  leadError: "lead_error",
  /** E-posta (mailto) yedeği kullanıldı */
  leadMailtoFallback: "lead_mailto_fallback",
  /** WhatsApp bağlantısına tıklandı */
  whatsappClick: "whatsapp_click",
  /** Telefon bağlantısına tıklandı */
  phoneClick: "phone_click",
  /** E-posta bağlantısına tıklandı */
  emailClick: "email_click",
  /** Katalog PDF indirildi */
  catalogDownload: "catalog_download",
  /** Ürün araması yapıldı (props.results) */
  search: "search",
} as const;

export type TrackEvent = (typeof EVENTS)[keyof typeof EVENTS] | (string & {});

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, props?: TrackProps): void {
  if (typeof window === "undefined" || !event) return;
  try {
    vercelTrack(event, props);
  } catch {
    // analitik hiçbir zaman kullanıcı akışını bozmamalı
  }
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...(props ?? {}) });
    }
  } catch {
    // yoksay
  }
}

export default track;
