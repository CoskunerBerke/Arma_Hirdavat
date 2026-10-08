export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://armahirdavat.com.tr";

export const COMPANY = {
  legalName: "Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş.",
  name: "Arma Hırdavat",
  tagline: "Endüstriyel Tedarik & Tesis Malzemeleri B2B Portalı",
  description:
    "Arma Hırdavat; Türkiye genelinde 81 ildeki organize sanayi bölgelerine (OSB), fabrikalara, şantiyelere ve imalat tesislerine koli ve palet bazında toptan teknik hırdavat, bağlantı elemanları, kaynak, iş güvenliği ve endüstriyel tesis malzemeleri tedariği sağlar.",
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
    postalCode: "55300",
    country: "TR",
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
  coverage: "Türkiye Geneli 81 İl ve Tüm Organize Sanayi Bölgeleri (OSB)",
  minOrderType: "Koli, Palet ve Tesis Ambalajı (Yalnızca Toptan)",
};

/** Türkiye 81 İl Listesi — SEO & Ambar / Kargo Sevkiyat Ağı */
export const TURKEY_PROVINCES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
] as const;

/** Anahtar Kelimeler (Türkiye Geneli B2B Toptan Hırdavat) */
export const SEO_KEYWORDS = [
  "toptan teknik hırdavat türkiye",
  "toptan fabrika malzemeleri",
  "endüstriyel hırdavat toptan satış",
  "81 il şantiye hırdavat tedariği",
  "organize sanayi bölgesi hırdavat tedarikçisi",
  "toptan civata somun bağlantı elemanları",
  "toptan çelik halat gijon saplama",
  "toptan iş güvenliği ekipmanları koli palet",
  "toptan kaynak makineleri elektrot kaynak teli",
  "toptan kesici taşlama taşları el aletleri",
  "b2b kurumsal hırdavat portalı",
  "toptan hırdavat fiyat teklifi al",
  "palet bazlı hırdavat sevkiyatı türkiye",
  "samsun merkezli 81 il hırdavat ambar sevkiyatı"
];

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
