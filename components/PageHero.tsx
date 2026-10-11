import Image from "next/image";
import type { ReactNode } from "react";
import Breadcrumbs from "./catalog/Breadcrumbs";
import JsonLd from "./catalog/JsonLd";
import { breadcrumbNode } from "./catalog/seo";

interface Crumb {
  label: string;
  href: string;
}

/** Sayfa bandının varsayılan görseli: Tekkeköy mağazası (hero posteri) */
export const DEFAULT_BANNER_IMAGE = "/videos/hero-poster-wide-1080.jpg";

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
  /** Banttaki sarı etiket kutusunun kısa metni (ör. "Ürünlerimiz"). Varsayılan: son kırıntının adı. */
  label?: string;
  /** Bant görseli (/public altındaki mevcut bir görsel). Varsayılan: mağaza fotoğrafı. */
  image?: string;
  /** Bant görselinin object-position değeri (ör. "70% 50%") */
  imagePosition?: string;
}

interface PageBannerProps {
  /** Ana Sayfa dahil tam kırıntı listesi (sonuncusu geçerli sayfa) */
  crumbs: Crumb[];
  label: string;
  image?: string;
  imagePosition?: string;
  /** Daha alçak bant (ürün sayfası gibi içeriğin hemen başlaması gereken sayfalar) */
  compact?: boolean;
}

/**
 * Kurumsal sayfa bandı: tam genişlik görsel + koyu lacivert katman, sol altta sarı etiket kutusu,
 * hemen altında beyaz kırıntı şeridi. Etiket bir başlık DEĞİLDİR (sayfanın tek H1'i aşağıdadır).
 * Görsel dekoratiftir (alt=""); üst kısımda olduğu için öncelikli yüklenir.
 */
export function PageBanner({ crumbs, label, image = DEFAULT_BANNER_IMAGE, imagePosition = "50% 55%", compact = false }: PageBannerProps) {
  return (
    <div>
      <div
        className={`relative isolate overflow-hidden bg-navy ${
          compact ? "h-24 sm:h-32 lg:h-36" : "h-36 sm:h-48 lg:h-60"
        }`}
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={50}
          className="-z-20 object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-navy/75" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/80 via-navy/30 to-transparent" />

        <div className="container-x flex h-full items-end">
          <p className="max-w-[calc(100%-1rem)] bg-accent px-4 py-2.5 text-lg font-extrabold leading-tight tracking-tight text-navy shadow-lg shadow-black/25 sm:px-6 sm:py-3.5 sm:text-2xl lg:text-[1.75rem]">
            {label}
          </p>
        </div>
      </div>
      <div className="border-b border-line bg-white">
        <div className="container-x py-0.5">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>
    </div>
  );
}

/** Bandın altındaki ortalı sarı altıgen simge (dekoratif) */
export function TitleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="mx-auto h-10 w-10 sm:h-12 sm:w-12">
      <path d="M24 3l18.2 10.5v21L24 45 5.8 34.5v-21z" fill="#F5B800" />
      <path d="M24 13l9.5 5.5v11L24 35l-9.5-5.5v-11z" fill="none" stroke="#0B1F4D" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Alt sayfa başlığı (kurumsal düzen): görsel bant + sarı etiket + kırıntı, altında ortalı simge ve
 * vurgu renginde sayfanın tek H1'i. Eski props (eyebrow/title/description/crumbs/emitJsonLd/children)
 * aynen çalışır; label/image/imagePosition isteğe bağlıdır.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  emitJsonLd = true,
  children,
  label,
  image,
  imagePosition,
}: Props) {
  const all = [{ label: "Ana Sayfa", href: "/" }, ...crumbs];
  const bannerLabel = label ?? crumbs[crumbs.length - 1]?.label ?? title;

  return (
    <section className="relative isolate border-b border-line bg-white">
      <PageBanner crumbs={all} label={bannerLabel} image={image} imagePosition={imagePosition} />

      <div className="container-x py-10 text-center sm:py-14">
        <TitleMark />
        {eyebrow && <p className="eyebrow mt-4 justify-center">{eyebrow}</p>}
        <h1 className="mx-auto mt-3 max-w-4xl text-[1.7rem] font-extrabold leading-tight tracking-tight text-accent-ink sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        <span aria-hidden className="mx-auto mt-4 block h-1 w-16 rounded-full bg-accent" />
        {description && (
          <p className="mx-auto mt-5 max-w-3xl text-left text-base leading-relaxed text-ink-soft sm:text-center sm:text-lg">{description}</p>
        )}
        {children && <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center [&>*]:max-w-full">{children}</div>}
      </div>

      {emitJsonLd && <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbNode(all) }} />}
    </section>
  );
}
