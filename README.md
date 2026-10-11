# Arma Hırdavat – Kurumsal Web Sitesi (Demo)

**Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş.** için Next.js 14 ile hazırlanmış, çok sayfalı, SEO uyumlu kurumsal site.

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | Hero, kategori ızgarası, nasıl çalışır, öne çıkan ürünler, referanslar, Google yorum nehri, SSS |
| `/urunler` | FABA KKD kataloğu (39 ürün), arama (`?q=`) + kategori filtresi |
| `/kategori/[slug]` | 8 kategori açılış sayfası (karşılaştırma tablosu, SSS) |
| `/urunler/[slug]` | Her ürün için statik SEO sayfası; eski adresler kalıcı yönlenir (`data/legacy-slugs.ts`) |
| `/urun-gruplari` | Mağazadaki 30 teknik hırdavat ürün grubu (teklifle) |
| `/rehber`, `/rehber/[slug]` | EN 388, tulum tipleri, kaynakçı eldiveni, beden tablosu rehberleri |
| `/kurumsal`, `/markalar` | Hakkımızda, referanslar; çalışılan markalar |
| `/katalog` | PDF kataloglar (en yenisi üstte) |
| `/iletisim` | İletişim bilgileri, iletişim formu, harita |
| `/kvkk` | KVKK aydınlatma metni |

## Tasarım kararları

- **Tek tonlu lacivert tema**: Bölümler arasında beyaz/mavi zıplaması yok; tüm sayfalar aynı zemin ailesini kullanır.
- **Mavi = güven/yetkinlik** (Labrecque & Milne, 2012), **düşük doygunluk = sakin algı** (Valdez & Mehrabian, 1994).
- **Tek vurgu rengi** (logodaki sarıdan türetilmiş) yalnızca birincil eylem butonlarında — izolasyon (Von Restorff) etkisi.
- **Düşük görsel karmaşıklık** ilk izlenimde güzellik algısını artırır (Tuch vd., 2012).
- Metin renkleri WCAG 2.1 AA kontrastını sağlar; `prefers-reduced-motion` desteklenir.

## Notlar

- `data/reviews.ts` Google Haritalar işletme profilindeki gerçek yorumları ve puanı (`GOOGLE_RATING`) içerir.
  Yeni yorum geldikçe buraya ekleyin ve puan/yorum sayısını güncelleyin. Uydurma yorum eklenmez.
- **Telefon / faks / WhatsApp:** `data/company.ts` içindeki numaralar geçicidir. Doğru numaraları yazıp
  `CONTACT_NUMBERS_VERIFIED = true` yapın; arama ve WhatsApp butonları ile yapısal verideki telefon o zaman görünür.
- Teklif ve iletişim formları `/api/teklif` uç noktasına gönderilir (kurulum aşağıda). E-posta servisi
  kurulmamışsa form, talebi kullanıcının e-posta uygulamasında hazır taslak olarak açmayı önerir.
- Site adresi, indeksleme, iletişim bilgileri ve verilen sözler tek kaynaktan gelir: `data/company.ts`.
  Preview / localhost derlemeleri `noindex` olarak yayınlanır; yalnızca production indekslenir.

## Teklif formu e-posta kurulumu

