import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5293',
        secure: false,
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:5293',
        secure: false,
        changeOrigin: true,
      },
      '/register': {
        target: 'http://localhost:5293',
        secure: false,
        changeOrigin: true,
      },
      '/logout' : {
        target: 'http://localhost:5293',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})