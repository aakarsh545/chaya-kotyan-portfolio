/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: "#F4A896", // Primary peach-ish pink
          light: "#FCEAE5",
          soft: "#F8C5B9",
          deep: "#E58774",
          dark: "#B85542",
        },
        midnight: "#0B1426", // Complementary midnight indigo
        saree: "#1F4E79",
        cream: "#F6EBD9",
        aqua: "#9ED8D2",
        hibiscus: "#E0728F",
        leaf: "#2F5D3A",
        gold: "#D9A441",
      },
      fontFamily: {
        bodoni: ['"Bodoni Moda"', 'serif'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'sway-slow': 'sway 8s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}
