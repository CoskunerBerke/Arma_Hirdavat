/* ────────────────────────────────────────────────────────────────────────────
 * Standart kodu çözümleyicileri — ürünlerin `standards[]` metninden EN 388 / EN 407 /
 * EN 12477 / kimyasal tip bilgisini okur. Rehber tabloları bu fonksiyonlarla CANLI üretilir;
 * ürün verisi düzeltildiğinde rehberler kendiliğinden güncellenir.
 * Çözülemeyen bilgi için null döner (tablo o hücreyi "belirtilmemiş" gösterir, uydurmaz).
 * ──────────────────────────────────────────────────────────────────────────── */

import type { ProductGroup } from "@/data/products";

/* ── EN 388 ─────────────────────────────────────────────────────────────── */

export interface En388Code {
  /** Normalleştirilmiş kod, ör. "4X43C" veya "3121A" */
  code: string;
  abrasion: string;
  cut: string;
  tear: string;
  puncture: string;
  /** TDM kesilme harfi (A–F), "X" ya da kodda yoksa null */
  tdm: string | null;
  /** Darbe koruması (P) */
  impact: boolean;
}

const EN388_PAREN = /EN\s*388\b[^()]*\(\s*([0-4X])\s*([0-5X])\s*([0-4X])\s*([0-4X])\s*([A-FX])?\s*(P)?\s*\)/i;

export function parseEn388(p: Pick<ProductGroup, "standards">): En388Code | null {
  for (const s of p.standards ?? []) {
    const m = EN388_PAREN.exec(s);
    if (!m) continue;
    const [, a, c, t, pu, tdm, impact] = m.map((x) => (typeof x === "string" ? x.toUpperCase() : x));
    return {
      code: `${a}${c}${t}${pu}${tdm ?? ""}${impact ?? ""}`,
      abrasion: a,
      cut: c,
      tear: t,
      puncture: pu,
      tdm: tdm ?? null,
      impact: Boolean(impact),
    };
  }
  return null;
}

/** TDM harfi → asgari kesme kuvveti (EN ISO 13997) */
export const TDM_THRESHOLDS: Record<string, string> = {
  A: "≥ 2 N",
  B: "≥ 5 N",
  C: "≥ 10 N",
  D: "≥ 15 N",
  E: "≥ 22 N",
  F: "≥ 30 N",
};

/** "3" → "Seviye 3 / 4"; "X" → test edilmedi; "0" → asgari altında */
export function describeLevel(level: string, max: number): string {
  if (level === "X") return "Test edilmedi veya uygulanamadı (X)";
  if (level === "0") return "Asgari seviyenin altında (0)";
  return `Seviye ${level} / ${max}`;
}

export function describeTdm(tdm: string | null): string {
  if (!tdm) return "Kodda yer almıyor";
  if (tdm === "X") return "Test edilmedi (X)";
  const t = TDM_THRESHOLDS[tdm];
  return t ? `Seviye ${tdm} (${t})` : tdm;
}

/* ── EN 407 ─────────────────────────────────────────────────────────────── */

export interface En407Code {
  code: string;
  /** 6 hane: yanma, temas, konvektif, radyan, küçük sıçrama, büyük erimiş metal */
  digits: [string, string, string, string, string, string];
}

const EN407_PAREN = /EN\s*407\b[^()]*\(\s*([0-4X])([0-4X])([0-4X])([0-4X])([0-4X])([0-4X])\s*\)/i;

export function parseEn407(p: Pick<ProductGroup, "standards">): En407Code | null {
  for (const s of p.standards ?? []) {
    const m = EN407_PAREN.exec(s);
    if (!m) continue;
    const d = m.slice(1, 7).map((x) => x.toUpperCase()) as En407Code["digits"];
    return { code: d.join(""), digits: d };
  }
  return null;
}

export const EN407_LABELS = [
  "Yanma davranışı",
  "Temas ısısı",
  "Konvektif ısı",
  "Radyan ısı",
  "Küçük erimiş metal sıçramaları",
  "Büyük miktarda erimiş metal",
] as const;

/* ── EN 12477 ───────────────────────────────────────────────────────────── */

