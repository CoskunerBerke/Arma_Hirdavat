/* ────────────────────────────────────────────────────────────────────────────
 * Ürün araması (istemci tarafında, 39 ürünlük online katalog üzerinde)
 *
 *   searchProducts("ep-1301")   → kod eşleşmesi en üstte
 *   searchProducts("kesilmez")  → kesilmeye dirençli eldiven kategorisi
 *   getHardwareHint("cıvata")   → { groups: ["Bağlantı Elemanları"], href: "/urun-gruplari" }
 *
 * Kurallar
 * - Eş anlamlı / niyet sözlüğü ürünü bir KATEGORİYE yönlendirir; hiçbir ürün için
 *   performans seviyesi, sertifika vb. iddia ÜRETMEZ (eşleşme nedeni: "İlgili kategori").
 * - Online sayfası olmayan teknik hırdavat terimleri (cıvata, halat, pompa…) ürün
 *   sonucu üretmez; getHardwareHint() ile /urun-gruplari yönlendirmesi döner.
 * ──────────────────────────────────────────────────────────────────────────── */

import { PRODUCT_GROUPS, type CategoryName, type ProductGroup } from "@/data/products";
import { HARDWARE_GROUPS } from "@/data/company";

/* ── Metin normalizasyonu ─────────────────────────────────────────────────── */

/**
 * Türkçe karakterleri sadeleştirir (ç→c, ğ→g, ı/İ→i, ö→o, ş→s, ü→u, â→a …),
 * küçük harfe çevirir, noktalama ve tireleri boşluğa dönüştürür.
 * "FABA EP-1301 Cıvata" → "faba ep 1301 civata"
 */
export function normalizeText(str: string): string {
  if (!str) return "";
  return str
    .replace(/[ıİI]/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Boşluksuz biçim (kod karşılaştırması için): "TruChem T-800-G" → "truchemt800g" */
function compact(str: string): string {
  return normalizeText(str).replace(/\s+/g, "");
}

const hasDigit = (s: string) => /\d/.test(s);

/** Levenshtein mesafesi (yazım hatası toleransı) */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[b.length];
}

function commonPrefixLength(a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a.charCodeAt(i) === b.charCodeAt(i)) i++;
  return i;
}

/* ── Kelime eşleştirme ────────────────────────────────────────────────────── */

/** 3 = birebir, 2 = önek / aynı kök ("eldivenleri" ~ "eldiveni"), 1 = yazım hatası, 0 = yok */
type WordMatch = 0 | 1 | 2 | 3;

function matchWord(token: string, word: string, allowFuzzy: boolean): WordMatch {
  if (token === word) return 3;
  if (word.startsWith(token) && (token.length >= 2 || hasDigit(token))) return 2;
  // Türkçe ekler: aynı kök (en az 5 harf ortak ve en kısa kelimenin en fazla 2 harfi farklı)
  const cp = commonPrefixLength(token, word);
  if (cp >= 5 && cp >= Math.min(token.length, word.length) - 2) return 2;
  // Yazım hatası: ilk harf aynı olmalı ("taslama" ≠ "kaplama", "gozlugu" ≠ "onlugu")
  if (allowFuzzy && token.length >= 4 && word.length >= 3 && token[0] === word[0] && !hasDigit(token)) {
    const max = token.length <= 5 ? 1 : 2;
    if (Math.abs(token.length - word.length) <= max && levenshtein(token, word) <= max) return 1;
    // yarım yazılmış ve hatalı: "eldvn" ~ "eldiven…"
    if (token.length >= 5 && word.length > token.length && levenshtein(token, word.slice(0, token.length)) <= 1) return 1;
  }
  return 0;
}

function bestMatch(token: string, words: readonly string[], allowFuzzy: boolean): WordMatch {
  let best: WordMatch = 0;
  for (const w of words) {
    const m = matchWord(token, w, allowFuzzy);
    if (m > best) best = m;
    if (best === 3) break;
  }
  return best;
}

/* ── Niyet / eş anlamlı sözlüğü ───────────────────────────────────────────── */