Form talepleri [Resend](https://resend.com) üzerinden `bilgi@armahirdavat.com.tr` adresine e-posta olarak gelir.
Müşteriye "Yanıtla" dediğinizde yanıt doğrudan müşterinin e-postasına gider.

1. **Resend hesabı açın:** resend.com adresinde **bilgi@armahirdavat.com.tr** e-postasıyla ücretsiz hesap oluşturun
   ve e-postanızı doğrulayın. (Alan adı doğrulanmadan Resend yalnızca hesap sahibinin adresine gönderim yapar;
   bu yüzden hesap bu adresle açılmalıdır.)
2. **API anahtarı oluşturun:** Resend panelinde *API Keys → Create API Key* (yetki: *Sending access*). Anahtarı kopyalayın.
3. **Vercel'e ekleyin:** Vercel → proje → *Settings → Environment Variables* →
   `RESEND_API_KEY` = kopyaladığınız anahtar (Production ve Preview işaretli).
4. **Yeniden yayınlayın:** *Deployments* → son deploy → *Redeploy*. Ortam değişkenleri yalnızca yeni deploy'da etkinleşir.
5. **Deneyin:** sitede küçük bir teklif talebi gönderin; e-posta birkaç saniye içinde gelmelidir
   (ilk e-postalar gereksiz/spam klasörüne düşebilir).

İsteğe bağlı ortam değişkenleri:

| Değişken | Açıklama |
| --- | --- |
| `LEAD_TO_EMAIL` | Taleplerin gideceği adres(ler); virgülle birden fazla yazılabilir. Varsayılan: `bilgi@armahirdavat.com.tr` |
| `LEAD_FROM_EMAIL` | Gönderen adı/adresi. Varsayılan: `Arma Hırdavat Web <onboarding@resend.dev>` |
| `LEAD_WEBHOOK_URL` | Yedek kanal: her talep JSON olarak bu adrese de gönderilir (ör. Make/Zapier/Google Sheets otomasyonu) |
| `LEAD_WEBHOOK_SECRET` | Webhook isteğine `Authorization: Bearer <değer>` başlığı eklenir |
| `DISABLE_VERCEL_HOST_REDIRECT` | `1` yapılırsa production'da `*.vercel.app` → özel alan adı yönlendirmesi kapanır |

**Alan adı doğrulama (isteğe bağlı, önerilir):** Resend → *Domains → Add Domain* → `armahirdavat.com.tr`.
Verilen DNS kayıtlarını (SPF/DKIM) alan adının DNS yönetimine ekleyin. Doğrulandıktan sonra
`LEAD_FROM_EMAIL` = `Arma Hırdavat Web <teklif@armahirdavat.com.tr>` yapıp yeniden yayınlayın; e-postalar
spam'e daha az düşer ve birden fazla alıcıya gönderim mümkün olur.

`RESEND_API_KEY` ve `LEAD_WEBHOOK_URL` ikisi de tanımlı değilse form "e-posta ile gönder" yedeğini gösterir;
hiçbir talep kaybolmaz ama otomatik e-posta da gitmez.

## Alan adı geçişi (armahirdavat.com.tr)

- Vercel'e özel alan adı eklendiğinde production derlemesi `*.vercel.app` adreslerini kalıcı olarak alan adına
  yönlendirir. Alan adını Vercel'e eklemeden önce DNS kayıtlarını (A / CNAME) Vercel'e yöneltmeye hazır olun;
  aksi hâlde ziyaretçiler hâlâ eski siteye gider. Gerekirse `DISABLE_VERCEL_HOST_REDIRECT=1` ile geçici olarak kapatın.
- Eski ASP sitesinin adresleri (`/default.asp`, `/arma-hakkinda.asp` …) yeni sayfalara kalıcı yönlendirilir (`next.config.mjs`).
- E-posta (MX), SPF/DKIM ve `odeme.` alt alan adı kayıtlarına dokunmayın; yalnızca `@` ve `www` kayıtları değişir.

## Kataloglar (yeni katalog ekleme)

1. PDF'i `public/catalogs/` klasörüne kopyalayın. Dosya adında Türkçe karakter ve boşluk kullanmayın
   (ör. `FABA-Katalog-2027.pdf`). Var olan bir dosyanın **üzerine yazmayın**, yeni ad verin.
2. 15 MB'tan büyükse web için sıkıştırın (metin ve sayfa düzeni korunur):

   ```bash
   python -c "import pymupdf,sys; d=pymupdf.open(sys.argv[1]); d.rewrite_images(dpi_threshold=200, dpi_target=150, quality=75); d.save(sys.argv[2], garbage=4, deflate=True)" kaynak.pdf public/catalogs/YENI-KATALOG.pdf
   ```
3. `data/catalogs.ts` içindeki `CATALOG_LIST` dizisine bir kayıt ekleyin (id, marka, başlık, açıklama,
   `publishedAt`, boyut, sayfa sayısı, `url`, `fileName`; isteğe bağlı `chapters`).
   En yeni `publishedAt` tarihli katalog `/katalog` sayfasında öne çıkar ve ürün sayfalarındaki
   "Kataloğu indir" bağlantısı otomatik olarak ona döner. Eski kataloglar "Diğer kataloglar" altında listelenir.
4. Yeni katalog ürün bilgilerini (EN kodları, koli içi adet, beden) değiştiriyorsa `data/products.ts` de güncellenmelidir;
   site ürün verisinin kaynağı en güncel katalogdur.

## Görsel ve video dosyaları

`/images` ve `/videos` altındaki dosyalar tarayıcıda 1 yıl önbelleklenir. Bir dosyayı güncellerken
**aynı adla üzerine yazmayın**; yeni bir ad verin (ör. `hero-drone-v2.mp4`) ve koddaki referansı güncelleyin.

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Vercel'de GitHub reposunu içe aktarmak yeterlidir (Next.js otomatik algılanır).
