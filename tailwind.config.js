/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          300: "#64B5F6",
          500: "#2196F3", // Primary color
          700: "#1976D2",
          900: "#0D47A1",
        },
        secondary: {
          50: "#E0F2F1",
          100: "#B2DFDB",
          300: "#4DB6AC",
          500: "#009688", // Secondary color
          700: "#00796B",
          900: "#004D40",
        },
        danger: {
          200: "#FFC9C9",
          500: "#FB2C36", // Danger color
          800: "#9F0712"
        },
        warning: {
          200: "#FFF085",
          500: "#F0B100", // Warning color
          800: "#894B00"
        },
        success: {
          200: "#B9F8CF",
          500: "#00C950", // Success color
          800: "#016630"
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CAD5E2",
          400: "#90A1B9",
          500: "#62748E",
          600: "#314158",
          700: "#314158",
          950: "#020618"
        },
        fontFamily: {
          sourceSansPro: ['"Source Sans Pro"', "sans-serif"],
        },
      },
    },
    plugins: [
      plugin(function ({ addComponents }) {
        addComponents({
          // Título Principal
          ".text-display": {
            fontSize: "60px", // text-6xl
            fontWeight: "700", // bold
            lineHeight: "64px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Título Nivel 1
          ".text-h1": {
            fontSize: "36px", // text-4xl
            fontWeight: "700", // bold
            lineHeight: "40px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Título Nivel 2
          ".text-h2": {
            fontSize: "30px", // text-3xl
            fontWeight: "700", // bold
            lineHeight: "36px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Título Nivel 3
          ".text-h3": {
            fontSize: "24px", // text-2xl
            fontWeight: "700", // bold
            lineHeight: "32px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Subtítulo
          ".text-subtitle": {
            fontSize: "18px", // text-lg
            fontWeight: "700", // bold
            lineHeight: "28px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Cuerpo de Texto Principal
          ".text-body": {
            fontSize: "16px", // text-base
            fontWeight: "400", // normal
            lineHeight: "24px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Cuerpo de Texto Pequeño
          ".text-body-sm": {
            fontSize: "14px", // text-sm
            fontWeight: "400", // normal
            lineHeight: "20px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
          // Leyenda o texto muy pequeño
          ".text-caption": {
            fontSize: "12px", // text-xs
            fontWeight: "400", // normal
            lineHeight: "16px",
            color: "#314158",
            fontFamily: '"Source Sans Pro", sans-serif',
          },
        });
      }),
    ],
  }
};
