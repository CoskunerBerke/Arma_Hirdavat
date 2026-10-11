import Link from "next/link";
import { ArrowRight, BookOpen, Flame, FlaskConical, Ruler, ShieldCheck, type LucideIcon } from "lucide-react";
import { guideHref, guideReadingMinutes, type Guide } from "@/data/guides";

const ICONS: Record<string, LucideIcon> = {
  "en-388-eldiven-kodlari": ShieldCheck,
  "kimyasal-tulum-tipleri": FlaskConical,
  "kaynakci-eldiveni-tip-a-tip-b": Flame,
  "is-eldiveni-beden-tablosu": Ruler,
};

/** Rehber kartı: tüm kart tek bağlantıdır (başlık bağlantının adıdır). */
export default function GuideCard({ guide, headingLevel = "h2" }: { guide: Guide; headingLevel?: "h2" | "h3" }) {
  const Icon = ICONS[guide.slug] ?? BookOpen;
  const Heading = headingLevel;
  return (
    <article className="surface group relative flex h-full flex-col p-5 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md sm:p-6">
      <span className="icon-tile" aria-hidden>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-xs font-semibold text-ink-muted">
        {guide.eyebrow} · {guideReadingMinutes(guide)} dk okuma
      </p>
      <Heading className="mt-1.5 text-lg font-bold leading-snug tracking-tight text-ink">
        <Link href={guideHref(guide.slug)} className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand">
          {guide.h1}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{guide.cardText}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand" aria-hidden>
        Rehberi oku <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
