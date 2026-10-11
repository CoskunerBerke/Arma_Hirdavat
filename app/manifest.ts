import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name} – endüstriyel tedarik ve teknik hırdavat`,
    short_name: COMPANY.name,
    description:
      "Fabrikalar ve sanayi tesisleri için teknik hırdavat, endüstriyel sarf ve iş güvenliği ürünlerinde koli ve palet bazında kurumsal tedarik.",
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "tr",
    dir: "ltr",
    background_color: "#F8FAFC",
    theme_color: "#FFFFFF",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
