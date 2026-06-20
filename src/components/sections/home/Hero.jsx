// =========================================
// HOMEPAGE HERO – CINEMATIC PRESENTATION
// =========================================
// File: src/components/sections/home/Hero.jsx
// Purpose: Cinematic video storytelling hero.
//          Scroll intent is locked via capture-phase DOM listeners until the sequence completes.
//          Original video quality preserved with no dark overlays.
// =========================================

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import premiumHeroBg from '../../../assets/images/premium-hero-interior.png'

// ── Animation variants for Initial Intro ──
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

// ── Two Content Chapters ──
const contentChapters = [
  {
    id: 1,
    title: 'Luxury Interior Design',
    desc: 'Creating elegant living spaces that blend comfort, craftsmanship, and timeless design.',
  },
  {
    id: 2,
    title: 'Innovative Exterior Solutions',
    desc: 'Modern architecture designed with precision, functionality, and exceptional quality.',
  },
]

export default function Hero() {
  // State Machine for the presentation
  // 0 = Intro
  // 1 = Playing to Checkpoint 1
  // 2 = Paused at Checkpoint 1 (Content 1 visible)
  // 3 = Playing to Checkpoint 2
  // 4 = Paused at Checkpoint 2 (Content 2 visible)
  // 5 = Playing to End
  // 6 = Finished (Allow scroll)
  const [uiStep, setUiStep] = useState(0)
  
  const stepRef = useRef(0)
  const isPlayingRef = useRef(false)
  const isCooldownRef = useRef(false)

  useEffect(() => {
    // If the user reloads while already scrolled down the page,
    // we instantly finish the sequence to prevent trapping them.
    if (window.scrollY > 50) {
      stepRef.current = 6
      setUiStep(6)
      return
    }

    // Force scroll to top
    window.scrollTo(0, 0)

    const progressSequence = () => {
      isPlayingRef.current = true
      isCooldownRef.current = true
      
      // Cooldown to prevent trackpad momentum from immediately triggering the next step
      setTimeout(() => {
        isCooldownRef.current = false
      }, 1000)

      // Simulate the cinematic delays that the video previously provided
      if (stepRef.current === 0) {
        stepRef.current = 1
        setUiStep(1)
        setTimeout(() => {
           stepRef.current = 2
           setUiStep(2)
           isPlayingRef.current = false
        }, 800)
      } else if (stepRef.current === 2) {
        stepRef.current = 3
        setUiStep(3)
        setTimeout(() => {
           stepRef.current = 4
           setUiStep(4)
           isPlayingRef.current = false
        }, 800)
      } else if (stepRef.current === 4) {
        stepRef.current = 5
        setUiStep(5)
        setTimeout(() => {
           stepRef.current = 6
           setUiStep(6)
           isPlayingRef.current = false
        }, 800)
      }
    }

    // ── NATIVE EVENT CAPTURE FOR BULLETPROOF SCROLL LOCK ──
    const handleWheel = (e) => {
      if (stepRef.current < 6) {
        e.preventDefault()
        e.stopPropagation() // completely hide the scroll from Lenis

        if (e.deltaY > 0 && !isPlayingRef.current && !isCooldownRef.current) {
          progressSequence()
        }
      }
    }

    let startY = 0
    const handleTouchStart = (e) => {
      if (stepRef.current < 6) {
        startY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (stepRef.current < 6) {
        const deltaY = startY - e.touches[0].clientY
        
        // Prevent default only if swiping vertically to allow horizontal swipes if any
        if (Math.abs(deltaY) > 5) {
          e.preventDefault()
          e.stopPropagation()
        }

        if (deltaY > 40 && !isPlayingRef.current && !isCooldownRef.current) {
          progressSequence()
          startY = e.touches[0].clientY // reset
        }
      }
    }

    // Use capture phase to intercept intents before any smooth scroller (Lenis) gets them
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchstart', handleTouchStart, { capture: true })
      window.removeEventListener('touchmove', handleTouchMove, { capture: true })
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white" aria-label="Hero Video Storytelling">
      
      {/* ── IMAGE BACKGROUND ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={premiumHeroBg} 
          alt="Premium Architecture"
          className="w-full h-full object-cover pointer-events-none brightness-[0.85]"
        />
        {/* Overlays removed to preserve original high-res image quality */}
      </div>

      {/* =========================================
          HOMEPAGE HERO – INITIAL INTRO
          ========================================= */}
      <AnimatePresence>
        {uiStep === 0 && (
          <motion.div 
            key="intro"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-10 w-full px-6 md:px-12 flex flex-col items-center justify-center text-center"
            style={{ maxWidth: 'var(--container-max)', margin: '0 auto', paddingTop: 'var(--nav-height)' }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6 max-w-5xl mx-auto"
            >
              {/* ── Floating IIES Logo ── */}
              <motion.div variants={itemVariants} className="animate-float">
                <img
                  src="/IIESlogo.png"
                  alt="Innovative Interior & Exterior Solutions"
                  className="w-28 h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* ── Badge ── */}
              <motion.div variants={itemVariants}>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{
                    background: 'rgba(247,135,1,0.15)',
                    border: '1px solid rgba(247,135,1,0.4)',
                    color: '#FFA040',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Premium Interior &amp; Exterior Solutions
                </span>
              </motion.div>

              {/* ── Main Headline ── */}
              <motion.h1
                variants={itemVariants}
                className="font-display font-bold text-white leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
              >
                Crafting Spaces{' '}
                <br className="hidden sm:block" />
                That{' '}
                <em
                  className="not-italic"
                  style={{
                    background: 'linear-gradient(135deg, #F78701 0%, #FC6B00 50%, #FFA040 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Inspire.
                </em>
              </motion.h1>

              {/* ── Sub-headline ── */}
              <motion.p
                variants={itemVariants}
                className="text-white/75 max-w-2xl leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontFamily: 'var(--font-serif)' }}
              >
                Where visionary design meets masterful execution. We transform ordinary spaces into extraordinary experiences — blending luxury aesthetics with uncompromising craftsmanship.
              </motion.p>

              {/* ── CTA Buttons ── */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    className="btn-glow inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-sec) 100%)',
                      boxShadow: '0 8px 32px rgba(247,135,1,0.45), 0 2px 8px rgba(247,135,1,0.2)',
                    }}
                  >
                    Explore Our Work
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Our Services
                  </Link>
                </motion.div>
              </motion.div>

              {/* ── Stats Strip ── */}
              <motion.div variants={itemVariants} className="flex items-center gap-8 mt-4 flex-wrap justify-center">
                {[
                  { value: '250+', label: 'Projects' },
                  { value: '8+',   label: 'Years' },
                  { value: '98%',  label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <div className="w-px h-8 bg-white/20" />}
                    <div className="text-center">
                      <p className="font-display font-bold text-white text-xl leading-none">{stat.value}</p>
                      <p className="text-white/60 text-xs mt-1 tracking-widest uppercase">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              aria-hidden="true"
            >
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-2 rounded-full bg-white/60" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          CONTENT REVEALS (SCENE 2 & 3)
          ========================================= */}
      <AnimatePresence>
        {uiStep === 2 && (
          <motion.div 
            key="chapter1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6"
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl drop-shadow-2xl">
              {contentChapters[0].title}
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg md:text-2xl font-serif italic max-w-2xl drop-shadow-lg">
              {contentChapters[0].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uiStep === 4 && (
          <motion.div 
            key="chapter2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6"
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl drop-shadow-2xl">
              {contentChapters[1].title}
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg md:text-2xl font-serif italic max-w-2xl drop-shadow-lg">
              {contentChapters[1].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
