import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Printer, CreditCard, ArrowUp } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-industrial-950 text-slate-300 pt-16 pb-12 border-t border-industrial-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-industrial-800">
          {/* 1. Kolon: Firma Özeti */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Arma Hırdavat"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ARMA <span className="text-arma-orange">HIRDAVAT</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Arma Fabrika Malzemeleri Teknik Hırdavat San. Tic. A.Ş. — 30 yılı aşkın köklü tecrübesiyle Samsun ve Karadeniz bölgesinin endüstriyel teknik hırdavat, fabrika donanımları ve bağlantı elemanları tedarik merkezidir.
            </p>
            <div className="pt-2">
              <a
                href={COMPANY_INFO.onlinePaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/50 hover:text-white transition-all"
              >
                <CreditCard className="w-4 h-4 text-amber-300" />
                <span>Online E-Tahsilat Sistemi</span>
              </a>
            </div>
          </div>

          {/* 2. Kolon: Hızlı Menü */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hızlı Menü
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#urunler" className="text-slate-400 hover:text-white transition-colors">
                  Ürün Gruplarımız (30 Kategori)
                </Link>
              </li>
              <li>
                <Link href="#hakkimizda" className="text-slate-400 hover:text-white transition-colors">
                  Kurumsal &amp; Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#markalar" className="text-slate-400 hover:text-white transition-colors">
                  Yetkili Markalarımız
                </Link>
              </li>
              <li>
                <Link href="#yorumlar" className="text-slate-400 hover:text-white transition-colors">
                  Google Harita Yorumları
                </Link>
              </li>
              <li>
                <Link href="#teklif" className="text-slate-400 hover:text-white transition-colors">
                  Hızlı Fiyat Teklifi Al
                </Link>
              </li>
              <li>
                <Link href="#iletisim" className="text-slate-400 hover:text-white transition-colors">
                  İletişim &amp; Adres
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Kolon: Öne Çıkan Ürün Kategorileri */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Öne Çıkan Kategoriler
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Bağlantı Elemanları (Cıvata, Somun, Pul)</li>
              <li>Çelik Halat &amp; Polyester Kaldırma Sapanları</li>
              <li>İzeltaş Profesyonel El Aletleri</li>
              <li>3M İş Güvenliği &amp; Toz Maskeleri</li>
              <li>Kaynak Makineleri &amp; Gazaltı Telleri</li>
              <li>Pakkens Pnömatik &amp; Manometreler</li>
              <li>Domak Pompa &amp; Hidrofor Sistemleri</li>
            </ul>
          </div>

          {/* 4. Kolon: İletişim Bilgileri */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              İletişim &amp; Merkez
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-arma-orange shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneFormatted}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone} - {COMPANY_INFO.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Faks: {COMPANY_INFO.fax}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Telif ve Güvenlik Bandı */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <span>Samsun / Tekkeköy</span>
            <span>•</span>
            <a href="#top" className="flex items-center gap-1 hover:text-white transition-colors">
              <span>Yukarı Çık</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
