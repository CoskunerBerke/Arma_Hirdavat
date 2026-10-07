/**
 * DEMO İÇERİK — Bu yorumlar örnek amaçlıdır.
 * Yayına almadan önce işletmenin gerçek Google yorumlarıyla değiştirilmelidir.
 * (Uydurma yorumların yayınlanması tüketiciyi yanıltır ve Google yönergelerine aykırıdır.)
 */
export interface Review {
  name: string;
  sector: string;
  comment: string;
}

export const REVIEWS: Review[] = [
  { name: "Murat K.", sector: "Fabrika bakım sorumlusu", comment: "Bağlantı elemanı ve el aleti ihtiyaçlarımızı tek noktadan karşılıyoruz. Acil durumlarda hızlı dönüş yapıyorlar." },
  { name: "Engin D.", sector: "Tersane", comment: "Çelik halat ve sapan tedariğinde ürün belgeleri eksiksiz geliyor. Uzun süredir sorunsuz çalışıyoruz." },
  { name: "Cemil Ö.", sector: "Talaşlı imalat atölyesi", comment: "Kılavuz, pafta ve matkap ucunda bulması zor ölçüleri bile temin edebiliyorlar. Teknik bilgileri güçlü." },
  { name: "Hakan Y.", sector: "İş sağlığı ve güvenliği", comment: "Maske, baret, iş ayakkabısı ve emniyet kemeri tedariğinde düzenli çalıştığımız firma." },
  { name: "Serkan A.", sector: "Kaynak atölyesi", comment: "Kaynak teli, taşlama diski ve gaz ekipmanlarında stokları dolu, ilgileri çok iyi." },
  { name: "Mustafa Ç.", sector: "Tesisat ve pompa", comment: "Pompa ve manometre gruplarında hem ürün hem teknik destek konusunda yardımcı oluyorlar." },
  { name: "Bülent V.", sector: "Satınalma", comment: "Teklif, faturalandırma ve online ödeme süreçleri pratik. Güler yüzlü ve profesyonel bir ekip." },
  { name: "Ali R.", sector: "Ağır vasıta servisi", comment: "Havalı el aletleri ve lokma takımlarımızı buradan aldık, satış sonrası da ilgileniyorlar." },
];
