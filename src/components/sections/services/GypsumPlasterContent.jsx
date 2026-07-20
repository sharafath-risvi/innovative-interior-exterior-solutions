// =================================================
// GYPSUM PLASTER CONTENT COMPONENT
// =================================================
// File: src/components/sections/services/GypsumPlasterContent.jsx
// Purpose: Reusable Category 6 — Gypsum Plaster content shared exactly
//          between the main Services page and the Gypsum Plaster details page.
// =================================================

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../../ui/SectionHeading'

export default function GypsumPlasterContent() {
  return (
    <section
      id="gypsum-plaster"
      className="section-pad"
      style={{ background: '#111111' }}
      aria-label="Gypsum Plaster"
    >
      <div id="gypsum-plaster-solutions" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 06"
          title="Gypsum"
          titleAccent="Plaster"
          subtitle="Gypsum plaster is an environmentally friendly alternative to traditional sand-cement plastering for interior walls and ceilings. It provides a smooth, durable finish with faster application, eliminates the need for water curing, reduces construction time, and creates an ideal surface for premium interior finishes."
          centered
          light={true}
        />

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          aria-label="Gypsum Plaster Information"
        >
          {/* Large image */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: '440px' }}
          >
            <img
              src="/servicesImages/gypsumplaster4.jpg"
              alt="Gypsum Plaster"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))' }}
              aria-hidden="true"
            >
              01
            </div>
          </div>

          {/* Content & Areas of Application */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--color-orange)' }}
            >
              ENVIRONMENT-FRIENDLY PLASTERING
            </p>
            <h2
              className="font-display font-bold leading-tight mb-4 text-white"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Gypsum Plaster
            </h2>
            <div
              className="w-12 h-0.5 rounded-full mb-5"
              style={{ background: 'var(--color-orange)' }}
              aria-hidden="true"
            />
            <p className="leading-relaxed mb-7 text-gray-300">
              Gypsum plaster is an environmentally friendly alternative to traditional sand-cement plastering for interior walls and ceilings. It provides a smooth, durable finish with faster application, eliminates the need for water curing, reduces construction time, and creates an ideal surface for premium interior finishes.
            </p>

            <p className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-orange)' }}>
              Areas of Application
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Areas of Application">
              {[
                'Brick / Block Masonry',
                'Blocks',
                'RCC Walls & Ceilings',
                'Interior Levelling (Gypsum Plastering)',
                'Finishing (Paint Application)'
              ].map((app, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-medium"
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                    style={{ background: 'var(--color-orange)' }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
