import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "#0A0A0A",
        panel: "#111111",
        panel2: "#171717",
        line: "rgba(255,255,255,0.11)",
        muted: "#A3A3A3",
        primary: {
          "background-start": "#1F2551",
          "background-end": "#120B4F",
        },
      },
      boxShadow: {
        glow: "0 0 80px rgba(73, 126, 255, 0.18)",
        card: "0 20px 80px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at 25% 20%, rgba(59,130,246,0.22), transparent 32%)",
        "radial-violet": "radial-gradient(circle at 75% 25%, rgba(124,58,237,0.20), transparent 34%)",
        "accent-gradient": "linear-gradient(135deg, #62A8FF 0%, #8B5CF6 52%, #D8B4FE 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg) translateY(0)" },
          "50%": { transform: "rotate(180deg) translateY(-15px)" },
          "100%": { transform: "rotate(360deg) translateY(0)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        "slide-up": "slideUp 0.75s ease-out forwards",
        "spin-slow": "spinSlow 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
