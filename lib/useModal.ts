/* ────────────────────────────────────────────────────────────────────────────
 * useModal — erişilebilir diyalog davranışı (yalnızca istemci bileşenlerinde kullanın)
 *
 *   const { panelRef } = useModal({ open, onClose, initialFocusRef });
 *   {open && (
 *     <div role="dialog" aria-modal="true" aria-labelledby="…">
 *       <div className="backdrop" onClick={onClose} />
 *       <div ref={panelRef} tabIndex={-1}>…</div>
 *     </div>
 *   )}
 *
 * Sağladıkları:
 *  - Açılınca odak panele (initialFocusRef → ilk odaklanabilir öğe → panelin kendisi) taşınır
 *  - Tab / Shift+Tab panelin içinde döner (odak tuzağı)
 *  - Escape onClose'u çağırır (iç içe modallarda yalnızca en üstteki)
 *  - Sayfa kaydırması kilitlenir; sayaçlıdır, birden çok modal aynı anda açık olabilir
 *  - Kapanınca (veya bileşen kaldırılınca) odak, modalı açan öğeye geri döner
 *  - SSR güvenli: tüm DOM erişimi effect içinde
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, type RefObject } from "react";

export interface UseModalOptions {
  open: boolean;
  onClose: () => void;
  /** Açılışta odaklanacak öğe (ör. arama kutusu). Verilmezse panelin ilk odaklanabilir öğesi. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Escape ile kapanmayı kapatmak için false (varsayılan true). */
  closeOnEscape?: boolean;
  /** Kaydırma kilidi istenmiyorsa false (varsayılan true). */
  lockScroll?: boolean;
}

const FOCUSABLE = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    if (el.hasAttribute("disabled") || el.getAttribute("aria-hidden") === "true") return false;
    if (el.closest("[inert]")) return false;
    // görünmeyen öğeleri atla (display:none / visibility:hidden)
    const style = window.getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") return false;
    return el.getClientRects().length > 0;
  });
}

/* ── sayaçlı kaydırma kilidi (modül düzeyinde, tüm modallar paylaşır) ──────── */

let lockCount = 0;
let saved: { htmlOverflow: string; bodyOverflow: string; bodyPaddingRight: string } | null = null;

function lockScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;
  const html = document.documentElement;
  const body = document.body;
  saved = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
  };
  // Kaydırma çubuğu kaybolunca sayfa kaymasın
  const scrollbar = window.innerWidth - html.clientWidth;
  if (scrollbar > 0) {
    const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + scrollbar}px`;
  }
  // html'de overflow-x: clip olduğu için kilit hem html hem body'ye uygulanır
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
}

function unlockScroll() {
  if (typeof document === "undefined" || lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0 || !saved) return;
  document.documentElement.style.overflow = saved.htmlOverflow;
  document.body.style.overflow = saved.bodyOverflow;
  document.body.style.paddingRight = saved.bodyPaddingRight;
  saved = null;
}

/* ── açık modal yığını: Escape ve Tab yalnızca en üstteki modala uygulanır ──── */

const stack: symbol[] = [];
const isTop = (id: symbol) => stack[stack.length - 1] === id;

export function useModal<T extends HTMLElement = HTMLDivElement>({
  open,
  onClose,
  initialFocusRef,
  closeOnEscape = true,
  lockScroll: shouldLock = true,
}: UseModalOptions): { panelRef: RefObject<T> } {
  const panelRef = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const escRef = useRef(closeOnEscape);
  escRef.current = closeOnEscape;

  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const id = Symbol("modal");
    stack.push(id);
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (shouldLock) lockScroll();

    // İlk odak: panel henüz DOM'a gelmemişse (lazy yükleme) birkaç kare bekle
    let raf = 0;
    let tries = 0;
    const focusInitial = () => {
      const panel = panelRef.current;
      if (!panel) {
        if (tries++ < 10) raf = window.requestAnimationFrame(focusInitial);
        return;
      }
      if (panel.contains(document.activeElement)) return;
      const target = initialFocusRef?.current ?? getFocusable(panel)[0] ?? panel;
      if (target === panel && !panel.hasAttribute("tabindex")) panel.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    focusInitial();

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isTop(id)) return;
      if (e.key === "Escape" && escRef.current) {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = getFocusable(panel);
      if (items.length === 0) {
        e.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Odak dışarı kaçarsa (ör. fareyle arka plana tıklama) panele geri al
    const onFocusIn = (e: FocusEvent) => {
      if (!isTop(id)) return;
      const panel = panelRef.current;
      if (panel && e.target instanceof Node && !panel.contains(e.target)) {
        const target = getFocusable(panel)[0] ?? panel;
        target.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn);
      const idx = stack.indexOf(id);
      if (idx !== -1) stack.splice(idx, 1);
      if (shouldLock) unlockScroll();
      // Odağı modalı açan öğeye geri ver (hâlâ sayfadaysa). Eşzamanlı yapılır ki aynı anda
      // açılan başka bir modal kendi ilk odağını sonradan alabilsin.
      if (previouslyFocused && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
    // initialFocusRef bir ref nesnesidir; kimliği değişmez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, shouldLock]);

  return { panelRef };
}

export default useModal;
