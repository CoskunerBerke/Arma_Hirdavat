interface Item {
  id: string;
  title: string;
}

/** İçindekiler: mobilde makalenin üstünde, geniş ekranda yan sütunda yapışkan. */
export default function GuideToc({ items }: { items: Item[] }) {
  return (
    <nav aria-labelledby="icindekiler-baslik" className="rounded-2xl border border-line bg-white p-4 shadow-2xs sm:p-5">
      <p id="icindekiler-baslik" className="text-sm font-semibold text-ink">
        İçindekiler
      </p>
      <ol className="mt-2 space-y-0.5 text-sm">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="flex min-h-[40px] items-center gap-2.5 rounded-lg px-2 py-1.5 text-ink-soft transition-colors hover:bg-slate-50 hover:text-brand"
            >
              <span className="w-5 shrink-0 text-xs font-semibold tabular-nums text-ink-muted" aria-hidden>
                {i + 1}.
              </span>
              <span>{it.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
