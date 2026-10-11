/**
 * MÜŞTERİ YORUMLARI — YALNIZCA GERÇEK VE KAYNAĞI GÖSTERİLEBİLİR YORUMLAR
 *
 * Bu listeye yalnızca:
 *   - Google İşletme Profili'nde yayımlanmış bir yorum (source: "google", sourceUrl ile), veya
 *   - müşterinin yazılı olarak verdiği ve sitede adıyla/firmasıyla yayımlanmasına
 *     yazılı onay verdiği bir referans (source: "yazili-referans")
 * eklenebilir. Metin kısaltılabilir ama anlamı değiştirilemez. "Doğrulanmış" gibi rozetler
 * kullanılmaz (Google bu yorumları "doğrulanmamış" olarak işaretler).
 * AggregateRating/Review yapısal verisi bu listeden TÜRETİLMEZ: Google, işletmenin kendi
 * sitesindeki kendisiyle ilgili yorum işaretlemesini (self-serving reviews) desteklemez.
 *
 * Liste boşken yorum bölümü hiç gösterilmemelidir (REVIEWS.length === 0).
 */
export interface Review {
  /** Yorumu yapan kişinin adı ("Ad S." biçiminde kısaltılmış). */
  name: string;
  /** Yorum metni (kaynaktaki haliyle). */
  comment: string;
  /** Kaynak: Google İşletme Profili yorumu veya yazılı (onaylı) müşteri referansı. */
  source: "google" | "yazili-referans";
  /** Google yorumunun / profilinin bağlantısı. */
  sourceUrl?: string;
  /** Yorum tarihi: "YYYY" (Google yalnızca göreli tarih gösterdiğinde yaklaşık yıl) veya "YYYY-MM-DD". */
  date: string;
  /** Kaynakta verilen yıldız (1–5). */
  rating?: number;
  /** Firma adı — yalnızca yayın onayı varsa. */
  company?: string;
  /** Görev / unvan (ör. "Satın alma sorumlusu"). */
  role?: string;
  /** @deprecated Eski alan; yerine company / role kullanın. */
  sector?: string;
}

/** Google Haritalar işletme profili (yorumlar sekmesi). */
export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=9693400817000170214";

/**
 * Google Haritalar'daki genel puan — 11 Ekim 2026'da profilden okundu.
 * Yeni yorum geldikçe güncelleyin (puan ve yorum sayısı birlikte).
 */
export const GOOGLE_RATING = {
  value: 4.7,
  count: 14,
  url: GOOGLE_REVIEWS_URL,
  retrievedAt: "2026-10-11",
} as const;

/**
 * Google Haritalar'daki metin içeren yorumlar (yalnızca emoji / boş olanlar alınmadı).
 * Kaynak: GOOGLE_REVIEWS_URL — 11 Ekim 2026'da okundu. Tarihler Google'ın göreli
 * tarihinden ("bir yıl önce" vb.) yaklaşık yıl olarak çevrildi.
 */
export const REVIEWS: Review[] = [
  {
    name: "Seref K.",
    role: "Google Yerel Rehber",
    comment:
      "Hırdavat üzerine doktora yapmış arkadaşlar hizmet zaten on numara sadece ne istediğinizi bilin gelirken yeterli gerisini hallediyor en uygun fiyata alıyorsunuz.",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2025",
    rating: 5,
  },
  {
    name: "Arda",
    comment: "Süper bir işletme",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2022",
    rating: 5,
  },
  {
    name: "Köksal A.",
    role: "Google Yerel Rehber",
    comment: "Modern",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2025",
    rating: 5,
  },
  {
    name: "Mehmet C.",
    role: "Google Yerel Rehber",
    comment: "Sağolun varolun",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2025",
    rating: 5,
  },
  {
    name: "Bülent Deniz Y.",
    comment: "Sağolun varolun 🙏❤️",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2025",
    rating: 5,
  },
  {
    name: "Ahmet K.",
    role: "Google Yerel Rehber",
    comment: "Teşekkür ederiz, varolunuz.",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2025",
    rating: 5,
  },
  {
    name: "Abdullah B.",
    comment: "Teşekkür ederiz 🙏",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2025",
    rating: 5,
  },
  {
    name: "Hayri Y.",
    role: "Google Yerel Rehber",
    comment: "Teşekkür ederiz abim 🙏",
    source: "google",
    sourceUrl: GOOGLE_REVIEWS_URL,
    date: "2024",
    rating: 5,
  },
];
