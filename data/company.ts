export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://armahirdavat.com.tr";

export const COMPANY = {
  legalName: "Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş.",
  name: "Arma Hırdavat",
  tagline: "Fabrika Malzemeleri & Teknik Hırdavat",
  description:
    "Arma Hırdavat; Samsun Tekkeköy'de fabrikalara, sanayi tesislerine, atölyelere ve şantiyelere bağlantı elemanlarından kaynak makinelerine, iş güvenliğinden pompalara kadar 30 ürün grubunda teknik hırdavat tedariği sağlar.",
  phones: [
    { label: "+90 (362) 266 60 95", href: "tel:+903622666095" },
    { label: "+90 (362) 266 67 50", href: "tel:+903622666750" },
  ],
  fax: "+90 (362) 266 60 94",
  email: "bilgi@armahirdavat.com.tr",
  address: {
    street: "Şabanoğlu Mah. 512. Sok. No: 3 Adnan Kahveci Bulv.",
    district: "Tekkeköy",
    city: "Samsun",
    full: "Şabanoğlu Mah. 512. Sok. No: 3 Adnan Kahveci Bulv. Tekkeköy / SAMSUN",
  },
  mapEmbed:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Şabanoğlu Mah. 512. Sok. No:3 Tekkeköy Samsun") +
    "&z=16&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Arma Hırdavat Şabanoğlu Mah. 512. Sok. No:3 Tekkeköy Samsun"),
  paymentUrl: "https://odeme.armahirdavat.com.tr/",
};

export const NAV = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/markalar", label: "Markalar" },
  { href: "/katalog", label: "Katalog" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const BRANDS = [
  { name: "Domak", desc: "Santrifüj, kademeli ve dalgıç pompalar, hidrofor sistemleri", logo: "/images/brands/domak.jpg", url: "http://www.domak.com.tr" },
  { name: "Doğan Makina", desc: "İnşaat makineleri ve şantiye ekipmanları", logo: "/images/brands/doganmakina.jpg", url: "http://doganmakina.com.tr/" },
  { name: "Sufil", desc: "Su filtreleri ve arıtma ürünleri", logo: "/images/brands/sufil.jpg", url: "http://www.sufil.com.tr/" },
  { name: "İzeltaş", desc: "Profesyonel el aletleri ve takım setleri" },
  { name: "3M", desc: "Solunum koruma, göz, kulak ve vücut koruyucu ürünler" },
  { name: "Pakkens", desc: "Manometre, termometre ve pnömatik ürünler" },
];

export const CATALOGS = [
  {
    title: "Arma Hırdavat Ürün Kataloğu",
    updated: "08.07.2014",
    size: "16 MB",
    url: "https://armahirdavat.com.tr/icerik/teknik/MU1D66BL.pdf",
  },
  {
    title: "Domak Pompa 2013 Kataloğu",
    updated: "07.06.2013",
    size: "38 MB",
    url: "https://armahirdavat.com.tr/icerik/teknik/LX4V53CJ.pdf",
  },
];
