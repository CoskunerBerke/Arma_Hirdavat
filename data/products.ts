export interface ProductGroup {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  items: string[];
  badge?: string;
}

export const CATEGORIES = [
  "Tümü",
  "Bağlantı & Sabitleme",
  "Halat & Kaldırma",
  "El Aletleri & Makineler",
  "Tesisat & Pnömatik",
  "İş Güvenliği & 3M",
  "Kaynak & Gaz",
  "Kesici & Aşındırıcı",
  "Kimyasal & Sarf",
  "Sanayi & Yapı"
] as const;

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: 1,
    title: "Bağlantı Elemanları",
    category: "Bağlantı & Sabitleme",
    image: "/images/products/product_1.jpg",
    description: "Cıvata, somun, pul, rondela, gijon ve paslanmaz çelik DIN/ISO normlarında endüstriyel bağlantı elemanları.",
    items: ["8.8, 10.9, 12.9 Çelik Cıvatalar", "İmbus & Havşa Başlı Vidalar", "A2/A4 Paslanmaz Bağlantı Ürünleri", "Ağır Yük Somun & Rondela Grupları"],
    badge: "Geniş Stok"
  },
  {
    id: 2,
    title: "Diğer Bağlantı Elemanları",
    category: "Bağlantı & Sabitleme",
    image: "/images/products/product_2.jpg",
    description: "Kör perçin, kelepçe, dübel, segman, pim ve özel ölçülü montaj bağlantı parçaları.",
    items: ["Pop Perçin & Somunlu Perçinler", "Ağır Hizmet Hortum Kelepçeleri", "Çelik ve Kimyasal Dübeller", "Segman ve Yaylı Pim Grupları"],
    badge: "DIN / ISO Standart"
  },
  {
    id: 3,
    title: "Çelik Halat ve Gemi Halatı",
    category: "Halat & Kaldırma",
    image: "/images/products/product_3.jpg",
    description: "Tersane, liman, inşaat ve vinç sistemleri için sertifikalı çelik ve gemi halatları, klemens ve mapa aksesuarları.",
    items: ["Kendir & Çelik Özlü Halatlar", "Gemi Bağlama & Palamar Halatları", "Halat Klemensleri ve Radansalar", "Dövme Çelik Şakıllar & Mapalar"],
    badge: "Sertifikalı"
  },
  {
    id: 4,
    title: "Polyester Halat, Kaldırma İndirme Ekipmanları",
    category: "Halat & Kaldırma",
    image: "/images/products/product_4.jpg",
    description: "Bez sapanlar, sonsuz sapanlar, caraskallar, ceraskal zincirleri, şaryolar, transpalet ve istif makineleri.",
    items: ["1 - 20 Ton Polyester Bez Sapanlar", "Manuel ve Elektrikli Caraskallar", "Hidrolik Manuel & Akülü Transpaletler", "Zincirli Çektirme & Tirforlar"],
    badge: "CE & Test Belgeli"
  },
  {
    id: 5,
    title: "Havalı El Aletleri",
    category: "El Aletleri & Makineler",
    image: "/images/products/product_5.jpg",
    description: "Pnömatik somun sıkmalar, havalı zımparalar, havalı perçin tabancaları ve profesyonel boya tabancaları.",
    items: ["1/2\" & 3/4\" & 1\" Havalı Somun Sıkmalar", "Orbital Havalı Zımpara Makineleri", "Havalı Gres Pompaları ve Tabancalar", "Pnömatik Çivi ve Tel Tabancaları"],
    badge: "Yüksek Tork"
  },
  {
    id: 6,
    title: "Elektrikli El Aletleri",
    category: "El Aletleri & Makineler",
    image: "/images/products/product_6.jpg",
    description: "Ağır hizmet tipi kırıcı-deliciler, avuç taşlamalar, akülü vidalamalar, profil kesme ve lazer hizalama cihazları.",
    items: ["Kırıcı & Delici Matkaplar", "Avuç & Büyük Gövde Taşlamalar", "Akülü Darbeli Vidalama Setleri", "Endüstriyel Karot ve Kesme Makineleri"],
    badge: "Profesyonel Seri"
  },
  {
    id: 7,
    title: "Vana, Flanş, Boru Ek Parçaları",
    category: "Tesisat & Pnömatik",
    image: "/images/products/product_7.jpg",
    description: "Küre vana, kelebek vana, çekvalf, flanş, patent dirsek, manşon ve paslanmaz boru bağlantı elemanları.",
    items: ["Pirinç ve Döküm Küresel Vanalar", "PN16 / PN40 Düz ve Kaynak Boyunlu Flanşlar", "Dikişsiz Patent Dirsek & Te", "Buhar ve Gaz Kondenstopları"],
    badge: "Endüstriyel Hat"
  },
  {
    id: 8,
    title: "Hortum Çeşitleri",
    category: "Tesisat & Pnömatik",
    image: "/images/products/product_8.jpg",
    description: "Basınçlı hava hortumları, yangın hortumları, hidrolik hortumlar, su emici ve verici spiral takviyeli hortumlar.",
    items: ["R2 Hidrolik Yüksek Basınç Hortumları", "Bezli & Telli Hava & Su Hortumları", "İtfaiye Tipi Dokuma Yangın Hortumları", "Poliüretan Spiral Pnömatik Hortumlar"],
    badge: "Yüksek Basınç"
  },
  {
    id: 9,
    title: "El Aletleri",
    category: "El Aletleri & Makineler",
    image: "/images/products/product_9.jpg",
    description: "Anahtar takımları, lokmalar, penseler, yan keskiler, çekiçler, boru anahtarları ve atölye el aletleri donanımları.",
    items: ["Kombine & Yıldız Anahtar Takımları", "1/4\" & 1/2\" Lokma Takımları", "Ayarlı Pense & Ağır Tip Kerpetenler", "Krom Vanadyum Profesyonel El Aletleri"],
    badge: "Atölye Standardı"
  },
  {
    id: 10,
    title: "İzeltaş El Aletleri",
    category: "El Aletleri & Makineler",
    image: "/images/products/product_10.jpg",
    description: "Türkiye'nin lider el aleti üreticisi İzeltaş'ın tüm takım çantaları, anahtarları, tork anahtarları ve servis ekipmanları.",
    items: ["İzeltaş Dolu Takım Arabaları", "Tork Anahtarları & Açı Ölçerler", "İzeltaş Ağır Sanayi Boru Anahtarları", "Yalıtımlı 1000V Elektrikçi Aletleri"],
    badge: "Yetkili Satıcı"
  },
  {
    id: 11,
    title: "Eldiven Çeşitleri",
    category: "İş Güvenliği & 3M",
    image: "/images/products/product_11.jpg",
    description: "Nitril eldivenler, deri kaynakçı eldivenleri, kesilmeye dirençli eldivenler, kimyasal ve ısıya dayanıklı eldivenler.",
    items: ["Nitril Kaplı Hassas Montaj Eldivenleri", "Ağır Hizmet Deri Kaynakçı Eldivenleri", "Seviye 5 Kesilmez Güvenlik Eldivenleri", "Asit & Kimyasal Koruma Eldivenleri"],
    badge: "EN 388 Uyumlu"
  },
  {
    id: 12,
    title: "İş Güvenliği Ekipmanları",
    category: "İş Güvenliği & 3M",
    image: "/images/products/product_12.jpg",
    description: "Baretler, emniyet kemerleri, çelik burunlu iş ayakkabıları, fosforlu yelekler, trafik güvenlik konileri ve bariyerler.",
    items: ["Paraşüt Tipi Emniyet Kemerleri & Halatlar", "S1P & S3 Çelik Burunlu İş Ayakkabıları", "Hava Kanallı Endüstriyel Baretler", "Trafik Yönlendirme ve Uyarı Levhaları"],
    badge: "Tam İSG Uyumu"
  },
  {
    id: 13,
    title: "3M Ürünleri",
    category: "İş Güvenliği & 3M",
    image: "/images/products/product_13.jpg",
    description: "Dünya devi 3M'in toz maskeleri, tam ve yarım yüz gaz maskeleri, kulaklıklar, koruyucu gözlükler ve tulumları.",
    items: ["3M FFP2 / FFP3 Ventilli Toz Maskeleri", "3M 6000 & 7500 Serisi Gaz Maskeleri", "3M Peltor Gürültü Önleyici Kulaklıklar", "3M Çizilmez Buğu Yapmaz İş Gözlükleri"],
    badge: "Orijinal 3M"
  },
  {
    id: 14,
    title: "Ölçü Aletleri",
    category: "El Aletleri & Makineler",
    image: "/images/products/product_14.jpg",
    description: "Dijital kumpaslar, mikrometreler, komparatörler, şerit metreler, nivo ve lazerli mesafe ölçüm aletleri.",
    items: ["0.01mm Hassas Dijital Kumpaslar", "Dış Çap Mikrometre Takımları", "Mıknatıslı Komparatör Saatleri", "Optik Nivolar & Lazer Metreler"],
    badge: "Mikron Hassasiyet"
  },
  {
    id: 15,
    title: "Kaynak Makinaları",
    category: "Kaynak & Gaz",
    image: "/images/products/product_15.jpg",
    description: "İnvertör elektrot kaynak makineleri, gazaltı (MIG/MAG) kaynak makineleri, TIG argon kaynakları ve plazma kesiciler.",
    items: ["Kompakt Çanta Tipi İnvertör Kaynaklar", "Sinerjik Gazaltı Kaynak Makineleri", "AC/DC TIG Alüminyum Kaynak Makineleri", "CNC Uyumlu Plazma Kesme Üniteleri"],
    badge: "Ağır Sanayi Tipi"
  },
  {
    id: 16,
    title: "Elektrod, Gaz Altı Kaynak Teli Ekipmanları",
    category: "Kaynak & Gaz",
    image: "/images/products/product_16.jpg",
    description: "Rutil ve bazik elektrotlar, SG2 gazaltı telleri, paslanmaz teller, kaynak penseleri, torçlar ve nozullar.",
    items: ["Magmaweld & Oerlikon Kaynak Telleri", "Bazik ve Paslanmaz Özel Elektrotlar", "MIG/TIG Kaynak Torçları ve Sarfları", "Otomatik Kararan Kaynak Başlıkları"],
    badge: "Birinci Sınıf Sarf"
  },
  {
    id: 17,
    title: "Gaz ve Gaz Aletleri",
    category: "Kaynak & Gaz",
    image: "/images/products/product_17.jpg",
    description: "Oksijen-Asetilen kaynak ve kesme takımları, gaz regülatörleri (manometreler), alev geri tepme ventilleri ve şalümolar.",
    items: ["Oksijen, Asetilen ve Argon Regülatörleri", "Ağır Tip Kesme ve Tavlama Şalümoları", "Hortum ve Regülatör Alev Tutucuları", "Propan & Doğalgaz Brülör Ekipmanları"],
    badge: "Güvenlik Onaylı"
  },
  {
    id: 18,
    title: "Pinomatik Ürünler - Pakkens",
    category: "Tesisat & Pnömatik",
    image: "/images/products/product_18.jpg",
    description: "Pakkens manometreler, termometreler, şartlandırıcılar, pnömatik silindirler, valfler ve otomatik fittingsler.",
    items: ["Pakkens Gliserinli Basınç Ölçerler", "Pnömatik Filtre-Regülatör-Yağlayıcı (FRY)", "5/2 - 3/2 Solenoid Yön Kontrol Valfleri", "Hızlı Geçmeli Otomatik Rekorlar"],
    badge: "Pakkens Güvencesi"
  },
  {
    id: 19,
    title: "Matkap Ucu, Klavuz, Pafta",
    category: "Kesici & Aşındırıcı",
    image: "/images/products/product_19.jpg",
    description: "HSS, kobalt ve karbür matkap uçları, makine kılavuzları, paftalar, kademeli uçlar ve rayba çeşitleri.",
    items: ["DIN 338 HSS-Co %5 Kobalt Matkap Uçları", "Metrik / Whitworth Makine Kılavuzları", "Boru ve Cıvata Diş Açma Paftaları", "Manyetik Matkap Kovan ve Uçları"],
    badge: "Talaşlı İmalat"
  },
  {
    id: 20,
    title: "Testere Profil Kesme, Karot ve Sarf Malzemeleri",
    category: "Kesici & Aşındırıcı",
    image: "/images/products/product_20.jpg",
    description: "Şerit testereler, daire testereler, bimetal pançlar, elmas karot uçları ve profil kesme tezgahları.",
    items: ["Bimetal Şerit Testere Bıçakları", "Alüminyum ve Çelik Kesim Daire Testereler", "HSS & Elmas Uçlu Delik Testereleri (Panç)", "Beton & Asfalt Elmas Karot Uçları"],
    badge: "Temiz ve Hızlı Kesim"
  },
  {
    id: 21,
    title: "Kesme ve Taşlama Taşları",
    category: "Kesici & Aşındırıcı",
    image: "/images/products/product_21.jpg",
    description: "Karbosan ve yüksek performanslı metal kesme diskleri, çapak alma taşları ve sabit tezgah taşlama taşları.",
    items: ["115, 180, 230 mm Metal Kesme Taşları", "Inox Paslanmaz Özel İnce Kesiciler", "Kalın Taşlama ve Çapak Alma Taşları", "Karbür & Korunt Tezgah Bileme Taşları"],
    badge: "Yüksek Dayanım"
  },
  {
    id: 22,
    title: "Aşındırıcı Ürünler",
    category: "Kesici & Aşındırıcı",
    image: "/images/products/product_22.jpg",
    description: "Flap diskler, zımpara ruloları, cırtlı diskler, mop zımparalar, scotch keçeler ve tel fırçalar.",
    items: ["Zirkonyum ve Seramik Flap Diskler", "Sonsuz Bant Zımpara Çeşitleri", "Saplı ve Flanşlı Mop Zımparalar", "Çanak ve Dairesel Tel Fırçalar"],
    badge: "Pürüzsüz Yüzey"
  },
  {
    id: 23,
    title: "Yıkama ve Yağlama Ekipmanları",
    category: "Sanayi & Yapı",
    image: "/images/products/product_23.jpg",
    description: "Sıcak/soğuk basınçlı oto-fabrika yıkama makineleri, havalı gres pompaları, yağ boşaltma tankları ve köpük tankları.",
    items: ["200 - 250 Bar Yüksek Basınçlı Yıkamalar", "Pnömatik Sabit ve Mobil Yağ Pompaları", "Karter Yağ Emme ve Boşaltma Üniteleri", "Sanayi Tipi Islak Kuru Süpürgeler"],
    badge: "Endüstriyel Bakım"
  },
  {
    id: 24,
    title: "Kompresör-Airles Boya Makinası",
    category: "Sanayi & Yapı",
    image: "/images/products/product_24.jpg",
    description: "Pistonlu ve vidalı hava kompresörleri, airless havasız yüksek basınçlı boya püskürtme makineleri ve kurutucular.",
    items: ["50 - 500 Litre Pistonlu Kompresörler", "Vidalı Sessiz Endüstriyel Kompresörler", "Hidrolik & Elektrikli Airless Pompalar", "Basınçlı Hava Kurutucuları ve Tanklar"],
    badge: "Kesintisiz Güç"
  },
  {
    id: 25,
    title: "Endüstriyel Kimyasal ve Yapıştırıcılar",
    category: "Kimyasal & Sarf",
    image: "/images/products/product_25.jpg",
    description: "Civata sabitleyiciler, rulman yapıştırıcılar, sıvı contalar, pas sökücüler, balata spreyleri ve silikon/mastikler.",
    items: ["Loctite & 404 Cıvata Sabitleyiciler", "Yüksek Isı Sıvı Sıvı Contalar", "Endüstriyel Pas Sökücü & Yağlayıcı Spreyler", "Poliüretan Mastik ve Silikon Grupları"],
    badge: "Kimyasal Güvence"
  },
  {
    id: 26,
    title: "Sanayi Bantları ve Ambalaj Ürünleri",
    category: "Kimyasal & Sarf",
    image: "/images/products/product_26.jpg",
    description: "Koli bantları, maskeleme bantları, çift taraflı köpük bantlar, çemberleme makineleri ve streç filmler.",
    items: ["Sıcak & Soğuk Tutkal Koli Bantları", "Oto Fırın Maskeleme Kağıt Bantları", "Ağır Yük Çift Taraflı Akrilik Bantlar", "Palet Streçleri ve Çember Tokaları"],
    badge: "Ambalaj Çözümleri"
  },
  {
    id: 27,
    title: "Aspiratör Mengene İşkence ve Boya Sarf Malzemeleri",
    category: "Sanayi & Yapı",
    image: "/images/products/product_27.jpg",
    description: "Döküm demirci mengeneleri, fırdöndülü marangoz işkenceleri, salyangoz aspiratörler ve rulo boya gereçleri.",
    items: ["Dövme Çelik Döner Tablalı Mengeneler", "F Tipi & C Tipi Ağır Hizmet İşkenceler", "Sanayi Tipi Salyangoz Havalandırma Fanları", "Epoksi ve Sentetik Boya Ruloları"],
    badge: "Sağlam Donanım"
  },
  {
    id: 28,
    title: "Sanayi Tekerleri",
    category: "Sanayi & Yapı",
    image: "/images/products/product_28.jpg",
    description: "Ağır sanayi taşıma tekerleri, poliüretan, polyamid, döküm ve kauçuk tablalı/frenli döner tekerlekler.",
    items: ["500 - 2000 kg Ağır Yük Tekerleri", "Aşınmaz Poliüretan Kaplamalı Tekerlekler", "Frenli & Sabit Çelik Maşalı Döner Tekerler", "Isıya Dayanıklı Fırın Tekerlekleri"],
    badge: "Yüksek Taşıma Gücü"
  },
  {
    id: 29,
    title: "Merdiven, İnş. Makinaları ve İnş. El Aletleri",
    category: "Sanayi & Yapı",
    image: "/images/products/product_29.jpg",
    description: "Alüminyum endüstriyel merdivenler, beton perdah (helikopter) makineleri, kompaktörler, demir kesme ve bükme aletleri.",
    items: ["A Tipi & Sürgülü Güvenlikli Merdivenler", "Benzinli Beton Vibratörleri ve Helikopterler", "Manuel & Hidrolik İnşaat Demiri Makasları", "Şantiye Su Pompaları ve Harç Tekneleri"],
    badge: "Şantiye Standardı"
  },
  {
    id: 30,
    title: "Domak Pompa ve Sufil Ürünleri",
    category: "Tesisat & Pnömatik",
    image: "/images/products/product_30.jpg",
    description: "Domak hidroforlar, kademeli santrifüj su pompaları, derin kuyu dalgıç pompaları ve su arıtma filtre sistemleri.",
    items: ["Domak Santrifüj & Kademeli Su Pompaları", "Otomatik Paket Hidrofor Sistemleri", "Foseptik ve Drenaj Dalgıç Pompaları", "Sufil Endüstriyel Su Arıtma ve Filtreleri"],
    badge: "Yetkili Bölge Bayisi"
  }
];
