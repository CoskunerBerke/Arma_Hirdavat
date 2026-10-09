import type { Metadata } from "next";
import {
  Building2,
  Compass,
  ExternalLink,
  GraduationCap,
  LineChart,
  MapPin,
  Navigation,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import ClientLogos from "@/components/ClientLogos";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Kurumsal – Sanayi ve Fabrika Malzemeleri B2B Tedarikçisi | Arma Hırdavat",
  description: "Arma Fabrika Malzemeleri Teknik Hırdavat: Samsun merkez lojistik depomuzdan Türkiye'nin önde gelen organize sanayi bölgelerine, fabrikalara ve şantiyelere toptan teknik hırdavat ve endüstriyel sarf malzemesi tedariği.",
  alternates: { canonical: "/kurumsal" },
};

const HR = [
  { icon: GraduationCap, title: "Eğitim yönetimi", text: "İşin gerektirdiği mesleki yetkinlikler, kurum kültürü ve kişisel eğitim ihtiyaçları planlanarak kısa ve uzun vadeli hedeflerimize ulaşmamızı sağlayan yetkin çalışanlara sahip oluruz." },
  { icon: Target, title: "Hedeflerle yönetim", text: "Kurum hedefleri tüm çalışanlarla paylaşılır; buna uygun departman ve bireysel hedefler belirlenerek yıllık iş planları doğrultusunda çalışılır." },
  { icon: LineChart, title: "Performans yönetimi", text: "Yılda bir kez çalışanların performansları değerlendirilerek iyileştirme ve geliştirme planları yapılır." },
  { icon: UserCheck, title: "İşe alım yönetimi", text: "Kadro ve personel planlaması iş hedeflerimizden yola çıkılarak yapılır. Yeni çalışanlarımız için yerleştirme programları uygulanır; gizlilik ve tüm başvurulara yanıt vermek temel prensibimizdir." },
  { icon: Users, title: "Çalışan memnuniyeti", text: "Yılda bir kez düzenlenen anketle çalışanlarımızın görüşleri alınır; geliştirilmesi gereken yönler için aksiyon planı hazırlanır." },
  { icon: Compass, title: "Ücret yönetimi", text: "Yılda 12 maaş ödenir. Satış ekibi için satış primi, yöneticiler için şirket performansına bağlı prim sistemi uygulanabilir; ücret ayarlaması yılda bir kez ocak ayında yapılır." },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title="Türkiye Sanayisinin Güvenilir Tedarik Ortağı"
        description="Samsun lojistik depomuzdan organize sanayi bölgelerine, fabrikalara ve ağır sanayi şantiyelerine koli ve palet bazında toptan teknik hırdavat tedariği sağlıyoruz."
        crumbs={[{ label: "Kurumsal", href: "/kurumsal" }]}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-brand">
                <Building2 className="h-3.5 w-3.5" /> Tekkeköy Ana Lojistik Deposu
              </span>
              <h2 className="mt-2.5 text-2xl font-black tracking-tight text-ink sm:text-3xl">Hakkımızda</h2>
              <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                Ağır sanayi tesislerinin, organize sanayi bölgelerinin ve üretim hatlarının kesintisiz teknik hırdavat ve tesis malzemesi tedarikçisi.
              </p>
            </div>

            {/* Operasyonel B2B Metrikleri */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-slate-50/70 p-3.5">
                <span className="text-xl font-black text-ink">10.000+</span>
                <span className="block text-[11px] font-medium text-ink-muted mt-0.5">Raf Hazır Stok Kalemi</span>
              </div>
              <div className="rounded-2xl border border-line bg-slate-50/70 p-3.5">
                <span className="text-xl font-black text-ink">30+</span>
                <span className="block text-[11px] font-medium text-ink-muted mt-0.5">Teknik Malzeme Grubu</span>
              </div>
              <div className="rounded-2xl border border-line bg-slate-50/70 p-3.5">
                <span className="text-xl font-black text-brand">Tüm OSB</span>
                <span className="block text-[11px] font-medium text-ink-muted mt-0.5">Doğrudan Ambar Ağı</span>
              </div>
              <div className="rounded-2xl border border-line bg-slate-50/70 p-3.5">
                <span className="text-xl font-black text-action">Palet & Koli</span>
                <span className="block text-[11px] font-medium text-ink-muted mt-0.5">Endüstriyel Sevk</span>
              </div>
            </div>

            {/* Google Haritalar & Tekkeköy Merkez Depo Konum Kartı */}
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div className="relative h-44 w-full bg-slate-100">
                <iframe
                  src={COMPANY.mapEmbed}
                  title="Arma Hırdavat Tekkeköy Merkez Depo Konumu"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
              <div className="p-3.5 bg-slate-50/70 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-tight">
                    <strong className="font-bold text-ink block">Tekkeköy Merkez Depo</strong>
                    <span className="text-ink-muted">{COMPANY.address.district} / {COMPANY.address.city}</span>
                  </div>
                </div>
                <a
                  href={COMPANY.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-line px-3 py-1.5 text-xs font-bold text-brand hover:border-brand shadow-2xs transition-colors shrink-0"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Yol Tarifi Al</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-5 text-[17px] leading-[1.75] text-ink-soft lg:col-span-7" delay={60}>
            <p>
              <strong className="font-semibold text-ink">{COMPANY.legalName}</strong>, Samsun Tekkeköy&apos;deki ana merkez ve lojistik tesislerinden organize sanayi bölgelerine, üretim fabrikalarına, imalat atölyelerine ve büyük altyapı projelerine toptan teknik hırdavat ve tesis donanımları tedarik etmektedir.
            </p>
            <p>
              Civata, somun, vida ve bağlantı elemanlarından çelik halata, el ve elektrikli aletlerden kaynak makinelerine, iş güvenliği donanımlarından endüstriyel pompa ve pnömatik sistemlere kadar 30 ana ürün grubunda; koli ve palet bazlı toptan alımlarda doğrudan ambar ve lojistik sevkiyatı yapıyoruz.
            </p>
            <p>
              Güçlü stok yapımız, rekabetçi toptan fiyatlandırmamız ve anlaşmalı sanayi ambarı ağımız ile Marmara&apos;dan İç Anadolu&apos;ya, Ege&apos;den Güneydoğu&apos;ya Türkiye genelindeki tüm sanayi havzalarına kesintisiz tedarik desteği sunuyoruz.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Referanslarımız & Çalıştığımız Sanayi Devleri */}
      <ClientLogos />

      <section className="section border-y border-line bg-white">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <Reveal className="surface p-8">
            <p className="eyebrow">Misyon</p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Türkiye genelindeki tüm sanayi tesislerinin, organize sanayi bölgelerindeki fabrikaların ve şantiyelerin ihtiyaç duyduğu teknik hırdavat ve ekipmanı doğrudan koli/palet bazında, rekabetçi toptan fiyatlar ve güvenilir ambar teslimatıyla eksiksiz sağlamak.
            </p>
          </Reveal>
          <Reveal className="surface p-8" delay={80}>
            <p className="eyebrow">Vizyon</p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Türkiye genelinde sanayi, imalat ve inşaat sektörünün koli ve palet bazlı toptan teknik donanım alımlarında güvenle tercih ettiği, süratli ve öncü kurumsal tedarik ortağı olmak.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="insan-kaynaklari">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">İnsan kaynakları</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Ekibimize katılın</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              İnsan kaynakları politikamız; misyon ve vizyonumuz doğrultusunda nitelikli insan gücü alımını gerçekleştirmek, çalışanlarımızın etkin ve verimli olabileceği uyumlu bir iş ortamı oluşturmaktır. Eğitime ve gelişime açık, motivasyonu ve kurum aidiyeti yüksek çalışanlara sahip olma ilkesini benimsiyoruz.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HR.map((h, i) => (
              <Reveal key={h.title} delay={(i % 3) * 70} className="surface p-6">
                <h.icon className="h-5 w-5 text-brand" aria-hidden />
                <h3 className="mt-4 text-base font-semibold text-ink">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{h.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("İş başvurusu")}`} className="btn-ghost">
              Özgeçmişinizi gönderin: {COMPANY.email}
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
