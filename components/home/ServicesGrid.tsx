import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { COMPANY, HARDWARE_GROUPS, PROMISES } from "@/data/company";
import Reveal from "@/components/Reveal";
import RetailModalTrigger from "./RetailModalTrigger";
import SectionHeading from "./SectionHeading";

/*
 * "Hizmetlerimiz" — 3×2 görsel kart ızgarası (sunucu bileşeni), id="hizmetler" (menüdeki Hizmetler bağlantısı).
 * Görseller yalnızca sitede zaten olan dosyalardır (mağaza posterleri, kategori/ürün video posterleri).
 * Kategori posterlerinin solunda ürün kodu yazısı vardır: kırpım sağa yaslanır ve hafif büyütülür,
 * böylece kartta yalnızca ürün kartı görünür.
 */

type Tile = {
  title: string;
  text: string;
  image: string;
  /** Poster (ürün kartı sağda) mı, fotoğraf mı */
  poster?: boolean;
  /** object-position */
  position?: string;
} & ({ href: string; external?: boolean } | { retail: true });

const TILES: Tile[] = [
  {
    title: "Toptan satış (koli & palet)",
    text: "Online katalogdaki ürünlerde koli ve palet bazında firmanıza özel teklif.",
    image: "/videos/kategori/nitril-kapli-is-eldiveni.jpg",
    poster: true,
    href: "/urunler",
  },
  {
    title: "Perakende mağaza satışı",
    text: "Tekkeköy'deki mağazamızdan adet bazında alım; adres ve çalışma saatleri.",
    image: "/videos/hero-poster-wide-1080.jpg",
    position: "50% 60%",
    retail: true,
  },
  {
    title: "Türkiye geneli sevkiyat",
    text: PROMISES.deliveryShort + ". Nakliye koşulları teklifte yazılır.",
    image: "/videos/hero-poster-portrait-720.jpg",
    position: "50% 62%",
    href: "/#teslimat",
  },
  {
    title: "Teknik hırdavat tedariki",
    text: `Bağlantı elemanından kaynak ekipmanına ${HARDWARE_GROUPS.length} ürün grubunda tedarik.`,
    image: "/videos/urun/20.jpg",
    poster: true,
    href: "/urun-gruplari",
  },
  {
    title: "Ürün belgeleri ve katalog",
    text: "EN standart kodları ürün sayfalarında; üretici kataloğu ücretsiz PDF.",
    image: "/videos/kategori/kesilmeye-direncli-eldiven.jpg",
    poster: true,
    href: "/katalog",
  },
  {
    title: "Online ödeme",
    text: "Onayladığınız teklifin ödemesini online ödeme sayfamızdan yapabilirsiniz.",
    image: "/videos/kategori/kimyasal-koruyucu-tulum.jpg",
    poster: true,
    href: COMPANY.paymentUrl,
    external: true,
  },
];

const SIZES = "(min-width: 1024px) 31vw, 48vw";

export default function ServicesGrid() {
  return (
    <section id="hizmetler" aria-labelledby="hizmetler-baslik" className="bg-canvas py-14 sm:py-20">
      <div className="container-x">
        <SectionHeading
          id="hizmetler-baslik"
          eyebrow="Hizmetlerimiz"
          title="Mağazadan fabrikaya tedarik hizmetlerimiz"
          description="Toptan teklif, perakende satış, sevkiyat ve belgeler: ihtiyacınıza göre ilgili sayfaya geçin."
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {TILES.map((t, i) => (
            <Reveal as="li" key={t.title} delay={(i % 3) * 80} className="min-w-0">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-xs transition duration-300 focus-within:-translate-y-1 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-navy sm:aspect-[4/3]">
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes={SIZES}
                    quality={60}
                    className={`object-cover transition-transform duration-700 ease-out ${
                      t.poster ? "origin-right scale-[1.16] group-hover:scale-[1.26]" : "group-hover:scale-110"
                    }`}
                    style={{ objectPosition: t.poster ? "100% 50%" : t.position ?? "50% 50%" } as CSSProperties}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <p className="absolute inset-x-0 bottom-0 hidden px-4 pb-3 text-sm leading-snug text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:block sm:text-[15px]">
                    {t.text}
                  </p>
                </div>
                {/* Başlık şeridi (vurgu rengi); bağlantı tüm kartı kaplar */}
                <div className="flex min-h-[52px] flex-1 items-center justify-between gap-2 bg-accent px-3 py-2.5 text-navy transition-colors group-hover:bg-accent-hover sm:px-4 sm:py-3">
                  <h3 className="text-sm font-bold leading-snug sm:text-base">
                    <TileAction tile={t} />
                  </h3>
                  {"external" in t && t.external ? (
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Kartın tamamını kaplayan bağlantı / düğme (after: katmanı) */
const STRETCH =
  "text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-4 focus-visible:after:ring-brand/40";

function TileAction({ tile }: { tile: Tile }) {
  if ("retail" in tile) {
    return <RetailModalTrigger className={STRETCH}>{tile.title}</RetailModalTrigger>;
  }
  if (tile.external) {
    return (
      <a href={tile.href} target="_blank" rel="noopener noreferrer" className={STRETCH}>
        {tile.title}
        <span className="sr-only"> (yeni sekmede açılır)</span>
      </a>
    );
  }
  return (
    <Link href={tile.href} className={STRETCH}>
      {tile.title}
    </Link>
  );
}
