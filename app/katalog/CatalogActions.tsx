"use client";

import { Download, ExternalLink } from "lucide-react";
import { EVENTS, track } from "@/lib/track";

interface CatalogActionsProps {
  url: string;
  /** İndirilen dosyanın adı */
  fileName: string;
  /** "8,8 MB" gibi görünen boyut */
  size: string;
  /** İndirme düğmesi etiketi (CTA.catalog) */
  downloadLabel: string;
  /** "compact": ana sayfa e-katalog listesi için küçük "Görüntüle" / "İndir" düğmeleri */
  variant?: "default" | "compact";
  /** Analitik kaynağı */
  source?: string;
}

/** Katalog PDF'i: yeni sekmede aç (birincil) + indir. İkisi de catalog_download olayı gönderir. */
export default function CatalogActions({
  url,
  fileName,
  size,
  downloadLabel,
  variant = "default",
  source = "katalog",
}: CatalogActionsProps) {
  if (variant === "compact") {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener"
          onClick={() => track(EVENTS.catalogDownload, { mode: "view", source })}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line-strong bg-white px-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:text-navy"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Görüntüle
          <span className="sr-only"> (PDF, {size}, yeni sekmede açılır)</span>
        </a>
        <a
          href={url}
          download={fileName}
          onClick={() => track(EVENTS.catalogDownload, { mode: "download", source })}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-navy px-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        >
          <Download className="h-4 w-4 text-accent" aria-hidden />
          İndir
          <span className="sr-only"> (PDF, {size})</span>
        </a>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener"
        onClick={() => track(EVENTS.catalogDownload, { mode: "view", source })}
        className="btn-primary min-h-[48px] px-6"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        Kataloğu Görüntüle
        <span className="sr-only"> (PDF, {size}, yeni sekmede açılır)</span>
      </a>
      <a
        href={url}
        download={fileName}
        onClick={() => track(EVENTS.catalogDownload, { mode: "download", source })}
        className="btn-ghost min-h-[48px] px-6"
      >
        <Download className="h-4 w-4" aria-hidden />
        {downloadLabel.replace(/\s*\(PDF\)\s*$/, "")} <span className="font-normal text-ink-muted">(PDF · {size})</span>
      </a>
    </div>
  );
}
