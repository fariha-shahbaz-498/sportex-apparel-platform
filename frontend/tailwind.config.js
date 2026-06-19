/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',   // Premium dark mode background
          light: '#F9F9F9',  // Clean light contrast
          red: '#FF2A2A',    // High-performance athletic red
        }
      }
    },
  },
  plugins: [],
}