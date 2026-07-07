// =================================================
// SERVICE DETAIL CARD COMPONENT
// =================================================
// File: src/components/sections/services/ServiceDetailCard.jsx
// Purpose: Reusable alternating layout card component for service items.
//          Shared between main Services page and dedicated category pages.
// =================================================

import { motion } from 'framer-motion'

export default function ServiceDetailCard({ service, index, isDark = false }) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      id={service.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0"
      aria-label={`Service: ${service.title}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden rounded-2xl ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ height: '440px' }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        {/* Number badge */}
        <div
          className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-orange)' }}
        >
          {service.subtitle}
        </p>
        <h2
          className={`font-display font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          {service.title}
        </h2>
        <div
          className="w-12 h-0.5 rounded-full mb-5"
          style={{ background: 'var(--color-orange)' }}
          aria-hidden="true"
        />
        <p className={`leading-relaxed mb-7 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{service.description}</p>

        {/* Features */}
        <ul className="grid grid-cols-2 gap-3" aria-label={`Features of ${service.title}`}>
          {service.features.map((feature, fi) => (
            <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                style={{ background: 'var(--color-orange)' }}
                aria-hidden="true"
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
