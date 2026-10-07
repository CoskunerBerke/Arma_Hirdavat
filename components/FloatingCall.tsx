import { Phone } from "lucide-react";
import { COMPANY } from "@/data/company";

/** Sabit hızlı arama butonu */
export default function FloatingCall() {
  return (
    <a
      href={COMPANY.phones[0].href}
      aria-label={`Hemen arayın: ${COMPANY.phones[0].label}`}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_15px_35px_-10px_rgba(0,80,230,0.6)] transition hover:scale-105 hover:bg-brand-hover"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-brand/30 [animation-duration:2.5s]" aria-hidden />
      <Phone className="relative h-5 w-5" aria-hidden />
    </a>
  );
}
