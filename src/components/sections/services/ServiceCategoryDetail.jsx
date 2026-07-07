// =================================================
// SERVICE CATEGORY DETAIL COMPONENT (DEDICATED PAGE LAYOUT)
// =================================================
// File: src/components/sections/services/ServiceCategoryDetail.jsx
// Purpose: Reusable dedicated layout for the 4 service categories.
//          Displays premium Back to Home button, exact isolated category
//          content from Services page, and Consultation CTA.
// =================================================

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../../ui/SectionHeading'
import ServiceDetailCard from './ServiceDetailCard'
import ConsultationCTA from './ConsultationCTA'
import { getCategoryById } from './servicesData'

export default function ServiceCategoryDetail({ categoryId }) {
  const category = getCategoryById(categoryId)

  useEffect(() => {
    // Scroll to top immediately when mounting dedicated detail page
    window.scrollTo(0, 0)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
    // Update SEO title
    if (category) {
      document.title = `${category.title} ${category.titleAccent} | Innovative Interior & Exterior Solutions (IIES)`
    }
  }, [category])

  if (!category) return null

  const backUrl = `/#what-we-do-${category.id}`

  const handleBackClick = () => {
    sessionStorage.setItem('last_what_we_do', category.id)
    sessionStorage.setItem('from_service_detail', category.id)
  }

  return (
    <main id="main-content" className={`min-h-screen ${category.isDark ? 'bg-[#111111]' : 'bg-white'}`}>
      {/* ── Sleek Dark Header Bar with Premium Back Button ── */}
      <div className="bg-[#111111] pt-28 pb-8 border-b border-white/10 relative z-10">
        <div
          className="px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={backUrl}
              onClick={handleBackClick}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 border border-white/20 hover:border-orange-500 bg-white/5 hover:bg-white/10 shadow-lg w-max"
              aria-label={`Back to Home — ${category.title} ${category.titleAccent} section`}
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs group-hover:-translate-x-1 transition-transform duration-300 shadow-sm">
                ←
              </span>
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Breadcrumb indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
            <span>Services</span>
            <span className="text-orange-500">/</span>
            <span className="text-orange-400">{category.title}</span>
          </div>
        </div>
      </div>

      {/* ── Isolated Service Category Section ── */}
      <section
        id={category.id}
        className={`section-pad ${category.isDark ? 'bg-[#111111] text-white' : 'bg-white text-gray-900'}`}
        aria-label={`${category.title} ${category.titleAccent}`}
      >
        <div
          id="services-section"
          className="px-6 md:px-12 lg:px-20"
          style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
        >
          <SectionHeading
            badge={category.badge}
            title={category.title}
            titleAccent={category.titleAccent}
            subtitle={category.subtitle}
            centered
            light={category.isDark}
          />
          {category.services.map((service, i) => (
            <ServiceDetailCard
              key={service.id}
              service={service}
              index={i}
              isDark={category.isDark}
            />
          ))}
        </div>
      </section>

      {/* ── Consultation CTA ── */}
      <ConsultationCTA />
    </main>
  )
}
