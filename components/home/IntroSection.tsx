import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY, HARDWARE_GROUPS, PROMISES } from "@/data/company";
import { CATEGORY_PAGES } from "@/data/categories";
import { PRODUCT_GROUPS } from "@/data/products";

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
            Samsun&apos;da Teknik Hırdavat ve İş Güvenliği Malzemeleri
          </h2>
          <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <div className="mt-5 space-y-4 text-base leading-[1.75] text-ink-soft sm:text-[17px]">
            <p>
              {COMPANY.name}, Samsun Tekkeköy&apos;deki mağazası ve deposundan fabrikalara, şantiyelere ve atölyelere
              teknik hırdavat ve iş güvenliği malzemesi tedarik eder. Mağazamızda ve tedarik ağımızda bağlantı
              elemanlarından kaynak ekipmanlarına {HARDWARE_GROUPS.length} ürün grubu bulunur; perakende alım için
              mağazamıza gelebilirsiniz.
            </p>
            <p>
              Online kataloğumuzda {CATEGORY_PAGES.length} kategoride {PRODUCT_GROUPS.length} FABA kişisel koruyucu
              donanım ürünü yer alır. İş eldiveni, koruyucu tulum ve önlüklerde koli ve palet bazında toptan teklif
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
              {HARDWARE_GROUPS.length} teknik hırdavat ürün grubu
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
