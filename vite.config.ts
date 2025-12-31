import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pass Netlify's database URL to the client as VITE_DATABASE_URL
  define: {
    'import.meta.env.VITE_DATABASE_URL': JSON.stringify(process.env.NETLIFY_DATABASE_URL || process.env.VITE_DATABASE_URL || ''),
  },
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
