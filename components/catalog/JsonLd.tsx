/** JSON-LD betiği. "<" kaçışlanır ki veri içindeki bir "</script>" etiketi betiği kapatamasın. */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
