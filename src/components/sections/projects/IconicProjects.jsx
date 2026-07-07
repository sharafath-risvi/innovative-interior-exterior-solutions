// =================================================
// ICONIC PROJECTS SECTION (SECTION 2) — LUXURY AUTO SLIDER
// =================================================
// File: src/components/sections/projects/IconicProjects.jsx
// Purpose: Dedicated premium highlight section showcasing IIES's
//          most landmark projects. Displays ONLY ONE project at a time
//          occupying the full row with an infinite 5-second auto slider
//          and minimal indicator dots.
//          Acts purely as a visual showcase (clicking disabled).
// =================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../../ui/SectionHeading'
import { ICONIC_PROJECTS } from './projectsData'

export default function IconicProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto slider: transitions every 5 seconds infinitely
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ICONIC_PROJECTS.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex, isPaused])

  const handleDotClick = (idx) => {
    setCurrentIndex(idx)
  }

  const currentProject = ICONIC_PROJECTS[currentIndex]

  return (
    <section
      id="iconic-projects"
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-[#0e0e0e] text-white border-b border-white/10 overflow-hidden z-10"
      aria-label="Iconic Landmark Projects Showcase"
    >
      {/* ── Background Luxury Ambient Glow ── */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, var(--color-orange) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, var(--color-orange-sec) 0%, transparent 70%)' }}
      />

      <div
        className="px-6 md:px-12 lg:px-20 relative z-10"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* Section Heading */}
        <div className="mb-14 md:mb-16">
          <SectionHeading
            badge="Landmark Masterpieces"
            title="Iconic"
            titleAccent="Projects"
            subtitle={
              <span>
                Our landmark projects showcase engineering excellence, precision craftsmanship, and trusted execution across India&apos;s most recognized commercial and infrastructure developments.{' '}
              </span>
            }
            centered={true}
            light={true}
          />
        </div>

        {/* ── Full-Row Single Landmark Showcase Container (Pure Visual Showcase) ── */}
        <div
          className="relative w-full rounded-[24px] lg:rounded-[36px] overflow-hidden border border-white/15 hover:border-orange-500/60 shadow-[0_25px_80px_rgba(0,0,0,0.8)] transition-all duration-700 bg-[#141414] group"
          style={{ height: 'clamp(480px, 70vh, 720px)' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full cursor-default flex flex-col justify-end"
              role="figure"
              aria-label={`Iconic Landmark Showcase: ${currentProject.title}`}
            >
              {/* Full-Width Landscape Image */}
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-105"
                loading="lazy"
              />

              {/* Premium Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/65 to-transparent opacity-95 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/85 via-black/30 to-transparent opacity-80 pointer-events-none" />

              {/* Subtle orange border glow animation */}
              <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/30 rounded-[24px] lg:rounded-[36px] transition-all duration-500 pointer-events-none" />

              {/* Top Bar Badges */}
              <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-between gap-3 z-20 pointer-events-none">
                <span className="px-4.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-orange-500 to-[#FC6B00] text-white shadow-lg">
                  {currentProject.category}
                </span>
                <span className="px-4.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 backdrop-blur-md border border-white/20 text-gray-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{currentProject.location}</span>
                </span>
              </div>

              {/* Bottom Content Area */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 p-6 sm:p-10 lg:p-14 max-w-4xl"
              >
                {currentProject.scale && (
                  <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-orange-400 mb-2.5">
                    {currentProject.scale}
                  </p>
                )}

                <h3 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 group-hover:text-orange-400 transition-colors duration-300">
                  {currentProject.title}
                </h3>

                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal line-clamp-3 max-w-3xl">
                  {currentProject.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Counter Overlay */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs sm:text-sm font-semibold tracking-widest text-gray-300 pointer-events-none">
            <span className="text-orange-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-gray-500 mx-1">/</span>
            <span>{String(ICONIC_PROJECTS.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* ── Minimal Premium Indicator Dots Below Image ── */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-8">
          {ICONIC_PROJECTS.map((proj, idx) => {
            const isActive = idx === currentIndex
            return (
              <button
                key={proj.id}
                onClick={() => handleDotClick(idx)}
                aria-label={`Showcase project: ${proj.title}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'w-10 sm:w-12 bg-gradient-to-r from-orange-500 to-[#FC6B00] shadow-[0_0_15px_rgba(247,135,1,0.6)]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
