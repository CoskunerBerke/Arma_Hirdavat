import Image from "next/image";
import { BadgeCheck, Package, Truck, Wrench, type LucideIcon } from "lucide-react";
import { BRANDS, HARDWARE_GROUPS, LEGACY_BRAND_NAMES } from "@/data/company";
import { PRODUCT_GROUPS, slugify } from "@/data/products";
import CountUp from "./CountUp";

/*
 * Sayaç bandı (sunucu bileşeni): koyu lacivert katman altında mağaza fotoğrafı, kısa slogan ve 4 sayaç.
 * Tüm sayılar veriden hesaplanır. Deneyim yılı, alan (m²) gibi bilinmeyen sayılar YAZILMAZ.
 */

/** BRANDS + LEGACY_BRAND_NAMES, isim ve aliases ile tekilleştirilmiş marka sayısı (/markalar ile aynı kural). */
function brandCount(): number {
  const key = (name: string) => slugify(name).replace(/-/g, "");
  const seen = new Set<string>();
  let count = 0;
  for (const b of BRANDS) {
    const keys = [b.name, ...(b.aliases ?? [])].map(key);
    if (keys.some((k) => seen.has(k))) continue;
    keys.forEach((k) => seen.add(k));
    count++;
  }
  for (const name of LEGACY_BRAND_NAMES) {
    const k = key(name);
    if (seen.has(k)) continue;
    seen.add(k);
    count++;
  }
  return count;
}

interface Stat {
  icon: LucideIcon;
  value: number;
  label: string;
}

export default function StatsBand() {
  const stats: Stat[] = [
    { icon: Package, value: PRODUCT_GROUPS.length, label: "online FABA KKD ürünü" },
    { icon: Wrench, value: HARDWARE_GROUPS.length, label: "teknik hırdavat ürün grubu" },
    { icon: BadgeCheck, value: brandCount(), label: "marka (mağaza ve tedarik)" },
    { icon: Truck, value: 81, label: "ile sevkiyat" },
  ];

  return (
    <section aria-labelledby="sayilar-baslik" className="relative isolate overflow-hidden bg-navy py-14 sm:py-20">
      <Image
        src="/videos/hero-poster-wide-1080.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={50}
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/85" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/70" />

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-accent">Rakamlarla Arma</p>
          <h2 id="sayilar-baslik" className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Tekkeköy&apos;deki mağaza ve depomuzdan fabrikalara, şantiyelere ve atölyelere tedarik
          </h2>
          <span aria-hidden className="mx-auto mt-4 block h-1 w-16 rounded-full bg-accent" />
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="flex flex-col items-center text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/80 text-accent sm:h-16 sm:w-16">
                <s.icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
              </span>
              <CountUp value={s.value} className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl" />
              <span className="mt-1 max-w-[12rem] text-sm font-medium leading-snug text-slate-200 sm:text-base">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
