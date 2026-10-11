import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package, Shield } from "lucide-react";
import { isFeatured, productHref, type ProductGroup } from "@/data/products";
import { mainStandard, safeBadge, sizeFact } from "./catalog/productFacts";
import ProductCardQuickAdd from "./ProductCardQuickAdd";

/** Varsayılan `sizes`: /urunler ızgarası (mobil 2, lg 2, xl 3 sütun; kenar çubuğu %25). */
const DEFAULT_SIZES = "(min-width:1280px) 24vw, (min-width:1024px) 36vw, (min-width:640px) 46vw, 48vw";

interface ProductCardProps {
  product: ProductGroup;
  /** Yalnızca ilk görünen 1–2 kart için (LCP adayı). */
  priority?: boolean;
  /** Izgaraya göre görsel genişliği; kart kullanan her sayfa kendi ızgarasına uygun değeri geçmeli. */
  sizes?: string;
  /** Kart başlığının etiketi (varsayılan h3; listenin üstünde h2 olmalı). */
  headingLevel?: "h2" | "h3" | "h4";
}

/**
 * Ürün kartı. Kartın tamamı ürün sayfasına giden tek bağlantıdır (başlıktaki bağlantı
 * ::after ile kartı kaplar); "Listeye ekle" butonu bunun üstünde ayrı tıklanır.
 */
export default function ProductCard({ product, priority = false, sizes = DEFAULT_SIZES, headingLevel = "h3" }: ProductCardProps) {
  const Heading = headingLevel;
  const href = productHref(product);
  const featured = isFeatured(product.id);
  const badge = featured ? null : safeBadge(product);
  const standard = mainStandard(product);
  const size = sizeFact(product);

  return (
    <article className="surface group relative flex h-full w-full min-w-0 flex-col overflow-hidden p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_20px_40px_-20px_rgba(15,27,45,0.3)] motion-reduce:transform-none sm:p-3.5">
      <div className="photo-well relative aspect-square w-full rounded-xl bg-slate-50/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes={sizes}
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none sm:p-3"
          priority={priority}
        />
        {(featured || badge) && (
          <div className="pointer-events-none absolute left-2 top-2 z-[1] flex flex-col gap-1">
            {featured ? (
              <span className="inline-flex items-center rounded-full bg-amber-700 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                Öne çıkan
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand shadow-sm">
                {badge}
              </span>
            )}
          </div>
        )}
        {product.koli && (
          <div className="pointer-events-none absolute bottom-2 right-2 z-[1]">
            <span className="inline-flex items-center gap-1 rounded-md border border-line bg-white/95 px-1.5 py-0.5 text-[11px] font-medium text-ink-soft shadow-xs">
              <Package className="h-3 w-3 text-brand" aria-hidden />
              <span className="sr-only">Koli içi:</span> {product.koli}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col pt-3">
        <div className="mb-1 flex items-center justify-between gap-1">
          <span className="truncate rounded bg-brand-50/80 px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand">
            {product.code}
          </span>
          {standard && (
            <span className="hidden min-w-0 items-center gap-0.5 truncate text-[11px] font-medium text-ink-muted sm:inline-flex">
              <Shield className="h-3 w-3 shrink-0 text-slate-400" aria-hidden /> <span className="truncate">{standard}</span>
            </span>
          )}
        </div>

        <Heading className="min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          <Link
            href={href}
            className="line-clamp-2 rounded transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-brand focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand focus-visible:after:ring-offset-2"
          >
            {product.title}
          </Link>
        </Heading>

        <p className="mt-1 hidden text-xs leading-relaxed text-ink-soft sm:line-clamp-2">{product.description}</p>

        <p className="mt-2 text-[11px] text-ink-muted sm:text-xs">
          {size.label}: <span className="font-medium text-ink-soft">{size.value}</span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-1.5 border-t border-line/60 pt-2.5 sm:pt-3">
          {/* Kartı kaplayan bağlantının üstünde kalsın */}
          <div className="relative z-[2]">
            <ProductCardQuickAdd title={product.title} slug={product.slug} koli={product.koli} productId={product.id} />
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-brand group-hover:underline"
            aria-hidden
          >
            İncele
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </span>
        </div>
      </div>
    </article>
  );
}
