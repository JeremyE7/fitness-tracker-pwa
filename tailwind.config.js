/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0a1f0a',
          secondary: '#1a2e1a',
          tertiary: '#0d1b0d',
          card: '#1a2e1a',
        },
        green: {
          primary: '#22c55e',
          secondary: '#16a34a',
          dark: '#15803d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}