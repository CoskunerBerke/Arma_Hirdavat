import { Info, TriangleAlert } from "lucide-react";
import type { GuideBlock, GuideSection } from "@/data/guides";
import { renderRichText } from "./RichText";
import GuideTable from "./GuideTable";
import GuideDynamicBlock from "./GuideDynamicBlock";

/** Kısa hücreli tablolar mobilde yatay kaydırma yerine sığdırılır (başlıklar alt satıra kayabilir). */
function isCompact(head: string[], rows: string[][]): boolean {
  return head.every((c) => c.length <= 24) && rows.flat().every((c) => c.length <= 16);
}

function Block({ block, sectionId, index }: { block: GuideBlock; sectionId: string; index: number }) {
  switch (block.type) {
    case "p":
      return <p className="mt-4 text-base leading-7 text-ink-soft">{renderRichText(block.text)}</p>;
    case "h3":
      return <h3 className="mt-8 text-lg font-semibold tracking-tight text-ink sm:text-xl">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-7 text-ink-soft marker:text-brand">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">
              {renderRichText(it)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-7 text-ink-soft marker:font-semibold marker:text-brand">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">
              {renderRichText(it)}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <GuideTable
          id={`${sectionId}-tablo-${index}`}
          caption={block.caption}
          head={block.head}
          rows={block.rows.map((r) => r.map((c) => renderRichText(c)))}
          note={block.note ? renderRichText(block.note) : undefined}
          fitMobile={isCompact(block.head, block.rows)}
        />
      );
    case "callout": {
      const warn = block.tone === "warning";
      const Icon = warn ? TriangleAlert : Info;
      return (
        <div
          role="note"
          className={`my-6 flex gap-3 rounded-xl border p-4 ${
            warn ? "border-amber-200 bg-amber-50 text-amber-950" : "border-brand-100 bg-brand-50 text-ink"
          }`}
        >
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${warn ? "text-amber-700" : "text-brand"}`} aria-hidden />
          <div className="text-sm leading-6">
            {block.title && <p className="font-semibold">{block.title}</p>}
            <p className={block.title ? "mt-1" : undefined}>{renderRichText(block.text)}</p>
          </div>
        </div>
      );
    }
    case "dynamic":
      return <GuideDynamicBlock kind={block.kind} caption={block.caption} productId={block.productId} note={block.note} />;
    default:
      return null;
  }
}

/** Rehber bölümleri: her bölüm bir H2 ve içindekiler tablosunun hedefi. */
export default function GuideSections({ sections }: { sections: GuideSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 pt-10 first:pt-0">
          <h2 id={`${s.id}-h`} className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
            {s.title}
          </h2>
          {s.blocks.map((b, i) => (
            <Block key={i} block={b} sectionId={s.id} index={i} />
          ))}
        </section>
      ))}
    </>
  );
}
