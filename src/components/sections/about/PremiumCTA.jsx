import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ctaBg from '../../../assets/images/residential.webp'

// Generate random floating particles
const particles = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 5
}))

export default function PremiumCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAF8]">
      
      {/* Background Image with subtle zoom */}
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img loading="lazy" src={ctaBg} 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-white/80 to-white/30" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-orange-500/40 blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -200],
              x: [0, Math.sin(p.id) * 50],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 border border-black/10 bg-black/5 backdrop-blur-md text-orange-600">
            The Next Chapter
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="font-display font-bold text-[#1F1F1F] leading-tight mb-8 drop-shadow-sm"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          Begin Your <br/>
          <em className="not-italic text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600">
            Masterpiece
          </em>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="text-[#4A4A4A] text-lg md:text-xl font-light mb-12 max-w-2xl leading-relaxed"
        >
          You have seen our story. Now, let us craft yours. Step into a world of uncompromising luxury and visionary design.
        </motion.p>

        {/* Premium Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, type: "spring" }}
          className="relative group"
        >
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-orange-500/30 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <Link 
            to="/contact"
            onClick={() => {
              window.scrollTo(0, 0)
              if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
              setTimeout(() => {
                window.scrollTo(0, 0)
                if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
              }, 50)
            }}
            className="relative flex items-center gap-4 px-12 py-5 rounded-full overflow-hidden bg-white border border-gray-200 shadow-md backdrop-blur-xl transition-all duration-500 group-hover:bg-gray-50 group-hover:border-orange-400/50"
          >
            {/* Inner gradient sweeping effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-500/10 to-orange-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            
            <span className="relative z-10 text-gray-900 font-semibold text-sm tracking-wider uppercase">
              Schedule Consultation
            </span>
            
            <motion.div 
              className="relative z-10 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
