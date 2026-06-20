import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Images for the scenes
const exteriorImg = '/phase1.png'
const livingImg = '/phase2.png'
const workspaceImg = '/phase2.png'
const studioImg = '/phase2.png'
const materialsImg = '/phase2.png'

gsap.registerPlugin(ScrollTrigger)

const STORY_SCENES = [
  {
    id: 's1',
    img: livingImg,
    subtitle: 'The Beginning',
    title: 'A Passion for Design',
    desc: 'We started with a simple belief: that the spaces we inhabit shape the way we live. Every line drawn and material chosen is a testament to that vision.',
  },
  {
    id: 's2',
    img: workspaceImg,
    subtitle: 'Our Evolution',
    title: 'Redefining Modern Spaces',
    desc: 'As we grew, so did our ambition. We expanded from intimate residential interiors to commanding commercial exteriors, always prioritizing architectural integrity.',
  },
  {
    id: 's3',
    img: studioImg,
    subtitle: 'The Studio',
    title: 'Where Ideas Take Shape',
    desc: 'Our design studio is a laboratory of creativity. Here, abstract concepts are meticulously refined into tangible blueprints and stunning 3D visualizations.',
  },
  {
    id: 's4',
    img: materialsImg,
    subtitle: 'Our Promise',
    title: 'Uncompromising Craftsmanship',
    desc: 'We obsess over the details. From the selection of premium materials to the final flawless execution, our commitment to quality is absolute.',
  }
]

export default function CinematicStory() {
  const containerRef = useRef(null)
  const exteriorRef = useRef(null)
  const introTextRef = useRef(null)
  const scenesContainerRef = useRef(null)
  
  // Refs for the interior scenes
  const interiorImagesRef = useRef([])
  const interiorTextsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%', // 6 viewports of scroll distance for the entire journey
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })

      const DURATION = 1

      // ==========================================
      // SCENE 1 & 2: EXTERIOR APPROACH
      // ==========================================
      
      // Fade out and float up the "Our Story" intro text
      tl.to(introTextRef.current, { opacity: 0, y: -50, duration: DURATION * 0.5, ease: 'power2.inOut' }, 0)
      
      // Zoom into the exterior building massively to simulate walking inside
      tl.to(exteriorRef.current, { 
        scale: 4, 
        opacity: 0, // fade out as we "enter" the building
        filter: 'blur(10px)',
        duration: DURATION * 1.5, 
        ease: 'power2.in' 
      }, 0)

      // ==========================================
      // SCENE 3 & 4: INTERIOR JOURNEY
      // ==========================================
      
      // Reveal the interior scenes container right as the exterior fades
      tl.set(scenesContainerRef.current, { opacity: 1 }, DURATION * 1.0)

      STORY_SCENES.forEach((scene, i) => {
        // Start time for this scene. 
        // DURATION * 1.0 creates a perfect 0.5s overlap/crossfade between scenes
        const t = DURATION * 1.5 + (i * DURATION * 1.0)

        // IMAGE ANIMATION
        // Continuous slow zoom for the entire duration this scene is visible (1.5s total)
        tl.fromTo(interiorImagesRef.current[i],
          { scale: 1.15 },
          { scale: 1, duration: DURATION * 1.5, ease: 'none' },
          t
        )

        // Fade in the image (0.5s)
        tl.fromTo(interiorImagesRef.current[i],
          { opacity: 0 },
          { opacity: 1, duration: DURATION * 0.5, ease: 'power2.inOut' },
          t
        )

        // TEXT ANIMATION
        // Fade in text slightly after image starts fading in
        tl.fromTo(interiorTextsRef.current[i],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: DURATION * 0.4, ease: 'power2.out' },
          t + DURATION * 0.3
        )

        // If it's not the final scene, fade it out to prepare for the next
        if (i !== STORY_SCENES.length - 1) {
          // Fade out image
          tl.to(interiorImagesRef.current[i], {
            opacity: 0,
            duration: DURATION * 0.5,
            ease: 'power2.inOut'
          }, t + DURATION * 1.0)

          // Fade out text
          tl.to(interiorTextsRef.current[i], {
            opacity: 0,
            y: -30,
            duration: DURATION * 0.4,
            ease: 'power2.in'
          }, t + DURATION * 0.9)
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
      aria-label="Our Story Cinematic Journey"
    >
      {/* ── EXTERIOR APPROACH (SCENE 1 & 2) ── */}
      <div 
        ref={exteriorRef}
        className="absolute inset-0 w-full h-full origin-center transform-gpu will-change-[transform,opacity,filter]"
      >
        <img 
          src={exteriorImg} 
          alt="Luxury Building Exterior" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      {/* ── INITIAL TITLE ── */}
      <div 
        ref={introTextRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none will-change-[transform,opacity]"
      >
        <h2 className="font-display font-bold text-white text-5xl md:text-7xl tracking-wide drop-shadow-2xl">
          Our Story
        </h2>
        <div className="w-16 h-1 bg-orange-500 rounded-full mt-6 shadow-[0_0_15px_rgba(230,138,46,0.5)]" />
      </div>

      {/* ── INTERIOR JOURNEY (SCENE 3 & 4) ── */}
      <div 
        ref={scenesContainerRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      >
        {STORY_SCENES.map((scene, i) => (
          <div key={scene.id} className="absolute inset-0 w-full h-full">
            {/* Background Image */}
            <div 
              ref={el => interiorImagesRef.current[i] = el}
              className="absolute inset-0 w-full h-full opacity-0 transform-gpu will-change-[transform,opacity]"
            >
              <img 
                src={scene.img} 
                alt={scene.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80" />
            </div>

            {/* Story Text */}
            <div 
              ref={el => interiorTextsRef.current[i] = el}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 will-change-[transform,opacity]"
            >
              <span className="px-4 py-1 mb-6 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-white/80 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                {scene.subtitle}
              </span>
              <h3 className="font-display font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow-2xl max-w-4xl leading-tight">
                {scene.title}
              </h3>
              <p className="text-gray-300 text-lg md:text-xl font-light font-serif leading-relaxed max-w-2xl drop-shadow-lg">
                {scene.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
