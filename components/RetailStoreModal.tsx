"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

/*
 * Tekkeköy mağazası penceresi: sağlayıcı + bağlam.
 * Pencerenin kendisi (components/home/RetailStoreDialog.tsx) yalnızca açıldığında yüklenir.
 * Erişilebilirlik (odak tuzağı, Escape, kaydırma kilidi, odağın geri dönmesi) lib/useModal ile.
 */
const RetailStoreDialog = dynamic(() => import("./home/RetailStoreDialog"), { ssr: false });

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
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return (
    <RetailModalContext.Provider value={value}>
      {children}
      {isOpen && <RetailStoreDialog onClose={closeModal} />}
    </RetailModalContext.Provider>
  );
}

export function useRetailModal() {
  return useContext(RetailModalContext);
}
