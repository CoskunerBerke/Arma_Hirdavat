/* ────────────────────────────────────────────────────────────────────────────
 * ÜRÜN REHBERLERİ — /rehber ve /rehber/<slug>
 *
 * Satın alma öncesi bilgi içerikleri (konu otoritesi + karşılıklılık). Metin yapısal veridir;
 * app/rehber/[slug]/page.tsx ve components/guides/* bu veriyi çizer.
 *
 * KURALLAR
 * - title marka eki İÇERMEZ (layout " | Arma Hırdavat" ekler), en fazla 60 karakter.
 * - metaDescription 140–155 karakter.
 * - Standart bilgileri (eşik değerler, tip tanımları) yalnızca standardın kendisine dayanır;
 *   emin olunmayan konuda temkinli yazılır. Arma'nın hizmetleri hakkında PROMISES dışında söz verilmez.
 * - Ürün kodları, EN kodları ve koli bilgileri metne ELLE YAZILMAZ: "dynamic" blokları ve
 *   aşağıdaki satır içi işaretler bunları data/products.ts'ten canlı üretir. Böylece ürün verisi
 *   düzeltildiğinde rehberler kendiliğinden güncellenir.
 * - slug değişirse dış bağlantılar kırılır; yayından sonra değiştirmeyin.
 *
 * SATIR İÇİ İŞARETLER (p, ul, ol, callout, tablo hücreleri ve SSS yanıtlarında)
 *   **kalın**
 *   [etiket](/yol)              → site içi bağlantı
 *   [etiket](cat:<slug>)        → /kategori/<slug> (data/categories.ts'te yoksa düz metin)
 *   [etiket](product:<id>)      → ürün sayfası; etiket "$code" ise ürün kodu, "$title" ise ürün adı yazılır
 *   [etiket](guide:<slug>)      → başka bir rehber
 *   {{code:<id>}}               → ürün kodu (ör. EP-1301)
 *   {{koli:<id>:<adet>}}        → koli çapası (ör. "3 koli = 756 çift")
 * ──────────────────────────────────────────────────────────────────────────── */

/** Ürün verisinden canlı üretilen bloklar (components/guides/GuideDynamicBlock.tsx). */
export type GuideDynamicKind =
  /** Bir eldivenin EN 388 kodunu hane hane çözer (productId gerekli). */
  | "en388-example"
  /** Katalogdaki tüm eldivenlerin EN 388 kodları. */
  | "en388-table"
  /** Tam vücut tulumları: tip, B eki, antistatik, EN 1073-2. */
  | "chem-full"
  /** Kısmi vücut koruyucuları (önlük, kolluk, galoş, başlık): PB tipleri. */
  | "chem-partial"
  /** Katalogdaki EN 407 kodlarının hane hane çözümü. */
  | "en407-table"
  /** Kaynakçı ve sürücü eldivenleri: EN 12477 tipi, EN 407, EN 388. */
  | "welding-table"
  /** Eldivenlerin beden seçenekleri ve koli içi adetleri. */
  | "glove-sizes"
  /** Beden bazında teklif listesi oluşturma aracı (istemci bileşeni). */
  | "size-mixer";

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "table";
      caption: string;
      head: string[];
      rows: string[][];
      note?: string;
    }
  | { type: "callout"; tone: "info" | "warning"; title?: string; text: string }
  | { type: "dynamic"; kind: GuideDynamicKind; caption?: string; productId?: number; note?: string };

