// =================================================
// SECTION HEADING — UI COMPONENT
// =================================================
// File: src/components/ui/SectionHeading.jsx
// Purpose: Reusable luxury section header with badge, main heading,
//          decorative divider, and subtitle text.
// =================================================
// Props:
//   badge      {string}  — Small orange badge label above heading
//   title      {string}  — Main heading (Playfair Display)
//   titleAccent{string}  — Italic orange accent word inside heading
//   subtitle   {string}  — Body text below heading
//   centered   {boolean} — Text alignment (default: left)
//   light      {boolean} — Light color variant for dark backgrounds
// Animation:
//   - Framer Motion fade-up on viewport entry
// =================================================

import { motion } from 'framer-motion'

export default function SectionHeading({
  badge,
  title,
  titleAccent,
  subtitle,
  centered = false,
  light = false,
}) {
  const align = centered ? 'items-center text-center' : 'items-start text-left'

  return (
    <motion.div
      className={`flex flex-col ${align} mb-12`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Badge ── */}
      {badge && (
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{
            background: 'var(--color-orange-pale)',
            color: 'var(--color-orange)',
            border: '1px solid rgba(247,135,1,0.25)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--color-orange)' }}
          />
          {badge}
        </span>
      )}

      {/* ── Main Title ── */}
      <h2
        className={`font-display font-bold leading-tight mb-4 ${
          light ? 'text-white' : 'text-gray-900'
        }`}
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        {title}
        {titleAccent && (
          <>
            {' '}
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {titleAccent}
            </em>
          </>
        )}
      </h2>

      {/* ── Decorative divider ── */}
      <div className={`flex items-center gap-3 mb-5 ${centered ? 'mx-auto' : ''}`}>
        <div
          className="h-px flex-1 max-w-16"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-orange))' }}
        />
        <div
          className="w-2 h-2 rotate-45 shrink-0"
          style={{ background: 'var(--color-orange)' }}
        />
        <div
          className="h-px flex-1 max-w-16"
          style={{ background: 'linear-gradient(to left, transparent, var(--color-orange))' }}
        />
      </div>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p
          className={`text-base leading-relaxed max-w-2xl ${
            light ? 'text-gray-300' : 'text-gray-500'
          } ${centered ? 'text-center' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
