/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: ['alert-info', 'alert-tip', 'alert-warn', 'marker', 'table-wrapper'],
  theme: {
    extend: {},
  },
  plugins: [],
};
