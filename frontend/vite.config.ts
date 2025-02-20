import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //added tailwind functionality to vite project

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
