/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        dash: {
          "0%": { "stroke-dasharray": "1, 200", "stroke-dashoffset": "0" },
          "50%": { "stroke-dasharray": "90, 200", "stroke-dashoffset": "-35px" },
          "75%": { "stroke-dasharray": "200, 200", "stroke-dashoffset": "-100px" },
          "100%": { "stroke-dasharray": "200, 200", "stroke-dashoffset": "-200px" },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        dash: "dash 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".custom-scrollbar": {
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "#000 #FFF", // For Firefox
        },
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "5px", // Scrollbar width
        },
        ".custom-scrollbar::-webkit-scrollbar-track": {
          background: "#FFF", // Track color
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          background: "#000", // Thumb color
          borderRadius: "9999px", // Rounded edges
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
          background: "#555", // Thumb hover color
        },
      });
    },
  ],
}