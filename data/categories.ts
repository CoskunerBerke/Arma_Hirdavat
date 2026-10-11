/* ────────────────────────────────────────────────────────────────────────────
 * KATEGORİ SAYFALARI — /kategori/<slug>
 *
 * Her CategoryName için tek kayıt. Başlık / açıklama / H1 alıcıların arama diliyle yazıldı
 * (bkz. anahtar kelime araştırması KW-01) ve ürün verisiyle uyumludur.
 *
 * KURALLAR
 * - seoTitle marka eki İÇERMEZ: layout şablonu " | Arma Hırdavat" (16 karakter) ekler.
 *   Toplam ≤ 60 karakter için seoTitle ≤ 44 karakter olmalı.
 * - metaDescription 140–155 karakter.
 * - Her iddia ürün verisiyle doğrulanabilir olmalı (kod, beden, koli içi adet, EN/Tip normu).
 *   Kesilmeye dirençli eldivenler için FABA kataloğu kesilme seviyesi C (EN ISO 13997) belirtir.
 *   Veride bedeni olmayan ürünler (ör. TruCut, Zevahir Tip A) için beden yazmayın.
 * - slug değişirse dışarıdaki bağlantılar kırılır; yayından sonra değiştirmeyin.
 * - intro: 150–250 kelime; paragraflar boş satırla ("\n\n") ayrılır. Ürün verisi değişirse
 *   (kod, EN kodu, koli içi adet) buradaki metni de güncelleyin.
 * - faqs: sayfada görünür olarak listelenir ve FAQPage JSON-LD'si birebir bu metinlerden üretilir.
 *   Süre / sevkiyat sözü yazmayın (bunlar yalnızca data/company.ts → PROMISES'tan gelir).
 * ──────────────────────────────────────────────────────────────────────────── */

import type { CategoryName } from "./products";

export interface CategoryFaq {
  q: string;
  a: string;
}

export interface CategoryPage {
  /** products.ts içindeki CategoryName ile birebir aynı (görünen kategori adı). */
  name: CategoryName;
  /** URL parçası: /kategori/<slug> */
  slug: string;
  /** Dar alanlar (çip, menü) için kısa ad. */
  shortName: string;
  /** <title> (marka eki hariç, ≤ 44 karakter). */
  seoTitle: string;
  /** Meta description (140–155 karakter). */
  metaDescription: string;
  /** Sayfanın tek H1 başlığı. */
  h1: string;
  /** 150–250 kelimelik giriş metni; paragraflar "\n\n" ile ayrılır (boşsa gösterilmez). */
  intro: string;
  /** Gerçek alıcı sorularına dürüst yanıtlar. */
  faqs: CategoryFaq[];
}

