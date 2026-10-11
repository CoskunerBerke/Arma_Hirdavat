import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import { COMPANY, IS_INDEXABLE, SITE_URL, mailtoHref } from "@/data/company";

/*
 * KVKK AYDINLATMA METNİ (6698 sayılı Kanun md. 10)
 * Bu metin genel bilgilendirme amaçlıdır; yayından önce hukuk danışmanınıza kontrol ettiriniz.
 * (Aynı not yalnızca indekslenmeyen önizleme / yerel sürümlerde sayfanın altında görünür.)
 */

const PATH = "/kvkk";
const TITLE = "KVKK Aydınlatma Metni";
const DESCRIPTION =
  "Teklif ve iletişim formlarında işlenen kişisel veriler, işleme amaçları, hukuki sebepler, aktarım ve 6698 sayılı KVKK md. 11 kapsamındaki haklarınız.";
/** Metnin yayımlandığı / son güncellendiği tarih — metin değişirse güncelleyin. */
const LAST_UPDATED = "11 Ekim 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: COMPANY.name,
    url: PATH,
    title: `${TITLE} | ${COMPANY.name}`,
    description: DESCRIPTION,
    images: [{ url: "/og/arma-og.png", width: 1200, height: 630, alt: `${COMPANY.name} – KVKK aydınlatma metni` }],
  },
};

const DATA_CATEGORIES: { name: string; detail: string }[] = [
  { name: "Kimlik", detail: "Ad, soyad." },
  { name: "İletişim", detail: "E-posta adresi, telefon numarası, teslimat ili veya adresi." },
  { name: "Firma ve görev bilgisi", detail: "Firma veya kurum unvanı, göreviniz, sektörünüz." },
  {
    name: "Talep içeriği",
    detail: "Teklif listesindeki ürünler, adet ve ambalaj tercihleri, mesajınız ve yazışmalarımız.",
  },
  {
    name: "İşlem güvenliği",
    detail: "IP adresi, tarih ve saat bilgisi, tarayıcı bilgisi gibi sunucu ve güvenlik kayıtları.",
  },
];

const RIGHTS = [
  "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
  "İşlenmişse buna ilişkin bilgi talep etme,",
  "İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,",
  "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
  "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
  "Kanun'un 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
  "Düzeltme, silme ve yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
  "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,",
  "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
];

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 pt-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">
      {children}
    </h2>
  );
}

