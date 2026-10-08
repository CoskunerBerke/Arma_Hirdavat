/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Bilimsel & psikolojik B2B renk paleti:
        // 1. Zemin: Göz yormayan, ferah ve ultra-temiz nötr tuval (Slate-50)
        canvas: "#F8FAFC",
        line: "#E2E8F0",
        "line-strong": "#CBD5E1",

        // 2. Tipografi: Yüksek kontrastlı, net ve okunabilir kurumsal antrasit/lacivert (Slate-900)
        ink: {
          DEFAULT: "#0F172A",
          soft: "#334155",
          muted: "#64748B",
        },

        // 3. Otorite & Güven Rengi (B2B Kurumsal Mavi - Blue-700/800)
        brand: {
          DEFAULT: "#1E40AF",
          hover: "#1D4ED8",
          light: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          accent: "#D97706",
        },

        // 4. Dönüşüm & Satın Alma Niyeti Rengi (Conversion Emerald - Green-600/700)
        // Psikolojik olarak "Onaylandı", "Güvenli İşlem", "Fırsat" ve "İlerle" hissi uyandırarak satın alma/RFQ dönüşümünü maksimize eder.
        action: {
          DEFAULT: "#16A34A",
          hover: "#15803D",
          active: "#166534",
          light: "#ECFDF5",
          border: "#A7F3D0",
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
