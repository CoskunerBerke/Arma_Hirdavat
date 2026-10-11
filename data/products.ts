import { LEGACY_SLUGS, LEGACY_SLUGS_EXTRA } from "./legacy-slugs";
import { slugify } from "./slug";

/* ────────────────────────────────────────────────────────────────────────────
 * ÜRÜN VERİSİ — TEK KAYNAK (online katalog: 39 FABA KKD ürünü, 8 kategori)
 *
 * ADRES (slug) KURALI
 *   slug = slugify(title). Başlık ürün kodunu zaten içerir (ör. "FABA EP-1301 …").
 *   ⚠ Başlık (title) değişirse ürünün adresi de değişir. Yayından sonra bir başlığı
 *   değiştirirseniz, ESKİ slug'ı data/legacy-slugs.ts → LEGACY_SLUGS_EXTRA listesine ekleyin;
 *   next.config.mjs bu listeden eski adresleri yeni adrese kalıcı (308) yönlendirir.
 *   next.config.mjs RAW kayıtlarındaki `"id": <sayı>,` ve `"title": "…"` alanlarını metin olarak
 *   okur: bu iki alanın yazım biçimini koruyun.
 *
 * KATEGORİ ADLARI
 *   CategoryName değerleri alıcıların arama dilindedir ve görünen etikettir.
 *   Kategori sayfası verisi (slug, SEO başlığı, H1, SSS) data/categories.ts içindedir.
 * ──────────────────────────────────────────────────────────────────────────── */

export type CategoryName =
  | "Nitril Kaplı İş Eldivenleri"
  | "Köpük Nitril Eldivenler"
  | "Kesilmeye Dirençli Eldivenler"
  | "Kaynakçı ve Sürücü Eldivenleri"
  | "Kimyasal Koruyucu Tulumlar"
  | "Tek Kullanımlık Tulumlar"
  | "Önlük ve Laboratuvar Önlüğü"
  | "Kolluk, Galoş ve Başlık";

export interface ProductGroup {
  id: number;
  /** URL parçası: slugify(title). Elle girilmez. */
  slug: string;
  code: string;
  title: string;
  category: CategoryName;
  /** /images/products/faba_<id>.jpg */
  image: string;
  description: string;
  items: string[];
  /** Koli içi adet, "252 Çift" / "20 Adet" biçiminde (bkz. parseKoli). */
  koli: string;
  sizes: string;
  standards: string[];
  applications?: string;
  badge?: string;
  /** İsteğe bağlı <title> (marka eki hariç, en fazla ~44 karakter; layout " | Arma Hırdavat" ekler). */
  seoTitle?: string;
  /** İsteğe bağlı meta description (140–155 karakter). */
  metaDescription?: string;
  /** Menşe ülke / üretim tesisi — YALNIZCA üretici belgesiyle doğrulanmışsa doldurun. */
  origin?: string;
}

/** Kategoriler, sitede gösterilecek sırayla. */
export const CATEGORIES: CategoryName[] = [
  "Nitril Kaplı İş Eldivenleri",
  "Köpük Nitril Eldivenler",
  "Kesilmeye Dirençli Eldivenler",
  "Kaynakçı ve Sürücü Eldivenleri",
  "Kimyasal Koruyucu Tulumlar",
  "Tek Kullanımlık Tulumlar",
  "Önlük ve Laboratuvar Önlüğü",
  "Kolluk, Galoş ve Başlık",
];

/** URL parçası üretici (data/slug.ts; istemci bileşenleri ürün verisini almadan oradan kullanır). */
export { slugify };

type Raw = Omit<ProductGroup, "slug" | "image">;

