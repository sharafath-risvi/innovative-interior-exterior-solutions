// =================================================
// HOME PAGE — PROJECTS GALLERY
// =================================================
// File: src/components/sections/home/ProjectsGallery.jsx
// Purpose: Vertical sticky-scroll luxury project gallery.
// =================================================

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../../ui/SectionHeading'

// ── Project Data ──
const LEFT_PROJECTS = [
  { id: 'l1', title: 'Modern Bedroom', category: 'Residential Interior', year: '2025', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', height: 'h-[40vh] lg:h-[45vh]' },
  { id: 'l2', title: 'Commercial Workspace', category: 'Office Interior', year: '2024', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', height: 'h-[50vh] lg:h-[55vh]' },
  { id: 'l3', title: 'Glass Partition', category: 'Interior Detail', year: '2025', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', height: 'h-[35vh] lg:h-[40vh]' },
  { id: 'l4', title: 'Luxury Staircase', category: 'Architectural Detail', year: '2024', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', height: 'h-[45vh] lg:h-[50vh]' },
]

const CENTER_PROJECTS = [
  { id: 'c1', title: 'Signature Living Room', category: 'Residential Interior', year: '2025', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', height: 'h-[60vh] lg:h-[70vh]' },
  { id: 'c2', title: 'Luxury Villa Exterior', category: 'Signature Exterior', year: '2025', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', height: 'h-[60vh] lg:h-[70vh]' },
]

const RIGHT_PROJECTS = [
  { id: 'r1', title: 'Luxury Kitchen', category: 'Residential Interior', year: '2025', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', height: 'h-[45vh] lg:h-[50vh]' },
  { id: 'r2', title: 'Hotel Interior', category: 'Hospitality Design', year: '2025', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', height: 'h-[40vh] lg:h-[45vh]' },
  { id: 'r3', title: 'Corporate Office', category: 'Commercial Interior', year: '2024', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', height: 'h-[50vh] lg:h-[55vh]' },
  { id: 'r4', title: 'Landscape Design', category: 'Exterior & Landscaping', year: '2024', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', height: 'h-[35vh] lg:h-[40vh]' },
]

// ── Individual project card ──
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full overflow-hidden rounded-[20px] lg:rounded-[24px]"
      style={{
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
      role="figure"
      aria-label={`Project: ${project.title}`}
    >
      <div className={`relative w-full ${project.height} overflow-hidden bg-gray-100 rounded-[20px] lg:rounded-[24px]`}>
        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Year badge */}
        <div
          className="absolute top-5 right-5 lg:top-6 lg:right-6 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-white text-[10px] lg:text-xs font-semibold backdrop-blur-md z-10"
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {project.year}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-10">
          <p
            className="text-[10px] lg:text-xs font-semibold tracking-[0.2em] uppercase mb-2 lg:mb-3"
            style={{ color: 'var(--color-orange-light)' }}
          >
            {project.category}
          </p>
          <h3 className="font-display text-white font-bold leading-tight mb-3 lg:mb-4 text-xl lg:text-2xl xl:text-3xl">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 lg:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div
              className="w-8 lg:w-12 h-px rounded-full transition-all duration-500 group-hover:w-16 lg:group-hover:w-24"
              style={{ background: 'var(--color-orange)' }}
            />
            <span className="text-orange-400 text-xs lg:text-sm font-semibold tracking-wide uppercase">View Project</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsGallery() {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      id="projects-gallery"
      className="section-pad bg-white relative z-10"
      aria-label="Featured Projects Gallery"
    >
      <div
        className="px-6 md:px-12 lg:px-20 mb-14"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto 3.5rem' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            badge="Our Portfolio"
            title="Spaces We've"
            titleAccent="Transformed"
            subtitle="A curated selection of our finest work — each project a testament to our commitment to excellence and innovation."
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              id="gallery-view-all"
              className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:gap-4"
              style={{ color: 'var(--color-orange)' }}
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Sticky Scroll Gallery ── */}
      <div className="px-6 md:px-12 lg:px-20 pb-24" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        
        {/* Desktop View (3 columns) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 relative items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {LEFT_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Center Column - Sticky */}
          <div className="relative h-full">
            <div className="flex flex-col gap-8 h-full">
              {CENTER_PROJECTS.map((project, i) => (
                <div key={project.id} className="sticky w-full" style={{ top: `calc(8rem + ${i * 2}rem)` }}>
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {RIGHT_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          
        </div>

        {/* Tablet View (2 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 relative items-start pb-24">
          <div className="flex flex-col gap-6">
            {[...LEFT_PROJECTS, ...CENTER_PROJECTS.slice(0,1)].map((project, i) => (
              <div key={project.id} className="sticky" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {[...RIGHT_PROJECTS, ...CENTER_PROJECTS.slice(1)].map((project, i) => (
              <div key={project.id} className="sticky" style={{ top: `calc(8rem + ${i * 1.5}rem)` }}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (1 column) */}
        <div className="grid md:hidden grid-cols-1 gap-6 relative items-start pb-24">
          {[...CENTER_PROJECTS, ...LEFT_PROJECTS, ...RIGHT_PROJECTS].map((project, i) => (
            <div key={project.id} className="sticky" style={{ top: `calc(5rem + ${i * 1}rem)` }}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
