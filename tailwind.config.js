/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: "#fff",
        "primary-700": "#bbb",
        secondary: "#008ddf",
        gray: "#aaaaaa",
        landingbg:"#241915",
        cardbg:"rgb(87 43 19)",
        cardbg2:"#3E1A0F",
        cardtag:"#cEeAaF",
        cardglass: "rgba(255,255,255,0.1)",
      },
      fontFamily:{
        lobster: ['Lobster', 'cursive'],
        ptsans: ['PT Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

