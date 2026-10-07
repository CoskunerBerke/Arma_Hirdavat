import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/data/company";
import Reveal from "./Reveal";

export default function CtaBand({ title = "İhtiyaç listenizi gönderin, size dönüş yapalım." }: { title?: string }) {
  return (
    <section className="container-x pb-20 sm:pb-24">
      <Reveal className="surface relative overflow-hidden p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-brand-accent/25 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Bize ulaşın</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              <a href={COMPANY.phones[0].href} className="inline-flex items-center gap-2 hover:text-brand">
                <Phone className="h-4 w-4 text-brand" aria-hidden /> {COMPANY.phones[0].label}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-brand">
                <Mail className="h-4 w-4 text-brand" aria-hidden /> {COMPANY.email}
              </a>
            </div>
          </div>
          <Link href="/iletisim" className="btn-primary self-start px-6 py-3.5 lg:self-auto">
            Teklif isteyin <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
