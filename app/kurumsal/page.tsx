import type { Metadata } from "next";
import { Compass, GraduationCap, LineChart, Target, UserCheck, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Kurumsal – Hakkımızda, Misyon, Vizyon ve İnsan Kaynakları",
  description: "Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş. hakkında: Samsun Tekkeköy'de sanayiye teknik hırdavat tedariği, misyonumuz, vizyonumuz ve insan kaynakları politikamız.",
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
        title="Sanayinin güvenilir tedarik ortağı"
        description={COMPANY.description}
        crumbs={[{ label: "Kurumsal", href: "/kurumsal" }]}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Hakkımızda</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[17px] leading-[1.75] text-fg-soft lg:col-span-7" delay={60}>
            <p>
              <strong className="font-semibold text-white">{COMPANY.legalName}</strong>, Samsun Tekkeköy&apos;de fabrika malzemeleri ve teknik hırdavat alanında hizmet vermektedir.
            </p>
            <p>
              Bağlantı elemanlarından çelik halata, el ve elektrikli aletlerden kaynak makinelerine, iş güvenliği ekipmanlarından pompa ve pnömatik ürünlere kadar 30 ürün grubunda sanayi kuruluşlarının, atölyelerin ve şantiyelerin ihtiyaçlarını karşılıyoruz.
            </p>
            <p>Her geçen gün ürün gruplarımıza yeni markalar ve ürünler ekliyoruz.</p>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-white/[0.06] bg-ink-950/40">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <Reveal className="surface p-8">
            <p className="eyebrow">Misyon</p>
            <p className="mt-4 text-lg leading-relaxed text-fg">
              Sanayi tesislerinin, atölyelerin ve projelerin ihtiyaç duyduğu teknik hırdavat ve ekipmanı doğru ürün, doğru fiyat ve zamanında teslimatla sağlamak.
            </p>
          </Reveal>
          <Reveal className="surface p-8" delay={80}>
            <p className="eyebrow">Vizyon</p>
            <p className="mt-4 text-lg leading-relaxed text-fg">
              Samsun ve Karadeniz bölgesinde sanayinin ilk akla gelen, güvenilir tedarik ortağı olmak.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="insan-kaynaklari">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">İnsan kaynakları</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">Ekibimize katılın</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-fg-soft">
              İnsan kaynakları politikamız; misyon ve vizyonumuz doğrultusunda nitelikli insan gücü alımını gerçekleştirmek, çalışanlarımızın etkin ve verimli olabileceği uyumlu bir iş ortamı oluşturmaktır. Eğitime ve gelişime açık, motivasyonu ve kurum aidiyeti yüksek çalışanlara sahip olma ilkesini benimsiyoruz.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HR.map((h, i) => (
              <Reveal key={h.title} delay={(i % 3) * 70} className="surface p-6">
                <h.icon className="h-5 w-5 text-brand-soft" aria-hidden />
                <h3 className="mt-4 text-base font-semibold text-white">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-soft">{h.text}</p>
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
