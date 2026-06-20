import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import completedImg from '../../../assets/images/about/completed_hero.png'

gsap.registerPlugin(ScrollTrigger)

export default function AboutHero() {
  const containerRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const textTopRef = useRef(null)
  const textBottomRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero section for a cinematic scroll expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', // Scroll distance for the animation
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })

      // Top word slides left and fades out
      tl.to(textTopRef.current, {
        x: '-20vw',
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0)

      // Bottom word slides right and fades out
      tl.to(textBottomRef.current, {
        x: '20vw',
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0)

      // 1. Expand the video smoothly to nearly full screen
      tl.to(videoWrapperRef.current, {
        width: '96vw',
        height: '94vh',
        borderRadius: '32px',
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0) // Start at the same time

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      aria-label="About Innovative Interior & Exterior Solutions"
    >
      {/* ── BACKGROUND IMAGE (STAGE 1) ── */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${completedImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Dark Gradient Overlay for atmospheric depth and text readability */}
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]" />

      {/* ── CINEMATIC TYPOGRAPHY ── */}
      <div className="absolute top-[12%] lg:top-[10%] left-0 w-full flex justify-center z-[5] pointer-events-none">
        <h1 
          ref={textTopRef} 
          className="font-display text-white text-[90px] md:text-[120px] lg:text-[140px] leading-none tracking-tight opacity-90"
        >
          OUR
        </h1>
      </div>

      <div className="absolute bottom-[16%] lg:bottom-[10%] left-0 w-full flex justify-center z-[5] pointer-events-none">
        <h1 
          ref={textBottomRef} 
          className="font-display text-white text-[90px] md:text-[120px] lg:text-[140px] leading-none tracking-tight opacity-90"
        >
          STORY
        </h1>
      </div>

      {/* ── FLOATING CINEMATIC VIDEO (STAGE 2 & 3) ── */}
      <div 
        ref={videoWrapperRef}
        className="relative z-10 w-[80vw] md:w-[50vw] lg:w-[40vw] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] will-change-[width,height,border-radius]"
        // Explicit initial aspect ratio height to ensure GSAP can override cleanly
        style={{ aspectRatio: '16/9', borderRadius: '24px' }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/videos/videoforiies.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">Scroll to Explore</span>
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
