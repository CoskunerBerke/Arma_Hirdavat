/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Düşük doygunluklu, marka mavisinin tonundan (≈220°) türetilmiş lacivert zemin.
        // Valdez & Mehrabian (1994): düşük doygunluk = daha düşük uyarılma, daha sakin algı.
        ink: {
          950: "#070F1C",
          900: "#0A1424",
          850: "#0D192C",
          800: "#112036",
          700: "#182A45",
          600: "#22375A",
        },
        // Metin tonları: saf beyaz yerine kırık beyaz (halation / parlama etkisini azaltır).
        // Hepsi #0A1424 zemin üzerinde WCAG 2.1 AA (≥ 4.5:1) kontrastını sağlar.
        fg: {
          DEFAULT: "#E6ECF4", // ~15:1
          soft: "#A9B8CB", // ~9:1
          muted: "#8395AC", // ~6:1
        },
        brand: {
          blue: "#0059FF", // logodaki marka mavisi
          soft: "#6E9CF2", // ışıma ve vurgu için yumuşatılmış mavi
          // Tek vurgu rengi (Von Restorff / izolasyon etkisi): yalnızca birincil eylem çağrılarında.
          accent: "#F0CF4A",
          "accent-hover": "#F6DB6E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1.5deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(-1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 18px 0 rgba(240, 207, 74, 0.18)" },
          "50%": { boxShadow: "0 0 30px 4px rgba(240, 207, 74, 0.32)" },
        },
        progress: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        river: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "float-fast": "floatFast 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3.2s ease-in-out infinite",
        river: "river 70s linear infinite",
      },
    },
  },
  plugins: [],
};
