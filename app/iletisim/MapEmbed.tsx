"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface MapEmbedProps {
  /** Google Haritalar embed adresi (COMPANY.mapEmbed). */
  src: string;
  /** iframe başlığı (erişilebilir ad). */
  title: string;
  /** Yükseklik vb. sınıflar (ör. "h-[320px] sm:h-[380px]"). */
  className?: string;
}

/**
 * Tıklayınca yüklenen harita: Google Haritalar iframe'i (≈ 500 KB+ ve üçüncü taraf çerezleri)
 * ziyaretçi "Haritayı göster" demeden yüklenmez. Yol tarifi bağlantısı sayfada ayrıca bulunur,
 * bu yüzden JS kapalıyken de konuma ulaşılabilir.
 */
export default function MapEmbed({ src, title, className = "h-[320px] sm:h-[380px]" }: MapEmbedProps) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={`block w-full border-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden bg-slate-100 px-4 text-center ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(#E2E8F0_1px,transparent_1px),linear-gradient(90deg,#E2E8F0_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-line">
        <MapPin className="h-6 w-6" aria-hidden />
      </span>
      <p className="relative max-w-xs text-sm text-ink-soft">
        Harita, Google Haritalar&apos;dan yüklenir. Google kendi çerezlerini kullanabilir.
      </p>
      <button type="button" onClick={() => setShow(true)} className="btn-ghost relative min-h-[44px]">
        Haritayı göster
      </button>
    </div>
  );
}
