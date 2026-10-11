import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { getCategoryBySlug, categoryHref } from "@/data/categories";
import { formatKoliTotal, getProductById, productHref } from "@/data/products";
import { getGuide, guideHref } from "@/data/guides";

/*
 * Rehber metinlerindeki satır içi işaretleri çizer (sözdizimi: data/guides.ts başı).
 * Çözülemeyen bağlantı düz metne, çözülemeyen işaret boş metne döner; bozuk link üretilmez.
 */

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\{\{[a-z]+:[^}]+\}\})/g;

function resolveLink(label: string, href: string): { label: string; href: string | null } {
  if (href.startsWith("cat:")) {
    const c = getCategoryBySlug(href.slice(4));
    return { label, href: c ? categoryHref(c.name) : null };
  }
  if (href.startsWith("product:")) {
    const p = getProductById(Number(href.slice(8)));
    if (!p) return { label: label === "$code" || label === "$title" ? "" : label, href: null };
    const text = label === "$code" ? `FABA ${p.code}` : label === "$title" ? p.title : label;
    return { label: text, href: productHref(p) };
  }
  if (href.startsWith("guide:")) {
    const g = getGuide(href.slice(6));
    return { label, href: g ? guideHref(g.slug) : null };
  }
  if (href.startsWith("/")) return { label, href };
  return { label, href: null };
}

function resolveToken(token: string): string {
  const [kind, ...args] = token.slice(2, -2).split(":");
  if (kind === "code") {
    const p = getProductById(Number(args[0]));
    return p ? p.code : "";
  }
  if (kind === "koli") {
    const p = getProductById(Number(args[0]));
    const n = Number(args[1]);
    return p ? formatKoliTotal(p, n) ?? "" : "";
  }
  return "";
}

export function renderRichText(text: string): ReactNode {
  const parts = text.split(TOKEN).filter((s) => s !== "");
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("{{") && part.endsWith("}}")) {
      return <Fragment key={i}>{resolveToken(part)}</Fragment>;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const { label, href } = resolveLink(link[1], link[2]);
      if (!href) return <Fragment key={i}>{label}</Fragment>;
      return (
        <Link
          key={i}
          href={href}
          className="font-medium text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand"
        >
          {label}
        </Link>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function RichText({ text }: { text: string }) {
  return <>{renderRichText(text)}</>;
}
