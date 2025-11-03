import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,  // Membuka akses di jaringan lokal
    port: 5173, 
  },
  plugins: [react()],
})
