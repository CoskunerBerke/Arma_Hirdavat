export type CategoryName =
  | "Bağlantı & Sabitleme"
  | "Halat & Kaldırma"
  | "El Aletleri & Makineler"
  | "Tesisat & Pnömatik"
  | "İş Güvenliği"
  | "Kaynak & Gaz"
  | "Kesici & Aşındırıcı"
  | "Kimyasal & Ambalaj"
  | "Sanayi & Yapı";

export interface ProductGroup {
  id: number;
  slug: string;
  title: string;
  category: CategoryName;
  image: string;
  description: string;
  items: string[];
}

export const CATEGORIES: CategoryName[] = [
  "Bağlantı & Sabitleme",
  "Halat & Kaldırma",
  "El Aletleri & Makineler",
  "Tesisat & Pnömatik",
  "İş Güvenliği",
  "Kaynak & Gaz",
  "Kesici & Aşındırıcı",
  "Kimyasal & Ambalaj",
  "Sanayi & Yapı",
];

export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", I: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Raw = Omit<ProductGroup, "slug" | "image">;

const RAW: Raw[] = [
  {
    id: 1,
    title: "Bağlantı Elemanları",
    category: "Bağlantı & Sabitleme",
    description: "Cıvata, somun, pul, rondela, saplama ve vidalarda DIN/ISO ölçülerinde çelik ve paslanmaz bağlantı elemanları.",
    items: ["Altıgen ve imbus başlı cıvatalar", "Somun, pul ve rondela çeşitleri", "Paslanmaz (A2 / A4) bağlantı ürünleri", "Saplama, gijon ve U cıvatalar"],
  },
  {
    id: 2,
    title: "Diğer Bağlantı Elemanları",
    category: "Bağlantı & Sabitleme",
    description: "Perçin, kelepçe, dübel, segman ve pim gibi montaj ve sabitleme için tamamlayıcı bağlantı parçaları.",
    items: ["Pop perçin ve somunlu perçinler", "Hortum kelepçeleri", "Çelik ve plastik dübeller", "Segman ve pim çeşitleri"],
  },
  {
    id: 3,
    title: "Çelik Halat ve Gemi Halatı",
    category: "Halat & Kaldırma",
    description: "Liman, tersane, inşaat ve kaldırma sistemleri için çelik halatlar, gemi halatları ve halat aksesuarları.",
    items: ["Çelik halatlar", "Gemi bağlama halatları", "Halat klemensleri ve radansalar", "Kilit (şakıl) ve mapalar"],
  },
  {
    id: 4,
    title: "Polyester Halat, Kaldırma İndirme Ekipmanları",
    category: "Halat & Kaldırma",
    description: "Polyester sapanlar, caraskallar, zincirler, transpaletler ve istif ekipmanları ile yük kaldırma ve taşıma çözümleri.",
    items: ["Polyester bez ve sonsuz sapanlar", "Zincirli ve elektrikli caraskallar", "Transpalet ve istif makineleri", "Spanzet ve yük bağlama ekipmanları"],
  },
  {
    id: 5,
    title: "Havalı El Aletleri",
    category: "El Aletleri & Makineler",
    description: "Pnömatik somun sıkma, zımpara, taşlama, perçin ve çivi tabancaları ile boya tabancaları.",
    items: ["Havalı somun sıkma makineleri", "Havalı zımpara ve taşlamalar", "Çivi ve zımba tabancaları", "Boya ve gres tabancaları"],
  },
  {
    id: 6,
    title: "Elektrikli El Aletleri",
    category: "El Aletleri & Makineler",
    description: "Matkap, kırıcı-delici, taşlama, akülü vidalama ve kesme makineleri ile lazer hizalama cihazları.",
    items: ["Matkap ve kırıcı-deliciler", "Avuç ve büyük taşlamalar", "Akülü vidalama setleri", "Jeneratör ve bahçe makineleri"],
  },
  {
    id: 7,
    title: "Vana, Flanş, Boru Ek Parçaları",
    category: "Tesisat & Pnömatik",
    description: "Küresel ve kelebek vanalar, flanşlar, dirsek, te, manşon ve diğer boru bağlantı parçaları.",
    items: ["Küresel ve kelebek vanalar", "Düz ve kaynak boyunlu flanşlar", "Dirsek, te, manşon, nipel", "Paslanmaz boru ek parçaları"],
  },
  {
    id: 8,
    title: "Hortum Çeşitleri",
    category: "Tesisat & Pnömatik",
    description: "Hidrolik, hava, su, yangın ve spiral hortumlar; sanayi ve tesisat için farklı basınç sınıflarında.",
    items: ["Hidrolik hortumlar", "Hava ve su hortumları", "Yangın hortumları", "Spiral pnömatik hortumlar"],
  },
  {
    id: 9,
    title: "El Aletleri",
    category: "El Aletleri & Makineler",
    description: "Anahtar ve lokma takımları, pense, keski, çekiç, boru anahtarları ve atölye takım dolapları.",
    items: ["Kombine ve yıldız anahtarlar", "Lokma takımları", "Pense, kargaburun, yan keski", "Takım dolapları ve çantaları"],
  },
  {
    id: 10,
    title: "İzeltaş El Aletleri",
    category: "El Aletleri & Makineler",
    description: "Yerli üretici İzeltaş'ın anahtar, pense, tornavida, tork anahtarı ve takım setleri.",
    items: ["İzeltaş anahtar takımları", "İzeltaş pense ve kesiciler", "Tork anahtarları", "İzolasyonlu elektrikçi aletleri"],
  },
  {
    id: 11,
    title: "Eldiven Çeşitleri",
    category: "İş Güvenliği",
    description: "Montaj, kaynak, kimyasal, kesilmeye ve ısıya dayanıklı iş eldivenleri.",
    items: ["Nitril ve lateks kaplı eldivenler", "Deri kaynakçı eldivenleri", "Kesilmeye dayanıklı eldivenler", "Kimyasal ve elektrikçi eldivenleri"],
  },
  {
    id: 12,
    title: "İş Güvenliği Ekipmanları",
    category: "İş Güvenliği",
    description: "Baret, emniyet kemeri, iş ayakkabısı, reflektörlü yelek, trafik konisi ve uyarı ekipmanları.",
    items: ["Paraşüt tipi emniyet kemerleri", "İş ayakkabısı ve botları", "Baret ve reflektörlü yelekler", "Trafik konisi ve uyarı bariyerleri"],
  },
  {
    id: 13,
    title: "3M Ürünleri",
    category: "İş Güvenliği",
    description: "3M toz ve gaz maskeleri, koruyucu gözlükler, kulaklıklar, yüz siperleri ve koruyucu tulumlar.",
    items: ["Toz maskeleri", "Yarım ve tam yüz gaz maskeleri", "Koruyucu gözlük ve kulaklıklar", "Koruyucu tulumlar"],
  },
  {
    id: 14,
    title: "Ölçü Aletleri",
    category: "El Aletleri & Makineler",
    description: "Kumpas, mikrometre, komparatör, şerit metre, nivo, lazer metre ve elektriksel ölçü cihazları.",
    items: ["Dijital ve mekanik kumpaslar", "Mikrometre ve komparatörler", "Lazer metre ve nivolar", "Pens ampermetre ve multimetreler"],
  },
  {
    id: 15,
    title: "Kaynak Makinaları",
    category: "Kaynak & Gaz",
    description: "Elektrot, gazaltı (MIG/MAG), TIG kaynak makineleri ve plazma kesme makineleri.",
    items: ["İnvertör elektrot kaynak makineleri", "Gazaltı kaynak makineleri", "TIG kaynak makineleri", "Plazma kesme makineleri"],
  },
  {
    id: 16,
    title: "Elektrod, Gaz Altı Kaynak Teli Ekipmanları",
    category: "Kaynak & Gaz",
    description: "Elektrotlar, gazaltı kaynak telleri, torçlar, kaynak maskeleri ve kaynak sarf malzemeleri.",
    items: ["Rutil ve bazik elektrotlar", "Gazaltı kaynak telleri", "MIG / TIG torçları ve sarfları", "Kaynak maskeleri ve pensler"],
  },
  {
    id: 17,
    title: "Gaz ve Gaz Aletleri",
    category: "Kaynak & Gaz",
    description: "Oksijen, asetilen ve argon regülatörleri, kesme ve kaynak şalümoları, hortumlar ve emniyet ventilleri.",
    items: ["Gaz regülatörleri (manometreler)", "Kesme ve kaynak şalümoları", "Alev geri tepme ventilleri", "İkiz gaz hortumları"],
  },
  {
    id: 18,
    title: "Pinomatik Ürünler - Pakkens",
    category: "Tesisat & Pnömatik",
    description: "Pakkens manometre ve termometreler; pnömatik silindir, valf, şartlandırıcı ve rakorlar.",
    items: ["Pakkens manometre ve termometreler", "Pnömatik silindirler", "Selenoid valfler", "Şartlandırıcı ve hızlı rakorlar"],
  },
  {
    id: 19,
    title: "Matkap Ucu, Klavuz, Pafta",
    category: "Kesici & Aşındırıcı",
    description: "HSS ve kobalt matkap uçları, kademeli uçlar, kılavuz ve paftalar, manyetik matkap ve uçları.",
    items: ["HSS ve kobalt matkap uçları", "Makine ve el kılavuzları", "Pafta ve pafta kolları", "Manyetik matkap ve kesicileri"],
  },
  {
    id: 20,
    title: "Testere Profil Kesme, Karot ve Sarf Malzemeleri",
    category: "Kesici & Aşındırıcı",
    description: "Profil kesme makineleri, şerit ve daire testereler, delik testereleri, karot makineleri ve elmas uçlar.",
    items: ["Profil kesme makineleri", "Şerit ve daire testereler", "Delik testereleri (panç)", "Karot makinesi ve elmas uçlar"],
  },
  {
    id: 21,
    title: "Kesme ve Taşlama Taşları",
    category: "Kesici & Aşındırıcı",
    description: "Metal ve paslanmaz kesme diskleri, taşlama taşları ve tezgah taşları.",
    items: ["Metal kesme diskleri", "İnox (paslanmaz) kesme diskleri", "Taşlama taşları", "Tezgah ve parmak taşlar"],
  },
  {
    id: 22,
    title: "Aşındırıcı Ürünler",
    category: "Kesici & Aşındırıcı",
    description: "Flap diskler, zımpara kağıtları ve ruloları, fiber diskler, keçeler ve tel fırçalar.",
    items: ["Flap diskler", "Zımpara kağıdı ve ruloları", "Fiber ve cırtlı diskler", "Tel fırçalar"],
  },
  {
    id: 23,
    title: "Yıkama ve Yağlama Ekipmanları",
    category: "Sanayi & Yapı",
    description: "Basınçlı yıkama makineleri, endüstriyel süpürgeler, gres pompaları ve yağ boşaltma üniteleri.",
    items: ["Basınçlı yıkama makineleri", "Islak / kuru endüstriyel süpürgeler", "Gres ve yağ pompaları", "Yağ boşaltma üniteleri"],
  },
  {
    id: 24,
    title: "Kompresör-Airles Boya Makinası",
    category: "Sanayi & Yapı",
    description: "Pistonlu ve vidalı hava kompresörleri, airless boya makineleri ve basınçlı hava ekipmanları.",
    items: ["Pistonlu kompresörler", "Vidalı kompresörler", "Airless boya makineleri", "Seyyar kompresörler"],
  },
  {
    id: 25,
    title: "Endüstriyel Kimyasal ve Yapıştırıcılar",
    category: "Kimyasal & Ambalaj",
    description: "Cıvata sabitleyiciler, sıvı contalar, yapıştırıcılar, silikon ve mastikler, bakım spreyleri.",
    items: ["Cıvata sabitleyici ve sıvı contalar", "Endüstriyel yapıştırıcılar", "Silikon ve mastikler", "Pas sökücü ve bakım spreyleri"],
  },
  {
    id: 26,
    title: "Sanayi Bantları ve Ambalaj Ürünleri",
    category: "Kimyasal & Ambalaj",
    description: "Koli, maskeleme, izolasyon ve çift taraflı bantlar; streç film ve çemberleme ürünleri.",
    items: ["Koli ve maskeleme bantları", "İzolasyon ve ikaz bantları", "Çift taraflı bantlar", "Streç film ve çemberleme"],
  },
  {
    id: 27,
    title: "Aspiratör Mengene İşkence ve Boya Sarf Malzemeleri",
    category: "Sanayi & Yapı",
    description: "Aspiratör ve fanlar, mengeneler, işkenceler, boya rulo ve fırçaları, mala ve spatulalar.",
    items: ["Aspiratör ve fanlar", "Tezgah ve boru mengeneleri", "İşkence çeşitleri", "Boya rulo, fırça ve spatulalar"],
  },
  {
    id: 28,
    title: "Sanayi Tekerleri",
    category: "Sanayi & Yapı",
    description: "Poliüretan, kauçuk, poliamid ve döküm tekerlekler; sabit, döner ve frenli tablalı modeller.",
    items: ["Poliüretan tekerlekler", "Kauçuk ve poliamid tekerlekler", "Döner ve frenli tablalı tekerler", "Ağır yük tekerlekleri"],
  },
  {
    id: 29,
    title: "Merdiven, İnş. Makinaları ve İnş. El Aletleri",
    category: "Sanayi & Yapı",
    description: "Alüminyum merdivenler, beton perdah ve kesme makineleri, demir kesme aletleri ve inşaat el aletleri.",
    items: ["Alüminyum merdivenler", "Beton perdah ve kesme makineleri", "Demir kesme makasları", "Kazma, kürek ve inşaat aletleri"],
  },
  {
    id: 30,
    title: "Domak Pompa ve Sufil Ürünleri",
    category: "Tesisat & Pnömatik",
    description: "Domak santrifüj, kademeli ve dalgıç pompalar, hidroforlar; Sufil su filtreleri ve arıtma ürünleri.",
    items: ["Santrifüj ve kademeli pompalar", "Hidrofor sistemleri", "Dalgıç ve drenaj pompaları", "Sufil su filtreleri"],
  },
];

export const PRODUCT_GROUPS: ProductGroup[] = RAW.map((p) => ({
  ...p,
  slug: slugify(p.title),
  image: `/images/products/product_${p.id}.jpg`,
}));

export function getProduct(slug: string) {
  return PRODUCT_GROUPS.find((p) => p.slug === slug);
}

export function getRelated(product: ProductGroup, limit = 3) {
  return PRODUCT_GROUPS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

/** Ana sayfa sahneleri için öne çıkan gruplar */
export const FEATURED_IDS = [1, 4, 6, 12, 15, 30];
