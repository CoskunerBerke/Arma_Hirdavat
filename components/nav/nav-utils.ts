/** "İş Güvenliği Ürünleri" menü öğesinin adresi (NAV içindeki ürünler sayfası). */
export const PRODUCTS_HREF = "/urunler";

/** Menü öğesi bu sayfada mı? Ürünler öğesi kategori sayfalarında da etkindir. */
export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === PRODUCTS_HREF) {
    return pathname === PRODUCTS_HREF || pathname.startsWith(`${PRODUCTS_HREF}/`) || pathname.startsWith("/kategori/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
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
