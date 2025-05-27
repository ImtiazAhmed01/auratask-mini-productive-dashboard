import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: '#00C853',
  //       secondary: '#C8F7DC',
  //       textgray: '#666666',
  //       darkgray: '#2C2C2C',
  //       inputborder: '#DADADA',
  //     }
  //   }
  // }
  plugins: [react(), tailwindcss()],
})