const RAW: Raw[] = [
  {
    "id": 1,
    "code": "EP-1301",
    "title": "FABA EP-1301 Nitril Kaplı İş Eldiveni",
    "seoTitle": "FABA EP-1301 Nitril Kaplı İş Eldiveni (EN 388 3121A)",
    "metaDescription": "FABA EP-1301 nitril kaplı iş eldiveni: polyester örme astar, yağ ve grese dayanıklı. EN 388 3121A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Nitril Kaplı İş Eldivenleri",
    "description": "Eli terletmeyen polyester örme astar; avuç içi ve parmaklarda mavi nitril kaplama. Yağ ve grese dayanıklıdır, EN 388 3121A sınıfındadır.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3121A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri.",
    "badge": "Parmak Ucu Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: parmak ucu kaplama (avuç içi ve parmaklar nitril kaplı)",
      "Eli terletmeyen polyester örme astar",
      "Yağ ve grese karşı dayanıklı nitril kaplama",
      "EN 388 3121A: aşınma 3, kesilme 1, yırtılma 2, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1",
      "Özel örgüsü sayesinde eli saran, konforlu kullanım"
    ]
  },
  {
    "id": 2,
    "code": "EP-1302",
    "title": "FABA EP-1302 3/4 Nitril Kaplı İş Eldiveni",
    "seoTitle": "FABA EP-1302 3/4 Nitril Kaplı İş Eldiveni (3121A)",
    "metaDescription": "FABA EP-1302 3/4 nitril kaplı iş eldiveni: el sırtı büyük ölçüde kaplı, polyester astar. EN 388 3121A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Nitril Kaplı İş Eldivenleri",
    "description": "Polyester örme astar üzerine 3/4 mavi nitril kaplama: avuç içi, parmaklar ve el sırtının büyük kısmı kaplıdır. Yağ ve grese dayanıklı, EN 388 3121A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3121A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri.",
    "badge": "3/4 Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: 3/4 kaplama (el sırtının bir bölümü açık kalır)",
      "Eli terletmeyen polyester örme astar",
      "Yağ ve grese karşı dayanıklı nitril kaplama",
      "EN 388 3121A: aşınma 3, kesilme 1, yırtılma 2, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1",
      "Özel örgüsü sayesinde eli saran, konforlu kullanım"
    ]
  },
  {
    "id": 3,
    "code": "EP-1303",
    "title": "FABA EP-1303 Tam Nitril Kaplı İş Eldiveni",
    "seoTitle": "FABA EP-1303 Tam Nitril Kaplı İş Eldiveni (3121A)",
    "metaDescription": "FABA EP-1303 tam nitril kaplı iş eldiveni: el sırtı dahil kaplı, yağ ve grese dayanıklı. EN 388 3121A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Nitril Kaplı İş Eldivenleri",
    "description": "Polyester örme astar; el sırtı dahil tüm el yüzeyi mavi nitril kaplıdır. Yağ ve grese dayanıklı, EN 388 3121A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3121A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri.",
    "badge": "Tam Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: tam kaplama (el sırtı dahil)",
      "Eli terletmeyen polyester örme astar",
      "Yağ ve grese karşı dayanıklı nitril kaplama",
      "EN 388 3121A: aşınma 3, kesilme 1, yırtılma 2, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1",
      "Özel örgüsü sayesinde eli saran, konforlu kullanım"
    ]
  },
  {
    "id": 4,
    "code": "EP-1401",
    "title": "FABA EP-1401 Kalın Astarlı Nitril Kaplı İş Eldiveni",
    "seoTitle": "FABA EP-1401 Nitril Kaplı İş Eldiveni (EN 388 4131A)",
    "metaDescription": "FABA EP-1401 nitril kaplı iş eldiveni: kalın polyester astar, yağ ve grese dayanıklı. EN 388 4131A, beden 7–11, koli içi 192 çift. Kurumsal teklif alın.",
    "category": "Nitril Kaplı İş Eldivenleri",
    "description": "Uzun süreli dayanıklılık için daha kalın polyester örme astar; avuç içi ve parmaklar nitril kaplı. EN 388 4131A ile aşınma direnci seviye 4'tür.",
    "koli": "192 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (4131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri.",
    "badge": "Parmak Ucu Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: parmak ucu kaplama (avuç içi ve parmaklar nitril kaplı)",
      "Uzun süreli dayanıklılık için daha kalın polyester örme astar",
      "Yağ ve grese karşı dayanıklı nitril kaplama",
      "EN 388 4131A: aşınma 4, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1",
      "Özel örgüsü sayesinde eli saran, konforlu kullanım"
    ]
  },
  {
    "id": 5,
    "code": "EP-1402",
    "title": "FABA EP-1402 Kalın Astarlı 3/4 Nitril Kaplı İş Eldiveni",
    "seoTitle": "FABA EP-1402 3/4 Nitril Kaplı İş Eldiveni (4131A)",
    "metaDescription": "FABA EP-1402 kalın astarlı 3/4 nitril kaplı iş eldiveni, yağ ve grese dayanıklı. EN 388 4131A, beden 7–11, koli içi 192 çift. Kurumsal teklif alın.",
    "category": "Nitril Kaplı İş Eldivenleri",
    "description": "Daha kalın polyester örme astar üzerine 3/4 nitril kaplama: avuç içi, parmaklar ve el sırtının büyük kısmı kaplıdır. EN 388 4131A.",
    "koli": "192 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (4131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri.",
    "badge": "3/4 Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: 3/4 kaplama (el sırtının bir bölümü açık kalır)",
      "Uzun süreli dayanıklılık için daha kalın polyester örme astar",
      "Yağ ve grese karşı dayanıklı nitril kaplama",
      "EN 388 4131A: aşınma 4, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1",
      "Özel örgüsü sayesinde eli saran, konforlu kullanım"
    ]
  },
  {
    "id": 6,
    "code": "EP-1403",
    "title": "FABA EP-1403 Kalın Astarlı Tam Nitril Kaplı İş Eldiveni",
    "seoTitle": "FABA EP-1403 Tam Nitril Kaplı İş Eldiveni (4131A)",
    "metaDescription": "FABA EP-1403 kalın astarlı, el sırtı dahil tam nitril kaplı iş eldiveni. EN 388 4131A (aşınma 4), beden 7–11, koli içi 192 çift. Kurumsal teklif alın.",
    "category": "Nitril Kaplı İş Eldivenleri",
    "description": "Daha kalın polyester örme astar; el sırtı dahil tüm el yüzeyi nitril kaplıdır. Yağ ve grese dayanıklı, EN 388 4131A.",
    "koli": "192 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (4131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Altyapı ve bakım, imalat, inşaat, madencilik, makine ve ekipman, otomotiv ve depolama işleri.",
    "badge": "Tam Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: tam kaplama (el sırtı dahil)",
      "Uzun süreli dayanıklılık için daha kalın polyester örme astar",
      "Yağ ve grese karşı dayanıklı nitril kaplama",
      "EN 388 4131A: aşınma 4, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1",
      "Özel örgüsü sayesinde eli saran, konforlu kullanım"
    ]
  },
  {
    "id": 7,
    "code": "TruFlex EN-1501",
    "title": "FABA TruFlex EN-1501 Köpük Nitril İş Eldiveni",
    "seoTitle": "FABA TruFlex EN-1501 Köpük Nitril Eldiven (3131A)",
    "metaDescription": "FABA TruFlex EN-1501 köpük nitril iş eldiveni: 15 gauge naylon örgü, nefes alan kaplama. EN 388 3131A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Köpük Nitril Eldivenler",
    "description": "Siyah 15 gauge naylon örgü üzerine avuç içi ve parmaklarda köpük nitril kaplama. Hassas montaj ve el becerisi gerektiren işler için; EN 388 3131A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Gıda işleme, ambalaj, kuru ilaç, otomotiv, küçük parça montajı, elektronik ve yarı iletken üretimi, bakım ve genel işler.",
    "badge": "Parmak Ucu Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: parmak ucu kaplama (avuç içi ve parmaklar)",
      "15 gauge naylon örgü: ele tam oturur, yüksek el becerisi ve hassasiyet",
      "Köpük nitril kaplama nefes alabilirliği artırır; el yorgunluğunu ve eldiven içinde yoğunlaşmayı azaltır",
      "Örgü bilek, eldivenin kullanım sırasında elden çıkmasını önler",
      "Hassas yıkama işlemiyle eldiven üzerindeki birikimler giderilir; temiz ve rahat kullanım",
      "EN 388 3131A: aşınma 3, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1"
    ]
  },
  {
    "id": 8,
    "code": "TruFlex EN-1502",
    "title": "FABA TruFlex EN-1502 3/4 Köpük Nitril İş Eldiveni",
    "seoTitle": "FABA TruFlex EN-1502 3/4 Köpük Nitril Eldiven",
    "metaDescription": "FABA TruFlex EN-1502 3/4 köpük nitril iş eldiveni: 15 gauge siyah naylon örgü. EN 388 3131A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Köpük Nitril Eldivenler",
    "description": "Siyah 15 gauge naylon örgü; avuç içi, parmaklar ve el sırtının büyük kısmı köpük nitril kaplıdır. EN 388 3131A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Gıda işleme, ambalaj, kuru ilaç, otomotiv, küçük parça montajı, elektronik ve yarı iletken üretimi, bakım ve genel işler.",
    "badge": "3/4 Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: 3/4 kaplama (el sırtının bir bölümü açık kalır)",
      "15 gauge naylon örgü: ele tam oturur, yüksek el becerisi ve hassasiyet",
      "Köpük nitril kaplama nefes alabilirliği artırır; el yorgunluğunu ve eldiven içinde yoğunlaşmayı azaltır",
      "Örgü bilek, eldivenin kullanım sırasında elden çıkmasını önler",
      "Hassas yıkama işlemiyle eldiven üzerindeki birikimler giderilir; temiz ve rahat kullanım",
      "EN 388 3131A: aşınma 3, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1"
    ]
  },
  {
    "id": 9,
    "code": "TruFlex EN-1503",
    "title": "FABA TruFlex EN-1503 Tam Kaplı Köpük Nitril İş Eldiveni",
    "seoTitle": "FABA TruFlex EN-1503 Tam Kaplı Köpük Nitril Eldiven",
    "metaDescription": "FABA TruFlex EN-1503 tam kaplı köpük nitril iş eldiveni: 15 gauge siyah naylon örgü. EN 388 3131A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Köpük Nitril Eldivenler",
    "description": "Siyah 15 gauge naylon örgü; el sırtı dahil tüm el yüzeyi köpük nitril kaplıdır. EN 388 3131A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Gıda işleme, ambalaj, kuru ilaç, otomotiv, küçük parça montajı, elektronik ve yarı iletken üretimi, bakım ve genel işler.",
    "badge": "Tam Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: tam kaplama (el sırtı dahil)",
      "15 gauge naylon örgü: ele tam oturur, yüksek el becerisi ve hassasiyet",
      "Köpük nitril kaplama nefes alabilirliği artırır; el yorgunluğunu ve eldiven içinde yoğunlaşmayı azaltır",
      "Örgü bilek, eldivenin kullanım sırasında elden çıkmasını önler",
      "Hassas yıkama işlemiyle eldiven üzerindeki birikimler giderilir; temiz ve rahat kullanım",
      "EN 388 3131A: aşınma 3, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1"
    ]
  },
  {
    "id": 10,
    "code": "TruFlex EN-1511",
    "title": "FABA TruFlex EN-1511 Turuncu Köpük Nitril İş Eldiveni",
    "seoTitle": "FABA TruFlex EN-1511 Turuncu Köpük Nitril Eldiven",
    "metaDescription": "FABA TruFlex EN-1511 iş eldiveni: turuncu 15 gauge örgü, avuç içi köpük nitril kaplı. EN 388 3131A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Köpük Nitril Eldivenler",
    "description": "Turuncu 15 gauge naylon örgü üzerine avuç içi ve parmaklarda siyah köpük nitril kaplama. Yüksek el becerisi ve hassasiyet; EN 388 3131A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Gıda işleme, ambalaj, kuru ilaç, otomotiv, küçük parça montajı, elektronik ve yarı iletken üretimi, bakım ve genel işler.",
    "badge": "Parmak Ucu Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: parmak ucu kaplama (avuç içi ve parmaklar), turuncu örgü",
      "15 gauge naylon örgü: ele tam oturur, yüksek el becerisi ve hassasiyet",
      "Köpük nitril kaplama nefes alabilirliği artırır; el yorgunluğunu ve eldiven içinde yoğunlaşmayı azaltır",
      "Örgü bilek, eldivenin kullanım sırasında elden çıkmasını önler",
      "Hassas yıkama işlemiyle eldiven üzerindeki birikimler giderilir; temiz ve rahat kullanım",
      "EN 388 3131A: aşınma 3, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1"
    ]
  },
  {
    "id": 11,
    "code": "TruFlex EN-1512",
    "title": "FABA TruFlex EN-1512 Turuncu 3/4 Köpük Nitril İş Eldiveni",
    "seoTitle": "FABA TruFlex EN-1512 Turuncu 3/4 Köpük Nitril Eldiven",
    "metaDescription": "FABA TruFlex EN-1512 iş eldiveni: turuncu 15 gauge örgü, 3/4 köpük nitril kaplı. EN 388 3131A, beden 7–11, koli içi 252 çift. Kurumsal teklif alın.",
    "category": "Köpük Nitril Eldivenler",
    "description": "Turuncu 15 gauge naylon örgü; avuç içi, parmaklar ve el sırtının büyük kısmı siyah köpük nitril kaplıdır. EN 388 3131A.",
    "koli": "252 Çift",
    "sizes": "7, 8, 9, 10, 11",
    "standards": [
      "EN 388:2016+A1:2018 (3131A)",
      "EN 407:2020 (X1XXXX)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Gıda işleme, ambalaj, kuru ilaç, otomotiv, küçük parça montajı, elektronik ve yarı iletken üretimi, bakım ve genel işler.",
    "badge": "3/4 Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Kaplama tipi: 3/4 kaplama, turuncu örgü",
      "15 gauge naylon örgü: ele tam oturur, yüksek el becerisi ve hassasiyet",
      "Köpük nitril kaplama nefes alabilirliği artırır; el yorgunluğunu ve eldiven içinde yoğunlaşmayı azaltır",
      "Örgü bilek, eldivenin kullanım sırasında elden çıkmasını önler",
      "Hassas yıkama işlemiyle eldiven üzerindeki birikimler giderilir; temiz ve rahat kullanım",
      "EN 388 3131A: aşınma 3, kesilme 1, yırtılma 3, delinme 1, TDM kesilme A",
      "EN 407 X1XXXX: temas ısısına karşı seviye 1"
    ]
  },
  {
    "id": 12,
    "code": "TruCut EK-5000",
    "title": "FABA TruCut EK-5000 Kaplamasız Kesilmeye Dirençli Eldiven",
    "seoTitle": "FABA TruCut EK-5000 Kesilmeye Dirençli Eldiven 4X41C",
    "metaDescription": "FABA TruCut EK-5000 kaplamasız kesilmeye dirençli eldiven: kesilme seviyesi C, EN 388 4X41C, makinede yıkanabilir. Koli içi 72 çift. Kurumsal teklif alın.",
    "category": "Kesilmeye Dirençli Eldivenler",
    "description": "Kesilme riski olan işler için kaplamasız örme eldiven. EN ISO 13997'ye göre kesilme koruma sınıfı C, EN 388 4X41C; hafif yapısı ve dokunma hissiyle hassas işlere uygundur.",
    "koli": "72 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4X41C)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori II"
    ],
    "applications": "Keskin nesnelerle çalışma; beton, metal ve cam fabrikaları; otomotiv ve havacılık; inşaat, metal imalat ve metal damgalama; depo, bahçe işleri, gıda kesme ve ahşap oymacılığı.",
    "badge": "Kesilme Seviyesi C",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "EN ISO 13997'ye göre kesilme koruma sınıfı C",
      "EN 388 4X41C: aşınma 4, yırtılma 4, delinme 1, TDM kesilme C (X: bıçak testi uygulanmadı)",
      "Kaplamasız örme yapı: yüksek dokunma hissi ve el becerisi",
      "Esnek malzeme her iki ele de uyar; el yorgunluğunu azaltır",
      "Örgü bilek, kir ve atıkların eldivene girmesini önlemeye yardımcı olur",
      "Hafif ve makinede yıkanabilir; ihtiyaca göre birden fazla kullanılabilir",
      "KKD Kategori II"
    ]
  },
  {
    "id": 13,
    "code": "TruCut EK-5610",
    "title": "FABA TruCut EK-5610 Nitril Kaplı Kesilmeye Dirençli Eldiven",
    "seoTitle": "FABA EK-5610 Nitril Kaplı Kesilmeye Dirençli Eldiven",
    "metaDescription": "FABA TruCut EK-5610 nitril kaplı kesilmeye dirençli eldiven: HPPE-çelik tel astar, seviye C, EN 388 4X43C. Koli içi 72 çift. Kurumsal teklif alın.",
    "category": "Kesilmeye Dirençli Eldivenler",
    "description": "Dikişsiz HPPE, spandeks, çelik tel ve naylon karışımı astar; avuç içi ve parmaklarda nitril kaplama. Kesilme sınıfı C (EN ISO 13997), EN 388 4X43C.",
    "koli": "72 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4X43C)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori II"
    ],
    "applications": "Keskin nesnelerle çalışma; beton, metal ve cam fabrikaları; otomotiv ve havacılık; inşaat, metal imalat ve metal damgalama; depo, bahçe işleri, gıda kesme ve ahşap oymacılığı.",
    "badge": "Kesilme C · Nitril Kaplı",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Dikişsiz HPPE, spandeks, çelik tel ve naylon karışımı astar",
      "EN ISO 13997'ye göre kesilme koruma sınıfı C",
      "EN 388 4X43C: aşınma 4, yırtılma 4, delinme 3, TDM kesilme C (X: bıçak testi uygulanmadı)",
      "Parmak ucu kaplama: avuç içi ve parmaklar nitril kaplı",
      "Nitril kaplama tutuşu ve kullanım ömrünü artırır, ıslak yüzeylerde eli korur",
      "Örgü bilek, kir ve atıkların eldivene girmesini önlemeye yardımcı olur",
      "KKD Kategori II"
    ]
  },
  {
    "id": 14,
    "code": "TruCut EK-5620",
    "title": "FABA TruCut EK-5620 3/4 Nitril Kaplı Kesilmeye Dirençli Eldiven",
    "seoTitle": "FABA EK-5620 Kesilmeye Dirençli Eldiven, 3/4 Nitril",
    "metaDescription": "FABA TruCut EK-5620 3/4 nitril kaplı kesilmeye dirençli eldiven: HPPE-çelik tel astar, seviye C, EN 388 4X43C. Koli içi 72 çift. Kurumsal teklif alın.",
    "category": "Kesilmeye Dirençli Eldivenler",
    "description": "Dikişsiz HPPE, spandeks, çelik tel ve naylon karışımı astar; 3/4 nitril kaplama el sırtının büyük kısmını da örter. Kesilme sınıfı C, EN 388 4X43C.",
    "koli": "72 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4X43C)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori II"
    ],
    "applications": "Keskin nesnelerle çalışma; beton, metal ve cam fabrikaları; otomotiv ve havacılık; inşaat, metal imalat ve metal damgalama; depo, bahçe işleri, gıda kesme ve ahşap oymacılığı.",
    "badge": "Kesilme C · 3/4 Kaplama",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Dikişsiz HPPE, spandeks, çelik tel ve naylon karışımı astar",
      "EN ISO 13997'ye göre kesilme koruma sınıfı C",
      "EN 388 4X43C: aşınma 4, yırtılma 4, delinme 3, TDM kesilme C (X: bıçak testi uygulanmadı)",
      "3/4 nitril kaplama: avuç içi, parmaklar ve el sırtının büyük kısmı",
      "Nitril kaplama tutuşu ve kullanım ömrünü artırır, ıslak yüzeylerde eli korur",
      "Örgü bilek, kir ve atıkların eldivene girmesini önlemeye yardımcı olur",
      "KKD Kategori II"
    ]
  },
  {
    "id": 15,
    "code": "Zevahir D200-35",
    "title": "FABA Zevahir D200-35 Kaynakçı Eldiveni (35 cm)",
    "seoTitle": "FABA Zevahir D200-35 Kaynakçı Eldiveni, EN 12477 Tip A",
    "metaDescription": "FABA Zevahir D200-35 kaynakçı eldiveni: yarma sığır derisi, Kevlar dikiş, 35 cm. EN 12477 Tip A, EN 407 413X4X, koli içi 36 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "Yarma sığır derisinden, iç kısmı kot ve pamuk astarlı, Kevlar iplik dikişli 35 cm kaynakçı eldiveni. EN 12477 Tip A ve EN 407 413X4X ile ağır kaynak işlerine uygundur.",
    "koli": "36 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4244B)",
      "EN 407:2020 (413X4X)",
      "EN 12477:2001+A1:2005 (Tip A)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Isı veya erimiş metal sıçraması riski olan ortamlarda kaynak işleri, yükleme ve boşaltma, yapıştırma, perçinleme, metal işleme ve montaj, ekipman tamir ve bakımı.",
    "badge": "EN 12477 Tip A",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Yarma sığır derisi, 1,2–1,4 mm kalınlık",
      "İç kısmı kot ve pamuk astarla desteklenmiş; dikişler ısıya dayanıklı Kevlar iplik",
      "Ekstra avuç içi takviyesi; 35 cm uzun konç sıçrayan metal eriyiklerine karşı korur",
      "EN 12477 Tip A: ağır kaynak işlerine uygun kaynakçı eldiveni",
      "EN 407 413X4X: yanma davranışı 4, temas ısısı 1, konvektif ısı 3, küçük erimiş metal sıçraması 4",
      "EN 388 4244B: aşınma 4, kesilme 2, yırtılma 4, delinme 4, TDM kesilme B"
    ]
  },
  {
    "id": 16,
    "code": "Zevahir D200-40",
    "title": "FABA Zevahir D200-40 Kaynakçı Eldiveni (40 cm)",
    "seoTitle": "FABA Zevahir D200-40 Kaynakçı Eldiveni, EN 12477 Tip A",
    "metaDescription": "FABA Zevahir D200-40 kaynakçı eldiveni: yarma sığır derisi, 40 cm uzun konç. EN 12477 Tip A, EN 407 413X4X, koli içi 36 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "40 cm uzun konçlu, yarma sığır derisi kaynakçı eldiveni. Kot ve pamuk astar, Kevlar iplik dikiş; EN 12477 Tip A ve EN 407 413X4X.",
    "koli": "36 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4244B)",
      "EN 407:2020 (413X4X)",
      "EN 12477:2001+A1:2005 (Tip A)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Isı veya erimiş metal sıçraması riski olan ortamlarda kaynak işleri, yükleme ve boşaltma, yapıştırma, perçinleme, metal işleme ve montaj, ekipman tamir ve bakımı.",
    "badge": "40 cm Uzun Konç",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Yarma sığır derisi, 1,2–1,4 mm kalınlık",
      "İç kısmı kot ve pamuk astarla desteklenmiş; dikişler ısıya dayanıklı Kevlar iplik",
      "Ekstra avuç içi takviyesi; 40 cm uzun konç sıçrayan metal eriyiklerine karşı korur",
      "EN 12477 Tip A: ağır kaynak işlerine uygun kaynakçı eldiveni",
      "EN 407 413X4X: yanma davranışı 4, temas ısısı 1, konvektif ısı 3, küçük erimiş metal sıçraması 4",
      "EN 388 4244B: aşınma 4, kesilme 2, yırtılma 4, delinme 4, TDM kesilme B"
    ]
  },
  {
    "id": 17,
    "code": "Zevahir D300-35",
    "title": "FABA Zevahir D300-35 Başparmak Takviyeli Kaynakçı Eldiveni (35 cm)",
    "seoTitle": "FABA D300-35 Başparmak Takviyeli Kaynakçı Eldiveni",
    "metaDescription": "FABA Zevahir D300-35 kaynakçı eldiveni: avuç içi ve başparmak takviyeli, 35 cm. EN 12477 Tip A, EN 407 413X4X, koli içi 36 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "Avuç içi ve başparmakta ekstra takviyeli, yarma sığır derisi 35 cm kaynakçı eldiveni. Kot ve pamuk astar, Kevlar iplik dikiş; EN 12477 Tip A.",
    "koli": "36 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4244B)",
      "EN 407:2020 (413X4X)",
      "EN 12477:2001+A1:2005 (Tip A)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Isı veya erimiş metal sıçraması riski olan ortamlarda kaynak işleri, yükleme ve boşaltma, yapıştırma, perçinleme, metal işleme ve montaj, ekipman tamir ve bakımı.",
    "badge": "Başparmak Takviyeli",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Yarma sığır derisi, 1,2–1,4 mm kalınlık",
      "İç kısmı kot ve pamuk astarla desteklenmiş; dikişler ısıya dayanıklı Kevlar iplik",
      "Ekstra avuç içi ve başparmak takviyesi; 35 cm uzun konç sıçrayan metal eriyiklerine karşı korur",
      "EN 12477 Tip A: ağır kaynak işlerine uygun kaynakçı eldiveni",
      "EN 407 413X4X: yanma davranışı 4, temas ısısı 1, konvektif ısı 3, küçük erimiş metal sıçraması 4",
      "EN 388 4244B: aşınma 4, kesilme 2, yırtılma 4, delinme 4, TDM kesilme B"
    ]
  },
  {
    "id": 18,
    "code": "Zevahir D300-40",
    "title": "FABA Zevahir D300-40 Başparmak Takviyeli Kaynakçı Eldiveni (40 cm)",
    "seoTitle": "FABA D300-40 Başparmak Takviyeli Kaynakçı Eldiveni",
    "metaDescription": "FABA Zevahir D300-40 kaynakçı eldiveni: avuç içi ve başparmak takviyeli, 40 cm. EN 12477 Tip A, EN 407 413X4X, koli içi 36 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "Avuç içi ve başparmakta ekstra takviyeli, 40 cm uzun konçlu yarma sığır derisi kaynakçı eldiveni. Kevlar iplik dikiş; EN 12477 Tip A.",
    "koli": "36 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (4244B)",
      "EN 407:2020 (413X4X)",
      "EN 12477:2001+A1:2005 (Tip A)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "Isı veya erimiş metal sıçraması riski olan ortamlarda kaynak işleri, yükleme ve boşaltma, yapıştırma, perçinleme, metal işleme ve montaj, ekipman tamir ve bakımı.",
    "badge": "Başparmak Takviyeli · 40 cm",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Yarma sığır derisi, 1,2–1,4 mm kalınlık",
      "İç kısmı kot ve pamuk astarla desteklenmiş; dikişler ısıya dayanıklı Kevlar iplik",
      "Ekstra avuç içi ve başparmak takviyesi; 40 cm uzun konç sıçrayan metal eriyiklerine karşı korur",
      "EN 12477 Tip A: ağır kaynak işlerine uygun kaynakçı eldiveni",
      "EN 407 413X4X: yanma davranışı 4, temas ısısı 1, konvektif ısı 3, küçük erimiş metal sıçraması 4",
      "EN 388 4244B: aşınma 4, kesilme 2, yırtılma 4, delinme 4, TDM kesilme B"
    ]
  },
  {
    "id": 19,
    "code": "Zevahir D-105",
    "title": "FABA Zevahir D-105 Keçi Derisi Sürücü Eldiveni",
    "seoTitle": "FABA D-105 Keçi Derisi Sürücü Eldiveni, Krom VI İçermez",
    "metaDescription": "FABA Zevahir D-105 keçi derisi sürücü eldiveni: yumuşak deri, büzgülü elastik bilek, Krom VI içermez. EN 388 2111X, koli içi 72 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "Yumuşak ve aşınmaya dayanıklı cilt keçi derisinden sürücü eldiveni. Dokunma hissi gerektiren işlere uygundur; büzgülü elastik bilek, Krom VI içermez.",
    "koli": "72 Çift",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 388:2016+A1:2018 (2111X)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "İnşaat, genel bakım ve imalat, duvarcılık, malzeme taşıma, metal ve çelik imalat, demiryolu çalışmaları, depolama, kaynak ve dökümhanede hafif işler.",
    "badge": "Krom VI İçermez",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Cilt keçi derisi: yumuşak, aşınmaya dayanıklı; dokunma hissi gerektiren işler için",
      "Pürüzsüz üst gren keçi derisi; dayanıklılık ve el becerisi",
      "Kolay giyilen sürücü eldiveni kesimi",
      "Güvenli uyum için büzgülü elastik bilek",
      "Krom VI içermez",
      "EN 388 2111X: aşınma 2, kesilme 1, yırtılma 1, delinme 1"
    ]
  },
  {
    "id": 20,
    "code": "Zevahir D-100",
    "title": "FABA Zevahir D-100 Argon (TIG) Kaynak Eldiveni",
    "seoTitle": "FABA Zevahir D-100 Argon (TIG) Kaynak Eldiveni, Tip B",
    "metaDescription": "FABA Zevahir D-100 argon (TIG) kaynak eldiveni: keçi derisi, inek derisi manşet, 35 cm. EN 12477 Tip B, beden 10, koli içi 72 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "Hassas TIG (argon) kaynağı için EN 12477 Tip B eldiven. El kısmı cilt keçi derisi, uzun yarma inek derisi manşet, para-aramid iplik dikiş; 35 cm (beden 10).",
    "koli": "72 Çift",
    "sizes": "10",
    "standards": [
      "EN 388:2016+A1:2018 (2121X)",
      "EN 407:2020 (41214X)",
      "EN 12477:2001+A1:2005 (Tip B)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "TIG (argon) kaynağı, lehimleme, demir doğrama, metal fabrikasyonu, perçinleme, metal işleme ve montaj, ekipman bakım ve onarımı.",
    "badge": "EN 12477 Tip B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "EN 12477 Tip B: yüksek el becerisi gerektiren TIG kaynağı için",
      "Premium cilt keçi derisi; para-aramid iplikle dikilmiş",
      "Özel başparmak tasarımı hassas kaynak kontrolünde el becerisini artırır",
      "Uzun yarma inek derisi manşet; toplam uzunluk 35 cm (beden 10)",
      "Isı, alev, kıvılcım ve kaynak sıçramasına karşı koruma",
      "EN 407 41214X: yanma davranışı 4, temas ısısı 1, konvektif ısı 2, radyan ısı 1, küçük erimiş metal sıçraması 4",
      "EN 388 2121X: aşınma 2, kesilme 1, yırtılma 2, delinme 1"
    ]
  },
  {
    "id": 21,
    "code": "Zevahir D-101",
    "title": "FABA Zevahir D-101 Elastik Bilekli Argon (TIG) Kaynak Eldiveni",
    "seoTitle": "FABA D-101 Elastik Bilekli Argon (TIG) Kaynak Eldiveni",
    "metaDescription": "FABA Zevahir D-101 argon (TIG) kaynak eldiveni: keçi derisi, elastik bilek, uzun manşet. EN 12477 Tip B, beden 10, koli içi 72 çift. Kurumsal teklif alın.",
    "category": "Kaynakçı ve Sürücü Eldivenleri",
    "description": "Elastik bilekli TIG (argon) kaynak eldiveni: el kısmı cilt keçi derisi, uzun yarma inek derisi manşet, para-aramid iplik dikiş. EN 12477 Tip B; 35 cm (beden 10).",
    "koli": "72 Çift",
    "sizes": "10",
    "standards": [
      "EN 388:2016+A1:2018 (2121X)",
      "EN 407:2020 (41214X)",
      "EN 12477:2001+A1:2005 (Tip B)",
      "EN ISO 21420:2020",
      "KKD Yönetmeliği (AB) 2016/425"
    ],
    "applications": "TIG (argon) kaynağı, lehimleme, demir doğrama, metal fabrikasyonu, perçinleme, metal işleme ve montaj, ekipman bakım ve onarımı.",
    "badge": "Tip B · Elastik Bilek",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "EN 12477 Tip B: yüksek el becerisi gerektiren TIG kaynağı için",
      "Premium cilt keçi derisi; para-aramid iplikle dikilmiş",
      "Elastik bilek sayesinde ele daha iyi oturur",
      "Uzun yarma inek derisi manşet; toplam uzunluk 35 cm (beden 10)",
      "Isı, alev, kıvılcım ve kaynak sıçramasına karşı koruma",
      "EN 407 41214X: yanma davranışı 4, temas ısısı 1, konvektif ısı 2, radyan ısı 1, küçük erimiş metal sıçraması 4",
      "EN 388 2121X: aşınma 2, kesilme 1, yırtılma 2, delinme 1"
    ]
  },
  {
    "id": 22,
    "code": "TruChem T-800",
    "title": "FABA TruChem T-800 Tip 3B/4B/5B/6B Kimyasal Koruyucu Tulum",
    "seoTitle": "FABA T-800 Kimyasal Koruyucu Tulum Tip 3B/4B/5B/6B",
    "metaDescription": "FABA TruChem T-800 kimyasal tulum: Tip 3B/4B/5B/6B, EN 14126 biyolojik, EN 1149-5 antistatik, bantlı dikiş. S–4XL, koli içi 20 adet. Kurumsal teklif alın.",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "Tamamen sıvı geçirmez, sarı TruChem kimyasal koruyucu tulum: Tip 3B/4B/5B/6B, EN 14126, EN 1149-5 ve EN 1073-2. Kumaş ve dikişler kimyasal geçirmez bantla kapatılmıştır.",
    "koli": "20 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip 3B)",
      "EN 14605:2005+A1:2009 (Tip 4B)",
      "EN ISO 13982-1:2004+A1:2010 (Tip 5B)",
      "EN 13034:2005+A1:2009 (Tip 6B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN 1073-2:2002",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Biyolojik tehlikeler, kimyasal taşıma, dekontaminasyon, afet yönetimi, hastalık kontrolü, tank temizliği, petrokimya, petrol rafinerileri ve duruş (shutdown) bakımları.",
    "badge": "Tip 3B/4B/5B/6B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip 3B/4B (EN 14605): basınçlı sıvı jetlerine ve sprey kimyasallara karşı",
      "Tip 5B/6B: katı partiküllere ve sınırlı sıvı sıçramalarına karşı",
      "EN 14126 enfektif ajanlara karşı; kumaş ve dikişler kimyasal geçirmez bantla kapatılmış",
      "EN 1149-5 antistatik; EN 1073-2 radyoaktif partikül kontaminasyonuna karşı",
      "Dış bariyer film + PP spunbond nonwoven kumaş; güçlü dörtlü dikişler",
      "Solunum cihazı kullanımına uygun başlık; elastik başlık, manşet, bel ve ayak bilekleri",
      "Tam boy fermuar ve çift katmanlı fermuar kapağı; isteğe göre çift taraflı fermuar"
    ]
  },
  {
    "id": 23,
    "code": "TruChem T-800-G",
    "title": "FABA TruChem T-800-G Kendinden Çoraplı Kimyasal Tulum",
    "seoTitle": "FABA T-800-G Çoraplı Kimyasal Tulum Tip 3B/4B/5B/6B",
    "metaDescription": "FABA TruChem T-800-G çoraplı kimyasal tulum: Tip 3B/4B/5B/6B, EN 14126, EN 1149-5, bantlı dikiş. Beden S–4XL, koli içi 20 adet. Kurumsal teklif alın.",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "T-800'ün çoraplı modeli: ayak kısmı tulumla bütündür. Tip 3B/4B/5B/6B, EN 14126, EN 1149-5 ve EN 1073-2; dikişler kimyasal geçirmez bantla kapatılmıştır.",
    "koli": "20 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip 3B)",
      "EN 14605:2005+A1:2009 (Tip 4B)",
      "EN ISO 13982-1:2004+A1:2010 (Tip 5B)",
      "EN 13034:2005+A1:2009 (Tip 6B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN 1073-2:2002",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Biyolojik tehlikeler, kimyasal taşıma, dekontaminasyon, afet yönetimi, hastalık kontrolü, tank temizliği, petrokimya, petrol rafinerileri ve duruş (shutdown) bakımları.",
    "badge": "Çoraplı · Tip 3B/4B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Çoraplı model: ayak koruması tulumla bütün",
      "Tip 3B/4B (EN 14605): basınçlı sıvı jetlerine ve sprey kimyasallara karşı",
      "Tip 5B/6B: katı partiküllere ve sınırlı sıvı sıçramalarına karşı",
      "EN 14126 enfektif ajanlara karşı; kumaş ve dikişler kimyasal geçirmez bantla kapatılmış",
      "EN 1149-5 antistatik; EN 1073-2 radyoaktif partikül kontaminasyonuna karşı",
      "Dış bariyer film + PP spunbond nonwoven kumaş; güçlü dörtlü dikişler",
      "Solunum cihazı kullanımına uygun başlık; elastik başlık, manşet, bel ve ayak bilekleri"
    ]
  },
  {
    "id": 24,
    "code": "TruChem T-630",
    "title": "FABA TruChem T-630 Tip 4B/5B/6B Kimyasal Koruyucu Tulum",
    "seoTitle": "FABA T-630 Bantlı Kimyasal Koruyucu Tulum Tip 4B/5B/6B",
    "metaDescription": "FABA TruChem T-630 kimyasal tulum: 63 gr/m² lamine, tüm dikişler bantlı, Tip 4B/5B/6B, EN 14126. Beden S–4XL, koli içi 48 adet. Kurumsal teklif alın.",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "63 gr/m² mikro gözenekli lamine kumaştan, tüm dikişleri bantlı kimyasal koruyucu tulum. Tip 4B/5B/6B, EN 14126, EN 1149-5 ve EN 1073-2.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip 4B)",
      "EN ISO 13982-1:2004+A1:2010 (Tip 5B)",
      "EN 13034:2005+A1:2009 (Tip 6B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN 1073-2:2002",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç üretimi, tıbbi uygulamalar, araştırma ve biyogüvenlik laboratuvarları, nükleer tesis ve genel bakım işleri.",
    "badge": "Tip 4B/5B/6B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip 4B/5B/6B: sprey sıvılara, katı partiküllere ve sınırlı sıvı sıçramalarına karşı",
      "Ekstra sağlamlık için 63 gr/m² nefes alabilir mikro gözenekli PE film lamine kumaş",
      "Tüm dikişlerin üzeri sızdırmaz bantla kapatılmış",
      "EN 14126 biyolojik koruma, EN 1149-5 antistatik, EN 1073-2",
      "Elastik kapüşon, manşet, bel ve ayak bilekleri",
      "İç yüzü yapışkanlı fermuar kapağı; doğada çözünebilen ambalaj"
    ]
  },
  {
    "id": 25,
    "code": "TruChem T-630-G",
    "title": "FABA TruChem T-630-G Kendinden Çoraplı Kimyasal Tulum",
    "seoTitle": "FABA T-630-G Çoraplı Kimyasal Tulum Tip 4B/5B/6B",
    "metaDescription": "FABA TruChem T-630-G çoraplı kimyasal tulum: 63 gr/m² lamine, dikişler bantlı, Tip 4B/5B/6B, EN 14126. Beden S–4XL, koli içi 48 adet. Kurumsal teklif alın.",
    "category": "Kimyasal Koruyucu Tulumlar",
    "description": "T-630'un çoraplı modeli: 63 gr/m² lamine kumaş, tüm dikişler bantlı, ayak kısmı tulumla bütün. Tip 4B/5B/6B, EN 14126, EN 1149-5 ve EN 1073-2.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL, 4XL",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip 4B)",
      "EN ISO 13982-1:2004+A1:2010 (Tip 5B)",
      "EN 13034:2005+A1:2009 (Tip 6B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN 1073-2:2002",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç üretimi, tıbbi uygulamalar, araştırma ve biyogüvenlik laboratuvarları, nükleer tesis ve genel bakım işleri.",
    "badge": "Çoraplı · Tip 4B/5B/6B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Çoraplı model: ayak koruması tulumla bütün",
      "Tip 4B/5B/6B: sprey sıvılara, katı partiküllere ve sınırlı sıvı sıçramalarına karşı",
      "Ekstra sağlamlık için 63 gr/m² nefes alabilir mikro gözenekli PE film lamine kumaş",
      "Tüm dikişlerin üzeri sızdırmaz bantla kapatılmış",
      "EN 14126 biyolojik koruma, EN 1149-5 antistatik, EN 1073-2",
      "Elastik kapüşon, manşet, bel ve ayak bilekleri",
      "İç yüzü yapışkanlı fermuar kapağı; doğada çözünebilen ambalaj"
    ]
  },
  {
    "id": 26,
    "code": "T-535",
    "title": "FABA T-535 Tip 5/6 Dikiş Bantlı Lamineli Tulum (55 gr/m²)",
    "seoTitle": "FABA T-535 Dikiş Bantlı Tek Kullanımlık Tulum Tip 5/6",
    "metaDescription": "FABA T-535 tek kullanımlık tulum: 55 gr/m² lamine, tüm dikişler bantlı, Tip 5/6, EN 1149-5 antistatik. Beden S–3XL, koli içi 48 adet. Kurumsal teklif alın.",
    "category": "Tek Kullanımlık Tulumlar",
    "description": "55 gr/m² mikro gözenekli lamine kumaştan, tüm dikişleri bantlı tek kullanımlık tulum. Tip 5/6 ve EN 1149-5 antistatik; tehlikeli olmayan sıvılara ve partiküllere karşı.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "EN ISO 13982-1:2004+A1:2010 (Tip 5)",
      "EN 13034:2005+A1:2009 (Tip 6)",
      "EN 1149-5:2018",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç üretimi, tıbbi uygulamalar, araştırma laboratuvarları, hafif endüstriyel temizlik ve bakım işleri.",
    "badge": "Bantlı Dikiş · Tip 5/6",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip 5/6: katı partiküllere ve sınırlı sıvı sıçramalarına karşı (EN ISO 13982-1, EN 13034)",
      "Ekstra sağlamlık için 55 gr/m² nefes alabilir mikro gözenekli PE film lamine kumaş",
      "Tüm dikişlerin üzeri sızdırmaz bantla kapatılmış",
      "Takviyeli kasık bölgesi",
      "EN 1149-5 antistatik",
      "Elastik kapüşon, manşet, bel ve ayak bilekleri; iç yüzü yapışkanlı fermuar kapağı",
      "Doğada çözünebilen ambalaj"
    ]
  },
  {
    "id": 27,
    "code": "T-530",
    "title": "FABA T-530 Tip 5B/6B Tek Kullanımlık Lamineli Tulum (55 gr/m²)",
    "seoTitle": "FABA T-530 Lamineli Tek Kullanımlık Tulum Tip 5B/6B",
    "metaDescription": "FABA T-530 lamineli tek kullanımlık tulum: 55 gr/m², Tip 5B/6B, EN 14126, EN 1149-5 ve EN 1073-2. Beden S–3XL, koli içi 48 adet. Kurumsal teklif alın.",
    "category": "Tek Kullanımlık Tulumlar",
    "description": "55 gr/m² mikro gözenekli lamine kumaştan tek kullanımlık tulum. Tip 5B/6B, EN 14126 biyolojik koruma, EN 1149-5 antistatik ve EN 1073-2.",
    "koli": "48 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "EN ISO 13982-1:2004+A1:2010 (Tip 5B)",
      "EN 13034:2005+A1:2009 (Tip 6B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN 1073-2:2002",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç üretimi, tıbbi uygulamalar, araştırma ve biyogüvenlik laboratuvarları, nükleer tesis ve genel bakım işleri.",
    "badge": "Tip 5B/6B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip 5B/6B: katı partiküllere ve sınırlı sıvı sıçramalarına karşı, EN 14126 biyolojik koruma",
      "Ekstra sağlamlık için 55 gr/m² nefes alabilir mikro gözenekli PE film lamine kumaş",
      "EN 1149-5 antistatik; EN 1073-2 radyoaktif partikül kontaminasyonuna karşı",
      "Tüm dikişlerin üzeri sızdırmaz bantla kapatılmış",
      "Takviyeli kasık bölgesi",
      "Elastik kapüşon, manşet, bel ve ayak bilekleri; iç yüzü yapışkanlı fermuar kapağı",
      "Doğada çözünebilen ambalaj"
    ]
  },
  {
    "id": 28,
    "code": "T-500",
    "title": "FABA T-500 SMS Tip 5/6 Tek Kullanımlık Tulum (50 gr/m²)",
    "seoTitle": "FABA T-500 SMS Tek Kullanımlık Tulum Tip 5/6 (50 gr/m²)",
    "metaDescription": "FABA T-500 SMS tek kullanımlık tulum: 50 gr/m², nefes alabilir, Tip 5/6, Kategori III. Mavi ve beyaz, beden S–3XL, koli içi 40 adet. Kurumsal teklif alın.",
    "category": "Tek Kullanımlık Tulumlar",
    "description": "50 gr/m² SMS kumaştan nefes alabilir tek kullanımlık tulum. Tehlikeli tozlar ve sınırlı sıvı sıçramaları için Tip 5/6, KKD Kategori III; mavi ve beyaz renk seçeneği.",
    "koli": "40 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [
      "EN ISO 13982-1:2004+A1:2010 (Tip 5)",
      "EN 13034:2005+A1:2009 (Tip 6)",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Asbest azaltma ve denetimi, izolasyon, kömür tozu, gübre ve pestisit uygulaması (kuru/granül), genel endüstriyel temizlik, kurşun azaltma, makine bakımı, depolama, kireç işleme, metal parlatma, küf temizliği, tehlikeli olmayan aerosol ve sıvılar.",
    "badge": "SMS · Tip 5/6",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip 5/6, KKD Kategori III: tehlikeli tozlara ve sınırlı sıvı sıçramalarına karşı",
      "50 gr/m² SMS kumaş (spunbond-meltblown-spunbond PP): sağlam, az lifli",
      "Yüksek hava geçirgenliği; ısı stresini azaltan nefes alabilir yapı",
      "Elastik kapüşon, manşet, bel ve ayak bilekleri",
      "İç yüzü yapışkanlı fermuar kapağı; isteğe göre çift taraflı fermuar",
      "Mavi ve beyaz renk seçenekleri"
    ]
  },
  {
    "id": 29,
    "code": "T-300",
    "title": "FABA T-300 Tek Kullanımlık Tulum (30 gr SS Kumaş)",
    "seoTitle": "FABA T-300 Tek Kullanımlık Tulum (30 gr SS Kumaş)",
    "metaDescription": "FABA T-300 tek kullanımlık tulum: 30 gr SS kumaş; tehlikeli olmayan, minimum riskli işler için. Beden S–3XL, koli içi 60 adet. Kurumsal teklif alın.",
    "category": "Tek Kullanımlık Tulumlar",
    "description": "30 gr SS kumaştan, nefes alabilir tek kullanımlık tulum; tehlikeli olmayan, minimum riskli işler için. Toz veya sıvı sıçraması koruması (Tip 5/6) gerekiyorsa T-500 ya da T-530 seçilmelidir.",
    "koli": "60 Adet",
    "sizes": "S, M, L, XL, 2XL, 3XL",
    "standards": [],
    "applications": "Genel bakım ve onarım, otomotiv onarımları ve gıda işleme gibi tehlikeli olmayan, minimum riskli işler.",
    "badge": "Hafif İşler İçin",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tehlikeli olmayan, minimum riskli uygulamalar için üretilmiştir",
      "30 gr SS (spunbond) kumaş: hafif, nefes alabilir",
      "Elastik kapüşon, manşet, bel ve ayak bilekleri",
      "İsteğe göre çift taraflı fermuar",
      "Doğada çözünebilen ambalaj"
    ]
  },
  {
    "id": 30,
    "code": "LO-530",
    "title": "FABA LO-530 Fermuarlı Laboratuvar Önlüğü (55 gr/m²)",
    "seoTitle": "FABA LO-530 Fermuarlı Laboratuvar Önlüğü, Tip PB6-B",
    "metaDescription": "FABA LO-530 laboratuvar önlüğü: 55 gr/m² lamine, fermuarlı, iki cepli. Tip PB6-B, EN 14126, EN 1149-5; XS–2XL, koli içi 60 adet. Kurumsal teklif alın.",
    "category": "Önlük ve Laboratuvar Önlüğü",
    "description": "55 gr/m² lamine kumaştan, önden fermuarlı, iki cepli ve yakalı laboratuvar önlüğü. Tip PB6-B kısmi vücut koruması, EN 14126 ve EN 1149-5.",
    "koli": "60 Adet",
    "sizes": "XS, S, M, L, XL, 2XL",
    "standards": [
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç sanayi, olay yeri inceleme, veterinerlik, steril ortamlar, hafif endüstriyel temizlik ve makine bakımı, hafif kimyasallarla çalışma, hastane, klinik ve laboratuvarlar.",
    "badge": "Tip PB6-B · Fermuarlı",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "55 gr/m² lamine kumaş; hafif, tehlikeli olmayan sıvılara karşı koruma",
      "Tip PB6-B kısmi vücut koruması (EN 13034, EN 14126)",
      "EN 1149-5 antistatik",
      "Önden fermuarlı, yakalı, önde iki cep",
      "Lastikli kol ağızları",
      "Suyu ve bazı tehlikeli olmayan yağları iter"
    ]
  },
  {
    "id": 31,
    "code": "LO-531",
    "title": "FABA LO-531 Arkadan Bağlamalı Lamineli Önlük",
    "seoTitle": "FABA LO-531 Lamineli Koruyucu Önlük (Tip PB6-B)",
    "metaDescription": "FABA LO-531 lamineli koruyucu önlük: boyun askılı, arkadan bağlamalı. Tip PB6-B, EN 14126, EN 1149-5, Kat. III. Koli içi 240 adet. Kurumsal teklif alın.",
    "category": "Önlük ve Laboratuvar Önlüğü",
    "description": "Boyun askılı, arkadan bağlamalı lamineli önlük. Hafif, tehlikeli olmayan sıvılara karşı; Tip PB6-B, EN 14126 ve EN 1149-5.",
    "koli": "240 Adet",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Demir-çelik endüstrisi, metal işleri, otomotiv, kimya, inşaat ve sağlık sektörü.",
    "badge": "Tip PB6-B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Lamineli kumaş; hafif, tehlikeli olmayan sıvılara karşı koruma",
      "Tip PB6-B kısmi vücut koruması (EN 13034, EN 14126)",
      "EN 1149-5 antistatik",
      "Boyun askılı, belden arkadan bağlanır",
      "KKD Kategori III"
    ]
  },
  {
    "id": 32,
    "code": "LK-530",
    "title": "FABA LK-530 Lamineli Koruyucu Kolluk",
    "seoTitle": "FABA LK-530 Lamineli Kolluk, 50 cm (Tip PB6-B)",
    "metaDescription": "FABA LK-530 lamineli kolluk: 55 gr/m², iki ucu elastik, 50 cm. Tip PB6-B, EN 14126, EN 1149-5, Kategori III. Koli içi 720 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "55 gr/m² lamine kumaştan, iki ucu elastik 50 cm koruyucu kolluk. Tip PB6-B, EN 14126 ve EN 1149-5.",
    "koli": "720 Adet",
    "sizes": "Uzunluk 50 cm",
    "standards": [
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç sanayi, olay yeri inceleme, veterinerlik, steril ortamlar, hafif endüstriyel temizlik ve makine bakımı, hafif kimyasallarla çalışma, hastane, klinik ve laboratuvarlar.",
    "badge": "50 cm · Tip PB6-B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "55 gr/m² lamine kumaş; hafif, tehlikeli olmayan sıvılara karşı koruma",
      "Her iki ağız kısmı elastik",
      "50 cm uzunluk",
      "Tip PB6-B kısmi vücut koruması (EN 13034, EN 14126), EN 1149-5 antistatik",
      "Suyu ve bazı tehlikeli olmayan yağları iter"
    ]
  },
  {
    "id": 33,
    "code": "AG-530",
    "title": "FABA AG-530 Lamineli Kaymaz Ayakkabı Galoşu",
    "seoTitle": "FABA AG-530 Kaymaz Tabanlı Lamineli Ayakkabı Galoşu",
    "metaDescription": "FABA AG-530 kaymaz tabanlı ayakkabı galoşu: T-530 ile aynı 55 gr/m² kumaş, elastik ağız. Tip PB6-B, 18 × 35 cm, koli içi 500 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "Kaymaz tabanlı, ağzı elastik lamineli ayakkabı galoşu. Tip 5B/6B sertifikalı FABA T-530 ile aynı kumaştan ve aynı dikiş tekniğiyle üretilir.",
    "koli": "500 Adet",
    "sizes": "Yükseklik 18 cm, uzunluk 35 cm",
    "standards": [
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç sanayi, olay yeri inceleme, veterinerlik, steril ortamlar, hafif endüstriyel temizlik ve makine bakımı, hafif kimyasallarla çalışma, hastane, klinik ve laboratuvarlar.",
    "badge": "Kaymaz Taban",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "55 gr/m² lamine kumaş; T-530 tulumla aynı kumaş ve dikiş tekniği",
      "Kaymaz taban",
      "Ağız kısmı elastik",
      "Yükseklik 18 cm, uzunluk 35 cm",
      "Tip PB6-B (EN 13034, EN 14126), EN 1149-5 antistatik"
    ]
  },
  {
    "id": 34,
    "code": "LB-530",
    "title": "FABA LB-530 Lamineli Koruyucu Başlık (Kukuleta)",
    "seoTitle": "FABA LB-530 Lamineli Koruyucu Başlık (Kukuleta)",
    "metaDescription": "FABA LB-530 lamineli başlık (kukuleta): baş, boyun ve omuzları örter; elastik yüz açıklığı. Tip PB6-B, EN 14126, koli içi 200 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "Baş, boyun ve omuzları örten lamineli koruyucu başlık (kukuleta). 55 gr/m² kumaş, elastik yüz açıklığı; Tip PB6-B, EN 14126 ve EN 1149-5.",
    "koli": "200 Adet",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç sanayi, olay yeri inceleme, veterinerlik, steril ortamlar, hafif endüstriyel temizlik ve makine bakımı, hafif kimyasallarla çalışma, hastane, klinik ve laboratuvarlar.",
    "badge": "Tip PB6-B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "55 gr/m² lamine kumaş; hafif, tehlikeli olmayan sıvılara karşı koruma",
      "Baş, boyun ve omuzları örten pelerinli kesim",
      "Kapüşon (yüz açıklığı) kısmı elastik",
      "Tip PB6-B kısmi vücut koruması (EN 13034, EN 14126), EN 1149-5 antistatik",
      "Suyu ve bazı tehlikeli olmayan yağları iter"
    ]
  },
  {
    "id": 35,
    "code": "KK-800",
    "title": "FABA KK-800 TruChem Tip PB3-B/PB4-B Kimyasal Kolluk",
    "seoTitle": "FABA KK-800 Kimyasal Kolluk, Tip PB3-B/PB4-B, 50 cm",
    "metaDescription": "FABA TruChem KK-800 kimyasal kolluk: Tip PB3-B/PB4-B/PB6-B, bantlı dikiş, elastik başparmak halkası, 50 cm. Koli içi 320 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "Sarı TruChem kimyasal kolluk: tamamen sıvı geçirmez, bantlı dikiş, elastik başparmak halkası. Tip PB3-B/PB4-B/PB6-B; belirli bir kimyasala dayanımı teklif aşamasında teknik föyden doğrulayın.",
    "koli": "320 Adet",
    "sizes": "Uzunluk 50 cm",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip PB3-B)",
      "EN 14605:2005+A1:2009 (Tip PB4-B)",
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "EN 340:2003",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Biyolojik tehlikeler, kimyasal taşıma, dekontaminasyon, afet yönetimi, hastalık kontrolü, tank temizliği, petrokimya, petrol rafinerileri ve duruş (shutdown) bakımları.",
    "badge": "Tip PB3-B/PB4-B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip PB3-B/PB4-B/PB6-B kısmi vücut koruması (EN 14605, EN 13034, EN 14126)",
      "Tamamen sıvı geçirmez TruChem kumaş; dikişler kimyasal geçirmez bantla kapatılmış",
      "Elastik başparmak halkası eldivenle sabit bağlantı sağlar; diğer ucu elastik",
      "Petrol ürünleri, nitrik ve sülfürik asit gibi asitler, ince tozlar ve atık suya karşı",
      "50 cm uzunluk",
      "EN 1149-5 antistatik"
    ]
  },
  {
    "id": 36,
    "code": "KO-800",
    "title": "FABA KO-800 TruChem Tip PB3-B/PB4-B Kimyasal Önlük",
    "seoTitle": "FABA KO-800 TruChem Kimyasal Önlük, Tip PB3-B/PB4-B",
    "metaDescription": "FABA TruChem KO-800 kimyasal önlük: tamamen sıvı geçirmez, bantlı dikiş, Tip PB3-B/PB4-B/PB6-B, EN 1149-5. Koli içi 160 adet. Kurumsal teklif alın.",
    "category": "Önlük ve Laboratuvar Önlüğü",
    "description": "Sarı TruChem kimyasal önlük: tamamen sıvı geçirmez, dikişleri kimyasal geçirmez bantla kapatılmış. Tip PB3-B/PB4-B/PB6-B; belirli bir kimyasala dayanımı teklif aşamasında teknik föyden doğrulayın.",
    "koli": "160 Adet",
    "sizes": "Teklifte teyit edilir",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip PB3-B)",
      "EN 14605:2005+A1:2009 (Tip PB4-B)",
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "EN 340:2003",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Biyolojik tehlikeler, kimyasal taşıma, dekontaminasyon, afet yönetimi, hastalık kontrolü, tank temizliği, petrokimya, petrol rafinerileri ve duruş (shutdown) bakımları.",
    "badge": "Tip PB3-B/PB4-B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip PB3-B/PB4-B/PB6-B kısmi vücut koruması (EN 14605, EN 13034, EN 14126)",
      "Tamamen sıvı geçirmez TruChem kumaş; dikişler kimyasal geçirmez bantla kapatılmış",
      "Yüksek konsantrasyonlu kimyasallara, sıvı jetlerine ve enfektif ajanlara karşı bariyer",
      "Petrol ürünleri, nitrik ve sülfürik asit gibi asitler, ince tozlar ve atık suya karşı",
      "EN 1149-5 antistatik",
      "Boyun askılı önlük kesimi"
    ]
  },
  {
    "id": 37,
    "code": "BG-800",
    "title": "FABA BG-800 TruChem Tip PB3-B/PB4-B Kimyasal Bot Galoşu",
    "seoTitle": "FABA BG-800 Kimyasal Bot Galoşu, Tip PB3-B/PB4-B",
    "metaDescription": "FABA TruChem BG-800 kimyasal bot galoşu: Tip PB3-B/PB4-B/PB6-B, bantlı dikiş, kaymaz taban, bilekten bağcıklı. Koli içi 160 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "Sarı TruChem kimyasal bot galoşu: tamamen sıvı geçirmez, bantlı dikiş, kaymaz taban. Tip PB3-B/PB4-B/PB6-B; belirli bir kimyasala dayanımı teklif aşamasında teknik föyden doğrulayın.",
    "koli": "160 Adet",
    "sizes": "Yükseklik 48 cm, uzunluk 42 cm",
    "standards": [
      "EN 14605:2005+A1:2009 (Tip PB3-B)",
      "EN 14605:2005+A1:2009 (Tip PB4-B)",
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "EN 340:2003",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "Biyolojik tehlikeler, kimyasal taşıma, dekontaminasyon, afet yönetimi, hastalık kontrolü, tank temizliği, petrokimya, petrol rafinerileri ve duruş (shutdown) bakımları.",
    "badge": "Tip PB3-B/PB4-B",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Tip PB3-B/PB4-B/PB6-B kısmi vücut koruması (EN 14605, EN 13034, EN 14126)",
      "Tamamen sıvı geçirmez TruChem kumaş; dikişler kimyasal geçirmez bantla kapatılmış",
      "Kaymaz taban",
      "Ağız kısmı elastik, bilekten bağcıklı",
      "Yükseklik 48 cm, uzunluk 42 cm",
      "EN 1149-5 antistatik"
    ]
  },
  {
    "id": 38,
    "code": "BG-530",
    "title": "FABA BG-530 Lamineli Kaymaz Bot Galoşu",
    "seoTitle": "FABA BG-530 Lamineli Kaymaz Bot Galoşu (Tip PB6-B)",
    "metaDescription": "FABA BG-530 lamineli bot galoşu: T-530 ile aynı 55 gr/m² kumaş, kaymaz taban, bilekten bağcıklı, 48 cm. Tip PB6-B, koli içi 200 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "Kaymaz tabanlı, bilekten bağcıklı lamineli bot galoşu. Tip 5B/6B sertifikalı FABA T-530 ile aynı kumaştan ve dikiş tekniğiyle üretilir; 48 cm yükseklik.",
    "koli": "200 Adet",
    "sizes": "Yükseklik 48 cm, uzunluk 42 cm",
    "standards": [
      "EN 13034:2005+A1:2009 (Tip PB6-B)",
      "EN 14126:2003/AC:2004",
      "EN 1149-5:2018",
      "EN ISO 13688:2013/A1:2021",
      "KKD Yönetmeliği (AB) 2016/425 – Kategori III"
    ],
    "applications": "İlaç sanayi, olay yeri inceleme, veterinerlik, steril ortamlar, hafif endüstriyel temizlik ve makine bakımı, hafif kimyasallarla çalışma, hastane, klinik ve laboratuvarlar.",
    "badge": "Kaymaz Taban",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "55 gr/m² lamine kumaş; T-530 tulumla aynı kumaş ve dikiş tekniği",
      "Kaymaz taban",
      "Ağız kısmı elastik, bilekten bağcıklı",
      "Yükseklik 48 cm, uzunluk 42 cm",
      "Tip PB6-B (EN 13034, EN 14126), EN 1149-5 antistatik",
      "Suyu ve bazı tehlikeli olmayan yağları iter"
    ]
  },
  {
    "id": 39,
    "code": "BG-630",
    "title": "FABA BG-630 Dikiş Bantlı Kimyasal Bot Galoşu",
    "seoTitle": "FABA BG-630 Dikiş Bantlı Bot Galoşu (63 gr/m²)",
    "metaDescription": "FABA BG-630 bot galoşu: 63 gr/m² lamine, tüm dikişler bantlı, kaymaz taban, bilekten bağcıklı; T-630 tulumla set. Koli içi 200 adet. Kurumsal teklif alın.",
    "category": "Kolluk, Galoş ve Başlık",
    "description": "63 gr/m² lamine kumaştan, tüm dikişleri bantlı, kaymaz tabanlı bot galoşu. T-630 tulumla set olarak veya ayrı alınabilir; norm bilgisi teklifte teyit edilir.",
    "koli": "200 Adet",
    "sizes": "Yükseklik 48 cm, uzunluk 42 cm",
    "standards": [],
    "applications": "İlaç sanayi, veterinerlik, hafif endüstriyel temizlik ve makine bakımı, hafif kimyasallarla çalışma, hastane, klinik ve laboratuvarlar.",
    "badge": "Bantlı Dikiş",
    "origin": "Türkiye – FABA Kastamonu OSB tesisi",
    "items": [
      "Ekstra sağlamlık için 63 gr/m² lamine kumaş",
      "Tüm dikişlerin üzeri sızdırmaz bantla kapatılmış",
      "Kaymaz taban",
      "Ağız kısmı elastik, bilekten bağcıklı",
      "Yükseklik 48 cm, uzunluk 42 cm",
      "FABA T-630 tulumla set olarak veya ayrı satılır"
    ]
  }
];

