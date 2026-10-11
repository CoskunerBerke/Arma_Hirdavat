/**
 * ESKİ ÜRÜN ADRESLERİ (slug) — DONDURULMUŞ KAYIT
 *
 * İlk yayındaki ürün adresleri slugify(`${code}-${title}`) ile üretiliyordu; başlık zaten kodu
 * içerdiği için kod adreste iki kez geçiyordu (ör. /urunler/ep-1301-faba-ep-1301-...).
 * Yeni formül slugify(title). Bu dosya, 2026-10-11 tarihinde yayındaki 39 adresin birebir kopyasıdır.
 *
 * KURALLAR
 * - Bu dosyadaki değerleri DEĞİŞTİRMEYİN: dışarıda paylaşılmış / indekslenmiş adreslerdir.
 * - Yayından sonra bir ürünün başlığı (title) değişirse adresi de değişir. O durumda ürünün
 *   ESKİ slug değerini LEGACY_SLUGS_EXTRA listesine ekleyin. next.config.mjs → redirects()
 *   bu dosyayı okuyup eski adresleri güncel adrese kalıcı (308) yönlendirir; çalışma anında
 *   resolveLegacySlug() (data/products.ts) aynı eşlemeyi verir.
 * - Biçimi koruyun: `  <id>: "<slug>",` ve `  <id>: ["<slug>", …],` (next.config.mjs metin olarak okur).
 */

/** Ürün id → ilk yayındaki slug (kod-tekrarlı eski format). */
export const LEGACY_SLUGS: Readonly<Record<number, string>> = {
  1: "ep-1301-faba-ep-1301-nitril-kaplamali-isci-eldiveni",
  2: "ep-1302-faba-ep-1302-nitril-kaplamali-isci-eldiveni",
  3: "ep-1303-faba-ep-1303-nitril-kaplamali-isci-eldiveni",
  4: "ep-1401-faba-ep-1401-tam-kaplama-nitril-isci-eldiveni",
  5: "ep-1402-faba-ep-1402-tam-kaplama-mavi-nitril-isci-eldiveni",
  6: "ep-1403-faba-ep-1403-tam-kaplama-siyah-nitril-isci-eldiveni",
  7: "truflex-en-1501-faba-truflex-en-1501-kopuk-nitril-hassas-montaj-eldiveni",
  8: "truflex-en-1502-faba-truflex-en-1502-kopuk-nitril-is-eldiveni",
  9: "truflex-en-1503-faba-truflex-en-1503-siyah-kopuk-nitril-eldiven",
  10: "truflex-en-1511-faba-truflex-en-1511-noktali-kopuk-nitril-eldiven",
  11: "truflex-en-1512-faba-truflex-en-1512-noktali-renkli-kopuk-nitril-eldiven",
  12: "trucut-ek-5000-faba-trucut-ek-5000-seviye-d-kesilmeye-direncli-eldiven",
  13: "trucut-ek-5610-faba-trucut-ek-5610-nitril-kaplamali-kesilmez-eldiven",
  14: "trucut-ek-5620-faba-trucut-ek-5620-agir-hizmet-kesilmez-eldiven",
  15: "zevahir-d200-35-faba-zevahir-d200-35-agir-kaynakci-eldiveni-35-cm",
  16: "zevahir-d200-40-faba-zevahir-d200-40-agir-kaynakci-eldiveni-40-cm",
  17: "zevahir-d300-35-faba-zevahir-d300-35-kirmizi-kaynakci-eldiveni-35-cm",
  18: "zevahir-d300-40-faba-zevahir-d300-40-kirmizi-kaynakci-eldiveni-40-cm",
  19: "zevahir-d-105-faba-zevahir-d-105-cilt-keci-derisi-surucu-montaj-eldiveni",
  20: "zevahir-d-100-faba-zevahir-d-100-cilt-keci-derisi-tig-argon-kaynak-eldiveni",
  21: "zevahir-d-101-faba-zevahir-d-101-tig-argon-kaynakci-eldiveni",
  22: "truchem-t-800-faba-truchem-t-800-tip-3b-4b-5b-6b-kimyasal-koruyucu-tulum",
  23: "truchem-t-800-g-faba-truchem-t-800-g-kendinden-corapli-kimyasal-tulum",
  24: "truchem-t-630-faba-truchem-t-630-tip-4b-5b-6b-kimyasal-koruyucu-tulum",
  25: "truchem-t-630-g-faba-truchem-t-630-g-kendinden-corapli-kimyasal-tulum",
  26: "t-535-faba-t-535-tip-5-6-dikis-bantli-lamineli-tulum-55-gr-m",
  27: "t-530-faba-t-530-tip-5-6-tek-kullanimlik-lamineli-tulum-55-gr-m",
  28: "t-500-faba-t-500-sms-tip-5-6-nefes-alabilir-tulum-55-gr-m",
  29: "t-300-faba-t-300-tek-kullanimlik-ekonomik-tulum-35-gr-m",
  30: "lo-530-faba-lo-530-fermuarli-laboratuvar-onlugu-55-gr-m",
  31: "lo-531-faba-lo-531-arkadan-baglamali-lamineli-onluk",
  32: "lk-530-faba-lk-530-lamineli-koruyucu-kolluk",
  33: "ag-530-faba-ag-530-lamineli-kaymaz-ayakkabi-galosu",
  34: "lb-530-faba-lb-530-lamineli-koruyucu-baslik-kukuleta",
  35: "kk-800-faba-kk-800-truchem-tip-pb3-b-pb4-b-kimyasal-kolluk",
  36: "ko-800-faba-ko-800-truchem-tip-pb3-b-pb4-b-kimyasal-onluk",
  37: "bg-800-faba-bg-800-truchem-tip-pb3-b-pb4-b-kimyasal-bot-galosu",
  38: "bg-530-faba-bg-530-lamineli-diz-alti-cizme-bot-galosu",
  39: "bg-630-faba-bg-630-dikis-bantli-kimyasal-bot-galosu",
};

/**
 * Sonradan değişen başlıkların eski slugları (ürün id → eski slug listesi).
 * Örnek: { 12: ["faba-trucut-ek-5000-seviye-d-kesilmeye-direncli-eldiven"] }
 */
export const LEGACY_SLUGS_EXTRA: Readonly<Record<number, readonly string[]>> = {};
