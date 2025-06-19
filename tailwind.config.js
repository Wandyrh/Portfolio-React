/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        react: {
          DEFAULT: "#61dafb",
          dark: "#20232a"
        }
      }
    },
  },
  plugins: [],
}