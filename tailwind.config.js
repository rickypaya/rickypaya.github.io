/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        'dark-black': '#14161b',
        'grad-bg': '#999955',
        'card-bg': '#E9E2D0',
      }
    },
    boxShadow: {
      'card-shadow': '-20px 0 35px -25px black, 20px 0 35px -25px black',
    }
  },
  plugins: [],
}

