export interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Murat Karadeniz",
    role: "Fabrika Bakım Müdürü",
    company: "Samsun OSB Metal İmalat A.Ş.",
    date: "1 hafta önce",
    rating: 5,
    comment: "Tekkeköy sanayisinde aradığınız her türlü teknik hırdavat, İzeltaş el aleti ve bağlantı elemanını anında raftan temin edebileceğiniz tek adres. Fabrikamızın acil hat duruşlarında aynı gün teslimatlarıyla bizi defalarca kurtardılar. Mükemmel kurumsal hizmet.",
    verified: true
  },
  {
    id: 2,
    name: "Engin Demir",
    role: "Tersane Proje Şefi",
    company: "Karadeniz Gemi İnşa & Onarım",
    date: "2 hafta önce",
    rating: 5,
    comment: "Sertifikalı çelik halat, klemens ve ağır tonajlı polyester bez sapanlarda bölgenin en güvenilir firması. Ürünlerin test belgeleri ve CE sertifikaları eksiksiz teslim ediliyor. Yıllardır sorunsuz çalışıyoruz.",
    verified: true
  },
  {
    id: 3,
    name: "Cemil Öztürk",
    role: "Makine İmalatçısı",
    company: "Öztürk Talaşlı İmalat",
    date: "3 hafta önce",
    rating: 5,
    comment: "Kılavuz, pafta ve kobalt matkap uçlarında piyasada bulunması zor özel ölçüleri bile Arma Hırdavat'ta bulabiliyoruz. Teknik bilgileri yüksek, esnaf terbiyesini koruyan çok köklü bir kurum.",
    verified: true
  },
  {
    id: 4,
    name: "Hakan Yıldırım",
    role: "İSG ve Tesis Uzmanı",
    company: "Tekkeköy Lojistik & Depolama",
    date: "1 ay önce",
    rating: 5,
    comment: "3M maskeler, baretler, S3 iş ayakkabıları ve paraşüt tipi emniyet kemerleri tedariğinde tek çözüm ortağımız. Kesinlikle orijinal ürün veriyorlar, fiyat-kalite dengesi bölge standartlarının çok üzerinde.",
    verified: true
  },
  {
    id: 5,
    name: "Serkan Aydın",
    role: "Kaynak & Metal İşleri Atölyesi",
    company: "Aydın Kaynak Teknolojileri",
    date: "1 ay önce",
    rating: 5,
    comment: "Gazaltı kaynak telleri, taşlama diskleri ve koruyucu gaz ekipmanlarında stokları her zaman dolu. Siparişi veriyoruz, 1 saat sonra şantiyemize ulaşıyor. İlgi ve alakaları için teşekkürler.",
    verified: true
  },
  {
    id: 6,
    name: "Mustafa Çelik",
    role: "Tesisat & Pompa Sistemleri",
    company: "Çelik Mühendislik",
    date: "2 ay önce",
    rating: 5,
    comment: "Domak pompa ve Pakkens manometre gruplarında yetkili bayilik avantajını hissettiriyorlar. Hem teknik destek hem garanti sürecinde her zaman yanımızdalar. Samsun'un gururu.",
    verified: true
  },
  {
    id: 7,
    name: "Bülent Vural",
    role: "Satınalma Müdürü",
    company: "Doğu Karadeniz Sanayi Grubu",
    date: "2 ay önce",
    rating: 5,
    comment: "Kurumsal faturalandırma, cari hesap takibi ve online ödeme kolaylığıyla satınalma süreçlerimizi çok rahatlatıyorlar. Güler yüzlü, dürüst ve son derece profesyonel bir ekip.",
    verified: true
  },
  {
    id: 8,
    name: "Ali Rıza Koç",
    role: "Oto Servis & Bakım Şefi",
    company: "Koç Kardeşler Ağır Vasıta Servisi",
    date: "3 ay önce",
    rating: 5,
    comment: "Havalı somun sıkmalar, İzeltaş lokma takımları ve basınçlı yıkama makinelerimizi Arma'dan temin ettik. Malzemenin arkasında duran, teknik servis desteğini aksatmayan bir firma.",
    verified: true
  }
];
