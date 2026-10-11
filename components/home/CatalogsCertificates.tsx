import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, FileCheck2, FileText, ShieldCheck } from "lucide-react";
import CatalogActions from "@/app/katalog/CatalogActions";
import Reveal from "@/components/Reveal";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import SectionHeading from "./SectionHeading";
import { CATALOGS, formatCatalogDate } from "@/data/catalogs";
import { CTA } from "@/data/company";

/*
 * "Ürün Katalogları ve Sertifika Belgeleri" (#belgeler) — sunucu bileşeni.
 * Kataloglar data/catalogs.ts'ten (en yenisi üstte). Belgeler: yalnızca doğru olan anlatılır —
 * CE işareti ve EN kodları ürün sayfalarında; uygunluk beyanı / teknik föy teklifle talep edilebilir.
 */
const CERTS = [
  {
    icon: ShieldCheck,
    title: "CE işareti ve EN standartları",
    text: "Her ürün sayfasında CE kategorisi ve EN standart kodları (EN 388, EN 407, EN 14605 vb.) açıkça yazılıdır.",
  },
  {
    icon: FileCheck2,
    title: "Uygunluk beyanı ve teknik föy",
    text: "Üreticinin AB uygunluk beyanı ve teknik föylerini teklif talebinizin not alanına yazarak isteyebilirsiniz.",
  },
  {
    icon: BookOpen,
    title: "Standart rehberleri",
    text: "EN 388 eldiven kodları, tulum tipleri ve kaynakçı eldiveni sınıfları sade dille anlatılır.",
    href: "/rehber",
    linkLabel: "Rehberleri okuyun",
  },
];

export default function CatalogsCertificates() {
  const shown = CATALOGS.slice(0, 3);

  return (
    <section id="belgeler" aria-labelledby="belgeler-baslik" className="scroll-mt-24 bg-canvas py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          id="belgeler-baslik"
          eyebrow="Kataloglar & belgeler"
          title="Ürün Katalogları ve Sertifika Belgeleri"
          description="Satın alma ve İSG süreçleriniz için ihtiyaç duyduğunuz üretici kataloglarına ve ürün belgelerine buradan ulaşın."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* E-kataloglar */}
          <Reveal className="min-w-0">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                  <FileText className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-navy">E-Kataloglar</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {shown.map((c) => (
                  <li key={c.id} className="rounded-xl border border-line bg-canvas p-4">
                    <p className="text-sm font-semibold text-ink">{c.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {c.brand} · {c.pages} · PDF {c.size} · {formatCatalogDate(c.publishedAt)}
                    </p>
                    <div className="mt-3">
                      <CatalogActions url={c.url} fileName={c.fileName} size={c.size} downloadLabel={CTA.catalog} />
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/katalog"
                className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 self-start text-sm font-semibold text-accent-ink hover:underline"
              >
                Tüm kataloglar <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          {/* Sertifika ve belgeler */}
          <Reveal delay={80} className="min-w-0">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                  <BadgeCheck className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-navy">Sertifika ve ürün belgeleri</h3>
              </div>
              <ul className="mt-6 space-y-5">
                {CERTS.map((c) => (
                  <li key={c.title} className="flex gap-3">
                    <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                      {c.href && (
                        <Link
                          href={c.href}
                          className="mt-1 inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-accent-ink hover:underline"
                        >
                          {c.linkLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <RfqTriggerButton source="belgeler" className="btn-action min-h-[48px] w-full px-6 sm:w-auto">
                  <span>{CTA.primary}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </RfqTriggerButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