export default function KvkkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${PATH}#webpage`,
    url: `${SITE_URL}${PATH}`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#store` },
  };

  const link = "font-medium text-brand underline-offset-2 hover:underline";

  return (
    <>
      <PageHero
        eyebrow="Yasal bilgilendirme"
        title="KVKK Aydınlatma Metni"
        description="Teklif ve iletişim talepleriniz sırasında paylaştığınız kişisel verileri nasıl işlediğimizi ve haklarınızı bu sayfada bulabilirsiniz."
        crumbs={[{ label: "KVKK Aydınlatma Metni", href: PATH }]}
      />

      <article className="section pt-10 sm:pt-14">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-[1.75] text-ink-soft">
            <p className="text-sm text-ink-muted">Son güncelleme: {LAST_UPDATED}</p>

            <p>
              Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) md. 10 uyarınca,
              internet sitemiz, e-posta ve mağazamız üzerinden ilettiğiniz teklif ve iletişim talepleri kapsamında işlenen
              kişisel verileriniz hakkında sizi bilgilendirmek için hazırlanmıştır.
            </p>

            <nav aria-label="Metin bölümleri" className="rounded-2xl border border-line bg-white p-5 text-sm">
              <ol className="grid list-decimal gap-1.5 pl-5 sm:grid-cols-2">
                <li><a href="#veri-sorumlusu" className={link}>Veri sorumlusu</a></li>
                <li><a href="#islenen-veriler" className={link}>İşlenen kişisel veriler</a></li>
                <li><a href="#amaclar" className={link}>İşleme amaçları</a></li>
                <li><a href="#hukuki-sebepler" className={link}>Toplama yöntemi ve hukuki sebepler</a></li>
                <li><a href="#aktarim" className={link}>Aktarım</a></li>
                <li><a href="#saklama" className={link}>Saklama süresi</a></li>
                <li><a href="#haklariniz" className={link}>Haklarınız ve başvuru</a></li>
                <li><a href="#cerezler" className={link}>Çerezler ve yerel depolama</a></li>
              </ol>
            </nav>

            <H2 id="veri-sorumlusu">1. Veri sorumlusu</H2>
            <dl className="grid gap-x-4 gap-y-1 rounded-2xl border border-line bg-white p-5 text-sm sm:grid-cols-[8rem_1fr]">
              <dt className="font-medium text-ink-muted">Unvan</dt>
              <dd className="text-ink">{COMPANY.legalName}</dd>
              <dt className="mt-2 font-medium text-ink-muted sm:mt-0">Adres</dt>
              <dd className="text-ink">
                {COMPANY.address.street} {COMPANY.address.postalCode} {COMPANY.address.district} / {COMPANY.address.city}
              </dd>
              <dt className="mt-2 font-medium text-ink-muted sm:mt-0">E-posta</dt>
              <dd>
                <a href={mailtoHref("KVKK başvurusu")} className={link}>
                  {COMPANY.email}
                </a>
              </dd>
            </dl>

            <H2 id="islenen-veriler">2. İşlenen kişisel veriler</H2>
            <p>Formlarda doldurduğunuz alanlara bağlı olarak aşağıdaki veriler işlenebilir:</p>
            <ul className="space-y-2">
              {DATA_CATEGORIES.map((d) => (
                <li key={d.name} className="flex gap-2">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    <strong className="font-semibold text-ink">{d.name}:</strong> {d.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p>Formlarda özel nitelikli kişisel veri (sağlık, din, biyometrik veri vb.) istemiyoruz; lütfen paylaşmayınız.</p>

            <H2 id="amaclar">3. İşleme amaçları</H2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Teklif, bilgi ve iletişim taleplerinizi almak, değerlendirmek ve yanıtlamak,</li>
              <li>Teklif hazırlama, satış, faturalandırma, tahsilat ve sevkiyat süreçlerini yürütmek,</li>
              <li>Satış sonrası destek ve talep takibini sağlamak,</li>
              <li>Mevzuattan doğan yükümlülükleri (ör. ticari ve vergi kayıtları) yerine getirmek,</li>
              <li>Bilgi güvenliğini sağlamak, istenmeyen ve otomatik (spam) gönderimleri önlemek.</li>
            </ul>
            <p>
              Talebiniz dışında pazarlama amaçlı ileti göndermek için ayrıca onayınızı alırız; onay vermemeniz teklif
              talebinizi etkilemez.
            </p>

            <H2 id="hukuki-sebepler">4. Toplama yöntemi ve hukuki sebepler</H2>
            <p>
              Kişisel verileriniz; internet sitemizdeki teklif ve iletişim formları, e-posta, telefon ve mağazamız aracılığıyla,
              kısmen otomatik ve otomatik olmayan yollarla toplanır. Verileriniz KVKK md. 5/2 kapsamında şu hukuki sebeplere
              dayanılarak işlenir:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong className="font-semibold text-ink">md. 5/2-c:</strong> Bir sözleşmenin kurulması veya ifasıyla doğrudan
                ilgili olması (teklif talebi ve sipariş süreçleri),
              </li>
              <li>
                <strong className="font-semibold text-ink">md. 5/2-ç:</strong> Veri sorumlusunun hukuki yükümlülüğünü yerine
                getirebilmesi (fatura, ticari defter ve vergi kayıtları),
              </li>
              <li>
                <strong className="font-semibold text-ink">md. 5/2-f:</strong> İlgili kişinin temel hak ve özgürlüklerine zarar
                vermemek kaydıyla veri sorumlusunun meşru menfaati (talep takibi, bilgi güvenliği ve kötüye kullanımın önlenmesi).
              </li>
            </ul>

            <H2 id="aktarim">5. Kişisel verilerin aktarılması</H2>
            <p>Kişisel verileriniz yalnızca yukarıdaki amaçlar için ve gerektiği ölçüde şu alıcılara aktarılabilir:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong className="font-semibold text-ink">Hizmet sağlayıcılar:</strong> İnternet sitesinin barındırma
                hizmeti ve form bildirimlerini ileten e-posta altyapı sağlayıcısı. Bu sağlayıcıların sunucuları yurt dışında
                bulunabileceğinden, aktarım KVKK md. 9&apos;da öngörülen şartlara uygun olarak yapılır.
              </li>
              <li>
                <strong className="font-semibold text-ink">Kargo ve ambar firmaları:</strong> Sipariş verdiğinizde, teslimat
                için gerekli ad, telefon ve adres bilgileri.
              </li>
              <li>
                <strong className="font-semibold text-ink">Bankalar ve ödeme kuruluşları:</strong> Tahsilat işlemleri için
                gerekli bilgiler.
              </li>
              <li>
                <strong className="font-semibold text-ink">Yetkili kamu kurum ve kuruluşları ile mali müşavir:</strong> Hukuki
                yükümlülükler kapsamında ve talep edilmesi hâlinde.
              </li>
            </ul>

            <H2 id="saklama">6. Saklama süresi</H2>
            <p>
              Satışa dönüşmeyen teklif ve iletişim talepleri, talebin sonuçlanmasından sonra ticari ilişkinin gerektirdiği makul
              süre boyunca saklanır. Satışa dönüşen işlemlere ait kayıtlar, Türk Ticaret Kanunu ve vergi mevzuatında öngörülen
              süreler (ticari defter ve belgeler için 10 yıl) boyunca saklanır. Süre dolduğunda veriler silinir, yok edilir veya
              anonim hâle getirilir.
            </p>

            <H2 id="haklariniz">7. Haklarınız ve başvuru yolu</H2>
            <p>KVKK md. 11 uyarınca veri sorumlusuna başvurarak:</p>
            <ol className="list-[lower-alpha] space-y-1.5 pl-6">
              {RIGHTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
            <p>haklarına sahipsiniz.</p>
            <p>
              Başvurunuzu, kimliğinizi doğrulayan bilgilerle (ad, soyad, T.C. kimlik numarası veya yabancılar için uyruk ve
              pasaport numarası, adres, e-posta veya telefon) ve talebinizi açıkça belirterek;
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                Islak imzalı dilekçeyle posta veya elden: {COMPANY.address.full} adresine,
              </li>
              <li>
                Sistemimizde kayıtlı e-posta adresinizden veya güvenli elektronik imza / mobil imza ile{" "}
                <a href={mailtoHref("KVKK başvurusu")} className={link}>
                  {COMPANY.email}
                </a>{" "}
                adresine
              </li>
            </ul>
            <p>
              iletebilirsiniz. Başvurular, niteliğine göre en kısa sürede ve en geç 30 gün içinde ücretsiz sonuçlandırılır.
              İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret
              alınabilir. Başvurunuzun reddedilmesi, yanıtı yetersiz bulmanız veya süresinde yanıt verilmemesi hâlinde KVKK md.
              14 uyarınca Kişisel Verileri Koruma Kurulu&apos;na şikâyette bulunabilirsiniz.
            </p>

            <H2 id="cerezler">8. Çerezler ve yerel depolama</H2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Sitemiz reklam veya pazarlama çerezi kullanmaz.</li>
              <li>
                Teklif listeniz yalnızca tarayıcınızın yerel depolamasında (localStorage) tutulur ve siz formu gönderene kadar
                bize iletilmez. Listeyi temizleyerek veya tarayıcı verilerini silerek kaldırabilirsiniz.
              </li>
              <li>
                Ziyaretçi sayıları ve sayfa performansı, çerez kullanmayan bir analiz hizmetiyle toplu ve kimliksiz olarak ölçülür.
              </li>
              <li>
                Harita yalnızca &quot;Haritayı göster&quot;e tıkladığınızda Google Haritalar&apos;dan yüklenir; bu durumda
                Google kendi çerezlerini kullanabilir.
              </li>
            </ul>

            {!IS_INDEXABLE && (
              <p className="mt-10 border-t border-line pt-4 text-xs text-ink-muted">
                Önizleme notu (yayında görünmez): Bu metin genel bilgilendirme amaçlıdır; yayından önce hukuk danışmanınıza
                kontrol ettiriniz.
              </p>
            )}
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
