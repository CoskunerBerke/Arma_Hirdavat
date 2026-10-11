import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name} – Samsun teknik hırdavat ve iş güvenliği`,
    short_name: COMPANY.name,
    description:
      "FABA iş eldiveni, koruyucu tulum ve KKD ürünlerinde koli bazında toptan teklif. Tekkeköy / Samsun'da teknik hırdavat mağazası.",
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
