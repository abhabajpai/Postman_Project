/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        
        
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.px-inline-custom': {
          paddingInline: 'calc(var(--padding) / 2)',
        },
        '.px-inline-var':{
          paddingInline: 'var(--padding)',
        },
      })
    },
  ],
};