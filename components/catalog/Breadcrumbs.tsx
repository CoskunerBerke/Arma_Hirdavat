import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "./seo";

/**
 * Görünür kırıntı menüsü (Ana Sayfa dahil tam liste verilir). JSON-LD üretmez;
 * BreadcrumbList'i sayfa kendi @graph'ında (seo.ts → breadcrumbNode) verir.
 */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Sayfa konumu" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink-muted sm:text-sm">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${i}-${c.href}`} className="flex min-w-0 items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-ink-soft">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="inline-flex min-h-[40px] items-center transition-colors hover:text-accent-ink">
                    {c.label}
                  </Link>
                  <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