export const PRODUCT_GROUPS: ProductGroup[] = RAW.map((p) => ({
  ...p,
  slug: slugify(p.title),
  image: `/images/products/faba_${p.id}.jpg`,
}));

/* ────────────────────────────────────────────────────────────────────────────
 * ERİŞİM YARDIMCILARI
 * ──────────────────────────────────────────────────────────────────────────── */

/** Güncel slug ile ürün bulur. */
export function getProduct(slug: string): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((p) => p.slug === slug);
}

export function getProductById(id: number): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((p) => p.id === id);
}

/** Ürün sayfası adresi: "/urunler/<slug>". */
export function productHref(product: Pick<ProductGroup, "slug">): string {
  return `/urunler/${product.slug}`;
}

/** Bir kategorideki ürünler (katalog sırasıyla). */
export function getProductsByCategory(category: CategoryName): ProductGroup[] {
  return PRODUCT_GROUPS.filter((p) => p.category === category);
}

/**
 * Eski (ilk yayındaki veya başlığı sonradan değişmiş) bir slug'ı güncel ürüne çözer.
 * Güncel slug verilirse undefined döner (yönlendirme gerekmez) — önce getProduct() deneyin.
 * Not: /urunler/<eski-slug> adresleri next.config.mjs → redirects() ile ZATEN 308 yönlendirilir
 * (aynı iki dosyadan üretilir). Bu fonksiyon çalışma anında gerekirse kullanılır
 * (ör. localStorage'daki eski teklif listesi öğelerini güncel ürüne eşlemek).
 */
