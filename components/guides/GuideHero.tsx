import type { ReactNode } from "react";
import { PageBanner, TitleMark } from "@/components/PageHero";

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
  /** Banttaki sarı etiket (varsayılan "Rehberler") */
  label?: string;
}

/**
 * Rehber sayfası başlığı — PageHero ile aynı kurumsal düzen: görsel bant + sarı etiket + kırıntı,
 * altında ortalı simge ve vurgu renginde H1. BreadcrumbList JSON-LD'si sayfada Article ile birlikte
 * tek @graph içinde verilir (burada üretilmez). Ekranın üstünde olduğu için animasyon (Reveal) kullanılmaz.
 */
export default function GuideHero({ crumbs, eyebrow, title, lead, meta, label = "Rehberler" }: Props) {
  return (
    <section className="relative isolate border-b border-line bg-white">
      <PageBanner crumbs={crumbs} label={label} />

      <div className="container-x py-10 text-center sm:py-14">
        <div className="mx-auto max-w-4xl">
          <TitleMark />
          {eyebrow && <p className="eyebrow mt-4 justify-center">{eyebrow}</p>}
          <h1 className="mt-3 text-[1.7rem] font-extrabold leading-tight tracking-tight text-accent-ink sm:text-[2.5rem] sm:leading-[1.15]">
            {title}
          </h1>
          <span aria-hidden className="mx-auto mt-4 block h-1 w-16 rounded-full bg-accent" />
          {lead && <p className="mx-auto mt-5 max-w-3xl text-left text-base leading-relaxed text-ink-soft sm:text-center sm:text-lg">{lead}</p>}
          {meta && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-ink-muted">{meta}</div>
          )}
        </div>
      </div>
    </section>
  );
}
