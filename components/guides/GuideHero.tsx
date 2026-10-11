import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export interface GuideCrumb {
  label: string;
  href: string;
}

interface Props {
  /** Ana Sayfa dahil tam yol; sonuncusu geçerli sayfadır */
  crumbs: GuideCrumb[];
  eyebrow?: string;
  title: string;
  /** H1 altındaki giriş paragrafı (öne çıkan snippet için soruyu doğrudan yanıtlar) */
  lead?: string;
  meta?: ReactNode;
}

/**
 * Rehber sayfası başlığı. PageHero ile aynı görsel dil; BreadcrumbList JSON-LD'si sayfada
 * Article ile birlikte tek @graph içinde verilir (burada üretilmez). Ekranın üstünde olduğu için
 * animasyon (Reveal) kullanılmaz.
 */
export default function GuideHero({ crumbs, eyebrow, title, lead, meta }: Props) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_90%_at_88%_0%,rgba(0,80,230,0.09),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#C9D2DE_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="container-x py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Sayfa konumu">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i < crumbs.length - 1 ? (
                    <Link href={c.href} className="inline-flex min-h-[24px] items-center transition-colors hover:text-brand">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-ink-soft">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden />}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && <p className="eyebrow mt-7">{eyebrow}</p>}
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.15]">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">{lead}</p>}
          {meta && <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-muted">{meta}</div>}
        </div>
      </div>
    </section>
  );
}