export function resolveLegacySlug(slug: string): ProductGroup | undefined {
  if (!slug) return undefined;
  const hit = (id: number) => PRODUCT_GROUPS.find((p) => p.id === id && p.slug !== slug);
  for (const [id, old] of Object.entries(LEGACY_SLUGS)) {
    if (old === slug) return hit(Number(id));
  }
  for (const [id, olds] of Object.entries(LEGACY_SLUGS_EXTRA)) {
    if (olds.includes(slug)) return hit(Number(id));
  }
  return undefined;
}

/** Tüm eski slug'lar (generateStaticParams'a eklemek için). Güncel slug'larla çakışanlar hariç. */
export function getLegacySlugs(): string[] {
  const current = new Set(PRODUCT_GROUPS.map((p) => p.slug));
  const all = [...Object.values(LEGACY_SLUGS), ...Object.values(LEGACY_SLUGS_EXTRA).flat()];
  return Array.from(new Set(all)).filter((s) => !current.has(s));
}

/**
 * Benzer ürünler: aynı kategoride ürüne katalog sırasında EN YAKIN olanlar
 * (kendisi hariç; seçilenler katalog sırasıyla döner). Kategoride yeterli ürün yoksa
 * katalog sırasında en yakın kategorilerden tamamlanır.
 */
