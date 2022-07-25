/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0295DB",
        secondary: "#F7CB0E",
        dark: "#212121",
        darker: "#181818",
        light: "#FFFFFF",
      },
      fontFamily: {
        iceberg: ["Iceberg", "sans-serif"],
        montserrat: ["Montserrat", "italic"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
