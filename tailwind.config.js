/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",      // <- App Router pages
    "./src/pages/**/*.{js,ts,jsx,tsx}",    // <- Pages Router (if you still have any)
    "./src/components/**/*.{js,ts,jsx,tsx}", // <- Your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
