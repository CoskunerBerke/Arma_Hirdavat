"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * TEKLİF LİSTESİ — tüm sitenin paylaştığı durum (liste + pencere açık/kapalı)
 *
 * - Kalem kimliği (id) rastgele ve KALICIDIR; birim / miktar değişse de değişmez.
 *   Aynı ürün + birim + beden ikinci kez eklenirse yeni satır açılmaz, miktar toplanır
 *   (quoteItemKey). Birim değiştirilince aynı anahtara düşen satır varsa ikisi birleşir.
 * - "custom" kalem: online katalogda olmayan ürünler için kullanıcının yazdığı serbest metin
 *   (30 teknik hırdavat grubu, aramada sonuç çıkmayan ürünler).
 * - Miktar her zaman 1–9999 arası tam sayıdır.
 * - localStorage'dan okunan veri doğrulanır; bozuk kalemler atılır. Sekmeler arası eşitlenir.
 * - SSR güvenli: tarayıcı erişimi yalnızca effect içinde.
 * ──────────────────────────────────────────────────────────────────────────── */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/track";
import { QUOTE_EVENTS } from "./quote/events";

export type SupplyUnit = "Koli" | "Palet" | "Adet";
export type QuoteItemKind = "product" | "custom";

/** Katalog ürünleri koli veya palet olarak istenir. */
export const PRODUCT_UNITS: readonly SupplyUnit[] = ["Koli", "Palet"];
/** Serbest kalemler adet, koli veya palet olarak istenebilir. */
export const CUSTOM_UNITS: readonly SupplyUnit[] = ["Adet", "Koli", "Palet"];

export const QUOTE_MIN_QTY = 1;
export const QUOTE_MAX_QTY = 9999;
export const QUOTE_DEFAULT_QTY = 1;
/** lib/lead.ts → LEAD_LIMITS.maxItems ile aynı */
export const QUOTE_MAX_ITEMS = 100;

export interface QuoteItem {
  /** Kalıcı, benzersiz satır kimliği (birim değişse de değişmez) */
  id: string;
  /** "product": online katalog ürünü · "custom": kullanıcının yazdığı serbest kalem */
  kind: QuoteItemKind;
  productId?: number;
  productSlug?: string;
  productTitle: string;
  unit: SupplyUnit;
  /** 1–9999 arası tam sayı */
  quantity: number;
  /** Beden / ölçü / not (ör. "Beden 9", "M12 DIN 933") */
  spec?: string;
  /** Koli içi adet metni ("252 Çift"); "3 koli = 756 çift" dönüşümü için */
  koli?: string;
}

/** addItem girdisi: id üretilir; kind verilmezse slug varsa "product", yoksa "custom". */
export type QuoteItemInput = Omit<QuoteItem, "id" | "kind" | "quantity"> & {
  kind?: QuoteItemKind;
  quantity?: number;
};

export interface CustomItemInput {
  title: string;
  spec?: string;
  quantity?: number;
  /** Varsayılan "Adet" */
  unit?: SupplyUnit;
}

export interface LastAdded {
  title: string;
  unit: string;
  qty: number;
  /** Her eklemede artan sıra numarası (aynı ürün art arda eklense de bildirim yenilenir) */
  at: number;
}

