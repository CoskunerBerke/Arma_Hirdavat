import React from "react";
import Image from "next/image";
import { Award, ShieldCheck } from "lucide-react";

export default function BrandsSection() {
  const brands = [
    {
      name: "Domak Pompa",
      role: "Yetkili Bölge Bayisi",
      image: "/images/brands/domak.jpg",
      desc: "Santrifüj ve dalgıç pompalar, hidrofor sistemleri"
    },
    {
      name: "Doğan Makina",
      role: "Çözüm Ortağı",
      image: "/images/brands/doganmakina.jpg",
      desc: "İnşaat makineleri ve mekanik ekipmanlar"
    },
    {
      name: "Sufil",
      role: "Yetkili Dağıtıcı",
      image: "/images/brands/sufil.jpg",
      desc: "Endüstriyel su arıtma ve filtre çözümleri"
    },
    {
      name: "İzeltaş",
      role: "Yetkili Bayi",
      textLogo: "İZELTAŞ",
      desc: "Profesyonel dövme çelik el aletleri ve servis arabaları"
    },
    {
      name: "3M",
      role: "Endüstriyel Partner",
      textLogo: "3M",
      desc: "Kişisel koruyucu donanım ve iş güvenliği ürünleri"
    },
    {
      name: "Pakkens",
      role: "Yetkili Dağıtıcı",
      textLogo: "PAKKENS",
      desc: "Basınç ölçüm cihazları, manometre ve pnömatik"
    },
    {
      name: "Karbosan",
      role: "Aşındırıcı Partner",
      textLogo: "KARBOSAN",
      desc: "Yüksek dayanımlı kesme ve taşlama taşları"
    },
    {
      name: "Magmaweld",
      role: "Kaynak Çözümleri",
      textLogo: "MAGMAWELD",
      desc: "Elektrot, gazaltı kaynak telleri ve makineleri"
    }
  ];

  return (
    <section id="markalar" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Güçlü İş Birlikleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight">
            Yetkili Bayiliklerimiz ve Markalarımız
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Dünya ve Türkiye pazarının lider endüstriyel üreticilerinin orijinal, garantili ve sertifikalı ürünlerini sizlere sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-arma-blue/40 hover:bg-white hover:shadow-md transition-all flex flex-col items-center text-center justify-between group"
            >
              <div className="h-16 flex items-center justify-center w-full">
                {b.image ? (
                  <div className="relative h-12 w-32">
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                ) : (
                  <span className="text-xl font-black tracking-wider text-slate-800 group-hover:text-arma-blue transition-colors">
                    {b.textLogo}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 w-full">
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{b.role}</span>
                </div>
                <h4 className="font-bold text-sm text-industrial-900 mt-1">{b.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
