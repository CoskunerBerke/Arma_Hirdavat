/* ────────────────────────────────────────────────────────────────────────────
 * Teklif hunisi analitik olay adları (lib/track.ts → track()).
 * Kişisel veri GÖNDERMEYİN: yalnızca adet, birim, tür, ürün slug'ı, hata kodu.
 * ──────────────────────────────────────────────────────────────────────────── */

export const QUOTE_EVENTS = {
  /** Ürün / serbest kalem teklif listesine eklendi (props: kalem, birim, tur, urun?) */
  added: "teklif_listesine_eklendi",
  /** Teklif penceresi açıldı (props: kalem, kaynak?) */
  modalOpened: "teklif_modal_acildi",
  /** Teklif talebi sunucuya ulaştı (props: kalem) */
  submitted: "teklif_gonderildi",
  /** Sunucu iletemedi; e-posta / kopyala yedeği gösterildi (props: kod, tur) */
  fallback: "teklif_yedek_kanal",
  /** İletişim formu mesajı sunucuya ulaştı */
  contactSubmitted: "iletisim_gonderildi",
} as const;