export function getRelated(product: ProductGroup, limit = 4): ProductGroup[] {
  if (limit <= 0) return [];
  const same = getProductsByCategory(product.category);
  const idx = same.findIndex((p) => p.id === product.id);
  const nearest = same
    .map((p, i) => ({ p, i, d: Math.abs(i - idx) }))
    .filter((x) => x.p.id !== product.id)
    // eşit uzaklıkta önce sonraki ürün
    .sort((a, b) => a.d - b.d || b.i - a.i)
    .slice(0, limit)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.p);

  if (nearest.length >= limit) return nearest;

  const catIdx = CATEGORIES.indexOf(product.category);
  const otherCats = CATEGORIES.map((c, i) => ({ c, i, d: Math.abs(i - catIdx) }))
    .filter((x) => x.c !== product.category)
    .sort((a, b) => a.d - b.d || b.i - a.i)
    .map((x) => x.c);

  const result = [...nearest];
  for (const cat of otherCats) {
    const pool = getProductsByCategory(cat);
    // önce öne çıkan ürün, sonra katalog sırası
    pool.sort((a, b) => Number(isFeatured(b.id)) - Number(isFeatured(a.id)));
    for (const p of pool) {
      if (result.length >= limit) return result;
      result.push(p);
    }
  }
  return result;
}

