/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Açık, tek tonlu zemin ailesi — bölümler arası sert renk geçişi yok
        canvas: "#F5F7FA",
        line: "#E2E7EE",
        "line-strong": "#C9D2DE",
        // Metin: saf siyah yerine lacivert-siyah (açık zeminde göz yorgunluğunu azaltır)
        // canvas (#F5F7FA) üzerinde: DEFAULT ≈ 16:1, soft ≈ 7.6:1, muted ≈ 5:1 (WCAG AA)
        ink: {
          DEFAULT: "#0F1B2D",
          soft: "#44546A",
          muted: "#5D6D82",
        },
        brand: {
          DEFAULT: "#0050E6", // logodaki mavinin (#0059FF) beyaz metinle AA kontrast sağlayan tonu
          hover: "#0042BF",
          50: "#EEF4FF",
          100: "#DCE8FF",
          accent: "#F0CF4A", // logodaki sarıdan — yalnızca küçük vurgu/rozetlerde
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 80, 230, 0.0), 0 6px 16px -6px rgba(0, 80, 230, 0.45)" },
          "50%": { boxShadow: "0 0 0 6px rgba(0, 80, 230, 0.10), 0 6px 20px -6px rgba(0, 80, 230, 0.55)" },
        },
        river: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "float-fast": "floatFast 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        river: "river 60s linear infinite",
      },
    },
  },
  plugins: [],
};
