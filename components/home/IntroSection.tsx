import Link from "next/link";
import { ArrowRight, Boxes, Truck } from "lucide-react";
import { COMPANY } from "@/data/company";

/*
 * Ana sayfa tanıtım metni (sunucu bileşeni): firmanın ne sattığını, nasıl paketleyip nereye sevk ettiğini anlatır.
 * Ürün grupları firmanın kendi ürün grubu listesinden (data/company.ts → HARDWARE_GROUPS) özetlenmiştir.
 */
const PRODUCT_CHIPS = [
  "Pompa ve hidrofor sistemleri",
  "Cıvata, somun ve bağlantı elemanları",
  "Hortum, vana ve boru ek parçaları",
  "İş güvenliği malzemeleri",
  "Kesici ve aşındırıcı taşlar",
  "El ve elektrikli aletler",
  "Kaynak makineleri ve sarf malzemeleri",
  "Endüstriyel kimyasallar ve yapıştırıcılar",
];

const LINK_CLASS =
  "inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink";

export default function IntroSection() {
  return (
    <section aria-labelledby="tanitim-baslik" className="border-b border-line bg-white py-12 sm:py-16">
      <div className="container-x">
        <div className="max-w-4xl">
          <h2 id="tanitim-baslik" className="text-2xl font-extrabold leading-tight tracking-tight text-accent-ink sm:text-3xl">
            Hırdavat ve Fabrika Malzemelerinde Kurumsal Tedarik
          </h2>
          <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <div className="mt-5 space-y-4 text-base leading-[1.75] text-ink-soft sm:text-[17px]">
            <p>
              {COMPANY.name}; pompa ve hidrofor sistemlerinden cıvata, somun ve bağlantı elemanlarına, hortum ve vanalardan
              kesici-aşındırıcı taşlara, el ve elektrikli aletlerden iş güvenliği malzemelerine kadar fabrikaların,
              şantiyelerin ve atölyelerin ihtiyaç duyduğu teknik hırdavat ve fabrika malzemelerini tedarik eder.
            </p>
            <p>
              Siparişlerinizi <strong className="font-semibold text-ink">koli ve palet</strong> bazında hazırlıyor,
              <strong className="font-semibold text-ink"> Türkiye&apos;nin dört bir yanına</strong> fabrikalara, şantiyelere ve
              organize sanayi bölgelerine kurumsal olarak sevk ediyoruz.
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Tedarik ettiğimiz başlıca ürün grupları">
          {PRODUCT_CHIPS.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent"
            >
              {c}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-navy">
          <li className="inline-flex items-center gap-2">
            <Boxes className="h-5 w-5 text-accent-ink" aria-hidden />
            Koli ve palet bazında sevk
          </li>
          <li className="inline-flex items-center gap-2">
            <Truck className="h-5 w-5 text-accent-ink" aria-hidden />
            Türkiye&apos;nin dört bir yanına kurumsal sevk
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
          <Link href="/urun-gruplari" className={LINK_CLASS}>
            Ürün gruplarımız
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/urunler" className={LINK_CLASS}>
            İş güvenliği ürünleri
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/kurumsal" className={LINK_CLASS}>
            Hakkımızda
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
