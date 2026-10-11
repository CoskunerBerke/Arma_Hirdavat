import { createContext, useContext } from "react";

/**
 * Ana sayfa hero slaytı şu an görünür (etkin) mü?
 * HeroCarousel her slaydı bu bağlamla sarar; slayttaki videolar yalnızca etkinken oynar.
 * Karusel dışında kullanılan bileşenler için varsayılan değer `true`dur (davranış değişmez).
 */
export const HeroSlideActiveContext = createContext(true);

export function useHeroSlideActive(): boolean {
  return useContext(HeroSlideActiveContext);
}
