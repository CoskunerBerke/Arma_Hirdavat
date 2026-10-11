/* ────────────────────────────────────────────────────────────────────────────
 * STANDARTLARIN SADE TÜRKÇE AÇIKLAMASI
 * Standart metni data/products.ts'de nasıl yazıyorsa öyle gösterilir; burada yalnızca
 * normun ne anlama geldiği (genel tanım) ve varsa performans kodunun basamak basamak
 * okunuşu üretilir. Ürüne özel yeni iddia üretilmez.
 * ──────────────────────────────────────────────────────────────────────────── */

import { GUIDES, type GuideLink } from "./guides";
import { en12477Type, en388Code, en407Code, parseTypeTokens, type TypeToken } from "./productFacts";

export interface StandardLevel {
  label: string;
  value: string;
}

export interface StandardExplanation {
  /** Veride yazıldığı gibi */
  raw: string;
  /** Sade Türkçe açıklama (bilinmeyen normda boş) */
  meaning: string;
  /** Performans kodunun basamak basamak okunuşu (EN 388, EN 407) */
  levels?: StandardLevel[];
  guide?: GuideLink;
}

function level(value: string, max: number): string {
  const v = value.toUpperCase();
  if (v === "X") return "X (test edilmedi veya uygulanamaz)";
  if (v === "0") return `0 / ${max} (en düşük seviyenin altında)`;
  return `${v} / ${max}`;
}

function decodeEn388(code: string): StandardLevel[] {
  const c = code.toUpperCase();
  const rows: StandardLevel[] = [
    { label: "Aşınma direnci", value: level(c[0], 4) },
    { label: "Kesilme direnci (Coupe testi)", value: level(c[1], 5) },
    { label: "Yırtılma direnci", value: level(c[2], 4) },
    { label: "Delinme direnci", value: level(c[3], 4) },
  ];
  if (c[4]) {
    rows.push({
      label: "Kesilme direnci (EN ISO 13997, TDM)",
      value: c[4] === "X" ? "X (test edilmedi veya uygulanamaz)" : `${c[4]} (A–F ölçeğinde, F en yüksek)`,
    });
  }
  if (c[5] === "P") rows.push({ label: "Darbe koruması", value: "P (darbe testini geçti)" });
  return rows;
}

function decodeEn407(code: string): StandardLevel[] {
  const c = code.toUpperCase();
  const labels = [
    "Yanma davranışı (alev)",
    "Temas ısısı",
    "Konvektif ısı",
    "Radyan ısı",
    "Küçük erimiş metal sıçraması",
    "Büyük miktarda erimiş metal",
  ];
  return labels.map((label, i) => ({ label, value: level(c[i] ?? "X", 4) }));
}

const TYPE_MEANING: Record<number, string> = {
  3: "Tip 3: basınçlı sıvı jetlerine karşı sıvı sızdırmaz koruma (EN 14605)",
  4: "Tip 4: sıvı spreylerine (püskürtme) karşı sızdırmaz koruma (EN 14605)",
  5: "Tip 5: havada asılı tehlikeli kuru partiküllere, toz ve life karşı koruma (EN ISO 13982-1)",
  6: "Tip 6: hafif sıvı sıçramalarına ve serpintiye karşı sınırlı koruma (EN 13034)",
};

function explainTypes(tokens: TypeToken[]): string {
  const parts: string[] = [];
  const pb = tokens.some((t) => t.pb);
  const bio = tokens.some((t) => t.bio);
  if (pb) parts.push("PB: kısmi vücut koruması; yalnızca ürünün örttüğü bölgeyi (kol, ayak, gövde önü gibi) korur.");
  const seen = new Set<number>();
  for (const t of tokens) {
    if (seen.has(t.n) || !TYPE_MEANING[t.n]) continue;
    seen.add(t.n);
    parts.push(`${TYPE_MEANING[t.n]}.`);
  }
  if (bio) parts.push("B eki: EN 14126'ya göre biyolojik ajanlara karşı da test edildiğini gösterir.");
  return parts.join(" ");
}