interface IntentRule {
  /** Normalize edilmiş tek kelime ya da kelime öbeği ("seviye c") */
  keys: readonly string[];
  categories: readonly CategoryName[];
}

/**
 * Alıcıların kullandığı kelimeleri online katalog kategorilerine bağlar.
 * Seviye / sınıf terimleri ("seviye c", "seviye d", "cut") yalnızca kategoriye yönlendirir;
 * ürünün seviyesini ürün sayfasındaki EN kodları belirtir.
 */
const INTENT_RULES: readonly IntentRule[] = [
  {
    categories: ["Kesilmeye Dirençli Eldivenler"],
    keys: [
      "kesilmez", "kesilmeye", "kesilme", "kesik", "kesilmeye dayanikli", "kesilmeye direncli",
      "kesmeye dayanikli", "kesmeye direncli", "cut", "cut level", "cut resistant",
      "seviye a", "seviye b", "seviye c", "seviye d", "seviye e", "seviye f",
      "level a", "level b", "level c", "level d", "level e", "level f",
      "bicak", "jilet", "cam", "sac levha", "sac metal", "hppe", "trucut", "kevlar",
    ],
  },
  {
    categories: ["Nitril Kaplı İş Eldivenleri", "Köpük Nitril Eldivenler"],
    keys: ["nitril"],
  },
  {
    categories: ["Nitril Kaplı İş Eldivenleri"],
    keys: ["yag", "yagli", "yaga dayanikli", "gres", "isci eldiveni", "is eldiveni", "orme eldiven", "kaplamali"],
  },
  {
    categories: ["Köpük Nitril Eldivenler"],
    keys: ["kopuk", "hassas", "montaj", "nefes", "nefes alan", "noktali", "truflex"],
  },
  {
    categories: ["Kaynakçı ve Sürücü Eldivenleri"],
    keys: [
      "kaynak", "kaynakci", "argon", "tig", "zevahir", "deri", "sofor", "surucu", "keci",
      "isi", "isiya", "isiya dayanikli", "ates", "sicak",
    ],
  },
  {
    categories: ["Kimyasal Koruyucu Tulumlar", "Tek Kullanımlık Tulumlar"],
    keys: ["tulum", "koruyucu tulum", "lamineli"],
  },
  {
    categories: ["Kimyasal Koruyucu Tulumlar"],
    keys: [
      "kimyasal", "asit", "zehir", "biyolojik", "ilaclama", "tarim ilaci", "truchem",
      "tip 3", "tip 4", "sicrama", "sivi",
    ],
  },
  {
    categories: ["Tek Kullanımlık Tulumlar"],
    keys: ["tek kullanimlik", "kullan at", "boya", "asbest", "toz", "sms", "beyaz tulum", "tip 5", "tip 6"],
  },
  {
    categories: ["Önlük ve Laboratuvar Önlüğü"],
    keys: ["onluk", "laboratuvar", "lab", "lab onlugu"],
  },
  {
    categories: ["Kolluk, Galoş ve Başlık"],
    keys: [
      "kolluk", "kol koruyucu", "galos", "bot", "cizme", "ayakkabi koruyucu", "ayak koruyucu",
      "bone", "bonesi", "baslik", "kukuleta",
    ],
  },
];

/* ── Teknik hırdavat yönlendirmesi ────────────────────────────────────────── */

export type HardwareGroup = (typeof HARDWARE_GROUPS)[number];

/** Teknik hırdavat ürün gruplarının sayfası */
export const HARDWARE_GROUPS_HREF = "/urun-gruplari";

interface HardwareRule {
  keys: readonly string[];
  groups: readonly HardwareGroup[];
}

