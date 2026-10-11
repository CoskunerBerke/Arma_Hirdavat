import Image from "next/image";
import Reveal from "./Reveal";
import { CLIENT_REFERENCES } from "@/data/company";

/*
 * Referanslar — koyu bant, beyaz logolu cam kartlar + altta kayan logo şeridi (sunucu bileşeni).
 * - Logolar tek renk beyaz gösterilir (brightness-0 invert): farklı renkteki logolar tek bir kurumsal görünüme kavuşur.
 * - Kartlarda periyodik ışık süzülmesi (.shine-card), üzerine gelince yükselme + parlama.
 * - Kayan şerit yalnızca dekoratiftir (aria-hidden); erişilebilir adlar kartlardadır.
 * - Liste data/company.ts → CLIENT_REFERENCES'tan gelir. İşletme sahibi her firmanın
 *   logosunun kullanımı için yazılı onay almalıdır; onayı olmayan firmayı oradan silin.
 */
interface ClientLogosProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ClientLogos({
  title = "Türkiye'nin büyük sanayi kuruluşlarına tedarik sağlıyoruz",
  description = "Fabrikalara, şantiyelere ve üretim tesislerine iş güvenliği ürünleri ve teknik hırdavat tedarik ediyoruz.",
  className = "",
}: ClientLogosProps) {
  if (CLIENT_REFERENCES.length === 0) return null;
  // Geniş ekranda da boşluk kalmaması için şeridin her yarısında liste 3 kez tekrarlanır
  const stripe = [...CLIENT_REFERENCES, ...CLIENT_REFERENCES, ...CLIENT_REFERENCES];

  return (
    <section
      id="referanslar"
      aria-labelledby="referanslar-baslik"
      className={`relative isolate overflow-hidden bg-gradient-to-br from-[#0B1528] via-[#0F1B2D] to-[#0B2A6B] py-16 sm:py-20 ${className}`}
    >
      {/* Arka plan ışımaları */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Referanslarımız</p>
          <h2 id="referanslar-baslik" className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>}
        </Reveal>

        <ul className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {CLIENT_REFERENCES.map((client, i) => (
            <Reveal
              as="li"
              key={client.name}
              delay={i * 90}
              className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)]"
            >
              <div
                className="shine-card group flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-7 text-center shadow-lg shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-sky-300/40 hover:bg-white/[0.1] hover:shadow-[0_18px_50px_-12px_rgba(56,189,248,0.35)]"
                style={{ ["--shine-delay" as string]: `${i * 1.2}s` } as React.CSSProperties}
              >
                <div className="relative h-11 w-full sm:h-14">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logosu`}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain opacity-80 brightness-0 invert transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-4 text-xs font-semibold text-slate-300 transition-colors group-hover:text-white sm:text-sm">
                  {client.name}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Kayan logo şeridi (dekoratif) */}
      <div
        aria-hidden
        className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="river-track river-free flex w-max" style={{ ["--river-duration" as string]: "45s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
              {stripe.map((client, i) => (
                <li key={`${copy}-${i}`} className="relative h-8 w-36 shrink-0 sm:h-10 sm:w-44">
                  <Image
                    src={client.logo}
                    alt=""
                    fill
                    sizes="176px"
                    className="object-contain opacity-35 brightness-0 invert"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
