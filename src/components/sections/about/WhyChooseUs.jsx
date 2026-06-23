import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import glassImg from '../../../assets/images/glass-partition.png'
import flooringImg from '../../../assets/images/flooring.png'
import ceilingImg from '../../../assets/images/false-ceiling.png'
import acpImg from '../../../assets/images/exterior-acp.png'
import wallpaperImg from '../../../assets/images/wallpaper.png'
import upvcImg from '../../../assets/images/upvc-windows.png'

gsap.registerPlugin(ScrollTrigger)

const LAYERS = [
  { id: 'acp', name: 'Façade & ACP Cladding', img: acpImg, z: -500, y: -400 },
  { id: 'upvc', name: 'UPVC Window Systems', img: upvcImg, z: -300, y: -250 },
  { id: 'ceiling', name: 'Gypsum False Ceilings', img: ceilingImg, z: -100, y: -100 },
  { id: 'wallpaper', name: 'Premium Wall Finishes', img: wallpaperImg, z: 100, y: 50 },
  { id: 'glass', name: 'Structural Glass Partitions', img: glassImg, z: 300, y: 200 },
  { id: 'flooring', name: 'Luxury Flooring', img: flooringImg, z: 500, y: 350 },
]

const FEATURES = [
  { 
    id: 'f1', 
    title: 'Premium Craftsmanship', 
    desc: 'Uncompromising attention to detail in every corner. We use only the finest materials and masterful techniques to ensure your space reflects true architectural luxury.', 
    img: ceilingImg 
  },
  { 
    id: 'f2', 
    title: 'End-to-End Management', 
    desc: 'From the initial conceptual blueprint to the final immaculate handover. We handle all complexities, giving you a seamless and entirely stress-free experience.', 
    img: acpImg 
  },
  { 
    id: 'f3', 
    title: 'Transparent Communication', 
    desc: 'Clear updates, honest pricing, and consistent progress tracking throughout the entire project lifecycle. You are always informed and always in control.', 
    img: glassImg 
  },
  { 
    id: 'f4', 
    title: 'Timely Project Delivery', 
    desc: 'We respect your time. Your vision is spectacularly delivered on schedule, without ever compromising our exceptionally high standards of quality.', 
    img: flooringImg 
  },
]

export default function WhyChooseUs() {
  const containerRef = useRef(null)
  const layersRef = useRef([])
  const textRef = useRef(null)
  
  const featuresContainerRef = useRef(null)
  const featureCardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', // Reduced scroll distance
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })

      // 1. Assemble the exploded layers into a cohesive stack
      LAYERS.forEach((layer, i) => {
        tl.to(layersRef.current[i], {
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'power2.inOut',
        }, 0) // All animate together
      })

      // Fade out the exploded text labels
      tl.to('.layer-label', { opacity: 0, duration: 0.5 }, 0)
      
      // Fade in the final text
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.5)

      // 2. Pause to let the user read "Why Clients Choose Us"
      tl.to({}, { duration: 0.2 })

      // 3. Splitting Animation (Cards break apart)
      const splitLabel = 'sceneSplit'
      tl.addLabel(splitLabel)

      // Hide the center text
      tl.to(textRef.current, { opacity: 0, y: -30, duration: 0.5 }, splitLabel)

      // Scatter the 6 original layers back outwards and fade out
      LAYERS.forEach((layer, i) => {
        tl.to(layersRef.current[i], {
          y: layer.y * 1.5,
          z: layer.z * 1.5,
          rotateX: layer.rotateX,
          rotateY: layer.rotateY,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        }, splitLabel)
      })

      // Show the features grid container
      const showFeaturesLabel = `${splitLabel}+=0.4`
      tl.to(featuresContainerRef.current, { opacity: 1, duration: 0.5 }, showFeaturesLabel)
      tl.set(featuresContainerRef.current, { pointerEvents: 'auto' }, showFeaturesLabel)

      // Animate the 4 feature cards popping in from the center
      FEATURES.forEach((feature, i) => {
        tl.fromTo(featureCardsRef.current[i], 
          { opacity: 0, scale: 0.5, y: 0 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 
          `${showFeaturesLabel}+=${i * 0.1}`
        )
      })

      // 4. Pause for user to read the grid before unpinning
      tl.to({}, { duration: 0.5 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#111] overflow-hidden flex items-center justify-center"
      style={{ perspective: '1500px' }}
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-[#111] to-[#111] pointer-events-none" />

      {/* 3D Exploded Model */}
      <div 
        className="absolute w-full max-w-2xl aspect-video transform-gpu z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: '15deg', rotateY: '-25deg' }}
      >
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            ref={el => layersRef.current[i] = el}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10"
            style={{ 
              transform: `translate3d(0px, ${layer.y}px, ${layer.z}px) rotateX(10deg)`,
              opacity: 0.8,
              transformStyle: 'preserve-3d'
            }}
          >
            <img loading="lazy" src={layer.img} alt={layer.name} className="w-full h-full object-cover opacity-60 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            {/* Label attached to floating layer */}
            <div 
              className="layer-label absolute bottom-6 left-6 transform-gpu transition-opacity" 
              style={{ transform: 'translateZ(50px)' }}
            >
              <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 backdrop-blur-md rounded-full text-orange-300 text-xs font-semibold tracking-wider uppercase">
                {layer.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Assembled State Text (hidden initially) */}
      <div 
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none opacity-0 translate-y-10 w-full px-6"
      >
        <h2 className="font-display font-bold text-white text-5xl md:text-7xl mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          Why Clients <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Choose Us</span>
        </h2>
        <p className="text-gray-300 font-light text-lg md:text-xl max-w-2xl mx-auto drop-shadow-xl leading-relaxed">
          We combine premium craftsmanship with end-to-end project execution, ensuring transparent communication, on-time delivery, and spectacular modern designs that exceed expectations.
        </p>
      </div>

      {/* ── SPLIT FEATURE CARDS SCENE ── */}
      <div 
        ref={featuresContainerRef}
        className="absolute inset-0 z-30 opacity-0 pointer-events-none flex items-center justify-center bg-[#111]/40 backdrop-blur-sm"
      >
        <div className="w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative" style={{ perspective: '1500px' }}>
          {FEATURES.map((feature, i) => (
            <div 
              key={feature.id}
              ref={el => featureCardsRef.current[i] = el}
              className="relative aspect-[16/9] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 group opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img loading="lazy" src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-80 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
              
              <div className="absolute bottom-8 left-8 right-8 transform-gpu transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-10 h-1 bg-orange-500 rounded-full mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-white font-display font-bold text-2xl lg:text-3xl mb-3 drop-shadow-lg">{feature.title}</h3>
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed drop-shadow-md">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
