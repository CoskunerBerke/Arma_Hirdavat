"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Teklif penceresi kabuğu. app/layout.tsx bunu <RfqModal /> olarak kullanır (değişiklik gerekmez).
 * Asıl pencere (components/quote/RfqDialog.tsx) ayrı bir pakette, yalnızca açılınca yüklenir;
 * ilk açılışta gecikme olmasın diye sayfa boştayken önceden indirilir.
 * Kapanınca pencere kaldırılır: tüm kapatma yolları durumu aynı şekilde sıfırlar.
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useQuote } from "./QuoteContext";

const loadDialog = () => import("./quote/RfqDialog");

function RfqDialogLoading() {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60" role="status" aria-live="polite">
      <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-xl">
        <Loader2 className="h-4 w-4 animate-spin text-brand" aria-hidden />
        Teklif listesi açılıyor…
      </span>
    </div>
  );
}

const RfqDialog = dynamic(loadDialog, { ssr: false, loading: () => <RfqDialogLoading /> });

export default function RfqModal() {
  const { isOpen, closeModal } = useQuote();
  const pathname = usePathname();
  const lastPathname = useRef(pathname);

  // Sayfa değişince (ör. pencere içindeki KVKK bağlantısı, geri tuşu) pencere kapanır;
  // aksi hâlde yeni sayfa açık pencerenin arkasında görünmez kalır.
  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    closeModal();
  }, [pathname, closeModal]);

  useEffect(() => {
    let cancelled = false;
    const preload = () => {
      if (!cancelled) void loadDialog().catch(() => undefined);
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(preload, { timeout: 6000 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }
    const t = window.setTimeout(preload, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return isOpen ? <RfqDialog /> : null;
}
