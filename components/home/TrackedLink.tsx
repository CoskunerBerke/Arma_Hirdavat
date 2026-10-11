"use client";

import type { AnchorHTMLAttributes } from "react";
import { EVENTS, track } from "@/lib/track";

type EventKey = keyof typeof EVENTS;

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** lib/track EVENTS anahtarı (ör. "emailClick"). Sunucu bileşenlerinden güvenle verilebilir. */
  eventKey: EventKey;
  /** Olayın geldiği yer (ör. "cta_band"). Kişisel veri yazmayın. */
  placement?: string;
}

/** Tıklanınca dönüşüm olayı gönderen sade <a>. Gezinmeyi engellemez. */
export default function TrackedLink({ eventKey, placement, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(EVENTS[eventKey], placement ? { placement } : undefined);
        onClick?.(e);
      }}
    />
  );
}
