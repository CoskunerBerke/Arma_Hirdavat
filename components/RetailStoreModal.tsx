"use client";

import React, { createContext, useContext, useState } from "react";
import { MapPin, Phone, ExternalLink, X, Store, Clock, ShieldAlert } from "lucide-react";
import { COMPANY } from "@/data/company";

interface RetailModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const RetailModalContext = createContext<RetailModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function RetailModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RetailModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
      {isOpen && <RetailStoreModal onClose={() => setIsOpen(false)} />}
    </RetailModalContext.Provider>
  );
}

export function useRetailModal() {
  return useContext(RetailModalContext);
}

function RetailStoreModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="retail-modal-title"
    >
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header Band */}
        <div className="flex items-center justify-between border-b border-line bg-canvas px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <Store className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                Fiziki Mağaza & Perakende
              </span>
              <h2 id="retail-modal-title" className="text-base font-bold text-ink sm:text-lg">
                Tekkeköy Merkez Mağazamız
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition hover:bg-slate-200 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-ink-soft">
          {/* Civtec Modeli Ayrım Bildirimi */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 text-slate-800 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-950 font-bold mb-1">
                  Bireysel & Atölye İhtiyaçları İçin:
                </strong>
                Tekil parça, atölye ve bireysel teknik hırdavat ihtiyaçlarınız için Tekkeköy&apos;deki fiziki mağazamızda hizmetinizdeyiz. Web portalımız fabrikaların ve sanayi tesislerinin yüksek hacimli koli ve palet sevkiyatlarına tahsis edilmiştir.
              </div>
            </div>
          </div>

          {/* İletişim & Lokasyon Bilgileri */}
          <div className="rounded-2xl border border-line bg-canvas/60 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink block">Mağaza Adresi:</span>
                <span>{COMPANY.address.full}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brand shrink-0" />
              <div>
                <span className="font-semibold text-ink">Mağaza Tel: </span>
                <a href={COMPANY.phones[0].href} className="font-medium text-brand hover:underline">
                  {COMPANY.phones[0].label}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-brand shrink-0" />
              <div>
                <span className="font-semibold text-ink">Çalışma Saatleri: </span>
                <span>Hafta İçi & Cumartesi 08:00 - 18:30</span>
              </div>
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={COMPANY.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:flex-1 justify-center py-3 text-xs sm:text-sm font-bold shadow-md"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Google Haritalar&apos;da Yol Tarifi Al</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost w-full sm:w-auto py-3 px-5 text-xs sm:text-sm"
            >
              Anladım
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
