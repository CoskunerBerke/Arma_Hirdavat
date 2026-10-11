import Link from "next/link";
import { ArrowRight, Calculator, ClipboardList, FileCheck2, Store, Truck, Wrench } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { COMPANY, CTA, HARDWARE_GROUPS, HOURS_TEXT, PROMISES } from "@/data/company";

/*
 * "Neden Arma Hırdavat?" — yalnızca doğrulanabilir değer önerileri (sunucu bileşeni).
 * Sertifika, yetkili bayilik, "en uygun fiyat" gibi belgelenmemiş iddialar EKLEMEYİN.
 */
export default function WhyArma() {
  const items = [
    {
      icon: FileCheck2,
      title: "Belgeli ürün bilgisi",
      text: `${PROMISES.documentation} Beden, koli içi adet ve kullanım alanları da aynı sayfadadır.`,
      href: "/urunler",
      linkLabel: "Ürün sayfalarına göz atın",
    },
    {
      icon: Calculator,
      title: "Koli bazında toptan fiyat",
      text: "Fiyatı miktarınıza, koli ya da palet tercihinize ve teslimat ilinize göre hesaplar, yazılı teklif olarak iletiriz.",
    },
    {
      icon: Truck,
      title: "Türkiye'nin 81 iline sevkiyat",
      text: PROMISES.delivery,
    },
    {
      icon: Store,
      title: "Tekkeköy'de fiziki mağaza",
      text: `Ürünleri yerinde görmek ya da az miktarda almak için mağazamıza gelebilirsiniz. Açık olduğumuz saatler: ${HOURS_TEXT}.`,
      href: "#fiziki-magaza",
      linkLabel: "Mağaza bilgileri",
    },
    {
      icon: Wrench,
      title: `${HARDWARE_GROUPS.length} ürün grubunda teknik hırdavat`,
      text: "Bağlantı elemanlarından el aletlerine, kaynak ekipmanından pnömatiğe. Katalogda olmayan ürünü teklif formuna yazmanız yeterli.",
      href: "/urun-gruplari",
      linkLabel: "Ürün gruplarını görün",
    },
  ];

  return (
    <section aria-labelledby="neden-arma-baslik" className="border-y border-line bg-gradient-to-b from-white to-canvas py-14 sm:py-20 lg:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Neden Arma Hırdavat?</p>
          <h2 id="neden-arma-baslik" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Açık ürün bilgisi, yazılı teklif, gerçek bir mağaza
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            {COMPANY.legalName}; Samsun Tekkeköy&apos;deki mağaza ve deposundan fabrikalara, şantiyelere ve atölyelere
            tedarik sağlar. Web sitemiz {COMPANY.onlineSince} yılından beri yayında.
          </p>
          <Link href="/kurumsal" className="btn-ghost mt-6 min-h-[44px]">
            Kurumsal profilimiz <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
          {items.map((v) => (
            <li key={v.title} className="surface flex flex-col p-5 sm:p-6">
              <div className="flex items-center gap-3 sm:block">
                <span className="icon-tile" aria-hidden>
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-ink sm:mt-4">{v.title}</h3>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft sm:mt-2">{v.text}</p>
              {v.href && v.linkLabel && (
                <Link
                  href={v.href}
                  className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
                >
                  {v.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </li>
          ))}

          <li className="flex flex-col justify-between rounded-2xl bg-brand p-6 text-white shadow-md shadow-brand/20">
            <div>
              <h3 className="text-base font-semibold">Listeniz hazır mı?</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100">
                Ürünleri, bedenleri ve koli adetlerini yazın; teklifiniz e-postanıza gelsin.
              </p>
            </div>
            <div className="mt-5">
              <RfqTriggerButton className="btn-action min-h-[48px] w-full">
                <ClipboardList className="h-4 w-4" aria-hidden />
                <span>{CTA.primary}</span>
              </RfqTriggerButton>
              <p className="mt-2 text-center text-xs text-blue-100">{PROMISES.quoteReassurance}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
