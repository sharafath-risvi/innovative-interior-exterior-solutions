// =================================================
// SERVICES PAGE — COMPLETE
// =================================================
// File: src/pages/Services.jsx
// Purpose: Comprehensive services showcase with all IIES
//          interior & exterior services, material solutions,
//          working process timeline, and consultation CTA.
// =================================================
// Sections:
//   1. Services Hero
//   2. Interior Services — detailed cards with images
//   3. Exterior Services — detailed cards with images
//   4. Material Solutions — material showcase grid
//   5. Working Process — 5-step animated timeline
//   6. Consultation CTA
// Animation:
//   - Alternating left/right image-text layouts per service
//   - GSAP ScrollTrigger: process timeline line draw
//   - Staggered card reveals
// Responsive: All sections fully responsive
// Future Developer Notes:
//   - All service data: src/lib/constants.js
//   - INTERIOR_SERVICES and EXTERIOR_SERVICES arrays
//   - Material Solutions: add new materials to MATERIALS array below
// =================================================

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/ui/SectionHeading'
import { INTERIOR_SERVICES, EXTERIOR_SERVICES, PROCESS_STEPS, CONTACT_INFO } from '../lib/constants'

// Import images for material solutions
import flooringImg    from '../assets/images/flooring.webp'
import wallpaperImg   from '../assets/images/wallpaper.webp'
import glassImg       from '../assets/images/glass-partition.webp'
import upvcImg        from '../assets/images/upvc-windows.webp'
import falseCeilingImg from '../assets/images/false-ceiling.webp'
import exteriorAcpImg from '../assets/images/exterior-acp.webp'

// (Image imports removed as background is now video)

gsap.registerPlugin(ScrollTrigger)

// ── Material solutions data ──
const MATERIALS = [
  { name: 'Premium Marble',       desc: 'Carrara, Calacatta & exotic marble', icon: '🪨', image: flooringImg },
  { name: 'Designer Wallpaper',   desc: 'European & Asian collections',        icon: '📄', image: wallpaperImg },
  { name: 'ACP Panels',           desc: 'Metallic, matte & wood finish',       icon: '🔩', image: exteriorAcpImg },
  { name: 'Glass Systems',        desc: 'Frameless, frosted & structural',     icon: '🔷', image: glassImg },
  { name: 'UPVC Windows',         desc: 'Energy-efficient window systems',     icon: '🪟', image: upvcImg },
  { name: 'Gypsum Ceilings',      desc: 'Board, POP & ornamental plaster',    icon: '✨', image: falseCeilingImg },
]


// ──────────────────────────────
// 1. SERVICES HERO
// ──────────────────────────────
function ServicesHero() {
  const containerRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    let ctx;
    const video = videoRef.current;

    const initAnimation = () => {
      if (!video || isNaN(video.duration)) return;

      ctx = gsap.context(() => {
        // Pin the hero section on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%', // Extended scroll for smooth video scrubbing
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        // Fade out text and scroll indicator elegantly early in the scroll (first ~15%)
        tl.to([textRef.current, scrollIndicatorRef.current], { y: -20, opacity: 0, ease: 'power2.out', duration: 0.15 }, 0)
        
        // Slight scale effect on video container to keep cinematic feel
        tl.to(videoContainerRef.current, { scale: 1.05, ease: 'none', duration: 1 }, 0)

        // Scrub video playback mapping scroll to currentTime
        tl.to(video, { currentTime: video.duration, ease: 'none', duration: 1 }, 0)

      }, containerRef)
    }

    if (video) {
      if (video.readyState >= 1) {
        initAnimation()
      } else {
        video.addEventListener('loadedmetadata', initAnimation)
      }
    }

    return () => {
      if (ctx) ctx.revert()
      if (video) video.removeEventListener('loadedmetadata', initAnimation)
    }
  }, [])

  // Split text animation for initial load
  const headingText = "Complete Design Solutions."

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 z-0"
      >
        <video 
          ref={videoRef}
          src="/videos/unfurniture to furniture.mp4"
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* The dark gradient overlay was removed to allow the video to display at original brightness */}

      {/* Content */}
      <div 
        ref={textRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-orange-400 border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
            Interior & Exterior Services
          </span>
        </motion.div>

        <h1 
          className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 overflow-hidden flex flex-wrap justify-center gap-x-3 md:gap-x-4 px-2 max-w-[90vw] mx-auto"
          style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
        >
          {headingText.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex overflow-hidden">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.8 + (wordIndex * 0.1) + (charIndex * 0.02)
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white text-lg md:text-xl font-serif italic font-medium max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] px-6 py-2"
        >
          Complete interior and exterior solutions with premium craftsmanship. End-to-end project delivery for residential and commercial spaces. <br className="hidden md:block"/>
          Scroll to explore our services.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 will-change-transform"
      >
        <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-px h-12 bg-white/20 overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="w-full h-1/2 bg-orange-500"
          />
        </div>
      </motion.div>
    </section>
  )
}

