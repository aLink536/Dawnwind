/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.liquid', './assets/**/*.js'],
  safelist: [
    'aspect-square',
    'aspect-[4/5]',
    'aspect-[5/4]',
    'aspect-auto',
    'opacity-50',
    'opacity-100',
    'pointer-events-none',
    'rotate-180',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
