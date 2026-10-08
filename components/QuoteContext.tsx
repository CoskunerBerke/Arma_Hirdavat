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
  addItem: (item: Omit<QuoteItem, "id">, openModal?: boolean) => void;
  addMultipleItems: (items: Omit<QuoteItem, "id">[], openModal?: boolean) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  updateUnit: (id: string, unit: SupplyUnit) => void;
  clearQuote: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalCount: number;
  lastAdded: { title: string; unit: string; qty: number } | null;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = "arma_b2b_rfq_items";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ title: string; unit: string; qty: number } | null>(null);

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

  const addItem = (item: Omit<QuoteItem, "id">, openModal = false) => {
    const id = `${item.productSlug || item.productTitle}_${item.unit}_${item.spec || "genel"}`;
    setItems((prev) => {
      const existing = prev.find((x) => x.id === id);
      if (existing) {
        return prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x));
      }
      return [...prev, { ...item, id, quantity: item.quantity || 1 }];
    });
    setLastAdded({
      title: item.spec ? `${item.productTitle} (${item.spec})` : item.productTitle,
      unit: item.unit,
      qty: item.quantity || 1,
    });
    if (openModal) {
      setIsOpen(true);
    }
  };

  const addMultipleItems = (newItems: Omit<QuoteItem, "id">[], openModal = false) => {
    if (newItems.length === 0) return;
    setItems((prev) => {
      let current = [...prev];
      for (const item of newItems) {
        const id = `${item.productSlug || item.productTitle}_${item.unit}_${item.spec || "genel"}`;
        const existingIndex = current.findIndex((x) => x.id === id);
        if (existingIndex >= 0) {
          current[existingIndex] = {
            ...current[existingIndex],
            quantity: current[existingIndex].quantity + (item.quantity || 1),
          };
        } else {
          current.push({ ...item, id, quantity: item.quantity || 1 });
        }
      }
      return current;
    });
    setLastAdded({
      title: `${newItems.length} Kalem Malzeme`,
      unit: "Toplu",
      qty: newItems.reduce((acc, x) => acc + (x.quantity || 1), 0),
    });
    if (openModal) {
      setIsOpen(true);
    }
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
        addMultipleItems,
        removeItem,
        updateQuantity,
        updateUnit,
        clearQuote,
        isOpen,
        setIsOpen,
        totalCount,
        lastAdded,
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
