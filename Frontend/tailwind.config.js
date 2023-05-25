/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'Open Sans', "sans-serif"],
       },
       animation: {
        'bannermove': 'bannermove 20s linear infinite',
      },
      keyframes: {
        bannermove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}