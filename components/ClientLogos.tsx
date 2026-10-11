import Image from "next/image";
import { CLIENT_REFERENCES } from "@/data/company";

/*
 * Referans logoları — sade, sabit satır (sunucu bileşeni).
 * - Logolar tek renk (brightness-0) gösterilir: beyaz / şeffaf PNG logolar açık zeminde de görünür.
 * - Kayan şerit, dış bağlantı ve "Ağır Sanayi Devi" gibi üstünlük rozetleri YOK.
 * - Liste data/company.ts → CLIENT_REFERENCES'tan gelir. İşletme sahibi her firmanın
 *   logosunun kullanımı için yazılı onay almalıdır; onayı olmayan firmayı oradan silin.
 */
interface ClientLogosProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ClientLogos({
  title = "Tedarik sağladığımız firmalardan bazıları",
  description = "Fabrikalara, şantiyelere ve atölyelere iş güvenliği ürünleri ve teknik hırdavat tedarik ediyoruz.",
  className = "",
}: ClientLogosProps) {
  if (CLIENT_REFERENCES.length === 0) return null;

  return (
    <section aria-labelledby="referanslar-baslik" className={`border-y border-line bg-white py-10 sm:py-14 ${className}`}>
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 id="referanslar-baslik" className="text-lg font-bold tracking-tight text-ink sm:text-xl">
            {title}
          </h2>
          {description && <p className="mt-1.5 text-sm text-ink-soft">{description}</p>}
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CLIENT_REFERENCES.map((client) => (
            <li
              key={client.name}
              className="flex flex-col items-center justify-center rounded-2xl border border-line bg-canvas/60 px-4 py-5 text-center max-sm:[&:last-child:nth-child(odd)]:col-span-2"
            >
              <div className="relative h-10 w-full sm:h-12">
                <Image
                  src={client.logo}
                  alt={`${client.name} logosu`}
                  fill
                  sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
                  className="object-contain opacity-60 brightness-0"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-ink-soft">{client.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
