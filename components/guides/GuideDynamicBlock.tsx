import Link from "next/link";
import type { ReactNode } from "react";
import {
  PRODUCT_GROUPS,
  getProductById,
  parseKoli,
  productHref,
  type CategoryName,
  type ProductGroup,
} from "@/data/products";
import { getCategoryByName } from "@/data/categories";
import type { GuideDynamicKind } from "@/data/guides";
import GuideTable, { NotStated, Yes } from "./GuideTable";
import GuideSizeMixer, { type SizeMixerProduct } from "./GuideSizeMixer";
import {
  EN407_LABELS,
  TDM_THRESHOLDS,
  describeLevel,
  describeTdm,
  formatSizeRange,
  parseChemProtection,
  parseEn12477Type,
  parseEn388,
  parseEn407,
  parseNumericSizes,
} from "./standards";

/*
 * Ürün verisinden (data/products.ts) canlı üretilen rehber blokları.
 * Kod, tip veya beden bilgisi verisi olmayan ürün için hücre "belirtilmemiş" gösterilir; hiçbir değer uydurulmaz.
 */

const GLOVE_CATEGORIES: CategoryName[] = [
  "Nitril Kaplı İş Eldivenleri",
  "Köpük Nitril Eldivenler",
  "Kesilmeye Dirençli Eldivenler",
  "Kaynakçı ve Sürücü Eldivenleri",
];
const FULL_BODY_CATEGORIES: CategoryName[] = ["Kimyasal Koruyucu Tulumlar", "Tek Kullanımlık Tulumlar"];
const PARTIAL_BODY_CATEGORIES: CategoryName[] = ["Önlük ve Laboratuvar Önlüğü", "Kolluk, Galoş ve Başlık"];

const inCategories = (cats: CategoryName[]) => PRODUCT_GROUPS.filter((p) => cats.includes(p.category));

const shortCat = (name: CategoryName) => getCategoryByName(name)?.shortName ?? name;

function koliText(p: ProductGroup): ReactNode {
  const k = parseKoli(p.koli);
  return <span className="whitespace-nowrap">{k ? `${k.perCarton.toLocaleString("tr-TR")} ${k.unit}` : p.koli}</span>;
}

function ProductLinks({ products }: { products: ProductGroup[] }) {
  return (
    <>
      {products.map((p, i) => (
        <span key={p.id}>
          {i > 0 && ", "}
          <Link href={productHref(p)} className="whitespace-nowrap text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand">
            FABA {p.code}
          </Link>
        </span>
      ))}
    </>
  );
}

/** Aynı anahtarı paylaşan ürünleri katalog sırasını koruyarak gruplar. */
function groupBy<T>(items: T[], key: (x: T) => string): T[][] {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    const list = map.get(k);
    if (list) list.push(it);
    else map.set(k, [it]);
  }
  return Array.from(map.values());
}

const mono = (s: string) => <span className="font-mono text-[13px] font-semibold tracking-wide text-ink">{s}</span>;

/* ── EN 388 ─────────────────────────────────────────────────────────────── */

