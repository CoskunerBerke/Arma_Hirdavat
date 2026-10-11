/* ────────────────────────────────────────────────────────────────────────────
 * SİTE ADRESİ
 * Öncelik: NEXT_PUBLIC_SITE_URL (elle) → Vercel production alan adı → deploy URL → localhost.
 * Vercel'e armahirdavat.com.tr eklendiğinde VERCEL_PROJECT_PRODUCTION_URL otomatik olarak
 * o alan adına döner; canonical, sitemap ve JSON-LD bir sonraki deploy'da kendiliğinden geçer.
 * ──────────────────────────────────────────────────────────────────────────── */
const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;
const PRODUCTION_HOST =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
const DEPLOYMENT_HOST = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (VERCEL_ENV === "production" && PRODUCTION_HOST) return `https://${PRODUCTION_HOST}`;
  if (DEPLOYMENT_HOST) return `https://${DEPLOYMENT_HOST}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Yalnızca production deploy'u (veya elle SITE_URL verilmiş, Vercel dışı bir sunucu) indekslenir. Preview/localhost noindex. */
export const IS_INDEXABLE =
  VERCEL_ENV === "production" || (!VERCEL_ENV && Boolean(process.env.NEXT_PUBLIC_SITE_URL));

/* ────────────────────────────────────────────────────────────────────────────
 * İLETİŞİM NUMARALARI — TEK KAYNAK
 * Aşağıdaki telefon / faks / WhatsApp numaraları GEÇİCİDİR (yanlış).
 * Doğru numaralar gelince: 1) numaraları güncelleyin, 2) CONTACT_NUMBERS_VERIFIED = true yapın.
 * false iken arama ve WhatsApp butonları gizlenir ve numaralar JSON-LD'ye yazılmaz;
 * böylece müşteriler yanlış numaraları aramaz.
 * ──────────────────────────────────────────────────────────────────────────── */
export const CONTACT_NUMBERS_VERIFIED = false;

export const COMPANY = {
  legalName: "Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş.",
  name: "Arma Hırdavat",
  tagline: "Fabrikalar ve sanayi tesisleri için yüksek hacimli endüstriyel tedarik",
  description:
    "Arma Hırdavat; fabrikalara, şantiyelere ve imalat hatlarına bağlantı elemanından hortuma, kesici taştan el aletine ve iş güvenliği ürünlerine kadar teknik hırdavat ve endüstriyel sarf malzemesi tedarik eder. Koli ve palet bazlı siparişler kurumsal teklifle hazırlanır, Türkiye'nin dört bir yanındaki organize sanayi bölgelerine kurumsal lojistik standartlarıyla sevk edilir. Merkez mağaza: Tekkeköy / Samsun.",
  phones: [
    { label: "+90 (362) 266 60 95", href: "tel:+903622666095", e164: "+903622666095" },
    { label: "+90 (362) 266 67 50", href: "tel:+903622666750", e164: "+903622666750" },
  ],
  fax: "+90 (362) 266 60 94",
  faxE164: "+903622666094",
  /** wa.me formatı: ülke kodu dahil, yalnızca rakam */
  whatsapp: "903622666095",
  email: "bilgi@armahirdavat.com.tr",
  address: {
    street: "Şabanoğlu Mah. 512. Sok. No: 3 Adnan Kahveci Bulv.",
    district: "Tekkeköy",
    city: "Samsun",
    postalCode: "55300",
    country: "TR",
    full: "Şabanoğlu Mah. 512. Sok. No: 3 Adnan Kahveci Bulv. Tekkeköy / Samsun",
  },
  /** Google İşletme Profili'ndeki pin (Google Haritalar'dan alındı, 11.10.2026). */
  geo: { latitude: 41.2374258, longitude: 36.4240476 },
  mapEmbed: "https://maps.google.com/maps?q=41.2374258,36.4240476&hl=tr&z=17&output=embed",
  /** Google Haritalar'da işletme profilini açar (yol tarifi + yorumlar). */
  mapLink: "https://maps.google.com/?cid=9693400817000170214",
  /** Google İşletme Profili (sameAs + "Google yorumları" bağlantısı bunu kullanır). */
  googleBusinessUrl: "https://maps.google.com/?cid=9693400817000170214" as string,
  /** Diğer resmi profiller (LinkedIn, Facebook, Instagram…) — JSON-LD sameAs. */
  socialProfiles: [] as string[],
  paymentUrl: "https://odeme.armahirdavat.com.tr/",
  coverage: "Türkiye'nin dört bir yanındaki organize sanayi bölgelerine kurumsal sevk",
  minOrderType: "Koli ve palet bazında kurumsal tedarik",
  /** Eski sitede (armahirdavat.com.tr) 2014'ten beri yayında olduğu belirtiliyor. */
  onlineSince: 2014,
};

/** Doğrulanmış numaralar; doğrulanmadıysa boş dizi (butonlar gizlenir). */
export const VISIBLE_PHONES = CONTACT_NUMBERS_VERIFIED ? COMPANY.phones : [];
export const PRIMARY_PHONE = VISIBLE_PHONES[0] ?? null;
export const WHATSAPP_ENABLED = CONTACT_NUMBERS_VERIFIED && COMPANY.whatsapp.length > 0;

/** wa.me linki (WHATSAPP_ENABLED false ise null). */
export function whatsappHref(text?: string): string | null {
  if (!WHATSAPP_ENABLED) return null;
  return `https://wa.me/${COMPANY.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** mailto linki (konu + gövde Türkçe karakterlerle güvenli kodlanır). */
