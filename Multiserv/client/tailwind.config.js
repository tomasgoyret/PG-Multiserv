const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      green: colors.emerald,
      yellow: colors.amber,
      blue: colors.blue,
      cyan: colors.cyan,
      indigo: colors.indigo,
      purple: colors.violet,
      sky: colors.sky,
      violet: colors.violet,
      rose: colors.rose
    }
  },
  variants: {
    extend: {
      dropShadow: ['hover', 'focus'],
      padding: ['hover', 'focus'],
    },
  },
  plugins: [],
}
