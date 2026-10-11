/* ────────────────────────────────────────────────────────────────────────────
 * ÜRÜN SAYFASI YARDIMCILARI — yalnızca data/products.ts verisinden türetilir.
 * Hiçbir iddia burada üretilmez: kod, beden, koli içi adet ve standartlar veride ne
 * yazıyorsa o gösterilir. Bu dosya sunucu ve istemci bileşenlerinde kullanılabilir.
 * ──────────────────────────────────────────────────────────────────────────── */

import { parseKoli, type ProductGroup } from "@/data/products";

/** Markalı başlık şablonunun eklediği metin (app/layout.tsx → "%s | Arma Hırdavat"). */
const TITLE_SUFFIX = " | Arma Hırdavat";
const TITLE_MAX = 60;
const META_MIN = 140;
const META_MAX = 155;

/* ── Beden ──────────────────────────────────────────────────────────────── */

/**
 * sizes alanı beden listesi değil de ölçü / açıklama metni mi?
 * Ör. galoş: "Yükseklik 48 cm, uzunluk 42 cm", kolluk: "Uzunluk 50 cm", "Teklifte teyit edilir".
 * Bu metinler virgülle bölünüp beden gibi gösterilmemelidir.
 */
export function isDimensionText(sizes: string | undefined): boolean {
  return /\d\s*(cm|mm)\b|yükseklik|uzunluk/i.test(sizes ?? "");
}

/** Beden metni olmayan açıklamalar ("Teklifte teyit edilir" gibi) — aralık üretilmez. */
function isFreeText(sizes: string): boolean {
  return isDimensionText(sizes) || /teyit|teklif/i.test(sizes);
}

/** Ölçü metnini tek satırda gösterir: "Yükseklik 48 cm, uzunluk 42 cm" → "Yükseklik 48 cm · uzunluk 42 cm" */
function joinDimensions(sizes: string): string {
  return sizes.replace(/\s*,\s*/g, " · ").trim();
}

/** "7, 8, 9, 10, 11" → "7–11"; "S, M, L, XL, 2XL, 3XL, 4XL" → "S–4XL"; tek değer ve ölçü metni olduğu gibi. */
export function sizeRange(sizes: string | undefined): string {
  const raw = (sizes ?? "").trim();
  if (!raw) return "Standart";
  if (isFreeText(raw)) return joinDimensions(raw);
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) return `${parts[0]}–${parts[parts.length - 1]}`;
  return raw;
}

/** Birden fazla beden seçeneği var mı (beden tablosu bağlantısı için)? Ölçü metni beden sayılmaz. */
export function hasSizeOptions(sizes: string | undefined): boolean {
  const raw = (sizes ?? "").trim();
  if (!raw || isFreeText(raw)) return false;
  return raw.split(",").filter((s) => s.trim()).length >= 2;
}

/** Künye / kart satırı: { label: "Beden" | "Ölçü", value } */
export function sizeFact(p: Pick<ProductGroup, "sizes">): { label: "Beden" | "Ölçü"; value: string } {
  return isDimensionText(p.sizes) ? { label: "Ölçü", value: sizeRange(p.sizes) } : { label: "Beden", value: sizeRange(p.sizes) };
}

/** Tam beden listesi veya ölçü metni (tablolar için; aralığa çevrilmez). */
export function sizeText(p: Pick<ProductGroup, "sizes">): string {
  const raw = (p.sizes ?? "").trim();
  if (!raw) return "Standart";
  return isDimensionText(raw) ? joinDimensions(raw) : raw;
}

/**
 * Teklif kutusuna (SizeQuotePicker) verilecek sizes değeri. Seçici sizes metnini virgülden böler;
 * ölçü metni ("Yükseklik 48 cm, uzunluk 42 cm") iki ayrı "beden" sanılmasın diye tek parçaya çevrilir.
 */
export function quoteSizes(p: Pick<ProductGroup, "sizes">): string {
  return isDimensionText(p.sizes) ? joinDimensions(p.sizes) : p.sizes;
}

/* ── Standartlar ────────────────────────────────────────────────────────── */

