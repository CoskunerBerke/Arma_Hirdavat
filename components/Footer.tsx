import Image from "next/image";
import Link from "next/link";
import { CreditCard, Mail, MapPin, Phone, Printer } from "lucide-react";
import { COMPANY, NAV } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

const FOOTER_PRODUCTS = [1, 7, 12, 15, 22, 26, 30]
  .map((id) => PRODUCT_GROUPS.find((p) => p.id === id))
  .filter((p): p is (typeof PRODUCT_GROUPS)[0] => Boolean(p));

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0B1328] text-slate-300">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image
            src="/images/logo.png"
            alt="Arma Hırdavat"
            width={305}
            height={101}
            style={{ width: "auto", height: "auto" }}
            className="h-11 w-auto rounded-md"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{COMPANY.legalName}</p>
          <a
            href={COMPANY.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            <CreditCard className="h-4 w-4 text-blue-400" aria-hidden /> Online Tahsilat
          </a>
        </div>

        <nav aria-label="Alt menü" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Sayfalar</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-slate-400 transition-colors hover:text-white">
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
                <Link href={`/urunler/${p.slug}`} className="text-slate-400 transition-colors hover:text-white">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">İletişim</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
              <span>{COMPANY.address.full}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
              <span className="flex flex-col">
                {COMPANY.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-white">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
              <span>Faks: {COMPANY.fax}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-slate-800/80">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.legalName} • Türkiye Geneli 81 İle Anlaşmalı Ambar Sevkiyatı</p>
          <p>Tekkeköy Merkez Depo / Samsun</p>
        </div>
      </div>
    </footer>
  );
}
