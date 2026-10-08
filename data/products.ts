export type CategoryName =
  | "İşçi Eldivenleri"
  | "Köpük Nitril Eldivenleri"
  | "Kesilmeye Dirençli Eldivenler"
  | "Kaynak & Sürücü Eldivenleri"
  | "Kimyasal Koruyucu Tulumlar"
  | "Lamineli & SMS Tulumlar"
  | "Önlük & Laboratuvar"
  | "Kolluk, Galoş & Başlık";

export interface ProductGroup {
  id: number;
  slug: string;
  code: string;
  title: string;
  category: CategoryName;
  image: string;
  description: string;
  items: string[];
  koli: string;
  sizes: string;
  standards: string[];
  applications?: string;
  badge?: string;
}

export const CATEGORIES: CategoryName[] = [
  "İşçi Eldivenleri",
  "Köpük Nitril Eldivenleri",
  "Kesilmeye Dirençli Eldivenler",
  "Kaynak & Sürücü Eldivenleri",
  "Kimyasal Koruyucu Tulumlar",
  "Lamineli & SMS Tulumlar",
  "Önlük & Laboratuvar",
  "Kolluk, Galoş & Başlık",
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
    "id": 1,
    "code": "EP-1301",
    "title": "FABA EP-1301 Nitril Kaplamalı İşçi Eldiveni",
    "category": "İşçi Eldivenleri",
    "description": "Eli terletmeyen polyester örme astar üzerine yağ ve grese dayanıklı 1/2 sarı/mavi nitril kaplama iş eldiveni.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Montaj, otomotiv, lojistik, depolama, inşaat, paketleme ve hafif sanayi bakım işleri.",
    "badge": "Yerli Üretim",
    "items": [
      "Eli terletmeyen nefes alabilir Polyester örme astar",
      "Yağ ve grese karşı dayanıklılık gösteren sarı nitril kaplama",
      "Aşınma ve yırtılmaya karşı üstün mekanik direnç (4121X)",
      "Özel örgüsü sayesinde eli kavrayan ergonomik konfor",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift (Kastamonu OSB yerli üretim)"
    ]
  },
  {
    "id": 2,
    "code": "EP-1302",
    "title": "FABA EP-1302 Nitril Kaplamalı İşçi Eldiveni",
    "category": "İşçi Eldivenleri",
    "description": "Aşınma ve yırtılmaya karşı yüksek dirençli, yağlı ve kuru parçaların kavranmasında üstün tutuş sağlayan nitril eldiven.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Otomotiv sanayi, mekanik montaj, depolama ve malzeme taşıma.",
    "badge": "Yerli Üretim",
    "items": [
      "Eli terletmeyen Polyester örme kumaş",
      "Yağ ve endüstriyel sıvılara dayanıklı mavi nitril kaplama",
      "Aşınma ve delinmeye karşı mekanik koruma",
      "El anatomisine uyumlu esnek yapı",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift"
    ]
  },
  {
    "id": 3,
    "code": "EP-1303",
    "title": "FABA EP-1303 Nitril Kaplamalı İşçi Eldiveni",
    "category": "İşçi Eldivenleri",
    "description": "Gri/siyah renk kombinasyonlu, kir göstermeyen ve zorlu mekanik atölye koşullarında yüksek kavrama sunan nitril eldiven.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Ağır bakım, makine montajı, metal işleme ve lojistik sevkiyat.",
    "badge": "Yerli Üretim",
    "items": [
      "Eli terletmeyen dayanıklı Polyester örme astar",
      "Yağ, kir ve grese karşı koruyucu siyah nitril kaplama",
      "Aşınma ve yırtılma direnci yüksek kaplama",
      "Hassas parça montajında kaydırmaz tutuş",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift"
    ]
  },
  {
    "id": 4,
    "code": "EP-1401",
    "title": "FABA EP-1401 Tam Kaplama Nitril İşçi Eldiveni",
    "category": "İşçi Eldivenleri",
    "description": "El sırtını da örten tam kaplama yapısıyla yoğun yağ ve sıvı temasında maksimum sızdırmazlık ve koruma sağlayan eldiven.",
    "koli": "192 Çift",
    "sizes": "8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Islak ve yağlı ortamlar, petrol türevleri, metal pres işleri ve inşaat şantiyeleri.",
    "badge": "Tam Kaplama",
    "items": [
      "Tam nitril daldırma (el sırtı korumalı)",
      "Sıvı ve yağ geçirmez kalın koruma katmanı",
      "Yüksek aşınma ve sürtünme mukavemeti",
      "Pamuklu/polyester iç astar ile el konforu",
      "Beden seçenekleri: 8, 9, 10, 11",
      "Koli içi adet: 192 Çift"
    ]
  },
  {
    "id": 5,
    "code": "EP-1402",
    "title": "FABA EP-1402 Tam Kaplama Mavi Nitril İşçi Eldiveni",
    "category": "İşçi Eldivenleri",
    "description": "Ağır sanayi, döküm ve tersane ortamlarında sıvı ve mekanik risklere karşı tam el koruması sunan mavi nitril eldiven.",
    "koli": "192 Çift",
    "sizes": "8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Demir-çelik sanayi, dökümhane, kimya dolum alanları ve tersaneler.",
    "badge": "Tam Kaplama",
    "items": [
      "Tam kaplama mavi nitril bariyeri",
      "Yağ ve kimyasal sıçramalara karşı tam el sırtı direnci",
      "Aşınmaya karşı üstün endüstriyel dayanım",
      "Bileği sıkı saran elastik konç",
      "Beden seçenekleri: 8, 9, 10, 11",
      "Koli içi adet: 192 Çift"
    ]
  },
  {
    "id": 6,
    "code": "EP-1403",
    "title": "FABA EP-1403 Tam Kaplama Siyah Nitril İşçi Eldiveni",
    "category": "İşçi Eldivenleri",
    "description": "Ağır mekanik risklere, madeni yağlara ve kire karşı geliştirilmiş tam kaplamalı siyah nitril işçi eldiveni.",
    "koli": "192 Çift",
    "sizes": "8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Madencilik, ağır sanayi, atık yönetimi ve makine bakım onarım.",
    "badge": "Tam Kaplama",
    "items": [
      "Tam kaplama siyah nitril katman",
      "Zorlu atölye koşullarında maksimum yırtılma direnci",
      "Kaygan yüzeylerde güçlü kavrama performansı",
      "Toz ve sıvı sızmasını önleyen elastik bileklik",
      "Beden seçenekleri: 8, 9, 10, 11",
      "Koli içi adet: 192 Çift"
    ]
  },
  {
    "id": 7,
    "code": "TruFlex EN-1501",
    "title": "FABA TruFlex EN-1501 Köpük Nitril Hassas Montaj Eldiveni",
    "category": "Köpük Nitril Eldivenleri",
    "description": "Mikro köpük nitril kaplamasıyla nefes alabilen, yağlı ve kuru yüzeylerde mükemmel hassasiyet ve kavrama sağlayan eldiven.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4131X)",
      "EN ISO 21420: 2020",
      "OEKO-TEX Standard 100"
    ],
    "applications": "Elektronik montaj, otomotiv üretim hatları, ince mekanik, beyaz eşya ve kalite kontrol.",
    "badge": "En Çok Satan",
    "items": [
      "360° nefes alabilir mikro köpük nitril teknolojisi",
      "15 gauge süper ince ve esnek naylon/spandeks astar",
      "Yağlı parçalarda kaymayı önleyen mikro vantuz dokusu",
      "İkinci ten hissi veren üstün parmak ucu hassasiyeti",
      "Silikon içermez, boyahanelere ve temiz odalara uygundur",
      "Koli içi adet: 252 Çift (Kastamonu OSB üretimi)"
    ]
  },
  {
    "id": 8,
    "code": "TruFlex EN-1502",
    "title": "FABA TruFlex EN-1502 Köpük Nitril İş Eldiveni",
    "category": "Köpük Nitril Eldivenleri",
    "description": "Dayanıklı ve hafif mikro köpük nitril formülü ile el yorgunluğunu azaltan profesyonel montaj eldiveni.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4131X)",
      "EN ISO 21420: 2020"
    ],
    "applications": "Genel imalat, kargo ve lojistik ayıklama, bakım-onarım ve tesis işletme.",
    "badge": "Köpük Nitril",
    "items": [
      "Mikro gözenekli terletmeyen nefes alabilir köpük nitril",
      "Aşınmaya karşı yüksek dayanım döngüsü",
      "El yorgunluğunu önleyen ergonomik tasarım",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift"
    ]
  },
  {
    "id": 9,
    "code": "TruFlex EN-1503",
    "title": "FABA TruFlex EN-1503 Siyah Köpük Nitril Eldiven",
    "category": "Köpük Nitril Eldivenleri",
    "description": "Kir göstermeyen siyah astar ve siyah mikro köpük nitril kaplama ile endüstriyel servislerde estetik ve dayanıklı çözüm.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4131X)",
      "EN ISO 21420: 2020"
    ],
    "applications": "Oto servisleri, makine revizyonu, havacılık bakımı ve tesis teknik servisleri.",
    "badge": "Köpük Nitril",
    "items": [
      "Kir ve leke göstermeyen siyah renk kombinasyonu",
      "Yüksek sürtünme dayanımlı mikro köpük nitril",
      "Hassas vida ve somun sıkma kabiliyeti",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift"
    ]
  },
  {
    "id": 10,
    "code": "TruFlex EN-1511",
    "title": "FABA TruFlex EN-1511 Noktalı Köpük Nitril Eldiven",
    "category": "Köpük Nitril Eldivenleri",
    "description": "Avuç içinde bulunan mikro nitril noktalar sayesinde tutuş gücünü ve mekanik aşınma ömrünü iki katına çıkaran eldiven.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4131X)",
      "EN ISO 21420: 2020"
    ],
    "applications": "Koli taşıma, e-ticaret depolama merkezleri, cam ve sac yükleme, paketleme hatları.",
    "badge": "Noktalı Kavrama",
    "items": [
      "Avuç içi takviyeli mikro nitril kabartma noktalar",
      "Kutu, ambalaj ve metal saç taşımada kaydırmaz kavrama",
      "Darbelere karşı ekstra avuç içi yastıklama",
      "Hava sirkülasyonu sağlayan nefes alabilir arka yüzey",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift"
    ]
  },
  {
    "id": 11,
    "code": "TruFlex EN-1512",
    "title": "FABA TruFlex EN-1512 Noktalı Renkli Köpük Nitril Eldiven",
    "category": "Köpük Nitril Eldivenleri",
    "description": "Noktalı kavrama teknolojisine sahip, yüksek dayanımlı ve uzun ömürlü profesyonel montaj ve lojistik eldiveni.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4131X)",
      "EN ISO 21420: 2020"
    ],
    "applications": "Ağır paketleme, sevkiyat operasyonları, inşaat ve hırdavat montajı.",
    "badge": "Noktalı Kavrama",
    "items": [
      "Ekstra tutuş sağlayan nitril nokta takviyesi",
      "Yıpranmaya ve aşınmaya karşı artırılmış kullanım ömrü",
      "Esnek elastan-polyester örgü",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 252 Çift"
    ]
  },
  {
    "id": 12,
    "code": "TruCut EK-5000",
    "title": "FABA TruCut EK-5000 Seviye D Kesilmeye Dirençli Eldiven",
    "category": "Kesilmeye Dirençli Eldivenler",
    "description": "Dikişsiz HPPE, çelik tel ve cam elyaf harmanı ile kesilme risklerine karşı Seviye D (EN ISO 13997) üstün koruma sağlayan eldiven.",
    "koli": "72 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4X42D)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Cam sanayi, metal levha kesim ve büküm, gıda işleme, keskin kenarlı parçaların montajı.",
    "badge": "Seviye D Kesilme",
    "items": [
      "Seviye D yüksek kesilme direnci (HPPE + Çelik Tel + Naylon)",
      "Kaplamasız veya ince astar formu ile iç eldiven olarak kullanılabilme",
      "Yırtılma ve delinmeye karşı endüstriyel mukavemet (4X42D)",
      "Hafif ve terletmeyen termal konfor",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 72 Çift"
    ]
  },
  {
    "id": 13,
    "code": "TruCut EK-5610",
    "title": "FABA TruCut EK-5610 Nitril Kaplamalı Kesilmez Eldiven",
    "category": "Kesilmeye Dirençli Eldivenler",
    "description": "HPPE kesilmez astar üzerine köpük nitril kaplama ile kesilme güvenliği ve yağlı tutuşu bir arada sunan hibrit eldiven.",
    "koli": "72 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4X43D)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Metal şekillendirme, CNC torna ve freze işlemleri, otomotiv pres hatları ve sac işleme.",
    "badge": "Seviye D Kesilme",
    "items": [
      "Dikişsiz HPPE, spandeks ve çelik lifli kesilmez astar",
      "Yağlı metal parçalarda kaymayan mikro köpük nitril kaplama",
      "Seviye D kesilme dayanımı ile tam koruma",
      "Yüksek aşınma ve delinme direnci",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 72 Çift"
    ]
  },
  {
    "id": 14,
    "code": "TruCut EK-5620",
    "title": "FABA TruCut EK-5620 Ağır Hizmet Kesilmez Eldiven",
    "category": "Kesilmeye Dirençli Eldivenler",
    "description": "Ağır endüstriyel kesilme riskleri için çift katmanlı kaplama ve takviyeli başparmak arası korumasına sahip kesilmez eldiven.",
    "koli": "72 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388: 2016+A1:2018 (4X44D)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Geri dönüşüm tesisleri, hurda işleme, çelik servis merkezleri ve ağır imalat sanayi.",
    "badge": "Ağır Hizmet",
    "items": [
      "Maksimum mekanik koruma: 4X44D sınıfı",
      "Aşınmaya dayanıklı özel formüllü nitril kaplama",
      "Başparmak çatalında aşınma takviyesi",
      "Keskin çapaklı metal ve cam işleme için ideal",
      "Beden seçenekleri: 7, 8, 9, 10, 11",
      "Koli içi adet: 72 Çift"
    ]
  },
  {
    "id": 15,
    "code": "Zevahir D200-35",
    "title": "FABA Zevahir D200-35 Ağır Kaynakçı Eldiveni (35 cm)",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "Seçme yarma sığır derisi, pamuklu ısı astarı ve Kevlar iplik dikişleri ile üretilmiş 35 cm profesyonel ağır kaynak eldiveni.",
    "koli": "36 Çift",
    "sizes": "10 (Standart)",
    "standards": [
      "EN 388: 2016 (4244X)",
      "EN 407: 2020 (413X4X)",
      "EN 12477: 2001+A1:2005 Tip A"
    ],
    "applications": "MIG/MAG gazaltı kaynağı, elektrot kaynağı, dökümhane, plazma kesim ve ağır metal imalatı.",
    "badge": "Yerli Deri",
    "items": [
      "Birinci sınıf aşınmaya dirençli yarma sığır derisi",
      "İç kısım kalın pamuklu ısı izolasyon astarı",
      "Yanmaz ve kopmaz DuPont Kevlar dikiş iplikleri",
      "35 cm manşet boyu ile bilek ve önkol koruması",
      "Isı, alev, erimiş metal sıçramalarına karşı Tip A sertifikalı",
      "Koli içi adet: 36 Çift (Kastamonu OSB %100 yerli üretim)"
    ]
  },
  {
    "id": 16,
    "code": "Zevahir D200-40",
    "title": "FABA Zevahir D200-40 Ağır Kaynakçı Eldiveni (40 cm)",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "40 cm ekstra uzun manşeti ile dirseğe kadar tam koruma sağlayan, Kevlar dikişli profesyonel ağır kaynak eldiveni.",
    "koli": "36 Çift",
    "sizes": "10 (Standart)",
    "standards": [
      "EN 388: 2016 (4244X)",
      "EN 407: 2020 (413X4X)",
      "EN 12477 Tip A"
    ],
    "applications": "Tersane kaynak işleri, köprü ve çelik konstrüksiyon, boru hattı kaynağı ve döküm potaları.",
    "badge": "40 cm Uzun Manşet",
    "items": [
      "40 cm ekstra uzun manşet ile dirsek seviyesine kadar koruma",
      "Isıya ve erimiş çapak sıçramalarına dayanıklı yarma deri",
      "Kevlar dikişlerle yırtılmaz ve açılmaz ek yerleri",
      "İç termal astar ile sıcak parçaları güvenle kavrama",
      "Koli içi adet: 36 Çift",
      "Kastamonu fabrikamızda %100 yerli üretim"
    ]
  },
  {
    "id": 17,
    "code": "Zevahir D300-35",
    "title": "FABA Zevahir D300-35 Kırmızı Kaynakçı Eldiveni (35 cm)",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "Özel tabaklanmış kırmızı yarma deri, güçlendirilmiş avuç içi takviyesi ve Kevlar dikişli 35 cm kaynak eldiveni.",
    "koli": "36 Çift",
    "sizes": "10 (Standart)",
    "standards": [
      "EN 388: 2016",
      "EN 407: 2020",
      "EN 12477 Tip A"
    ],
    "applications": "Ark kaynağı, demir doğrama atölyeleri, kazan imalatı ve metal fabrikasyonu.",
    "badge": "Takviyeli Avuç",
    "items": [
      "Isıya dayanıklı özel tabaklanmış kırmızı yarma sığır derisi",
      "Avuç içi ve başparmak çatalında sürtünme takviyesi",
      "Kot ve pamuklu iç astar ile ter emici konfor",
      "Kevlar iplikli yanmaz dikişler",
      "35 cm manşet uzunluğu",
      "Koli içi adet: 36 Çift"
    ]
  },
  {
    "id": 18,
    "code": "Zevahir D300-40",
    "title": "FABA Zevahir D300-40 Kırmızı Kaynakçı Eldiveni (40 cm)",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "40 cm uzun kolluk korumalı, avuç takviyeli ve yüksek ısı dayanımına sahip kırmızı kaynakçı eldiveni.",
    "koli": "36 Çift",
    "sizes": "10 (Standart)",
    "standards": [
      "EN 388: 2016",
      "EN 407: 2020",
      "EN 12477 Tip A"
    ],
    "applications": "Tersane kaynakçılığı, ağır çelik imalatı, boru kaynağı ve metal eritme tesisleri.",
    "badge": "40 cm Uzun Manşet",
    "items": [
      "40 cm uzun kolluk koruması",
      "Takviyeli çift katmanlı avuç bölgesi",
      "Yüksek sıcaklık ve kıvılcım direnci",
      "Kevlar iplikli dikiş güvenliği",
      "Koli içi adet: 36 Çift"
    ]
  },
  {
    "id": 19,
    "code": "Zevahir D-105",
    "title": "FABA Zevahir D-105 Cilt Keçi Derisi Sürücü / Montaj Eldiveni",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "Yumuşak cilt keçi derisinden üretilmiş, üstün el becerisi ve aşınma direnci sağlayan sürücü ve montaj eldiveni.",
    "koli": "72 Çift",
    "sizes": "9, 10, 11",
    "standards": [
      "EN 388: 2016 (2121X)",
      "EN ISO 21420: 2020",
      "CE 2016/425"
    ],
    "applications": "Forklift ve tır şoförlüğü, sevkiyat yükleme, hassas ahşap ve metal montajı, tarım ve şantiye yöneticiliği.",
    "badge": "Cilt Keçi Derisi",
    "items": [
      "Ekstra esnek ve yumuşak A kalite cilt keçi derisi",
      "Kullanımı kolaylaştıran lastikli bilek tasarımı",
      "Mükemmel dokunma hissi ve direksiyon hakimiyeti",
      "Mekanik sürtünmeye karşı doğal deri dayanıklılığı",
      "Koli içi adet: 72 Çift",
      "%100 yerli üretim Kastamonu tesisleri"
    ]
  },
  {
    "id": 20,
    "code": "Zevahir D-100",
    "title": "FABA Zevahir D-100 Cilt Keçi Derisi TIG Argon Kaynak Eldiveni",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "Hassas TIG argon kaynağı için ince cilt keçi derisi avuç ve uzun yarma deri manşet ile EN 12477 Tip B hassas kaynak eldiveni.",
    "koli": "72 Çift",
    "sizes": "9, 10, 11",
    "standards": [
      "EN 388: 2016 (2121X)",
      "EN 407: 2020 (41214X)",
      "EN 12477: 2001+A1:2005 Tip B"
    ],
    "applications": "TIG (Argon) kaynağı, paslanmaz çelik kaynağı, alüminyum kaynağı ve hassas lehimleme.",
    "badge": "TIG Tip B",
    "items": [
      "Hassas kaynak teli beslemesi için ince cilt keçi derisi",
      "Önkol koruması sağlayan uzun yarma sığır derisi konç (35 cm)",
      "Kevlar iplikli yanmaz dikişler",
      "TIG argon kaynağında EN 12477 Tip B standardı",
      "Beden seçenekleri: 9, 10, 11",
      "Koli içi adet: 72 Çift"
    ]
  },
  {
    "id": 21,
    "code": "Zevahir D-101",
    "title": "FABA Zevahir D-101 TIG Argon Kaynakçı Eldiveni",
    "category": "Kaynak & Sürücü Eldivenleri",
    "description": "Ergonomik parmak kesimi, yüksek ısı izolasyonu ve hassas tel kontrolü sunan profesyonel TIG kaynak eldiveni.",
    "koli": "72 Çift",
    "sizes": "9, 10, 11",
    "standards": [
      "EN 388: 2016 (2121X)",
      "EN 407: 2020 (41214X)",
      "EN 12477 Tip B"
    ],
    "applications": "TIG kaynak operasyonları, boru kaynağı, paslanmaz tank imalatı ve mikro kaynak işleri.",
    "badge": "TIG Tip B",
    "items": [
      "Yüksek kaliteli cilt keçi derisi avuç içi",
      "Bileği koruyan kalın yarma deri manşet",
      "Aşınma ve ısı dirençli Kevlar dikiş",
      "Koli içi adet: 72 Çift"
    ]
  },
  {
    "id": 22,
    "code": "TruChem T-800",
    "title": "FABA TruChem T-800 Tip 3B/4B/5B/6B Kimyasal Koruyucu Tulum",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "Sıvı jetlerine, toksik kimyasallara ve biyolojik enfektif ajanlara karşı tam sızdırmaz kaynaklı dikişli Tip 3B/4B kimyasal tulum.",
    "koli": "20 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "Type 3B (EN 14605)",
      "Type 4B (EN 14605)",
      "Type 5B (EN ISO 13982-1)",
      "Type 6B (EN ISO 13034)",
      "EN 14126 Biyolojik",
      "EN 1149-5 Antistatik",
      "EN 1073-2 Nükleer"
    ],
    "applications": "Petrokimya tesisleri, kimyasal tanker temizliği, biyolojik tehlikeler, dekontaminasyon, afet yönetimi ve pestisit uygulamaları.",
    "badge": "Tip 3B/4B Kimyasal",
    "items": [
      "Tip 3B (Basınçlı sıvı kimyasal jetlerine dayanım)",
      "Tip 4B (Yoğun kimyasal püskürmelerine dayanım)",
      "Tip 5B (Tehlikeli katı partikül ve toz koruması)",
      "Tip 6B (Sıvı sıçramalarına karşı koruma)",
      "EN 14126 (Biyolojik risk ve enfektif ajan bariyeri)",
      "EN 1149-5 Antistatik işlem görmüş kumaş",
      "Sıcak kaynaklı sızdırmaz bantlı dikişler",
      "Çift fermuar kapağı ile tam sızdırmazlık",
      "Solunum maskesine tam uyumlu elastik başlık ve bilekler",
      "Koli içi adet: 20 Adet (Kastamonu OSB üretimi)"
    ]
  },
  {
    "id": 23,
    "code": "TruChem T-800-G",
    "title": "FABA TruChem T-800-G Kendinden Çoraplı Kimyasal Tulum",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "Kendinden çoraplı (entegre bot galoşlu) ve çift manşetli yapısıyla kimyasalların ayakkabı içerisine sızmasını engelleyen Tip 3B/4B tulum.",
    "koli": "20 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "Type 3B (EN 14605)",
      "Type 4B (EN 14605)",
      "Type 5B",
      "Type 6B",
      "EN 14126 Biyolojik",
      "EN 1149-5"
    ],
    "applications": "Asit ve solvent tankı içi çalışmalar, tehlikeli atık bertarafı ve kimyasal sızıntı müdahalesi.",
    "badge": "Entegre Çoraplı",
    "items": [
      "Entegre çorap (ayak koruma) tasarımı",
      "Çizme üzerine inen dış paça örtüsü",
      "Basınçlı kimyasal jetlerine karşı tam bariyer",
      "Güçlü kaynaklı sızdırmaz bant teknolojisi",
      "Koli içi adet: 20 Adet"
    ]
  },
  {
    "id": 24,
    "code": "TruChem T-630",
    "title": "FABA TruChem T-630 Tip 4B/5B/6B Kimyasal Koruyucu Tulum",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "Bantlı dikişli, sprey kimyasallara ve bulaşıcı ajanlara karşı EN 14126 sertifikalı beyaz kimyasal koruyucu tulum.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "Type 4B (EN 14605)",
      "Type 5B (EN ISO 13982-1)",
      "Type 6B (EN ISO 13034)",
      "EN 14126",
      "EN 1149-5"
    ],
    "applications": "İlaç sanayi, virüs/salgın kontrolü, kimyasal boya atölyeleri, tarımsal ilaçlama ve asbest temizliği.",
    "badge": "Tip 4B/5B/6B",
    "items": [
      "Tip 4B sprey geçirimsiz dikiş bantlı koruma",
      "EN 14126 biyolojik ve virüs/bakteri bariyeri",
      "Nefes alabilir mikrogözenekli lamine kumaş (63 gr/m²)",
      "Çift yönlü yapışkanlı fermuar kapağı",
      "Koli içi adet: 48 Adet"
    ]
  },
  {
    "id": 25,
    "code": "TruChem T-630-G",
    "title": "FABA TruChem T-630-G Kendinden Çoraplı Kimyasal Tulum",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "Entegre bot çoraplı, Tip 4B/5B/6B koruma seviyesinde dikiş üzeri sızdırmaz bantlı kimyasal koruyucu tulum.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "Type 4B (EN 14605)",
      "Type 5B",
      "Type 6B",
      "EN 14126",
      "EN 1149-5"
    ],
    "applications": "Temiz oda (cleanroom), biyolojik laboratuvarlar, kimyasal zemin temizliği ve ilaç üretim tesisleri.",
    "badge": "Entegre Çoraplı",
    "items": [
      "Kendinden çoraplı tam ayak koruması",
      "Sıvı kimyasal spreylere karşı bantlı dikiş teknolojisi",
      "Biyolojik ajanlara karşı tam sızdırmazlık",
      "Koli içi adet: 48 Adet"
    ]
  },
  {
    "id": 26,
    "code": "T-535",
    "title": "FABA T-535 Tip 5/6 Dikiş Bantlı Lamineli Tulum (55 gr/m²)",
    "category": "Lamineli & SMS Tulumlar",
    "description": "55 gr/m² mikrogözenekli kumaş ve bantlı dikişleri ile tehlikeli tozlara ve sıvı sıçramalarına karşı üstün Tip 5/6 koruyucu tulum.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "Type 5 (EN ISO 13982-1)",
      "Type 6 (EN ISO 13034)",
      "EN 1149-5 Antistatik",
      "CE 2016/425"
    ],
    "applications": "İlaç üretimi, biyogüvenlik laboratuvarları, boya püskürtme, oto kaporta ve nükleer bakım.",
    "badge": "Bantlı Dikiş Tip 5/6",
    "items": [
      "55 gr/m² ekstra dayanıklı mikrogözenekli lamine malzeme",
      "Tüm dikişlerin üzeri sızdırmaz bant ile kapatılmıştır",
      "Tehlikeli olmayan sıvılara ve kimyasal toza karşı direnç",
      "Fermuar üzeri yapışkanlı koruma kapağı",
      "Doğada çözünebilen çevre dostu ambalaj",
      "Koli içi adet: 48 Adet"
    ]
  },
  {
    "id": 27,
    "code": "T-530",
    "title": "FABA T-530 Tip 5/6 Tek Kullanımlık Lamineli Tulum (55 gr/m²)",
    "category": "Lamineli & SMS Tulumlar",
    "description": "Hafif endüstriyel bakım ve temizlik ortamlarında toz ve sıvı sıçramalarına karşı güvenilir Tip 5/6 standart tulum.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "Type 5 (EN ISO 13982-1)",
      "Type 6 (EN ISO 13034)",
      "EN 1149-5 Antistatik"
    ],
    "applications": "Endüstriyel temizlik, makine bakımı, tozlu üretim alanları ve hafif kimyasal uygulamalar.",
    "badge": "Tip 5/6 Lamineli",
    "items": [
      "55 gr/m² nefes alabilir PE mikrogözenekli film lamine",
      "Elastik kapüşon, bel, kol ve ayak bilekleri",
      "Antistatik işlem görmüş yüzey",
      "Koli içi adet: 48 Adet"
    ]
  },
  {
    "id": 28,
    "code": "T-500",
    "title": "FABA T-500 SMS Tip 5/6 Nefes Alabilir Tulum (55 gr/m²)",
    "category": "Lamineli & SMS Tulumlar",
    "description": "3 katmanlı SMS (Spunbond-Meltblown-Spunbond) kumaşıyla yüksek hava geçirgenliği ve partikül filtreleme sunan tulum.",
    "koli": "40 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "Type 5 (EN ISO 13982-1)",
      "Type 6 (EN ISO 13034)",
      "EN 1149-5",
      "CE Kategori III"
    ],
    "applications": "Sıcak üretim hatları, asbest sökümü, çimento ve un fabrikaları, izolasyon montajı.",
    "badge": "SMS Nefes Alabilir",
    "items": [
      "Üstün nefes alabilirlik sağlayan 3 katmanlı SMS kumaş",
      "Sıcak çalışma ortamlarında terletmeyen ferah yapı",
      "Tehlikeli asbest ve mineral tozlarını %99 filtreleme",
      "Koli içi adet: 40 Adet"
    ]
  },
  {
    "id": 29,
    "code": "T-300",
    "title": "FABA T-300 Tek Kullanımlık Ekonomik Tulum (35 gr/m²)",
    "category": "Lamineli & SMS Tulumlar",
    "description": "Hafif hijyen, toz ve kirlenme önleme amaçlı 35 gr/m² Spunbond polipropilen ekonomik tulum.",
    "koli": "60 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "CE Kategori I (Minimum Riskler)",
      "EN ISO 13688"
    ],
    "applications": "Gıda tesisleri, fabrika ziyaretçileri, hafif tadilat ve genel temizlik işleri.",
    "badge": "Ekonomik",
    "items": [
      "35 gr/m² hafif ve hava geçirgen nonwoven polipropilen",
      "Kapüşonlu, fermuarlı, beli lastikli pratik giyim",
      "Ziyaretçi ve hijyen uygulamaları için ekonomik çözüm",
      "Koli içi adet: 60 Adet"
    ]
  },
  {
    "id": 30,
    "code": "LO-530",
    "title": "FABA LO-530 Fermuarlı Laboratuvar Önlüğü (55 gr/m²)",
    "category": "Önlük & Laboratuvar",
    "description": "55 gr/m² mikrogözenekli lamineli kumaş, fermuarlı ön kapama, cepli ve yakalı profesyonel laboratuvar önlüğü.",
    "koli": "60 Adet",
    "sizes": "XS, S, M, L, XL, 2XL",
    "standards": [
      "EN 13034 (Type PB 6-B)",
      "EN 14126",
      "EN 1149-5",
      "EN ISO 13688"
    ],
    "applications": "Hastaneler, klinik ve tahlil laboratuvarları, ilaç fabrikaları, gıda denetimleri ve veterinerlik.",
    "badge": "Fermuarlı & Cepli",
    "items": [
      "55 gr/m² sıvı itici mikrogözenekli lamine kumaş",
      "Ön kısmı pratik fermuarlı, iki adet kullanışlı cep",
      "Lastikli kol ağızları ve şık yaka tasarımı",
      "Tip PB 6-B kısmi vücut sıvı koruması",
      "Koli içi adet: 60 Adet"
    ]
  },
  {
    "id": 31,
    "code": "LO-531",
    "title": "FABA LO-531 Arkadan Bağlamalı Lamineli Önlük",
    "category": "Önlük & Laboratuvar",
    "description": "Kimyasal ve hijyenik sıvı temaslarına karşı boyun ve belden bağlamalı, su ve yağ tutmayan lamineli koruyucu önlük.",
    "koli": "240 Adet",
    "sizes": "Standart (Geniş Kesim)",
    "standards": [
      "EN 13034",
      "EN ISO 13688",
      "CE 2016/425"
    ],
    "applications": "Gıda işleme, et ve tavuk entegre tesisleri, mutfaklar, kimyasal karıştırma ve temizlik.",
    "badge": "Lamineli",
    "items": [
      "Su, kan ve tehlikeli olmayan sıvıları tutmaz",
      "Boyun askısı ve belden bağlama ipleri",
      "Geniş gövde koruma alanı",
      "Koli içi adet: 240 Adet"
    ]
  },
  {
    "id": 32,
    "code": "LK-530",
    "title": "FABA LK-530 Lamineli Koruyucu Kolluk",
    "category": "Kolluk, Galoş & Başlık",
    "description": "55 gr/m² lamine kumaştan her iki ucu elastikli, sıvı ve lekelere karşı kolu dirseğe kadar koruyan kolluk.",
    "koli": "720 Adet",
    "sizes": "Standart (45 cm)",
    "standards": [
      "EN 13034 Type PB 6",
      "EN ISO 13688"
    ],
    "applications": "Gıda üretimi, kimyasal dolum hatları, boyahaneler ve elektronik montaj.",
    "badge": "Lamineli",
    "items": [
      "Her iki ucu lastikli, kola mükemmel oturan tasarım",
      "Sıvı ve yağ geçirmez lamine koruma katmanı",
      "45 cm uzunluk ile tam kol koruması",
      "Koli içi adet: 720 Adet"
    ]
  },
  {
    "id": 33,
    "code": "AG-530",
    "title": "FABA AG-530 Lamineli Kaymaz Ayakkabı Galoşu",
    "category": "Kolluk, Galoş & Başlık",
    "description": "Lamineli kumaşıyla yırtılmaya dayanıklı, sıvı geçirmez ve kaymaz tabanlı endüstriyel ayakkabı galoşu.",
    "koli": "500 Adet",
    "sizes": "Standart (Tüm ayakkabı tiplerine uyumlu)",
    "standards": [
      "EN ISO 13688",
      "CE Kategori I"
    ],
    "applications": "Steril alanlar, ameliyathane ve laboratuvarlar, gıda imalatı ve inşaat daire teslimleri.",
    "badge": "Lamineli",
    "items": [
      "Yırtılmayan sağlam lamineli kumaş",
      "Güçlü elastik bilek lastiği sayesinde ayakkabıdan kayıp çıkmaz",
      "Sıvı ve toz sızdırmaz bariyer",
      "Koli içi adet: 500 Adet"
    ]
  },
  {
    "id": 34,
    "code": "LB-530",
    "title": "FABA LB-530 Lamineli Koruyucu Başlık (Kukuleta)",
    "category": "Kolluk, Galoş & Başlık",
    "description": "Baş, boyun ve omuzları kimyasal toz, sıvı sıçraması ve kirden koruyan lamineli koruyucu başlık.",
    "koli": "200 Adet",
    "sizes": "Standart",
    "standards": [
      "EN 13034 Type PB 6",
      "EN ISO 13688"
    ],
    "applications": "Kumlama, boya püskürtme, asbest arındırma, kimyasal temizlik ve tozlu karıştırma işlemleri.",
    "badge": "Lamineli",
    "items": [
      "Baş ve omuzları örten pelerinli tasarım",
      "Yüz açıklığı elastik bantlı olup maske ile tam uyumludur",
      "Sıvı ve partikül geçirmez lamine malzeme",
      "Koli içi adet: 200 Adet"
    ]
  },
  {
    "id": 35,
    "code": "KK-800",
    "title": "FABA KK-800 TruChem Tip PB3-B/PB4-B Kimyasal Kolluk",
    "category": "Kolluk, Galoş & Başlık",
    "description": "Ağır kimyasallara, sıvı jetlerine ve biyolojik risklere karşı bantlı dikişli, başparmak halkalı Tip PB3-B kimyasal kolluk.",
    "koli": "320 Adet",
    "sizes": "50 cm Uzunluk",
    "standards": [
      "Type PB3-B (EN 14605)",
      "Type PB4-B (EN 14605)",
      "EN 14126",
      "EN 1149-5"
    ],
    "applications": "Kimyasal laboratuvarlar, asit-baz aktarımı, petrokimya tesisleri ve galvaniz kaplama hatları.",
    "badge": "Tip PB3-B Kimyasal",
    "items": [
      "Tamamen sıvı geçirmez sarı TruChem bariyeri",
      "Elastik başparmak halkası ile eldivenle kenetlenen güvenli sızdırmazlık",
      "Kimyasal geçirmez kaynaklı bant dikişleri",
      "50 cm uzunluk ile dirsek üstüne kadar koruma",
      "Koli içi adet: 320 Adet"
    ]
  },
  {
    "id": 36,
    "code": "KO-800",
    "title": "FABA KO-800 TruChem Tip PB3-B/PB4-B Kimyasal Önlük",
    "category": "Önlük & Laboratuvar",
    "description": "Yüksek konsantrasyonlu asit, kimyasal ve biyolojik risklere karşı olağanüstü bariyer sağlayan sarı kimyasal önlük.",
    "koli": "160 Adet",
    "sizes": "Geniş Boyut (110 cm x 90 cm)",
    "standards": [
      "Type PB3-B (EN 14605)",
      "Type PB4-B (EN 14605)",
      "EN 14126",
      "EN 1149-5"
    ],
    "applications": "Kimya sanayi, akü fabrikaları, sıvı atık tasfiyesi, laboratuvar kimyasal hazırlama.",
    "badge": "Tip PB3-B Kimyasal",
    "items": [
      "Yüksek konsantrasyonlu asit ve solventlere tam direnç",
      "Sıvı geçirmez kaynaklı kumaş teknolojisi",
      "Boyun ve belden hızlı bağlanabilir dayanıklı şeritler",
      "Koli içi adet: 160 Adet"
    ]
  },
  {
    "id": 37,
    "code": "BG-800",
    "title": "FABA BG-800 TruChem Tip PB3-B/PB4-B Kimyasal Bot Galoşu",
    "category": "Kolluk, Galoş & Başlık",
    "description": "Ağır kimyasallara, asitlere ve enfektif ajanlara karşı dikiş bantlı, kaymaz tabanlı diz altı kimyasal bot galoşu.",
    "koli": "160 Adet",
    "sizes": "Diz Altı (Tüm çizme ve botlara uyumlu)",
    "standards": [
      "Type PB3-B (EN 14605)",
      "Type PB4-B (EN 14605)",
      "EN 14126",
      "EN 1149-5"
    ],
    "applications": "Kimyasal sızıntı alanları, dekontaminasyon duşları, petrol rafinerileri ve enfeksiyon kontrolü.",
    "badge": "Tip PB3-B Kimyasal",
    "items": [
      "TruChem sarı yüksek mukavemetli kimyasal kumaş",
      "Bantlı kaynaklı dikişlerle tam sıvı sızdırmazlık",
      "Diz altı lastik ve bağlama ipleri ile sabit oturma",
      "Aşınmaya dayanıklı kaydırmaz takviyeli taban",
      "Koli içi adet: 160 Adet"
    ]
  },
  {
    "id": 38,
    "code": "BG-530",
    "title": "FABA BG-530 Lamineli Diz Altı Çizme / Bot Galoşu",
    "category": "Kolluk, Galoş & Başlık",
    "description": "55 gr/m² lamineli kumaş, diz altı uzunluk ve bağlama ipleri ile endüstriyel hijyenik bot galoşu.",
    "koli": "200 Adet",
    "sizes": "Standart Diz Altı",
    "standards": [
      "EN 13034 Type PB 6",
      "EN ISO 13688"
    ],
    "applications": "Boya kabinleri, gıda fabrikaları, tarım ve hayvancılık tesisleri, epoksi zemin uygulamaları.",
    "badge": "Lamineli",
    "items": [
      "55 gr/m² sıvı itici beyaz lamine kumaş",
      "Diz altı ve bilek lastikleri ile ayağa tam kavrama",
      "Ayakkabı ve çizmeleri boya, toz ve sıvı sıçramalarından korur",
      "Koli içi adet: 200 Adet"
    ]
  },
  {
    "id": 39,
    "code": "BG-630",
    "title": "FABA BG-630 Dikiş Bantlı Kimyasal Bot Galoşu",
    "category": "Kolluk, Galoş & Başlık",
    "description": "Tüm dikişleri sızdırmaz mavi bant ile kapatılmış, kimyasal ve biyolojik risklere karşı yüksek dayanımlı bot galoşu.",
    "koli": "200 Adet",
    "sizes": "Standart Diz Altı",
    "standards": [
      "Type PB 4-B / PB 6-B",
      "EN 14126",
      "EN 1149-5"
    ],
    "applications": "İlaç laboratuvarları, enfektif atık temizliği, kimyasal üretim ve steril temiz oda alanları.",
    "badge": "Bantlı Dikiş",
    "items": [
      "Sıvı ve sprey sızdırmaz mavi bantlı dikişler",
      "Biyolojik ve kimyasal sıçramalara tam bariyer",
      "Diz seviyesinde bağlama ipliği",
      "Koli içi adet: 200 Adet"
    ]
  }
];

export const PRODUCT_GROUPS: ProductGroup[] = RAW.map((p) => ({
  ...p,
  slug: slugify(`${p.code}-${p.title}`),
  image: `/images/products/faba_${p.id}.jpg`,
}));

export function getProduct(slug: string) {
  return PRODUCT_GROUPS.find((p) => p.slug === slug);
}

export function getRelated(product: ProductGroup, limit = 4) {
  return PRODUCT_GROUPS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

/** Ana sayfa ve öne çıkan gruplar */
export const FEATURED_IDS = [1, 7, 12, 15, 22, 26, 30, 35];

/** En çok satanlar */
export const BEST_SELLER_IDS = [1, 7, 12, 15, 22, 26];
export const isBestSeller = (id: number) => BEST_SELLER_IDS.includes(id);