interface QuoteContextType {
  items: QuoteItem[];
  /** Satır (kalem) sayısı */
  itemCount: number;
  /** Tüm satırların miktar toplamı (geriye dönük uyumluluk için) */
  totalCount: number;
  /** localStorage okundu mu (false iken liste henüz boş görünür) */
  hydrated: boolean;
  addItem: (item: QuoteItemInput, openModal?: boolean) => void;
  addMultipleItems: (items: QuoteItemInput[], openModal?: boolean) => void;
  addCustomItem: (item: CustomItemInput, openModal?: boolean) => void;
  removeItem: (id: string) => void;
  /** qty ≤ 0 satırı siler; diğer değerler 1–9999 aralığına yuvarlanır */
  updateQuantity: (id: string, qty: number) => void;
  updateUnit: (id: string, unit: SupplyUnit) => void;
  clearQuote: () => void;
  /** "Geri al" için: verilen kalemleri mevcut listeyle birleştirerek geri yükler */
  restoreItems: (items: QuoteItem[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean, source?: string) => void;
  openModal: (source?: string) => void;
  closeModal: () => void;
  lastAdded: LastAdded | null;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = "arma_rfq_items_v2";
/** Önceki sürümün anahtarı: bir kez okunup yeni anahtara taşınır */
const LEGACY_STORAGE_KEY = "arma_b2b_rfq_items";

/* ── yardımcılar ──────────────────────────────────────────────────────────── */

const ALL_UNITS: readonly SupplyUnit[] = ["Koli", "Palet", "Adet"];

export function clampQuantity(n: unknown, fallback: number = QUOTE_DEFAULT_QTY): number {
  const v = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(QUOTE_MAX_QTY, Math.max(QUOTE_MIN_QTY, Math.round(v)));
}

const norm = (s?: string) => (s ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("tr-TR");

/** Aynı ürün + birim + beden/not → aynı anahtar (birleştirme için) */
export function quoteItemKey(x: Pick<QuoteItem, "kind" | "productSlug" | "productTitle" | "unit" | "spec">): string {
  const who = x.kind === "product" && x.productSlug ? `p:${x.productSlug}` : `c:${norm(x.productTitle)}`;
  return `${who}|${x.unit}|${norm(x.spec)}`;
}

let idCounter = 0;
function newId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // güvenli olmayan bağlam: aşağıdaki yedek kullanılır
  }
  idCounter += 1;
  return `q${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}${idCounter}`;
}

const str = (v: unknown, max: number): string | undefined => {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, max);
  return s || undefined;
};

function unitFor(kind: QuoteItemKind, unit: unknown): SupplyUnit {
  const u = unit === "Tesis Ambalajı" ? "Koli" : unit; // eski sürümdeki birim
  const allowed = kind === "custom" ? CUSTOM_UNITS : PRODUCT_UNITS;
  return allowed.indexOf(u as SupplyUnit) !== -1 ? (u as SupplyUnit) : kind === "custom" ? "Adet" : "Koli";
}

/** Dış girdiyi (addItem) güvenli bir kaleme çevirir; başlık yoksa null. */
function toItem(input: QuoteItemInput, id: string): QuoteItem | null {
  const productTitle = str(input.productTitle, 200);
  if (!productTitle) return null;
  const productSlug = str(input.productSlug, 200);
  const kind: QuoteItemKind = input.kind ?? (productSlug ? "product" : "custom");
  return {
    id,
    kind,
    productId: typeof input.productId === "number" && Number.isFinite(input.productId) ? input.productId : undefined,
    productSlug: kind === "product" ? productSlug : undefined,
    productTitle,
    unit: unitFor(kind, input.unit),
    quantity: clampQuantity(input.quantity ?? QUOTE_DEFAULT_QTY),
    spec: str(input.spec, 200),
    koli: str(input.koli, 60),
  };
}

/** localStorage / başka sekme verisini doğrular; bozuk kalemleri atar, aynı anahtarlıları birleştirir. */
function sanitizeItems(raw: unknown): QuoteItem[] {
  if (!Array.isArray(raw)) return [];
  const out: QuoteItem[] = [];
  const usedIds: Record<string, true> = {};
  for (const r of raw.slice(0, QUOTE_MAX_ITEMS * 2)) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const qty = Number(o.quantity);
    if (!Number.isFinite(qty) || qty <= 0) continue;
    const rawId = typeof o.id === "string" && /^[\w.:-]{1,80}$/.test(o.id) && !usedIds[o.id] ? o.id : newId();
    const kind: QuoteItemKind | undefined = o.kind === "custom" || o.kind === "product" ? o.kind : undefined;
    const item = toItem(
      {
        kind: kind ?? (typeof o.productSlug === "string" && o.productSlug ? "product" : "custom"),
        productId: typeof o.productId === "number" ? o.productId : undefined,
        productSlug: typeof o.productSlug === "string" ? o.productSlug : undefined,
        productTitle: typeof o.productTitle === "string" ? o.productTitle : "",
        unit: o.unit as SupplyUnit,
        quantity: qty,
        spec: typeof o.spec === "string" ? o.spec : undefined,
        koli: typeof o.koli === "string" ? o.koli : undefined,
      },
      rawId
    );
    if (!item) continue;
    usedIds[item.id] = true;
    out.push(item);
  }
  return mergeItems([], out);
}

