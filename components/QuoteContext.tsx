"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type SupplyUnit = "Koli" | "Palet" | "Tesis Ambalajı";

export interface QuoteItem {
  id: string; // unique id (e.g. group slug + unit)
  productId?: number;
  productSlug?: string;
  productTitle: string;
  unit: SupplyUnit;
  quantity: number;
  spec?: string; // e.g. "Metrik 4", "DIN 933", vb.
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  updateUnit: (id: string, unit: SupplyUnit) => void;
  clearQuote: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = "arma_b2b_rfq_items";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, loaded]);

  const addItem = (item: Omit<QuoteItem, "id">) => {
    const id = `${item.productSlug || item.productTitle}_${item.unit}_${item.spec || "genel"}`;
    setItems((prev) => {
      const existing = prev.find((x) => x.id === id);
      if (existing) {
        return prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x));
      }
      return [...prev, { ...item, id, quantity: item.quantity || 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, quantity: qty } : x)));
  };

  const updateUnit = (id: string, unit: SupplyUnit) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, unit } : x)));
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, it) => acc + (it.quantity || 1), 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateUnit,
        clearQuote,
        isOpen,
        setIsOpen,
        totalCount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return ctx;
}
