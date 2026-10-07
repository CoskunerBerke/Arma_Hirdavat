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

/** Alt sayfa başlığı: ana sayfa sahnesiyle aynı zemin ve ışıma — sayfalar arası renk sürekliliği */
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
    <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0B1830_0%,#0A1424_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_85%_0%,rgba(110,156,242,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="container-x py-12 sm:py-16">
        <nav aria-label="Sayfa konumu">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-fg-muted">
            {all.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i < all.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-fg">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-fg-soft">
                    {c.label}
                  </span>
                )}
                {i < all.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-soft sm:text-lg">{description}</p>}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
