import Link from "next/link";
import { ArrowRight, ChevronRight, Wrench } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { PROMISES } from "@/data/company";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { PRODUCT_GROUPS, getProductsByCategory } from "@/data/products";
import ActiveChipScroller from "./ActiveChipScroller";

interface CategorySidebarProps {
  /** Etkin kategorinin adı (CategoryName) */
  activeName?: string;
  /** Yan sütunun görünmeye başladığı genişlik: kategori sayfasında lg, ürün sayfasında xl */
  from?: "lg" | "xl";
  /** Teklif düğmesinin analitik kaynağı */
  source?: string;
}

const CLS = {
  lg: { chips: "lg:hidden", aside: "hidden lg:block" },
  xl: { chips: "xl:hidden", aside: "hidden xl:block" },
} as const;

/**
 * Kurumsal düzendeki sol kategori menüsü (sunucu bileşeni).
 * - Masaüstü: başlık şeritli kutu, 8 kategori (etkin olan vurgu renginde), tüm ürünler / teknik hırdavat
 *   bağlantıları ve kısa teklif kutusu; kaydırınca yapışkan.
 * - Dar ekran: yatay kaydırılan çip şeridi (etkin çip görünür alana kaydırılır).
 * /urunler sayfasındaki filtre menüsüyle (ProductCatalog) aynı renk dilini kullanır.
 */
export function CategoryChips({ activeName, from = "lg" }: Pick<CategorySidebarProps, "activeName" | "from">) {
  return (
    <nav aria-label="Ürün kategorileri (kısayol)" className={CLS[from].chips}>
      <ActiveChipScroller className="-mx-4 flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none sm:-mx-6 sm:px-6">
        <Chip href="/urunler" label="Tüm ürünler" count={PRODUCT_GROUPS.length} active={false} />
        {CATEGORY_PAGES.map((c) => (
          <Chip
            key={c.slug}
            href={categoryHref(c.name)}
            label={c.shortName}
            count={getProductsByCategory(c.name).length}
            active={c.name === activeName}
          />
        ))}
      </ActiveChipScroller>
    </nav>
  );
}

function Chip({ href, label, count, active }: { href: string; label: string; count: number; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active ? "" : undefined}
      className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm transition-colors ${
        active
          ? "bg-accent font-semibold text-navy shadow-xs"
          : "border border-line bg-white text-ink-soft hover:border-accent hover:text-ink"
      }`}
    >
      {label}
      <span className={`rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-white/40 text-navy" : "bg-slate-100 text-ink-muted"}`}>
        {count}
        <span className="sr-only"> ürün</span>
      </span>
    </Link>
  );
}

export default function CategorySidebar({
  activeName,
  from = "lg",
  source = "kategori-yan-menu",
  className = "",
}: CategorySidebarProps & { className?: string }) {
  return (
    <aside aria-label="Yan menü" className={`${CLS[from].aside} w-60 shrink-0 xl:w-64 ${className}`}>
      <div className="sticky top-[calc(var(--header-h,72px)+1.5rem)] space-y-4">
        <nav aria-labelledby="yan-menu-baslik" className="overflow-hidden rounded-xl border border-line bg-white shadow-xs">
          <p id="yan-menu-baslik" className="bg-navy px-4 py-3 text-sm font-bold text-white">
            Ürün Kategorileri
          </p>
          <ul className="divide-y divide-line">
            {CATEGORY_PAGES.map((c) => {
              const active = c.name === activeName;
              return (
                <li key={c.slug}>
                  <Link
                    href={categoryHref(c.name)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-[44px] items-center justify-between gap-2 border-l-[3px] px-3 py-2 text-sm transition-colors ${
                      active
                        ? "border-accent bg-accent-soft/60 font-semibold text-accent-ink"
                        : "border-transparent text-ink-soft hover:border-accent hover:bg-slate-50 hover:text-accent-ink"
                    }`}
                  >
                    <span className="min-w-0 leading-snug">{c.name}</span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs text-ink-muted">
                      {getProductsByCategory(c.name).length}
                      <span className="sr-only"> ürün</span>
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line bg-slate-50 px-3 py-2">
            <Link
              href="/urunler"
              className="flex min-h-[40px] items-center gap-1.5 text-sm font-bold text-brand hover:text-accent-ink"
            >
              Tüm FABA ürünleri ({PRODUCT_GROUPS.length})
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/urun-gruplari"
              className="flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-accent-ink"
            >
              <Wrench className="h-4 w-4 shrink-0" aria-hidden />
              Endüstriyel malzemeler
            </Link>
          </div>
        </nav>

        <div className="rounded-xl border border-line bg-white p-4 shadow-xs">
          <p className="text-sm font-bold text-ink">Kurumsal teklif</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Model, beden ve koli adedini yazın; fiyatı e-postanıza gönderelim. {PROMISES.quoteShort}.
          </p>
          <RfqTriggerButton source={source} className="btn-action mt-3 min-h-[44px] w-full px-3 text-sm" />
          <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
        </div>
      </div>
    </aside>
  );
}
