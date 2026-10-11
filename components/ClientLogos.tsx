import Image from "next/image";
import { CLIENT_REFERENCES } from "@/data/company";

/*
 * Referanslar — hero'nun hemen altındaki kompakt, açık renkli güven şeridi (sunucu bileşeni).
 * - Masaüstünde 5 logo tek satır; mobilde ortalı 3+2 / 2+2+1 sarar.
 * - Logolar tek renk antrasit (brightness-0 + düşük opaklık); üzerine gelince tam opak ve hafif yükselme.
 * - Liste ve sıra data/company.ts → CLIENT_REFERENCES'tan gelir (işletme sahibinin logo kullanım onayı var).
 * - id="referanslar": menüdeki "Referanslarımız" bağlantısı buraya gelir.
 */
interface ClientLogosProps {
  title?: string;
  className?: string;
}

export default function ClientLogos({
  title = "Birlikte Çalıştığımız Sanayi Devleri (Referanslarımız)",
  className = "",
}: ClientLogosProps) {
  if (CLIENT_REFERENCES.length === 0) return null;

  return (
    <section
      id="referanslar"
      aria-labelledby="referanslar-baslik"
      className={`scroll-mt-24 border-b border-line bg-slate-50 py-5 sm:py-7 ${className}`}
    >
      <div className="container-x">
        <h2
          id="referanslar-baslik"
          className="text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-muted sm:text-[13px]"
        >
          {title}
        </h2>

        <ul className="mx-auto mt-4 flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mt-5 sm:gap-x-10 lg:flex-nowrap lg:justify-between lg:gap-x-12">
          {CLIENT_REFERENCES.map((client) => (
            <li
              key={client.name}
              className="flex w-[calc(33.333%-1rem)] min-w-[92px] justify-center sm:w-auto lg:flex-1"
            >
              <div
                className="group relative h-10 w-full max-w-[150px] transition duration-300 hover:-translate-y-0.5 sm:h-11 sm:w-[150px] lg:h-12 lg:max-w-[170px]"
                title={client.name}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logosu`}
                  fill
                  sizes="(min-width: 1024px) 170px, 150px"
                  className="object-contain opacity-60 brightness-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
