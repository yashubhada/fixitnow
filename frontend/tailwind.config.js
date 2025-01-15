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
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
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