export interface TypeToken {
  /** Kısmi vücut koruması (PB) */
  pb: boolean;
  /** 3 | 4 | 5 | 6 */
  n: number;
  /** "-B" eki: EN 14126'ya göre biyolojik ajanlara karşı test edilmiş */
  bio: boolean;
}

const TYPE_TOKEN_RE = /\b(?:type|tip)\s*(?:pb\s*)?\(?\s*[3-6]\s*\)?\s*-?\s*b?\b|\bpb\s*\(?\s*[3-6]\s*\)?\s*-?\s*b?\b/gi;

/** "Type 3B (EN 14605)" → [{ n: 3, bio: true }]; "Type PB 4-B / PB 6-B" → 2 öğe. */
export function parseTypeTokens(standard: string): TypeToken[] {
  const tokens = standard.match(TYPE_TOKEN_RE) ?? [];
  return tokens.map((tok) => {
    const compact = tok.replace(/[\s()]+/g, "");
    const n = Number(/[3-6]/.exec(compact)?.[0] ?? 0);
    return { pb: /pb/i.test(compact), n, bio: /b$/i.test(compact) && !/pb$/i.test(compact) };
  });
}

export function formatTypeToken(t: TypeToken): string {
  return t.pb ? `PB${t.n}${t.bio ? "-B" : ""}` : `${t.n}${t.bio ? "B" : ""}`;
}

/** "EN 388: 2016+A1:2018 (4121X)" → "4121X" (yoksa null). */
export function en388Code(standard: string): string | null {
  if (!/EN\s*388/i.test(standard)) return null;
  const m = /\(\s*([0-4X][0-5X][0-4X][0-4X][A-FX]?P?)\s*\)/i.exec(standard) ?? /\b([0-4X][0-5X][0-4X][0-4X][A-FX]P?)\b/i.exec(standard);
  return m ? m[1].toUpperCase() : null;
}

/** "EN 407: 2020 (413X4X)" → "413X4X" (yoksa null). */
export function en407Code(standard: string): string | null {
  if (!/EN\s*407/i.test(standard)) return null;
  const m = /\(\s*([0-4X]{6})\s*\)/i.exec(standard) ?? /\b([0-4X]{6})\b/i.exec(standard.replace(/\b(19|20)\d{2}\b/g, ""));
  return m ? m[1].toUpperCase() : null;
}

/** "EN 12477 Tip A" → "A" (yoksa null). */
export function en12477Type(standard: string): "A" | "B" | null {
  if (!/EN\s*12477/i.test(standard)) return null;
  const m = /(?:tip|type)\s*-?\s*([AB])\b/i.exec(standard);
  return m ? (m[1].toUpperCase() as "A" | "B") : null;
}

/** "EN ISO 21420: 2020" → "EN ISO 21420" */
export function stripYear(standard: string): string {
  return standard.replace(/\s*:\s*\d{4}.*$/, "").trim();
}

/**
 * Ürünü en iyi tanımlayan tek standart etiketi:
 * kaynak eldiveni → "EN 12477 Tip A", eldiven → "EN 388 4121X", giysi → "Tip 3B/4B/5B/6B".
 */
export function mainStandard(p: Pick<ProductGroup, "standards">): string {
  const list = p.standards ?? [];
  for (const s of list) {
    const t = en12477Type(s);
    if (t) return `EN 12477 Tip ${t}`;
  }
  for (const s of list) {
    const code = en388Code(s);
    if (code) return `EN 388 ${code}`;
  }
  const types = list.flatMap(parseTypeTokens).filter((t) => t.n >= 3 && t.n <= 6);
  if (types.length) {
    const seen = new Set<string>();
    const labels = types.map(formatTypeToken).filter((l) => (seen.has(l) ? false : (seen.add(l), true)));
    return `Tip ${labels.join("/")}`;
  }
  const en = list.find((s) => /^EN\b/i.test(s.trim()));
  if (en) return stripYear(en);
  return list[0] ? stripYear(list[0]) : "";
}

/* ── Koli ───────────────────────────────────────────────────────────────── */

