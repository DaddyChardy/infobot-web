/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",      // <- App Router pages
    "./src/pages/**/*.{js,ts,jsx,tsx}",    // <- Pages Router (if you still have any)
    "./src/components/**/*.{js,ts,jsx,tsx}", // <- Your components
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        gradient: "gradient 8s linear infinite",
      },
      maxWidth: {
        '4xl': '56rem',
      },
    },
  },
  plugins: [],
};
