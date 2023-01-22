/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayPrimary: '#f3f6f9',
        darkPrimary: '#24292e',
        darkSecond: '#343a3f',
        // darkSecond: '#343a3f',
      }
    },
    fontFamily: {
      ssp: ['Source Sans Pro', 'sans-serif'],
    },
  },
  plugins: [],
}
