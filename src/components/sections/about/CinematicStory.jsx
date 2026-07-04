import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Importing images
import imgScene1 from '../../../assets/images/modern-villa-exterior.webp'
import imgScene2 from '../../../assets/images/premium-hero-interior.webp'

gsap.registerPlugin(ScrollTrigger)

const STORY_SCENES = [
  {
    id: 's1',
    side: 'left', // image on left, text on right
    img: imgScene1,
    subtitle: 'Welcome to IIES',
    title: 'About Us',
    desc: 'Founded in 2022, Innovative Interior & Exterior Solutions is built on over 16 years of industry expertise, delivering creative, functional, and high-quality interior and exterior solutions. We are committed to crafting environments that inspire, engage, and delight.',
  },
  {
    id: 's2',
    side: 'right', // image on right, text on left
    img: imgScene2,
    subtitle: 'Your Trusted Interior Partner',
    title: 'Company Introduction',
    desc: 'Innovative Interior & Exterior Solutions (IIES) is your one-stop solution for all design needs. We blend our 16+ years of industry expertise with modern creativity and functionality to redefine residential, commercial, and landmark spaces.',
  }
]

export default function CinematicStory() {
  const containerRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imagesRef = useRef([])
  const leftTextsRef = useRef([])
  const rightTextsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 1025px)", () => {
        // Initial setup for first scene
        // Scene 1: Image on left (0vw, 55vw), Text on right
        gsap.set(imageContainerRef.current, { width: '55vw', left: '0vw', height: '100vh', top: '0' })
        gsap.set(imagesRef.current[0], { opacity: 1, scale: 1.05 })
        gsap.set(rightTextsRef.current[0], { opacity: 1, y: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(STORY_SCENES.length * 100)}%`, 
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        STORY_SCENES.forEach((scene, i) => {
          if (i === 0) return

          const prevScene = STORY_SCENES[i - 1]
          const label = `step${i}`
          tl.addLabel(label)

          // Crossfade images
          tl.to(imagesRef.current[i - 1], { opacity: 0, duration: 1 }, label)
          tl.to(imagesRef.current[i], { opacity: 1, duration: 1 }, label)

          // Content Hiding (previous text)
          if (prevScene.side === 'left') {
            tl.to(rightTextsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.6 }, label)
          } else {
            tl.to(leftTextsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.6 }, label)
          }

          // Content Showing (current text)
          const showLabel = `${label}+=0.4`
          
          if (scene.side === 'right') {
            // Image on right, Text on left
            tl.fromTo(leftTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
            tl.to(imageContainerRef.current, { width: '55vw', left: '45vw', duration: 1, ease: 'power3.inOut' }, label)
          } else {
            // Image on left, Text on right
            tl.fromTo(rightTextsRef.current[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
            tl.to(imageContainerRef.current, { width: '55vw', left: '0vw', duration: 1, ease: 'power3.inOut' }, label)
          }

          // Image zoom effect
          tl.to(imagesRef.current[i], { scale: 1, duration: 1, ease: 'power3.inOut' }, label)

          // Reading pause
          tl.to({}, { duration: 0.5 })
        })
      })

      mm.add("(max-width: 1024px)", () => {
        // Initial setup for first scene (Mobile/Tablet)
        // Image at top (45vh height)
        gsap.set(imageContainerRef.current, { width: '100vw', left: '0vw', height: '45vh', top: '0' })
        gsap.set(imagesRef.current[0], { opacity: 1, scale: 1.05 })
        gsap.set(rightTextsRef.current[0], { opacity: 1, y: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(STORY_SCENES.length * 100)}%`, 
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        STORY_SCENES.forEach((scene, i) => {
          if (i === 0) return

          const prevScene = STORY_SCENES[i - 1]
          const label = `step${i}`
          tl.addLabel(label)

          // Crossfade images
          tl.to(imagesRef.current[i - 1], { opacity: 0, duration: 1 }, label)
          tl.to(imagesRef.current[i], { opacity: 1, duration: 1 }, label)

          // Content Hiding
          if (prevScene.side === 'left') {
            tl.to(rightTextsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.6 }, label)
          } else {
            tl.to(leftTextsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.6 }, label)
          }

          // Content Showing
          const showLabel = `${label}+=0.4`
          
          if (scene.side === 'right') {
            tl.fromTo(leftTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
          } else {
            tl.fromTo(rightTextsRef.current[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, showLabel)
          }

          // For mobile, image container remains at top, size fixed
          tl.to(imageContainerRef.current, { width: '100vw', left: '0vw', height: '45vh', top: '0', duration: 1, ease: 'power3.inOut' }, label)
          tl.to(imagesRef.current[i], { scale: 1, duration: 1, ease: 'power3.inOut' }, label)

          tl.to({}, { duration: 0.4 })
        })
      })

    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black" aria-label="Our Story Cinematic Journey">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* ── IMAGE CONTAINER ── */}
      <div 
        ref={imageContainerRef} 
        className="absolute top-0 left-0 w-full h-screen will-change-transform z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden bg-black"
      >
        {STORY_SCENES.map((scene, i) => (
          <div 
            key={`img-${i}`}
            ref={el => imagesRef.current[i] = el}
            className="absolute inset-0 w-full h-full opacity-0 overflow-hidden"
          >
            <img loading="lazy" src={scene.img} 
              alt={scene.title} 
              className="w-full h-full object-cover origin-center" 
            />
            {/* Dark overlay for premium feel */}
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-700" />
          </div>
        ))}
      </div>

      {/* ── SPLIT LEFT CONTENT (Text on Left, Image on Right) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {STORY_SCENES.map((scene, i) => (
          scene.side === 'right' && (
            <div 
              key={`split-left-${i}`}
              ref={el => leftTextsRef.current[i] = el}
              className="absolute bottom-0 left-0 w-full h-[55vh] lg:h-screen lg:w-[45vw] flex flex-col justify-center px-8 sm:px-12 lg:px-20 opacity-0 pointer-events-auto bg-black lg:bg-transparent"
            >
              <p className="text-[#E68A2E] text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 lg:mb-4 flex items-center gap-3 lg:gap-4">
                <span className="w-6 lg:w-10 h-[2px] bg-[#E68A2E] inline-block"></span>
                {scene.subtitle}
              </p>
              <h3 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4 lg:mb-6">
                {scene.title}
              </h3>
              <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 lg:mb-8 font-serif font-light">
                {scene.desc}
              </p>
            </div>
          )
        ))}
      </div>

      {/* ── SPLIT RIGHT CONTENT (Text on Right, Image on Left) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {STORY_SCENES.map((scene, i) => (
          scene.side === 'left' && (
            <div 
              key={`split-right-${i}`}
              ref={el => rightTextsRef.current[i] = el}
              className="absolute bottom-0 right-0 w-full h-[55vh] lg:h-screen lg:w-[45vw] flex flex-col justify-center px-8 sm:px-12 lg:px-20 opacity-0 pointer-events-auto bg-black lg:bg-transparent"
            >
              <p className="text-[#E68A2E] text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 lg:mb-4 flex items-center gap-3 lg:gap-4">
                <span className="w-6 lg:w-10 h-[2px] bg-[#E68A2E] inline-block"></span>
                {scene.subtitle}
              </p>
              <h3 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4 lg:mb-6">
                {scene.title}
              </h3>
              <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 lg:mb-8 font-serif font-light">
                {scene.desc}
              </p>
            </div>
          )
        ))}
      </div>

    </section>
  )
}
