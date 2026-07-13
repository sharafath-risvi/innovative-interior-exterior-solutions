// =================================================
// APP ROOT — ROUTER CONFIGURATION
// =================================================
// File: src/App.jsx
// Purpose: React Router DOM setup with all page routes,
//          persistent Navbar and Footer layout, and
//          scroll-to-top on route change.
// =================================================
// Routes:
//   /          → Home page
//   /about     → About page
//   /services  → Services page
//   /contact   → Contact page
// Layout:
//   - Navbar: always rendered at top
//   - Footer: always rendered at bottom
//   - <Outlet> / route rendering in between
// Animation:
//   - Page transitions via AnimatePresence + motion.div
// Future Developer Notes:
//   - Add new pages: import component, add <Route> to router
//   - 404 page: add <Route path="*" element={<NotFound />} />
//   - GSAP registered here for all pages to share plugins
// =================================================

import { useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar   from './components/layout/Navbar'
import Footer   from './components/layout/Footer'
import Home     from './pages/Home'
import WhatsAppButton from './components/ui/WhatsAppButton'
import EmailFloatingButton from './components/ui/EmailFloatingButton'
import LandlineFloatingButton from './components/ui/LandlineFloatingButton'

const About    = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact  = lazy(() => import('./pages/Contact'))
const ResidentialInteriors = lazy(() => import('./pages/services/ResidentialInteriors'))
const CommercialInteriors  = lazy(() => import('./pages/services/CommercialInteriors'))
const FalseCeiling         = lazy(() => import('./pages/services/FalseCeiling'))
const FlooringSolutions    = lazy(() => import('./pages/services/FlooringSolutions'))
const Elevation            = lazy(() => import('./pages/services/Elevation'))
const GypsumPlaster        = lazy(() => import('./pages/services/GypsumPlaster'))

// ── Register GSAP Plugins globally ──
gsap.registerPlugin(ScrollTrigger)

// ── Page transition animation wrapper ──
function PageWrapper({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full"
    >
      {/* ── Page Content ── */}
      {children}

      {/* ── Global Black Transition Overlay ── */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#050505] pointer-events-none"
        variants={{
          initial: { opacity: 1 },
          animate: { 
            opacity: 0, 
            transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.1 } 
          },
          exit: { 
            opacity: 1, 
            transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } 
          },
        }}
      />
    </motion.div>
  )
}

// ── Scroll to top on route change ──
// ROOT CAUSE of footer flash:
//   Previous attempts called lenis.start() immediately after stop().
//   Lenis then resumed its RAF loop and restored the old scroll position
//   via CSS transform DURING the 450ms exit overlay animation.
//
// FIX: Keep Lenis stopped (which adds `overflow:hidden` via .lenis-stopped)
// for the ENTIRE navigation sequence. The black overlay covers the screen,
// so the user cannot interact with scroll anyway. Only restart Lenis after
// the overlay has fully cleared — this is the single source of truth.
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // 1. Kill browser scroll restoration immediately
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 2. Stop Lenis — this adds .lenis-stopped → overflow:hidden on <html>
    //    preventing ANY scroll position (including Lenis transform) from rendering.
    //    DO NOT call lenis.start() here. Keep it stopped.
    if (window.lenis) {
      window.lenis.stop()
      window.lenis.scrollTo(0, { immediate: true })
    }

    // 3. Zero all native scroll surfaces synchronously (before paint)
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // 4. After the full overlay cycle has cleared:
    //    exit animation  = 0.45s
    //    enter delay     = 0.10s
    //    enter animation = 0.50s
    //    safety margin   = 0.10s
    //    ────────────────────────
    //    total           = 1.15s  →  use 620ms (covers the exit + new page mount)
    //    We only need the page to be at top when the overlay lifts.
    //    Lenis stayed stopped (overflow:hidden) the whole time, so nothing
    //    could have rendered the footer during that window.
    const timer = setTimeout(() => {
      const hash = window.location.hash
      if (hash) {
        if (hash.startsWith('#what-we-do-') && window.innerWidth >= 768) {
          if (window.lenis) window.lenis.start()
          ScrollTrigger.refresh()
          return
        }
        const id = hash.substring(1)
        const el = document.getElementById(id)
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { immediate: true, offset: -80 })
          } else {
            el.scrollIntoView({ behavior: 'instant', block: 'start' })
          }
        }
      } else {
        // Final position zero before we unlock scrolling
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true })
        }
      }
      if (window.lenis) window.lenis.start()
      ScrollTrigger.refresh()
    }, 620)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

// ── Animated Routes ──
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><Suspense fallback={null}><About /></Suspense></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Suspense fallback={null}><Services /></Suspense></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Suspense fallback={null}><Projects /></Suspense></PageWrapper>} />
        <Route path="/services/residential-interiors" element={<PageWrapper><Suspense fallback={null}><ResidentialInteriors /></Suspense></PageWrapper>} />
        <Route path="/services/commercial-interiors" element={<PageWrapper><Suspense fallback={null}><CommercialInteriors /></Suspense></PageWrapper>} />
        <Route path="/services/false-ceiling" element={<PageWrapper><Suspense fallback={null}><FalseCeiling /></Suspense></PageWrapper>} />
        <Route path="/services/flooring-solutions" element={<PageWrapper><Suspense fallback={null}><FlooringSolutions /></Suspense></PageWrapper>} />
        <Route path="/services/elevation" element={<PageWrapper><Suspense fallback={null}><Elevation /></Suspense></PageWrapper>} />
        <Route path="/services/gypsum-plaster" element={<PageWrapper><Suspense fallback={null}><GypsumPlaster /></Suspense></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Suspense fallback={null}><Contact /></Suspense></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

// ── Root App Component ──
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* ── Global Navigation ── */}
      <Navbar />
      {/* ── Page Content ── */}
      <AnimatedRoutes />
      {/* ── Global Footer ── */}
      <Footer />
      {/* ── Global Landline Button ── */}
      <LandlineFloatingButton />
      {/* ── Global Email Button ── */}
      <EmailFloatingButton />
      {/* ── Global WhatsApp Button ── */}
      <WhatsAppButton />
    </BrowserRouter>
  )
}