/** "252 Çift" → "252 çift" (çözülemezse ham değer). */
export function koliLabel(p: Pick<ProductGroup, "koli">): string {
  const info = parseKoli(p.koli);
  return info ? `${info.perCarton.toLocaleString("tr-TR")} ${info.unit}` : p.koli;
}

/** Ürün listesinin gerçek koli içi aralığı: "192–252 çift" (birimler karışıksa veya veri yoksa null). */
export function koliRange(products: Pick<ProductGroup, "koli">[]): string | null {
  const infos = products.map((p) => parseKoli(p.koli)).filter((k): k is NonNullable<typeof k> => Boolean(k));
  if (!infos.length || infos.some((k) => k.unit !== infos[0].unit)) return null;
  const min = Math.min(...infos.map((k) => k.perCarton));
  const max = Math.max(...infos.map((k) => k.perCarton));
  const fmt = (n: number) => n.toLocaleString("tr-TR");
  return min === max ? `${fmt(min)} ${infos[0].unit}` : `${fmt(min)}–${fmt(max)} ${infos[0].unit}`;
}

/* ── Ürün türü (başlık ve kırıntı için) ─────────────────────────────────── */

export interface ProductType {
  long: string;
  short: string;
}

export function productType(p: Pick<ProductGroup, "title" | "category">): ProductType {
  const t = p.title.toLocaleLowerCase("tr-TR");
  switch (p.category) {
    case "Nitril Kaplı İş Eldivenleri":
      return t.includes("tam kaplama")
        ? { long: "Tam Kaplama Nitril İş Eldiveni", short: "Nitril İş Eldiveni" }
        : { long: "Nitril Kaplı İş Eldiveni", short: "Nitril İş Eldiveni" };
    case "Köpük Nitril Eldivenler":
      return t.includes("noktal")
        ? { long: "Noktalı Köpük Nitril Eldiven", short: "Köpük Nitril Eldiven" }
        : { long: "Köpük Nitril Eldiven", short: "Köpük Nitril Eldiven" };
    case "Kesilmeye Dirençli Eldivenler":
      return { long: "Kesilmeye Dirençli Eldiven", short: "Kesilmeye Dirençli Eldiven" };
    case "Kaynakçı ve Sürücü Eldivenleri":
      if (t.includes("tig") || t.includes("argon")) return { long: "TIG Argon Kaynak Eldiveni", short: "Argon Eldiveni" };
      if (t.includes("sürücü")) return { long: "Deri Sürücü Eldiveni", short: "Sürücü Eldiveni" };
      return { long: "Kaynakçı Eldiveni", short: "Kaynak Eldiveni" };
    case "Kimyasal Koruyucu Tulumlar":
      return t.includes("çorap")
        ? { long: "Çoraplı Kimyasal Koruyucu Tulum", short: "Çoraplı Kimyasal Tulum" }
        : { long: "Kimyasal Koruyucu Tulum", short: "Kimyasal Tulum" };
    case "Tek Kullanımlık Tulumlar":
      if (t.includes("sms")) return { long: "SMS Tek Kullanımlık Tulum", short: "SMS Tulum" };
      if (t.includes("lamine")) return { long: "Lamineli Tek Kullanımlık Tulum", short: "Lamineli Tulum" };
      return { long: "Tek Kullanımlık Tulum", short: "Tek Kullanımlık Tulum" };
    case "Önlük ve Laboratuvar Önlüğü":
      if (t.includes("laboratuvar")) return { long: "Laboratuvar Önlüğü", short: "Laboratuvar Önlüğü" };
      if (t.includes("kimyasal")) return { long: "Kimyasal Koruyucu Önlük", short: "Kimyasal Önlük" };
      return { long: "Lamineli Koruyucu Önlük", short: "Lamineli Önlük" };
    case "Kolluk, Galoş ve Başlık":
      if (t.includes("kolluk"))
        return t.includes("kimyasal")
          ? { long: "Kimyasal Koruyucu Kolluk", short: "Kimyasal Kolluk" }
          : { long: "Lamineli Koruyucu Kolluk", short: "Lamineli Kolluk" };
      if (t.includes("başlık")) return { long: "Koruyucu Başlık (Kukuleta)", short: "Koruyucu Başlık" };
      if (t.includes("bot")) return t.includes("kimyasal")
        ? { long: "Kimyasal Bot Galoşu", short: "Kimyasal Bot Galoşu" }
        : { long: "Lamineli Bot Galoşu", short: "Bot Galoşu" };
      return { long: "Ayakkabı Galoşu", short: "Ayakkabı Galoşu" };
    default:
      return { long: p.category, short: p.category };
  }
}