/** incoming kalemleri prev listesine ekler; aynı anahtarlı satırın miktarını artırır. */
function mergeItems(prev: QuoteItem[], incoming: QuoteItem[]): QuoteItem[] {
  const next = prev.slice();
  for (const it of incoming) {
    const k = quoteItemKey(it);
    const i = next.findIndex((x) => quoteItemKey(x) === k);
    if (i >= 0) {
      next[i] = {
        ...next[i],
        quantity: clampQuantity(next[i].quantity + it.quantity),
        koli: next[i].koli ?? it.koli,
        productId: next[i].productId ?? it.productId,
      };
    } else if (next.length < QUOTE_MAX_ITEMS) {
      next.push(it);
    }
  }
  return next;
}

function lastAddedLabel(list: QuoteItem[]): { title: string; unit: string; qty: number } {
  const qty = list.reduce((a, x) => a + x.quantity, 0);
  const sameUnit = list.every((x) => x.unit === list[0].unit);
  const unit = sameUnit ? list[0].unit : "birim";
  if (list.length === 1) {
    const x = list[0];
    return { title: x.spec ? `${x.productTitle} (${x.spec})` : x.productTitle, unit, qty };
  }
  const sameProduct = list.every((x) => x.productTitle === list[0].productTitle);
  return {
    title: sameProduct ? `${list[0].productTitle} (${list.length} beden)` : `${list.length} kalem ürün`,
    unit,
    qty,
  };
}

