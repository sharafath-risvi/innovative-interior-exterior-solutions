// =================================================
// PROJECT DETAIL MODAL COMPONENT
// =================================================
// File: src/components/sections/projects/ProjectDetailModal.jsx
// Purpose: Glassmorphic interactive modal displaying deep project
//          specifications, high-res imagery, overview, and CTA.
//          Fitted naturally without any vertical scrollbar.
// =================================================

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ProjectDetailModal({ project, onClose }) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      if (window.lenis) window.lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
    return () => {
      document.body.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
  }, [project])

  if (!project) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container — Fits content naturally without scrollbars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl bg-[#141414] border border-white/15 rounded-2xl md:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden max-h-[95vh] flex flex-col text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-orange-500 border border-white/20 hover:border-orange-400 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md group"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Header Image — Optimized height to fit naturally */}
          <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden bg-gray-900 shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            
            {/* Badges on Image */}
            <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-orange-500 text-white shadow-lg">
                {project.category}
              </span>
              {project.scale && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  {project.scale}
                </span>
              )}
            </div>

            {/* Title & Location Overlay */}
            <div className="absolute bottom-5 left-6 right-6 z-20">
              <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-1.5">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{project.location}</span>
                {project.year && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">Completed in {project.year}</span>
                  </>
                )}
              </div>
              <h2 id="modal-project-title" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content Area — Fitted naturally without scrollbar */}
          <div className="p-5 sm:p-6 md:p-8 space-y-5 overflow-hidden">
            {/* Overview Section */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-400 mb-2.5">
                Project Overview
              </h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Quality Commitment Notice */}
            <div className="border-l-2 border-orange-500 pl-4 py-1 text-xs sm:text-sm text-gray-400 italic">
              "Every material, structural fixture, and surface finish delivered by Innovative Interior & Exterior Solutions (IIES) undergoes rigorous inspection to guarantee uncompromising durability, precision, and aesthetic supremacy."
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#1a1a1a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div>
              <p className="text-white font-semibold text-base">Inspired by this project?</p>
              <p className="text-gray-400 text-sm">Let our engineers and designers craft a bespoke solution for your space.</p>
            </div>
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-sm text-white tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(247,135,1,0.3)] bg-gradient-to-r from-orange-500 to-[#FC6B00] flex items-center justify-center gap-2 shrink-0"
            >
              <span>Get a Quote</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
