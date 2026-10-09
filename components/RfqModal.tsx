"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  CreditCard,
  FileText,
  MessageSquare,
  Package,
  Plus,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { COMPANY } from "@/data/company";
import { useQuote, type SupplyUnit } from "./QuoteContext";

const SECTORS = [
  "İnşaat & Taahhüt",
  "Otomotiv & Yan Sanayi",
  "Makine & Ekipman İmalatı",
  "Ağır Sanayi & Metal Sanayi",
  "Tersane & Gemi İnşa",
  "Gıda & Tesis İmalatı",
  "Enerji & Altyapı",
  "Diğer Sanayi & Tesis",
];

const PACKAGING_OPTIONS: SupplyUnit[] = ["Koli", "Palet", "Tesis Ambalajı"];

export default function RfqModal() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, updateUnit, addItem, clearQuote } = useQuote();

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [form, setForm] = useState({
    sector: "İnşaat & Taahhüt",
    company: "",
    contactName: "",
    title: "",
    phone: "",
    email: "",
    deliveryLocation: "",
    notes: "",
  });

  // Custom Quick Item Input
  const [customItem, setCustomItem] = useState({ title: "", spec: "", quantity: 50, unit: "Koli" as SupplyUnit });
  const [showAddCustom, setShowAddCustom] = useState(false);

  if (!isOpen) return null;

  const handleCustomAdd = () => {
    if (!customItem.title.trim()) return;
    addItem({
      productTitle: customItem.title.trim(),
      spec: customItem.spec.trim() || undefined,
      quantity: Number(customItem.quantity) || 1,
      unit: customItem.unit,
    });
    setCustomItem({ title: "", spec: "", quantity: 50, unit: "Koli" });
    setShowAddCustom(false);
  };

  // Format the exact message for the business owner / WhatsApp
  const generateFormattedMessage = () => {
    const lines = [
      "*📦 YENİ KURUMSAL TEKLİF TALEBİ - ARMA HIRDAVAT*",
      "------------------------------------------",
      "*Talep Edilen Malzemeler:*",
    ];

    if (items.length === 0) {
      lines.push("• Genel Malzeme İhtiyaç Listesi");
    } else {
      items.forEach((it) => {
        const specText = it.spec ? ` (${it.spec})` : "";
        lines.push(`• ${it.quantity} ${it.unit} ${it.productTitle}${specText}`);
      });
    }

    lines.push("------------------------------------------");
    lines.push("*Kurumsal Müşteri / Tesis Bilgileri:*");
    lines.push(`• *Sektör:* ${form.sector}`);
    lines.push(`• *Firma/Tesis:* ${form.company || "Belirtilmedi"}`);
    lines.push(`• *Yetkili / Unvan:* ${form.contactName || "Belirtilmedi"} ${form.title ? `(${form.title})` : ""}`);
    lines.push(`• *Telefon:* ${form.phone || "Belirtilmedi"}`);
    lines.push(`• *E-Posta:* ${form.email || "Belirtilmedi"}`);
    if (form.deliveryLocation) {
      lines.push(`• *Teslimat Lokasyonu:* ${form.deliveryLocation}`);
    }
    if (form.notes) {
      lines.push(`• *Özel Not / Şartname:* ${form.notes}`);
    }
    lines.push("------------------------------------------");
    lines.push("Teklif belgesi onaylandıktan sonra e-fatura oluşturularak Online Tahsilat ile ödeme alınacaktır.");

    return lines.join("\n");
  };

  const whatsappMessage = generateFormattedMessage();
  const whatsappUrl = `https://wa.me/903622666095?text=${encodeURIComponent(whatsappMessage)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6" role="dialog" aria-modal="true" aria-labelledby="rfq-modal-title">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)} />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col rounded-3xl border border-line bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h2 id="rfq-modal-title" className="text-lg font-bold text-ink sm:text-xl">
                {submitted ? "Teklif Talebiniz Alındı" : "Kurumsal Fiyat Teklifi Al"}
              </h2>
              <p className="text-xs text-ink-muted">
                {submitted ? "Arma Fabrika Malzemeleri B2B Portalı" : "Koli, palet ve tesis ambalajlı toptan alım talebi"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              if (submitted) {
                setSubmitted(false);
                clearQuote();
              }
            }}
            className="rounded-full p-2 text-ink-muted transition hover:bg-slate-200 hover:text-ink"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            /* 4. Onay Ekranı (Image 4 ile Birebir) */
            <div className="py-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="mt-5 rounded-2xl border border-line bg-slate-50 p-6 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">Resmi Süreç Başlatıldı</p>
                {/* Image 4 metni */}
                <p className="mt-2 text-base font-semibold leading-relaxed text-ink sm:text-lg">
                  &ldquo;Talebiniz kurumsal müşteri temsilcimize iletilmiştir. Vergi levhası ve şirket bilgileri doğrulandıktan sonra hazırlanan teklif belgesi e-posta adresinize gönderilecektir.&rdquo;
                </p>
              </div>

              {/* Kurumsal Sipariş ve Teklif Metni */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-left text-white shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <MessageSquare className="h-4 w-4" /> Kurumsal Teklif ve Sipariş Özeti:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  >
                    <Copy className="h-3 w-3" /> {copied ? "Kopyalandı!" : "Metni Kopyala"}
                  </button>
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">
                  {whatsappMessage}
                </pre>
              </div>

              {/* 3 Adımlı Kurumsal Süreç & Fatura / Ödeme */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-left">
                <div className="rounded-xl border border-line bg-white p-4">
                  <span className="inline-block rounded bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand">1. ADIM</span>
                  <p className="mt-2 text-sm font-semibold text-ink">İskonto Matrisi</p>
                  <p className="mt-1 text-xs text-ink-muted">Miktar ve lokasyona göre özel toptan fiyat belgesi hazırlanır.</p>
                </div>
                <div className="rounded-xl border border-line bg-white p-4">
                  <span className="inline-block rounded bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800">2. ADIM</span>
                  <p className="mt-2 text-sm font-semibold text-ink">Fatura Düzenleme</p>
                  <p className="mt-1 text-xs text-ink-muted">Teklif onayınızla birlikte kurumsal e-faturanız oluşturulur.</p>
                </div>
                <div className="rounded-xl border border-line bg-white p-4">
                  <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800">3. ADIM</span>
                  <p className="mt-2 text-sm font-semibold text-ink">Online Tahsilat</p>
                  <p className="mt-1 text-xs text-ink-muted">Arma Online E-Tahsilat ile güvenli ödeme ve sevkiyat başlar.</p>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                >
                  <MessageSquare className="h-4 w-4" /> WhatsApp ile Yetkiliye İlet
                </a>
                <a
                  href={COMPANY.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <CreditCard className="h-4 w-4 text-brand" /> Online Tahsilat Portalı
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    clearQuote();
                    setIsOpen(false);
                  }}
                  className="btn-ghost text-sm"
                >
                  Pencereyi Kapat
                </button>
              </div>
            </div>
          ) : (
            /* Teklif Listesi & Talep Formu */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sistem Notu — Pozitif ve Kurumsal Avantaj Odaklı */}
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 text-xs leading-relaxed text-slate-800">
                <span className="font-bold text-emerald-800">Kurumsal Toptan Avantajı: </span>
                &ldquo;Talebinizdeki miktar ve teslimat iline göre doğrudan fabrika toptan iskonto oranları uygulanarak, firmanıza özel resmi proforma teklif belgesi hazırlanır ve en kısa sürede iletilir.&rdquo;
              </div>

              {/* Seçilen Ürünler Listesi */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                    Teklif Talep Edilen Ürünler ({items.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddCustom((v) => !v)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Manuel Ürün / Ölçü Ekle
                  </button>
                </div>

                {/* Manuel Ürün Ekleme Barı */}
                {showAddCustom && (
                  <div className="mb-4 rounded-xl border border-line bg-slate-50 p-4 transition">
                    <p className="text-xs font-semibold text-ink mb-2">Listeye Özel Ürün / Parça Ekle (Örn: Civata Metrik 4)</p>
                    <div className="grid gap-2 sm:grid-cols-12">
                      <input
                        type="text"
                        placeholder="Ürün adı (Örn: Çelik Cıvata)"
                        value={customItem.title}
                        onChange={(e) => setCustomItem((c) => ({ ...c, title: e.target.value }))}
                        className="field sm:col-span-4 text-xs py-2"
                      />
                      <input
                        type="text"
                        placeholder="Ölçü / Şartname (Örn: Metrik 4, DIN 933)"
                        value={customItem.spec}
                        onChange={(e) => setCustomItem((c) => ({ ...c, spec: e.target.value }))}
                        className="field sm:col-span-4 text-xs py-2"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Miktar"
                        value={customItem.quantity}
                        onChange={(e) => setCustomItem((c) => ({ ...c, quantity: Number(e.target.value) }))}
                        className="field sm:col-span-2 text-xs py-2"
                      />
                      <select
                        value={customItem.unit}
                        onChange={(e) => setCustomItem((c) => ({ ...c, unit: e.target.value as SupplyUnit }))}
                        className="field sm:col-span-2 text-xs py-2 bg-white"
                      >
                        {PACKAGING_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2.5 flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddCustom(false)} className="text-xs text-ink-muted hover:text-ink">
                        İptal
                      </button>
                      <button type="button" onClick={handleCustomAdd} className="btn-primary py-1.5 px-3 text-xs">
                        Listeye Ekle
                      </button>
                    </div>
                  </div>
                )}

                {/* Ürün Listesi */}
                {items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-line p-6 text-center">
                    <Package className="mx-auto h-8 w-8 text-ink-muted" />
                    <p className="mt-2 text-sm text-ink-soft">Henüz teklif listenize ürün eklemediniz.</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      Aşağıdaki &ldquo;Manuel Ürün / Ölçü Ekle&rdquo; butonundan istediğiniz ürünü yazabilir (Örn: 50 Koli Cıvata Metrik 4) veya ürünler sayfasından ürün ekleyebilirsiniz.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddCustom(true)}
                      className="btn-ghost mt-4 text-xs inline-flex items-center gap-1.5"
                    >
                      <Plus className="h-3.5 w-3.5" /> Manuel Ürün Yaz
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
                    {items.map((it) => (
                      <li key={it.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink">{it.productTitle}</p>
                          {it.spec && <p className="text-xs font-mono text-brand">{it.spec}</p>}
                          <span className="inline-block mt-1 text-[11px] text-ink-muted">
                            Tedarik Şekli: <span className="font-semibold text-ink">{it.unit}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Miktar */}
                          <div className="flex items-center rounded-lg border border-line bg-slate-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(it.id, it.quantity - 1)}
                              className="px-2.5 py-1 text-xs font-bold text-ink-soft hover:bg-slate-200 rounded-l-lg"
                              aria-label="Azalt"
                            >
                              -
                            </button>
                            <span className="w-12 text-center text-xs font-bold text-ink">{it.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(it.id, it.quantity + 1)}
                              className="px-2.5 py-1 text-xs font-bold text-ink-soft hover:bg-slate-200 rounded-r-lg"
                              aria-label="Artır"
                            >
                              +
                            </button>
                          </div>

                          {/* Birim Seçimi (Koli / Palet / Tesis Ambalajı) */}
                          <select
                            value={it.unit}
                            onChange={(e) => updateUnit(it.id, e.target.value as SupplyUnit)}
                            className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink focus:border-brand focus:outline-none"
                          >
                            {PACKAGING_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>

                          {/* Sil */}
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                            aria-label="Ürünü kaldır"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Kurumsal Müşteri / Tesis Bilgileri Formu */}
              <div className="border-t border-line pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">
                  Kurumsal Satın Alma ve Tesis Bilgileri
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Faaliyet Gösterilen Sektör <span className="text-brand">*</span>
                    </label>
                    <select
                      required
                      value={form.sector}
                      onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))}
                      className="field text-sm bg-white"
                    >
                      {SECTORS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Firma / Fabrika / Tesis Adı <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Rönesans Holding / Sampa Otomotiv"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Yetkili Adı Soyadı <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Hasan Yılmaz"
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Görevi / Unvanı <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Satın Alma Müdürü / Şantiye Şefi"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Telefon Numarası <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="05xx xxx xx xx"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Kurumsal E-posta <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="teklif@firmaniz.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Teslimat Lokasyonu / Şantiye Adresi
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Tekkeköy Organize Sanayi Şantiyesi"
                      value={form.deliveryLocation}
                      onChange={(e) => setForm((f) => ({ ...f, deliveryLocation: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-ink">
                      Ek Teknik Not / Özel Şartname / Kalite Talebi
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Varsa DIN standartları, kalite sınıfları (8.8, 10.9), acil teslimat tarihleri vb."
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      className="field text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-line pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-ink-muted">
                  Talebiniz doğrulandıktan sonra resmi teklif mektubu ve proforma e-postanıza iletilecektir.
                </p>
                <button type="submit" className="btn-action w-full sm:w-auto px-8 py-3.5 text-sm font-bold shadow-xl shadow-action/30">
                  <Send className="h-4 w-4" /> Resmi Teklif Talebini Gönder
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
