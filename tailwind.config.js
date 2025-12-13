/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF3E1',       // Light Cream (Background)
          card: '#F5E7C6',     // Sand (Cards/Secondary)
          accent: '#FF6D1F',   // Orange (Buttons/Highlights)
          dark: '#222222',     // Black (Text)
          // Dark Mode Palette
          'dark-bg': '#1a1a1a',
          'dark-card': '#2d2d2d',
          'dark-text': '#e5e5e5',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'], // Added sans for UI elements
      }
    },
  },
  plugins: [],
}