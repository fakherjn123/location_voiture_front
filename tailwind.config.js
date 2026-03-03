/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif']
      },
      colors: {
        "primary": "#1e3b8a",
        "background-light": "#f6f6f8",
        "background-dark": "#0a0e17",
        "slate-custom": {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          100: "#f1f5f9",
        }
      },
      borderRadius: {
        "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"
      }
    },
  },
  plugins: [],
}