const HARDWARE_RULES: readonly HardwareRule[] = [
  {
    groups: ["Bağlantı Elemanları", "Diğer Bağlantı Elemanları"],
    keys: [
      "civata", "somun", "pul", "rondela", "vida", "vidalar", "dubel", "percin", "saplama",
      "tij", "baglanti elemani", "baglanti elemanlari", "setuskur", "segman", "kopilya",
    ],
  },
  { groups: ["Çelik Halat ve Gemi Halatı", "Polyester Halat, Kaldırma ve İndirme Ekipmanları"], keys: ["halat"] },
  { groups: ["Çelik Halat ve Gemi Halatı"], keys: ["celik halat", "gemi halati", "halat kilidi", "kosele"] },
  {
    groups: ["Polyester Halat, Kaldırma ve İndirme Ekipmanları"],
    keys: ["sapan", "caraskal", "vinc", "kaldirma", "spanzet", "mapa", "zincir", "polyester halat"],
  },
  { groups: ["Havalı El Aletleri", "Pnömatik Ürünler (Pakkens)"], keys: ["havali", "pnomatik", "hava tabancasi"] },
  { groups: ["Pnömatik Ürünler (Pakkens)"], keys: ["pakkens", "manometre", "termometre", "kaplin", "hizli kaplin", "rekor", "rakor"] },
  {
    groups: ["Elektrikli El Aletleri"],
    keys: ["matkap", "sarjli", "akulu", "elektrikli", "dekupaj", "kirici", "delici", "bosch", "makita", "spiral", "taslama makinesi"],
  },
  { groups: ["Matkap Ucu, Kılavuz ve Pafta"], keys: ["matkap ucu", "kilavuz", "pafta", "panta", "uc seti"] },
  { groups: ["Vana, Flanş ve Boru Ek Parçaları"], keys: ["vana", "vanalar", "flans", "boru", "borular", "dirsek", "nipel", "manson", "ventil"] },
  { groups: ["Hortum Çeşitleri"], keys: ["hortum"] },
  {
    groups: ["El Aletleri"],
    keys: [
      "el aleti", "el aletleri", "pense", "kerpeten", "tornavida", "anahtar", "lokma", "cekic",
      "tirnak", "yan keski", "keski", "eges", "alyan", "takim seti", "takim cantasi",
    ],
  },
  { groups: ["İzeltaş El Aletleri"], keys: ["izeltas"] },
  {
    groups: ["İş Güvenliği Ekipmanları"],
    keys: [
      "baret", "maske", "toz maskesi", "gozluk", "kulaklik", "kulak tikaci", "emniyet kemeri",
      "parasut tipi", "yuksekte calisma", "is ayakkabisi", "is botu", "reflektor", "yelek",
    ],
  },
  { groups: ["3M Ürünleri"], keys: ["3m"] },
  { groups: ["Ölçü Aletleri"], keys: ["metre", "serit metre", "kumpas", "mikrometre", "su terazisi", "olcu aleti", "olcu aletleri"] },
  { groups: ["Kaynak Makinaları"], keys: ["kaynak makinesi", "kaynak makinasi", "kaynak makinalari", "inverter"] },
  {
    groups: ["Elektrot ve Gazaltı Kaynak Teli Ekipmanları"],
    keys: ["elektrot", "gazalti", "kaynak teli", "kaynak torcu", "torc", "askaynak", "lincoln"],
  },
  { groups: ["Gaz ve Gaz Aletleri"], keys: ["gaz", "tup", "oksijen", "asetilen", "propan", "regulator", "salmastra", "kesme seti"] },
  { groups: ["Testere, Profil Kesme, Karot ve Sarf Malzemeleri"], keys: ["testere", "profil kesme", "karot", "serit testere", "panta testere"] },
  { groups: ["Kesme ve Taşlama Taşları"], keys: ["kesme tasi", "taslama", "tas", "kesme diski", "disk"] },
  { groups: ["Aşındırıcı Ürünler"], keys: ["zimpara", "flap", "asindirici", "fiber disk", "tel firca"] },
  { groups: ["Yıkama ve Yağlama Ekipmanları"], keys: ["yaglama", "gres pompasi", "yag pompasi", "yikama", "basincli yikama", "gresor", "gres"] },
  { groups: ["Kompresör ve Airless Boya Makinası"], keys: ["kompresor", "airless", "boya makinesi", "boya makinasi", "boya tabancasi"] },
  {
    groups: ["Endüstriyel Kimyasallar ve Yapıştırıcılar"],
    keys: ["silikon", "yapistirici", "loctite", "pas sokucu", "pas sokucu sprey", "sizdirmazlik", "epoksi", "macun"],
  },
  { groups: ["Sanayi Bantları ve Ambalaj Ürünleri"], keys: ["bant", "bantlar", "koli bandi", "izole bant", "strec", "ambalaj", "kopuk bant"] },
  { groups: ["Aspiratör, Mengene, İşkence ve Boya Sarf Malzemeleri"], keys: ["aspirator", "mengene", "iskence", "rulo", "firca", "boya firca"] },
  { groups: ["Sanayi Tekerleri"], keys: ["teker", "tekerlek", "sanayi tekeri"] },
  {
    groups: ["Merdiven, İnşaat Makinaları ve İnşaat El Aletleri"],
    keys: ["merdiven", "el arabasi", "betoniyer", "mala", "kurek", "insaat makinesi", "insaat makinasi", "kazma"],
  },
  {
    groups: ["Domak Pompa ve Sufil Ürünleri"],
    keys: ["pompa", "dalgic", "hidrofor", "santrifuj", "domak", "sufil", "su filtresi", "aritma"],
  },
];