function En388Example({ productId }: { productId?: number }) {
  const p = productId ? getProductById(productId) : undefined;
  const c = p ? parseEn388(p) : null;
  if (!p || !c) return null;

  const rows: { ch: string; label: string; text: string }[] = [
    { ch: c.abrasion, label: "Aşınma direnci", text: describeLevel(c.abrasion, 4) },
    {
      ch: c.cut,
      label: "Kesilme direnci (coupe)",
      text:
        c.cut === "X" && c.tdm && c.tdm !== "X"
          ? `${describeLevel(c.cut, 5)}. Kesilme için TDM sonucu esas alınır.`
          : describeLevel(c.cut, 5),
    },
    { ch: c.tear, label: "Yırtılma direnci", text: describeLevel(c.tear, 4) },
    { ch: c.puncture, label: "Delinme direnci", text: describeLevel(c.puncture, 4) },
  ];
  if (c.tdm) rows.push({ ch: c.tdm, label: "TDM kesilme (EN ISO 13997)", text: describeTdm(c.tdm) });
  if (c.impact) rows.push({ ch: "P", label: "Darbe koruması", text: "Darbe testi geçildi" });

  return (
    <div className="my-6 rounded-2xl border border-line bg-white p-4 shadow-2xs sm:p-5">
      <p className="text-sm text-ink-soft">
        Örnek:{" "}
        <Link href={productHref(p)} className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand">
          FABA {p.code}
        </Link>{" "}
        <span className="text-ink-muted">({shortCat(p.category)})</span>
      </p>
      <p className="mt-1 text-xl font-bold text-ink sm:text-2xl">
        EN 388 kodu: <span className="font-mono tracking-wider">{c.code}</span>
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-3">
            <dt className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-mono text-base font-bold text-brand">
              <span className="sr-only">{r.label}: </span>
              {r.ch}
            </dt>
            <dd className="text-sm leading-snug">
              <span className="block font-medium text-ink" aria-hidden>
                {r.label}
              </span>
              <span className="text-ink-soft">{r.text}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function En388Table({ caption, note }: { caption: string; note?: string }) {
  const coded = inCategories(GLOVE_CATEGORIES)
    .map((p) => ({ p, c: parseEn388(p) }))
    .filter((x): x is { p: ProductGroup; c: NonNullable<ReturnType<typeof parseEn388>> } => x.c !== null);
  if (coded.length === 0) return null;
  const groups = groupBy(coded, (x) => `${x.p.category}|${x.c.code}`);
  const anyImpact = coded.some((x) => x.c.impact);

  const head = ["Ürün", "Kod", "Aşınma", "Kesilme (coupe)", "Yırtılma", "Delinme", "TDM", ...(anyImpact ? ["Darbe"] : [])];
  const rows: ReactNode[][] = groups.map((g) => {
    const c = g[0].c;
    return [
      <span key="u" className="font-normal">
        <ProductLinks products={g.map((x) => x.p)} />
        <span className="mt-0.5 block text-xs text-ink-muted">{shortCat(g[0].p.category)}</span>
      </span>,
      mono(c.code),
      c.abrasion,
      c.cut,
      c.tear,
      c.puncture,
      c.tdm ? (TDM_THRESHOLDS[c.tdm] ? `${c.tdm} (${TDM_THRESHOLDS[c.tdm]})` : c.tdm) : <NotStated key="tdm" />,
      ...(anyImpact ? [c.impact ? "P" : <NotStated key="i" />] : []),
    ];
  });

  return (
    <GuideTable
      id="en388-urunler"
      caption={caption}
      head={head}
      rows={rows}
      note={
        <>
          {note ? `${note} ` : ""}X: test edilmedi veya uygulanamadı. Kodlar ürün sayfalarındaki standart bilgisinden alınır.
        </>
      }
    />
  );
}

/* ── Kimyasal koruyucu giysiler ─────────────────────────────────────────── */

function typesCell(types: string[], others: string[]): ReactNode {
  if (types.length > 0) return types.map((t) => `Tip ${t}`).join(", ");
  if (others.length > 0) return `Tip belirtilmemiş (${others.join(", ")})`;
  return <NotStated />;
}

function ChemTable({ scope, caption }: { scope: "full" | "partial"; caption: string }) {
  const products = inCategories(scope === "full" ? FULL_BODY_CATEGORIES : PARTIAL_BODY_CATEGORIES);
  if (products.length === 0) return null;

  const rows: ReactNode[][] = products.map((p) => {
    const c = parseChemProtection(p);
    const types = scope === "full" ? [...c.fullBody, ...c.partialBody] : [...c.partialBody, ...c.fullBody];
    const base: ReactNode[] = [
      <span key="u" className="font-normal">
        <ProductLinks products={[p]} />
        <span className="mt-0.5 block text-xs text-ink-muted">{shortCat(p.category)}</span>
      </span>,
      typesCell(types, c.otherStandards),
      c.infective ? <Yes key="b" /> : <NotStated key="b" />,
      c.antistatic ? <Yes key="a" /> : <NotStated key="a" />,
    ];
    if (scope === "full") base.push(c.radioactive ? <Yes key="r" /> : <NotStated key="r" />);
    base.push(koliText(p));
    return base;
  });

  const head =
    scope === "full"
      ? ["Ürün", "Belgelenmiş tipler", "EN 14126 (B)", "EN 1149-5", "EN 1073-2", "Koli içi"]
      : ["Ürün", "Kısmi koruma tipi", "EN 14126 (B)", "EN 1149-5", "Koli içi"];

  return (
    <GuideTable
      id={scope === "full" ? "tulum-tipleri" : "kismi-koruma-tipleri"}
      caption={caption}
      head={head}
      rows={rows}
      note="Bilgiler ürün sayfalarındaki standart listesinden alınır. “—”: ürün verisinde belirtilmemiş. Satın almadan önce etiket ve teknik föyle karşılaştırın."
    />
  );
}

/* ── Kaynakçı eldivenleri ───────────────────────────────────────────────── */

const CONTACT_TEMPS: Record<string, string> = { "1": "100 °C", "2": "250 °C", "3": "350 °C", "4": "500 °C" };

function En407Table({ caption }: { caption: string }) {
  const coded = inCategories(["Kaynakçı ve Sürücü Eldivenleri"]).map((p) => ({ p, c: parseEn407(p) })).filter(
    (x): x is { p: ProductGroup; c: NonNullable<ReturnType<typeof parseEn407>> } => x.c !== null,
  );
  if (coded.length === 0) return null;
  const groups = groupBy(coded, (x) => x.c.code);

  // Satırlar: 6 hane · Sütunlar: katalogdaki her farklı kod (dar ekranda da okunur)
  const head: ReactNode[] = [
    "Hane",
    ...groups.map((g) => (
      <span key={g[0].c.code} className="block font-normal">
        <span className="block font-mono text-[13px] font-semibold tracking-wide text-ink">{g[0].c.code}</span>
        <span className="mt-1 block text-xs">
          <ProductLinks products={g.map((x) => x.p)} />
        </span>
      </span>
    )),
  ];
  const rows: ReactNode[][] = EN407_LABELS.map((label, i) => [
    `${i + 1}. ${label}`,
    ...groups.map((g) => {
      const d = g[0].c.digits[i];
      return i === 1 && CONTACT_TEMPS[d] ? `${d} (${CONTACT_TEMPS[d]})` : d;
    }),
  ]);

  return (
    <GuideTable
      id="en407-urunler"
      caption={caption}
      head={head}
      rows={rows}
      note="X: bu özellik test edilmedi. Seviyeler 0–4 arasıdır. Kodlar ürün sayfalarındaki standart bilgisinden alınır."
    />
  );
}

function WeldingTable({ caption }: { caption: string }) {
  const products = inCategories(["Kaynakçı ve Sürücü Eldivenleri"]);
  if (products.length === 0) return null;

  const rows: ReactNode[][] = products.map((p) => {
    const type = parseEn12477Type(p);
    const en407 = parseEn407(p);
    const en388 = parseEn388(p);
    return [
      <span key="u" className="font-normal">
        <ProductLinks products={[p]} />
      </span>,
      type ? `Tip ${type}` : <NotStated key="t" />,
      en407 ? mono(en407.code) : <NotStated key="h" />,
      en388 ? mono(en388.code) : <NotStated key="m" />,
      formatSizeRange(p.sizes),
      koliText(p),
    ];
  });

  return (
    <GuideTable
      id="kaynak-eldivenleri"
      caption={caption}
      head={["Ürün", "EN 12477", "EN 407", "EN 388", "Beden", "Koli içi"]}
      rows={rows}
      note="“—”: ürün verisinde belirtilmemiş. Satın almadan önce etiket ve teknik föyle karşılaştırın."
    />
  );
}

/* ── Bedenler ───────────────────────────────────────────────────────────── */

function GloveSizesTable({ caption }: { caption: string }) {
  const products = inCategories(GLOVE_CATEGORIES);
  if (products.length === 0) return null;
  const groups = groupBy(products, (p) => `${p.category}|${p.sizes}|${p.koli}`);

  const rows: ReactNode[][] = groups.map((g) => [
    <span key="u" className="font-normal">
      <ProductLinks products={g} />
      <span className="mt-0.5 block text-xs text-ink-muted">{shortCat(g[0].category)}</span>
    </span>,
    formatSizeRange(g[0].sizes),
    koliText(g[0]),
  ]);
  // Beden listesi sayı içermeyen modeller (ör. "Teklifte teyit edilir")
  const hasOpenSizes = products.some((p) => !/\d/.test(p.sizes));

  return (
    <GuideTable
      id="eldiven-bedenleri"
      caption={caption}
      head={["Ürün", "Bedenler", "Koli içi"]}
      rows={rows}
      note={`Aynı beden ve koli bilgisine sahip modeller tek satırda gösterilir.${
        hasOpenSizes ? " Beden aralığı numara olarak yazılmayan modellerde bedenler teklif aşamasında netleşir." : ""
      }`}
    />
  );
}

function SizeMixer({ caption }: { caption: string }) {
  const options: SizeMixerProduct[] = inCategories(GLOVE_CATEGORIES)
    .map((p) => {
      const sizes = parseNumericSizes(p.sizes);
      const k = parseKoli(p.koli);
      return {
        id: p.id,
        code: p.code,
        title: p.title,
        slug: p.slug,
        sizes,
        koli: p.koli,
        perCarton: k?.perCarton ?? null,
        unit: k?.unit ?? null,
      };
    })
    .filter((x) => x.sizes.length >= 2);
  if (options.length === 0) return null;
  return <GuideSizeMixer products={options} title={caption} />;
}

/* ── Yönlendirici ───────────────────────────────────────────────────────── */

export default function GuideDynamicBlock({
  kind,
  caption,
  productId,
  note,
}: {
  kind: GuideDynamicKind;
  caption?: string;
  productId?: number;
  note?: string;
}) {
  switch (kind) {
    case "en388-example":
      return <En388Example productId={productId} />;
    case "en388-table":
      return <En388Table caption={caption ?? "Eldivenlerin EN 388 kodları"} note={note} />;
    case "chem-full":
      return <ChemTable scope="full" caption={caption ?? "Tulumların koruma tipleri"} />;
    case "chem-partial":
      return <ChemTable scope="partial" caption={caption ?? "Kısmi koruyucuların tipleri"} />;
    case "en407-table":
      return <En407Table caption={caption ?? "EN 407 kodları"} />;
    case "welding-table":
      return <WeldingTable caption={caption ?? "Kaynakçı ve sürücü eldivenleri"} />;
    case "glove-sizes":
      return <GloveSizesTable caption={caption ?? "Eldiven bedenleri"} />;
    case "size-mixer":
      return <SizeMixer caption={caption ?? "Beden bazında teklif listesi"} />;
    default:
      return null;
  }
}
