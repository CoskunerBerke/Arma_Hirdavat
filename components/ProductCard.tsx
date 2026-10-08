import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Shield, Package } from "lucide-react";
import { isBestSeller, type ProductGroup } from "@/data/products";
import ProductCardQuickAdd from "./ProductCardQuickAdd";

export default function ProductCard({ product, priority = false }: { product: ProductGroup; priority?: boolean }) {
  const best = isBestSeller(product.id);
  const primaryStandard = product.standards?.[0]?.split(":")?.[0] || product.standards?.[0];

  return (
    <div className="surface group flex h-full flex-col p-2.5 sm:p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_40px_-20px_rgba(15,27,45,0.3)]">
      <Link href={`/urunler/${product.slug}`} className="block">
        <div className="photo-well relative aspect-square w-full rounded-xl bg-slate-50/50 p-2 sm:p-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width:1280px) 260px, (min-width:1024px) 33vw, (min-width:640px) 50vw, 48vw"
            className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          {/* Rozetler */}
          <div className="absolute left-2 top-2 flex flex-col gap-1 z-10">
            {best && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                <Flame className="h-2.5 w-2.5" aria-hidden /> Çok satan
              </span>
            )}
            {product.badge && !best && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 border border-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Koli Adedi Rozeti */}
          {product.koli && (
            <div className="absolute right-2 bottom-2 z-10">
              <span className="inline-flex items-center gap-1 rounded-md bg-white/95 backdrop-blur-sm border border-line px-1.5 py-0.5 text-[10px] font-medium text-ink-soft shadow-xs">
                <Package className="h-2.5 w-2.5 text-brand" /> {product.koli}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-3 min-w-0">
        {/* Üst Kod ve Standart Etiketi */}
        <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
          <span className="font-mono font-bold text-brand bg-brand-50/80 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] truncate">
            {product.code}
          </span>
          {primaryStandard && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-ink-muted truncate font-medium">
              <Shield className="h-2.5 w-2.5 text-slate-400" /> {primaryStandard}
            </span>
          )}
        </div>

        {/* Ürün Başlığı */}
        <Link href={`/urunler/${product.slug}`} className="min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold leading-snug text-ink hover:text-brand transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Masaüstü için kısa açıklama */}
        <p className="mt-1 hidden sm:line-clamp-2 text-xs leading-relaxed text-ink-soft">
          {product.description}
        </p>

        {/* Beden / Kategori Bilgisi */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
          <span className="truncate">{product.category}</span>
          <span className="shrink-0 font-medium text-slate-500">{product.sizes ? `Bdn: ${product.sizes.split(",")[0]}...` : "Standart"}</span>
        </div>

        {/* Alt Aksiyon Butonları */}
        <div className="mt-auto flex items-center justify-between gap-1.5 border-t border-line/60 pt-2.5 sm:pt-3">
          <ProductCardQuickAdd title={product.title} slug={product.slug} />
          <Link
            href={`/urunler/${product.slug}`}
            className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold text-brand hover:underline shrink-0"
          >
            İncele <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
