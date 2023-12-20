/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./exhibit/*.html"],
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
    },
    height: {
      'glsm':  '800px',
      'glmd': '1000px',
      'gllg': '1100px',
      'gradh': '300px',
      'icon-mini': '24px',
      'icon-normal': '40px',
      'hero-main': '80px',
    }
  },
  plugins: [],
}

