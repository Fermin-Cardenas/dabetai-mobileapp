/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
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
          500: "#2196F3",
          700: "#1976D2",
          900: "#0D47A1",
        },
        secondary: {
          50: "#E0F2F1",
          100: "#B2DFDB",
          300: "#4DB6AC",
          500: "#009688",
          700: "#00796B",
          900: "#004D40",
        },
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
        },
        // Título Nivel 1
        ".text-h1": {
          fontSize: "36px", // text-4xl
          fontWeight: "700", // bold
          lineHeight: "40px",
          color: "#314158",
        },
        // Título Nivel 2
        ".text-h2": {
          fontSize: "30px", // text-3xl
          fontWeight: "700", // bold
          lineHeight: "36px",
          color: "#314158",
        },
        // Título Nivel 3
        ".text-h3": {
          fontSize: "24px", // text-2xl
          fontWeight: "700", // bold
          lineHeight: "32px",
          color: "#314158",
        },
        // Subtítulo
        ".text-subtitle": {
          fontSize: "18px", // text-lg
          fontWeight: "700", // bold
          lineHeight: "28px",
          color: "#314158",
        },
        // Cuerpo de Texto Principal
        ".text-body": {
          fontSize: "16px", // text-base
          fontWeight: "400", // normal
          lineHeight: "24px",
          color: "#314158",
        },
        // Cuerpo de Texto Pequeño
        ".text-body-sm": {
          fontSize: "14px", // text-sm
          fontWeight: "400", // normal
          lineHeight: "20px",
          color: "#314158",
        },
        // Leyenda o texto muy pequeño
        ".text-caption": {
          fontSize: "12px", // text-xs
          fontWeight: "400", // normal
          lineHeight: "16px",
          color: "#314158",
        }
      });
    }),
  ],
};
