import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Securely bundle Tailwind v4 compiler into the Vite asset transformation pipeline
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ]
})