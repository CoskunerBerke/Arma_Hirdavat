import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import { isBestSeller, type ProductGroup } from "@/data/products";

export default function ProductCard({ product, priority = false }: { product: ProductGroup; priority?: boolean }) {
  const best = isBestSeller(product.id);
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="surface group flex h-full flex-col p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-24px_rgba(15,27,45,0.35)]"
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
        {best && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-accent px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm">
            <Flame className="h-3 w-3" aria-hidden /> Çok satan
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-ink-muted">{product.category}</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-soft">Koli / Palet</span>
        </div>
        <h3 className="mt-1 text-base font-semibold leading-snug text-ink">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[11px] font-medium text-ink-muted">Tesis Ambalajı</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Teklif İncele <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
