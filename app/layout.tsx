import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";
import { COMPANY, SITE_URL } from "@/data/company";

// Türkçe karakterler (ğ, ş, ı, İ) için latin-ext alt kümesi gerekli
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#0A1424",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arma Hırdavat | Samsun Teknik Hırdavat ve Fabrika Malzemeleri",
    template: "%s | Arma Hırdavat Samsun",
  },
  description: COMPANY.description,
  applicationName: COMPANY.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    title: "Arma Hırdavat | Samsun Teknik Hırdavat ve Fabrika Malzemeleri",
    description: COMPANY.description,
    images: [{ url: "/images/logo.png", width: 305, height: 101, alt: "Arma Hırdavat" }],
  },
  twitter: { card: "summary", title: "Arma Hırdavat", description: COMPANY.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HardwareStore",
      "@id": `${SITE_URL}/#store`,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/logo.png`,
      description: COMPANY.description,
      telephone: "+90-362-266-60-95",
      faxNumber: "+90-362-266-60-94",
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.address.street,
        addressLocality: COMPANY.address.district,
        addressRegion: COMPANY.address.city,
        addressCountry: "TR",
      },
      areaServed: ["Samsun", "Karadeniz Bölgesi"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY.name,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#store` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-ink-950">
          İçeriğe atla
        </a>
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingCall />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
