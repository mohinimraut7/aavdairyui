/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "farm-green": "#2E7D32",
        "farm-green-dark": "#1B5E20",
        "farm-golden": "#D4A017",
        "farm-brown": "#8D6E63",
        "farm-cream": "#FFFDF6",
        forest: "#1B4332",
        primary: "#2E7D32",
        "primary-dark": "#1B5E20",
        cream: "#FFFDF6",
      },
      fontFamily: {
        display: ["Poppins", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
