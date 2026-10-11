/*
 * Türkiye il sınırları haritası — yalnızca sunucuda (derleme anında) işlenir.
 *
 * KAYNAK VE LİSANS
 * İl yolları npm paketi "turkey-map-react" (v2.0.6) içindeki veri dosyasından alınır:
 *   https://github.com/erdigokce/turkey-map-react
 *   Lisans: MIT — https://github.com/erdigokce/turkey-map-react/blob/master/LICENSE
 *   "Copyright (c) 2020 Erdi Gökçe. Permission is hereby granted, free of charge, to any person obtaining
 *   a copy of this software and associated documentation files (the "Software"), to deal in the Software
 *   without restriction ... The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software." (tam metin: node_modules/turkey-map-react/LICENSE)
 * Sayfada harita altında kısa atıf gösterilir (components/home/DeliveryMapSection.tsx).
 * (İstenen @svg-maps/turkey paketi npm'de bulunmadığı için aynı yapıdaki bu açık lisanslı veri kullanıldı.)
 *
 * Yollar compactPath ile sadeleştirilir (≈1000 birim genişlik; ekranda ≤ 1px fark).
 */
import { cities } from "turkey-map-react/lib/data";

export interface MapProvince {
  id: string;
  name: string;
  plate: number;
  d: string;
  /** Sınır kutusunun merkezi (yaklaşık ağırlık merkezi) */
  cx: number;
  cy: number;
}

export interface TurkeyMapData {
  provinces: MapProvince[];
  viewBox: { x: number; y: number; w: number; h: number };
}

/** Büyük/küçük harf ve Türkçe karakterden bağımsız karşılaştırma anahtarı ("Samsun" → "samsun") */
export function provinceKey(name: string): string {
  return name
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Yolu sadeleştirir: kübik Bézier kontrol noktaları atılır (yalnızca segment uç noktaları kalır; segmentler
 * birkaç birim uzunlukta olduğundan ekranda fark edilmez), koordinatlar tam sayıya yuvarlanır ve göreli
 * "l" komutlarıyla yazılır. Kaynak ~180 KB → ~14 KB (HTML + RSC yükünde iki kez yer aldığı için önemli).
 */
function compactPath(d: string): string {
  const toks = d.match(/[MCLZz]|-?\d+(?:\.\d+)?/g) ?? [];
  const rings: [number, number][][] = [];
  let cur: [number, number][] | null = null;
  let cmd = "";
  let i = 0;
  while (i < toks.length) {
    const t = toks[i];
    if (/^[MCLZz]$/.test(t)) {
      cmd = t;
      i++;
      if ((cmd === "Z" || cmd === "z") && cur) {
        rings.push(cur);
        cur = null;
      }
      continue;
    }
    if (cmd === "M") {
      if (cur) rings.push(cur);
      cur = [[+toks[i], +toks[i + 1]]];
      i += 2;
      cmd = "L";
    } else if (cmd === "L" && cur) {
      cur.push([+toks[i], +toks[i + 1]]);
      i += 2;
    } else if (cmd === "C" && cur) {
      cur.push([+toks[i + 4], +toks[i + 5]]);
      i += 6;
    } else {
      i++;
    }
  }
  if (cur) rings.push(cur);

  let out = "";
  for (const ring of rings) {
    const pts = ring.map(([x, y]) => [Math.round(x), Math.round(y)] as const);
    const uniq = pts.filter((p, k) => k === 0 || p[0] !== pts[k - 1][0] || p[1] !== pts[k - 1][1]);
    if (uniq.length < 3) continue;
    let [px, py] = uniq[0];
    let rel = "";
    for (let k = 1; k < uniq.length; k++) {
      const [x, y] = uniq[k];
      const dx = x - px;
      const dy = y - py;
      rel += `${dx < 0 ? "" : " "}${dx}${dy < 0 ? "" : " "}${dy}`;
      px = x;
      py = y;
    }
    out += `M${uniq[0][0]} ${uniq[0][1]}l${rel.trim()}z`;
  }
  return out;
}

let cache: TurkeyMapData | null = null;

export function getTurkeyMap(): TurkeyMapData {
  if (cache) return cache;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const provinces: MapProvince[] = cities.map((c) => {
    const nums = (c.path.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = nums[i];
      const y = nums[i + 1];
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    minX = Math.min(minX, x0);
    minY = Math.min(minY, y0);
    maxX = Math.max(maxX, x1);
    maxY = Math.max(maxY, y1);
    return {
      id: c.id,
      name: c.name,
      plate: c.plateNumber,
      d: compactPath(c.path),
      cx: Math.round((x0 + x1) / 2),
      cy: Math.round((y0 + y1) / 2),
    };
  });

  const pad = 8;
  cache = {
    provinces,
    viewBox: {
      x: Math.floor(minX - pad),
      y: Math.floor(minY - pad),
      w: Math.ceil(maxX - minX + pad * 2),
      h: Math.ceil(maxY - minY + pad * 2),
    },
  };
  return cache;
}
