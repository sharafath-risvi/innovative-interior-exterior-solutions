import { useEffect, useRef, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import residentialImg from '../../../assets/images/residential.webp'
import flooringImg from '../../../assets/images/flooring.webp'
import falseCeilingImg from '../../../assets/images/false-ceiling.webp'
import blueprintDarkImg from '../../../assets/images/blueprint-dark.webp'
import exteriorAcpImg from '../../../assets/images/exterior-acp.webp'

gsap.registerPlugin(ScrollTrigger)

const CARDS_DATA = [
  {
    phase: 'Phase 01 // Vision',
    title: 'The Marina<br/>Residence',
    subtitle: 'A masterclass in spatial harmony.',
    desc: 'Every masterpiece begins with a conversation. We sat with the client to understand their dreams, translating their unique lifestyle into a blueprint of extraordinary potential.',
    img: residentialImg
  },
  {
    phase: 'Phase 02 // Philosophy',
    title: 'Materials<br/>that Speak',
    subtitle: 'Sourcing the finest organic elements.',
    desc: 'We believe the soul of any space lies in its textures. Our curation process sources only the finest organic materials to create an atmosphere of grounded luxury and timeless appeal.',
    img: flooringImg
  },
  {
    phase: 'Phase 03 // Execution',
    title: 'Illuminated<br/>Volumes',
    subtitle: 'Sculpting light and space.',
    desc: 'The false ceiling design doesn\'t just hide services—it sculpts the light. Recessed channels and warm tones bring an intimate scale to the grand architecture above.',
    img: falseCeilingImg
  },
  {
    phase: 'Phase 04 // Blueprint',
    title: 'Precision<br/>Engineering',
    subtitle: 'Meticulous structural integrity.',
    desc: 'Lines on paper become worlds. Every spatial intersection is meticulously calculated for structural integrity and effortless flow, ensuring flawless project execution.',
    img: blueprintDarkImg
  },
  {
    phase: 'Phase 05 // Handover',
    title: 'Extraordinary<br/>Living',
    subtitle: 'A masterstroke of modern design.',
    desc: 'The moment of transformation. An ordinary space has become something magnificent — a living testament to innovative design, premium materials, and expert craftsmanship.',
    img: exteriorAcpImg
  }
]

export default function StorytellingSection() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * 5}`, // 5 viewport heights of scrolling
          pin: pinRef.current,
          scrub: 1, // Butter smooth 1-second scrub catch-up
        }
      })

      const [c1, c2, c3, c4, c5] = cardRefs.current

      // ── INIT STATES ──
      gsap.set(c1, { scale: 1, x: 0, y: 0, opacity: 1, rotateZ: 0 })
      gsap.set(c2, { opacity: 0, y: '20vh' })
      gsap.set(c3, { opacity: 0, y: '20vh' })
      gsap.set(c4, { opacity: 0, y: '20vh' })
      gsap.set(c5, { opacity: 0, y: '20vh' })

      const ease = 'power2.inOut'

      // ── SCROLL 1: Card 1 -> Stack, Card 2 -> Center ──
      tl.to(c1, { scale: 0.65, x: '-28vw', y: '-25vh', rotateZ: -6, opacity: 0.3, ease, duration: 1 }, 0)
      tl.to(c2, { opacity: 1, y: 0, scale: 1, ease, duration: 1 }, 0)

      // ── SCROLL 2: Card 2 -> Stack, Card 3 -> Center ──
      tl.to(c2, { scale: 0.65, x: '-24vw', y: '-21vh', rotateZ: -4, opacity: 0.4, ease, duration: 1 }, 1)
      tl.to(c3, { opacity: 1, y: 0, scale: 1, ease, duration: 1 }, 1)

      // ── SCROLL 3: Card 3 -> Stack, Card 4 -> Center ──
      tl.to(c3, { scale: 0.65, x: '-20vw', y: '-17vh', rotateZ: -2, opacity: 0.5, ease, duration: 1 }, 2)
      tl.to(c4, { opacity: 1, y: 0, scale: 1, ease, duration: 1 }, 2)

      // ── SCROLL 4: Card 4 -> Stack, Card 5 -> Center ──
      tl.to(c4, { scale: 0.65, x: '-16vw', y: '-13vh', rotateZ: 0, opacity: 0.6, ease, duration: 1 }, 3)
      tl.to(c5, { opacity: 1, y: 0, scale: 1, ease, duration: 1 }, 3)

      // ── SCROLL 5: THE PRESENTATION BOARD FINALE ──
      // All cards explode from their positions into a diagonal overlapping showcase
      tl.to(c1, { scale: 0.75, x: '-16vw', y: '16vh', rotateZ: -8, opacity: 0.2, ease, duration: 1 }, 4)
      tl.to(c2, { scale: 0.80, x: '-8vw', y: '8vh', rotateZ: -4, opacity: 0.4, ease, duration: 1 }, 4)
      tl.to(c3, { scale: 0.85, x: 0, y: 0, rotateZ: 0, opacity: 0.6, ease, duration: 1 }, 4)
      tl.to(c4, { scale: 0.90, x: '8vw', y: '-8vh', rotateZ: 4, opacity: 0.8, ease, duration: 1 }, 4)
      tl.to(c5, { scale: 0.95, x: '16vw', y: '-16vh', rotateZ: 8, opacity: 1, ease, duration: 1 }, 4)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="storytelling"
      className="relative"
      aria-label="IIES Design Journey Storytelling"
      style={{ height: `${window.innerHeight * 6}px` }} // 1 viewport per scroll (5 scrolls total)
    >
      {/* ── PINNED WRAPPER ── */}
      <div ref={pinRef} className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
        
        {/* Elegant Matte Background with Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={blueprintDarkImg} loading="lazy" alt="Architecture Texture" className="w-full h-full object-cover mix-blend-screen opacity-5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        {/* Section Label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-white/50">
            Design Journey
          </span>
        </div>

        {/* ================================================= */}
        {/* CARDS CONTAINER (3D Perspective Space) */}
        {/* ================================================= */}
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center perspective-[1500px] transform-gpu px-4 md:px-8">
          {CARDS_DATA.map((card, i) => (
            <JourneyCard 
              key={i}
              ref={el => cardRefs.current[i] = el}
              zIndex={10 + (i * 10)}
              {...card}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

const JourneyCard = forwardRef(({ phase, title, subtitle, desc, img, zIndex }, ref) => (
  <div 
    ref={ref} 
    className="absolute w-[90%] max-w-4xl bg-[#141414] border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center will-change-transform"
    style={{ zIndex }}
  >
    <div className="w-full md:w-1/2 rounded-2xl overflow-hidden h-48 md:h-[400px] shrink-0 border border-white/5 relative group">
      <img src={img} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Architecture Feature" />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:opacity-0" />
    </div>
    <div className="w-full md:w-1/2 flex flex-col gap-4 text-white">
      <span className="text-orange-500 text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold">{phase}</span>
      <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight drop-shadow-md" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-gray-400 font-serif italic text-base md:text-lg">{subtitle}</p>
      <div className="w-12 h-px bg-orange-500/50 my-1 md:my-2" />
      <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  </div>
))
