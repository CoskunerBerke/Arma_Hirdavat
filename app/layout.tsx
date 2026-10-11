import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";
import FloatingQuoteBar from "@/components/FloatingQuoteBar";
import { QuoteProvider } from "@/components/QuoteContext";
import { RetailModalProvider } from "@/components/RetailStoreModal";
import { SearchProvider } from "@/components/ProductSearchModal";
import RfqModal from "@/components/RfqModal";
import { COMPANY, CONTACT_NUMBERS_VERIFIED, IS_INDEXABLE, OPENING_HOURS, PRIMARY_PHONE, SITE_URL } from "@/data/company";
import { CATEGORY_PAGES } from "@/data/categories";

// Türkçe karakterler (ğ, ş, ı, İ) için latin-ext alt kümesi gerekli
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });

// Yakınlaştırma serbest (WCAG 1.4.4): maximumScale / userScalable KULLANMAYIN.
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const DEFAULT_TITLE = "Endüstriyel Tedarik ve Teknik Hırdavat | Arma Hırdavat";
const DEFAULT_DESCRIPTION =
  "Fabrikalar ve sanayi tesisleri için teknik hırdavat, endüstriyel sarf ve iş güvenliği ürünlerinde koli ve palet bazında kurumsal tedarik ve teklif.";

/*
 * Kök metadata. Notlar (sayfa sahipleri için):
 * - Kök düzeyde canonical YOK: her sayfa kendi alternates.canonical değerini verir
 *   (ana sayfa: app/page.tsx → alternates: { canonical: "/" }).
 * - Sayfa başlıkları markasız yazılır; şablon " | Arma Hırdavat" ekler.
 *   Başlık markayı zaten içeriyorsa title: { absolute: "…" } kullanın.
 * - og:title / og:description / twitter:* sayfanın title ve description değerinden otomatik gelir.
 * - Bir sayfa kendi openGraph nesnesini verirse kökteki openGraph TAMAMEN değişir:
 *   type / locale / siteName / url alanlarını da verin. Alt klasördeki sayfalar images de vermeli:
 *   images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: "…" }] (ya da kendi görseli).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Arma Hırdavat",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: COMPANY.name,
  // title / description burada BİLEREK yok: Next her sayfanın kendi title/description
  // değerini og: ve twitter: etiketlerine otomatik kopyalar. Varsayılan görsel: public/og/arma-og.png.
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name}: endüstriyel tedarik ve teknik hırdavat` }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/arma-og.png"],
  },
  robots: {
    index: IS_INDEXABLE,
    follow: IS_INDEXABLE,
    googleBot: {
      index: IS_INDEXABLE,
      follow: IS_INDEXABLE,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Doğrulanmamış numaraların iOS'ta otomatik bağlantıya dönüşmesini engeller
  formatDetection: { telephone: false },
};

/* ────────────────────────────────────────────────────────────────────────────
 * Yapısal veri (JSON-LD) — YALNIZCA data/company.ts ve data/categories.ts'ten üretilir.
 * Doğrulanmamış bilgi (telefon, fiyat aralığı, ödeme yöntemi) yazılmaz. Koordinat Google İşletme Profili pininden alınır.
 * ──────────────────────────────────────────────────────────────────────────── */

const sameAs = [COMPANY.googleBusinessUrl, ...COMPANY.socialProfiles].filter((u) => typeof u === "string" && u.trim() !== "");

const storeJsonLd: Record<string, unknown> = {
  "@type": "HardwareStore",
  "@id": `${SITE_URL}/#store`,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon.png`,
    width: 256,
    height: 256,
  },
  image: `${SITE_URL}/og/arma-og.png`,
  description: COMPANY.description,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.district,
    addressRegion: COMPANY.address.city,
    postalCode: COMPANY.address.postalCode,
    addressCountry: COMPANY.address.country,
  },
  openingHoursSpecification: OPENING_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...h.days],
    opens: h.opens,
    closes: h.closes,
  })),
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY.geo.latitude,
    longitude: COMPANY.geo.longitude,
  },
  hasMap: COMPANY.mapLink,
  areaServed: { "@type": "Country", name: "Türkiye", identifier: "TR" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Endüstriyel malzemeler, teknik hırdavat ve iş güvenliği ürünleri",
    itemListElement: [
      ...CATEGORY_PAGES.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        url: `${SITE_URL}/kategori/${c.slug}`,
      })),
      {
        "@type": "OfferCatalog",
        name: "Endüstriyel malzeme ve teknik hırdavat ürün grupları",
        url: `${SITE_URL}/urun-gruplari`,
      },
    ],
  },
};

// Telefon / faks yalnızca numaralar doğrulandıysa (CONTACT_NUMBERS_VERIFIED) yazılır.
if (PRIMARY_PHONE) storeJsonLd.telephone = PRIMARY_PHONE.e164;
if (CONTACT_NUMBERS_VERIFIED && COMPANY.faxE164) storeJsonLd.faxNumber = COMPANY.faxE164;
if (sameAs.length > 0) storeJsonLd.sameAs = sameAs;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    storeJsonLd,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY.name,
      alternateName: COMPANY.legalName,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#store` },
      // components/ProductCatalog.tsx /urunler?q=… parametresini okuyup aramayı uygular.
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/urunler?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