export function explainStandard(raw: string): StandardExplanation {
  const s = raw.trim();

  if (/oeko-?tex/i.test(s)) {
    return {
      raw,
      meaning: "Tekstil ürününün insan sağlığına zararlı maddeler açısından bağımsız laboratuvarda test edildiğini gösteren etiket.",
    };
  }

  if (/^CE\b/i.test(s) || /2016\s*\/\s*425/.test(s)) {
    if (/kategori\s*III\b/i.test(s)) {
      return {
        raw,
        meaning:
          "KKD Yönetmeliği Kategori III: ciddi ve kalıcı sağlık sonuçları doğurabilecek riskler (ör. tehlikeli kimyasallar) için; ürün onaylanmış kuruluş denetimine tabidir.",
      };
    }
    if (/kategori\s*II\b/i.test(s)) {
      return {
        raw,
        meaning:
          "KKD Yönetmeliği Kategori II: orta düzey riskler (ör. mekanik riskler) için; ürün onaylanmış kuruluşun AB tip incelemesinden geçmiştir.",
      };
    }
    if (/kategori\s*I\b/i.test(s)) {
      return { raw, meaning: "KKD Yönetmeliği Kategori I: yalnızca minimal riskler (hafif kir, toz, hijyen) için." };
    }
    return { raw, meaning: "Kişisel Koruyucu Donanım Yönetmeliği'ne uygunluk; ürün CE işaretlidir." };
  }

  const code388 = en388Code(s);
  if (/EN\s*388/i.test(s)) {
    return {
      raw,
      meaning: "Mekanik riskler: aşınma, kesilme, yırtılma ve delinme dayanımı.",
      levels: code388 ? decodeEn388(code388) : undefined,
      guide: GUIDES.en388,
    };
  }

  if (/EN\s*407/i.test(s)) {
    const code407 = en407Code(s);
    return {
      raw,
      meaning: "Isı ve alev riskleri: alev, temas ısısı, konvektif ve radyan ısı, erimiş metal sıçraması.",
      levels: code407 ? decodeEn407(code407) : undefined,
      // Rehber bağlantısı yok: EN 407 nitril eldivenlerde de var; kaynak rehberi EN 12477 satırından verilir.
    };
  }

  if (/EN\s*12477/i.test(s)) {
    const t = en12477Type(s);
    const typeText =
      t === "A"
        ? " Tip A: ısıya ve erimiş metal sıçramasına karşı daha yüksek dayanım; elektrot ve gazaltı (MIG/MAG) kaynağı için."
        : t === "B"
          ? " Tip B: daha yüksek el becerisi ve parmak hassasiyeti; TIG (argon) kaynağı için."
          : "";
    return { raw, meaning: `Kaynakçı eldivenleri standardı.${typeText}`, guide: GUIDES.kaynak };
  }

  if (/EN\s*ISO\s*21420/i.test(s)) {
    return { raw, meaning: "Koruyucu eldivenler için genel gereklilikler: zararsızlık, beden, el becerisi ve işaretleme." };
  }

  if (/EN\s*340\b/i.test(s)) {
    return { raw, meaning: "Koruyucu giysiler için genel gereklilikler (eski standart; yerini EN ISO 13688 almıştır)." };
  }

  if (/EN\s*ISO\s*13688/i.test(s)) {
    return { raw, meaning: "Koruyucu giysiler için genel gereklilikler: ergonomi, zararsızlık, beden ve işaretleme." };
  }

  const types = parseTypeTokens(s);
  if (types.length) {
    return { raw, meaning: explainTypes(types), guide: GUIDES.kimyasalTipler };
  }

  if (/EN\s*14126/i.test(s)) {
    return {
      raw,
      meaning: "Enfektif (biyolojik) ajanlara karşı koruyucu giysi: kumaşın bakteri ve virüs gibi mikroorganizmalara karşı test edilmesi.",
      guide: GUIDES.kimyasalTipler,
    };
  }

  if (/EN\s*1149-5/i.test(s)) {
    return { raw, meaning: "Antistatik giysi: kumaşın elektrostatik yük birikimini azaltma özelliği." };
  }

  if (/EN\s*1073-2/i.test(s)) {
    return {
      raw,
      meaning: "Radyoaktif partikül kontaminasyonuna karşı koruyucu giysi. Radyasyonun kendisine (iyonlaştırıcı ışınım) karşı koruma sağlamaz.",
    };
  }

  if (/EN\s*14605/i.test(s)) {
    return { raw, meaning: "Sıvı kimyasallara karşı koruyucu giysi: Tip 3 (sıvı jeti) ve Tip 4 (sprey).", guide: GUIDES.kimyasalTipler };
  }

  if (/EN\s*(ISO\s*)?13034/i.test(s)) {
    return {
      raw,
      meaning: "Sıvı kimyasallara karşı sınırlı koruma (Tip 6 / PB 6): hafif sıçrama ve serpinti.",
      guide: GUIDES.kimyasalTipler,
    };
  }

  if (/EN\s*ISO\s*13982/i.test(s)) {
    return { raw, meaning: "Tehlikeli kuru partiküllere karşı koruyucu giysi (Tip 5).", guide: GUIDES.kimyasalTipler };
  }

  return { raw, meaning: "" };
}
