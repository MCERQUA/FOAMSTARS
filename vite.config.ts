import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow both VITE_ and NETLIFY_ prefixed env vars to be exposed to client
  envPrefix: ['VITE_', 'NETLIFY_'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          bootstrap: ['bootstrap'],
          icons: ['react-icons'],
          maps: ['@react-google-maps/api'],
          ui: ['swiper', 'react-select', 'yet-another-react-lightbox'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'bootstrap'],
  },
})