/* ── sağlayıcı ────────────────────────────────────────────────────────────── */

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpenState] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);

  const itemsRef = useRef(items);
  itemsRef.current = items;
  const isOpenRef = useRef(false);
  const addSeq = useRef(0);
  const lastSaved = useRef<string | null>(null);

  /* Pencere aç/kapat (açılış olayı burada ölçülür; Header vb. setIsOpen(true) çağırsa da) */
  const setIsOpen = useCallback((open: boolean, source?: string) => {
    if (open && !isOpenRef.current) {
      track(QUOTE_EVENTS.modalOpened, { kalem: itemsRef.current.length, ...(source ? { kaynak: source } : {}) });
    }
    isOpenRef.current = open;
    setIsOpenState(open);
  }, []);
  const openModal = useCallback((source?: string) => setIsOpen(true, source), [setIsOpen]);
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

  /* Eski ürün adreslerini (slug) güncel ürüne eşler, eksik koli bilgisini tamamlar. */
  const refreshProducts = useCallback(async () => {
    try {
      const mod = await import("@/data/products");
      setItems((prev) => {
        let changed = false;
        const mapped = prev.map((x): QuoteItem => {
          if (x.kind !== "product" || !x.productSlug) return x;
          const p = mod.getProduct(x.productSlug) ?? mod.resolveLegacySlug(x.productSlug);
          if (!p) {
            // Katalogdan kalkmış ürün: serbest kalem olarak korunur (bağlantısız)
            changed = true;
            return { ...x, kind: "custom", productSlug: undefined, productId: undefined };
          }
          if (p.slug === x.productSlug && p.title === x.productTitle && p.id === x.productId && x.koli) return x;
          changed = true;
          return { ...x, productSlug: p.slug, productTitle: p.title, productId: p.id, koli: x.koli ?? p.koli };
        });
        return changed ? mergeItems([], mapped) : prev;
      });
    } catch {
      // ağ hatası vb.: liste olduğu gibi kalır
    }
  }, []);

  /* İlk yükleme: localStorage → doğrula → state (StrictMode'daki çift çalıştırmada miktarlar ikiye katlanmasın) */
  const didLoad = useRef(false);
  useEffect(() => {
    if (didLoad.current) return;
    didLoad.current = true;
    let parsed: unknown = null;
    let fromLegacy = false;
    try {
      let raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
        fromLegacy = raw !== null;
      }
      if (raw) parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    const loaded = sanitizeItems(parsed);
    if (loaded.length) setItems((prev) => mergeItems(loaded, prev));
    if (fromLegacy) {
      try {
        window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        // yoksay
      }
    }
    setHydrated(true);

    if (loaded.some((x) => x.kind === "product")) {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(() => void refreshProducts(), { timeout: 4000 });
      else window.setTimeout(() => void refreshProducts(), 1500);
    }
  }, [refreshProducts]);

  /* Kaydet (aynı içerik tekrar yazılmaz → sekmeler arası döngü oluşmaz) */
  useEffect(() => {
    if (!hydrated) return;
    const json = JSON.stringify(items);
    if (json === lastSaved.current) return;
    lastSaved.current = json;
    try {
      window.localStorage.setItem(STORAGE_KEY, json);
    } catch {
      // gizli mod / kota: liste yalnızca bu sayfa oturumunda kalır
    }
  }, [items, hydrated]);

  /* Başka sekmede yapılan değişiklikleri al */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      let parsed: unknown = [];
      try {
        parsed = e.key !== null && e.newValue ? JSON.parse(e.newValue) : [];
      } catch {
        return;
      }
      const next = sanitizeItems(parsed);
      lastSaved.current = JSON.stringify(next);
      setItems(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const announceAdded = useCallback((list: QuoteItem[]) => {
    addSeq.current += 1;
    setLastAdded({ ...lastAddedLabel(list), at: addSeq.current });
    const units = list.map((x) => x.unit).filter((u, i, a) => a.indexOf(u) === i);
    track(QUOTE_EVENTS.added, {
      kalem: list.length,
      birim: units.length === 1 ? units[0] : "karisik",
      tur: list.every((x) => x.kind === "custom") ? "serbest" : "urun",
      ...(list[0].productSlug ? { urun: list[0].productSlug } : {}),
    });
  }, []);

  const addMultipleItems = useCallback(
    (inputs: QuoteItemInput[], open = false) => {
      const list = inputs.map((it) => toItem(it, newId())).filter((x): x is QuoteItem => x !== null);
      if (list.length === 0) return;
      setItems((prev) => mergeItems(prev, list));
      announceAdded(list);
      if (open) setIsOpen(true, "ekle");
    },
    [announceAdded, setIsOpen]
  );

  const addItem = useCallback(
    (input: QuoteItemInput, open = false) => addMultipleItems([input], open),
    [addMultipleItems]
  );

  const addCustomItem = useCallback(
    (input: CustomItemInput, open = false) =>
      addMultipleItems(
        [
          {
            kind: "custom",
            productTitle: input.title,
            spec: input.spec,
            quantity: input.quantity,
            unit: input.unit ?? "Adet",
          },
        ],
        open
      ),
    [addMultipleItems]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (Number.isFinite(qty) && qty <= 0) {
      setItems((prev) => prev.filter((x) => x.id !== id));
      return;
    }
    const q = clampQuantity(qty);
    setItems((prev) => prev.map((x) => (x.id === id && x.quantity !== q ? { ...x, quantity: q } : x)));
  }, []);

  const updateUnit = useCallback((id: string, unit: SupplyUnit) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx < 0) return prev;
      const cur = prev[idx];
      const nextUnit = unitFor(cur.kind, unit);
      if (nextUnit === cur.unit) return prev;
      const updated: QuoteItem = { ...cur, unit: nextUnit };
      const k = quoteItemKey(updated);
      const dup = prev.findIndex((x, i) => i !== idx && quoteItemKey(x) === k);
      if (dup < 0) return prev.map((x, i) => (i === idx ? updated : x));
      // Aynı ürün + birim + beden satırı zaten var: düzenlenen satır (ve odağı) kalır, miktarlar toplanır
      const merged: QuoteItem = { ...updated, quantity: clampQuantity(updated.quantity + prev[dup].quantity) };
      return prev.filter((_, i) => i !== dup).map((x) => (x.id === id ? merged : x));
    });
  }, []);

  const clearQuote = useCallback(() => setItems([]), []);

  const restoreItems = useCallback((list: QuoteItem[]) => {
    const restored = sanitizeItems(list);
    if (restored.length) setItems((prev) => mergeItems(restored, prev));
  }, []);

  const value = useMemo<QuoteContextType>(
    () => ({
      items,
      itemCount: items.length,
      totalCount: items.reduce((acc, it) => acc + it.quantity, 0),
      hydrated,
      addItem,
      addMultipleItems,
      addCustomItem,
      removeItem,
      updateQuantity,
      updateUnit,
      clearQuote,
      restoreItems,
      isOpen,
      setIsOpen,
      openModal,
      closeModal,
      lastAdded,
    }),
    [
      items,
      hydrated,
      addItem,
      addMultipleItems,
      addCustomItem,
      removeItem,
      updateQuantity,
      updateUnit,
      clearQuote,
      restoreItems,
      isOpen,
      setIsOpen,
      openModal,
      closeModal,
      lastAdded,
    ]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return ctx;
}
