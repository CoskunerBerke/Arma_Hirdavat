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
        // Form alanı kenarlığı: beyaz zeminde 3.6:1 (WCAG 1.4.11 için ≥ 3:1)
        "line-input": "#7C8798",

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

        // 3b. Kurumsal düzen renkleri (üst şerit, sayfa bandı, sayaç bandı, alt bilgi)
        // navy: koyu marka laciverti (beyaz metinle ≥ 12:1)
        navy: {
          DEFAULT: "#0B1F4D",
          deep: "#081634",
          light: "#16357A",
        },
        // accent: logodaki sarı. Zemin olarak kullanılır (üzerinde navy metin, ≥ 9:1).
        // Beyaz zeminde METİN rengi olarak yalnızca accent-ink (amber-700, 5.0:1) kullanın.
        accent: {
          DEFAULT: "#F5B800",
          hover: "#E0A800",
          ink: "#B45309",
          soft: "#FEF3C7",
        },

        // 4. Birincil eylem rengi (teklif / listeye ekle). Yeşil "ilerle" işaretidir.
        // Beyaz metinle kontrast: DEFAULT 5.0:1, hover 7.1:1, active 9.1:1 (WCAG AA).
        action: {
          DEFAULT: "#15803D",
          hover: "#166534",
          active: "#14532D",
          light: "#ECFDF5",
          border: "#A7F3D0",
        },
      },
      boxShadow: {
        "2xs": "0 1px 1px rgba(15, 23, 42, 0.04)",
        xs: "0 1px 2px rgba(15, 23, 42, 0.05)",
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
  // tailwindcss-animate: animate-in, fade-in, zoom-in-95, slide-in-from-bottom-2 … sınıfları
  // (hareket azaltma tercihi app/globals.css içinde ele alınır)
  plugins: [require("tailwindcss-animate")],
};