export interface GuideSection {
  /** Sayfa içi bağlantı (#id) — içindekiler tablosu bunu kullanır. */
  id: string;
  /** H2 başlığı */
  title: string;
  blocks: GuideBlock[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  /** URL parçası: /rehber/<slug> */
  slug: string;
  /** <title> (marka eki hariç, ≤ 60 karakter) */
  title: string;
  /** Meta description (140–155 karakter) */
  metaDescription: string;
  /** Sayfanın tek H1 başlığı */
  h1: string;
  /** H1 üstündeki kısa konu etiketi */
  eyebrow: string;
  /** Aramadaki soruyu iki cümlede yanıtlayan giriş (öne çıkan snippet biçimi) */
  summary: string;
  /** /rehber kartındaki kısa açıklama */
  cardText: string;
  /** ISO tarih (YYYY-MM-DD) */
  datePublished: string;
  dateModified: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Dayanılan kaynaklar (başlık olarak) */
  sources: string[];
  /** data/categories.ts slug'ları */
  relatedCategorySlugs: string[];
  /** data/products.ts id'leri (id'ler kalıcıdır; slug başlıkla değişebilir) */
  relatedProductIds: number[];
  /** Yumuşak teklif kutusunun metni */
  ctaText: string;
}

/** Rehber içeriğinin son anlamlı güncelleme tarihi. İçerik değiştiğinde elle güncelleyin. */
export const GUIDES_UPDATED = "2026-10-11";

export const GUIDE_HUB = {
  path: "/rehber",
  title: "İş Güvenliği Ürün Rehberleri: Eldiven ve Tulum Seçimi",
  metaDescription:
    "EN 388 eldiven kodları, Tip 3–6 kimyasal tulum farkı, kaynakçı eldiveni Tip A/B ve iş eldiveni beden tablosu: satın almadan önce okunacak kısa rehberler.",
  h1: "İş Güvenliği Ürün Rehberleri",
  intro:
    "Eldiven ve koruyucu giysi seçerken etiketteki kodları doğru okumak, yanlış ürüne para vermeyi önler. Bu rehberler standartları sade bir dille anlatır ve katalogdaki gerçek ürün verileriyle örnekler.",
} as const;

export const GUIDES: Guide[] = [
  /* ──────────────────────────────────────────────────────────────────────────
   * 1) EN 388
   * ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "en-388-eldiven-kodlari",
    title: "EN 388 Nedir? Eldiven Performans Kodları Nasıl Okunur?",
    metaDescription:
      "EN 388:2016+A1:2018 eldiven kodu nasıl okunur? Aşınma, kesilme, yırtılma, delinme haneleri, A–F TDM kesilme seviyeleri ve X anlamı; ürün örnekleriyle.",
    h1: "EN 388 Nedir? Eldiven Performans Kodları Nasıl Okunur?",
    eyebrow: "Eldiven standartları",
    summary:
      "EN 388, iş eldivenlerinin mekanik risklere karşı dayanımını ölçen Avrupa standardıdır; güncel sürümü EN 388:2016+A1:2018'dir. Kalkan simgesinin altındaki kodda ilk dört hane sırasıyla aşınma, kesilme (coupe), yırtılma ve delinme seviyesini, beşinci harf TDM kesilme seviyesini (A–F), varsa altıncı karakter olan P ise darbe korumasını gösterir.",
    cardText:
      "Kalkan simgesinin altındaki 4 rakam ve harfler ne anlatır? Aşınma, kesilme, yırtılma, delinme ve A–F kesilme seviyeleri örneklerle.",
    datePublished: "2026-10-11",
    dateModified: "2026-10-11",
    sections: [
      {
        id: "en-388-nedir",
        title: "EN 388 nedir, neyi ölçer?",
        blocks: [
          {
            type: "p",
            text: "EN 388, iş eldivenlerinin mekanik risklere karşı ne kadar dayanıklı olduğunu laboratuvar testleriyle ölçen Avrupa standardıdır. Türkiye'de aynı numarayla TS EN 388 olarak uygulanır. Kişisel koruyucu donanım (KKD) olarak satılan bir iş eldiveni, CE işaretiyle birlikte genel gereklilikler standardı EN ISO 21420'ye ve koruma iddiasına göre EN 388 gibi performans standartlarına uygunluk beyan eder.",
          },
          {
            type: "p",
            text: "Standart; aşınma, bıçakla kesilme, yırtılma, delinme ve isteğe bağlı olarak darbe dayanımını ayrı ayrı test eder. Sonuçlar, çekiç simgeli bir kalkan piktogramının altında dört rakam ve bir ya da iki harften oluşan bir kodla gösterilir. Bu kodu okuyabilen bir satın alma veya İSG sorumlusu, iki eldiveni markadan bağımsız olarak karşılaştırabilir.",
          },
          {
            type: "p",
            text: "Güncel sürüm **EN 388:2016+A1:2018**'dir. 2016 öncesindeki EN 388:2003'e göre test edilmiş eldivenlerde yalnızca dört hane bulunur; TDM kesilme harfi ve darbe işareti bu eski kodlarda yer almaz. 2016 sürümünde aşınma testi de değiştiği için farklı sürümlere göre verilmiş kodları doğrudan karşılaştırmayın.",
          },
          {
            type: "callout",
            tone: "warning",
            title: "EN 388 kimyasal koruma ölçmez",
            text: "EN 388 yalnızca mekanik riskleri kapsar. Eldiven kimyasala veya biyolojik ajana temas edecekse, ürünün bu riskler için ayrıca bir koruma standardı taşıyıp taşımadığını kontrol edin.",
          },
        ],
      },
      {
        id: "kod-nasil-okunur",
        title: "Kod nasıl okunur? Hane hane anlamı",
        blocks: [
          {
            type: "p",
            text: "Kod soldan sağa okunur. Rakamlar 0 ile 4 arasında (kesilmede 0 ile 5 arasında) değişir; sayı büyüdükçe dayanım artar. Harfler ise rakamlardan sonra gelir.",
          },
          {
            type: "table",
            caption: "EN 388:2016+A1:2018 kodunun sırası",
            head: ["Sıra", "Özellik", "Nasıl test edilir?", "Seviye"],
            rows: [
              ["1", "Aşınma direnci", "Numune zımpara kâğıdına karşı döngüyle sürtülür; delinene kadar geçen döngü sayısı ölçülür.", "0–4"],
              ["2", "Kesilme direnci (coupe)", "Dönen dairesel bıçak numuneyi kesene kadar ileri geri hareket eder.", "0–5"],
              ["3", "Yırtılma direnci", "Numuneyi yırtmak için gereken kuvvet (Newton) ölçülür.", "0–4"],
              ["4", "Delinme direnci", "Standart bir ucun numuneyi delmesi için gereken kuvvet ölçülür.", "0–4"],
              ["5", "TDM kesilme (EN ISO 13997)", "Düz bıçakla belirli mesafede kesmek için gereken kuvvet ölçülür.", "A–F"],
              ["6", "Darbe koruması (isteğe bağlı)", "Darbe koruma bölgesi (ör. parmak eklemleri) darbe testine tabi tutulur.", "P"],
            ],
          },
          { type: "h3", text: "0 ve X ne demek?" },
          {
            type: "p",
            text: "**0**, eldivenin test edildiğini ama o özellikte en düşük seviyenin altında kaldığını gösterir. **X** ise testin yapılmadığını ya da eldivenin yapısı nedeniyle o test yönteminin uygulanamadığını belirtir. Örneğin kesilmeye dirençli lifler coupe testindeki bıçağı köreltebilir. Bu durumda coupe sonucu yalnızca bilgi amaçlıdır, referans sonuç TDM harfidir ve ikinci hane çoğu üründe X olarak yazılır.",
          },
          { type: "h3", text: "Seviyelerin eşik değerleri" },
          {
            type: "table",
            caption: "EN 388 seviyeleri için asgari test sonuçları",
            head: ["Seviye", "Aşınma (döngü)", "Coupe kesilme (indeks)", "Yırtılma (N)", "Delinme (N)"],
            rows: [
              ["1", "100", "1,2", "10", "20"],
              ["2", "500", "2,5", "25", "60"],
              ["3", "2.000", "5,0", "50", "100"],
              ["4", "8.000", "10,0", "75", "150"],
              ["5", "—", "20,0", "—", "—"],
            ],
            note: "Her değer, o seviyeye ulaşmak için gereken en düşük test sonucudur.",
          },
        ],
      },
      {
        id: "tdm-kesilme-seviyeleri",
        title: "TDM kesilme seviyeleri: A'dan F'ye",
        blocks: [
          {
            type: "p",
            text: "2016 revizyonunun en önemli yeniliği, EN ISO 13997'ye göre yapılan **TDM kesilme testidir**. Bu testte düz bir bıçağın kumaşı belirli bir mesafede kesmesi için gereken kuvvet ölçülür ve sonuç harfle gösterilir. Coupe testinin aksine bıçak körelmesinden etkilenmez. Bu yüzden kesilmeye dirençli (halk arasında kesilmez eldiven denen) ürünleri karşılaştırırken esas alınacak değer TDM harfidir.",
          },
          {
            type: "table",
            caption: "TDM kesilme seviyeleri (EN ISO 13997)",
            head: ["Seviye", "Asgari kesme kuvveti", "Genel yorum"],
            rows: [
              ["A", "≥ 2 N", "Düşük kesilme direnci"],
              ["B", "≥ 5 N", "Düşük–orta"],
              ["C", "≥ 10 N", "Orta"],
              ["D", "≥ 15 N", "Orta–yüksek"],
              ["E", "≥ 22 N", "Yüksek"],
              ["F", "≥ 30 N", "Çok yüksek"],
            ],
            note: "Bu tablo bir seçim kuralı değil, okuma kılavuzudur. Gerekli seviye işyerinizin risk değerlendirmesiyle belirlenir.",
          },
          {
            type: "p",
            text: "Hiçbir eldiven kesilmeye karşı mutlak koruma sağlamaz. TDM harfi yalnızca standart test koşulundaki direnci gösterir; dişli bıçaklar, dönen ekipmanlar ve sivri uçlar farklı riskler taşır. Kesilme seviyesi yükseldikçe eldiven genellikle kalınlaşır ve parmak hassasiyeti azalır; ihtiyacın üzerinde seviye seçmek her zaman daha güvenli sonuç vermez, çünkü rahatsız eden eldiven çıkarılır.",
          },
        ],
      },
      {
        id: "darbe-korumasi",
        title: "Altıncı karakter: P (darbe koruması)",
        blocks: [
          {
            type: "p",
            text: "Kodun sonunda **P** harfi varsa, eldivenin darbe koruması sağlayan bölgeleri (genellikle parmak eklemleri ve el sırtı) EN 388'deki darbe testinden geçmiştir. Darbe testi isteğe bağlıdır; yapılmamışsa kodda P harfi yer almaz.",
          },
          {
            type: "p",
            text: "P harfi; el sırtına ağır parça çarpması, sıkışma veya düşen malzeme riski olan işlerde aranır. Bu tür işlerde darbe pedli eldivenlerin kavrama ve el becerisi üzerindeki etkisini de deneyerek görmek gerekir.",
          },
        ],
      },
      {
        id: "ornek-kodlar",
        title: "Örnek: Gerçek ürün kodlarını birlikte okuyalım",
        blocks: [
          {
            type: "p",
            text: "Aşağıdaki örnekler katalogdaki eldivenlerin ürün sayfalarında yazan EN 388 kodlarından üretilir. Satın almadan önce kodu her zaman ürün etiketi ve ambalajıyla karşılaştırın.",
          },
          { type: "dynamic", kind: "en388-example", productId: 1 },
          { type: "dynamic", kind: "en388-example", productId: 13 },
          {
            type: "dynamic",
            kind: "en388-table",
            caption: "Katalogdaki eldivenlerin EN 388 kodları",
            note: "Aynı koda sahip modeller tek satırda gösterilir. Ayrıntı için ürün sayfasına bakın.",
          },
        ],
      },
      {
        id: "nasil-secilir",
        title: "İşe göre doğru EN 388 seviyesi nasıl seçilir?",
        blocks: [
          {
            type: "ol",
            items: [
              "**Riski tanımlayın.** Eldiven aşınmaya mı (kaba yüzey, beton, palet), kesilmeye mi (sac, cam, keskin kenarlı parça), delinmeye mi (tel, çapak, kıymık) maruz kalacak? Her risk ayrı bir haneye karşılık gelir.",
              "**İlgili haneyi önceliklendirin.** Kesilme riski olan işlerde coupe hanesine değil TDM harfine bakın. Aşınmanın yoğun olduğu işlerde birinci hanenin yüksek olması, eldivenin daha uzun dayanması demektir.",
              "**Kavrama ve el becerisini unutmayın.** Daha yüksek koruma çoğu zaman daha kalın bir eldiven demektir. Hassas montajda ince örgü ve köpük nitril kaplama parmak hassasiyetini korur; [köpük nitril eldivenler](cat:kopuk-nitril-eldiven) bu iş için tasarlanır.",
              "**Ortamı değerlendirin.** Yağlı ve ıslak parçalarda kaplamanın türü ve el sırtının kapalı olup olmadığı önemlidir. Tam kaplama modeller el sırtını da örter; yarım kaplama modellerde el sırtı açık kaldığı için el daha rahat nefes alır.",
              "**Beden ve uyumu kontrol edin.** Yanlış bedendeki eldiven hem kavramayı hem korumayı zayıflatır. Ölçü almak için [iş eldiveni beden tablosu](guide:is-eldiveni-beden-tablosu) rehberine bakın.",
              "**Belgeyi doğrulayın.** Ürün etiketinde ve ambalajda CE işareti, EN 388 piktogramı ve performans kodu ile beden bilgisi bulunmalıdır. Bu bilgileri teknik föy veya uygunluk beyanıyla karşılaştırın.",
            ],
          },
          {
            type: "p",
            text: "Katalogdaki eldivenleri kullanım amacına göre şu sayfalarda karşılaştırabilirsiniz: [nitril kaplı iş eldivenleri](cat:nitril-kapli-is-eldiveni), [köpük nitril eldivenler](cat:kopuk-nitril-eldiven), [kesilmeye dirençli eldivenler](cat:kesilmeye-direncli-eldiven) ve [kaynakçı eldivenleri](cat:kaynakci-eldiveni).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "EN 388 kodundaki harf (A–F) ne anlama gelir?",
        a: "Beşinci karakter, EN ISO 13997'ye göre yapılan TDM kesilme testinin sonucudur. A en az 2 N, F en az 30 N kesme kuvvetine dayanımı gösterir. Kesilmeye dirençli eldivenleri karşılaştırırken esas alınacak değer budur.",
      },
      {
        q: "Kodda X görürsem eldiven koruma sağlamıyor mu?",
        a: "X, o özelliğin test edilmediğini ya da test yönteminin bu eldivene uygulanamadığını gösterir; 0 ile aynı şey değildir. Ancak X yazan özellik için bir koruma iddiası da yoktur. O risk sizin için önemliyse ilgili hanesinde seviye verilmiş bir eldiven seçin.",
      },
      {
        q: "EN 388:2003 ve EN 388:2016 kodları karşılaştırılabilir mi?",
        a: "Doğrudan karşılaştırılamaz. 2016 sürümü TDM kesilme testini ve darbe işaretini ekledi, aşınma testinde de değişiklik yaptı. Karşılaştırma yaparken eldivenlerin aynı sürüme göre test edildiğinden emin olun.",
      },
    ],
    sources: [
      "EN 388:2016+A1:2018 — Koruyucu eldivenler: mekanik risklere karşı",
      "EN ISO 13997 — Koruyucu giysi: keskin nesnelerle kesilmeye karşı direncin tayini (TDM)",
      "EN ISO 21420:2020 — Koruyucu eldivenler: genel gereklilikler ve deney yöntemleri",
      "FABA ürün kataloğu (ürün kodları, bedenler ve koli içi adetler)",
    ],
    relatedCategorySlugs: [
      "nitril-kapli-is-eldiveni",
      "kopuk-nitril-eldiven",
      "kesilmeye-direncli-eldiven",
      "kaynakci-eldiveni",
    ],
    relatedProductIds: [1, 4, 7, 13],
    ctaText:
      "İhtiyacınız olan eldiveni, bedenleri ve koli adedini yazın; fiyat ve sevkiyat bilgisini içeren teklifiniz e-postanıza gelir.",
  },

  /* ──────────────────────────────────────────────────────────────────────────
   * 2) KİMYASAL TULUM TİPLERİ
   * ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "kimyasal-tulum-tipleri",
    title: "Tip 3, 4, 5, 6 Tulum Farkı: Kimyasal Koruyucu Tulum Seçimi",
    metaDescription:
      "Tip 3, 4, 5 ve 6 tulum farkı nedir? EN 14605, EN ISO 13982-1 ve EN 13034 tipleri, B eki (EN 14126), PB kısmi koruma ve EN 1149-5 ile doğru tulum seçimi.",
    h1: "Tip 3, 4, 5, 6 Tulum Farkı: Kimyasal Koruyucu Tulum Seçimi",
    eyebrow: "Koruyucu giysi standartları",
    summary:
      "Kimyasal koruyucu tulumlarda tip numarası, giysinin hangi maruziyet biçimine karşı test edildiğini gösterir: Tip 3 basınçlı sıvı jetine, Tip 4 yoğun spreye (EN 14605), Tip 5 havadaki katı partiküllere (EN ISO 13982-1), Tip 6 sınırlı sıvı sıçramasına (EN 13034) karşıdır. Numaranın yanındaki B harfi ise giysinin EN 14126'ya göre enfektif ajanlara karşı da test edildiğini belirtir.",
    cardText:
      "Tip 3B, 4B, 5B, 6B ne demek? Sıvı jeti, sprey, toz ve sıçrama koruması; B eki, PB kısmi koruma ve antistatik tulum seçimi.",
    datePublished: "2026-10-11",
    dateModified: "2026-10-11",
    sections: [
      {
        id: "tip-neden-onemli",
        title: "Kimyasal koruyucu giyside tip neden önemli?",
        blocks: [
          {
            type: "p",
            text: "Kimyasal koruyucu giysiler, AB'nin KKD Tüzüğü (EU) 2016/425 kapsamında en yüksek risk grubu olan **Kategori III**'te yer alır. Türkiye'deki KKD Yönetmeliği de aynı tüzüğe dayanır. Bu nedenle tulumun etiketinde CE işaretinin yanında onaylanmış kuruluş numarası ve giysinin hangi tiplere göre test edildiği yazılır.",
          },
          {
            type: "p",
            text: "Tip numarası, tulumun bütün olarak (kumaş, dikiş, fermuar ve bağlantı noktalarıyla) belirli bir maruziyete karşı test edildiğini gösterir. Tip 1'den Tip 6'ya doğru koruma genel olarak azalır, ancak tipler kendiliğinden birbirini kapsamaz. Etikette hangi tipler yazıyorsa tulum yalnızca onlar için test edilmiştir.",
          },
        ],
      },
      {
        id: "tip-1-6",
        title: "Tip 1'den Tip 6'ya: karşılaştırma tablosu",
        blocks: [
          {
            type: "table",
            caption: "Kimyasal koruyucu giysi tipleri",
            head: ["Tip", "Koruma", "Standart", "Örnek kullanım"],
            rows: [
              ["Tip 1–2", "Gaz geçirmez veya dışarıdan hava beslemeli giysiler", "EN 943 serisi", "Gaz ve buhar halindeki tehlikeli kimyasallar, acil müdahale"],
              ["Tip 3", "Sıvı geçirmez: basınçlı sıvı jeti", "EN 14605", "Basınçlı kimyasal hatlar, tank temizliği, dolum"],
              ["Tip 4", "Sprey geçirmez: yoğun sprey ve buğu", "EN 14605", "Kimyasal püskürtme, ilaçlama, basınçlı yıkama"],
              ["Tip 5", "Havada taşınan katı partiküller", "EN ISO 13982-1", "İnce toz, elyaf, kuru kimyasal partikül, zımpara tozu"],
              ["Tip 6", "Sınırlı sıvı sıçraması ve hafif sprey", "EN 13034", "Düşük miktarda, basınçsız sıçrama riski"],
            ],
          },
          {
            type: "p",
            text: "Tip 1 ve Tip 2 giysiler solunum cihazıyla birlikte kullanılan özel ekipmanlardır ve online katalogda yer almaz. Sanayide en sık karşılaşılan seçim, Tip 3–4 kimyasal tulum ile Tip 5–6 tek kullanımlık tulum arasındadır.",
          },
          { type: "h3", text: "Tip 3 ve Tip 4 (EN 14605)" },
          {
            type: "p",
            text: "Tip 3, basınçlı sıvı jetine; Tip 4 ise tulumu ıslatan yoğun sprey ve buğuya karşı test edilir. Her iki tipte de dikişlerin kumaş kadar sızdırmaz olması gerekir; bu yüzden bu tulumlarda dikişler genellikle bantla kapatılır. Kendinden çoraplı (entegre galoşlu) modeller, sıvının ayakkabının içine akmasını engeller.",
          },
          { type: "h3", text: "Tip 5 (EN ISO 13982-1)" },
          {
            type: "p",
            text: "Tip 5, havada asılı katı partiküllere karşı koruma sağlar. Test, gerçek hareketler sırasında tulumun içine sızan partikül miktarını ölçer. Tip 5 tulum solunum koruması değildir; toz riski olan işlerde uygun maske ayrıca kullanılmalıdır.",
          },
          { type: "h3", text: "Tip 6 (EN 13034)" },
          {
            type: "p",
            text: "Tip 6, sınırlı miktarda sıvı sıçramasına ve hafif spreye karşı en temel kimyasal korumadır. Sıvının tulumu ıslatması ve basınçlı temas beklenmiyorsa yeterli olabilir. Lamineli ve SMS tek kullanımlık tulumlar çoğunlukla Tip 5 ve Tip 6 olarak birlikte belgelenir.",
          },
        ],
      },
      {
        id: "b-eki-en-14126",
        title: "Tip numarasındaki B harfi: EN 14126",
        blocks: [
          {
            type: "p",
            text: "Tip numarasının yanındaki **B** harfi (ör. Tip 3B, 4B, 5B, 6B), giysinin EN 14126'ya göre enfektif ajanlara, yani bakteri ve virüs gibi biyolojik risklere karşı da test edildiğini gösterir. B harfi dikiş korumasını ya da ikinci bir katmanı ifade etmez; bu sık yapılan hata satın alma kararlarını yanlış yönlendirebilir.",
          },
          {
            type: "p",
            text: "EN 14126 tek bir testten oluşmaz. Basınç altındaki kontamine sıvılara, mekanik temasla geçen bakterilere, kontamine sıvı aerosollerine ve kontamine toza karşı ayrı testler ve sınıflar içerir. Atık, hayvancılık, dezenfeksiyon ve laboratuvar işlerinde B harfli giysi aranır; hangi sınıfların karşılandığı üreticinin teknik föyünde yer alır.",
          },
        ],
      },
      {
        id: "pb-kismi-koruma",
        title: "PB[3], PB[4], PB[6]: Kısmi vücut koruması",
        blocks: [
          {
            type: "p",
            text: "Kimyasal risk vücudun yalnızca bir bölgesini etkiliyorsa tam tulum yerine kısmi koruyucu (PB, partial body) ürünler kullanılabilir: önlük, kolluk, galoş ve başlık gibi. PB[3] ve PB[4] kısmi koruyucular EN 14605'e, PB[6] ise EN 13034'e göre test edilir. B eki burada da EN 14126 anlamına gelir; örneğin PB3-B, PB[3] sınıfında olan ve enfektif ajanlara karşı da test edilmiş bir kısmi koruyucudur.",
          },
          {
            type: "p",
            text: "Kısmi koruyucular, tulumun zayıf noktalarını kapatmak için de kullanılır: kolluk eldivenle tulum kolu arasındaki geçişi, galoş ise tulum paçasıyla ayakkabı arasını örter. Ancak kısmi koruyucu tam vücut tipinin yerini tutmaz; maruziyet tüm vücudu etkiliyorsa uygun tipte tulum seçilmelidir.",
          },
          {
            type: "dynamic",
            kind: "chem-partial",
            caption: "Katalogdaki önlük, kolluk, galoş ve başlıkların koruma tipleri",
          },
        ],
      },
      {
        id: "antistatik-radyoaktif",
        title: "EN 1149-5 antistatik, EN 1073-2 ve EN ISO 13688",
        blocks: [
          {
            type: "p",
            text: "**EN 1149-5**, giysinin elektrostatik yükü dağıtma özelliğine ilişkin malzeme ve tasarım gerekliliklerini tanımlar. Yanıcı solvent, toz veya gaz bulunan alanlarda statik kıvılcım riskini azaltmak için aranır. Antistatik giysinin işe yaraması için kullanıcının uygun ayakkabı ve zeminle topraklanmış olması gerekir; patlayıcı ortamlarda kullanım kararı risk değerlendirmesiyle verilmelidir.",
          },
          {
            type: "p",
            text: "**EN 1073-2**, radyoaktif toz ve partikül bulaşmasına karşı koruyucu giysileri kapsar. Bu işaret, giysinin iyonlaştırıcı radyasyonu durdurduğu anlamına gelmez; yalnızca radyoaktif partiküllerin cilde ve iç giysiye ulaşmasını sınırlar.",
          },
          {
            type: "p",
            text: "**EN ISO 13688** ise koruyucu giysilerin genel gerekliliklerini (beden, ergonomi, işaretleme, malzemenin zararsızlığı) tanımlar ve tek başına kimyasal koruma iddiası değildir. Yalnızca bu standardı taşıyan ekonomik tulumlar ziyaretçi, hijyen ve kirlenmeyi önleme amaçlıdır.",
          },
        ],
      },
      {
        id: "katalogdaki-tulumlar",
        title: "Katalogdaki tulumlar hangi tipte?",
        blocks: [
          {
            type: "p",
            text: "Aşağıdaki tablo, ürün sayfalarındaki standart bilgilerinden üretilir. Tam vücut tulumlarında belgelenmiş tipleri, B ekini ve ek özellikleri yan yana görebilirsiniz.",
          },
          {
            type: "dynamic",
            kind: "chem-full",
            caption: "Katalogdaki tam vücut tulumlarının koruma tipleri",
          },
        ],
      },
      {
        id: "nasil-secilir",
        title: "Doğru tulum adım adım nasıl seçilir?",
        blocks: [
          {
            type: "ol",
            items: [
              "**Kimyasalı tanımlayın.** Güvenlik bilgi formunda (GBF) maddenin fiziksel hali (gaz, sıvı, toz), tehlike sınıfı ve önerilen KKD yer alır.",
              "**Maruziyet biçimini belirleyin.** Basınçlı jet mi, yoğun sprey mi, toz mu, ara sıra sıçrama mı? Tip numarası tam olarak bu soruya karşılık gelir.",
              "**Biyolojik risk varsa B ekini arayın.** Atık, hayvancılık, dezenfeksiyon ve laboratuvar işlerinde EN 14126 belgeli giysi seçin.",
              "**Ortamı ekleyin.** Yanıcı ortamda EN 1149-5, radyoaktif toz riski olan alanda EN 1073-2 aranır. Uzun vardiyalarda ısı stresi de önemlidir: SMS kumaş daha iyi nefes alır, lamineli (mikro gözenekli) kumaş sıvıya karşı daha güçlü bir bariyer oluşturur.",
              "**Geçirgenlik verisini kontrol edin.** Tip testi tulumun yapısal sızdırmazlığını gösterir. Belirli bir kimyasalın kumaştan ne kadar sürede geçtiği (permeasyon) üreticinin verisiyle ayrıca doğrulanmalıdır.",
              "**Bedeni ve bağlantıları tamamlayın.** Tulum çömelirken ve uzanırken gerilmemelidir. Eldiven, bot ve maske bağlantı noktaları bantlanabilir ya da kolluk ve galoşla desteklenebilir.",
            ],
          },
          {
            type: "p",
            text: "Tam vücut koruması için [kimyasal koruyucu tulumlar](cat:kimyasal-koruyucu-tulum) ve [tek kullanımlık tulumlar](cat:tek-kullanimlik-tulum), kısmi koruma için [önlükler](cat:onluk-laboratuvar-onlugu) ile [kolluk, galoş ve başlıklar](cat:kolluk-galos-baslik) sayfalarına bakabilirsiniz.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Tip 5/6 tulum kimyasala karşı korur mu?",
        a: "Tip 5 kuru partiküllere, Tip 6 ise sınırlı sıvı sıçramasına karşı korur. Basınçlı sıvı, yoğun sprey veya kimyasala sürekli temas varsa Tip 3 ya da Tip 4 belgeli bir tulum gerekir.",
      },
      {
        q: "Tek kullanımlık tulum yeniden kullanılabilir mi?",
        a: "Tek kullanımlık tulumlar bir kez kullanılmak üzere tasarlanır. Kimyasala veya biyolojik ajana maruz kalmış bir tulum yıkanıp yeniden giyilmemeli, işyerinizin atık prosedürüne göre bertaraf edilmelidir.",
      },
      {
        q: "Tulum bedeni nasıl seçilir?",
        a: "Tulum bedenleri genellikle boy ve göğüs çevresine göre verilir. Tulum çömelme ve uzanma sırasında gerilmemelidir; iki beden arasında kalıyorsanız büyük bedeni seçin. Beden aralığını ürün sayfasından kontrol edin.",
      },
    ],
    sources: [
      "Kişisel Koruyucu Donanım Tüzüğü (EU) 2016/425",
      "EN 14605 — Sıvı kimyasallara karşı koruyucu giysi: Tip 3 ve Tip 4, PB[3] ve PB[4]",
      "EN ISO 13982-1 — Katı partiküllere karşı koruyucu giysi: Tip 5",
      "EN 13034 — Sınırlı sıvı kimyasal koruması: Tip 6 ve PB[6]",
      "EN 14126 — Enfektif ajanlara karşı koruyucu giysi",
      "EN 1149-5, EN 1073-2 ve EN ISO 13688",
      "FABA ürün kataloğu (ürün kodları, bedenler ve koli içi adetler)",
    ],
    relatedCategorySlugs: [
      "kimyasal-koruyucu-tulum",
      "tek-kullanimlik-tulum",
      "onluk-laboratuvar-onlugu",
      "kolluk-galos-baslik",
    ],
    relatedProductIds: [22, 24, 26, 35],
    ctaText:
      "Kullanacağınız ortamı, tulum tipini, bedenleri ve koli adedini yazın; fiyat ve sevkiyat bilgisini içeren teklifiniz e-postanıza gelir.",
  },

  /* ──────────────────────────────────────────────────────────────────────────
   * 3) KAYNAKÇI ELDİVENİ TİP A / TİP B
   * ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "kaynakci-eldiveni-tip-a-tip-b",
    title: "Kaynakçı Eldiveni Tip A ve Tip B Farkı (EN 12477)",
    metaDescription:
      "Kaynakçı eldiveni Tip A mı, Tip B mi? EN 12477 farkı: MMA ve MIG/MAG için Tip A, TIG kaynağı için Tip B. EN 407 ısı kodunun 6 hanesi ve seçim ipuçları.",
    h1: "Kaynakçı Eldiveni Tip A ve Tip B Farkı (EN 12477)",
    eyebrow: "Kaynak eldiveni standartları",
    summary:
      "EN 12477, kaynakçı eldivenlerini iki tipe ayırır: Tip A daha yüksek ısı ve mekanik koruma, daha düşük el becerisi sunar ve MMA (örtülü elektrot), MIG/MAG gibi sıçramalı kaynak yöntemleri için önerilir. Tip B daha ince ve esnektir; yüksek parmak hassasiyeti gereken TIG (argon) kaynağı için önerilir.",
    cardText:
      "MMA ve MIG/MAG için Tip A, TIG için Tip B. EN 12477 asgari değerleri ve EN 407 ısı kodunun altı hanesi tek sayfada.",
    datePublished: "2026-10-11",
    dateModified: "2026-10-11",
    sections: [
      {
        id: "en-12477-nedir",
        title: "EN 12477 nedir?",
        blocks: [
          {
            type: "p",
            text: "EN 12477, kaynak ve benzeri işlerde kullanılan koruyucu eldivenlerin standardıdır. Bir kaynakçı eldiveninin hem mekanik risklere (EN 388) hem de ısı ve aleve (EN 407) karşı belirli asgari seviyeleri sağlamasını ve el becerisi açısından değerlendirilmesini ister. Yaygın olarak kullanılan sürümü EN 12477:2001+A1:2005'tir.",
          },
          {
            type: "p",
            text: "Standart, eldivenleri koruma ve el becerisi dengesine göre **Tip A** ve **Tip B** olarak ikiye ayırır. Bu ayrım bir kalite sıralaması değildir: Tip A daha fazla koruma ve daha az hassasiyet, Tip B daha fazla hassasiyet ve daha az ısı koruması sunar. Doğru tip, yaptığınız kaynak yöntemine göre seçilir.",
          },
        ],
      },
      {
        id: "tip-a-tip-b-farki",
        title: "Tip A ve Tip B arasındaki fark",
        blocks: [
          {
            type: "table",
            caption: "EN 12477 Tip A ve Tip B karşılaştırması",
            head: ["Özellik", "Tip A", "Tip B"],
            rows: [
              ["Öncelik", "Isı, alev ve sıçrama koruması", "Parmak hassasiyeti ve el becerisi"],
              ["Önerilen kaynak yöntemi", "MMA (örtülü elektrot), MIG/MAG, sıçramalı işler", "TIG (argon) kaynağı"],
              ["Tipik yapı", "Kalın yarma deri, uzun manşet, çoğunlukla astarlı", "İnce deri (ör. keçi derisi), daha az katman"],
              ["Isı ve sıçrama koruması", "Daha yüksek", "Daha düşük"],
              ["El becerisi", "Daha düşük", "Daha yüksek"],
            ],
          },
          { type: "h3", text: "Standarttaki asgari değerler" },
          {
            type: "p",
            text: "EN 12477, her iki tip için EN 388 ve EN 407 testlerinde ulaşılması gereken en düşük seviyeleri tanımlar. Bir eldivenin Tip A veya Tip B olarak işaretlenebilmesi için bu seviyelerin tamamını karşılaması gerekir.",
          },
          {
            type: "table",
            caption: "EN 12477 asgari performans seviyeleri (özet)",
            head: ["Gereklilik", "Tip A", "Tip B"],
            rows: [
              ["Aşınma (EN 388)", "2", "1"],
              ["Kesilme – coupe (EN 388)", "1", "1"],
              ["Yırtılma (EN 388)", "2", "1"],
              ["Delinme (EN 388)", "2", "1"],
              ["Yanma davranışı (EN 407)", "3", "2"],
              ["Temas ısısı (EN 407)", "1", "1"],
              ["Konvektif ısı (EN 407)", "2", "—"],
              ["Küçük erimiş metal sıçramaları (EN 407)", "3", "2"],
              ["El becerisi (parmak hassasiyeti)", "1", "4"],
            ],
            note: "Özet bilgidir; ayrıntılı test koşulları için standardın güncel metnine başvurun. \"—\" bu tip için gereklilik olmadığını gösterir.",
          },
        ],
      },
      {
        id: "en-407-kodu",
        title: "EN 407 ısı kodu nasıl okunur?",
        blocks: [
          {
            type: "p",
            text: "Kaynakçı eldivenlerinde EN 388'in yanında alev simgeli **EN 407** piktogramı ve altı haneli bir kod bulunur. Her hane 0 ile 4 arasında bir seviyedir; X, o özelliğin test edilmediğini gösterir. Kod soldan sağa şu sırayla okunur:",
          },
          {
            type: "table",
            caption: "EN 407 kodunun altı hanesi",
            head: ["Hane", "Özellik", "Ne anlatır?"],
            rows: [
              ["1", "Yanma davranışı", "Alevden uzaklaştırıldıktan sonra malzemenin ne kadar süre yanmaya ve korlanmaya devam ettiği (sınırlı alev yayılımı)."],
              ["2", "Temas ısısı", "Sıcak yüzeyle temasta en az 15 saniye korunan sıcaklık: 1 = 100 °C, 2 = 250 °C, 3 = 350 °C, 4 = 500 °C."],
              ["3", "Konvektif ısı", "Alevin ısısının eldivenden ele geçmesi için geçen süre."],
              ["4", "Radyan ısı", "Isı ışınımı kaynağı karşısında ısının ele geçmesi için geçen süre."],
              ["5", "Küçük erimiş metal sıçramaları", "Elde belirli bir sıcaklık artışı oluşturmak için gereken erimiş metal damlası sayısı."],
              ["6", "Büyük miktarda erimiş metal", "Eldivenin, dökülen erimiş demirin altındaki deri benzeri filme zarar vermeden dayanabildiği miktar."],
            ],
          },
          {
            type: "p",
            text: "EN 407:2020 ile alev testinden geçirilmemiş ya da bu testte seviye alamamış eldivenler için alev simgesi taşımayan ayrı bir ısı piktogramı kullanılmaya başlandı. Kaynakçı eldiveninde ilk hanenin EN 12477 asgarisini karşılaması gerekir: Tip A için en az 3, Tip B için en az 2.",
          },
          {
            type: "dynamic",
            kind: "en407-table",
            caption: "Katalogdaki kaynakçı eldivenlerinin EN 407 kodları",
          },
        ],
      },
      {
        id: "hangi-ise-hangi-eldiven",
        title: "Hangi kaynak işine hangi eldiven?",
        blocks: [
          {
            type: "ul",
            items: [
              "**MMA (örtülü elektrot) kaynağı:** Yoğun sıçrama ve cüruf nedeniyle Tip A. Uzun manşet, ön kolu sıçramaya karşı daha iyi örter.",
              "**MIG/MAG (gazaltı) kaynağı:** Sıçrama ve yüksek ısı nedeniyle Tip A. Yüksek akımlı ve uzun süreli işlerde astarlı, kalın modeller tercih edilir.",
              "**TIG (argon) kaynağı:** Tel besleme ve torç kontrolü parmak hassasiyeti gerektirdiği için Tip B. Sıçrama az olduğundan ince deri eldivenler bu iş için tasarlanır.",
              "**Oksi-gaz kesme ve taşlama:** Sıçrama ve sıcak parça teması nedeniyle genellikle Tip A tercih edilir; taşlamada mekanik dayanım (EN 388) da önemlidir.",
              "**Sürücü ve montaj işleri:** Kaynak dışındaki forklift, malzeme taşıma ve montaj işlerinde EN 12477 gerekmez; ince deri sürücü eldivenleri kavrama ve konfor sağlar.",
            ],
          },
          { type: "h3", text: "Seçerken dikkat edilecekler" },
          {
            type: "ul",
            items: [
              "**Manşet boyu:** Uzun manşetli modeller (ör. 35 veya 40 cm) ön kolu ve tulum kolu geçişini daha iyi örter.",
              "**Dikiş ipliği:** Kaynak eldiveninde ısıya dayanıklı iplik (ör. aramid) önemlidir; yanan dikiş eldiveni açar.",
              "**Beden:** Bol eldiven torç ve elektrot kontrolünü zorlaştırır, çok dar eldiven ise eli yorar. Kaynakçı eldivenleri çoğu zaman sınırlı bedende üretilir; ürün sayfasındaki beden bilgisini kontrol edin.",
              "**Nem ve yağ:** Islak veya yağlı deri ısıyı daha hızlı iletir ve elektriğe karşı direncini kaybeder. Kaynak eldivenini kuru tutun, sertleşmiş veya delinmiş eldiveni değiştirin.",
            ],
          },
          {
            type: "callout",
            tone: "warning",
            title: "Kaynak eldiveni yalıtkan eldiven değildir",
            text: "EN 12477 eldivenleri elektrik çarpmasına karşı yalıtım sağlamak için tasarlanmaz. Elektrik işlerinde bu amaçla belgelenmiş yalıtkan eldiven kullanılmalıdır.",
          },
        ],
      },
      {
        id: "katalogdaki-eldivenler",
        title: "Katalogdaki kaynakçı ve sürücü eldivenleri",
        blocks: [
          {
            type: "p",
            text: "Aşağıdaki tablo ürün sayfalarındaki standart bilgilerinden üretilir. Tip bilgisi olmayan modeller kaynak dışı (sürücü ve montaj) işler içindir. Tüm modelleri [kaynakçı ve sürücü eldivenleri](cat:kaynakci-eldiveni) sayfasında karşılaştırabilirsiniz.",
          },
          {
            type: "dynamic",
            kind: "welding-table",
            caption: "Katalogdaki kaynakçı ve sürücü eldivenleri",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "TIG kaynağında Tip A eldiven kullanılabilir mi?",
        a: "Kullanılabilir, ancak kalın deri tel besleme ve torç kontrolünü zorlaştırır. TIG kaynağında sıçrama az olduğu için çoğu kaynakçı Tip B eldiveni tercih eder. Yüksek akım veya sıcak parçalarla sık temas varsa karar risk değerlendirmesine göre verilmelidir.",
      },
      {
        q: "Kaynak eldiveni elektrik çarpmasına karşı korur mu?",
        a: "Hayır. Kaynakçı eldiveni elektrik yalıtım eldiveni değildir. Kuru deri sınırlı bir direnç sağlar, ıslak veya yağlı deri ise bu direnci kaybeder. Elektrik işleri için bu amaçla belgelenmiş yalıtkan eldiven gerekir.",
      },
      {
        q: "Kaynakçı eldiveni ne zaman değiştirilmelidir?",
        a: "Sabit bir süre yoktur; kullanım yoğunluğuna bağlıdır. Delik, sertleşmiş veya yanmış deri, açılmış dikiş ya da incelmiş avuç görüldüğünde eldiven değiştirilmelidir.",
      },
    ],
    sources: [
      "EN 12477:2001+A1:2005 — Kaynakçılar için koruyucu eldivenler",
      "EN 407:2020 — Isıl risklere (ısı ve/veya ateş) karşı koruyucu eldivenler",
      "EN 388:2016+A1:2018 — Koruyucu eldivenler: mekanik risklere karşı",
      "FABA ürün kataloğu (ürün kodları, bedenler ve koli içi adetler)",
    ],
    relatedCategorySlugs: ["kaynakci-eldiveni", "kesilmeye-direncli-eldiven"],
    relatedProductIds: [15, 16, 20, 19],
    ctaText:
      "Kaynak yöntemini, eldiven modelini ve koli adedini yazın; fiyat ve sevkiyat bilgisini içeren teklifiniz e-postanıza gelir.",
  },

  /* ──────────────────────────────────────────────────────────────────────────
   * 4) BEDEN TABLOSU
   * ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "is-eldiveni-beden-tablosu",
    title: "İş Eldiveni Beden Tablosu: 7–11 Numara Nasıl Seçilir?",
    metaDescription:
      "İş eldiveni bedeni nasıl ölçülür? EN ISO 21420 el çevresi ve el uzunluğu tablosu, 7 = S'den 11 = XXL'ye harf karşılıkları ve karma beden teklifi ipuçları.",
    h1: "İş Eldiveni Beden Tablosu: 7–11 Numara Nasıl Seçilir?",
    eyebrow: "Beden rehberi",
    summary:
      "İş eldiveni bedeni, avuç çevresi ve el uzunluğu ölçülerek seçilir: EN ISO 21420'ye göre yaklaşık 203 mm el çevresi ve 182 mm el uzunluğu 8 numaraya, 229 mm ve 192 mm ise 9 numaraya karşılık gelir. Harf karşılığı genellikle 7 = S, 8 = M, 9 = L, 10 = XL, 11 = XXL'dir; üreticilerin tabloları küçük farklar gösterebilir.",
    cardText:
      "El çevresi ve el uzunluğuyla 7–11 numara tablosu, S–XXL karşılıkları, doğru ölçüm ve karma beden teklifi için pratik ipuçları.",
    datePublished: "2026-10-11",
    dateModified: "2026-10-11",
    sections: [
      {
        id: "beden-tablosu",
        title: "EN ISO 21420 iş eldiveni beden tablosu",
        blocks: [
          {
            type: "p",
            text: "Avrupa'da iş eldivenlerinin beden sistemi, koruyucu eldivenlerin genel gerekliliklerini tanımlayan EN ISO 21420:2020 standardına dayanır (önceki adı EN 420). Standart her beden numarasını bir el çevresi ve el uzunluğu ölçüsüne bağlar. Aşağıdaki değerler yaklaşıktır; iki beden arasında kalıyorsanız sonraki bölümdeki ipuçlarına bakın.",
          },
          {
            type: "table",
            caption: "İş eldiveni beden tablosu (EN ISO 21420)",
            head: ["Beden no", "Harf (yaygın)", "El çevresi (mm)", "El uzunluğu (mm)"],
            rows: [
              ["6", "XS", "152", "160"],
              ["7", "S", "178", "171"],
              ["8", "M", "203", "182"],
              ["9", "L", "229", "192"],
              ["10", "XL", "254", "204"],
              ["11", "XXL", "279", "215"],
            ],
            note: "Harf karşılıkları standarttan değil yaygın kullanımdan gelir ve üreticiye göre küçük farklar gösterebilir. FABA ürün kataloğundaki beden analizi de 7–11 numaraları S–XXL olarak eşler.",
          },
          {
            type: "p",
            text: "Beden numarası aslında el çevresinin yaklaşık inç karşılığıdır: 8 numara yaklaşık 8 inç (20,3 cm), 9 numara 9 inç (22,9 cm), 10 numara 10 inç (25,4 cm) el çevresine denk gelir. Bu kural, tablo elinizde olmadığında hızlı bir kontrol sağlar.",
          },
        ],
      },
      {
        id: "nasil-olculur",
        title: "Eliniz nasıl ölçülür?",
        blocks: [
          {
            type: "ol",
            items: [
              "Bir mezura (terzi metresi) alın ve ölçümü sık kullandığınız elden yapın. Mezura yoksa bir kâğıt şeridi elinize sarıp işaretleyin, sonra cetvelle ölçün.",
              "**El çevresi:** Mezurayı avucun en geniş yerinden, başparmağı dışarıda bırakarak parmak eklemlerinin hemen altından sarın. Elinizi düz, parmaklarınızı bitişik tutun.",
              "**El uzunluğu:** Bilek çizgisinden (avuç içiyle bileğin birleştiği kıvrım) orta parmağın ucuna kadar ölçün.",
              "Ölçüleri tabloyla karşılaştırın. Çoğu üretici el çevresini esas alır; el uzunluğu, iki beden arasında kaldığınızda karar vermeye yardımcı olur.",
            ],
          },
          { type: "h3", text: "Ölçümde sık yapılan hatalar" },
          {
            type: "ul",
            items: [
              "**Başparmağı ölçüme katmak:** El çevresi başparmak dışarıda bırakılarak ölçülür. Başparmak dahil edilirse sonuç bir beden büyük çıkar.",
              "**Eli yumruk yapmak:** El gergin ya da kapalıyken çevre büyür. Ölçümü elinizi düz ve rahat tutarak yapın.",
              "**Tek kişiye göre karar vermek:** Ekip için alım yapıyorsanız birkaç farklı çalışandan ölçü alın; tek bir kişinin bedeni bütün ekibi temsil etmez.",
            ],
          },
        ],
      },
      {
        id: "dogru-beden",
        title: "Doğru beden neden önemli?",
        blocks: [
          {
            type: "p",
            text: "Büyük eldivende parmak uçları boşta kalır: küçük parçaları kavramak zorlaşır, boşta kalan kumaş dönen parçalara takılabilir ve kaplama avuçta doğru yere oturmaz. Küçük eldiven ise eli sıkar, kısa sürede yorgunluk yapar ve örgüyü gerdiği için daha çabuk yırtılır. İki durumda da çalışanlar eldiveni çıkarma eğilimindedir; giyilmeyen eldiven ise koruma sağlamaz.",
          },
          {
            type: "p",
            text: "Kesilmeye dirençli ve kaynakçı eldivenlerinde uyum ayrıca önemlidir. Bol eldivende kesilmeye dirençli örgü parmak arasında katlanır; kaynakçı eldiveninde ise torç ve elektrot kontrolü zorlaşır.",
          },
          { type: "h3", text: "İki beden arasında kalırsanız" },
          {
            type: "ul",
            items: [
              "Örme nitril ve köpük nitril eldivenler esner; hassas montaj işlerinde küçük bedeni deneyin.",
              "Kalın deri ve astarlı eldivenler pek esnemez; içine iç eldiven giyilecekse büyük bedeni seçin.",
              "Uzun vardiyalarda eller şişebilir; eldiven gün boyu giyilecekse rahatlığa öncelik verin.",
            ],
          },
        ],
      },
      {
        id: "katalog-bedenleri",
        title: "Katalogdaki eldivenlerde beden seçenekleri",
        blocks: [
          {
            type: "p",
            text: "Her model her bedende üretilmez. Ürünlerin hangi bedenlerde sunulduğunu ve koli içi adetlerini aşağıdaki tablodan kontrol edin.",
          },
          {
            type: "dynamic",
            kind: "glove-sizes",
            caption: "Katalogdaki eldivenlerin bedenleri ve koli içi adetleri",
          },
        ],
      },
      {
        id: "karma-beden-teklifi",
        title: "Karma beden sipariş ve teklif ipuçları",
        blocks: [
          {
            type: "p",
            text: "Bir işletmede çalışanların elleri farklıdır. Tek bedende toplu alım, ekibin bir kısmının yanlış eldivenle çalışması demektir. Teklif isterken bedenleri ayrı satırlar halinde yazmak hem fiyatlamayı hem de sevkiyatı netleştirir.",
          },
          {
            type: "ul",
            items: [
              "**Ekibinizin beden dağılımını çıkarın.** Kısa bir ölçüm yapın veya mevcut tüketiminizden yola çıkın.",
              "**Her bedeni ayrı satır olarak yazın.** Örneğin \"9 numara: 2 koli, 10 numara: 1 koli\" gibi. Koli içeriği üreticinin paketlemesine bağlıdır; karma ihtiyacınızın koli bazında nasıl karşılanacağı teklifte netleşir.",
              "**Miktarı koli katlarıyla hesaplayın.** Örneğin [$code](product:1) için {{koli:1:3}} eder. Koli içi adetle düşünmek, fazla ya da eksik sipariş vermeden planlama yapmanızı sağlar.",
              "**Önce deneyin.** Yeni bir modele geçerken ilk siparişte ihtiyaç duyduğunuz bedenlerden birer koli alıp ekibinizle denemek, büyük alımdan önce beden dağılımını doğrular.",
              "**Tüketimi izleyin.** Eldivenler iş yoğunluğuna göre farklı hızda tükenir; en çok kullanılan bedenlerin ne sıklıkla bittiğini takip edin.",
            ],
          },
          {
            type: "dynamic",
            kind: "size-mixer",
            caption: "Beden bazında teklif listesi oluşturun",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Daha küçük eller için hangi beden uygundur?",
        a: "Beden cinsiyete göre değil el ölçüsüne göre seçilir. Daha küçük eller için 7 numaranın (varsa 6 numaranın) ölçülerini tabloyla karşılaştırın ve modelin bu bedende üretilip üretilmediğini ürün sayfasından kontrol edin.",
      },
      {
        q: "Eldiven bedeni markadan markaya değişir mi?",
        a: "Numaralı beden sistemi aynı el ölçülerine dayanır. Ancak kalıp, örgü sıklığı ve kaplama kalınlığı farklı olduğu için iki markanın aynı bedeni elde farklı hissettirebilir. Model değiştirirken önce az miktarla deneyin.",
      },
      {
        q: "Teklif talebinde bedeni nasıl belirtirim?",
        a: "Her bedeni ayrı satır olarak yazın (ör. \"9 numara: 2 koli\"). Bu sayfadaki beden aracıyla seçtiğiniz eldivenin beden satırlarını tek seferde teklif listesine ekleyebilirsiniz.",
      },
    ],
    sources: [
      "EN ISO 21420:2020 — Koruyucu eldivenler: genel gereklilikler ve deney yöntemleri",
      "FABA ürün kataloğu (beden analizi, ürün kodları ve koli içi adetler)",
    ],
    relatedCategorySlugs: [
      "nitril-kapli-is-eldiveni",
      "kopuk-nitril-eldiven",
      "kesilmeye-direncli-eldiven",
      "kaynakci-eldiveni",
    ],
    relatedProductIds: [1, 7, 12, 19],
    ctaText:
      "Eldiven modelini, beden dağılımını ve koli adedini yazın; fiyat ve sevkiyat bilgisini içeren teklifiniz e-postanıza gelir.",
  },
];

/* ────────────────────────────────────────────────────────────────────────────
 * ERİŞİM YARDIMCILARI
 * ──────────────────────────────────────────────────────────────────────────── */

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** "/rehber/<slug>" */
export function guideHref(slug: string): string {
  return `/rehber/${slug}`;
}

/** Satır içi işaretleri temizler (kelime sayımı / düz metin için). */
export function stripGuideMarkup(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function blockText(b: GuideBlock): string[] {
  switch (b.type) {
    case "p":
    case "h3":
      return [b.text];
    case "ul":
    case "ol":
      return b.items;
    case "table":
      return [b.caption, ...b.head, ...b.rows.flat(), b.note ?? ""];
    case "callout":
      return [b.title ?? "", b.text];
    case "dynamic":
      return [b.caption ?? "", b.note ?? ""];
  }
}

/** Rehberin elle yazılmış metni (ürün verisinden üretilen tablolar hariç). */
export function guidePlainText(g: Guide): string {
  const parts: string[] = [g.h1, g.summary];
  for (const s of g.sections) {
    parts.push(s.title);
    for (const b of s.blocks) parts.push(...blockText(b));
  }
  for (const f of g.faqs) parts.push(f.q, f.a);
  return parts.map(stripGuideMarkup).filter(Boolean).join(" ");
}

export function guideWordCount(g: Guide): number {
  return guidePlainText(g).split(/\s+/).filter((w) => /[0-9A-Za-zÇĞİÖŞÜçğıöşüÂâÎîÛû]/.test(w)).length;
}

/** Tahmini okuma süresi (dakika). Türkçe teknik metin için ~180 kelime/dk. */
export function guideReadingMinutes(g: Guide): number {
  return Math.max(1, Math.round(guideWordCount(g) / 180));
}
