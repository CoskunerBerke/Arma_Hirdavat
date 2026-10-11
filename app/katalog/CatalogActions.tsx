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
}

/** Katalog PDF'i: yeni sekmede aç (birincil) + indir. İkisi de catalog_download olayı gönderir. */
export default function CatalogActions({ url, fileName, size, downloadLabel }: CatalogActionsProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener"
        onClick={() => track(EVENTS.catalogDownload, { mode: "view", source: "katalog" })}
        className="btn-primary min-h-[48px] px-6"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        Kataloğu Görüntüle
        <span className="sr-only"> (PDF, {size}, yeni sekmede açılır)</span>
      </a>
      <a
        href={url}
        download={fileName}
        onClick={() => track(EVENTS.catalogDownload, { mode: "download", source: "katalog" })}
        className="btn-ghost min-h-[48px] px-6"
      >
        <Download className="h-4 w-4" aria-hidden />
        {downloadLabel.replace(/\s*\(PDF\)\s*$/, "")} <span className="font-normal text-ink-muted">(PDF · {size})</span>
      </a>
    </div>
  );
}
