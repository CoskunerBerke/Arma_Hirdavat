export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://armahirdavat.com.tr";

export const COMPANY = {
  legalName: "Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş.",
  name: "Arma Hırdavat",
  tagline: "Endüstriyel Tedarik & Tesis Malzemeleri B2B Portalı",
  description:
    "Arma Hırdavat; Türkiye'nin önde gelen organize sanayi bölgelerine (OSB), ağır sanayi tesislerine, şantiyelerine ve imalat fabrikalarına koli ve çemberli palet bazında toptan teknik sarf, bağlantı elemanları, kaynak, iş güvenliği ve endüstriyel tesis malzemeleri tedariği sağlar.",
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
  coverage: "Organize Sanayi Bölgeleri (OSB), Ağır Sanayi Havzaları ve Üretim Tesisleri Doğrudan Teslimatı",
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
  "organize sanayi bölgesi hırdavat tedarikçisi",
  "toptan civata somun bağlantı elemanları",
  "toptan çelik halat gijon saplama",
  "toptan iş güvenliği ekipmanları koli palet",
  "toptan kaynak makineleri elektrot kaynak teli",
  "toptan kesici taşlama taşları el aletleri",
  "b2b kurumsal hırdavat portalı",
  "toptan hırdavat fiyat teklifi al",
  "palet bazlı hırdavat sevkiyatı türkiye",
  "samsun merkezli osb ambar sevkiyatı"
];