/* ── Anahtar eşleştirme (sözlükler için) ──────────────────────────────────── */

const normalizedKeys = new Map<string, string>();
function normKey(key: string): string {
  let n = normalizedKeys.get(key);
  if (n === undefined) {
    n = normalizeText(key);
    normalizedKeys.set(key, n);
  }
  return n;
}

/**
 * Sözlük anahtarı sorguyla eşleşiyor mu?
 * - Öbek ("seviye c"): sorguda kelime başında geçmeli
 * - Tek kelime: birebir; ≥5 harfli anahtarlarda ek almış hâli ("civatalar", "gozlugu"),
 *   yarım yazılmışı ("kaynakc") ve tek harf yazım hatası ("civta"). 3–4 harfli anahtarlar
 *   ("bant", "pul") yalnızca birebir eşleşir ki "bantlı tulum" bant aramasına dönmesin.
 */
function keyMatches(rawKey: string, tokens: readonly string[], paddedQuery: string): boolean {
  const key = normKey(rawKey);
  if (!key) return false;
  if (key.includes(" ")) return paddedQuery.includes(` ${key}`);
  for (const t of tokens) {
    if (t === key) return true;
    if (key.length < 5) continue;
    if (t.length > key.length && t.startsWith(key)) return true;
    // Türkçe ek ve ünsüz yumuşaması: "gozlugu" ~ "gozluk", "kesilmeye" ~ "kesilmez"
    if (t.length >= 5 && commonPrefixLength(t, key) >= key.length - 1) return true;
    if (t.length >= 4 && key.startsWith(t) && t.length >= key.length - 2) return true;
    if (t.length >= 5 && Math.abs(t.length - key.length) <= 1 && levenshtein(t, key) <= 1) return true;
  }
  return false;
}

/* ── Ürün dizini (ilk aramada bir kez kurulur) ────────────────────────────── */

interface IndexedProduct {
  product: ProductGroup;
  /** Model kodu, boşluksuz: "ep1301", "en1501", "t800g", "d20035" */
  codeKey: string;
  /** Tüm kod, boşluksuz: "truflexen1501" */
  codeFull: string;
  title: string[];
  category: string[];
  standards: string[];
  body: string[];
}

let INDEX: IndexedProduct[] | null = null;

const words = (s: string) => normalizeText(s).split(" ").filter(Boolean);

function getIndex(): IndexedProduct[] {
  if (INDEX) return INDEX;
  INDEX = PRODUCT_GROUPS.map((product) => {
    const segments = product.code.split(/\s+/).filter(Boolean);
    const model = [...segments].reverse().find((s) => hasDigit(s)) ?? product.code;
    return {
      product,
      codeKey: compact(model),
      codeFull: compact(product.code),
      title: words(product.title),
      category: words(product.category),
      standards: words((product.standards ?? []).join(" ")),
      body: words([product.description, ...(product.items ?? []), product.applications ?? "", product.sizes].join(" ")),
    };
  });
  return INDEX;
}

/* ── Arama ────────────────────────────────────────────────────────────────── */

