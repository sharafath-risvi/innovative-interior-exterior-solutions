// =================================================
// COMPLETED PROJECTS SECTION (SECTION 1)
// =================================================
// File: src/components/sections/projects/CompletedProjects.jsx
// Purpose: Responsive portfolio grid (3 on desktop, 2 on tablet,
//          1 on mobile) displaying all 9 real completed projects
//          with zoom animations and detail modal triggers.
// =================================================

import { motion } from 'framer-motion'
import SectionHeading from '../../ui/SectionHeading'
import { COMPLETED_PROJECTS } from './projectsData'

export default function CompletedProjects({ onSelectProject }) {
  return (
    <section
      id="completed-projects"
      className="section-pad bg-[#FAF9F6] relative z-10"
      aria-label="Completed Projects Portfolio Grid"
    >
      <div
        className="px-6 md:px-12 lg:px-20"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* Section Heading */}
        <div className="mb-16 md:mb-20">
          <SectionHeading
            badge="Complete Portfolio"
            title="Completed"
            titleAccent="Projects"
            subtitle="A comprehensive showcase of interior and architectural finishing projects delivered with precision, durability, and aesthetic perfection across commercial, residential, and industrial sectors."
            centered={true}
          />
        </div>

        {/* ── Responsive Portfolio Grid (3 Desktop, 2 Tablet, 1 Mobile) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-9">
          {COMPLETED_PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelectProject && onSelectProject(project)}
              className="group bg-white rounded-[20px] md:rounded-[24px] overflow-hidden border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col cursor-pointer"
              role="figure"
              aria-label={`Project Card: ${project.title}`}
            >
              {/* Large Project Image Container with Zoom Effect */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Subtle dark gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Small Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-orange-500 text-white shadow-md backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Year Indicator on bottom left of image */}
                {project.year && (
                  <div className="absolute bottom-3 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[11px] font-semibold text-white/90 bg-black/50 px-2.5 py-0.5 rounded backdrop-blur-sm border border-white/20">
                      {project.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content Area */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                <div>
                  {/* Project Title */}
                  <h3 className="font-display font-bold text-gray-900 text-xl sm:text-2xl leading-snug mb-1 group-hover:text-orange-500 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Project Location */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 mb-4">
                    <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{project.location}</span>
                  </div>

                  {/* Short Project Description (2-3 lines) */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* View Details Button with Premium Hover Animation */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between w-full group/btn">
                  <span className="text-sm font-bold text-orange-500 group-hover:text-[#FC6B00] transition-colors duration-300">
                    View Details
                  </span>
                  <div className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
