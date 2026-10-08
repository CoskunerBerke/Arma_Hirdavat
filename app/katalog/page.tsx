import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, ExternalLink, ShieldCheck, CheckCircle2, Package, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { CATALOGS } from "@/data/company";

export const metadata: Metadata = {
  title: "Resmi FABA İş Güvenliği ve KKD Ürün Kataloğu 2026 | PDF İndir",
  description:
    "FABA Safety resmi ürün kataloğunu (48 Sayfa - 40.7 MB) PDF olarak indirin. İş eldivenleri, köpük nitril, kesilmez eldivenler, kaynak eldivenleri ve Tip 3B/4B kimyasal koruyucu tulumlar.",
  alternates: { canonical: "/katalog" },
};

const CHAPTERS = [
  { title: "İşçi Eldivenleri", range: "Sayfa 4 - 9", desc: "EP-1301, EP-1302, EP-1303, EP-1401, EP-1402, EP-1403 nitril kaplamalı iş eldivenleri" },
  { title: "Köpük Nitril Eldivenleri", range: "Sayfa 10 - 14", desc: "TruFlex EN-1501, EN-1502, EN-1503, EN-1511, EN-1512 mikro köpük montaj eldivenleri" },
  { title: "Kesilmeye Dirençli Eldivenler", range: "Sayfa 16 - 18", desc: "TruCut EK-5000, EK-5610, EK-5620 Seviye D HPPE kesilmez eldivenler" },
  { title: "Zevahir Kaynak & Argon Eldivenleri", range: "Sayfa 20 - 26", desc: "Zevahir D200, D300, D-105 sürücü, D-100 ve D-101 TIG argon kaynak eldivenleri" },
  { title: "Kimyasal Koruyucu Tulumlar", range: "Sayfa 29 - 32", desc: "TruChem T-800, T-800-G, T-630, T-630-G Tip 3B/4B/5B/6B ve EN 14126 biyolojik koruma" },
  { title: "Lamineli & SMS Tulumlar", range: "Sayfa 33 - 36", desc: "T-535 bantlı dikiş, T-530, T-500 SMS ve T-300 hafif endüstriyel tulumlar" },
  { title: "Önlük, Kolluk, Galoş & Başlıklar", range: "Sayfa 37 - 46", desc: "LO laboratuvar önlüğü, LK lamineli kolluk, KK kimyasal kolluk, BG bot galoşları" },
];

export default function CatalogPage() {
  const fabaCatalog = CATALOGS[0];

  return (
    <>
      <PageHero
        eyebrow="Teknik Dokümantasyon"
        title="Resmi FABA Ürün Kataloğu"
        description="FABA Kastamonu OSB tesislerinde üretilen kişisel koruyucu donanım (KKD), iş eldivenleri ve kimyasal tulumların güncel 48 sayfalık teknik kataloğunu PDF olarak inceleyebilir ve indirebilirsiniz."
        crumbs={[{ label: "Katalog", href: "/katalog" }]}
      />

      <section className="section py-10 sm:py-16">
        <div className="container-x max-w-5xl">
          {/* Ana Katalog İndirme Kartı */}
          <Reveal className="surface overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                <span className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-md">
                  <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-bold">
                      {fabaCatalog.updated}
                    </span>
                    <span className="rounded-full bg-blue-50 text-brand px-2.5 py-0.5 text-xs font-semibold">
                      {fabaCatalog.pages}
                    </span>
                    <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-xs font-mono font-medium">
                      {fabaCatalog.size}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl sm:text-2xl font-bold text-ink">
                    {fabaCatalog.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft max-w-2xl">
                    {fabaCatalog.description}
                  </p>
                </div>
              </div>

              {/* İndir & Görüntüle Butonları */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-2 lg:pt-0">
                <a
                  href={fabaCatalog.url}
                  download="FABA-Catalog-TR.pdf"
                  className="btn-primary py-3 px-6 text-sm font-semibold justify-center shadow-md shadow-brand/20"
                >
                  <Download className="h-4 w-4" /> Kataloğu İndir (PDF)
                </a>
                <a
                  href={fabaCatalog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost py-2.5 px-5 text-xs sm:text-sm font-medium justify-center"
                >
                  Tarayıcıda Görüntüle <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Güvence Rozetleri */}
            <div className="mt-6 pt-6 border-t border-line/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-brand" /> CE & EN Sertifikalı
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Package className="h-4 w-4 text-brand" /> Koli / Palet Toptan
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> %100 Yerli Üretim
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <FileText className="h-4 w-4 text-brand" /> 39 Ürün Grubu
              </span>
            </div>
          </Reveal>

          {/* Katalog İçindekiler Rehberi */}
          <div className="mt-10 sm:mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Katalog İçeriği</p>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-ink">Bölümler ve Sayfa Fihristi</h3>
              </div>
              <Link href="/urunler" className="text-xs sm:text-sm font-semibold text-brand hover:underline flex items-center gap-1">
                Sitede İncele <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {CHAPTERS.map((ch, idx) => (
                <div key={ch.title} className="surface p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-brand">{idx + 1}. Bölüm</span>
                      <span className="font-mono text-ink-muted bg-slate-100 px-2 py-0.5 rounded">{ch.range}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-ink">{ch.title}</h4>
                    <p className="mt-1 text-xs text-ink-soft leading-relaxed">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Katalogdaki ürünler için toptan iskonto teklifi alın." />
    </>
  );
}
