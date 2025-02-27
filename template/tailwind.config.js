/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: ['alert-info', 'alert-warn'],
  theme: {
    extend: {},
  },
  plugins: [],
};
