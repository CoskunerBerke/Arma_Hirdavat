import { Phone } from "lucide-react";
import { COMPANY } from "@/data/company";

/** Sabit hızlı arama butonu */
export default function FloatingCall() {
  return (
    <a
      href={COMPANY.phones[0].href}
      aria-label={`Hemen arayın: ${COMPANY.phones[0].label}`}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-ink-800/90 text-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition hover:scale-105 hover:border-white/30"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-brand-soft/20 [animation-duration:2.5s]" aria-hidden />
      <Phone className="relative h-5 w-5 text-brand-accent" aria-hidden />
    </a>
  );
}
