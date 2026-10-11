/**
 * Türkçe karakterleri sadeleştirip URL / çapa parçası üretir ("Bağlantı Elemanları" → "baglanti-elemanlari").
 * Ürün verisinden bağımsız tutulur: istemci bileşenleri (ör. menü) ürün verisini pakete almadan kullanabilir.
 */
export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", I: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