export const CATEGORY_PAGES: CategoryPage[] = [
  {
    name: "Nitril Kaplı İş Eldivenleri",
    slug: "nitril-kapli-is-eldiveni",
    shortName: "Nitril Kaplı",
    seoTitle: "Nitril Kaplı İş Eldiveni Toptan (FABA EP)",
    metaDescription:
      "FABA EP serisi nitril kaplı iş eldivenleri: parmak ucu, 3/4 ve tam kaplama, EN 388 3121A ve 4131A, beden 7–11, koli içi 192–252 çift. Toptan teklif alın.",
    h1: "Nitril Kaplı İş Eldivenleri (FABA EP Serisi)",
    intro:
      "Nitril kaplı iş eldiveni, örme bir astarın avuç içi ve parmaklarına ya da elin tamamına nitril kaplanmasıyla üretilir. Kaplama yağlı ve gresli parçalarda tutuşu korur, örme astar ise elin rahat hareket etmesini sağlar. Halk arasında işçi eldiveni denen ürünlerin en yaygın türüdür.\n\n" +
      "Bu kategoride FABA EP serisinden 6 model var ve hepsi polyester örme astarlıdır. EP-1301, EP-1302 ve EP-1303 mavi nitril kaplıdır, EN 388 3121A sınıfındadır ve kolide 252 çift bulunur. EP-1401, EP-1402 ve EP-1403 daha kalın astarlıdır; EN 388 4131A koduyla aşınma direnci 4, yırtılma direnci 3 seviyesindedir ve kolide 192 çift bulunur. Her iki seride de üç kaplama tipi vardır: parmak ucu kaplama (avuç içi ve parmaklar), 3/4 kaplama (el sırtının bir bölümü açık kalır) ve el sırtı dahil tam kaplama. Tüm modeller EN 407 X1XXXX (temas ısısına karşı seviye 1) ve EN ISO 21420 belgelidir; bedenler 7 ile 11 arasındadır.\n\n" +
      "FABA kataloğu bu eldivenleri altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri için önerir. Kesilme direnci seviye 1 olduğundan sac, cam veya bıçakla çalışılan işlerde kesilmeye dirençli eldivenlere bakın. Aşağıdaki tabloda modelleri yan yana karşılaştırabilir, beden ve koli adediyle ücretsiz teklif isteyebilirsiniz.",
    faqs: [
      {
        q: "EP-1301 ile EP-1401 arasındaki fark nedir?",
        a: "İkisi de polyester örme astarlı ve parmak ucu nitril kaplıdır. EP-1401'in astarı daha kalındır ve EN 388 kodu 4131A'dır: aşınma direnci 4, yırtılma direnci 3. EP-1301'in kodu 3121A'dır: aşınma 3, yırtılma 2. EP-1301 kolisinde 252 çift, EP-1401 kolisinde 192 çift bulunur. Aynı fark 3/4 kaplamada EP-1302 ile EP-1402, tam kaplamada EP-1303 ile EP-1403 arasında da geçerlidir.",
      },
      {
        q: "Parmak ucu, 3/4 ve tam kaplama arasında nasıl seçim yaparım?",
        a: "Parmak ucu kaplamada yalnızca avuç içi ve parmaklar kaplıdır, el sırtındaki örgü açık kalır. 3/4 kaplamada el sırtının da büyük bölümü kaplanır; tam kaplamada el sırtı dahil tüm el yüzeyi nitrildir. Elin yağ, gres veya sıvıyla temas eden yüzeyi büyüdükçe daha geniş kaplamayı seçin. Aynı seride üç kaplama tipinin EN 388 değerleri aynıdır.",
      },
      {
        q: "Nitril kaplı eldivenler kesilmeye karşı korur mu?",
        a: "Sınırlı olarak. Bu kategorideki tüm modellerde EN 388 kodunun ikinci rakamı (Coupe kesilme testi) 1, son harfi (EN ISO 13997 kesilme testi) A'dır; yani kesilme direnci düşük seviyededir. Sac, cam veya bıçakla çalışılan işlerde kesilme seviyesi C olan FABA TruCut eldivenleri tercih edin.",
      },
      {
        q: "Bir kolide kaç çift var, farklı bedenleri birlikte isteyebilir miyim?",
        a: "EP-1301, EP-1302 ve EP-1303 kolisinde 252 çift; EP-1401, EP-1402 ve EP-1403 kolisinde 192 çift bulunur. Ürün sayfasındaki teklif kutusunda her beden için ayrı koli adedi girebilirsiniz; her beden teklif listenize ayrı satır olarak eklenir.",
      },
    ],
  },
  {
    name: "Köpük Nitril Eldivenler",
    slug: "kopuk-nitril-eldiven",
    shortName: "Köpük Nitril",
    seoTitle: "Köpük Nitril Eldiven Toptan (FABA TruFlex)",
    metaDescription:
      "FABA TruFlex köpük nitril eldiven: 15 gauge naylon örgü, parmak ucu, 3/4 ve tam kaplama, EN 388 3131A, beden 7–11, koli içi 252 çift. Toptan teklif alın.",
    h1: "Köpük Nitril Eldivenler (FABA TruFlex)",
    intro:
      "Köpük nitril eldivende kaplama gözenekli (köpük) yapıdadır. FABA kataloğuna göre bu yapı nefes alabilirliği artırır, el yorgunluğunu ve eldiven içindeki yoğunlaşmayı azaltır. İnce örgüyle birleşince küçük parçaları parmak uçlarıyla hissederek tutmak kolaylaşır; bu yüzden hassas montaj ve el becerisi gerektiren işlerde tercih edilir.\n\n" +
      "Bu kategoride FABA TruFlex serisinden 5 model bulunur. Hepsinin astarı 15 gauge naylon örgüdür ve hepsi EN 388 3131A (aşınma 3, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A) ile EN 407 X1XXXX sınıfındadır. EN-1501, EN-1502 ve EN-1503 siyah örgülüdür; sırasıyla parmak ucu, 3/4 ve tam kaplama seçenekleridir. EN-1511 ve EN-1512 turuncu örgü üzerine siyah köpük nitril kaplıdır; parmak ucu ve 3/4 kaplama olarak sunulur. Örgü bilek, eldivenin kullanım sırasında elden çıkmasını önler. Tüm modeller 7–11 bedenlerindedir ve kolide 252 çift bulunur.\n\n" +
      "FABA kataloğunda önerilen kullanım alanları küçük parça montajı, elektronik ve yarı iletken üretimi, otomotiv, ambalaj, tarım ve meyve toplama, bakım ve genel işlerdir. Yağ ve grese dayanıklı kaplama ya da daha yüksek aşınma direnci gerekiyorsa nitril kaplı EP serisini inceleyin. Modelleri aşağıdaki tabloda karşılaştırıp beden ve koli adediyle ücretsiz teklif isteyebilirsiniz.",
    faqs: [
      {
        q: "Köpük nitril ile nitril kaplı eldiven arasındaki fark nedir?",
        a: "TruFlex eldivenlerde kaplama gözenekli köpük nitrildir ve astar 15 gauge ince naylon örgüdür; FABA kataloğu bu yapının nefes alabilirliği artırdığını ve el yorgunluğunu azalttığını belirtir. Parmak hassasiyeti öne çıkar. EP serisindeki nitril kaplama ise polyester örme astar üzerindedir ve yağa, grese dayanıklılığı öne çıkar. Yağlı parçalarla çalışıyorsanız EP serisi, küçük parça montajında TruFlex daha uygundur.",
      },
      {
        q: "EN 388 3131A ne anlama geliyor?",
        a: "Beş TruFlex modelinin hepsi EN 388 3131A sınıfındadır: aşınma direnci 3, kesilme direnci (Coupe testi) 1, yırtılma direnci 3, delinme direnci 1 ve EN ISO 13997 kesilme testinde A. Kesilme direnci düşük olduğundan keskin kenarlı parçalarla çalışılan işler için kesilmeye dirençli eldiven seçin.",
      },
      {
        q: "Siyah ve turuncu modeller arasında teknik fark var mı?",
        a: "Hayır. Siyah (EN-1501, EN-1502, EN-1503) ve turuncu örgülü (EN-1511, EN-1512) modellerin EN 388 ve EN 407 değerleri, örgü tipi, bedenleri ve koli içi adedi aynıdır. Fark renk ve kaplama seçeneğindedir: turuncu seride tam kaplama modeli yoktur.",
      },
      {
        q: "Köpük nitril eldiven gıda işlemede kullanılabilir mi?",
        a: "FABA kataloğu kullanım alanları arasında gıda işlemeyi de sayar. Ancak ürün verimizde gıdayla temasa uygunluk beyanı yer almıyor. Eldiven doğrudan gıdaya temas edecekse teklif talebinizde bu belgeyi isteyin; temin edebileceğimiz belgeleri teklifle birlikte bildiririz.",
      },
    ],
  },
  {
    name: "Kesilmeye Dirençli Eldivenler",
    slug: "kesilmeye-direncli-eldiven",
    shortName: "Kesilmeye Dirençli",
    seoTitle: "Kesilmeye Dirençli Eldiven (FABA TruCut)",
    metaDescription:
      "FABA TruCut kesilmeye dirençli eldivenler: kaplamasız ve nitril kaplı modeller, EN 388 4X41C ve 4X43C, kesilme seviyesi C, koli içi 72 çift. Teklif alın.",
    h1: "Kesilmeye Dirençli İş Eldivenleri (FABA TruCut)",
    intro:
      "Kesilmeye dirençli eldivenler, halk arasındaki adıyla kesilmez eldivenler, sac, cam, metal parça ve bıçakla çalışılan işlerde kesilme yaralanması riskini azaltmak için kullanılır. Hiçbir eldiven tamamen kesilmez değildir; doğru seçim için EN 388 kodundaki kesilme değerlerine bakılır.\n\n" +
      "Bu kategoride FABA TruCut serisinden 3 model var. Üçü de EN ISO 13997 (TDM) testine göre kesilme koruma sınıfı C'dir ve KKD Kategori II'dedir. EK-5000 kaplamasız örme bir eldivendir; EN 388 4X41C sınıfındadır. Hafif ve makinede yıkanabilir yapısıyla dokunma hissinin önemli olduğu işlere uygundur. EK-5610 ve EK-5620'nin astarı dikişsiz HPPE, spandeks, çelik tel ve naylon karışımıdır. Nitril kaplama tutuşu ve kullanım ömrünü artırır, ıslak yüzeylerde eli korur. EK-5610 parmak ucu, EK-5620 3/4 kaplamalıdır; ikisi de EN 388 4X43C sınıfındadır, yani delinme direnci 3'tür. Koddaki X, Coupe (dönen bıçak) testinin uygulanmadığını gösterir; kesilme performansı için TDM sonucu olan C harfi esas alınır.\n\n" +
      "Tüm modellerde koli içi 72 çifttir; beden seçenekleri teklif aşamasında teyit edilir. FABA kataloğu bu eldivenleri beton, metal ve cam fabrikaları, otomotiv ve havacılık, inşaat, metal imalat ve metal damgalama, depo, bahçe işleri, gıda kesme ve ahşap oymacılığı için önerir.",
    faqs: [
      {
        q: "Kesilme seviyesi C ne anlama gelir?",
        a: "EN 388:2016 standardında kesilme direnci EN ISO 13997 (TDM) testiyle de ölçülür ve sonuç A'dan F'ye bir harfle gösterilir; F en yüksektir. C sınıfı, eldivenin bu testte en az 10 Newton kesme kuvvetine dayandığını gösterir. TruCut eldivenlerin üçü de C sınıfındadır.",
      },
      {
        q: "EN 388 4X43C kodundaki X ne demek?",
        a: "X, ilgili testin uygulanmadığını gösterir. TruCut eldivenlerde ikinci basamak, yani Coupe (dönen bıçak) kesilme testi X'tir. Kesilmeye dirençli liflerde bu test sırasında bıçak körelebildiği için EN 388:2016 bu durumda kesilme performansı olarak TDM sonucunu, yani son harfi (C) esas alır.",
      },
      {
        q: "Kaplamasız EK-5000 mi, nitril kaplı EK-5610 mu?",
        a: "EK-5000 kaplamasız örme yapısıyla dokunma hissini öne çıkarır, hafiftir ve makinede yıkanabilir. EK-5610 (parmak ucu) ve EK-5620 (3/4) nitril kaplıdır; kaplama tutuşu ve kullanım ömrünü artırır, ıslak yüzeylerde eli korur. Delinme direnci de kaplamalı modellerde 3, EK-5000'de 1'dir. Yağlı veya ıslak parça tutuluyorsa kaplamalı modeli seçin.",
      },
      {
        q: "Kesilmez eldiven tamamen güvenli midir?",
        a: "Hayır, hiçbir eldiven kesilmeyi tamamen önlemez; kesilmeye dirençli eldiven riski azaltır. Çalışılan malzemenin keskinliğine ve iş yapısına göre seviyeyi risk değerlendirmenizle belirleyin. Dönen bıçak ve testere gibi hareketli kesici ekipmanlarda eldiven, makine koruyucularının yerini tutmaz.",
      },
      {
        q: "TruCut eldivenlerin beden seçenekleri neler?",
        a: "TruCut eldivenlerin beden bilgisi ürün verimizde yer almadığı için bedenleri teklif aşamasında teyit ediyoruz. İhtiyaç duyduğunuz bedenleri teklif formundaki not alanına yazın. Her kolide 72 çift bulunur.",
      },
    ],
  },
  {
    name: "Kaynakçı ve Sürücü Eldivenleri",
    slug: "kaynakci-eldiveni",
    shortName: "Kaynakçı ve Sürücü",
    seoTitle: "Kaynakçı ve Argon Eldiveni (FABA Zevahir)",
    metaDescription:
      "FABA Zevahir deri kaynakçı eldivenleri: EN 12477 Tip A (35 ve 40 cm), TIG argon kaynağı için Tip B ve keçi derisi sürücü eldiveni. Toptan teklif alın.",
    h1: "Kaynakçı, Argon ve Deri Sürücü Eldivenleri",
    intro:
      "Kaynakçı eldiveni seçerken temel ölçüt EN 12477 standardıdır. Tip A eldivenler ısıya ve erimiş metal sıçramasına karşı daha yüksek dayanım sunar; elektrot ve gazaltı (MIG/MAG) kaynağı gibi işler içindir. Tip B eldivenler daha yüksek el becerisi sağlar ve parmak hassasiyeti gerektiren TIG (argon) kaynağında tercih edilir.\n\n" +
      "Bu kategoride FABA Zevahir serisinden 7 model bulunur. D200-35 ve D200-40, 1,2–1,4 mm kalınlıkta yarma sığır derisinden üretilmiş, kot ve pamuk astarlı, ısıya dayanıklı Kevlar iplikle dikilmiş Tip A eldivenlerdir; aralarındaki fark konç uzunluğudur (35 veya 40 cm). D300-35 ve D300-40 aynı yapıya ek olarak başparmak takviyesi taşır. Bu dört modelin hepsi EN 407 413X4X ve EN 388 4244B sınıfındadır; kolide 36 çift bulunur.\n\n" +
      "D-100 ve D-101 argon (TIG) kaynak eldivenleridir: EN 12477 Tip B, el kısmı cilt keçi derisi, manşet uzun yarma inek derisi, dikişler para-aramid iplik. Toplam uzunlukları 35 cm'dir (beden 10) ve EN 407 41214X sınıfındadır; D-101'in bileği elastiktir.\n\n" +
      "D-105 ise kaynakçı eldiveni değil, keçi derisinden bir sürücü eldivenidir: EN 388 2111X, büzgülü elastik bilek, Krom VI içermez. Malzeme taşıma, genel bakım, depolama ve inşaat gibi dokunma hissi gereken işler içindir. D-100, D-101 ve D-105'te koli içi 72 çifttir.",
    faqs: [
      {
        q: "Tip A ve Tip B kaynakçı eldiveni arasındaki fark nedir?",
        a: "EN 12477'ye göre Tip A eldivenler ısıya ve erimiş metal sıçramasına karşı daha yüksek dayanım sunar, Tip B eldivenler ise daha yüksek el becerisi sağlar. Elektrot ve gazaltı (MIG/MAG) kaynağında Zevahir D200 ve D300 serisi (Tip A), TIG (argon) kaynağında D-100 ve D-101 (Tip B) tercih edilir.",
      },
      {
        q: "35 cm mi, 40 cm mi seçmeliyim?",
        a: "Konç bileği ve ön kolun alt kısmını sıçrayan metal eriyiğine karşı korur. 40 cm modeller (D200-40, D300-40) kolun daha büyük bir bölümünü örter; sıçramanın yoğun olduğu ve ayrıca kaynak kolluğu kullanılmayan işlerde tercih edilebilir. EN 12477, EN 407 ve EN 388 değerleri 35 cm modellerle aynıdır.",
      },
      {
        q: "D200 ile D300 serisi arasındaki fark nedir?",
        a: "İki seri de 1,2–1,4 mm yarma sığır derisinden, kot ve pamuk astarlı ve Kevlar iplikle dikilmiştir; ikisinde de avuç içi takviyesi vardır. D300 serisinde buna ek olarak başparmak da takviyelidir. Standart değerleri aynıdır: EN 12477 Tip A, EN 407 413X4X, EN 388 4244B.",
      },
      {
        q: "D-105 sürücü eldiveni kaynakta kullanılabilir mi?",
        a: "D-105 bir kaynakçı eldiveni değildir; EN 12477 ve EN 407 belgesi yoktur, EN 388 sınıfı 2111X'tir. FABA kataloğu bu eldiveni kaynak ve dökümhanede yalnızca hafif işler için önerir. Kaynak yaparken Tip A veya Tip B kaynakçı eldiveni kullanın.",
      },
      {
        q: "Beden ve koli içi adet nedir?",
        a: "D-100 ve D-101 argon eldivenleri beden 10'dur (toplam uzunluk 35 cm). Diğer modellerin beden seçenekleri teklif aşamasında teyit edilir. Koli içi adet Tip A modellerde (D200, D300) 36 çift; D-100, D-101 ve D-105'te 72 çifttir.",
      },
    ],
  },
  {
    name: "Kimyasal Koruyucu Tulumlar",
    slug: "kimyasal-koruyucu-tulum",
    shortName: "Kimyasal Tulum",
    seoTitle: "Kimyasal Koruyucu Tulum Tip 3B/4B/5B/6B",
    metaDescription:
      "FABA TruChem kimyasal koruyucu tulumlar: T-800 Tip 3B/4B/5B/6B, T-630 Tip 4B/5B/6B, EN 14126, antistatik EN 1149-5, S–4XL. Koli bazında toptan teklif alın.",
    h1: "Kimyasal Koruyucu Tulumlar (Tip 3B, 4B, 5B, 6B)",
    intro:
      "Kimyasal koruyucu tulumlar koruma tipine göre sınıflandırılır: Tip 3 basınçlı sıvı jetine, Tip 4 sıvı spreyine, Tip 5 tehlikeli kuru partiküllere, Tip 6 ise hafif sıvı sıçramasına karşıdır. Tip numarasının yanındaki B eki, kumaşın EN 14126'ya göre enfektif (biyolojik) ajanlara karşı da test edildiğini gösterir.\n\n" +
      "Bu kategoride FABA TruChem serisinden 4 tulum var. Hepsi KKD Kategori III'tedir; EN 14126, EN 1149-5 (antistatik) ve EN 1073-2 (radyoaktif partikül kontaminasyonu) belgelidir. T-800 tamamen sıvı geçirmez, sarı renkli bir Tip 3B/4B/5B/6B tulumdur. Dış bariyer film ve PP spunbond nonwoven kumaştan üretilir; kumaşı ve dikişleri kimyasal geçirmez bantla kapatılmıştır, başlığı solunum cihazı kullanımına uygundur. Kolide 20 adet bulunur. T-630 ise 63 gr/m² nefes alabilir mikro gözenekli PE film lamine kumaştan, tüm dikişleri bantlı bir Tip 4B/5B/6B tulumdur; kolide 48 adet bulunur. T-800-G ve T-630-G aynı tulumların kendinden çoraplı modelleridir. Tüm modeller S–4XL bedenlerindedir.\n\n" +
      "FABA kataloğu T-800'ü kimyasal taşıma, dekontaminasyon, tank temizliği, petrokimya, petrol rafinerileri ve duruş bakımları için; T-630'u ilaç üretimi, tıbbi uygulamalar, laboratuvarlar, nükleer tesisler ve genel bakım işleri için önerir. Belirli bir kimyasala karşı dayanım üründen ürüne değişir; kullandığınız kimyasalı teklif talebinize yazın, uygunluğu teklif aşamasında teknik föyden birlikte kontrol edelim.",
    faqs: [
      {
        q: "Tip 3B, 4B, 5B ve 6B ne anlama gelir?",
        a: "Tip 3 basınçlı sıvı jetine (EN 14605), Tip 4 sıvı spreyine (EN 14605), Tip 5 havada asılı tehlikeli kuru partiküllere (EN ISO 13982-1), Tip 6 hafif sıvı sıçramasına (EN 13034) karşı korumayı gösterir. B eki, kumaşın EN 14126'ya göre enfektif ajanlara karşı da test edildiğini belirtir.",
      },
      {
        q: "T-800 mü, T-630 mu seçmeliyim?",
        a: "Basınçlı sıvı jeti riski varsa Tip 3 gerekir ve bu kategoride yalnızca T-800 (ve çoraplı T-800-G) Tip 3B sınıfındadır; tamamen sıvı geçirmezdir, kumaşı ve dikişleri bantlıdır. Risk sprey, partikül veya hafif sıçramayla sınırlıysa Tip 4B/5B/6B sınıfındaki, nefes alabilir kumaşlı T-630 yeterli olabilir. Kesin seçim kullanılan kimyasala ve risk değerlendirmenize göre yapılmalıdır.",
      },
      {
        q: "Çoraplı (-G) modelin farkı nedir?",
        a: "T-800-G ve T-630-G'de ayak koruması tulumla bütündür. Kumaş, dikiş yapısı ve standartlar çorapsız modelle (T-800, T-630) aynıdır; koli içi adetler de aynıdır (T-800-G 20, T-630-G 48 adet).",
      },
      {
        q: "Tulumun belirli bir kimyasala dayanıklı olup olmadığını nasıl anlarım?",
        a: "Tip sınıfı, tulumun hangi maruziyet biçimine (jet, sprey, partikül, sıçrama) karşı test edildiğini gösterir; her kimyasala karşı aynı dayanımı garanti etmez. Kullandığınız kimyasalın adını ve konsantrasyonunu teklif formuna yazın; dayanımı teklif aşamasında üreticinin teknik föyünden birlikte doğrulayalım.",
      },
      {
        q: "EN 1149-5 ve EN 1073-2 ne işe yarar?",
        a: "EN 1149-5, kumaşın elektrostatik yük birikimini azalttığını (antistatik) gösterir. EN 1073-2, radyoaktif partikül kontaminasyonuna karşı korumayı belirtir; radyasyonun kendisine karşı koruma sağlamaz. Bu kategorideki dört TruChem tulum da iki belgeye sahiptir.",
      },
    ],
  },
  {
    name: "Tek Kullanımlık Tulumlar",
    slug: "tek-kullanimlik-tulum",
    shortName: "Tek Kullanımlık Tulum",
    seoTitle: "Tek Kullanımlık Tulum: Lamineli ve SMS",
    metaDescription:
      "FABA T-535, T-530, T-500 SMS ve T-300 tek kullanımlık tulumlar: lamineli ve SMS modellerde Tip 5/6, 30–55 gr/m², koli içi 40–60 adet. Toptan teklif alın.",
    h1: "Tek Kullanımlık Tulumlar: Lamineli, SMS ve Ekonomik",
    intro:
      "Tek kullanımlık tulumlar toz, lif ve hafif sıvı sıçramasına karşı vücudu ve iş kıyafetini korur; iş bitince atılır. Seçimde kumaş tipi (lamineli, SMS veya SS) ve koruma tipi (Tip 5: tehlikeli kuru partikül, Tip 6: hafif sıvı sıçraması) belirleyicidir.\n\n" +
      "Bu kategoride 4 FABA tulum bulunur. T-535 ve T-530, 55 gr/m² nefes alabilir mikro gözenekli PE film lamine kumaştan üretilir; tüm dikişleri bantlı, kasık bölgesi takviyelidir. T-535, Tip 5/6 ve EN 1149-5 (antistatik) belgelidir. T-530 ise Tip 5B/6B sınıfındadır: EN 14126 ile biyolojik ajanlara karşı da test edilmiştir, ayrıca EN 1149-5 ve EN 1073-2 belgelidir. T-500, 50 gr/m² SMS (spunbond-meltblown-spunbond PP) kumaştan, hava geçirgenliği yüksek bir Tip 5/6 tulumdur; mavi ve beyaz renkte bulunur. Bu üç model KKD Kategori III'tedir. T-300 ise 30 gr SS kumaştan hafif bir tulumdur ve yalnızca tehlikeli olmayan, minimum riskli işler içindir; toz veya sıvı sıçraması koruması gerekiyorsa T-500 ya da T-530 seçilmelidir.\n\n" +
      "Tüm modeller S–3XL bedenlerindedir. Koli içi adet T-535 ve T-530'da 48, T-500'de 40, T-300'de 60'tır. FABA kataloğu lamineli modelleri ilaç üretimi, tıbbi uygulamalar ve laboratuvarlar için; T-500'ü asbest ve kurşun azaltma, kömür tozu, kuru gübre ve tarım ilacı uygulaması, endüstriyel temizlik ve makine bakımı için önerir.",
    faqs: [
      {
        q: "Lamineli ve SMS tulum arasındaki fark nedir?",
        a: "Lamineli tulumlarda (T-535, T-530) kumaş mikro gözenekli PE film ile kaplıdır ve tüm dikişler bantlıdır. SMS tulumda (T-500) üç katlı polipropilen kumaş yüksek hava geçirgenliği sağlar ve ısı stresini azaltır. Üçü de Tip 5/6 sınıfındadır. Sıvı sıçraması öndeyse genellikle lamineli, toz ve sıcak ortam öndeyse SMS model tercih edilir.",
      },
      {
        q: "T-535 ile T-530 arasındaki fark nedir?",
        a: "İkisi de 55 gr/m² lamine kumaştan, dikişleri bantlı ve kasık bölgesi takviyelidir; ikisi de EN 1149-5 antistatiktir. T-530 ayrıca Tip 5B/6B sınıfındadır: EN 14126'ya göre biyolojik ajanlara karşı test edilmiştir ve EN 1073-2 belgelidir. Biyolojik risk olan işlerde (ilaç üretimi, biyogüvenlik laboratuvarları) T-530'u seçin.",
      },
      {
        q: "T-300 hangi işler için uygundur?",
        a: "T-300, 30 gr SS kumaştan hafif bir tulumdur ve Tip 5/6 belgesi yoktur. Genel bakım ve onarım, otomotiv onarımı ve tarım gibi tehlikeli olmayan, minimum riskli işlerde kıyafeti kirden korumak için kullanılır. Tehlikeli toz veya sıvı sıçraması varsa T-500 ya da T-530 seçin.",
      },
      {
        q: "Asbest veya kurşun tozu olan işlerde hangi tulum kullanılır?",
        a: "FABA kataloğu T-500 SMS tulumu (Tip 5/6, KKD Kategori III) asbest ve kurşun azaltma işleri dahil tehlikeli tozlar için önerir. Tulum, uygun solunum koruyucu ve diğer KKD'lerle birlikte, işyerinizin risk değerlendirmesine göre kullanılmalıdır.",
      },
    ],
  },
  {
    name: "Önlük ve Laboratuvar Önlüğü",
    slug: "onluk-laboratuvar-onlugu",
    shortName: "Önlük",
    seoTitle: "Laboratuvar Önlüğü ve Kimyasal Önlük (FABA)",
    metaDescription:
      "FABA LO-530 fermuarlı laboratuvar önlüğü, LO-531 lamineli önlük ve KO-800 kimyasal önlük: Tip PB6-B ve PB3-B/PB4-B, EN 14126. Koli bazında teklif alın.",
    h1: "Koruyucu Önlükler ve Laboratuvar Önlükleri",
    intro:
      "Bu kategoride gövdenin önünü koruyan üç FABA ürünü bulunur. Hepsi kısmi vücut koruması (PB) sınıfındadır: önlük yalnızca örttüğü bölgeyi korur. Sıçrama her yönden geliyorsa veya tüm vücudun korunması gerekiyorsa tulum seçilmelidir.\n\n" +
      "LO-530, 55 gr/m² lamine kumaştan, önden fermuarlı, yakalı ve önde iki cepli bir laboratuvar önlüğüdür. Kol ağızları lastiklidir; suyu ve bazı tehlikeli olmayan yağları iter. Tip PB6-B, EN 14126 ve EN 1149-5 belgelidir; XS–2XL bedenlerinde, kolide 60 adet gelir. LO-531 boyun askılı, belden arkadan bağlanan lamineli bir önlüktür; aynı şekilde Tip PB6-B, EN 14126 ve EN 1149-5 belgelidir ve kolide 240 adet bulunur. Bu iki model hafif, tehlikeli olmayan sıvılara karşıdır.\n\n" +
      "Daha ağır kimyasal işler için KO-800 TruChem kimyasal önlük vardır: tamamen sıvı geçirmez kumaş, kimyasal geçirmez bantla kapatılmış dikişler ve boyun askılı kesim. Tip PB3-B/PB4-B/PB6-B sınıfındadır; FABA kataloğuna göre petrol ürünlerine, nitrik ve sülfürik asit gibi asitlere, ince tozlara ve atık suya karşı bariyer oluşturur. Kolide 160 adet bulunur. Belirli bir kimyasala dayanımı teklif aşamasında teknik föyden doğrulayın.\n\n" +
      "Önlükler ilaç sanayi, hastane, klinik ve laboratuvarlar, veterinerlik, tarım, metal işleri, otomotiv ve kimya sektöründe kullanılır. Kolları da korumak için boyun askılı önlükleri LK-530 veya KK-800 kollukla birlikte kullanabilirsiniz.",
    faqs: [
      {
        q: "Önlük mü, tulum mu seçmeliyim?",
        a: "Önlükler kısmi vücut koruması (PB) sağlar; yalnızca gövdenin önünü ve örttüğü bölgeyi korur. Sıvı sıçraması her yönden geliyorsa veya toz tüm vücuda yayılıyorsa Tip 5/6 ya da daha üst sınıf bir tulum gerekir. Önlük, tezgâh başında ve öne doğru sıçrama riski olan işler için pratik bir çözümdür.",
      },
      {
        q: "LO-530 ile LO-531 arasındaki fark nedir?",
        a: "LO-530 önden fermuarlı, yakalı, iki cepli ve kol ağızları lastikli bir laboratuvar önlüğüdür; XS–2XL bedenlerinde, kolide 60 adet gelir. LO-531 boyun askılı, belden arkadan bağlanan bir önlüktür; kolide 240 adet bulunur. İkisi de Tip PB6-B, EN 14126 ve EN 1149-5 belgelidir.",
      },
      {
        q: "KO-800 kimyasal önlük hangi kimyasallara karşı kullanılır?",
        a: "FABA kataloğuna göre KO-800 petrol ürünlerine, nitrik ve sülfürik asit gibi asitlere, ince tozlara ve atık suya karşı bariyer oluşturur; Tip PB3-B/PB4-B/PB6-B sınıfındadır. Kullandığınız kimyasalın adını ve konsantrasyonunu teklif formuna yazın; dayanımı teklif aşamasında üreticinin teknik föyünden birlikte doğrulayalım.",
      },
      {
        q: "Önlükle birlikte kolları nasıl korurum?",
        a: "Boyun askılı önlüklerde (LO-531, KO-800) kollar açıkta kalır. LK-530 lamineli kolluk (Tip PB6-B, 50 cm) LO-531 ile, KK-800 kimyasal kolluk (Tip PB3-B/PB4-B/PB6-B, 50 cm) KO-800 ile aynı koruma sınıfındadır. Kollukları teklif listenize önlükle birlikte ekleyebilirsiniz.",
      },
    ],
  },
  {
    name: "Kolluk, Galoş ve Başlık",
    slug: "kolluk-galos-baslik",
    shortName: "Kolluk, Galoş, Başlık",
    seoTitle: "Kolluk, Galoş ve Koruyucu Başlık Toptan",
    metaDescription:
      "Lamineli ve kimyasal (PB3-B/PB4-B) kolluk, ayakkabı ve bot galoşu, koruyucu başlık: FABA LK, AG, BG, KK ve LB serisi. Koli içi adetler ve toptan teklif.",
    h1: "Kolluk, Galoş ve Koruyucu Başlıklar",
    intro:
      "Kolluk, galoş ve başlık; tulum veya önlükle birlikte kullanılan, vücudun yalnızca bir bölümünü koruyan tamamlayıcı ürünlerdir (kısmi vücut koruması, PB). Bu kategorideki 7 FABA ürünü lamineli ve kimyasal olmak üzere iki gruba ayrılır.\n\n" +
      "Lamineli grup hafif, tehlikeli olmayan sıvılara karşıdır. LK-530, AG-530, BG-530 ve LB-530, 55 gr/m² lamine kumaştan üretilir ve Tip PB6-B, EN 14126 ve EN 1149-5 belgelidir. LK-530 iki ucu elastik, 50 cm koruyucu kolluktur (koli içi 720 adet). AG-530 kaymaz tabanlı, ağzı elastik ayakkabı galoşudur; yüksekliği 18 cm, uzunluğu 35 cm'dir (500 adet). BG-530 bilekten bağcıklı, 48 cm yüksekliğinde kaymaz bot galoşudur (200 adet). AG-530 ve BG-530, T-530 tulumla aynı kumaştan ve aynı dikiş tekniğiyle üretilir. LB-530 baş, boyun ve omuzları örten, yüz açıklığı elastik bir başlıktır, yani kukuletadır (200 adet). BG-630 ise 63 gr/m² lamine kumaştan, tüm dikişleri bantlı bir bot galoşudur ve T-630 tulumla set olarak veya ayrı alınabilir; norm bilgisi teklifte teyit edilir (200 adet).\n\n" +
      "Kimyasal grupta sarı TruChem kumaştan, tamamen sıvı geçirmez ve dikişleri bantlı iki ürün var; ikisi de Tip PB3-B/PB4-B/PB6-B sınıfındadır ve EN 1149-5 belgelidir. KK-800, eldivenle sabit bağlantı için elastik başparmak halkalı, 50 cm kimyasal kolluktur (320 adet). BG-800 kaymaz tabanlı, 48 cm yüksekliğinde kimyasal bot galoşudur (160 adet).",
    faqs: [
      {
        q: "Lamineli ve kimyasal (TruChem) galoş arasındaki fark nedir?",
        a: "Lamineli galoşlar (AG-530, BG-530) 55 gr/m² lamine kumaştan üretilir ve Tip PB6-B sınıfındadır; hafif, tehlikeli olmayan sıvılara karşıdır. BG-800 kimyasal bot galoşu tamamen sıvı geçirmez TruChem kumaştandır, dikişleri bantlıdır ve Tip PB3-B/PB4-B/PB6-B sınıfındadır; sıvı kimyasal riski olan işler içindir.",
      },
      {
        q: "Ayakkabı galoşu mu, bot galoşu mu?",
        a: "AG-530 ayakkabı galoşu 18 cm yüksekliğindedir ve ayakkabıyı örter. Bot galoşları (BG-530, BG-630, BG-800) 48 cm yüksekliğindedir, bilekten bağcıklıdır ve alt bacağı da örter. Dördünün de tabanı kaymazdır.",
      },
      {
        q: "Kolluk eldivene nasıl sabitlenir?",
        a: "KK-800 kimyasal kollukta elastik bir başparmak halkası vardır; halka eldivenle sabit bağlantı sağlar, diğer uç elastiktir. LK-530 lamineli kollukta iki ağız da elastiktir. İki kolluk da 50 cm uzunluğundadır.",
      },
      {
        q: "Bu ürünleri tulumla set olarak alabilir miyim?",
        a: "Evet, teklif listenize tulumla birlikte ekleyebilirsiniz. AG-530 ve BG-530, T-530 tulumla aynı kumaş ve dikiş tekniğiyle üretilir. BG-630, T-630 tulumla set olarak veya ayrı satılır. KK-800 kolluk ve BG-800 galoş, T-800 tulum gibi TruChem serisindendir.",
      },
      {
        q: "LB-530 koruyucu başlık ne zaman kullanılır?",
        a: "LB-530 baş, boyun ve omuzları örten pelerinli bir başlıktır (kukuleta); yüz açıklığı elastiktir. Kapüşonsuz önlük veya iş kıyafetiyle çalışırken baş ve boynu hafif, tehlikeli olmayan sıvılara karşı korumak için kullanılır. Tip PB6-B, EN 14126 ve EN 1149-5 belgelidir.",
      },
    ],
  },
];

/** /kategori/<slug> → kayıt */
export function getCategoryBySlug(slug: string): CategoryPage | undefined {
  return CATEGORY_PAGES.find((c) => c.slug === slug);
}

/** CategoryName → kayıt */
export function getCategoryByName(name: CategoryName | string): CategoryPage | undefined {
  return CATEGORY_PAGES.find((c) => c.name === name);
}

/** CategoryName → "/kategori/<slug>" (bilinmeyen ad için "/urunler"). */
export function categoryHref(name: CategoryName | string): string {
  const c = getCategoryByName(name);
  return c ? `/kategori/${c.slug}` : "/urunler";
}

/** Giriş metnini paragraflara böler (boş metin → boş dizi). */
export function introParagraphs(c: Pick<CategoryPage, "intro">): string[] {
  return c.intro
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
}