export interface SearchMatch {
  product: ProductGroup;
  score: number;
  /** Kısa, kullanıcıya gösterilebilir eşleşme nedenleri (en fazla 2) */
  matchReasons: string[];
}

const REASON = {
  code: "Ürün kodu",
  title: "Ürün adı",
  category: "Kategori",
  standard: "Standart",
  spec: "Teknik özellik",
  fuzzy: "Benzer yazım",
  intent: "İlgili kategori",
} as const;

interface ParsedQuery {
  clean: string;
  padded: string;
  tokens: string[];
  /** Metin eşleştirmede kullanılan kelimeler (tek harfliler hariç, rakam içerenler dahil) */
  significant: string[];
  /** Kod adayları: tüm sorgu + rakamlı kelimeler + "ep"+"1301" gibi bitişik çiftler */
  codeCandidates: { value: string; whole: boolean }[];
}

function parseQuery(rawQuery: string): ParsedQuery | null {
  const clean = normalizeText(rawQuery);
  if (!clean) return null;
  const tokens = clean.split(" ").filter(Boolean);
  const significant = tokens.filter((t) => t.length >= 2 || hasDigit(t));

  const whole = tokens.join("");
  const candidates = new Map<string, boolean>();
  if (whole.length >= 2) candidates.set(whole, true);
  tokens.forEach((t, i) => {
    if (hasDigit(t) && t.length >= 2 && !candidates.has(t)) candidates.set(t, false);
    const next = tokens[i + 1];
    if (next && (hasDigit(t) || hasDigit(next))) {
      const pair = t + next;
      if (!candidates.has(pair)) candidates.set(pair, false);
      const third = tokens[i + 2];
      if (third && third.length <= 2) {
        const triple = pair + third;
        if (!candidates.has(triple)) candidates.set(triple, false);
      }
    }
  });

  return {
    clean,
    padded: ` ${clean} `,
    tokens,
    significant,
    codeCandidates: Array.from(candidates, ([value, isWhole]) => ({ value, whole: isWhole })),
  };
}

/** Kod puanı: birebir 150, önek 100–120, rakam grubu içeriyor 90 */
function scoreCode(entry: IndexedProduct, candidates: ParsedQuery["codeCandidates"]): number {
  let best = 0;
  for (const { value, whole } of candidates) {
    const digits = hasDigit(value);
    // Yalnızca harften oluşan kısa adaylar ("en", "ep") sadece sorgunun tamamıysa kod sayılır
    if (!digits && !whole) continue;
    if (value.length < 2) continue;
    let s = 0;
    if (value === entry.codeKey || value === entry.codeFull) s = 150;
    else if (entry.codeKey.startsWith(value)) s = 100 + Math.round((20 * value.length) / entry.codeKey.length);
    else if (entry.codeFull.startsWith(value) && value.length >= 4) s = 100;
    else if (digits && value.length >= 3 && entry.codeKey.includes(value)) s = 90;
    if (s > best) best = s;
  }
  return best;
}

/** Standart önekleri ("en 388", "iso 21420", "ce"): yalnızca standart alanında aranır. */
const STANDARD_TOKENS = new Set(["en", "iso", "ce"]);

const FIELD_WEIGHTS = {
  title: [0, 14, 26, 30],
  category: [0, 10, 20, 22],
  standards: [0, 0, 22, 26],
  body: [0, 6, 10, 12],
} as const;

/**
 * Toleranslı ürün araması. Sonuçlar puana göre (eşitlikte katalog sırasıyla) döner.
 * Kod ("ep-1301", "EP1301", "1301", "t-800"), ürün adı, kategori, EN standardı,
 * teknik özellik, yazım hatası ve eş anlamlı kelimelerle eşleşir.
 */
