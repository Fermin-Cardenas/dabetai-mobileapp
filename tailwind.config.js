/** @type {import('tailwindcss').Config} */

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
        danger: {
          200: "#FFC9C9",
          500: "#FB2C36",
          800: "#9F0712",
        },
        warning: {
          200: "#FFF085",
          500: "#F0B100",
          800: "#894B00",
        },
        success: {
          200: "#B9F8CF",
          500: "#00C950",
          800: "#016630",
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CAD5E2",
          400: "#90A1B9",
          500: "#62748E",
          600: "#45556C",
          700: "#314158",
          950: "#020618",
        },
      },
      fontFamily: {
        sourceSansPro: ['"Source Sans Pro"', "sans-serif"],
      },
    },
  },
};
