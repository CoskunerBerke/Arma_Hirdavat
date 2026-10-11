import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  /** "center": kurumsal düzendeki ortalı başlık + kısa vurgu çizgisi */
  align?: "left" | "center";
  /** "dark": koyu zemin üzerinde */
  tone?: "light" | "dark";
  className?: string;
}

/** Ana sayfa bölüm başlığı: H2 + altında kısa sarı vurgu çizgisi (kurumsal düzen). */
export default function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "text-accent" : "text-accent-ink"}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${dark ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      <span aria-hidden className={`mt-4 block h-1 w-16 rounded-full bg-accent ${center ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dark ? "text-slate-300" : "text-ink-soft"}`}>{description}</p>
      )}
    </div>
  );
}
