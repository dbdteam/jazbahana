/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0295DB",
        secondary: "#F7CB0E",
        dark: "#212121",
        input: "#767676",
      },
      fontFamily: {
        "days-one": ["Days One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
