"use client";

import React from "react";
import { MessageSquare, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Hızlı Arama Butonu (Mobilde çok pratik) */}
      <a
        href={`tel:${COMPANY_INFO.phoneFormatted}`}
        aria-label="Telefonla Hemen Ara"
        className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-industrial-900 text-white shadow-lg shadow-industrial-900/40 hover:scale-105 transition-transform"
      >
        <Phone className="w-5 h-5 text-amber-400" />
      </a>

      {/* WhatsApp Hızlı Mesaj Butonu */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappFormatted}?text=${encodeURIComponent("Merhaba Arma Hırdavat, ürün ve fiyat teklifi hakkında bilgi almak istiyorum.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan Yazın"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-700/30 hover:scale-105 transition-all group"
      >
        <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline font-semibold text-xs tracking-wide">
          Bize Yazın
        </span>
      </a>
    </div>
  );
}
