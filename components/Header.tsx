"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, ArrowRight, ClipboardList, Store } from "lucide-react";
import { COMPANY, NAV } from "@/data/company";
import { useQuote } from "@/components/QuoteContext";
import { useRetailModal } from "@/components/RetailStoreModal";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsOpen: openRfq, items } = useQuote();
  const { openModal: openRetailModal } = useRetailModal();

  const itemCount = items.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const isDarkHero = pathname === "/" && !scrolled;

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* Arka plan katmanı */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          open
            ? "border-b border-white/10 bg-slate-950 text-white"
            : isDarkHero
            ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl text-white"
            : "border-b border-line bg-white/95 backdrop-blur-xl text-ink shadow-[0_1px_0_#E2E7EE,0_8px_24px_-16px_rgba(15,27,45,0.25)]"
        }`}
      />

      <div className={`container-x flex h-[76px] items-center justify-between gap-3 sm:gap-6 ${
        isDarkHero || open ? "text-white" : "text-ink"
      }`}>
        {/* Logo & Alt Etiket */}
        <Link href="/" className="group flex shrink-0 flex-col justify-center" aria-label="Arma Hırdavat ana sayfa">
          <Image
            src="/images/logo.png"
            alt="Arma Hırdavat logosu"
            width={305}
            height={101}
            priority
            style={{ width: "auto", height: "auto" }}
            className="h-8 sm:h-9 w-auto rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className={`text-[10px] font-semibold tracking-tight transition-colors ${
            isDarkHero || open ? "text-slate-300" : "text-slate-600"
          }`}>
            Endüstriyel Tedarik & Tesis Malzemeleri
          </span>
        </Link>

        {/* Masaüstü Menü */}
        <nav aria-label="Ana menü" className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-sm font-semibold transition-colors duration-200 ${
                  isDarkHero
                    ? active ? "font-bold text-white" : "text-slate-200 hover:text-white"
                    : active ? "font-bold text-brand" : "text-ink-soft hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand shadow-[0_0_10px_rgba(0,80,230,0.55)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sağ Butonlar (Civtec Modeli: Fiziki Mağaza & RFQ) */}
        <div className="hidden items-center gap-2.5 sm:gap-3 lg:flex">
          {/* Sağ Buton 1 (Gri Çerçeveli): Fiziki Mağazamız & Perakende */}
          <button
            type="button"
            onClick={openRetailModal}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition shadow-2xs ${
              isDarkHero
                ? "border-slate-500/60 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-300"
                : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-white hover:border-slate-400 hover:text-ink"
            }`}
          >
            <Store className="h-3.5 w-3.5 text-slate-400" />
            <span>Fiziki Mağazamız & Perakende</span>
          </button>

          {/* Sağ Buton 2 (Kurumsal Vurgulu): Teklif Sepeti (RFQ) */}
          <button
            type="button"
            onClick={() => openRfq(true)}
            className="btn-action flex items-center gap-2 py-2 px-3.5 text-xs sm:text-sm font-bold shadow-md shadow-action/30"
          >
            <ClipboardList className="h-4 w-4" aria-hidden />
            <span>Teklif Sepeti (RFQ)</span>
            {itemCount > 0 && (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white text-slate-950 px-1.5 text-[11px] font-black shadow-sm">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobil Aksiyonlar */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => openRfq(true)}
            className="btn-action flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold shadow-xs"
            aria-label="Teklif Sepetini Aç"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">RFQ</span>
            {itemCount > 0 && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-950 text-[11px] font-black">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition ${
              isDarkHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-canvas"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto bg-white text-ink shadow-2xl lg:hidden">
          <nav aria-label="Mobil menü" className="container-x flex flex-col py-6">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openRfq(true);
              }}
              className="mb-3 flex w-full items-center justify-between rounded-xl btn-action p-3.5 text-left font-bold shadow-md"
            >
              <span className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Teklif Sepeti (RFQ)
              </span>
              <span className="rounded-full bg-white text-slate-950 px-2 py-0.5 text-xs font-black">
                {itemCount} ürün
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openRetailModal();
              }}
              className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-left text-xs font-semibold text-slate-800"
            >
              <span className="flex items-center gap-2">
                <Store className="h-4 w-4 text-slate-500" />
                Fiziki Mağazamız & Perakende (Tekkeköy)
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>

            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center justify-between border-b border-line py-4 text-lg font-medium ${
                  isActive(item.href) ? "text-brand" : "text-ink"
                }`}
              >
                {item.label}
                <ArrowRight className="h-4 w-4 opacity-40" aria-hidden />
              </Link>
            ))}
            <div className="mt-8 grid gap-3">
              <a href={COMPANY.phones[0].href} className="btn-ghost w-full">
                <Phone className="h-4 w-4" aria-hidden /> {COMPANY.phones[0].label}
              </a>
              <Link href="/iletisim" className="btn-primary w-full">
                Bize Ulaşın
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
