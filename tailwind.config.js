/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0a",
          elevated: "#111111",
          hover: "#1a1a1a",
        },
        foreground: {
          DEFAULT: "#f5f5f5",
          muted: "#a3a3a3",
          subtle: "#525252",
        },
        border: {
          DEFAULT: "#222222",
          hover: "#333333",
        },
        accent: {
          DEFAULT: "#94a3b8",
          muted: "#64748b",
          glow: "rgba(148, 163, 184, 0.15)",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
