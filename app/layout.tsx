import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";
import FloatingQuoteBar from "@/components/FloatingQuoteBar";
import { QuoteProvider } from "@/components/QuoteContext";
import { RetailModalProvider } from "@/components/RetailStoreModal";
import { SearchProvider } from "@/components/ProductSearchModal";
import RfqModal from "@/components/RfqModal";
import { COMPANY, SEO_KEYWORDS, SITE_URL, TURKEY_PROVINCES } from "@/data/company";

// Türkçe karakterler (ğ, ş, ı, İ) için latin-ext alt kümesi gerekli
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arma Hırdavat | Endüstriyel Tedarik & Tesis Malzemeleri B2B Portalı",
    template: "%s | Arma Hırdavat - Endüstriyel Tesis Tedariği",
  },
  description:
    "Organize sanayi bölgeleri, üretim tesisleri ve ağır sanayi şantiyelerine koli ve palet bazında toptan teknik hırdavat, bağlantı elemanları, kaynak ve iş güvenliği tedariği.",
  applicationName: COMPANY.name,
  keywords: SEO_KEYWORDS,
  category: "Industrial Supplies & Hardware Wholesale",
  classification: "Endüstriyel Tedarik, Toptan Teknik Hırdavat ve Fabrika Malzemeleri B2B Portalı",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    title: "Arma Hırdavat | Endüstriyel Tedarik & Tesis Malzemeleri B2B Portalı",
    description:
      "Organize sanayi bölgeleri, fabrikalar ve şantiyeler için koli ve palet bazında toptan teknik hırdavat ve endüstriyel malzeme tedariği. Kurumsal iskonto matrisi.",
    images: [{ url: "/images/logo.png", width: 305, height: 101, alt: "Arma Hırdavat - Endüstriyel Tesis Tedariği" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arma Hırdavat | Endüstriyel Tedarik & Tesis Malzemeleri",
    description: "Fabrika, şantiye ve tesis malzemeleri toptan satışı ve kurumsal iskonto avantajları.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
  other: {
    "geo.region": "TR",
    "geo.placename": "Samsun, Türkiye",
    "geo.position": "41.2867;36.33",
    "ICBM": "41.2867, 36.33",
    "distribution": "Global",
    "target": "all",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HardwareStore", "WholesaleStore"],
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
      priceRange: "$$",
      currenciesAccepted: "TRY",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.address.street,
        addressLocality: COMPANY.address.district,
        addressRegion: COMPANY.address.city,
        postalCode: COMPANY.address.postalCode,
        addressCountry: "TR",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Türkiye",
          identifier: "TR",
        },
        {
          "@type": "AdministrativeArea",
          name: "Türkiye Organize Sanayi Bölgeleri ve Ağır Sanayi Havzaları",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Endüstriyel Tedarik & Tesis Malzemeleri Kataloğu",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Bağlantı & Sabitleme Elemanları" },
          { "@type": "OfferCatalog", name: "Çelik Halat & Kaldırma Ekipmanları" },
          { "@type": "OfferCatalog", name: "El Aletleri & Sanayi Makineleri" },
          { "@type": "OfferCatalog", name: "Kaynak Makineleri & Gaz Ekipmanları" },
          { "@type": "OfferCatalog", name: "İş Güvenliği ve KKD Ekipmanları" },
          { "@type": "OfferCatalog", name: "Tesisat, Pompa & Pnömatik Ürünler" },
          { "@type": "OfferCatalog", name: "Kesici & Aşındırıcı Taşlar" },
          { "@type": "OfferCatalog", name: "Kimyasal & Endüstriyel Ambalaj" },
        ],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "14:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY.name,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#store` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/urunler?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
          İçeriğe atla
        </a>
        <QuoteProvider>
          <RetailModalProvider>
            <SearchProvider>
              <Header />
              <main id="icerik" className="flex-1">
                {children}
              </main>
              <Footer />
              <FloatingCall />
              <FloatingQuoteBar />
              <RfqModal />
            </SearchProvider>
          </RetailModalProvider>
        </QuoteProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
