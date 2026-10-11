import Link from "next/link";
import {
  ArrowRight,
  Bolt,
  Boxes,
  Cable,
  Disc3,
  Drill,
  Droplets,
  Flame,
  FlaskConical,
  HardHat,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { COMPANY } from "@/data/company";

/*
 * Ana sayfa tanıtım bölümü (sunucu bileşeni): firmanın ne sattığını, nasıl paketleyip nereye sevk ettiğini anlatır.
 * SEO: başlık + metin + ürün grubu adları sunucuda düz metin olarak render edilir (aramada görünür).
 * Ürün grupları firmanın kendi ürün grubu listesinden (data/company.ts → HARDWARE_GROUPS) özetlenmiştir.
 */
const GROUPS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Pompa ve hidrofor sistemleri", icon: Droplets, href: "/urun-gruplari" },
  { label: "Cıvata, somun ve bağlantı elemanları", icon: Bolt, href: "/urun-gruplari" },
  { label: "Hortum, vana ve boru ek parçaları", icon: Cable, href: "/urun-gruplari" },
  { label: "İş güvenliği malzemeleri", icon: HardHat, href: "/urunler" },
  { label: "Kesici ve aşındırıcı taşlar", icon: Disc3, href: "/urun-gruplari" },
  { label: "El ve elektrikli aletler", icon: Drill, href: "/urun-gruplari" },
  { label: "Kaynak makineleri ve sarf malzemeleri", icon: Flame, href: "/urun-gruplari" },
  { label: "Endüstriyel kimyasallar ve yapıştırıcılar", icon: FlaskConical, href: "/urun-gruplari" },
];

const LINK_CLASS =
  "inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink";

export default function IntroSection() {
  return (
    <section aria-labelledby="tanitim-baslik" className="relative overflow-hidden border-b border-line bg-canvas py-16 sm:py-20">
      {/* Dekoratif arka plan ışıması */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        {/* Metin */}
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">Ne tedarik ediyoruz?</p>
          <h2 id="tanitim-baslik" className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-4xl">
            Hırdavat ve Fabrika Malzemelerinde <span className="text-accent-ink">Kurumsal Tedarik</span>
          </h2>
          <span aria-hidden className="mt-5 block h-1 w-16 rounded-full bg-accent" />
          <div className="mt-6 space-y-4 text-base leading-[1.75] text-ink-soft">
            <p>
              {COMPANY.name}; pompa ve hidrofor sistemlerinden cıvata, somun ve bağlantı elemanlarına, hortum ve vanalardan
              kesici-aşındırıcı taşlara, el ve elektrikli aletlerden iş güvenliği malzemelerine kadar fabrikaların,
              şantiyelerin ve atölyelerin ihtiyaç duyduğu teknik hırdavat ve fabrika malzemelerini tedarik eder.
            </p>
            <p>
              Siparişlerinizi koli ve palet bazında hazırlıyor, Türkiye&apos;nin dört bir yanına fabrikalara, şantiyelere ve
              organize sanayi bölgelerine kurumsal olarak sevk ediyoruz.
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-3">
            <li className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
              <Boxes className="h-4 w-4 text-accent" aria-hidden />
              Koli ve palet bazında sevk
            </li>
            <li className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
              <Truck className="h-4 w-4 text-accent" aria-hidden />
              Türkiye&apos;nin dört bir yanına kurumsal sevk
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/urun-gruplari" className={LINK_CLASS}>
              Ürün gruplarımız
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/kurumsal" className={LINK_CLASS}>
              Hakkımızda
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        {/* Ürün grupları */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7" aria-label="Tedarik ettiğimiz başlıca ürün grupları">
          {GROUPS.map((g, i) => (
            <Reveal as="li" key={g.label} delay={(i % 4) * 60} className="min-w-0">
              <Link
                href={g.href}
                className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg sm:gap-4 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-accent sm:h-12 sm:w-12">
                  <g.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                </span>
                <span className="min-w-0 text-sm font-semibold leading-snug text-ink sm:text-[15px]">{g.label}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
