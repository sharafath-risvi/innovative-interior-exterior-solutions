import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

// ── Cinematic Story Chapters ──
const contentChapters = [
  {
    id: 1, // Step 1 (5s)
    title: 'Luxury Interior Design',
    desc: 'Creating elegant living spaces that blend comfort, craftsmanship, and timeless design.',
  },
  {
    id: 2, // Step 2 (8s)
    title: 'Innovative Exterior Solutions',
    desc: 'Modern architecture designed with precision, functionality, and exceptional quality.',
  },
  {
    id: 3, // Step 3 (End)
    title: 'Crafting Spaces That Inspire',
    desc: 'Where visionary design meets masterful execution.',
  }
]

export default function Hero() {
  const [uiStep, setUiStep] = useState(0)

  const containerRef = useRef(null)
  const videoRef = useRef(null)
  
  // Smooth scrubbing state
  const targetTime = useRef(0)
  const currentTimeRef = useRef(0)
  const durationRef = useRef(10) // fallback

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      durationRef.current = videoRef.current.duration
    }
    // The container is 500vh but has mb-[-100vh]. This creates a 100vh overlap at the end.
    // latest goes from 0 to 1 over 400vh of scrolling.
    // The overlap (the next section rising) happens during the last 25% of scroll (latest > 0.75).
    // We want the video scrub to finish exactly at 0.75 so the end holds still during overlap.
    const scrubProgress = Math.min(latest / 0.75, 1.0)
    targetTime.current = scrubProgress * durationRef.current
  })

  useEffect(() => {
    // Ensure video starts at 0s and is paused
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }

    let rafId
    const updateVideo = () => {
      if (videoRef.current) {
        // Lerp current time towards target time
        // 0.08 is the easing factor for smooth Apple-like scrolling
        currentTimeRef.current += (targetTime.current - currentTimeRef.current) * 0.08

        // Prevent microscopic updates
        if (Math.abs(targetTime.current - currentTimeRef.current) > 0.001) {
          videoRef.current.currentTime = currentTimeRef.current
        }

        const time = currentTimeRef.current
        const dur = durationRef.current

        let nextStep = 0
        if (time < 3.5) {
          nextStep = 0
        } else if (time >= 3.5 && time < 6.5) {
          nextStep = 1
        } else if (time >= 6.5 && time < dur - 1.5) {
          nextStep = 2
        } else if (time >= dur - 1.5) {
          nextStep = 3
        }

        setUiStep((prev) => {
          if (prev !== nextStep) return nextStep
          return prev
        })
      }
      rafId = requestAnimationFrame(updateVideo)
    }

    rafId = requestAnimationFrame(updateVideo)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] mb-[-100vh] bg-black text-white z-0" aria-label="Cinematic Hero Storytelling">
      
      {/* ── STICKY CONTAINER ── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* ── VIDEO BACKGROUND ── */}
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          <video
            ref={videoRef}
            src="/videos/entry1.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              durationRef.current = e.target.duration;
            }}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* ── CONTENT OVERLAYS ── */}
        <AnimatePresence mode="wait">
          {uiStep === 1 && (
            <HeroContentBlock key="block1" data={contentChapters[0]} />
          )}
          {uiStep === 2 && (
            <HeroContentBlock key="block2" data={contentChapters[1]} />
          )}
          {uiStep === 3 && (
            <HeroContentBlock key="block3" data={contentChapters[2]} isFinal />
          )}
        </AnimatePresence>

        {/* ── SCROLL INDICATOR ── */}
        <AnimatePresence>
          {(uiStep >= 0 && uiStep < 3) && (
            <motion.div
              key="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">
                {uiStep === 0 ? "Scroll to Begin" : "Scroll"}
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-2 rounded-full bg-white/60" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

function HeroContentBlock({ data, isFinal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6"
    >
      <h2
        className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl text-white"
        style={{ textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}
      >
        {data.title}
      </h2>
      <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-6 drop-shadow-lg" />
      <p
        className="text-gray-100 text-lg md:text-2xl font-serif italic max-w-2xl"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
      >
        {data.desc}
      </p>

      {isFinal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 pointer-events-auto"
        >
          <span
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #F78701 0%, #FFA040 100%)',
              boxShadow: '0 8px 32px rgba(247,135,1,0.45), 0 2px 8px rgba(247,135,1,0.2)',
            }}
          >
            Scroll Down to Explore
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

