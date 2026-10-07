"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Printer, Clock, MessageSquare, Send, CheckCircle2, CreditCard, ExternalLink } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

export default function ContactAndQuote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    selectedProduct: "Genel Hırdavat / Tüm Ürünler",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Lütfen adınızı ve telefon numaranızı giriniz.");
      return;
    }

    const text = `*ARMA HIRDAVAT WEB TEKLİF TALEBİ*
--------------------------------
*Ad Soyad:* ${formData.name}
*Firma:* ${formData.company || "Belirtilmedi"}
*Telefon:* ${formData.phone}
*İlgilenilen Ürün Grubu:* ${formData.selectedProduct}
*Mesaj / Malzeme Listesi:*
${formData.message || "Fiyat teklifi ve katalog rica ediyorum."}`;

    const url = `https://wa.me/${COMPANY_INFO.whatsappFormatted}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="iletisim" className="py-20 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-arma-blue text-xs font-bold uppercase tracking-wider mb-2">
            Bize Ulaşın
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight">
            İletişim &amp; Hızlı Fiyat Teklifi
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Fabrikanız veya projeniz için toplu malzeme alımlarında özel iskontolu fiyat teklifinizi hemen alın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* İletişim Bilgileri (5 Kolon) */}
          <div className="lg:col-span-5 bg-industrial-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <span className="text-xs font-bold text-arma-orange tracking-widest uppercase">
              Merkez &amp; Depo
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Tekkeköy sanayi bölgesinde yer alan satış ofisimiz ve lojistik depomuzla hizmetinizdeyiz.
            </p>

            <div className="mt-8 space-y-5 text-sm">
              {/* Adres */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-800 text-arma-orange shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Fabrika &amp; Mağaza Adresi</div>
                  <div className="text-white font-medium mt-0.5 leading-snug">
                    {COMPANY_INFO.address}
                  </div>
                </div>
              </div>

              {/* Telefonlar */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Santral &amp; Satış</div>
                  <div className="mt-0.5 space-y-0.5">
                    <a
                      href={`tel:${COMPANY_INFO.phoneFormatted}`}
                      className="block text-white font-medium hover:text-arma-orange transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <a
                      href="tel:+903622666750"
                      className="block text-white font-medium hover:text-arma-orange transition-colors"
                    >
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Faks */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Kurumsal Faks</div>
                  <div className="text-white font-medium mt-0.5">
                    {COMPANY_INFO.fax}
                  </div>
                </div>
              </div>

              {/* E-Posta */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-800 text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Resmi E-Posta</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-white font-medium hover:text-sky-300 transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Mesai Saatleri</div>
                  <div className="text-xs text-slate-300 mt-1 space-y-1">
                    <div>Pazartesi - Cuma: <strong>08:00 - 18:00</strong></div>
                    <div>Cumartesi: <strong>08:00 - 14:00</strong></div>
                    <div>Pazar: Kapalı</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Ödeme / Tahsilat Bannerı */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href={COMPANY_INFO.onlinePaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:from-blue-600 hover:to-blue-800 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-amber-300" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Arma Hırdavat E-Tahsilat</div>
                    <div className="text-[11px] text-blue-200">Kredi Kartı ile Güvenli Online Ödeme</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Hızlı Fiyat Teklifi Formu (7 Kolon) */}
          <div id="teklif" className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-industrial-900">
                  Hızlı Malzeme &amp; Fiyat Teklifi Formu
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  İhtiyaç duyduğunuz ürün listesini iletin, en kısa sürede özel iskontolu teklifinizi hazırlayalım.
                </p>
              </div>
              <div className="hidden sm:flex p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            {submitted && (
              <div className="my-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>Talebiniz Hazırlandı!</strong> WhatsApp üzerinden teklif detayı otomatik oluşturuldu. Müşteri temsilcimiz hemen ilgilenecektir.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Adınız Soyadınız <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-arma-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Firma / Şirket Ünvanı
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Örn: Yılmaz Makina Sanayi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-arma-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Telefon Numarası <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Örn: 0532 000 00 00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-arma-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    İlgilendiğiniz Ürün Grubu
                  </label>
                  <select
                    value={formData.selectedProduct}
                    onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-arma-blue focus:border-transparent bg-white"
                  >
                    <option value="Genel Hırdavat / Tüm Ürünler">Genel Hırdavat / Tüm Ürünler</option>
                    {PRODUCT_GROUPS.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  İhtiyaç Listeniz / Notunuz
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="İstediğiniz parça ölçüleri, adetler, teknik şartname veya sormak istediğiniz soruları buraya yazabilirsiniz..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-arma-blue focus:border-transparent resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Hızlı Teklif Gönder</span>
                </button>

                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent("Fiyat Teklifi Talebi - " + formData.selectedProduct)}&body=${encodeURIComponent("Ad: " + formData.name + "\nFirma: " + formData.company + "\nTelefon: " + formData.phone + "\nNot: " + formData.message)}`}
                  className="py-3 px-6 rounded-xl bg-industrial-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>E-Posta ile Gönder</span>
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Harita Entegrasyonu */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-industrial-900 text-base">
                Google Haritalar &amp; Ulaşım Konumu
              </h4>
              <p className="text-xs text-slate-500">
                {COMPANY_INFO.address}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Arma+Teknik+Hırdavat+Tekkeköy+Samsun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-arma-blue hover:underline"
            >
              <span>Google Haritalarda Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="relative w-full h-80 sm:h-96 bg-slate-100">
            <iframe
              src={COMPANY_INFO.locationMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Arma Hırdavat Samsun Konum Haritası"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
