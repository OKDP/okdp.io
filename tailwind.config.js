const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gris: {
          lighter: "#A7A7A7",
          light: "#454545",
          dark: "#333333",
        },
        tdp: {
          light: "#25DAC5",
          dark: "#2E6665",
          DEFAULT: "#419290",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
