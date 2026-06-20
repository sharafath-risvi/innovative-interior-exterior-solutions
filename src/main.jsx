// =================================================
// APPLICATION ENTRY POINT
// =================================================
// File: src/main.jsx
// Purpose: React DOM root rendering with Lenis smooth scroll
//          initialization. Lenis is integrated with GSAP's
//          ScrollTrigger for synchronized animation timing.
// =================================================
// Libraries initialized here:
//   - React 19 createRoot
//   - Lenis smooth scroll (connected to RAF loop)
//   - GSAP ScrollTrigger ticker integration
// Future Developer Notes:
//   - Lenis options: adjust 'lerp' for scroll smoothness (0.1 = smooth, 1 = instant)
//   - Disable Lenis on mobile: add media query check before init
//   - Remove <StrictMode> if double-effect GSAP issues arise
// =================================================

import React from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.jsx'
import './index.css'

// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger)

// ── Initialize Lenis Smooth Scroll ──
const lenis = new Lenis({
  lerp: 0.1,          // Smooth factor: lower = smoother (0.05–0.15 recommended)
  smoothWheel: true,
  syncTouch: false,   // Disable touch sync for native mobile feel
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease
})
window.lenis = lenis // Expose to window for scroll locking

// ── Connect Lenis to GSAP's RAF ticker ──
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// ── Update ScrollTrigger on Lenis scroll ──
lenis.on('scroll', ScrollTrigger.update)

// ── Mount React ──
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
