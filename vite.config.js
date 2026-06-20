// =================================================
// VITE CONFIGURATION
// =================================================
// Purpose: Configure Vite with React and Tailwind CSS plugins
// =================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
