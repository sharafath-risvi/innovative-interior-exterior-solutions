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

import { useEffect } from 'react'
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
import About    from './pages/About'
import Services from './pages/Services'
import Contact  from './pages/Contact'

// ── Register GSAP Plugins globally ──
gsap.registerPlugin(ScrollTrigger)

// ── Page transition animation wrapper ──
const pageVariants = {
  initial:  { opacity: 0, y: 15 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

// ── Scroll to top on route change ──
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // ── Refresh ScrollTriggers after route change ──
    ScrollTrigger.refresh()
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
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
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
    </BrowserRouter>
  )
}
