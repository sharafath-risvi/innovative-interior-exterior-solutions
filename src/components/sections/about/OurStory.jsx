// =========================================
// OUR JOURNEY – ZOOM PARALLAX CINEMATIC
// =========================================
// File: src/components/sections/about/OurStory.jsx
// Purpose: A cinematic storytelling timeline where images 
//          zoom toward the camera through 6 chapters.
// =========================================

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import sketchImg from '../../../assets/images/about/story_sketch.png'
import planningImg from '../../../assets/images/about/story_planning.png'
import residentialImg from '../../../assets/images/residential.png'
import flooringImg from '../../../assets/images/flooring.png'
import luxuryRevealImg from '../../../assets/images/luxury-reveal.png'
import completedImg from '../../../assets/images/about/completed_hero.png'

gsap.registerPlugin(ScrollTrigger)

// ==============================
// JOURNEY CHAPTERS DATA
// ==============================
const CHAPTERS = [
  {
    id: 'c1',
    subtitle: 'Chapter 1 — Vision',
    title: 'Every Great Space Begins with a Vision',
    desc: "Every successful project starts with understanding our client's dreams, ideas, and lifestyle before creating the perfect design strategy.",
    img: sketchImg
  },
  {
    id: 'c2',
    subtitle: 'Chapter 2 — Planning',
    title: 'Planning Every Detail',
    desc: "We carefully plan layouts, materials, lighting, colors, and functionality to ensure every space is beautiful and practical.",
    img: planningImg
  },
  {
    id: 'c3',
    subtitle: 'Chapter 3 — Design & Execution',
    title: 'Design That Inspires',
    desc: "Every concept is transformed into elegant, functional, and timeless designs tailored to our client's vision.",
    img: residentialImg
  }
]

export default function OurStory() {
  const containerRef = useRef(null)
  const imagesRef = useRef([])
  const textsRef = useRef([])
  const finalMessageRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const zoomScale = isMobile ? 1.8 : 3 // Reduced intensity on mobile to prevent extreme clipping

    const ctx = gsap.context(() => {
      // Create a master timeline pinned for a long duration to allow slow storytelling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${CHAPTERS.length * 120}%`, // ~1.2 viewports per chapter
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })

      const DURATION = 1

      CHAPTERS.forEach((chapter, i) => {
        const t = i * DURATION // The timeline anchor for when this chapter is perfectly in focus

        // 1. INCOMING ANIMATION (Fly in from distance)
        if (i === 0) {
          // Chapter 1 is already in focus at the start
          tl.set(imagesRef.current[i], { scale: 1, opacity: 1, filter: 'blur(0px)' }, 0)
          tl.set(textsRef.current[i], { opacity: 1, y: 0 }, 0)
        } else {
          // Incoming images start small and blurry
          tl.fromTo(imagesRef.current[i], 
            { scale: 0.3, opacity: 0, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: DURATION * 0.8, ease: 'power2.out' },
            t - DURATION * 0.8
          )
          // Incoming text fades in and floats up slightly
          tl.fromTo(textsRef.current[i],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: DURATION * 0.4, ease: 'power2.out' },
            t - DURATION * 0.4
          )
        }

        // 2. OUTGOING ANIMATION (Fly past the camera)
        // Image zooms out immensely and blurs
        tl.to(imagesRef.current[i], 
          { scale: zoomScale, opacity: 0, filter: 'blur(15px)', duration: DURATION, ease: 'power2.in' },
          t
        )
        // Text floats away and fades
        tl.to(textsRef.current[i],
          { opacity: 0, y: -40, duration: DURATION * 0.4, ease: 'power2.in' },
          t
        )
      })

      // ==============================
      // FINAL CHAPTER
      // ==============================
      const tFinal = CHAPTERS.length * DURATION
      
      // Reveal the final centered message
      tl.fromTo(finalMessageRef.current,
        { opacity: 0, scale: 0.9, filter: 'blur(5px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: DURATION * 0.6, ease: 'power2.out' },
        tFinal - DURATION * 0.5
      )

      // Hold the final message briefly so the user can read it before unpinning
      tl.to({}, { duration: DURATION * 0.5 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center"
      aria-label="Our Journey"
    >
      {/* ── BACKGROUND LIGHTING ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* ── IMAGE CHAPTERS ── */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none">
        {CHAPTERS.map((chapter, i) => (
          <div 
            key={chapter.id}
            ref={el => imagesRef.current[i] = el}
            className="absolute inset-0 w-full h-full opacity-0 origin-center"
          >
            <img 
              src={chapter.img} 
              alt={chapter.title} 
              loading="lazy"
              className="w-full h-full object-cover" 
            />
            {/* Elegant glass gradient overlay to ensure perfect text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />
            
            {/* Cinematic grain overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>
        ))}
      </div>

      {/* ── TEXT CHAPTERS ── */}
      <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center px-6 pointer-events-none">
        {CHAPTERS.map((chapter, i) => (
          <div 
            key={`${chapter.id}-text`}
            ref={el => textsRef.current[i] = el}
            className="absolute max-w-4xl text-center flex flex-col items-center opacity-0"
          >
            <span className="px-4 py-1 mb-6 border border-orange-500/30 bg-orange-500/10 rounded-full text-orange-400 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(247,135,1,0.1)]">
              {chapter.subtitle}
            </span>
            <h2 className="font-display font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 drop-shadow-2xl">
              {chapter.title}
            </h2>
            <p className="text-gray-300 text-lg md:text-2xl font-light font-serif leading-relaxed max-w-2xl drop-shadow-md">
              {chapter.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── FINAL MESSAGE ── */}
      <div 
        ref={finalMessageRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 opacity-0 pointer-events-none bg-black/60 backdrop-blur-sm"
      >
        <h2 className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 max-w-5xl drop-shadow-2xl">
          Every Project Is A <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Story Worth Telling</span>
        </h2>
        <div className="w-16 h-1 bg-orange-500 rounded-full mb-8" />
        <p className="text-gray-300 text-xl md:text-2xl font-serif italic max-w-3xl leading-relaxed drop-shadow-lg">
          At Innovative Interior & Exterior Solutions, every blueprint, every material, and every finishing touch reflects our commitment to creating timeless spaces that inspire generations.
        </p>
      </div>

    </section>
  )
}
