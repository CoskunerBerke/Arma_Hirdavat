import { HARDWARE_GROUPS } from "@/data/company";
import type { NavCategory, NavMenuItem } from "./types";

/** Ürünler menü öğesinin adresi. */
export const PRODUCTS_HREF = "/urunler";

/** Menü öğesi bu sayfada mı? Ürünler öğesi kategori sayfalarında da etkindir. */
export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === PRODUCTS_HREF) {
    return pathname === PRODUCTS_HREF || pathname.startsWith(`${PRODUCTS_HREF}/`) || pathname.startsWith("/kategori/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Ana menü öğesi (alt sayfalarıyla birlikte) bu sayfada mı? */
export function isMenuItemActive(pathname: string, item: Pick<NavMenuItem, "match">): boolean {
  return item.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Kurumsal düzendeki ana menü: Kurumsal · Ürünler · Hizmetler · Rehberler · İletişim.
 * Kategori adları ve sayıları sunucuda (components/Header.tsx) veriden üretilip buraya gelir.
 */
export function buildMainMenu(categories: NavCategory[], totalProducts: number): NavMenuItem[] {
  return [
    {
      label: "Kurumsal",
      href: "/kurumsal",
      match: ["/kurumsal", "/markalar", "/katalog"],
      panel: "list",
      children: [
        { label: "Hakkımızda", href: "/kurumsal" },
        { label: "Referanslarımız", href: "/#referanslar" },
        { label: "Markalar", href: "/markalar" },
        { label: "Katalog", href: "/katalog" },
      ],
    },
    {
      label: "Ürünler",
      href: PRODUCTS_HREF,
      match: [PRODUCTS_HREF, "/kategori", "/urun-gruplari"],
      panel: "products",
      children: [
        ...categories.map((c) => ({ label: c.name, href: c.href, hint: `${c.count} ürün` })),
        { label: `Tüm ürünler (${totalProducts})`, href: PRODUCTS_HREF, strong: true },
        { label: `Teknik hırdavat (${HARDWARE_GROUPS.length} grup)`, href: "/urun-gruplari", strong: true },
      ],
    },
    {
      label: "Hizmetler",
      href: "/#hizmetler",
      match: [],
      panel: "list",
      children: [
        { label: "Hizmetlerimiz", href: "/#hizmetler" },
        { label: "Toptan satış (koli & palet)", href: PRODUCTS_HREF },
        { label: "81 ile teslimat", href: "/#teslimat" },
        { label: "Teknik hırdavat tedariki", href: "/urun-gruplari" },
        { label: "Ürün belgeleri ve katalog", href: "/katalog" },
      ],
    },
    { label: "Rehberler", href: "/rehber", match: ["/rehber"] },
    { label: "İletişim", href: "/iletisim", match: ["/iletisim"] },
  ];
}

/**
 * Bir CTA etiketini dar ekran için ikiye böler: "Ücretsiz Teklif Al" → ["Ücretsiz", "Teklif Al"].
 * Kalan kısım tek kelimeyse (ör. "Teklif İste") bölmez ve null döner.
 */
export function splitLeadWord(label: string): [string, string] | null {
  const i = label.indexOf(" ");
  if (i <= 0) return null;
  const rest = label.slice(i + 1).trim();
  return rest.includes(" ") ? [label.slice(0, i), rest] : null;
}
