import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // <--- This sets the frontend port
    historyApiFallback: true, // tells server to fallback to index.html
  },
  appType: 'spa', // <-- Add this for Vite 4+ to ensure SPA fallback
})
