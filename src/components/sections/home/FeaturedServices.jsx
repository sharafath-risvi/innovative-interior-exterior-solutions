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
import lightingDesignImg from '../../../assets/images/hero-bg.png'

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
      if (i % 2 === 0) {
        // Even indices get Full screen then Split
        s.push({ type: 'full', side: layoutSide, service })
        
        // Remove Glass Partition Split Layout
        if (service.id !== 'glass-partitions') {
          s.push({ type: 'split', side: layoutSide, service })
        }
      } else {
        // Odd indices just get Split
        s.push({ type: 'split', side: layoutSide, service })
        // Switch side for next even index
        layoutSide = layoutSide === 'right' ? 'left' : 'right'
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

          const transitionKey = `${prevScene.service.id}->${scene.service.id}`
          const isPinnedSlide = 
            transitionKey === 'residential->commercial' || 
            transitionKey === 'false-ceiling->flooring'

          if (isPinnedSlide) {
            // ── PINNED SLIDE TRANSITION ──
            // Incoming image slides up from bottom, outgoing stays pinned
            tl.set(imagesRef.current[i], { opacity: 1, y: '100%' }, label)
            tl.to(imagesRef.current[i], { y: '0%', duration: 1, ease: 'power3.inOut' }, label)
            
            // Fade out previous text to avoid overlap
            if (prevScene.type === 'full') {
              tl.to(fullTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)
            } else if (prevScene.side === 'right') {
              tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)
            } else {
              tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)
            }

            // Slide incoming text up from bottom while container transitions
            if (scene.side === 'right') {
              tl.to(imageContainerRef.current, { width: '60vw', left: '40vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
              tl.fromTo(splitLeftTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              tl.to(imageContainerRef.current, { width: '60vw', left: '0vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
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
              tl.to(imageContainerRef.current, { width: '100vw', left: '0vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { scale: 1.05, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              if (scene.side === 'right') {
                tl.fromTo(splitLeftTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
                tl.to(imageContainerRef.current, { width: '60vw', left: '40vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
              } else {
                tl.fromTo(splitRightTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
                tl.to(imageContainerRef.current, { width: '60vw', left: '0vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
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
          tl.to(fullTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)
        } else if (lastScene.side === 'right') {
          tl.to(splitLeftTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)
        } else {
          tl.to(splitRightTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)
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
          
          const transitionKey = `${prevScene.service.id}->${scene.service.id}`
          const isPinnedSlide = 
            transitionKey === 'residential->commercial' || 
            transitionKey === 'false-ceiling->flooring'

          if (isPinnedSlide) {
            tl.set(imagesRef.current[i], { opacity: 1, y: '100%' }, label)
            tl.to(imagesRef.current[i], { y: '0%', duration: 1, ease: 'power3.inOut' }, label)
            
            if (prevScene.type === 'full') {
              tl.to(fullTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)
            } else if (prevScene.side === 'right') {
              tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)
            } else {
              tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)
            }
            
            if (scene.type === 'full') {
              tl.to(imageContainerRef.current, { width: '100vw', left: '0vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
              tl.fromTo(fullTextsRef.current[i], { opacity: 1, y: '100vh' }, { opacity: 1, y: 0, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              tl.to(imageContainerRef.current, { width: '100vw', left: '0vw', height: '45vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
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
              tl.to(imageContainerRef.current, { width: '100vw', left: '0vw', height: '100vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
              tl.to(imagesRef.current[i], { scale: 1.05, duration: 1, ease: 'power3.inOut' }, label)
            } else {
              if (scene.side === 'right') {
                tl.fromTo(splitLeftTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
              } else {
                tl.fromTo(splitRightTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
              }
              tl.to(imageContainerRef.current, { width: '100vw', left: '0vw', height: '45vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
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
          tl.to(fullTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)
        } else if (lastScene.side === 'right') {
          tl.to(splitLeftTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)
        } else {
          tl.to(splitRightTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)
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
        className="absolute top-0 left-0 w-full h-screen will-change-transform z-10 shadow-[0_0_40px_rgba(0,0,0,0.15)] overflow-hidden bg-black"
      >
        {scenes.map((scene, i) => {
          // Use lighting design image for false ceiling scene to prevent jump cuts during shrink
          const imgSrc = scene.service.id === 'false-ceiling' ? lightingDesignImg : scene.service.image;
          return (
            <div 
              key={`img-${i}`}
              ref={el => imagesRef.current[i] = el}
              className="absolute inset-0 w-full h-full opacity-0 overflow-hidden"
            >
              <img 
                src={imgSrc} 
                alt={scene.service.title} 
                className="w-full h-full object-cover origin-center" 
              />
              {/* Dark overlay for full-screen legibility */}
              <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 transition-opacity duration-700 ${scene.type === 'full' ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          )
        })}
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
                <>
                  <div className="bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8 flex items-center gap-2 mx-auto w-max shadow-lg">
                    <p className="text-white text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">
                      OUR EXPERTISE
                    </p>
                  </div>
                  <h2 className="font-display font-bold text-white text-6xl md:text-7xl lg:text-8xl leading-tight mb-8 drop-shadow-2xl">
                    What <em className="italic px-1 not-italic" style={{ color: '#E68A2E', fontStyle: 'italic' }}>We</em> Do
                  </h2>
                  <div className="w-32 h-1.5 bg-[#E68A2E] rounded-full mb-10 mx-auto shadow-[0_0_15px_rgba(230,138,46,0.5)]" />
                  <div className="px-8 py-5 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl mx-auto max-w-3xl">
                    <p className="text-white text-xl md:text-2xl font-serif drop-shadow-lg leading-relaxed font-medium">
                      We provide innovative interior and exterior solutions for residential and commercial spaces with premium craftsmanship and modern design.
                    </p>
                  </div>
                </>
              ) : scene.service.id === 'false-ceiling' && scene.type === 'full' ? (
                <>
                  <div className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 flex items-center gap-2 mx-auto w-max">
                    <p className="text-white text-xs font-semibold tracking-[0.2em] uppercase">
                      Cinematic Journey
                    </p>
                  </div>
                  <h2 className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-tight mb-4 drop-shadow-2xl">
                    Premium Lighting Design
                  </h2>
                  <div className="w-16 h-1 bg-orange-500 rounded-full mb-6 mx-auto" />
                  <p className="text-gray-200 text-lg md:text-2xl font-serif italic max-w-3xl drop-shadow-lg mx-auto">
                    Warmth, Ambiance, and Architectural Brilliance
                  </p>
                </>
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
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl text-white border border-white/30">
                    {service.icon}
                  </div>
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