/* ────────────────────────────────────────────────────────────────────────────
 * KOLİ BİLGİSİ — "3 koli = 756 çift" gibi gerçek miktar çapası için
 * ──────────────────────────────────────────────────────────────────────────── */

export interface KoliInfo {
  /** Koli içi adet (ör. 252) */
  perCarton: number;
  /** Küçük harf birim: "çift" | "adet" */
  unit: string;
}

/** "252 Çift" → { perCarton: 252, unit: "çift" }; çözülemezse null. */
export function parseKoli(koli: string): KoliInfo | null {
  const m = /^\s*(\d[\d.]*)\s*([A-Za-zÇçĞğİıÖöŞşÜü]+)/.exec(koli);
  if (!m) return null;
  const perCarton = Number(m[1].replace(/\./g, ""));
  if (!Number.isFinite(perCarton) || perCarton <= 0) return null;
  return { perCarton, unit: m[2].toLocaleLowerCase("tr-TR") };
}

/** formatKoliTotal(p, 3) → "3 koli = 756 çift" (koli bilgisi yoksa null). */
export function formatKoliTotal(product: Pick<ProductGroup, "koli">, cartons: number): string | null {
  const info = parseKoli(product.koli);
  if (!info || !Number.isFinite(cartons) || cartons <= 0) return null;
  const total = (info.perCarton * cartons).toLocaleString("tr-TR");
  return `${cartons.toLocaleString("tr-TR")} koli = ${total} ${info.unit}`;
}

