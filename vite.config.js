import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/customers': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/api': 'http://localhost:3000',

    }
  }
   
})