/** "EN 12477 Tip A" / "EN 12477:2001+A1:2005 Type B" → "A" | "B" */
export function parseEn12477Type(p: Pick<ProductGroup, "standards">): "A" | "B" | null {
  for (const s of p.standards ?? []) {
    if (!/EN\s*12477/i.test(s)) continue;
    const m = /(?:Tip|Type)[\s-]*([AB])\b/i.exec(s);
    if (m) return m[1].toUpperCase() as "A" | "B";
  }
  return null;
}

/* ── Kimyasal koruyucu giysi tipleri ────────────────────────────────────── */

export interface ChemProtection {
  /** Tam vücut tipleri, ör. ["3B", "4B", "5B", "6B"] veya ["5", "6"] */
  fullBody: string[];
  /** Kısmi vücut tipleri, ör. ["PB3-B", "PB4-B"] */
  partialBody: string[];
  /** EN 14126 (enfektif ajanlar) */
  infective: boolean;
  /** EN 1149-5 (antistatik) */
  antistatic: boolean;
  /** EN 1073-2 (radyoaktif partikül) */
  radioactive: boolean;
  /** Tip beyanı yoksa ürünün ilgili standartları (ör. "EN 13034", "EN ISO 13688") */
  otherStandards: string[];
}

const TYPE_GROUP = /(?:Type|Tip)\s*((?:PB\s*)?\(?\[?\s*[1-6]\s*\]?\)?(?:\s*-?\s*B\b)?(?:\s*\/\s*(?:PB\s*)?\(?\[?\s*[1-6]\s*\]?\)?(?:\s*-?\s*B\b)?)*)/gi;
const TYPE_TOKEN = /^(PB)?\s*\(?\[?\s*([1-6])\s*\]?\)?\s*-?\s*(B)?$/i;

function addUnique(list: string[], v: string) {
  if (!list.includes(v)) list.push(v);
}

export function parseChemProtection(p: Pick<ProductGroup, "standards">): ChemProtection {
  const out: ChemProtection = {
    fullBody: [],
    partialBody: [],
    infective: false,
    antistatic: false,
    radioactive: false,
    otherStandards: [],
  };
  for (const raw of p.standards ?? []) {
    const s = raw.trim();
    if (/14126/.test(s)) out.infective = true;
    if (/1149-5/.test(s)) out.antistatic = true;
    if (/1073-2/.test(s)) out.radioactive = true;

    let foundType = false;
    const re = new RegExp(TYPE_GROUP.source, "gi");
    let m: RegExpExecArray | null;
    while ((m = re.exec(s)) !== null) {
      for (const part of m[1].split("/")) {
        const t = TYPE_TOKEN.exec(part.trim());
        if (!t) continue;
        foundType = true;
        const [, pb, n, b] = t;
        if (b) out.infective = true;
        if (pb) addUnique(out.partialBody, `PB${n}${b ? "-B" : ""}`);
        else addUnique(out.fullBody, `${n}${b ? "B" : ""}`);
      }
    }
    if (!foundType) {
      const std = /EN\s*(?:ISO\s*)?(13034|14605|13982-1|13688)/i.exec(s);
      if (std) addUnique(out.otherStandards, std[0].replace(/\s+/g, " ").toUpperCase());
    }
  }
  const order = (a: string, b: string) => a.localeCompare(b, "tr", { numeric: true });
  out.fullBody.sort(order);
  out.partialBody.sort(order);
  return out;
}

/* ── Beden ──────────────────────────────────────────────────────────────── */

/** "7, 8, 9, 10, 11" → ["7","8","9","10","11"]; numara içermeyen beden metni için [] */
export function parseNumericSizes(sizes: string): string[] {
  const parts = sizes
    .split(/[,;/]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return [];
  if (!parts.every((s) => /^\d{1,2}$/.test(s))) return [];
  return parts;
}

/** "7, 8, 9, 10, 11" → "7–11"; ardışık değilse olduğu gibi */
export function formatSizeRange(sizes: string): string {
  const nums = parseNumericSizes(sizes).map(Number);
  if (nums.length >= 3 && nums.every((n, i) => i === 0 || n === nums[i - 1] + 1)) {
    return `${nums[0]}–${nums[nums.length - 1]}`;
  }
  return sizes;
}
