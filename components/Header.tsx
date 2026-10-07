"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, ArrowRight } from "lucide-react";
import { COMPANY, NAV } from "@/data/company";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300 ${
        isDarkHero
          ? "border-b border-white/10 bg-slate-950/70 text-white"
          : "border-b border-line bg-white/95 text-ink shadow-[0_1px_0_#E2E7EE,0_8px_24px_-16px_rgba(15,27,45,0.25)]"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="group flex shrink-0 items-center" aria-label="Arma Hırdavat ana sayfa">
          <Image
            src="/images/logo.png"
            alt="Arma Hırdavat logosu"
            width={305}
            height={101}
            priority
            className="h-10 w-auto rounded-md transition-transform duration-300 group-hover:scale-[1.03] sm:h-11"
          />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-[15px] font-medium transition-colors duration-200 ${
                  isDarkHero
                    ? active ? "font-semibold text-white" : "text-slate-200 hover:text-white"
                    : active ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"
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

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={COMPANY.phones[0].href}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isDarkHero ? "text-slate-200 hover:text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            <Phone className="h-4 w-4 text-brand" aria-hidden />
            <span className="hidden xl:inline">{COMPANY.phones[0].label}</span>
          </a>
          <Link href="/iletisim" className="btn-primary animate-pulse-glow py-2.5">
            Bize Ulaşın
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition ${
            isDarkHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-canvas"
          } lg:hidden`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobil menü" className="container-x flex flex-col py-6">
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
