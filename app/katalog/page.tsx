import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { CATALOGS } from "@/data/company";

export const metadata: Metadata = {
  title: "Katalog ve Teknik Bilgiler",
  description: "Arma Hırdavat ürün kataloğu ve Domak pompa kataloğunu PDF olarak indirin.",
  alternates: { canonical: "/katalog" },
};

export default function CatalogPage() {
  return (
    <>
      <PageHero
        eyebrow="Teknik bilgiler"
        title="Katalog ve dokümanlar"
        description="Ürün kataloglarımızı PDF olarak indirebilirsiniz."
        crumbs={[{ label: "Katalog", href: "/katalog" }]}
      />

      <section className="section">
        <div className="container-x">
          <ul className="grid gap-4">
            {CATALOGS.map((c, i) => (
              <Reveal as="li" key={c.url} delay={i * 70}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface group flex flex-col gap-4 p-6 transition hover:border-white/20 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <FileText className="h-5 w-5 text-brand-soft" aria-hidden />
                    </span>
                    <div>
                      <h2 className="text-base font-semibold text-white">{c.title}</h2>
                      <p className="mt-0.5 text-sm text-fg-muted">
                        PDF · {c.size} · Güncelleme: {c.updated}
                      </p>
                    </div>
                  </div>
                  <span className="btn-ghost self-start group-hover:border-white/30 sm:self-auto">
                    İndir <Download className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Güncel fiyat ve stok bilgisi için bize ulaşın." />
    </>
  );
}
