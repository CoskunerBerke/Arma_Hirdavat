import Link from "next/link";

/** KVKK satırı: gönder düğmelerinin altında. /kvkk sayfası ayrı oluşturulur. */
export default function KvkkNote({
  purpose = "teklif talebinizi yanıtlamak",
  className = "",
}: {
  /** "… için işlenir" cümlesindeki amaç */
  purpose?: string;
  className?: string;
}) {
  return (
    <p className={`text-xs leading-relaxed text-ink-muted ${className}`}>
      Kişisel verileriniz yalnızca {purpose} için işlenir.{" "}
      <Link href="/kvkk" className="font-medium text-ink-soft underline underline-offset-2 hover:text-brand">
        KVKK Aydınlatma Metni
      </Link>
    </p>
  );
}
