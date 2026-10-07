import React from "react";
import { CheckCircle2, ShieldCheck, Truck, Users, Target, Compass } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export default function AboutSection() {
  return (
    <section id="hakkimizda" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol Kolon: Kurumsal Hikaye ve Vizyon */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-arma-blue text-xs font-bold uppercase tracking-wider mb-3">
              Kurumsal Kimliğimiz
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight leading-tight">
              Samsun Sanayisinin Gücüne Güç Katan <span className="text-arma-blue">Çözüm Ortağınız</span>
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>{COMPANY_INFO.name}</strong>, kurulduğu ilk günden bu yana dürüstlük, kalite ve yüksek stok gücü ilkeleriyle sanayimizin yanında yer almaktadır. 
              Tekkeköy merkezli modern depolama alanlarımız, geniş lojistik filomuz ve alanında uzman teknik kadromuzla Karadeniz&apos;in en kapsamlı hırdavat tedarik merkezlerinden biriyiz.
            </p>

            {/* Misyon & Vizyon */}
            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-blue-50 text-arma-blue shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-industrial-900">Misyonumuz</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Sanayi tesisleri, atölyeler ve inşaat projelerinin ihtiyaç duyduğu tüm hırdavat ve ekipmanları en yüksek kalite standartlarında, uygun fiyat politikası ve kesintisiz stok güvencesiyle temin etmek.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-industrial-900">Vizyonumuz</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Türkiye&apos;nin ve Karadeniz havzasının lider endüstriyel tedarikçisi olarak, dijitalleşen sanayiye entegre, hızlı ve müşteri odaklı çözümlerle sektörde örnek gösterilen marka olmak.
                  </p>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
              {COMPANY_INFO.stats.map((st, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl font-extrabold text-industrial-900">{st.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Kolon: Neden Arma Hırdavat Değer Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-arma-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-arma-blue mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-industrial-900 mb-2">
                Orijinal ve Sertifikalı Ürünler
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tüm ürün gruplarımız DIN, ISO, CE ve TSE standartlarına tam uyumlu; üretici garantili ve test raporludur.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-arma-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-industrial-900 mb-2">
                Aynı Gün Sevkiyat Ağı
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fabrikanızın veya şantiyenizin iş akışını kesintiye uğratmadan siparişlerinizi aynı gün kapınıza ulaştırıyoruz.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-arma-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-industrial-900 mb-2">
                30 Ana Kategori, 10.000+ Çeşit
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Civatadan pompaya, kaynak makinesinden 3M iş güvenliğine kadar aradığınız her parça tek adreste.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-arma-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-arma-orange mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-industrial-900 mb-2">
                Uzman Teknik Danışmanlık
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                İhtiyacınıza en uygun malzeme ve mühendislik çözümü için deneyimli kadromuzla daima yanınızdayız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
