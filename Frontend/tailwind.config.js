/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#DCF9FF',
        'light-blue-100': '#60D9FF80',
        'cornflower-blue': '#608DFF'
      },
      backgroundImage: {
        'light-blue-gradient': 'linear-gradient(135deg, #FAFEFF 0%, rgba(222, 249, 255, 0.38) 94.33%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation : {
        'spin-slow-30': 'spin 30s linear infinite',
        'spin-slow-25': 'spin 25s linear infinite',
        'spin-slow-10': 'spin 10s linear infinite',
        'marquee-infinite' : 'marquee 25s linear infinite',
      },
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