export function mailtoHref(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${COMPANY.email}${params.length ? `?${params.join("&")}` : ""}`;
}

/* ────────────────────────────────────────────────────────────────────────────
 * ÇALIŞMA SAATLERİ — TEK KAYNAK (görünür metin + JSON-LD buradan üretilir)
 * İşletme sahibi tarafından teyit edildi (11.10.2026): Pzt–Cum 08:00–17:50, Cmt 08:00–16:00, Pazar kapalı.
 * Saatler üst şeritte GÖSTERİLMEZ; yalnızca footer, mağaza bölümü/kartı ve iletişim sayfasında yer alır.
 * ──────────────────────────────────────────────────────────────────────────── */
export const OPENING_HOURS = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    opens: "08:00",
    closes: "17:50",
  },
  {
    days: ["Saturday"] as const,
    opens: "08:00",
    closes: "16:00",
  },
];
export const HOURS_TEXT = "Hafta içi 08:00–17:50, Cumartesi 08:00–16:00";
export const HOURS_SHORT = "Hf. içi 08:00–17:50 · Cmt 08:00–16:00";

/* ────────────────────────────────────────────────────────────────────────────
 * VERİLEN SÖZLER — TEK KAYNAK
 * Metinler işletme sahibinin brifinden (Ekim 2026) alındı: sayısal sınır (il sayısı, ürün adedi) YAZILMAZ;
 * "toptan" kelimesi kullanılmaz (yerine "kurumsal tedarik", "koli ve palet bazında"). Değişiklik için
 * yalnızca bu dosyayı güncellemek yeterli.
 * ──────────────────────────────────────────────────────────────────────────── */
export const PROMISES = {
  /** Teklif dönüş süresi (uzun) — işletme sahibinin kendi taahhüdü */
  quoteTurnaround:
    "Talepleriniz uzman teknik ekibimizce değerlendirilip aynı gün resmi teknik teklif formu olarak iletilir (E-posta / WhatsApp / PDF).",
  /** Teklif dönüş süresi (rozet / çip) */
  quoteShort: "Aynı gün resmi teknik teklif",
  /** Sevkiyat (uzun) */
  delivery:
    "Koli ve palet bazlı siparişlerinizi Türkiye'nin dört bir yanındaki organize sanayi bölgelerine ve tesislerinize kurumsal lojistik standartlarıyla sevk ediyoruz. Tahmini teslim süresi ve nakliye koşulları teklifinizde belirtilir.",
  /** Sevkiyat (rozet / çip) */
  deliveryShort: "Türkiye'nin dört bir yanına kurumsal sevk",
  /** Teklif CTA'larının altındaki risk azaltıcı mikro metin */
  quoteReassurance: "Resmi teknik teklif · Bağlayıcı değildir · Üyelik gerekmez",
  /** Ürün belgeleri */
  documentation: "Her ürün sayfasında CE işareti ve EN standart kodları açıkça yazılıdır.",
};

/* ────────────────────────────────────────────────────────────────────────────
 * CTA ETİKETLERİ — sitenin her yerinde aynı eylem için aynı kelimeler
 * ──────────────────────────────────────────────────────────────────────────── */
export const CTA = {
  /** Teklif akışını açar (hero, header, bantlar). İşletme sahibi alternatifler arasından seçecek: yalnızca burayı değiştirin. */
  primary: "Fiyat Teklifi Alın",
  /** Dar ekranlarda (header) birincil eylemin kısa hali */
  primaryShort: "Teklif Alın",
  /** Ürünü teklif listesine ekler */
  addToList: "Teklif Listesine Ekle",
  addShort: "Listeye Ekle",
  added: "Listede",
  /** Liste doluyken header / bar etiketi (yanına adet eklenir) */
  openList: "Teklif Listesi",
  /** Form gönderimi */
  submit: "Teklif Talebini Gönder",
  /** İkincil eylem */
  browse: "E-Kataloglar ve Ürün Grupları",
  catalog: "E-Kataloğu İndir (PDF)",
};

/** Türkiye 81 İl Listesi — teslimat ili seçimi için */
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

/**
 * Meta keywords Google tarafından kullanılmaz; yalnızca iç referans / Bing için tutulur.
 * Gerçek ürün gamıyla (FABA KKD kataloğu + mağazadaki teknik hırdavat grupları) uyumludur.
 */
export const SEO_KEYWORDS = [
  "endüstriyel hırdavat",
  "fabrika malzemeleri",
  "samsun hırdavat",
  "samsun iş güvenliği malzemeleri",
  "faba iş eldiveni",
  "endüstriyel tedarik",
  "kurumsal hırdavat tedariki",
  "nitril kaplı iş eldiveni",
  "köpük nitril eldiven",
  "kesilmeye dirençli eldiven",
  "kaynakçı eldiveni",
  "kimyasal koruyucu tulum",
  "tek kullanımlık tulum",
  "teknik hırdavat samsun",
];

/**
 * Mağazada / tedarikte bulunan teknik hırdavat ürün grupları.
 * KAYNAK: Firmanın kendi eski sitesi (armahirdavat.com.tr/arma-urun-gruplari.asp) — 30 grup.
 * Bu gruplar için online ürün sayfası yoktur; teklif "serbest metin" kalemiyle istenir.
 */
export const HARDWARE_GROUPS = [
  "Bağlantı Elemanları",
  "Diğer Bağlantı Elemanları",
  "Çelik Halat ve Gemi Halatı",
  "Polyester Halat, Kaldırma ve İndirme Ekipmanları",
  "Havalı El Aletleri",
  "Elektrikli El Aletleri",
  "Vana, Flanş ve Boru Ek Parçaları",
  "Hortum Çeşitleri",
  "El Aletleri",
  "İzeltaş El Aletleri",
  "Eldiven Çeşitleri",
  "İş Güvenliği Ekipmanları",
  "3M Ürünleri",
  "Ölçü Aletleri",
  "Kaynak Makinaları",
  "Elektrot ve Gazaltı Kaynak Teli Ekipmanları",
  "Gaz ve Gaz Aletleri",
  "Pnömatik Ürünler (Pakkens)",
  "Matkap Ucu, Kılavuz ve Pafta",
  "Testere, Profil Kesme, Karot ve Sarf Malzemeleri",
  "Kesme ve Taşlama Taşları",
  "Aşındırıcı Ürünler",
  "Yıkama ve Yağlama Ekipmanları",
  "Kompresör ve Airless Boya Makinası",
  "Endüstriyel Kimyasallar ve Yapıştırıcılar",
  "Sanayi Bantları ve Ambalaj Ürünleri",
  "Aspiratör, Mengene, İşkence ve Boya Sarf Malzemeleri",
  "Sanayi Tekerleri",
  "Merdiven, İnşaat Makinaları ve İnşaat El Aletleri",
  "Domak Pompa ve Sufil Ürünleri",
] as const;

export type HardwareGroupName = (typeof HARDWARE_GROUPS)[number];

/**
 * Menüde ve ana sayfada öne çıkan endüstriyel malzeme grupları (kısa görünen adlarıyla).
 * Bağlantılar /urun-gruplari#<slugify(group)> çapasına gider. Sıra = görünüm sırası.
 */
export const FEATURED_HARDWARE_GROUPS: { group: HardwareGroupName; label: string }[] = [
  { group: "Bağlantı Elemanları", label: "Bağlantı Elemanları" },
  { group: "Hortum Çeşitleri", label: "Endüstriyel Hortumlar" },
  { group: "Domak Pompa ve Sufil Ürünleri", label: "Pompa ve Hidrofor" },
  { group: "Vana, Flanş ve Boru Ek Parçaları", label: "Vana, Flanş ve Boru Ek Parçaları" },
  { group: "Kesme ve Taşlama Taşları", label: "Kesme ve Taşlama Taşları" },
  { group: "Aşındırıcı Ürünler", label: "Aşındırıcı Ürünler" },
  { group: "El Aletleri", label: "El Aletleri" },
  { group: "Elektrikli El Aletleri", label: "Elektrikli El Aletleri" },
  { group: "Elektrot ve Gazaltı Kaynak Teli Ekipmanları", label: "Kaynak Teli ve Elektrot" },
  { group: "Endüstriyel Kimyasallar ve Yapıştırıcılar", label: "Endüstriyel Kimyasallar" },
];

export interface Brand {

  name: string;
  desc?: string;
  /** /public altındaki logo yolu. Yoksa sayfada yazılı rozet gösterilir. */
  logo?: string;
  url?: string;
  /** Markanın ait olduğu mağaza ürün grubu (HARDWARE_GROUPS). Yalnızca eşleşme kesinse doldurun. */
  group?: HardwareGroupName;
  /** Aynı markanın diğer yazılışları (LEGACY_BRAND_NAMES ile eşleştirme için). */
  aliases?: readonly string[];
}

/**
 * Markalar — /markalar sayfası bu listeyi kullanır.
 * FABA: online katalogdaki tüm ürünlerin markası (ilk sırada kalmalı).
 * Diğerleri: firmanın eski sitesindeki marka sayfasından (arma-markalar.asp) alınan markalar;
 * logolar aynı sayfadan alınıp /public/images/brands altına kırpılarak kaydedildi.
 * Yetkili bayilik iddiası İÇERMEZ. Artık satılmayan markayı listeden çıkarın.
 */
export const BRANDS: Brand[] = [
  { name: "FABA Safety", desc: "İş eldivenleri, kimyasal koruyucu ve tek kullanımlık tulumlar, önlük, kolluk ve galoşlar", logo: "/images/brands/faba.png", url: "https://www.fabasafety.com", aliases: ["FABA"] },
  { name: "Domak Pompa", desc: "Santrifüj, kademeli ve dalgıç pompalar, hidrofor sistemleri", logo: "/images/brands/domak-pompa.jpg", group: "Domak Pompa ve Sufil Ürünleri", aliases: ["Domak"] },
  { name: "Sufil", group: "Domak Pompa ve Sufil Ürünleri" },
  { name: "Çetin Cıvata", desc: "Cıvata, somun ve bağlantı elemanları", logo: "/images/brands/cetin-civata.jpg", group: "Bağlantı Elemanları" },
  { name: "Has Çelik", desc: "Çelik tel ve çelik halat", logo: "/images/brands/hascelik.jpg", group: "Çelik Halat ve Gemi Halatı" },
  { name: "Netlift", desc: "Kaldırma ve indirme ekipmanları", logo: "/images/brands/netlift.jpg", group: "Polyester Halat, Kaldırma ve İndirme Ekipmanları" },
  { name: "Bosch", desc: "Elektrikli el aletleri", logo: "/images/brands/bosch.jpg", group: "Elektrikli El Aletleri" },
  { name: "Makita", desc: "Elektrikli el aletleri", logo: "/images/brands/makita.jpg", group: "Elektrikli El Aletleri" },
  { name: "İzeltaş", desc: "Profesyonel el aletleri ve takım setleri", logo: "/images/brands/izeltas.jpg", group: "İzeltaş El Aletleri" },
  { name: "SEL Hortumları", desc: "Endüstriyel hortumlar", logo: "/images/brands/sel-hortum.jpg", group: "Hortum Çeşitleri" },
  { name: "3M", desc: "Solunum, göz, kulak ve vücut koruyucu ürünler", logo: "/images/brands/3m.jpg", group: "3M Ürünleri" },
  { name: "Askaynak", desc: "Elektrot, gazaltı kaynak teli ve kaynak ekipmanları", logo: "/images/brands/askaynak.jpg", group: "Elektrot ve Gazaltı Kaynak Teli Ekipmanları" },
  { name: "Lincoln Electric", desc: "Kaynak makineleri ve kaynak sarf malzemeleri", logo: "/images/brands/lincoln-electric.jpg", group: "Kaynak Makinaları" },
  { name: "Express Weld", logo: "/images/brands/express-weld.jpg" },
  { name: "Yıldız Gaz Armatürleri", desc: "Gaz armatürleri ve gaz aletleri", logo: "/images/brands/yildiz-gaz.jpg", group: "Gaz ve Gaz Aletleri" },
  { name: "Pakkens", desc: "Manometre, termometre ve pnömatik ürünler", logo: "/images/brands/pakkens.jpg", group: "Pnömatik Ürünler (Pakkens)" },
  { name: "Karbosan", desc: "Kesme ve taşlama taşları", logo: "/images/brands/karbosan.jpg", group: "Kesme ve Taşlama Taşları" },
  { name: "Fireflex", desc: "Aşındırıcı ürünler", logo: "/images/brands/fireflex.jpg", group: "Aşındırıcı Ürünler" },
  { name: "Lupamat", desc: "Kompresörler", logo: "/images/brands/lupamat.jpg", group: "Kompresör ve Airless Boya Makinası" },
  { name: "Loctite", desc: "Endüstriyel yapıştırıcılar ve sızdırmazlık ürünleri", logo: "/images/brands/loctite.jpg", group: "Endüstriyel Kimyasallar ve Yapıştırıcılar" },
  // MTE logosu: firmanın doğru unvanı "Makina Takım Endüstrisi" (kesici takım üreticisi); eski sitedeki yazım hatalıydı.
  { name: "Makina Takım Endüstrisi", logo: "/images/brands/makina-tarim-endustrisi.jpg", aliases: ["MTE"] },
  { name: "Ateş A.Ş.", logo: "/images/brands/ates.jpg" },
  { name: "Beybi", logo: "/images/brands/beybi.jpg" },
  { name: "Kama", logo: "/images/brands/kama.jpg" },
  { name: "Foster", logo: "/images/brands/foster.jpg" },
  { name: "Doğan Makina", desc: "İnşaat makineleri ve şantiye ekipmanları", group: "Merdiven, İnşaat Makinaları ve İnşaat El Aletleri" },
];

/**
 * Eski sitede (armahirdavat.com.tr/arma-markalar.asp) listelenen markalar — kaynak firmanın kendi sitesi.
 * Hepsi BRANDS içine logolarıyla taşındı; /markalar sayfası iki listeyi isimle (ve aliases ile)
 * eşleyerek birleştirir, bu yüzden buraya eklenen yeni bir isim de otomatik görünür.
 */
export const LEGACY_BRAND_NAMES = [
  "Domak Pompa", "Çetin Cıvata", "Makina Takım Endüstrisi", "Ateş A.Ş.", "Loctite", "Yıldız Gaz Armatürleri",
  "Fireflex", "SEL Hortumları", "3M", "Bosch", "Karbosan", "Beybi", "İzeltaş", "Makita", "Kama", "Netlift",
  "Pakkens", "Has Çelik", "Foster", "Lupamat", "Express Weld", "Askaynak", "Lincoln Electric",
] as const;

/** PDF kataloglar data/catalogs.ts içinde tutulur (yeni katalog ekleme talimatı orada). CATALOGS[0] = en güncel. */
export { CATALOGS, LATEST_CATALOG, latestCatalogFor, formatCatalogDate, type Catalog, type CatalogChapter } from "./catalogs";

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

/**
 * Tedarik sağlanan firmalar (sıra işletme sahibinin brifindeki sıradır).
 * İşletme sahibi logoların kullanımı için yazılı onay aldığını teyit etti (11.10.2026).
 */
export const CLIENT_REFERENCES: ClientReference[] = [
  /*
   * Sitede yalnızca firma adı ve logo gösterilir (bağlantısız, rozetsiz).
   * badge / description / supplyScope / tags bilerek boş bırakıldı: daha önce burada
   * doğrulanmamış üstünlük ifadeleri ("Ağır Sanayi Devi", "dünyanın en büyük…") ve
   * tahmini tedarik kapsamı vardı. Doldurulacaksa yalnızca işletme sahibinin teyit ettiği,
   * firmanın onay verdiği bilgi yazılmalıdır.
   */
  {
    name: "Samsun Makina Sanayi",
    sector: "Döküm boru ve makine imalatı",
    logo: "/images/clients/samsunmakina.png",
    url: "https://www.samsunmakina.com.tr/",
    badge: "",
    description: "",
    supplyScope: "",
    tags: [],
  },
  {
    name: "Yeşilyurt Demir Çelik",
    sector: "Demir çelik üretimi",
    logo: "/images/clients/yesilyurt.svg",
    url: "https://www.yesilyurtdc.com.tr/",
    badge: "",
    description: "",
    supplyScope: "",
    tags: [],
  },
  {
    name: "Sampa Otomotiv",
    sector: "Ticari araç yedek parça imalatı",
    logo: "/images/clients/sampa.png",
    url: "https://www.sampa.com/tr",
    badge: "",
    description: "",
    supplyScope: "",
    tags: [],
  },
  {
    name: "Rönesans Holding",
    sector: "İnşaat ve müteahhitlik",
    logo: "/images/clients/ronesans.svg",
    url: "https://ronesans.com/",
    badge: "",
    description: "",
    supplyScope: "",
    tags: [],
  },
  {
    /*
     * Görünen ad yalnızca "CNR". İşletme sahibi brifte "CNR (CRRC)" yazdı; ancak elimizdeki logo dosyası
     * CNR Grup Otomasyon'a ait. Hangi firma olduğunu işletme sahibi TEYİT ETMELİ (CRRC yazılmadı).
     */
    name: "CNR",
    sector: "Endüstriyel otomasyon",
    logo: "/images/clients/cnr.png",
    url: "https://www.cnrotomasyon.com.tr/",
    badge: "",
    description: "",
    supplyScope: "",
    tags: [],
  },
];
