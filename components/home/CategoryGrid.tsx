import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { hardwareGroupIcon } from "@/components/catalog/hardwareGroupIcons";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { FEATURED_HARDWARE_GROUPS } from "@/data/company";
import { getProductsByCategory, isFeatured } from "@/data/products";
import { slugify } from "@/data/slug";

/*
 * Ana sayfa ürün grupları (sunucu bileşeni) — DENGELİ iki eşit panel:
 * solda endüstriyel malzemeler (HARDWARE_GROUPS'tan seçilmiş 8 grup), sağda FABA iş güvenliği (8 kategori).
 * Site yalnızca KKD sitesi gibi okunmasın diye iki panel aynı görsel ağırlıktadır. Sayı (ürün / grup adedi) yazılmaz.
 */
const HOME_HARDWARE_COUNT = 8;

interface Tile {
  key: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
}

export default function CategoryGrid() {
  const hardware: Tile[] = FEATURED_HARDWARE_GROUPS.slice(0, HOME_HARDWARE_COUNT).map((g) => ({
    key: g.group,
    label: g.label,
    href: `/urun-gruplari#${slugify(g.group)}`,
    icon: hardwareGroupIcon(g.group),
  }));

  const ppe: Tile[] = CATEGORY_PAGES.map((c) => {
    const products = getProductsByCategory(c.name);
    const cover = products.find((p) => isFeatured(p.id)) ?? products[0];
    return { key: c.slug, label: c.name, href: categoryHref(c.name), image: cover?.image, count: products.length };
  }).filter((t) => t.count > 0);

  return (
    <section id="urun-gruplari" aria-labelledby="kategoriler-baslik" className="scroll-mt-24 bg-canvas py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          id="kategoriler-baslik"
          eyebrow="Ürün grupları"
          title="Bir tesisin ihtiyaç duyduğu tüm malzemeler tek tedarikçide"
          description="Bağlantı elemanından pompaya, kesici taştan iş güvenliğine; marka, ölçü ve standart seçenekleriyle."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Panel
            icon={Wrench}
            title="Endüstriyel Malzemeler"
            text="Teknik hırdavat, tesisat ve sarf malzemeleri"
            tiles={hardware}
            all={{ href: "/urun-gruplari", label: "Tüm ürün grupları" }}
          />
          <Panel
            icon={HardHat}
            title="İş Güvenliği · FABA"
            text="EN standartlı eldiven, tulum ve koruyucu giyim"
            tiles={ppe}
            all={{ href: "/urunler", label: "Tüm FABA ürünleri" }}
            delay={90}
          />
        </div>
      </div>
    </section>
  );
}

function Panel({
  icon: Icon,
  title,
  text,
  tiles,
  all,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  tiles: Tile[];
  all: { href: string; label: string };
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="min-w-0">
      <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-7">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-extrabold tracking-tight text-navy sm:text-xl">{title}</h3>
            <p className="text-sm text-ink-muted">{text}</p>
          </div>
        </div>

        <ul className="mt-4 grid flex-1 content-start gap-1.5 sm:grid-cols-2">
          {tiles.map((t) => (
            <li key={t.key} className="min-w-0">
              <Link
                href={t.href}
                className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 transition duration-200 hover:border-line hover:bg-canvas"
              >
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-navy ring-1 ring-line transition-colors group-hover:bg-accent-soft">
                  {t.image ? (
                    <Image src={t.image} alt="" fill sizes="40px" className="object-contain p-1" />
                  ) : t.icon ? (
                    <t.icon className="h-5 w-5" aria-hidden />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-ink group-hover:text-navy">
                  {t.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-line-strong transition duration-200 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={all.href}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-lg text-sm font-bold text-navy hover:text-accent-ink"
        >
          {all.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Reveal>
  );
}
