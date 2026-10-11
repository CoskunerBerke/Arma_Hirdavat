/* ────────────────────────────────────────────────────────────────────────────
 * Koli / beden yardımcıları (istemci bileşenleri için hafif kopya).
 *
 * parseKoliInfo, data/products.ts → parseKoli ile AYNI kuralı uygular. Burada ayrıca
 * tanımlanmasının nedeni: istemci bileşenleri data/products.ts'i içe aktarırsa 39 ürünün
 * tüm verisi tarayıcı paketine girer. Kural değişirse iki yeri birlikte güncelleyin.
 * ──────────────────────────────────────────────────────────────────────────── */

export interface KoliInfo {
  /** Koli içi adet (ör. 252) */
  perCarton: number;
  /** Küçük harf birim: "çift" | "adet" */
  unit: string;
}

/** "252 Çift" → { perCarton: 252, unit: "çift" }; çözülemezse null. */
export function parseKoliInfo(koli?: string | null): KoliInfo | null {
  if (!koli) return null;
  const m = /^\s*(\d[\d.]*)\s*([A-Za-zÇçĞğİıÖöŞşÜü]+)/.exec(koli);
  if (!m) return null;
  const perCarton = Number(m[1].replace(/\./g, ""));
  if (!Number.isFinite(perCarton) || perCarton <= 0) return null;
  return { perCarton, unit: m[2].toLocaleLowerCase("tr-TR") };
}

/** Koli sayısının karşılığı: 756 (çift/adet). Çözülemezse null. */
export function koliTotal(koli: string | undefined | null, cartons: number): number | null {
  const info = parseKoliInfo(koli);
  if (!info || !Number.isFinite(cartons) || cartons <= 0) return null;
  return info.perCarton * cartons;
}

/** "3 koli = 756 çift" (koli bilgisi yoksa null). */
export function formatKoliConversion(koli: string | undefined | null, cartons: number): string | null {
  const info = parseKoliInfo(koli);
  if (!info || !Number.isFinite(cartons) || cartons <= 0) return null;
  return `${cartons.toLocaleString("tr-TR")} koli = ${(info.perCarton * cartons).toLocaleString("tr-TR")} ${info.unit}`;
}

/**
 * Ürünün `sizes` metnini bedenlere ayırır. Parantez içindeki virgüller bölünmez.
 *  "7, 8, 9, 10, 11"       → ["7", "8", "9", "10", "11"]
 *  "S, M, L, XL, 2XL, 3XL" → ["S", "M", "L", "XL", "2XL", "3XL"]
 *  "10 (Standart)"         → ["10 (Standart)"]  (tek beden)
 */
export function splitSizes(sizes?: string | null): string[] {
  if (!sizes) return [];
  // "Teklifte teyit edilir" gibi açıklamalar beden değildir → beden seçimi sunulmaz.
  if (/teyit|teklif/i.test(sizes) && !/\d/.test(sizes)) return [];
  // Ölçü metni ("Yükseklik 48 cm, uzunluk 42 cm") tek seçenektir; virgülden bölünmez.
  if (isDimensionText(sizes)) return [sizes.replace(/\s*,\s*/g, " · ").trim()];
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < sizes.length; i++) {
    const ch = sizes.charAt(i);
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current);
  const out: string[] = [];
  for (const p of parts) {
    const s = p.trim();
    if (s && out.indexOf(s) === -1) out.push(s);
  }
  return out;
}

/** Ölçü metni mi? (ör. galoş "Yükseklik 48 cm, uzunluk 42 cm") — catalog/productFacts.ts → isDimensionText ile aynı kural. */
export function isDimensionText(sizes?: string | null): boolean {
  return /\d\s*(cm|mm)\b|yükseklik|uzunluk/i.test(sizes ?? "");
}

/** Teklif satırındaki beden notu: "Beden 9" (ölçü metninde "Ölçü: …") */
export function sizeSpec(size: string): string {
  return isDimensionText(size) ? `Ölçü: ${size}` : `Beden ${size}`;
}

/** Teklif satırında beden seçilmeden eklenen ürünün notu */
export const SIZE_UNSPECIFIED = "Beden belirtilmedi";

/** Birim etiketini cümle içi küçük harfe çevirir ("Koli" → "koli"). */
export function unitLower(unit: string): string {
  return unit.toLocaleLowerCase("tr-TR");
}
