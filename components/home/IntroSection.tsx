import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY, PROMISES } from "@/data/company";

/*
 * Ana sayfa tanıtım metni (sunucu bileşeni) — kurumsal düzendeki sola hizalı giriş yazısı.
 * Sayılar veriden gelir; sevkiyat cümlesi yalnızca PROMISES.delivery'dir. Sayfa H1'ini tekrar etmez.
 */
export default function IntroSection() {
  return (
    <section aria-labelledby="tanitim-baslik" className="border-b border-line bg-white py-12 sm:py-16">
      <div className="container-x">
        <div className="max-w-4xl">
          <h2 id="tanitim-baslik" className="text-2xl font-extrabold leading-tight tracking-tight text-accent-ink sm:text-3xl">
            Endüstriyel Tesisler İçin Teknik Hırdavat ve İş Güvenliği
          </h2>
          <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <div className="mt-5 space-y-4 text-base leading-[1.75] text-ink-soft sm:text-[17px]">
            <p>
              {COMPANY.name}, fabrikalara, şantiyelere ve imalat hatlarına teknik hırdavat, endüstriyel sarf ve iş
              güvenliği malzemesi tedarik eder. Tedarik ağımızda bağlantı elemanından pompaya, hortumdan kesici taşa kadar
              geniş bir ürün yelpazesi bulunur; perakende alım için Tekkeköy merkez mağazamıza gelebilirsiniz.
            </p>
            <p>
              Online kataloğumuzda FABA kişisel koruyucu donanım ürünleri yer alır. Koli ve palet bazında kurumsal teklif
              veriyoruz. {PROMISES.delivery}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            <Link
              href="/kurumsal"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink"
            >
              Hakkımızda
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/urun-gruplari"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink"
            >
              Endüstriyel malzeme ürün grupları
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
