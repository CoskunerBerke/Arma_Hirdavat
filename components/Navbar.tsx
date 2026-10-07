"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, CreditCard, Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Üst Bilgi Barı */}
      <div className="bg-industrial-900 text-slate-300 text-xs py-2 px-4 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`tel:${COMPANY_INFO.phoneFormatted}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-arma-orange" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-arma-cyan" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{COMPANY_INFO.addressShort}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hafta İçi: 08:00 - 18:00</span>
            </div>
            <a
              href={COMPANY_INFO.onlinePaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 hover:text-white border border-blue-500/30 font-medium transition-all"
            >
              <CreditCard className="w-3 h-3" />
              <span>Online Tahsilat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ana Navigasyon */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Firma Adı */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Arma Hırdavat Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-900 group-hover:text-arma-blue transition-colors">
                  ARMA <span className="text-arma-orange">HIRDAVAT</span>
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-wider uppercase">
                  Fabrika Malzemeleri & Teknik Hırdavat
                </span>
              </div>
            </Link>

            {/* Masaüstü Menü */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <Link href="#urunler" className="hover:text-arma-blue transition-colors">
                Ürün Gruplarımız
              </Link>
              <Link href="#hakkimizda" className="hover:text-arma-blue transition-colors">
                Kurumsal
              </Link>
              <Link href="#markalar" className="hover:text-arma-blue transition-colors">
                Markalarımız
              </Link>
              <Link href="#yorumlar" className="hover:text-arma-blue transition-colors flex items-center gap-1.5">
                <span>Müşteri Yorumları</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">5.0 ★</span>
              </Link>
              <Link href="#iletisim" className="hover:text-arma-blue transition-colors">
                İletişim & Konum
              </Link>
            </div>

            {/* CTA Butonları */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappFormatted}?text=${encodeURIComponent("Merhaba Arma Hırdavat, ürün ve fiyat teklifi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 shadow-sm hover:shadow transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Teklif</span>
              </a>

              <Link
                href="#teklif"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-industrial-900 text-white font-medium text-sm hover:bg-arma-blue shadow-sm hover:shadow transition-all"
              >
                <span>Hızlı Teklif</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobil Menü Butonu */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:text-industrial-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Menüyü Aç"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobil Menü Açılır Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <Link
              href="#urunler"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-arma-blue"
            >
              Ürün Gruplarımız (30 Kategori)
            </Link>
            <Link
              href="#hakkimizda"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-arma-blue"
            >
              Kurumsal & Misyon
            </Link>
            <Link
              href="#markalar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-arma-blue"
            >
              Markalar & Çözüm Ortakları
            </Link>
            <Link
              href="#yorumlar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-arma-blue"
            >
              Google Harita Yorumları (5.0 ★)
            </Link>
            <Link
              href="#iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-arma-blue"
            >
              İletişim & Konum Bilgileri
            </Link>
            <a
              href={COMPANY_INFO.onlinePaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-base font-semibold text-blue-600 hover:text-blue-800"
            >
              Online Tahsilat & Ödeme
            </a>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneFormatted}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-100 text-slate-900 font-medium text-sm text-center"
              >
                <Phone className="w-4 h-4 text-arma-orange" />
                <span>Hemen Ara</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappFormatted}?text=${encodeURIComponent("Merhaba Arma Hırdavat, ürün ve fiyat teklifi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 text-white font-medium text-sm text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
