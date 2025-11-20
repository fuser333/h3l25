/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#E15845',
          secondary: '#F06D43',
          dark: '#D14535',
          glow: '#FF7F6E',
        },
        forest: {
          DEFAULT: '#155E54',
          secondary: '#0F4A42',
          glow: '#2C8C7E',
        },
        turquoise: '#0E45B1',
        gray: {
          dark: '#0D1321',
          darker: '#05080F',
          medium: '#4A5568',
          light: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
