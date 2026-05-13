/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF6700',
          dark:    '#FF5500',
          light:   '#FF8533',
          50:      '#FFF7ED',
          100:     '#FFEDD5',
          200:     '#FED7AA',
          600:     '#FF5500',
          700:     '#CC5300',
          800:     '#993F00',
        },
      },
      fontFamily: {
        sans: ['Cairo', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