// ──────────────────────────────
// SERVICE DETAIL CARD (Alternating)
// ──────────────────────────────
function ServiceDetailCard({ service, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0`}
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
          className="font-display font-bold text-gray-900 leading-tight mb-4"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          {service.title}
        </h2>
        <div
          className="w-12 h-0.5 rounded-full mb-5"
          style={{ background: 'var(--color-orange)' }}
          aria-hidden="true"
        />
        <p className="text-gray-500 leading-relaxed mb-7">{service.description}</p>

        {/* Features */}
        <ul className="grid grid-cols-2 gap-3" aria-label={`Features of ${service.title}`}>
          {service.features.map((feature, fi) => (
            <li key={fi} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
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

// ──────────────────────────────
// 2. INTERIOR SERVICES
// ──────────────────────────────
function InteriorServices() {
  return (
    <section id="services-section" className="section-pad bg-white" aria-label="Interior Services">
      <div className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Interior Solutions"
          title="Interior Design"
          titleAccent="Services"
          subtitle="Premium interior solutions for residential and commercial spaces — crafted with passion and precision."
          centered
        />
        {INTERIOR_SERVICES.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 3. EXTERIOR SERVICES
// ──────────────────────────────
function ExteriorServices() {
  return (
    <section
      id="exterior-services"
      className="section-pad"
      style={{ background: 'var(--color-grey-light)' }}
      aria-label="Exterior Services"
    >
      <div className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Exterior Solutions"
          title="Exterior Design"
          titleAccent="& Façade Services"
          subtitle="Bold exteriors that command attention and endure through time — from ACP cladding to structural glazing."
          centered
        />
        {EXTERIOR_SERVICES.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 4. MATERIAL SOLUTIONS
// ──────────────────────────────
function MaterialSolutions() {
  return (
    <section id="material-solutions" className="section-pad bg-white" aria-label="Material Solutions">
      <div className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Premium Materials"
          title="Materials We"
          titleAccent="Work With"
          subtitle="We source and work with the finest materials globally — ensuring every surface, texture, and finish meets our premium standards."
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {MATERIALS.map((mat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl cursor-default"
              style={{ height: '240px' }}
              role="figure"
              aria-label={mat.name}
            >
              <img
                src={mat.image}
                alt={mat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-white font-bold text-base mt-1">{mat.name}</h3>
                <p className="text-gray-300 text-xs mt-0.5">{mat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// 6. CONSULTATION CTA
// ──────────────────────────────
function ConsultationCTA() {
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
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                id="services-consultation-cta"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                  boxShadow: '0 8px 32px rgba(247,135,1,0.4)',
                }}
              >
                Book Free Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
            <a
              href={`tel:${CONTACT_INFO.phone1}`}
              id="services-call-cta"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-white border border-white/20 transition-all duration-300 hover:border-orange-400"
            >
              <span>📞</span>
              Call {CONTACT_INFO.phone1}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// SERVICES PAGE ASSEMBLY
// ──────────────────────────────
export default function Services() {
  return (
    <main id="main-content">
      <ServicesHero />
      <InteriorServices />
      <ExteriorServices />
      <MaterialSolutions />
      <ConsultationCTA />
    </main>
  )
}
