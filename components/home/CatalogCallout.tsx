import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import CatalogActions from "@/app/katalog/CatalogActions";
import { CATALOGS } from "@/data/catalogs";
import { CTA } from "@/data/company";

/*
 * Ana sayfa e-katalog çağrısı (sunucu bileşeni): data/catalogs.ts'teki kataloglar (en yenisi üstte)
 * başlık, marka ve dosya boyutuyla listelenir; "Görüntüle" / "İndir" + tüm e-kataloglar bağlantısı.
 */
const HOME_CATALOG_LIMIT = 4;

export default function CatalogCallout() {
  const catalogs = CATALOGS.slice(0, HOME_CATALOG_LIMIT);
  if (catalogs.length === 0) return null;

  return (
    <section aria-labelledby="e-katalog-baslik" className="bg-canvas py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">E-Kataloglar</p>
            <h2 id="e-katalog-baslik" className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Üretici ve Distribütör E-Kataloglarını İnceleyin / İndirin
            </h2>
            <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-accent" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
              Ürün kodları, teknik standartlar ve ambalaj bilgileri üreticinin güncel kataloğunda; ihtiyacınızı belirleyip
              teklif listenize ekleyin.
            </p>
            <Link
              href="/katalog"
              className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-navy hover:text-accent-ink"
            >
              Tüm E-Kataloglar <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <ul className="space-y-3 lg:col-span-7">
            {catalogs.map((c) => (
              <li
                key={c.id}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 transition duration-300 hover:border-accent hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="flex min-w-0 items-start gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                    <FileText className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold leading-snug text-ink">{c.title}</p>
                    <p className="mt-1 text-xs text-ink-muted sm:text-[13px]">
                      {c.brand} · PDF · {c.size}
                    </p>
                  </div>
                </div>
                <CatalogActions
                  url={c.url}
                  fileName={c.fileName}
                  size={c.size}
                  downloadLabel={CTA.catalog}
                  variant="compact"
                  source="anasayfa_e_katalog"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
