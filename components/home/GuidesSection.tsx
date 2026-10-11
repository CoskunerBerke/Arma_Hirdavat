import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GUIDE_ICONS } from "@/components/guides/GuideCard";
import { formatTrDate } from "@/components/guides/jsonld";
import { GUIDES, GUIDE_HUB, guideHref } from "@/data/guides";
import SectionHeading from "./SectionHeading";

/*
 * Ana sayfa "Rehberler" bölümü (sunucu bileşeni) — kurumsal sitelerdeki haber kartlarının yerine
 * gerçek, güncel satın alma rehberleri: tarih satırı (dateModified) + başlık + ince vurgu çizgisi.
 */
export default function GuidesSection() {
  const guides = [...GUIDES].sort((a, b) => b.dateModified.localeCompare(a.dateModified)).slice(0, 4);
  if (guides.length === 0) return null;

  return (
    <section aria-labelledby="rehberler-baslik" className="border-t border-line bg-white py-14 sm:py-20">
      <div className="container-x">
        <SectionHeading
          id="rehberler-baslik"
          eyebrow="Rehberler"
          title="Satın almadan önce okuyun"
          description="Eldiven ve tulum etiketlerindeki kodları sade bir dille anlatan, katalogdaki gerçek ürünlerle örneklenmiş rehberler."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {guides.map((g, i) => {
            const Icon = GUIDE_ICONS[g.slug] ?? BookOpen;
            return (
              <Reveal as="li" key={g.slug} delay={i * 80} className="min-w-0">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div aria-hidden className="relative flex h-28 items-center justify-center overflow-hidden bg-navy">
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:16px_16px]" />
                    <Icon className="relative h-10 w-10 text-accent transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-accent-ink" aria-hidden />
                      <time dateTime={g.dateModified}>{formatTrDate(g.dateModified)}</time>
                    </p>
                    <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-navy">
                      <Link
                        href={guideHref(g.slug)}
                        className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent-ink"
                      >
                        {g.h1}
                      </Link>
                    </h3>
                    <span
                      aria-hidden
                      className="mt-3 block h-0.5 w-10 bg-accent transition-all duration-300 group-hover:w-20"
                    />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{g.cardText}</p>
                    <span aria-hidden className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Devamını okuyun
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href={GUIDE_HUB.path}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink"
          >
            Tüm rehberler
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
