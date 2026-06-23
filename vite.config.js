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

  // Pre-bundle these deps so Vite doesn't waterfall-discover them at runtime
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      'gsap/ScrollTrigger',
      'framer-motion',
      'lenis',
    ],
  },

  build: {
    // Raise the inline limit so small assets become data URIs (avoids extra requests)
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // ── Manual chunk splitting ──────────────────────────────────────────
        // Splitting vendor libs into separate cached chunks means:
        //   • Browser can parallel-download app code + vendor code
        //   • Vendor chunks are long-cache-stable (change rarely)
        //   • Initial JS parse work is spread across multiple smaller files
        manualChunks(id) {
          // React core — smallest, loaded first
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          // Router — tiny, separate so it doesn't inflate react chunk
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/react-router/')) {
            return 'vendor-router'
          }
          // GSAP + ScrollTrigger — large, separate chunk
          if (id.includes('node_modules/gsap/')) {
            return 'vendor-gsap'
          }
          // Framer Motion — large, lazy-loaded pages use it
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-framer'
          }
          // Lenis smooth scroll — small but separate for clarity
          if (id.includes('node_modules/lenis/')) {
            return 'vendor-lenis'
          }
        },
      },
    },
  },
})
