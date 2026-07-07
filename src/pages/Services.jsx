// =================================================
// SERVICES PAGE — COMPLETE & CLIENT-APPROVED
// =================================================
// File: src/pages/Services.jsx
// Purpose: Comprehensive services showcase with all IIES
//          interior & exterior services organized into 4 major
//          professional categories:
//          1. Residential Interiors
//          2. Commercial Interiors
//          3. False Ceiling Solutions
//          4. Flooring Solutions
//          Plus Consultation CTA.
// =================================================

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/ui/SectionHeading'
import { CONTACT_INFO } from '../lib/constants'

import {
  RESIDENTIAL_SERVICES_DATA,
  COMMERCIAL_SERVICES_DATA,
  FALSE_CEILING_DATA,
  FLOORING_DATA,
} from '../components/sections/services/servicesData'
import ServiceDetailCard from '../components/sections/services/ServiceDetailCard'
import ConsultationCTA from '../components/sections/services/ConsultationCTA'

// ──────────────────────────────
// 1. SERVICES HERO
// ──────────────────────────────
function ServicesHero() {
  const containerRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)

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

        // Fade out text elegantly early in the scroll (first ~15%)
        tl.to(textRef.current, { y: -20, opacity: 0, ease: 'power2.out', duration: 0.15 }, 0)
        
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
  const headingText = "Complete Interior & Exterior."

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
          Delivering complete residential, commercial, ceiling, flooring, and premium architectural solutions. We transform homes, offices, and landmark projects with bespoke craftsmanship and enduring elegance.
        </motion.p>
      </div>
    </section>
  )
}


// ──────────────────────────────
// 2. RESIDENTIAL INTERIORS SECTION
// ──────────────────────────────
function ResidentialInteriorsSection() {
  return (
    <section id="residential" className="section-pad bg-white" aria-label="Residential Interiors">
      <div id="services-section" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 01"
          title="Residential"
          titleAccent="Interiors"
          subtitle="Residential interior design combines functionality and aesthetics to create comfortable and elegant living spaces. Every home is designed to reflect the lifestyle, personality, and preferences of its owner while ensuring comfort, beauty, and practical everyday living."
          centered
        />
        {RESIDENTIAL_SERVICES_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 3. COMMERCIAL INTERIORS SECTION
// ──────────────────────────────
function CommercialInteriorsSection() {
  return (
    <section
      id="commercial"
      className="section-pad"
      style={{ background: '#111111' }}
      aria-label="Commercial Interiors"
    >
      <div id="commercial-interiors" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 02"
          title="Commercial"
          titleAccent="Interiors"
          subtitle="Commercial interior design creates productive and inspiring workplaces that enhance employee efficiency and leave a lasting impression on clients. Well-designed commercial spaces improve brand identity, functionality, and user experience."
          centered
          light={true}
        />
        {COMMERCIAL_SERVICES_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} isDark={true} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 4. FALSE CEILING SOLUTIONS SECTION
// ──────────────────────────────
function FalseCeilingSection() {
  return (
    <section id="false-ceiling" className="section-pad bg-white" aria-label="False Ceiling Solutions">
      <div id="false-ceiling-solutions" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 03"
          title="False Ceiling"
          titleAccent="Solutions"
          subtitle="False ceilings conceal electrical wiring, plumbing, ducts, and utilities while improving the overall appearance of interiors. They add elegance, enhance lighting, improve acoustics, and create a clean architectural finish."
          centered
        />
        {FALSE_CEILING_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 5. FLOORING SOLUTIONS SECTION
// ──────────────────────────────
function FlooringSolutionsSection() {
  return (
    <section
      id="flooring"
      className="section-pad"
      style={{ background: '#111111' }}
      aria-label="Flooring Solutions"
    >
      <div id="flooring-solutions" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 04"
          title="Flooring"
          titleAccent="Solutions"
          subtitle="Quality flooring provides a durable, comfortable, and visually appealing surface for every space. It enhances aesthetics, improves functionality, and increases the long-term value of residential and commercial interiors."
          centered
          light={true}
        />
        {FLOORING_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} isDark={true} />
        ))}
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
      <ResidentialInteriorsSection />
      <CommercialInteriorsSection />
      <FalseCeilingSection />
      <FlooringSolutionsSection />
      <ConsultationCTA />
    </main>
  )
}
