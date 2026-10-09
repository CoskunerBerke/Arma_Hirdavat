import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/data/company";
import Reveal from "./Reveal";

export default function CtaBand({ title = "İhtiyaç listenizi gönderin, size dönüş yapalım." }: { title?: string }) {
  return (
    <section className="container-x pb-20 sm:pb-24">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1B2D] via-[#0B1528] to-[#003EA8] p-8 shadow-2xl sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">Bize ulaşın</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <a href={COMPANY.phones[0].href} className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-blue-400" aria-hidden /> {COMPANY.phones[0].label}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-blue-400" aria-hidden /> {COMPANY.email}
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/iletisim"
              className="btn-action shadow-xl shadow-action/30 px-6 py-3.5 text-center text-sm font-bold"
            >
              Hemen Fiyat Teklifi Alın <ArrowRight className="h-4 w-4 inline ml-1" aria-hidden />
            </Link>
            <a
              href="https://wa.me/903622666095"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 text-center"
            >
              WhatsApp ile Sor
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