export const NAV = [
  { href: "/urunler", label: "Ürün Grupları" },
  { href: "/kurumsal", label: "Kurumsal & Referanslar" },
  { href: "/#lojistik", label: "Sevkiyat & Lojistik" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const BRANDS = [
  { name: "FABA Safety", desc: "İş eldivenleri, kimyasal ve lamineli tulumlar, KKD ekipmanları üreticisi (Kastamonu OSB)", logo: "/images/brands/faba.png", url: "https://www.fabasafety.com" },
  { name: "Domak", desc: "Santrifüj, kademeli ve dalgıç pompalar, hidrofor sistemleri", logo: "/images/brands/domak.jpg", url: "http://www.domak.com.tr" },
  { name: "Doğan Makina", desc: "İnşaat makineleri ve şantiye ekipmanları", logo: "/images/brands/doganmakina.jpg", url: "http://doganmakina.com.tr/" },
  { name: "Sufil", desc: "Su filtreleri ve arıtma ürünleri", logo: "/images/brands/sufil.jpg", url: "http://www.sufil.com.tr/" },
  { name: "İzeltaş", desc: "Profesyonel el aletleri ve takım setleri" },
  { name: "3M", desc: "Solunum koruma, göz, kulak ve vücut koruyucu ürünler" },
  { name: "Pakkens", desc: "Manometre, termometre ve pnömatik ürünler" },
];

export const CATALOGS = [
  {
    title: "FABA İş Güvenliği & KKD Resmi Ürün Kataloğu",
    description: "İşçi eldivenleri, köpük nitril, kesilmeye dirençli eldivenler, Zevahir kaynak eldivenleri ve Tip 3B/4B/5B/6B kimyasal koruyucu tulumlar.",
    updated: "2026 Güncel Baskı",
    size: "40.7 MB",
    pages: "48 Sayfa",
    url: "/catalogs/FABA-Catalog-TR.pdf",
  },
];

export interface ClientReference {
  name: string;
  sector: string;
  logo: string;
  url: string;
  badge: string;
  description: string;
  supplyScope: string;
  tags: string[];
  width?: number;
  height?: number;
}

/** Çalıştığımız ve Düzenli Malzeme Tedariği Sağladığımız Öncü Sanayi Kuruluşları */
export const CLIENT_REFERENCES: ClientReference[] = [
  {
    name: "Rönesans Holding",
    sector: "Uluslararası İnşaat & Global Müteahhitlik (ENR Top 250)",
    logo: "/images/clients/ronesans.svg",
    url: "https://ronesans.com/enr-top-250",
    badge: "Global Müteahhitlik & Altyapı",
    description:
      "Avrupa, Orta Asya ve Orta Doğu genelinde mega altyapı projeleri, sağlık kampüsleri, enerji santralleri ve endüstriyel tesisler inşa eden ENR Top 250 listesindeki dünyanın en büyük 38. uluslararası müteahhitlik şirketidir.",
    supplyScope:
      "Uluslararası mega şantiye sahalarına koli ve palet ölçeğinde CE belgeli FABA iş güvenliği eldivenleri, baret & yüksekte çalışma ekipmanları, civata bağlantı elemanları ve teknik sarf malzemeleri tedariği.",
    tags: ["ENR Top 250 (38. Sıra)", "30+ Ülke Operasyonu", "Ağır Şantiye Standartları"],
  },
  {
    name: "Sampa Otomotiv",
    sector: "Ağır Vasıta & Ticari Araç Yedek Parça İmalatı",
    logo: "/images/clients/sampa.png",
    url: "https://www.sampa.com/tr",
    badge: "Global İhracat Lideri",
    description:
      "160'tan fazla ülkeye ihracat gerçekleştiren, ağır vasıta, çekici ve ticari araç yedek parçası imalatında dünyanın en büyük entegre kampüslerinden birine sahip sanayi devidir. Samsun OSB'de 150.000 m² kapalı alanda üretim yapmaktadır.",
    supplyScope:
      "Yüksek otomasyonlu fabrika üretim hatları ve talaşlı işleme atölyeleri için hassas montaj eldivenleri, kesici-aşındırıcı taşlar, pnömatik bağlantılar ve endüstriyel sarf tedariği.",
    tags: ["160+ Ülkeye İhracat", "150.000 m² Entegre Tesis", "Otomotiv OEM Kalitesi"],
  },
  {
    name: "Yeşilyurt Demir Çelik",
    sector: "Ağır Sanayi, Haddehane & Çelik İmalat Tesisleri",
    logo: "/images/clients/yesilyurt.svg",
    url: "https://www.yesilyurtdc.com.tr/",
    badge: "Ağır Sanayi Devi",
    description:
      "Türkiye'nin en köklü entegre çelik üreticilerinden biridir. Yıllık milyonlarca ton kütük demir, nervürlü inşaat demiri ve filmaşin üretimi gerçekleştirmekte; kendi liman işletmesi ve deniz lojistik filosu ile küresel pazarlara sevkiyat yapmaktadır.",
    supplyScope:
      "Yüksek sıcaklıklı ergitme ocakları ve haddehane sahaları için ısıya dayanıklı Zevahir kaynak eldivenleri, ağır mekanik koruyucular, çelik halat sapanlar ve endüstriyel hırdavat ürünleri.",
    tags: ["Milyon Ton Üretim Kapasitesi", "Entegre Liman Tesisleri", "Yüksek Isı & Haddehane Normları"],
  },
  {
    name: "Samsun Makina Sanayi",
    sector: "Duktil Boru, Döküm & Endüstriyel Makine İmalatı",
    logo: "/images/clients/samsunmakina.png",
    url: "https://www.samsunmakina.com.tr/",
    badge: "Altyapı Boru & Ağır Döküm",
    description:
      "Türkiye'nin ve yakın coğrafyanın en büyük duktil döküm boru, vana, armatür ve endüstriyel pompa üreticisidir. DSİ, İller Bankası ve uluslararası içme suyu/hidroelektrik projelerinin anahtar teslim borulama altyapısını üretmektedir.",
    supplyScope:
      "Ağır dökümhane ve talaşlı işleme fabrikaları için Seviye D kesilmez eldivenler, taşlama taşları, yüksek mukavemetli çelik civata-somun grupları ve kimyasal sızdırmazlık ürünleri.",
    tags: ["Duktil Döküm Boru Öncüsü", "DSİ & Ulusal Altyapı", "Ağır Dökümhane Standartları"],
  },
  {
    name: "CNR Otomasyon",
    sector: "Endüstriyel Otomasyon & Robotik Fabrika Çözümleri",
    logo: "/images/clients/cnr.png",
    url: "https://www.cnrotomasyon.com.tr/index.php?route=common/home",
    badge: "Robotik & Endüstri 4.0",
    description:
      "Endüstri 4.0 uyumlu akıllı fabrika otomasyonu, robotik kaynak ve paletleme hücreleri, montaj hatları ve PLC kontrollü endüstriyel makineler tasarlayıp anahtar teslim kuran öncü mühendislik kuruluşudur.",
    supplyScope:
      "Robotik entegrasyon sahaları, hassas otomasyon panoları ve montaj hatları için elektrostatik koruyucu & mikro köpük nitril eldivenler, el aletleri ve teknik sarf malzemeleri.",
    tags: ["Robotik Kaynak & Paletleme", "Endüstri 4.0 Entegrasyonu", "Hassas Montaj & Güvenlik"],
  },
];

