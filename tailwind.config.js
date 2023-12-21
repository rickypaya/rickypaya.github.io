/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./exhibit/*.html"],
  theme: {
    extend: {
      colors: {
        'dark-black': '#14161b',
        'grad-bg': '#999955',
        'card-bg': '#E9E2D0',
        'res-grad-bg': '#D6D58E'
      }
    },
    boxShadow: {
      'card-shadow': '-20px 0 35px -25px black, 20px 0 35px -25px black',
    },
    height: {
      'glph': '200px',
      'glsm':  '1000px',
      'glmd': '900px',
      'gradh': '300px',
      'res-gradh': '500px',
    }
  },
  plugins: [],
}

