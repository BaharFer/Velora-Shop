/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        parchment: "#E8DED0",
        champagne: "#D4AF37",
        canvas: "#FAF8F5",
        body: "#222222",
      },
      fontFamily: {
        display: ["Cormorant", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
