import type { ReactNode } from "react";
import Breadcrumbs from "./catalog/Breadcrumbs";
import JsonLd from "./catalog/JsonLd";
import { breadcrumbNode } from "./catalog/seo";

interface Crumb {
  label: string;
  href: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  /**
   * BreadcrumbList JSON-LD üretilsin mi (varsayılan: evet).
   * Sayfa kendi @graph'ında BreadcrumbList veriyorsa false geçin; aksi halde sayfada iki kırıntı şeması olur.
   */
  emitJsonLd?: boolean;
  /** Açıklamanın altına eklenecek içerik (ör. eylem butonları). */
  children?: ReactNode;
}

/** Alt sayfa başlığı: ana sayfa sahnesiyle aynı açık zemin ve ışıma */
export default function PageHero({ eyebrow, title, description, crumbs, emitJsonLd = true, children }: Props) {
  const all = [{ label: "Ana Sayfa", href: "/" }, ...crumbs];

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_90%_at_88%_0%,rgba(0,80,230,0.09),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#C9D2DE_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="container-x py-10 sm:py-16">
        <Breadcrumbs items={all} />

        {eyebrow && <p className="eyebrow mt-6 sm:mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>

      {emitJsonLd && <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbNode(all) }} />}
    </section>
  );
}
