# Arma Hırdavat – Kurumsal Web Sitesi (Demo)

**Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş.** için Next.js 14 ile hazırlanmış, çok sayfalı, SEO uyumlu kurumsal site.

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | Sahne (scene) hero, 6 ürün grubu önizlemesi, değer önerisi, yorum nehri |
| `/urunler` | 30 ürün grubu, arama + kategori filtresi |
| `/urunler/[slug]` | Her ürün grubu için ayrı, statik üretilen SEO sayfası (30 adet) |
| `/kurumsal` | Hakkımızda, misyon & vizyon, insan kaynakları |
| `/markalar` | Ürün gamındaki markalar |
| `/katalog` | PDF kataloglar |
| `/iletisim` | Bize Ulaşın: iletişim bilgileri, teklif formu, harita |

## Tasarım kararları

- **Tek tonlu lacivert tema**: Bölümler arasında beyaz/mavi zıplaması yok; tüm sayfalar aynı zemin ailesini kullanır.
- **Mavi = güven/yetkinlik** (Labrecque & Milne, 2012), **düşük doygunluk = sakin algı** (Valdez & Mehrabian, 1994).
- **Tek vurgu rengi** (logodaki sarıdan türetilmiş) yalnızca birincil eylem butonlarında — izolasyon (Von Restorff) etkisi.
- **Düşük görsel karmaşıklık** ilk izlenimde güzellik algısını artırır (Tuch vd., 2012).
- Metin renkleri WCAG 2.1 AA kontrastını sağlar; `prefers-reduced-motion` desteklenir.

## Demo notları

- `data/reviews.ts` içindeki yorumlar **örnek** içeriktir; yayından önce gerçek Google yorumlarıyla değiştirilmelidir.
- Teklif formu sunucusuzdur; kullanıcının e-posta uygulamasında hazır bir taslak açar.
- Canonical adresler `NEXT_PUBLIC_SITE_URL` (varsayılan `https://armahirdavat.com.tr`) üzerinden üretilir.

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Vercel'de GitHub reposunu içe aktarmak yeterlidir (Next.js otomatik algılanır).
