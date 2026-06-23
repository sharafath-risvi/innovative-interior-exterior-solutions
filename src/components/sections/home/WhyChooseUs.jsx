import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ── Premium Image Assets ──
import heroBg from '../../../assets/images/hero-bg.webp'
import resImg from '../../../assets/images/residential.webp'
import extImg from '../../../assets/images/modern-villa-exterior.webp' // New premium exterior
import bpImg from '../../../assets/images/blueprint-dark.webp'
import ceilImg from '../../../assets/images/false-ceiling.webp'
import revImg from '../../../assets/images/luxury-reveal.webp'

const details = [
  {
    id: '01',
    title: 'Luxury Interior Design',
    desc: 'Bespoke interior solutions that harmonize modern aesthetics with absolute comfort. We source the finest materials and curate every element to reflect your distinct lifestyle and vision.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    id: '02',
    title: 'Modern Exterior Design',
    desc: 'Striking architectural facades that command attention. Our exterior designs blend structural integrity with innovative materials to ensure your property stands out while enduring the elements.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    id: '03',
    title: 'End-to-End Project Management',
    desc: 'A seamless journey from the initial blueprint to the final handover. Our dedicated project managers ensure flawless execution, strict budget control, and transparent communication at every phase.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
  },
  {
    id: '04',
    title: 'Premium Craftsmanship',
    desc: 'We collaborate with master artisans and skilled engineers to deliver unparalleled build quality. Every joint, finish, and fixture is executed with meticulous attention to detail.',
    icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
  },
  {
    id: '05',
    title: 'On-Time Project Delivery',
    desc: 'Time is your most valuable asset. We employ advanced scheduling methodologies and proactive risk management to guarantee your project is delivered exactly when promised, without compromise.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]

function Hexagon({ image, title, delay }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
        hover: { y: -15, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }
      }}
      className="group relative w-full max-w-[280px] md:max-w-[320px] mx-auto overflow-hidden cursor-pointer shadow-2xl"
      style={{ 
        aspectRatio: '0.866 / 1', // Perfect point-up hexagon ratio (sqrt(3)/2)
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
      }}
    >
      {/* Background Image */}
      <motion.img 
        variants={{ hover: { scale: 1.15 } }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:brightness-110" 
      />
      
      {/* Subtle Gradient Overlay for Text Readability Only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

      {/* Content - Positioned Near Bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-[20%] px-6 text-center z-10">
        <motion.h3 
          variants={{ hover: { color: '#fb923c' } }} // orange-400
          className="text-white font-display font-extrabold text-xl md:text-2xl leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
        >
          {title}
        </motion.h3>
      </div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const containerRef = useRef(null)
  
  // Track scroll progress within this specific section wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Cinematic scroll animations for the sticky Hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100])
  const bgScale = useTransform(scrollYProgress, [0, 0.4], [1.05, 1])

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAF8] z-10" aria-label="Why Choose IIES Hexagon Showcase">
      
      {/* =========================================
          SECTION 1: STICKY HERO INTRODUCTION
          ========================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Image */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full">
           <img src={heroBg} loading="lazy" alt="Luxury Architecture Background" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
           <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl">
             Why Choose IIES
           </h2>
           <div className="w-24 h-1 bg-orange-500 rounded-full mb-8 mx-auto" />
           <p className="text-lg md:text-2xl text-white/90 max-w-3xl font-serif leading-relaxed drop-shadow-lg">
             Every space we design is built with creativity, precision, and attention to detail. From concept to completion, we transform ideas into timeless architectural experiences.
           </p>
        </motion.div>
      </div>

      {/* =========================================
          SECTION 2 & 3: HEXAGON SHOWCASE (Scrolls over Hero)
          ========================================= */}
      <div className="relative z-20 bg-[#FAFAF8] pt-32 pb-40 rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] border-t border-white/50 min-h-screen">
        
        {/* Subtle grid/blueprint background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Our Expertise</span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mt-4">The Pillars of Our Success</h3>
          </motion.div>

          {/* ── HEXAGON GRID ── */}
          <div className="flex flex-col gap-6 md:gap-0">
            {/* Row 1 (3 Hexagons) */}
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-4 relative z-10">
               <Hexagon image={resImg} title={<>Luxury Interior<br/>Design</>} delay={0.1} />
               <Hexagon image={extImg} title={<>Modern Exterior<br/>Design</>} delay={0.2} />
               <Hexagon image={bpImg} title={<>End-to-End<br/>Project Management</>} delay={0.3} />
            </div>
            
            {/* Row 2 (2 Hexagons, visually shifted towards center for perfect honeycomb symmetry) */}
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-4 mt-6 md:-mt-10 relative z-0">
               <div className="w-full max-w-[280px] md:max-w-[320px] md:translate-x-20 mx-auto">
                 <Hexagon image={ceilImg} title={<>Premium<br/>Craftsmanship</>} delay={0.4} />
               </div>
               <div className="w-full max-w-[280px] md:max-w-[320px] md:-translate-x-20 mx-auto">
                 <Hexagon image={revImg} title={<>On-Time<br/>Project Delivery</>} delay={0.5} />
               </div>
            </div>
          </div>

        </div>

        {/* ── DETAILED CONTENT AREA ── */}
        <div className="max-w-5xl mx-auto px-6 mt-32 md:mt-48 space-y-24 relative z-10">
          {details.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`flex-1 space-y-4 text-center ${i % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`flex items-center justify-center gap-4 mb-2 ${i % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <span className="text-orange-500 font-display font-bold text-lg tracking-widest">{item.id}</span>
                  <div className="w-12 h-px bg-orange-500/50" />
                </div>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-gray-900">{item.title}</h3>
                <p className="font-serif text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-200 shadow-xl bg-white flex items-center justify-center text-orange-500 shrink-0 relative group">
                <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-110 group-hover:scale-100 transition-transform duration-500" />
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
