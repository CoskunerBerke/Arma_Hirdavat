import type { ReactNode } from "react";

interface Props {
  /** Benzersiz id (başlık ilişkilendirmesi için) */
  id: string;
  caption: string;
  head: ReactNode[];
  rows: ReactNode[][];
  note?: ReactNode;
  /** İlk sütunu satır başlığı (th scope="row") olarak işaretle */
  rowHeader?: boolean;
  /** Hücreler kısaysa true: mobilde yatay kaydırma yerine sütunlar daralır */
  fitMobile?: boolean;
}

/**
 * Rehber tablosu. Dar ekranda tablo kendi içinde yatay kayar (sayfa kaymaz);
 * kaydırma alanı klavyeyle odaklanabilir ve başlığıyla adlandırılır.
 */
export default function GuideTable({ id, caption, head, rows, note, rowHeader = true, fitMobile = false }: Props) {
  const captionId = `${id}-baslik`;
  // Dar sütunlu tablolar mobilde satır kaydırır; çok sütunlu tablolar kendi içinde yatay kayar.
  const minWidth = fitMobile || head.length <= 3 ? "" : head.length <= 5 ? "min-w-[34rem]" : "min-w-[44rem]";
  return (
    <figure className="my-6">
      <figcaption id={captionId} className="mb-2 text-sm font-semibold text-ink">
        {caption}
      </figcaption>
      <div
        role="region"
        aria-labelledby={captionId}
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-line bg-white shadow-2xs"
      >
        <table aria-labelledby={captionId} className={`w-full border-collapse text-left text-sm ${minWidth}`}>
          <thead className="bg-slate-50">
            <tr>
              {head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`border-b border-line px-3 py-2.5 align-bottom text-xs font-semibold text-ink-soft sm:px-4 ${minWidth ? "whitespace-nowrap" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-line last:border-b-0 even:bg-slate-50/50">
                {row.map((cell, c) =>
                  c === 0 && rowHeader ? (
                    <th key={c} scope="row" className="px-3 py-2.5 align-top font-semibold text-ink sm:px-4">
                      {cell}
                    </th>
                  ) : (
                    <td key={c} className="px-3 py-2.5 align-top text-ink-soft sm:px-4">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{note}</p>}
    </figure>
  );
}

/** Belirtilmemiş hücre: görünürde "—", ekran okuyucuda "Belirtilmemiş". */
export function NotStated() {
  return (
    <>
      <span aria-hidden>—</span>
      <span className="sr-only">Belirtilmemiş</span>
    </>
  );
}

/** "Evet" hücresi */
export function Yes() {
  return <span className="font-medium text-action">Evet</span>;
}
