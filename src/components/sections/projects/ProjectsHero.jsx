// =================================================
// PROJECTS HERO SECTION
// =================================================
// File: src/components/sections/projects/ProjectsHero.jsx
// Purpose: Cinematic hero section for the Projects portfolio page
//          showcasing IIES's legacy of architectural excellence.
// =================================================

import { motion } from 'framer-motion'

export default function ProjectsHero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { duration: 1.2, offset: -80 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#050505] pt-28 pb-16"
      aria-label="Projects Portfolio Hero"
    >
      {/* ── Background Glow Effects ── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-orange) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, var(--color-orange-sec) 0%, transparent 70%)' }}
      />

      {/* ── Architectural Blueprint Grid Overlay ── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div
        className="relative z-10 px-6 md:px-12 lg:px-20 text-center max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-orange-400">
            Our Portfolio & Landmarks
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-white leading-[1.1] mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Architectural Excellence &{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Masterful Execution
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-normal"
        >
          From monumental national heritage structures like the Statue of Unity and major urban infrastructure like Chennai Metro Rail, to ultra-luxury corporate headquarters and bespoke residences — explore the spaces that define our expertise and legacy.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => scrollToSection('iconic-projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-semibold text-sm sm:text-base tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(247,135,1,0.3)] flex items-center justify-center gap-2 group"
            style={{
              background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
            }}
          >
            <span>Explore Iconic Projects</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollToSection('completed-projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-semibold text-sm sm:text-base tracking-wide uppercase border border-white/20 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>View All Completed Projects</span>
          </button>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest uppercase cursor-pointer"
        onClick={() => scrollToSection('iconic-projects')}
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