/* ────────────────────────────────────────────────────────────────────────────
 * ÖNE ÇIKAN ÜRÜNLER
 * Elle seçilmiş vitrin listesidir; satış verisine DAYANMAZ. Arayüzde "Öne çıkan" deyin,
 * "Çok satan / En çok satan" demeyin.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Ana sayfa ve vitrinlerde gösterilen ürünler (her kategoriden bir temsilci). */
export const FEATURED_IDS: readonly number[] = [1, 7, 12, 15, 22, 26, 30, 35];

export function isFeatured(id: number): boolean {
  return FEATURED_IDS.includes(id);
}

/** Öne çıkan ürünler, FEATURED_IDS sırasıyla. */
export function getFeaturedProducts(limit?: number): ProductGroup[] {
  const list = FEATURED_IDS.map((id) => getProductById(id)).filter((p): p is ProductGroup => Boolean(p));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/**
 * @deprecated Satış verisine dayanmıyor. FEATURED_IDS / getFeaturedProducts() kullanın.
 * Eski çağrılar bozulmasın diye ilk 6 öne çıkan ürünü içerir.
 */
export const BEST_SELLER_IDS: number[] = FEATURED_IDS.slice(0, 6);

/** @deprecated isFeatured() kullanın ve rozeti "Öne çıkan" olarak gösterin. */
export const isBestSeller = (id: number): boolean => BEST_SELLER_IDS.includes(id);