export function searchProducts(rawQuery: string): SearchMatch[] {
  const q = parseQuery(rawQuery);
  if (!q) return [];

  const intentCategories = new Set<CategoryName>();
  for (const rule of INTENT_RULES) {
    if (rule.keys.some((k) => keyMatches(k, q.tokens, q.padded))) {
      rule.categories.forEach((c) => intentCategories.add(c));
    }
  }

  const scored: SearchMatch[] = [];

  for (const entry of getIndex()) {
    const reasons = new Set<string>();
    let score = 0;

    const codeScore = scoreCode(entry, q.codeCandidates);
    if (codeScore > 0) {
      score += codeScore;
      reasons.add(REASON.code);
    }

    let matched = 0;
    for (const token of q.significant) {
      const fuzzy = !hasDigit(token);
      const standardOnly = STANDARD_TOKENS.has(token);
      const t = standardOnly ? 0 : bestMatch(token, entry.title, fuzzy);
      const c = standardOnly ? 0 : bestMatch(token, entry.category, fuzzy);
      const s = bestMatch(token, entry.standards, false);
      const b = standardOnly ? 0 : bestMatch(token, entry.body, fuzzy);
      const candidates: [number, string][] = [
        [FIELD_WEIGHTS.title[t], t === 1 ? REASON.fuzzy : REASON.title],
        [FIELD_WEIGHTS.category[c], c === 1 ? REASON.fuzzy : REASON.category],
        [FIELD_WEIGHTS.standards[s], REASON.standard],
        [FIELD_WEIGHTS.body[b], b === 1 ? REASON.fuzzy : REASON.spec],
      ];
      let bestScore = 0;
      let bestReason = "";
      for (const [value, reason] of candidates) {
        if (value > bestScore) {
          bestScore = value;
          bestReason = reason;
        }
      }
      if (bestScore > 0) {
        matched += 1;
        score += bestScore;
        if (codeScore === 0 || bestReason !== REASON.title) reasons.add(bestReason);
      }
    }

    const intentHit = intentCategories.has(entry.product.category);
    if (intentHit) {
      score += 28;
      reasons.add(REASON.intent);
    }

    if (score === 0) continue;

    const total = q.significant.length;
    if (total > 1 && matched === total) score += 25;
    if (codeScore === 0 && total > 0) {
      // Sorgudaki kelimelerin ne kadarı eşleşti? (niyet eşleşmesi kapsamı tamamlar)
      const coverage = Math.min(1, (matched + (intentHit ? 1 : 0)) / total);
      score = Math.round(score * (0.6 + 0.4 * coverage));
    }

    if (score >= 12) {
      scored.push({ product: entry.product, score, matchReasons: Array.from(reasons).slice(0, 2) });
    }
  }

  if (scored.length === 0) return [];
  scored.sort((a, b) => b.score - a.score || a.product.id - b.product.id);

  // Zayıf eşleşmeleri ele: en iyi sonucun %35'inin altında kalanlar gösterilmez
  const cutoff = scored[0].score * 0.35;
  return scored.filter((m) => m.score >= cutoff);
}

/* ── Teknik hırdavat ipucu ────────────────────────────────────────────────── */

export interface HardwareHint {
  /** İlgili teknik hırdavat ürün grupları (en fazla 3, data/company.ts HARDWARE_GROUPS'tan) */
  groups: HardwareGroup[];
  /** Ürün grupları sayfası */
  href: string;
}

/**
 * Sorgu online katalogda olmayan bir teknik hırdavat ürününü (cıvata, halat, pompa…)
 * işaret ediyorsa ilgili grupları döner; aksi hâlde null.
 */
export function getHardwareHint(rawQuery: string): HardwareHint | null {
  const q = parseQuery(rawQuery);
  if (!q) return null;
  const groups: HardwareGroup[] = [];
  for (const rule of HARDWARE_RULES) {
    if (rule.keys.some((k) => keyMatches(k, q.tokens, q.padded))) {
      for (const g of rule.groups) if (!groups.includes(g)) groups.push(g);
    }
  }
  return groups.length > 0 ? { groups: groups.slice(0, 3), href: HARDWARE_GROUPS_HREF } : null;
}

/** Ürün sonuçları + teknik hırdavat ipucu, tek çağrıda. */
export function searchAll(rawQuery: string): { matches: SearchMatch[]; hardware: HardwareHint | null } {
  return { matches: searchProducts(rawQuery), hardware: getHardwareHint(rawQuery) };
}
