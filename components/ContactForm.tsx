"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { COMPANY } from "@/data/company";
import { PRODUCT_GROUPS } from "@/data/products";

const field =
  "w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-fg placeholder:text-fg-muted focus:border-brand-soft/60 focus:outline-none";

/**
 * Sunucu gerektirmeyen teklif formu: bilgileri düzenli bir e-posta taslağına dönüştürür
 * ve kullanıcının e-posta uygulamasını açar.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "", message: "" });

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("urun");
    const p = PRODUCT_GROUPS.find((x) => x.slug === slug);
    if (p) setForm((f) => ({ ...f, product: p.title }));
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Teklif talebi${form.product ? ` – ${form.product}` : ""}`;
    const body = [
      `Ad Soyad: ${form.name}`,
      `Firma: ${form.company || "-"}`,
      `Telefon: ${form.phone}`,
      `E-posta: ${form.email || "-"}`,
      `Ürün grubu: ${form.product || "Genel"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="mb-2 block text-sm font-medium text-fg">
            Ad Soyad <span className="text-brand-accent">*</span>
          </label>
          <input id="f-name" required autoComplete="name" value={form.name} onChange={set("name")} className={field} />
        </div>
        <div>
          <label htmlFor="f-company" className="mb-2 block text-sm font-medium text-fg">
            Firma
          </label>
          <input id="f-company" autoComplete="organization" value={form.company} onChange={set("company")} className={field} />
        </div>
        <div>
          <label htmlFor="f-phone" className="mb-2 block text-sm font-medium text-fg">
            Telefon <span className="text-brand-accent">*</span>
          </label>
          <input id="f-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={field} />
        </div>
        <div>
          <label htmlFor="f-email" className="mb-2 block text-sm font-medium text-fg">
            E-posta
          </label>
          <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="f-product" className="mb-2 block text-sm font-medium text-fg">
          İlgilendiğiniz ürün grubu
        </label>
        <select id="f-product" value={form.product} onChange={set("product")} className={field}>
          <option value="">Genel / birden fazla grup</option>
          {PRODUCT_GROUPS.map((p) => (
            <option key={p.id} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-message" className="mb-2 block text-sm font-medium text-fg">
          Mesajınız / ihtiyaç listeniz <span className="text-brand-accent">*</span>
        </label>
        <textarea id="f-message" required rows={5} value={form.message} onChange={set("message")} placeholder="Ürün, ölçü ve adet bilgilerini yazabilirsiniz." className={`${field} resize-y`} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-muted">Gönder&apos;e bastığınızda e-posta uygulamanız hazır bir taslakla açılır.</p>
        <button type="submit" className="btn-accent px-6">
          Gönder <Send className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}
