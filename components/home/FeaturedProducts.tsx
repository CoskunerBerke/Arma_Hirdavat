import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getFeaturedProducts } from "@/data/products";

/*
 * Öne çıkan ürünler: data/products.ts → FEATURED_IDS (elle seçilmiş vitrin, her kategoriden bir ürün).
 * Satış verisine dayanmaz; "çok satan" DEMEYİN.
 */
export default function FeaturedProducts({ limit }: { limit?: number }) {
  const products = getFeaturedProducts(limit);
  if (products.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="one-cikan-baslik">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-accent-ink">Öne çıkan ürünler</p>
            <h2 id="one-cikan-baslik" className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              FABA iş güvenliği vitrini
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Kodu, EN standartları, bedenleri ve koli içi adediyle. Beğendiğiniz ürünü listenize ekleyin, teklifi tek seferde
              isteyin.
            </p>
          </div>
          <Link
            href="/urunler"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-navy hover:text-accent-ink"
          >
            Tüm FABA ürünlerini inceleyin <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 50} className={`min-w-0 ${i >= 6 ? "hidden lg:block" : ""}`}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
