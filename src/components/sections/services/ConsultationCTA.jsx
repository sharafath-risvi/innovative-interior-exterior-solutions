// =================================================
// CONSULTATION CTA COMPONENT
// =================================================
// File: src/components/sections/services/ConsultationCTA.jsx
// Purpose: Reusable consultation CTA section shared by Services page
//          and all 4 dedicated category detail pages.
// =================================================

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CONTACT_INFO } from '../../../lib/constants'

export default function ConsultationCTA() {
  return (
    <section
      id="consultation-cta"
      className="section-pad"
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2020 100%)',
      }}
      aria-label="Book a Consultation"
    >
      <div
        className="px-6 md:px-12 lg:px-20"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-2xl">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-orange-light)' }}
            >
              Ready to Begin?
            </p>
            <h2
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Let's Build Something{' '}
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Extraordinary
              </em>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Book a free consultation with our expert designers. Tell us about your project and we'll craft a bespoke design proposal — tailored specifically to your vision and budget.
            </p>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 sm:gap-4 shrink-0 w-full sm:w-auto max-w-[340px] sm:max-w-none mx-auto lg:mx-0 mt-8 sm:mt-0">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="flex-1 sm:flex-none">
              <Link
                to="/contact"
                onClick={() => {
                  window.scrollTo(0, 0)
                  if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
                  setTimeout(() => {
                    window.scrollTo(0, 0)
                    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
                  }, 50)
                }}
                id="services-consultation-cta"
                className="inline-flex w-full items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-semibold text-[10px] sm:text-sm whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                  boxShadow: '0 8px 32px rgba(247,135,1,0.4)',
                }}
              >
                <span className="sm:hidden">Consultation</span>
                <span className="hidden sm:inline">Book Free Consultation</span>
                <svg className="hidden sm:block w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
            <a
              href={`tel:${CONTACT_INFO.phone1}`}
              id="services-call-cta"
              className="flex-1 sm:flex-none inline-flex w-full items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-[10px] sm:text-sm text-white border border-white/20 transition-all duration-300 hover:border-orange-400 whitespace-nowrap"
            >
              <span>📞</span>
              <span className="sm:hidden">Call Us</span>
              <span className="hidden sm:inline">Call {CONTACT_INFO.phone1}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
