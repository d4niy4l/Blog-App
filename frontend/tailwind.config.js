/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'xs': '350px',
      'xxs': '100px',
      ...defaultTheme.screens,
    },
    extend: {
      width: {
        '300': '300px',
        '200': '200px',
        '400': '400px',
        '600': '600px'
      },
    }
  },

  darkMode: "class",
  plugins: [require('flowbite/plugin')],
}

