/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C853',
        secondary: '#C8F7DC',
        textgray: '#666666',
        darkgray: '#2C2C2C',
        inputborder: '#DADADA',
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // enable light and dark themes
  },
}
