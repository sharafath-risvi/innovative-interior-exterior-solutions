// =================================================
// HOME PAGE — FEATURED SERVICES (Cinematic Scroll)
// =================================================
// File: src/components/sections/home/FeaturedServices.jsx
// Purpose: A premium cinematic storytelling experience with sticky scrolling.
//          Alternates between full-screen images and split layout descriptions,
//          seamlessly transitioning into a cards view and a final brand image.
// =================================================

import { useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INTERIOR_SERVICES, EXTERIOR_SERVICES } from '../../../lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedServices() {
  const containerRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imagesRef = useRef([])
  const fullTextsRef = useRef([])
  const splitLeftTextsRef = useRef([])
  const splitRightTextsRef = useRef([])
  
  const cardsContainerRef = useRef(null)
  
  // Combine services to create the sequence
  const allServices = useMemo(() => [...INTERIOR_SERVICES, ...EXTERIOR_SERVICES], [])
  const sequenceServices = useMemo(() => allServices.slice(0, 4), [allServices]) // Stop sticky images after Flooring
  const moreServices = useMemo(() => allServices.slice(5, 8), [allServices]) // Next 3 services for cards
  
  // Build scenes sequence for the first 5 services
  const scenes = useMemo(() => {
    const s = []
    let layoutSide = 'right' // image on right, content on left
    
    for (let i = 0; i < sequenceServices.length; i++) {
      const service = sequenceServices[i]
      if (i === 0) {
        // First index gets Full screen then Split
        s.push({ type: 'full', side: layoutSide, service })
        s.push({ type: 'split', side: layoutSide, service })
      } else {
        // Other indices just get Split
        s.push({ type: 'split', side: layoutSide, service })
        // Switch side for next index
        if (i % 2 !== 0) {
          layoutSide = layoutSide === 'right' ? 'left' : 'right'
        }
      }
    }
    return s
  }, [sequenceServices])

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const mm = gsap.matchMedia()

      // ── DESKTOP TIMELINE (min-width: 1025px) ──
      mm.add("(min-width: 1025px)", () => {
        gsap.set(imagesRef.current[0], { opacity: 1, scale: 1.05 })
        gsap.set(fullTextsRef.current[0], { opacity: 1, y: 0 })
        
        // Extended end point to accommodate the cards (Reduced scroll distance since final image is removed)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(scenes.length * 100) + 40}%`, 
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })
        
        scenes.forEach((scene, i) => {
          if (i === 0) return
          
          const prevScene = scenes[i - 1]
          const label = `step${i}`
          tl.addLabel(label)

          const isPinnedSlide = scene.service.id !== prevScene.service.id

          if (isPinnedSlide) {
            // ── PINNED SLIDE TRANSITION ──
            // Incoming image slides up from bottom, outgoing stays pinned
            tl.set(imagesRef.current[i], { opacity: 1, y: '100vh', x: scene.type === 'full' ? '0vw' : (scene.side === 'right' ? '20vw' : '-20vw') }, label)
            tl.to(imagesRef.current[i], { y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
            
            // Fade out previous text to avoid overlap
            if (prevScene.type === 'full') {
              tl.to(fullTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)
            } else if (prevScene.side === 'right') {
              tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)
            } else {
              tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)
            }

            // Slide incoming text up from bottom while container transitions
            if (scene.side === 'right') {
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 0% 40%)', duration: 1, ease: 'power3.inOut' }, label)
                tl.to(imagesRef.current[i], { x: '20vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              tl.fromTo(splitLeftTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 40% 0% 0%)', duration: 1, ease: 'power3.inOut' }, label)
                tl.to(imagesRef.current[i], { x: '-20vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              tl.fromTo(splitRightTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
            }
          } else {
            // ── STANDARD CROSSFADE (Unchanged) ──
            if (scene.service.id !== prevScene.service.id) {
              tl.to(imagesRef.current[i - 1], { opacity: 0, duration: 1 }, label)
              tl.to(imagesRef.current[i], { opacity: 1, duration: 1 }, label)
            } else {
              tl.set(imagesRef.current[i], { opacity: 1 }, label)
            }
            
            // Content Hiding
            if (prevScene.type === 'full') {
              tl.to(fullTextsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.6 }, label)
            } else if (prevScene.side === 'right') {
              tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.6 }, label)
            } else {
              tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.6 }, label)
            }
            
            // Content Showing
            const showLabel = `${label}+=0.4`
            if (scene.type === 'full') {
              tl.fromTo(fullTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { x: '0vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { scale: 1.05, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              if (scene.side === 'right') {
                tl.fromTo(splitLeftTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
                tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 0% 40%)', duration: 1, ease: 'power3.inOut' }, label)
                tl.to(imagesRef.current[i], { x: '20vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              } else {
                tl.fromTo(splitRightTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
                tl.to(imageContainerRef.current, { clipPath: 'inset(0% 40% 0% 0%)', duration: 1, ease: 'power3.inOut' }, label)
                tl.to(imagesRef.current[i], { x: '-20vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              }
              tl.to(imagesRef.current[i], { scale: 1, duration: 1, ease: 'power3.inOut' }, label)
            }
          }
          
          // Reading pause
          tl.to({}, { duration: 0.5 })
        })

        // ── APPEND: Service Cards Scene ──
        const cardsLabel = 'sceneCards'
        tl.addLabel(cardsLabel)
        
        // Hide the last active content dynamically based on scene type/side
        const lastScene = scenes[scenes.length - 1]
        if (lastScene.type === 'full') {
          tl.to(fullTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)
        } else if (lastScene.side === 'right') {
          tl.to(splitLeftTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)
        } else {
          tl.to(splitRightTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)
        }
        
        // ── PINNED SLIDE TRANSITION (Cards slide up from bottom) ──
        tl.fromTo(cardsContainerRef.current, { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, cardsLabel)
        // Enable pointer events while visible
        tl.set(cardsContainerRef.current, { pointerEvents: 'auto' }, cardsLabel)
        
        // Pause for reading cards before unpinning
        tl.to({}, { duration: 0.8 })
      })

      // ── MOBILE/TABLET TIMELINE (max-width: 1024px) ──
      mm.add("(max-width: 1024px)", () => {
        gsap.set(imagesRef.current[0], { opacity: 1, scale: 1.05 })
        gsap.set(fullTextsRef.current[0], { opacity: 1, y: 0 })
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(scenes.length * 100) + 40}%`, 
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })
        
        scenes.forEach((scene, i) => {
          if (i === 0) return
          
          const prevScene = scenes[i - 1]
          const label = `step${i}`
          tl.addLabel(label)
          
          const isPinnedSlide = scene.service.id !== prevScene.service.id

          if (isPinnedSlide) {
            tl.set(imagesRef.current[i], { opacity: 1, y: '100vh', x: '0vw' }, label)
            tl.to(imagesRef.current[i], { y: scene.type === 'full' ? '0vh' : '-27.5vh', duration: 1, ease: 'power3.inOut' }, label)
            
            if (prevScene.type === 'full') {
              tl.to(fullTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)
            } else if (prevScene.side === 'right') {
              tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)
            } else {
              tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)
            }
            
            if (scene.type === 'full') {
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { x: '0vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              tl.fromTo(fullTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 55vh 0%)', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { x: '0vw', y: '-27.5vh', duration: 1, ease: 'power3.inOut' }, label)
              if (scene.side === 'right') {
                tl.fromTo(splitLeftTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
              } else {
                tl.fromTo(splitRightTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
              }
            }
          } else {
            if (scene.service.id !== prevScene.service.id) {
              tl.to(imagesRef.current[i - 1], { opacity: 0, duration: 1 }, label)
              tl.to(imagesRef.current[i], { opacity: 1, duration: 1 }, label)
            } else {
              tl.set(imagesRef.current[i], { opacity: 1 }, label)
            }
            
            if (prevScene.type === 'full') {
              tl.to(fullTextsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.6 }, label)
            } else if (prevScene.side === 'right') {
              tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.6 }, label)
            } else {
              tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.6 }, label)
            }
            
            const showLabel = `${label}+=0.4`
            if (scene.type === 'full') {
              tl.fromTo(fullTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { x: '0vw', y: '0vh', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { scale: 1.05, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              if (scene.side === 'right') {
                tl.fromTo(splitLeftTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
              } else {
                tl.fromTo(splitRightTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
              }
              tl.to(imageContainerRef.current, { clipPath: 'inset(0% 0% 55vh 0%)', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { x: '0vw', y: '-27.5vh', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { scale: 1, duration: 1, ease: 'power3.inOut' }, label)
            }
          }
          
          tl.to({}, { duration: 0.4 })
        })

        // ── APPEND: Service Cards Scene ──
        const cardsLabel = 'sceneCards'
        tl.addLabel(cardsLabel)
        
        const lastScene = scenes[scenes.length - 1]
        if (lastScene.type === 'full') {
          tl.to(fullTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)
        } else if (lastScene.side === 'right') {
          tl.to(splitLeftTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)
        } else {
          tl.to(splitRightTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)
        }
        
        tl.fromTo(cardsContainerRef.current, { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, cardsLabel)
        tl.set(cardsContainerRef.current, { pointerEvents: 'auto' }, cardsLabel)
        
        tl.to({}, { duration: 0.8 })
      })

    }, containerRef)
    
    return () => ctx.revert()
  }, [scenes])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#FAFAFA]" aria-label="What We Do Cinematic">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-[#FAFAFA] z-0" />

      {/* ── IMAGE CONTAINER (First 5 Scenes) ── */}
      <div 
        ref={imageContainerRef} 
        className="absolute top-0 left-0 w-full h-screen will-change-[clip-path] z-10 shadow-[0_0_40px_rgba(0,0,0,0.15)] overflow-hidden bg-black" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      >
        {scenes.map((scene, i) => (
          <div 
            key={`img-${i}`}
            ref={el => imagesRef.current[i] = el}
            className="absolute inset-0 w-full h-full opacity-0 overflow-hidden"
          >
            <img loading="lazy" src={scene.service.image} 
              alt={scene.service.title} 
              className="w-full h-full object-cover origin-center" 
            />
            {/* Dark overlay for full-screen legibility */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 transition-opacity duration-700 ${scene.type === 'full' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        ))}
      </div>

      {/* ── FULL SCREEN OVERLAYS (First 5 Scenes) ── */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {scenes.map((scene, i) => (
          scene.type === 'full' && (
            <div 
              key={`full-${i}`}
              ref={el => fullTextsRef.current[i] = el}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0"
            >
              {i === 0 ? (
                /* ── FIRST SCREEN: Award-Winning Luxury Editorial ── */
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{ background: 'linear-gradient(170deg, #ffffff 0%, #fafaf8 55%, #f6f5f1 100%)' }}
                >

                  {/* ── LAYER 1: Dual radial glows for depth ── */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(247,148,29,0.075) 0%, rgba(247,148,29,0.025) 50%, transparent 78%)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 30% at 50% 100%, rgba(247,148,29,0.04) 0%, transparent 70%)' }}
                  />

                  {/* ── LAYER 2: Fine architectural grid ── */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(160,135,100,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(160,135,100,0.025) 1px, transparent 1px)
                      `,
                      backgroundSize: '56px 56px',
                    }}
                  />

                  {/* ── LAYER 3: Oversized background word (2% opacity stroke) ── */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3, ease: 'easeOut', delay: 0.4 }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        fontSize: 'clamp(100px, 18vw, 280px)',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(200,140,60,0.055)',
                        letterSpacing: '-0.035em',
                        lineHeight: 1,
                        userSelect: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      CRAFTSMANSHIP
                    </span>
                  </motion.div>

                  {/* ── LAYER 4: Editorial vertical column rules ── */}
                  <motion.div
                    className="absolute left-[7vw] top-0 bottom-0 pointer-events-none hidden lg:flex items-stretch"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    style={{ transformOrigin: 'top' }}
                  >
                    <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, transparent 0%, rgba(230,138,46,0.18) 15%, rgba(230,138,46,0.18) 85%, transparent 100%)' }} />
                  </motion.div>
                  <motion.div
                    className="absolute right-[7vw] top-0 bottom-0 pointer-events-none hidden lg:flex items-stretch"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    style={{ transformOrigin: 'top' }}
                  >
                    <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, transparent 0%, rgba(230,138,46,0.18) 15%, rgba(230,138,46,0.18) 85%, transparent 100%)' }} />
                  </motion.div>

                  {/* ── LAYER 5: Animated horizontal rules ── */}
                  <motion.div
                    className="absolute left-0 right-0 pointer-events-none hidden md:block"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                    style={{ top: '12%', height: '1px', transformOrigin: 'center', background: 'linear-gradient(90deg, transparent 0%, rgba(200,155,100,0.16) 20%, rgba(230,138,46,0.12) 50%, rgba(200,155,100,0.16) 80%, transparent 100%)' }}
                  />
                  <motion.div
                    className="absolute left-0 right-0 pointer-events-none hidden md:block"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
                    style={{ bottom: '12%', height: '1px', transformOrigin: 'center', background: 'linear-gradient(90deg, transparent 0%, rgba(200,155,100,0.16) 20%, rgba(230,138,46,0.12) 50%, rgba(200,155,100,0.16) 80%, transparent 100%)' }}
                  />

                  {/* ── LAYER 6: Corner L-brackets ── */}
                  {[
                    { pos: 'top-9 left-9', dir: 'tl' },
                    { pos: 'top-9 right-9', dir: 'tr' },
                    { pos: 'bottom-9 left-9', dir: 'bl' },
                    { pos: 'bottom-9 right-9', dir: 'br' },
                  ].map(({ pos, dir }) => (
                    <div key={dir} className={`absolute ${pos} pointer-events-none hidden md:block`} style={{ width: '36px', height: '36px' }}>
                      {/* horizontal arm */}
                      <div style={{
                        position: 'absolute',
                        width: '100%', height: '1px',
                        background: 'rgba(230,138,46,0.4)',
                        top: dir.startsWith('b') ? 'auto' : 0,
                        bottom: dir.startsWith('b') ? 0 : 'auto',
                        left: dir.endsWith('r') ? 'auto' : 0,
                        right: dir.endsWith('r') ? 0 : 'auto',
                      }} />
                      {/* vertical arm */}
                      <div style={{
                        position: 'absolute',
                        width: '1px', height: '100%',
                        background: 'rgba(230,138,46,0.4)',
                        top: dir.startsWith('b') ? 'auto' : 0,
                        bottom: dir.startsWith('b') ? 0 : 'auto',
                        left: dir.endsWith('r') ? 'auto' : 0,
                        right: dir.endsWith('r') ? 0 : 'auto',
                      }} />
                    </div>
                  ))}

                  {/* ── LAYER 7: Floating geometric shapes & glowing dots ── */}
                  {/* Left diamond */}
                  <motion.div
                    className="absolute pointer-events-none hidden md:block"
                    style={{ top: '21%', left: '6%', width: '10px', height: '10px', border: '1px solid rgba(230,138,46,0.32)', transform: 'rotate(45deg)' }}
                    animate={{ y: [0, -9, 0], rotate: ['45deg', '90deg', '45deg'], opacity: [0.32, 0.55, 0.32] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Right diamond */}
                  <motion.div
                    className="absolute pointer-events-none hidden md:block"
                    style={{ bottom: '24%', right: '6%', width: '7px', height: '7px', border: '1px solid rgba(230,138,46,0.25)', transform: 'rotate(45deg)' }}
                    animate={{ y: [0, 8, 0], rotate: ['45deg', '0deg', '45deg'], opacity: [0.25, 0.48, 0.25] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
                  />
                  {/* Orange glow dot left */}
                  <motion.div
                    className="absolute pointer-events-none hidden md:block"
                    style={{ top: '36%', left: '4.5%' }}
                    animate={{ y: [0, -11, 0], opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F7941D', boxShadow: '0 0 16px 5px rgba(247,148,29,0.28)' }} />
                  </motion.div>
                  {/* Orange glow dot right */}
                  <motion.div
                    className="absolute pointer-events-none hidden md:block"
                    style={{ bottom: '33%', right: '4.5%' }}
                    animate={{ y: [0, 9, 0], opacity: [0.45, 0.75, 0.45] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  >
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F7941D', boxShadow: '0 0 12px 4px rgba(247,148,29,0.22)' }} />
                  </motion.div>
                  {/* Tiny dark dot upper-right area */}
                  <motion.div
                    className="absolute pointer-events-none hidden md:block"
                    style={{ top: '30%', right: '11%', width: '3px', height: '3px', borderRadius: '50%', background: '#1a1a1a', opacity: 0.1 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
                  />

                  {/* ── LAYER 8: SVG architectural arch accent ── */}
                  <motion.svg
                    className="absolute pointer-events-none hidden lg:block"
                    style={{ bottom: '16%', left: '50%', transform: 'translateX(-50%)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.065 }}
                    transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                    width="640" height="90" viewBox="0 0 640 90" fill="none"
                  >
                    <path d="M0 90 Q320 0 640 90" stroke="#C8860A" strokeWidth="1" fill="none"/>
                    <path d="M50 90 Q320 22 590 90" stroke="#C8860A" strokeWidth="0.6" fill="none"/>
                    <circle cx="320" cy="6" r="3" fill="none" stroke="#C8860A" strokeWidth="0.8"/>
                  </motion.svg>

                  {/* ── MAIN CONTENT (z-10 so it sits above all layers) ── */}
                  <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ maxWidth: '880px', width: '100%' }}>

                    {/* Eyebrow label */}
                    <motion.div
                      className="flex items-center gap-5 mb-10 md:mb-14"
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                    >
                      <span style={{ display: 'block', width: '52px', height: '1px', background: 'linear-gradient(90deg, transparent, #E68A2E)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: '9px',
                          letterSpacing: '0.4em',
                          textTransform: 'uppercase',
                          color: '#E68A2E',
                        }}
                      >
                        Our Expertise
                      </span>
                      <span style={{ display: 'block', width: '52px', height: '1px', background: 'linear-gradient(90deg, #E68A2E, transparent)' }} />
                    </motion.div>

                    {/* Heading — clip-mask reveal from bottom */}
                    <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
                      <motion.h2
                        initial={{ y: '105%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 800,
                          fontSize: 'clamp(56px, 9.5vw, 122px)',
                          color: '#080808',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.0,
                          display: 'block',
                        }}
                      >
                        What{' '}
                        <em
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontStyle: 'italic',
                            fontWeight: 800,
                            color: '#F7941D',
                            letterSpacing: '-0.02em',
                            textShadow: '0 0 80px rgba(247,148,29,0.2)',
                          }}
                        >
                          We
                        </em>
                        {' '}Do
                      </motion.h2>
                    </div>

                    {/* Premium jewelled divider */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                      style={{ transformOrigin: 'center', marginBottom: '40px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                        <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(230,138,46,0.45))' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', border: '1.5px solid rgba(230,138,46,0.6)', flexShrink: 0 }} />
                        <div style={{ width: '72px', height: '1.5px', background: 'linear-gradient(90deg, rgba(230,138,46,0.7), #F7941D, rgba(230,138,46,0.7))', borderRadius: '2px' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', border: '1.5px solid rgba(230,138,46,0.6)', flexShrink: 0 }} />
                        <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, rgba(230,138,46,0.45), transparent)' }} />
                      </div>
                    </motion.div>

                    {/* Description — staggered fade-up */}
                    <motion.p
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.78 }}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(16px, 1.5vw, 21px)',
                        color: '#525252',
                        lineHeight: 2.05,
                        maxWidth: '560px',
                        fontWeight: 400,
                        letterSpacing: '0.015em',
                      }}
                    >
                      We provide innovative interior and exterior solutions for residential
                      and commercial spaces with premium craftsmanship and modern design.
                    </motion.p>

                    {/* Animated scroll cue */}
                    <motion.div
                      className="hidden md:flex flex-col items-center gap-3 mt-16"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.0, delay: 1.2 }}
                    >
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(82,82,82,0.6)' }}>
                        Scroll to Explore
                      </span>
                      <motion.div
                        style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(247,148,29,0.75), transparent)' }}
                        animate={{ scaleY: [1, 0.45, 1], opacity: [0.75, 1, 0.75] }}
                        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </motion.div>

                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 flex items-center gap-2 mx-auto w-max">
                    <p className="text-white text-xs font-semibold tracking-[0.2em] uppercase">
                      Cinematic Journey
                    </p>
                  </div>
                  <h2 className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-tight mb-4 drop-shadow-2xl">
                    {scene.service.title}
                  </h2>
                  <div className="w-16 h-1 bg-orange-500 rounded-full mb-6 mx-auto" />
                  <p className="text-gray-200 text-lg md:text-2xl font-serif italic max-w-3xl drop-shadow-lg mx-auto">
                    {scene.service.subtitle}
                  </p>
                </>
              )}
            </div>
          )
        ))}
      </div>

      {/* ── SPLIT LEFT CONTENT (Text on Left, Image on Right) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {scenes.map((scene, i) => (
          scene.type === 'split' && scene.side === 'right' && (
            <div 
              key={`split-left-${i}`}
              ref={el => splitLeftTextsRef.current[i] = el}
              className="absolute bottom-0 left-0 w-full h-[55vh] lg:h-screen lg:w-[40vw] flex flex-col justify-center px-6 sm:px-10 lg:px-24 opacity-0 pointer-events-auto"
            >
              <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2 lg:mb-4 flex items-center gap-2 lg:gap-3">
                {scene.service.subtitle}
              </p>
              <h3 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 lg:mb-6">
                {scene.service.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                {scene.service.description}
              </p>
              {scene.service.features && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6 lg:mb-10">
                  {scene.service.features.map((feature, idx) => (
                     <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-medium">
                       <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                       {feature}
                     </li>
                  ))}
                </ul>
              )}
              <Link 
                to="/services" 
                className="group inline-flex items-center gap-3 text-xs lg:text-sm font-semibold tracking-widest uppercase transition-colors hover:text-orange-500 w-max"
              >
                <span className="w-8 h-px bg-gray-900 transition-all group-hover:w-12 group-hover:bg-orange-500" />
                Explore Detail
              </Link>
            </div>
          )
        ))}
      </div>

      {/* ── SPLIT RIGHT CONTENT (Text on Right, Image on Left) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {scenes.map((scene, i) => (
          scene.type === 'split' && scene.side === 'left' && (
            <div 
              key={`split-right-${i}`}
              ref={el => splitRightTextsRef.current[i] = el}
              className="absolute bottom-0 right-0 w-full h-[55vh] lg:h-screen lg:w-[40vw] flex flex-col justify-center px-6 sm:px-10 lg:px-24 opacity-0 pointer-events-auto"
            >
              <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2 lg:mb-4 flex items-center gap-2 lg:gap-3">
                {scene.service.subtitle}
              </p>
              <h3 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 lg:mb-6">
                {scene.service.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                {scene.service.description}
              </p>
              {scene.service.features && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6 lg:mb-10">
                  {scene.service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              <Link 
                to="/services" 
                className="group inline-flex items-center gap-3 text-xs lg:text-sm font-semibold tracking-widest uppercase transition-colors hover:text-orange-500 w-max"
              >
                <span className="w-8 h-px bg-gray-900 transition-all group-hover:w-12 group-hover:bg-orange-500" />
                Explore Detail
              </Link>
            </div>
          )
        ))}
      </div>

      {/* ── MORE SERVICES (CARDS) SCENE ── */}
      <div 
        ref={cardsContainerRef}
        className="absolute inset-0 z-30 opacity-0 pointer-events-none flex flex-col items-center justify-center bg-[#FAFAFA]"
      >
        <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-display font-bold text-gray-900 text-4xl md:text-5xl">
              Complete Interior & Exterior Solutions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {moreServices.map(service => (
              <div key={service.id} className="group relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-white border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2">
                <div className="h-48 md:h-64 overflow-hidden relative">
                  <img src={service.image} loading="lazy" alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg md:text-xl mb-3 group-hover:text-[#E68A2E] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <Link to="/services" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-900 mt-6 group-hover:text-[#E68A2E] transition-colors">
                    <span className="w-6 h-px bg-gray-900 group-hover:w-10 group-hover:bg-[#E68A2E] transition-all" />
                    Explore Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
