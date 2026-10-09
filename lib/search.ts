import { PRODUCT_GROUPS, type ProductGroup } from "@/data/products";

/**
 * Türkçe karakter normalizasyonu:
 * ç -> c, ğ -> g, ı, i, İ, I -> i, ö -> o, ş -> s, ü -> u
 * Noktalama ve tireleri kaldırır.
 */
export function normalizeText(str: string): string {
  if (!str) return "";
  const trMap: Record<string, string> = {
    ç: "c", Ç: "c",
    ğ: "g", Ğ: "g",
    ı: "i", I: "i", İ: "i", i: "i",
    ö: "o", Ö: "o",
    ş: "s", Ş: "s",
    ü: "u", Ü: "u",
  };

  return str
    .split("")
    .map((c) => trMap[c] ?? c.toLowerCase())
    .join("")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Levenshtein mesafe hesaplama (Yazım hatalarını tolere etmek için)
 */
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Sektörel / B2B Arama Niyet Eşleşmeleri (Semantic Intent Dictionary)
 * Müşteri tam adı bilmediğinde ("bıçak tutma", "yağlı parça", "asit tulumu") doğru ürünü getirir.
 */
const INTENT_DICTIONARY: Record<string, string[]> = {
  // Kesilmez eldivenler
  kesilme: ["ek-5000", "ek-5001", "kesilmeye", "trucut", "seviye d", "cam", "sac", "metal"],
  kesilmez: ["ek-5000", "ek-5001", "kesilmeye", "trucut", "seviye d"],
  bicak: ["ek-5000", "ek-5001", "kesilmeye", "trucut"],
  jilet: ["ek-5000", "ek-5001", "kesilmeye"],
  cam: ["ek-5000", "ek-5001", "trucut"],

  // Kaynak eldivenleri
  kaynak: ["zevahir", "ek-3000", "ek-3001", "isi", "haddehane", "argon", "gazalti"],
  kaynakci: ["zevahir", "ek-3000", "ek-3001"],
  isi: ["zevahir", "ek-3000", "ek-3001"],
  ates: ["zevahir", "ek-3000"],
  sicak: ["zevahir", "ek-3000"],

  // Nitril / İşçi eldivenleri
  nitril: ["ep-1301", "ep-1302", "ep-1303", "en-1501", "en-1502"],
  yag: ["ep-1301", "ep-1302", "ep-1303", "nitril", "en-1501"],
  yagli: ["ep-1301", "ep-1302", "ep-1303", "nitril", "en-1501"],
  gres: ["ep-1301", "ep-1302", "ep-1303"],
  sari: ["ep-1301", "ep-1302"],
  mavi: ["ep-1303", "en-1502"],

  // Köpük nitril & hassas montaj
  kopuk: ["en-1501", "en-1502", "truflex", "mikro"],
  hassas: ["en-1501", "en-1502", "truflex", "montaj"],
  montaj: ["en-1501", "en-1502", "truflex", "ep-1301"],
  nefes: ["en-1501", "en-1502", "truflex"],

  // Deri / Sürücü
  deri: ["ed-1000", "zevahir", "keci", "cilt"],
  sofor: ["ed-1000", "surucu", "direksiyon"],
  surucu: ["ed-1000", "cilt", "keci"],
  keci: ["ed-1000", "cilt"],

  // Kimyasal tulumlar
  tulum: ["t-800", "t-630", "t-530", "truchem", "kimyasal", "lamineli"],
  kimyasal: ["t-800", "t-630", "truchem", "asit"],
  asit: ["t-800", "truchem", "tip 3b", "tip 4b"],
  boya: ["t-630", "t-530", "lamineli", "sprey"],
  zehir: ["t-800", "t-630", "truchem"],
  biyolojik: ["t-800", "t-630", "en 14126"],
  asbest: ["t-630", "t-530"],
  lamineli: ["t-630", "t-530", "lk-530", "ag-530", "lb-530"],

  // Hijyen, Kolluk, Galoş
  kolluk: ["lk-530", "truchem", "lamineli"],
  galos: ["ag-530", "bg-530", "bg-630"],
  bot: ["bg-530", "bg-630"],
  bone: ["lb-530", "baslik"],
  baslik: ["lb-530"],
  onluk: ["onluk", "laboratuvar"],
};

export interface SearchMatch {
  product: ProductGroup;
  score: number;
  matchReasons: string[];
}

/**
 * Akıllı Toleranslı / Benzerlik Tabanlı Ürün Arama Fonksiyonu
 */
export function searchProducts(rawQuery: string): SearchMatch[] {
  const cleanQ = normalizeText(rawQuery);
  if (!cleanQ) return [];

  const queryTokens = cleanQ.split(" ").filter((t) => t.length > 0);
  if (queryTokens.length === 0) return [];

  // Sorgu tokenlerinin intent karşılıklarını topla
  const intentKeywords: string[] = [];
  queryTokens.forEach((token) => {
    Object.entries(INTENT_DICTIONARY).forEach(([key, values]) => {
      if (token.includes(key) || key.includes(token) || levenshtein(token, key) <= 1) {
        intentKeywords.push(...values);
      }
    });
  });

  const results: SearchMatch[] = [];

  for (const product of PRODUCT_GROUPS) {
    let score = 0;
    const matchReasons: string[] = [];

    const normCode = normalizeText(product.code);
    const normTitle = normalizeText(product.title);
    const normCategory = normalizeText(product.category);
    const normDesc = normalizeText(product.description);
    const normStandards = (product.standards || []).map(normalizeText).join(" ");
    const normItems = (product.items || []).map(normalizeText).join(" ");
    const normApps = normalizeText(product.applications || "");
    const normBadge = normalizeText(product.badge || "");

    const allProductText = `${normCode} ${normTitle} ${normCategory} ${normDesc} ${normStandards} ${normItems} ${normApps} ${normBadge}`;
    const allWords = allProductText.split(" ");

    // 1. Kod Birebir / Başlangıç Eşleşmesi (En Yüksek Öncelik)
    const rawNoDashCode = normCode.replace(/\s+/g, "");
    const rawNoDashQuery = cleanQ.replace(/\s+/g, "");
    if (rawNoDashCode.includes(rawNoDashQuery) || rawNoDashQuery.includes(rawNoDashCode)) {
      score += 120;
      matchReasons.push("Ürün Kodu Eşleşmesi");
    }

    // 2. Başlıkta Tam Eşleşme
    if (normTitle.includes(cleanQ)) {
      score += 80;
      matchReasons.push("Başlık Eşleşmesi");
    }

    // 3. Token Bazlı İnceleme
    let matchedTokenCount = 0;
    for (const token of queryTokens) {
      let tokenMatched = false;

      // Kategori kontrolü
      if (normCategory.includes(token)) {
        score += 35;
        tokenMatched = true;
        if (!matchReasons.includes("Kategori")) matchReasons.push("Kategori");
      }

      // Standart kontrolü (örn: 388, 374, 14126, Type 3)
      if (normStandards.includes(token)) {
        score += 45;
        tokenMatched = true;
        if (!matchReasons.includes("Teknik Standart")) matchReasons.push("Teknik Standart");
      }

      // Başlık veya açıklama içinde kelime eşleşmesi
      if (normTitle.includes(token)) {
        score += 30;
        tokenMatched = true;
      } else if (normDesc.includes(token) || normItems.includes(token) || normApps.includes(token)) {
        score += 15;
        tokenMatched = true;
        if (!matchReasons.includes("Teknik Özellik")) matchReasons.push("Teknik Özellik");
      }

      // 4. Toleranslı / Fuzzy Eşleşme (Yazım Hatası Tolere Etme)
      if (!tokenMatched && token.length >= 3) {
        for (const word of allWords) {
          if (word.length >= 3) {
            const dist = levenshtein(token, word);
            const maxAllowedDist = token.length <= 4 ? 1 : 2;
            if (dist <= maxAllowedDist) {
              score += 25 - dist * 5;
              tokenMatched = true;
              if (!matchReasons.includes("Benzer Kelime")) matchReasons.push(`Benzer: ${word}`);
              break;
            }
          }
        }
      }

      if (tokenMatched) matchedTokenCount++;
    }

    // 5. Niyet / İlgili Sektörel Anlam Eşleşmesi (Semantic Intent)
    for (const kw of intentKeywords) {
      if (normCode.includes(kw) || normTitle.includes(kw) || normCategory.includes(kw)) {
        score += 30;
        if (!matchReasons.includes("Kullanım Amacı")) matchReasons.push("Kullanım Amacı");
        break;
      }
    }

    // Eğer çok kelimeli bir aramaysa ve tüm kelimeler eşleştiyse bonus puan
    if (matchedTokenCount === queryTokens.length && queryTokens.length > 1) {
      score += 40;
    }

    if (score > 15) {
      results.push({
        product,
        score,
        matchReasons: matchReasons.slice(0, 3),
      });
    }
  }

  // En yüksek skora göre sırala
  return results.sort((a, b) => b.score - a.score);
}
