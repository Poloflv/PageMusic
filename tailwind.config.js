/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "purple-bg": "#0F0817",
        "yellow-border": "#FFE24B"
      },
      backgroundImage: {
        "purple-light": "linear-gradient(98deg, #886AE2 43.66%, #A284F6 116.16%)",
        "purple-dark": "linear-gradient(98deg, rgba(61, 46, 149, 0.35) 0%, #3D2E95 100%)"
      }
    },
    fontFamily: {
      "urbanist": ['Urbanist', 'sans-serif'],
    }
  },
  plugins: [],
}

