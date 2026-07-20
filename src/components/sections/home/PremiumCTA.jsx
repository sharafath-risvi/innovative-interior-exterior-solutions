import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CONTACT_INFO } from '../../../lib/constants'
import premiumHeroBg from '../../../assets/images/premium-hero-interior.webp'

export default function PremiumCTA() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 100 }
  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig)
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  
  const fgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig)
  const fgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig)

  const handleMouseMove = (e) => {
    // Maps cursor position to a range of -0.5 to 0.5 for parallax offsets
    mouseX.set(e.clientX / window.innerWidth - 0.5)
    mouseY.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <section
      id="premium-cta"
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]"
      aria-label="Call to Action — Get Started with IIES"
    >
      {/* ── PARALLAX BACKGROUND IMAGE ── */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.05 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src={premiumHeroBg} 
          loading="lazy"
          alt="Luxury Architecture Background" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── DARK GLASS OVERLAY & AMBIENT LIGHTING ── */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,135,1,0.12)_0%,transparent_60%)] z-0 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-0 pointer-events-none" />

      {/* ── DECORATIVE ARCHITECTURAL ELEMENTS ── */}
      {/* Minimal grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      {/* Thin glowing lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] left-[20%] w-px h-64 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="absolute bottom-[20%] right-[25%] w-64 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      </div>

      {/* ── MAIN CTA CONTENT ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Label */}
          <span className="text-orange-500 text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase mb-6 px-6 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
            Let's Build Something Extraordinary
          </span>
          
          {/* Headline */}
          <h2 className="font-display font-bold text-white leading-tight mb-8 drop-shadow-2xl" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Your Dream Space Deserves{' '}
            <em
              className="not-italic inline-block"
              style={{
                background: 'linear-gradient(135deg, #F78701 0%, #FC6B00 50%, #FFA040 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Extraordinary Design.
            </em>
          </h2>

          {/* Sub-text */}
          <p className="font-serif italic text-gray-300 max-w-2xl mb-12 leading-relaxed text-base md:text-xl drop-shadow-md">
            Every successful project begins with a conversation. Our expert design team is ready to listen, collaborate, and transform your vision into an extraordinary reality.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-[340px] sm:max-w-none mx-auto">
            
            {/* Primary Button */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center px-2 py-3.5 sm:px-10 sm:py-5 rounded-full text-white font-semibold text-[10px] sm:text-base tracking-wide transition-shadow duration-300 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-sec) 100%)',
                  boxShadow: '0 12px 35px rgba(247,135,1,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                }}
              >
                Get Free Consultation
              </Link>
            </motion.div>
            
          </div>
        </motion.div>
      </div>

    </section>
  )
}
