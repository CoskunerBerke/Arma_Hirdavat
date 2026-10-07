import Image from "next/image";
import Link from "next/link";
import { CreditCard, Mail, MapPin, Phone, Printer } from "lucide-react";
import { COMPANY, NAV } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

const FOOTER_PRODUCTS = [1, 4, 10, 13, 15, 18, 30].map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/images/logo.png" alt="Arma Hırdavat" width={305} height={101} className="h-11 w-auto rounded-md" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">{COMPANY.legalName}</p>
          <a
            href={COMPANY.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm text-fg-soft transition hover:border-white/25 hover:text-white"
          >
            <CreditCard className="h-4 w-4" aria-hidden /> Online Tahsilat
          </a>
        </div>

        <nav aria-label="Alt menü" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Sayfalar</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-fg-muted transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Ürün grupları</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link href={`/urunler/${p.slug}`} className="text-fg-muted transition-colors hover:text-white">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">İletişim</h2>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden />
              <span>{COMPANY.address.full}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden />
              <span className="flex flex-col">
                {COMPANY.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-white">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden />
              <span>Faks: {COMPANY.fax}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}</p>
          <p>Tekkeköy / Samsun</p>
        </div>
      </div>
    </footer>
  );
}
