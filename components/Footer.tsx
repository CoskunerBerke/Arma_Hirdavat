import Image from "next/image";
import Link from "next/link";
import { CreditCard, Mail, MapPin, Phone, Printer } from "lucide-react";
import { COMPANY, NAV } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

const FOOTER_PRODUCTS = [1, 4, 10, 13, 15, 18, 30].map((id) => PRODUCT_GROUPS.find((p) => p.id === id)!);

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/images/logo.png" alt="Arma Hırdavat" width={305} height={101} className="h-11 w-auto rounded-md" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">{COMPANY.legalName}</p>
          <a
            href={COMPANY.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm text-ink-soft transition hover:border-brand/30 hover:text-brand"
          >
            <CreditCard className="h-4 w-4" aria-hidden /> Online Tahsilat
          </a>
        </div>

        <nav aria-label="Alt menü" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-ink">Sayfalar</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink-muted transition-colors hover:text-brand">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-ink">Ürün grupları</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link href={`/urunler/${p.slug}`} className="text-ink-muted transition-colors hover:text-brand">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <h2 className="text-sm font-semibold text-ink">İletişim</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>{COMPANY.address.full}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span className="flex flex-col">
                {COMPANY.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-brand">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>Faks: {COMPANY.fax}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-brand">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}</p>
          <p>Tekkeköy / Samsun</p>
        </div>
      </div>
    </footer>
  );
}
