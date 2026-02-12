import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  // base is the fix for mime-type error in console-
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Points to the Nodejs backend we made separately 
        changeOrigin: true,
      }
    }
  }

})
