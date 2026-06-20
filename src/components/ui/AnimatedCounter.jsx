// =================================================
// ANIMATED COUNTER — UI COMPONENT
// =================================================
// File: src/components/ui/AnimatedCounter.jsx
// Purpose: Scroll-triggered number counter that animates
//          from 0 to target value when entering viewport.
// =================================================
// Props:
//   value  {number} — Target number to count up to
//   suffix {string} — Text appended after number (e.g. '+', '%')
//   label  {string} — Descriptive label below number
//   light  {boolean}— Light color variant for dark backgrounds
// Animation:
//   - Eased counting animation using requestAnimationFrame
//   - Triggered once when element enters viewport (IntersectionObserver)
// =================================================

import { useState, useEffect, useRef } from 'react'

export default function AnimatedCounter({ value, suffix = '', label, light = false }) {
  const [count, setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  // ── Intersection Observer to trigger animation ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // ── Count animation with easing ──
  useEffect(() => {
    if (!started) return
    const duration  = 2000 // ms
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [started, value])

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-display font-bold leading-none mb-2 ${light ? 'text-white' : 'text-gray-900'}`}
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        <span>{count}</span>
        <span style={{ color: 'var(--color-orange)' }}>{suffix}</span>
      </div>
      <p className={`text-sm font-medium tracking-wide ${light ? 'text-gray-300' : 'text-gray-500'}`}>
        {label}
      </p>
    </div>
  )
}
