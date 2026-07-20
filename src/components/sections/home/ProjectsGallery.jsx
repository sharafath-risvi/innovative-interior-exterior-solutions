// =================================================
// HOME PAGE — PROJECTS GALLERY
// =================================================
// File: src/components/sections/home/ProjectsGallery.jsx
// Purpose: Vertical sticky-scroll luxury project gallery.
//          Updated with real client images from iiesImages where matching.
// =================================================

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import SectionHeading from '../../ui/SectionHeading'

// ── Project Data ──
const LEFT_PROJECTS = [
  { id: 'l1', title: 'Chennai Metro Rail', category: 'Infrastructure Project', location: 'Chennai', year: '2025', image: '/iiesImages/metrostation.jpeg', description: 'Interior and architectural finishing solutions delivered for selected Chennai Metro stations with a strong focus on durability, precision, and modern public infrastructure.', height: 'h-[40vh] lg:h-[45vh]' },
  { id: 'l2', title: 'Statue of Unity', category: 'Landmark Project', location: 'Gujarat', year: '2024', image: '/iiesImages/statueofunity.webp', description: 'Architectural finishing work delivered for one of India\'s most iconic national landmarks, maintaining exceptional quality and execution standards.', height: 'h-[50vh] lg:h-[55vh]' },
  { id: 'l3', title: 'Amazon Office – Hyderabad', category: 'Corporate Interior', location: 'Hyderabad', year: '2025', image: '/iiesImages/amazonhyderabad.jpg', description: 'Premium corporate workspace featuring executive cabins, collaborative workspaces, conference rooms, reception areas, and modern interior finishes.', height: 'h-[35vh] lg:h-[40vh]' },
  { id: 'l4', title: 'Butterfly Marketing Office', category: 'Corporate Office', location: 'Chennai', year: '2024', image: '/iiesImages/butterflyoffice.avif', description: 'Modern office interiors with executive workspaces, meeting rooms, reception zones, and premium architectural finishes.', height: 'h-[45vh] lg:h-[50vh]' },
]

const CENTER_PROJECTS = [
  { id: 'c1', title: 'World Trade Center – Chennai', category: 'Commercial Interior', location: 'Chennai', year: '2025', image: '/iiesImages/worldtradecenter.webp', description: 'High-end commercial interior and finishing solutions executed for one of Chennai\'s most prestigious business destinations.', height: 'h-[60vh] lg:h-[70vh]' },
  { id: 'c2', title: 'Apollo Hospital (Interior View)', category: 'Healthcare Interior', location: 'Chennai', year: '2025', image: '/iiesImages/appollo.jpg', description: 'Specialized medical and healthcare interior finishing work delivered for Apollo Hospital with a focus on hygiene, acoustic comfort, and modern clinical aesthetics.', height: 'h-[60vh] lg:h-[70vh]' },
]

const RIGHT_PROJECTS = [
  { id: 'r1', title: 'Madras Boat Club', category: 'Premium Hospitality', location: 'Chennai', year: '2025', image: '/iiesImages/madrasboatclub.png', description: 'Elegant interior finishing and customized design solutions delivered for one of Chennai\'s most prestigious private clubs.', height: 'h-[45vh] lg:h-[50vh]' },
  { id: 'r2', title: 'Anna Nagar Tower Park Club', category: 'Hospitality Design', location: 'Chennai', year: '2025', image: '/iiesImages/annanagartowerclub.avif', description: 'Sophisticated hospitality and clubhouse interior transformation featuring tailored structural finishes, custom lighting, and refined architectural details.', height: 'h-[40vh] lg:h-[45vh]' },
  { id: 'r3', title: 'Premium Residential Villas', category: 'Residential Interior', location: 'Chennai', year: '2024', image: '/iiesImages/villas.jpg', description: 'Turnkey architectural finishing and bespoke interior solutions crafted for premium residential villas, combining luxury aesthetics with lasting durability.', height: 'h-[50vh] lg:h-[55vh]' },
  { id: 'r4', title: 'Luxury Apartments & Individual Houses', category: 'Residential & Exterior', location: 'Chennai', year: '2024', image: '/iiesImages/residential.jpeg', description: 'Comprehensive interior and architectural finishing execution for luxury apartments and individual residences, designed for modern elegance and superior comfort.', height: 'h-[35vh] lg:h-[40vh]' },
]

// ── Individual project card ──
function ProjectCard({ project, index, onSelectProject }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onSelectProject) {
      onSelectProject(project)
    } else {
      navigate('/projects', { state: { selectedProject: project } })
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full overflow-hidden rounded-[20px] lg:rounded-[24px] cursor-pointer"
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

export default function ProjectsGallery({ onSelectProject }) {
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
              to="/projects"
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
              <ProjectCard key={project.id} project={project} index={i} onSelectProject={onSelectProject} />
            ))}
          </div>

          {/* Center Column - Sticky */}
          <div className="relative h-full">
            <div className="flex flex-col gap-8 h-full">
              {CENTER_PROJECTS.map((project, i) => (
                <div key={project.id} className="sticky w-full" style={{ top: `calc(8rem + ${i * 2}rem)` }}>
                  <ProjectCard project={project} index={i} onSelectProject={onSelectProject} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {RIGHT_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onSelectProject={onSelectProject} />
            ))}
          </div>
          
        </div>

        {/* Tablet View (2 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 relative items-start pb-24">
          <div className="flex flex-col gap-6">
            {[...LEFT_PROJECTS, ...CENTER_PROJECTS.slice(0,1)].map((project, i) => (
              <div key={project.id} className="sticky" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
                <ProjectCard project={project} index={i} onSelectProject={onSelectProject} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {[...RIGHT_PROJECTS, ...CENTER_PROJECTS.slice(1)].map((project, i) => (
              <div key={project.id} className="sticky" style={{ top: `calc(8rem + ${i * 1.5}rem)` }}>
                <ProjectCard project={project} index={i} onSelectProject={onSelectProject} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (1 column) */}
        <div className="grid md:hidden grid-cols-1 gap-6 relative items-start pb-24">
          {[...CENTER_PROJECTS, ...LEFT_PROJECTS, ...RIGHT_PROJECTS].map((project, i) => (
            <div key={project.id} className="sticky" style={{ top: `calc(5rem + ${i * 1}rem)` }}>
              <ProjectCard project={project} index={i} onSelectProject={onSelectProject} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
