import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COMPANY_INFO } from "@/data/company";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://armahirdavat.com.tr"),
  title: "Arma Hırdavat | Samsun Teknik Hırdavat ve Fabrika Malzemeleri",
  description: "Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş. — Samsun Tekkeköy merkezli, 10.000+ ürün çeşidi, bağlantı elemanları, İzeltaş el aletleri, 3M iş güvenliği, halat ve kaynak makineleri tedarikçiniz.",
  keywords: [
    "Arma Hırdavat",
    "Samsun hırdavat",
    "Tekkeköy teknik hırdavat",
    "fabrika malzemeleri",
    "bağlantı elemanları cıvata somun",
    "İzeltaş yetkili satıcı Samsun",
    "3M iş güvenliği maske baret",
    "çelik halat gemi halatı",
    "kaynak makineleri elektrot",
    "Pakkens manometre pnömatik",
    "Domak pompa hidrofor Samsun"
  ],
  authors: [{ name: COMPANY_INFO.name }],
  openGraph: {
    title: "Arma Hırdavat | Endüstriyel Teknik Hırdavat ve Fabrika Malzemeleri",
    description: "Samsun ve Karadeniz bölgesinin lider sanayi ve fabrika tedarikçisi. 10.000+ aktif stok, aynı gün sevkiyat.",
    url: "https://armahirdavat.com.tr",
    siteName: "Arma Hırdavat",
    images: [
      {
        url: "/images/logo.png",
        width: 600,
        height: 600,
        alt: "Arma Hırdavat Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arma Hırdavat | Teknik Hırdavat & Fabrika Donanımları",
    description: "Samsun Tekkeköy sanayisinde 30 yılı aşkın tecrübe, 30 ürün grubu ve 10.000+ çeşit stok gücü.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google SEO için LocalBusiness ve Organization JSON-LD Şeması
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "name": COMPANY_INFO.name,
    "alternateName": COMPANY_INFO.shortName,
    "url": "https://armahirdavat.com.tr",
    "logo": "https://armahirdavat.com.tr/images/logo.png",
    "image": "https://armahirdavat.com.tr/images/logo.png",
    "description": COMPANY_INFO.description,
    "telephone": COMPANY_INFO.phone,
    "faxNumber": COMPANY_INFO.fax,
    "email": COMPANY_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Şabanoğlu Mah. 512. Sok. No: 3 Adnan Kahveci Bulv.",
      "addressLocality": "Tekkeköy",
      "addressRegion": "Samsun",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2291,
      "longitude": 36.4475
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "8",
      "bestRating": "5"
    },
    "priceRange": "$$"
  };

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} id="top">
        {children}
      </body>
    </html>
  );
}
