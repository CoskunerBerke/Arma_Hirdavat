import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/data/company";

interface Crumb {
  label: string;
  href: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}

/** Alt sayfa başlığı: ana sayfa sahnesiyle aynı açık zemin ve ışıma */
export default function PageHero({ eyebrow, title, description, crumbs }: Props) {
  const all = [{ label: "Ana Sayfa", href: "/" }, ...crumbs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
    })),
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_90%_at_88%_0%,rgba(0,80,230,0.09),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#C9D2DE_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="container-x py-12 sm:py-16">
        <nav aria-label="Sayfa konumu">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
            {all.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i < all.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-ink-soft">
                    {c.label}
                  </span>
                )}
                {i < all.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
