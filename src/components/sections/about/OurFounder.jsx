import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

export default function OurFounder() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Cursor following glow
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // 3D Image tilt effect based on mouse
  const handleImageMouseMove = (e) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15 // max 15 deg tilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    imageRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.14, 1.14, 1.14)`
  }

  const handleImageMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.12, 1.12, 1.12)`
    }
  }

  // Scroll animations for text
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current.querySelectorAll('.reveal-line')
      
      gsap.fromTo(lines, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Background Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-32 overflow-hidden bg-[#0A0A0A] flex items-center"
    >
      {/* Dynamic Cursor Light */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px] mix-blend-screen opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--color-orange) 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      <div className="px-6 md:px-12 lg:px-20 mx-auto w-full relative z-10" style={{ maxWidth: 'var(--container-max)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: 3D Portrait */}
          <div className="lg:col-span-5 relative group perspective">
            <div 
              ref={imageRef}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-transform duration-300 ease-out shadow-2xl"
              style={{ transformStyle: 'preserve-3d', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', transform: 'scale3d(1.12, 1.12, 1.12)' }}
            >
              <motion.img 
                style={{ y: yBg }}
                src="/iiesImages/ceoofiies.jpeg" 
                alt="Managing Director of IIES" 
                className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Name Badge */}
              <div className="absolute bottom-8 left-8 transform-gpu" style={{ transform: 'translateZ(50px)' }}>
                <p className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-1">Managing Director</p>
                <h3 className="text-white font-display text-3xl font-bold">Dhivahar Murugan</h3>
              </div>
            </div>
            
            {/* Glass panel decoration */}
            <div className="absolute -inset-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl -z-10 transform translate-x-4 translate-y-4" />
          </div>

          {/* Right: Storytelling Text */}
          <div className="lg:col-span-7 relative" ref={textRef}>
            {/* Large Background Quote */}
            <div className="absolute -top-20 -left-10 text-[200px] font-serif text-white/5 leading-none select-none pointer-events-none">
              &ldquo;
            </div>

            <div className="relative z-10 space-y-6">
              <h2 className="reveal-line font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-8">
                "IIES is a place where all kind of Interior Products used to create <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Interesting and Inspiring Designs</em>."
              </h2>

              <p className="reveal-line text-gray-400 text-lg leading-relaxed font-light">
                What started as a solitary vision has grown into a collective pursuit of architectural perfection. Founded in 2022 and built on over 16 years of industry expertise, I established IIES with a singular belief: every space has a story waiting to be told.
              </p>

              <p className="reveal-line text-gray-400 text-lg leading-relaxed font-light">
                We don't just build interiors and exteriors. We craft immersive environments. We obsess over the subtle interplay of light and shadow, the texture of a specific material, and the silent rhythm of a well-designed room.
              </p>

              <p className="reveal-line text-gray-400 text-lg leading-relaxed font-light">
                Our approach is deeply personal. We listen to the unspoken desires of our clients and translate them into physical, tangible luxury. It is this relentless dedication to craftsmanship that defines the IIES legacy.
              </p>

              {/* Signature */}
              <div className="reveal-line pt-10">
                <span className="font-signature text-5xl text-orange-400 opacity-80 block">
                  Dhivahar Murugan
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
