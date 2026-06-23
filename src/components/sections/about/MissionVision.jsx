import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../../ui/SectionHeading'

import blueprintImg from '../../../assets/images/blueprint-dark.png'
import studioImg from '../../../assets/images/about/story_sketch.png'

export default function MissionVision() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Background Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  
  // Floating Illustrations Parallax
  const missionImageY = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const visionImageY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden bg-[#FAFAF8]"
    >
      {/* ── BACKGROUND ── */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ y: bgY }}
      >
        <img loading="lazy" src={blueprintImg} alt="Blueprint Grid" className="w-full h-[150%] object-cover invert" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-transparent to-[#FAFAF8]" />
      </motion.div>
      
      {/* Animated Light Particles & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="px-6 md:px-12 lg:px-20 mx-auto relative z-10" style={{ maxWidth: 'var(--container-max)' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading 
            badge="Core Purpose" 
            title="Mission &" 
            titleAccent="Vision" 
            centered 
          />
        </motion.div>

        <div className="relative mt-20 flex flex-col gap-24 lg:gap-32">
          
          {/* ── MISSION ROW ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left: Heading */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <h3 className="font-display text-[#1F1F1F] text-5xl lg:text-6xl tracking-wide font-light">
                Our <br className="hidden lg:block" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Mission</span>
              </h3>
            </motion.div>

            {/* Center: Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover="hover"
              className="lg:col-span-6 group relative rounded-3xl p-6 lg:p-8 bg-white/60 border border-gray-200/50 backdrop-blur-xl shadow-xl transition-all duration-700 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] hover:bg-white/80 hover:-translate-y-2 overflow-hidden"
            >
              {/* Corner Blueprint Marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />

              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200/50">
                <motion.img 
                  style={{ y: missionImageY }}
                  src={blueprintImg} 
                  alt="Mission Blueprint" 
                  className="w-full h-[120%] object-cover opacity-100 invert scale-100 transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div 
                  variants={{ hover: { width: '100%' } }}
                  className="absolute bottom-0 left-0 h-1 bg-orange-500 w-0 transition-all duration-700 z-20"
                />
              </div>

              {/* Glowing Accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/0 blur-3xl rounded-full transition-colors duration-700 group-hover:bg-orange-500/20 pointer-events-none -z-10" />
            </motion.div>

            {/* Right: Paragraph */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <p className="text-[#4A4A4A] font-serif text-lg lg:text-xl leading-relaxed">
                Designing timeless spaces that blend functionality, craftsmanship, and modern aesthetics while delivering exceptional experiences for every client.
              </p>
            </motion.div>

          </div>


          {/* ── VISION ROW ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left: Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <h3 className="font-display text-[#1F1F1F] text-5xl lg:text-6xl tracking-wide font-light">
                Our <br className="hidden lg:block" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Vision</span>
              </h3>
            </motion.div>

            {/* Center: Illustration */}
            <motion.div 
              initial={{ opacity: 0, rotate: 5, scale: 0.95 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover="hover"
              className="lg:col-span-6 group relative rounded-3xl p-6 lg:p-8 bg-white/60 border border-gray-200/50 backdrop-blur-xl shadow-xl transition-all duration-700 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] hover:bg-white/80 hover:-translate-y-2 overflow-hidden"
            >
              {/* Corner Blueprint Marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-black/10 transition-colors duration-500 group-hover:border-orange-500/50" />

              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200/50">
                <motion.img 
                  style={{ y: visionImageY }}
                  src={studioImg} 
                  alt="Vision Sketch" 
                  className="w-full h-[120%] object-cover invert scale-100 transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div 
                  variants={{ hover: { width: '100%' } }}
                  className="absolute bottom-0 right-0 h-1 bg-orange-500 w-0 transition-all duration-700 z-20"
                />
              </div>

              {/* Glowing Accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/0 blur-3xl rounded-full transition-colors duration-700 group-hover:bg-orange-500/20 pointer-events-none -z-10" />
            </motion.div>

            {/* Right: Paragraph */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <p className="text-[#4A4A4A] font-serif text-lg lg:text-xl leading-relaxed">
                To become a trusted leader in innovative interior and exterior design, creating iconic spaces that inspire generations.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
