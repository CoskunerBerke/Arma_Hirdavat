import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, Package, Search } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { CATEGORY_PAGES, categoryHref } from "@/data/categories";
import { COMPANY, CTA, PROMISES, mailtoHref } from "@/data/company";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ürün kategorilerine göz atın ya da bize yazın.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">Hata 404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Aradığınız sayfa bulunamadı</h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Sayfa taşınmış veya adresi değişmiş olabilir. Aradığınız ürün aşağıdaki kategorilerden birinde olabilir.
          Bulamazsanız ihtiyacınızı yazın, uygun ürünü birlikte bulalım.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex flex-col">
            <RfqTriggerButton className="btn-action min-h-[48px] px-6">
              {CTA.primary}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </RfqTriggerButton>
            <p className="mt-2 text-xs text-ink-muted">{PROMISES.quoteReassurance}</p>
          </div>
          <Link href="/urunler" className="btn-ghost min-h-[48px] px-6">
            <Search className="h-4 w-4" aria-hidden />
            Tüm ürünler
          </Link>
        </div>
      </div>

      <nav aria-labelledby="bulunamadi-kategoriler" className="mt-14">
        <h2 id="bulunamadi-kategoriler" className="text-lg font-bold text-ink">
          İş güvenliği ürün kategorileri
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_PAGES.map((c) => (
            <li key={c.slug}>
              <Link
                href={categoryHref(c.name)}
                className="surface flex min-h-[48px] items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-ink hover:border-brand/40"
              >
                <span className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {c.name}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/urun-gruplari"
              className="surface flex min-h-[48px] items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-ink hover:border-brand/40"
            >
              <span className="flex items-center gap-2.5">
                <Package className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                Teknik hırdavat ürün grupları
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:gap-6">
        <Link href="/iletisim" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand hover:underline">
          İletişim ve mağaza adresi
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <a href={mailtoHref("Web sitesi – aradığım ürün")} className="inline-flex min-h-[44px] items-center gap-2 hover:text-ink">
          <Mail className="h-4 w-4 text-brand" aria-hidden />
          {COMPANY.email}
        </a>
      </div>
    </section>
  );
}