/** Kırıntı ve kısa listeler için: "EP-1301 Nitril İş Eldiveni" */
export function productShortLabel(p: Pick<ProductGroup, "code" | "title" | "category">): string {
  return `${p.code} ${productType(p).short}`;
}

/* ── SEO başlığı ───────────────────────────────────────────────────────── */

export interface SeoTitle {
  text: string;
  /** true → title: { absolute } (marka eki eklenmez, 60 karakteri aşmamak için) */
  absolute: boolean;
}

function fitTitle(text: string): SeoTitle {
  return { text, absolute: text.length + TITLE_SUFFIX.length > TITLE_MAX };
}

/**
 * p.seoTitle varsa o; yoksa "FABA <kod> <tür> (<ana standart>)" kalıbı (≤ 60 karakter).
 * Kalıp + marka eki 60'ı aşıyorsa title.absolute kullanılır (marka tekrar etmez).
 */
export function productSeoTitle(p: ProductGroup): SeoTitle {
  if (p.seoTitle?.trim()) return fitTitle(p.seoTitle.trim());
  const type = productType(p);
  const main = mainStandard(p);
  const code = `FABA ${p.code}`;
  // "Koruyucu Başlık (Kukuleta) (Tip PB6)" gibi çift parantezden kaçın.
  const longForMain = type.long.includes("(") ? type.short : type.long;
  const candidates = [
    main && `${code} ${longForMain} (${main})`,
    main && `${code} ${type.short} (${main})`,
    `${code} ${type.long}`,
    `${code} ${type.short}`,
  ].filter((c): c is string => Boolean(c));
  const pick = candidates.find((c) => c.length <= TITLE_MAX) ?? candidates[candidates.length - 1];
  return fitTitle(pick);
}

/* ── Meta açıklama ─────────────────────────────────────────────────────── */

function sentence(s: string): string {
  const t = s.trim().replace(/\s+/g, " ");
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

/** Ürün özellik maddesi olarak kullanılmaya uygun mu (beden/koli tekrarı ve doğrulanmamış iddia değil)? */
function isUsableFeature(item: string, p: Pick<ProductGroup, "origin">): boolean {
  if (/^\s*(beden seçenekleri|koli içi)/i.test(item)) return false;
  if (!p.origin && /(kastamonu|yerli\s+(üretim|deri|hammadde)|%\s*100\s*yerli)/i.test(item)) return false;
  if (/seviye\s*d\b/i.test(item)) return false;
  return true;
}

/** İki nokta üst üsteden sonra: sıradan bir kelimeyle başlıyorsa küçük harfe çevir ("Eli …" → "eli …"). */
function afterColon(text: string): string {
  const t = text.trim();
  const first = (t.split(/\s+/)[0] ?? "").replace(/[,.;:]+$/, "");
  if (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]+$/.test(first) && !/^(Tip|Type)$/.test(first)) {
    return t.charAt(0).toLocaleLowerCase("tr-TR") + t.slice(1);
  }
  return t;
}

/**
 * p.metaDescription varsa o; yoksa veriden 140–155 karakterlik açıklama:
 * "<fayda> <ana standart>, beden <aralık>, koli içi <adet>. <eylem çağrısı>"
 */
