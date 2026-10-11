/**
 * Alt bilginin üstündeki sanayi silueti (özgün çizim, dekoratif).
 * Testere dişli fabrika çatıları, bacalar, silolar, kule vinç, depo, liman vinci ve
 * Karadeniz kıyısına bir yük gemisi. Renk alt bilgi zeminiyle aynıdır (currentColor).
 * Dar ekranda ortası görünür (xMidYMax slice).
 */
export default function FooterSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 120"
      preserveAspectRatio="xMidYMax slice"
      className={`block w-full ${className}`}
      fill="currentColor"
    >
      {/* Zemin */}
      <rect x="0" y="104" width="1440" height="16" />

      {/* Testere dişli fabrika çatıları */}
      <path d="M0 104V72l36-20v20l36-20v20l36-20v20l36-20v20l36-20v20l36-20v52z" />
      {/* Bacalar */}
      <rect x="232" y="22" width="14" height="82" />
      <rect x="230" y="18" width="18" height="6" />
      <rect x="258" y="40" width="10" height="64" />
      <rect x="256" y="36" width="14" height="5" />
      {/* Ofis bloğu */}
      <rect x="280" y="58" width="74" height="46" />
      <rect x="296" y="48" width="42" height="12" />
      {/* Silolar */}
      <path d="M366 104V54a14 14 0 0 1 28 0v50z" />
      <path d="M398 104V46a14 14 0 0 1 28 0v58z" />
      <path d="M430 104V58a14 14 0 0 1 28 0v46z" />
      <rect x="370" y="40" width="84" height="4" />

      {/* Kule vinç */}
      <rect x="520" y="14" width="6" height="90" />
      <rect x="470" y="12" width="150" height="5" />
      <rect x="470" y="17" width="16" height="9" />
      <path d="M520 12l3-8 3 8z" />
      <rect x="598" y="17" width="1.5" height="34" />
      <rect x="592" y="50" width="14" height="6" />
      {/* Yapım hâlindeki bina */}
      <rect x="540" y="62" width="70" height="42" />
      <rect x="540" y="56" width="40" height="7" />

      {/* Büyük depo (beşik çatı) */}
      <path d="M640 104V70l85-26 85 26v34z" />
      {/* Bacalar */}
      <rect x="826" y="30" width="12" height="74" />
      <rect x="846" y="44" width="10" height="60" />
      {/* Alçak atölyeler */}
      <rect x="866" y="74" width="60" height="30" />
      <path d="M930 104V66l22-12 22 12v38z" />
      <rect x="980" y="80" width="44" height="24" />
      <rect x="990" y="60" width="8" height="20" />

      {/* Liman (gemiden kıyıya) vinci */}
      <rect x="1060" y="40" width="6" height="64" />
      <rect x="1100" y="40" width="6" height="64" />
      <rect x="1056" y="36" width="56" height="7" />
      <path d="M1040 30h140v5h-140z" />
      <path d="M1060 36l20-22h6l20 22z" />
      <rect x="1150" y="35" width="1.5" height="30" />
      <rect x="1144" y="64" width="14" height="8" />
      {/* Konteyner yığını */}
      <rect x="1118" y="88" width="30" height="16" />
      <rect x="1150" y="88" width="30" height="16" />
      <rect x="1132" y="74" width="30" height="13" />

      {/* Kıyı ve yük gemisi */}
      <path d="M1196 104h244v16H1196z" />
      <path d="M1236 96h170l-14 14h-148z" />
      <rect x="1262" y="82" width="26" height="14" />
      <rect x="1290" y="82" width="26" height="14" />
      <rect x="1318" y="82" width="26" height="14" />
      <rect x="1360" y="72" width="22" height="24" />
      <rect x="1366" y="64" width="6" height="9" />
      {/* Deniz kıyısı çizgisi (hafif açık ton) */}
      <path
        d="M1196 112c12-4 24-4 36 0s24 4 36 0 24-4 36 0 24 4 36 0 24-4 36 0 24 4 36 0 24-4 36 0"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />
    </svg>
  );
}
