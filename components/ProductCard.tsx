import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductGroup } from "@/data/products";

export default function ProductCard({ product, priority = false }: { product: ProductGroup; priority?: boolean }) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="surface group flex h-full flex-col p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8),0_0_30px_-12px_rgba(110,156,242,0.35)]"
    >
      <div className="photo-well aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 92vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <span className="text-xs font-medium text-fg-muted">{product.category}</span>
        <h3 className="mt-1 text-base font-semibold leading-snug text-white">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-soft">{product.description}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-brand-soft">
          İncele <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