export function productMetaDescription(p: ProductGroup): string {
  if (p.metaDescription?.trim()) return p.metaDescription.trim();

  const main = mainStandard(p);
  const size = hasSizeOptions(p.sizes) ? `beden ${sizeRange(p.sizes)}` : "";
  const koli = `koli içi ${koliLabel(p)}`;
  const specFull = sentence([main, size, koli].filter(Boolean).join(", "));
  const specShort = sentence([main, koli].filter(Boolean).join(", "));

  const feature = (p.items ?? []).find((it) => isUsableFeature(it, p) && it.length <= 70 && !it.includes(":"));
  const featureText = feature ? sentence(afterColon(feature)) : "";
  const leads = [
    sentence(p.description),
    featureText && `FABA ${p.code}: ${featureText}`,
    featureText && `${p.title}: ${featureText}`,
    sentence(p.title),
  ].filter(Boolean);
  const ctas = [
    "Samsun'dan koli bazında toptan teklif alın.",
    "Koli bazında toptan teklif alın.",
    "Toptan teklif alın.",
  ];

  const all: string[] = [];
  for (const lead of leads) {
    for (const spec of [specFull, specShort]) {
      for (const cta of ctas) all.push(`${lead} ${spec} ${cta}`.replace(/\s+/g, " ").trim());
    }
  }
  const inRange = all.find((c) => c.length >= META_MIN && c.length <= META_MAX);
  if (inRange) return inRange;
  const fitting = all.filter((c) => c.length <= META_MAX).sort((a, b) => b.length - a.length);
  if (fitting[0]) return fitting[0];
  // Son çare: en kısa adayı kelime sınırında kısalt.
  const shortest = all.sort((a, b) => a.length - b.length)[0] ?? p.title;
  const cut = shortest.slice(0, META_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/* ── Sayfada gösterilecek özellik maddeleri ve rozet ───────────────────── */

/** "Öne çıkan özellikler" listesi: beden/koli satırları (zaten künyede) ve doğrulanmamış menşe iddiaları hariç. */
export function featureBullets(p: ProductGroup): string[] {
  return (p.items ?? []).filter((it) => isUsableFeature(it, p));
}

/**
 * Kart / görsel rozeti. Satış verisine dayanmayan ("çok satan"), belgelenmemiş menşe ("yerli")
 * ve üretici kataloğuyla çelişen ("Seviye D") rozetler gösterilmez.
 */
export function safeBadge(p: Pick<ProductGroup, "badge" | "origin">): string | null {
  const b = p.badge?.trim();
  if (!b) return null;
  if (/(çok\s*satan|en\s*çok|best)/i.test(b)) return null;
  if (/yerli/i.test(b) && !p.origin) return null;
  if (/seviye\s*d\b/i.test(b)) return null;
  return b;
}

/* ── Üretici kataloğu (PDF) sayfa numaraları ───────────────────────────── */

/**
 * FABA ürün kataloğunda (public/catalogs/FABA-Catalog-TR.pdf, 48 sayfa) her ürünün sayfası.
 * Ürün kimliğine (id) göre; katalog metninden tek tek doğrulandı (2026-10-11).
 */
const FABA_CATALOG_PAGE_BY_ID: Record<number, number> = {
  1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, // EP-1301 … EP-1403
  7: 10, 8: 11, 9: 12, 10: 13, 11: 14, // TruFlex EN-1501 … EN-1512
  12: 16, 13: 17, 14: 18, // TruCut EK-5000, EK-5610, EK-5620
  15: 20, 16: 21, 17: 22, 18: 23, 19: 24, 20: 25, 21: 26, // Zevahir D200-35 … D-101
  22: 29, 23: 30, 24: 31, 25: 32, // TruChem T-800, T-800-G, T-630, T-630-G
  26: 33, 27: 34, 28: 35, 29: 36, // T-535, T-530, T-500, T-300
  30: 37, 31: 38, 32: 39, 33: 40, 34: 41, // LO-530, LO-531, LK-530, AG-530, LB-530
  35: 42, 36: 43, 37: 44, 38: 45, 39: 46, // KK-800, KO-800, BG-800, BG-530, BG-630
};

export function catalogPageFor(id: number): number | null {
  return FABA_CATALOG_PAGE_BY_ID[id] ?? null;
}
