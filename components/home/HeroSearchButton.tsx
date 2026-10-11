"use client";

import { Search } from "lucide-react";
import { useProductSearch } from "@/components/ProductSearchModal";

/** Hero'daki arama girişi: arama penceresini açan gerçek bir düğme (klavye ve ekran okuyucu erişimli). */
export default function HeroSearchButton({ hint = "Ürün veya kod arayın (ör. nitril, 1301)" }: { hint?: string }) {
  const { openSearch } = useProductSearch();

  return (
    <button
      type="button"
      onClick={() => openSearch()}
      aria-haspopup="dialog"
      className="group flex min-h-[48px] w-full max-w-xl items-center gap-3 rounded-2xl border border-white/20 bg-slate-950/70 py-2 pl-4 pr-2 text-left text-sm text-slate-300 backdrop-blur-xl transition hover:border-emerald-300/60 hover:bg-slate-900/90"
    >
      <Search className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
      <span className="min-w-0 flex-1 group-hover:text-white">{hint}</span>
      <span
        aria-hidden
        className="hidden shrink-0 rounded-xl border border-emerald-300/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 sm:inline-flex"
      >
        Ara
      </span>
    </button>
  );
}
