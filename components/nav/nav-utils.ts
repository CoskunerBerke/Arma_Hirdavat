import { FEATURED_HARDWARE_GROUPS } from "@/data/company";
import { slugify } from "@/data/slug";
import type { NavCategory, NavMenuItem } from "./types";

/** Ana menü öğesi (alt sayfalarıyla birlikte) bu sayfada mı? */
export function isMenuItemActive(pathname: string, item: Pick<NavMenuItem, "match">): boolean {
  return item.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** /urun-gruplari sayfasındaki grup çapası (sayfa id'leri slugify(grup) ile üretir). */
export function hardwareGroupHref(group: string): string {
  return `/urun-gruplari#${slugify(group)}`;
}

/**
 * Kurumsal düzendeki ana menü: Kurumsal · Ürün Grupları · Markalarımız · E-Kataloglar · İletişim.
 * "Ürün Grupları" dengeli bir geniş menüdür: endüstriyel malzemeler ve FABA iş güvenliği eşit ağırlıkta.
 * FABA kategori adları sunucuda (components/Header.tsx) veriden üretilip buraya gelir.
 */
export function buildMainMenu(categories: NavCategory[]): NavMenuItem[] {
  return [
    {
      label: "Kurumsal",
      href: "/kurumsal",
      match: ["/kurumsal", "/rehber", "/kvkk"],
      children: [
        { label: "Hakkımızda", href: "/kurumsal" },
        { label: "Hizmetlerimiz", href: "/#hizmetler" },
        { label: "Referanslarımız", href: "/#referanslar" },
        { label: "Fiziki Mağaza & Perakende", href: "/#fiziki-magaza" },
        { label: "Rehberler", href: "/rehber" },
        { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
      ],
    },
    {
      label: "Ürün Grupları",
      href: "/urun-gruplari",
      match: ["/urun-gruplari", "/urunler", "/kategori"],
      columns: [
        {
          title: "Endüstriyel Malzemeler",
          links: FEATURED_HARDWARE_GROUPS.map((g) => ({ label: g.label, href: hardwareGroupHref(g.group) })),
          all: { label: "Tüm ürün grupları", href: "/urun-gruplari", strong: true },
        },
        {
          title: "İş Güvenliği · FABA",
          links: categories.map((c) => ({ label: c.name, href: c.href })),
          all: { label: "Tüm FABA ürünleri", href: "/urunler", strong: true },
        },
      ],
    },
    { label: "Markalarımız", href: "/markalar", match: ["/markalar"] },
    { label: "E-Kataloglar", href: "/katalog", match: ["/katalog"] },
    { label: "İletişim", href: "/iletisim", match: ["/iletisim"] },
  ];
}
