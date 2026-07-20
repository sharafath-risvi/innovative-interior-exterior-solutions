// =================================================
// NAVBAR COMPONENT
// =================================================
// File: src/components/layout/Navbar.jsx
// Purpose: Sticky navigation bar with glassmorphism effect,
//          scroll-aware background change, active link highlight,
//          and animated mobile hamburger menu.
// =================================================
// Animation:
//   - Scrolled state: glass background appears
//   - Mobile: slide-down menu with staggered link animation
//   - Active link: orange underline indicator
// Responsive:
//   - Desktop: horizontal links
//   - Mobile/Tablet: hamburger → full overlay menu
// Future Developer Notes:
//   - To add more nav links, update NAV_LINKS in src/lib/constants.js
//   - Logo swap: change /IIESlogo.webp to new asset
// =================================================

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_LINKS } from '../../lib/constants'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const location = useLocation()
  const { scrollY } = useScroll()

  // ── Intelligent Scroll Behavior ──
  // Hides navbar when scrolling down, shows when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()

    // 1. Switch to glass background after 60px
    if (latest > 60) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }

    // 2. Intelligent hide/show logic
    if (latest > previous && latest > 150) {
      // Scrolling down and past threshold -> hide
      setHidden(true)
    } else {
      // Scrolling up or at the top -> show
      setHidden(false)
    }
  })

  // ── Close mobile menu on route change ──
  useEffect(() => { setMenuOpen(false) }, [location])

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: hidden ? '-100%' : '0%', opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.5)] border-b border-white/15'
            : 'bg-transparent border-transparent'
        }`}
        style={{ 
          height: 'var(--nav-height)', 
          background: scrolled ? 'rgba(28, 28, 32, 0.82)' : 'transparent' 
        }}
        role="banner"
      >
        <div
          className="relative flex items-center justify-between px-6 md:px-12 lg:px-20 h-full"
          style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
        >
          {/* ── Mobile Centered Branding ── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden pointer-events-none flex items-center justify-center">
            <img
              src="/IIESTEXT1.webp"
              alt="Innovative Interior & Exterior Solutions"
              className="h-[24px] w-auto object-contain"
            />
          </div>

          {/* ── Logo ── */}
          <Link 
            to="/" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
            }}
            aria-label="IIES Home"
          >
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/IIES.webp"
                alt="IIES Logo"
                className="w-[55px] h-[55px] object-contain shrink-0"
              />
              <img
                src="/IIESTEXT1.webp"
                alt="Innovative Interior & Exterior Solutions"
                className="hidden sm:block h-[30px] md:h-[40px] lg:h-[45px] w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => {
                  if (link.href === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
                  }
                }}
                className={`relative text-[15px] font-semibold tracking-widest transition-colors duration-300 group text-white/90 ${isActive(link.href) ? '!text-orange-500' : 'hover:text-orange-500'}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
                {/* Active / hover underline */}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ background: 'var(--color-orange)' }}
                />
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                id="navbar-cta"
                className="px-8 py-3.5 rounded-full text-[15px] font-bold text-white transition-all duration-300 tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                  boxShadow: '0 4px 20px rgba(247,135,1,0.35)',
                }}
              >
                Get a Quote
              </Link>
            </motion.div>
          </nav>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            id="mobile-menu-btn"
            className="md:hidden flex flex-col gap-1.5 p-2 transition-colors text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-current rounded-full origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-4 h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-current rounded-full origin-center transition-all"
            />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden backdrop-blur-md"
            style={{ background: 'rgba(28, 28, 32, 0.82)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className={`font-display text-4xl font-semibold transition-colors ${
                      isActive(link.href) ? 'text-orange-500' : 'text-white/90 hover:text-orange-500'
                    }`}
                    onClick={() => {
                      setMenuOpen(false)
                      if (link.href === '/') {
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                          if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
                        }, 100) // Small delay to let menu close first
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 px-8 py-3 rounded-full text-white font-semibold text-lg"
                  style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))' }}
                >
                  Get a Quote
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
