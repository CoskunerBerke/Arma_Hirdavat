import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Aradığınız sayfa bulunamadı</h1>
      <p className="mt-3 text-ink-soft">Sayfa taşınmış veya kaldırılmış olabilir.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          Ana sayfa
        </Link>
        <Link href="/urunler" className="btn-ghost">
          Ürünler
        </Link>
      </div>
    </section>
  );
}
