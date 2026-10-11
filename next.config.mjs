/* ────────────────────────────────────────────────────────────────────────────
 * Next.js yapılandırması
 *
 * İNDEKSLEME: data/company.ts → IS_INDEXABLE ile aynı mantık (TS dosyası buradan içe
 * aktarılamadığı için kopyalandı; birini değiştirirseniz diğerini de güncelleyin).
 * Production dışındaki her derlemede (Vercel preview, localhost) tüm sayfalara
 * "X-Robots-Tag: noindex" eklenir. robots.txt engellemez ki Google noindex'i görebilsin.
 *
 * ÖNBELLEK: /videos ve /images 1 yıl "immutable" önbelleklenir. Bu klasörlerdeki bir dosyayı
 * DEĞİŞTİRİRKEN aynı adı kullanmayın; yeni ad verin (ör. hero-drone-v2.mp4) ve referansı güncelleyin.
 * ──────────────────────────────────────────────────────────────────────────── */

import { readFileSync } from "node:fs";

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;
const PRODUCTION_HOST = (
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  ""
)
  .replace(/^https?:\/\//, "")
  .replace(/\/+$/, "");

const IS_INDEXABLE = VERCEL_ENV === "production" || (!VERCEL_ENV && Boolean(process.env.NEXT_PUBLIC_SITE_URL));

/** Production'da özel alan adı tanımlıysa *.vercel.app adreslerini ona yönlendir. */
const REDIRECT_VERCEL_HOST =
  VERCEL_ENV === "production" &&
  PRODUCTION_HOST !== "" &&
  !PRODUCTION_HOST.endsWith(".vercel.app") &&
  process.env.DISABLE_VERCEL_HOST_REDIRECT !== "1";

/* ────────────────────────────────────────────────────────────────────────────
 * ESKİ ÜRÜN ADRESLERİ → YENİ ADRES (308)
 * data/legacy-slugs.ts (id → eski slug) ve data/products.ts (id → title) metin olarak okunur;
 * yeni slug, products.ts'teki slugify(title) ile AYNI kuralla üretilir. Böylece başlık
 * değişse bile eski adresler her derlemede güncel adrese yönlenir.
 * Ayrıştırma başarısız olursa derleme durmaz, yalnızca uyarı yazılır.
 * ──────────────────────────────────────────────────────────────────────────── */

/** data/products.ts → slugify ile birebir aynı olmalı. */
function slugify(input) {
  const map = { ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", I: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u" };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function legacyProductRedirects() {
  try {
    const productsSrc = readFileSync(new URL("./data/products.ts", import.meta.url), "utf8");
    const legacySrc = readFileSync(new URL("./data/legacy-slugs.ts", import.meta.url), "utf8");

    // id → güncel slug (her "id" bloğundaki ilk "title")
    const current = new Map();
    const idRe = /(?:"id"|\bid)\s*:\s*(\d+)\s*,/g;
    const ids = Array.from(productsSrc.matchAll(idRe));
    ids.forEach((m, i) => {
      const chunk = productsSrc.slice(m.index, i + 1 < ids.length ? ids[i + 1].index : undefined);
      const t = /(?:"title"|\btitle)\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(chunk);
      if (t) current.set(Number(m[1]), slugify(JSON.parse(`"${t[1]}"`)));
    });

    // id → eski slug(lar)
    const legacy = [];
    for (const m of legacySrc.matchAll(/^\s*(\d+)\s*:\s*"([a-z0-9-]+)"/gm)) legacy.push([Number(m[1]), m[2]]);
    for (const m of legacySrc.matchAll(/^\s*(\d+)\s*:\s*\[([^\]]*)\]/gm)) {
      for (const s of m[2].matchAll(/"([a-z0-9-]+)"/g)) legacy.push([Number(m[1]), s[1]]);
    }

    const currentSlugs = new Set(current.values());
    const seen = new Set();
    const rules = [];
    for (const [id, oldSlug] of legacy) {
      const next = current.get(id);
      if (!next || next === oldSlug || currentSlugs.has(oldSlug) || seen.has(oldSlug)) continue;
      seen.add(oldSlug);
      rules.push({ source: `/urunler/${oldSlug}`, destination: `/urunler/${next}`, permanent: true });
    }
    if (legacy.length > 0 && rules.length === 0) {
      console.warn("[next.config] Eski ürün adresi yönlendirmesi üretilemedi (products.ts biçimi değişmiş olabilir).");
    }
    return rules;
  } catch (err) {
    console.warn("[next.config] Eski ürün adresleri okunamadı:", err instanceof Error ? err.message : err);
    return [];
  }
}

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },

  async headers() {
    const rules = [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Katalog dosyası aynı adla güncellenebilir → 1 gün. Üreticinin (FABA) kendi PDF'inin
        // kopyası olduğu için arama sonuçlarında /katalog sayfası öne çıksın diye noindex.
        source: "/catalogs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];

    if (!IS_INDEXABLE) {
      rules.push({ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] });
    }

    return rules;
  },

  async redirects() {
    const rules = [
      // Eski klasik ASP sitesinin adresleri (armahirdavat.com.tr)
      { source: "/default.asp", destination: "/", permanent: true },
      { source: "/arma-hakkinda.asp", destination: "/kurumsal", permanent: true },
      { source: "/arma-iletisim.asp", destination: "/iletisim", permanent: true },
      { source: "/arma-markalar.asp", destination: "/markalar", permanent: true },
      { source: "/arma-urun-gruplari.asp", destination: "/urun-gruplari", permanent: true },
      // İlk yayındaki (kod tekrarlı) ürün adresleri
      ...legacyProductRedirects(),
    ];

    if (REDIRECT_VERCEL_HOST) {
      rules.push({
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.+)\\.vercel\\.app" }],
        destination: `https://${PRODUCTION_HOST}/:path*`,
        permanent: true,
      });
    }

    return rules;
  },
};

export default nextConfig;
