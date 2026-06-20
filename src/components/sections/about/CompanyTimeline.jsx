import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Images
import img2016 from '../../../assets/images/about/story_planning.png'
import img2018 from '../../../assets/images/residential.png'
import img2020 from '../../../assets/images/exterior-acp.png'
import img2022 from '../../../assets/images/commercial.png'
import img2025 from '../../../assets/images/about/completed_hero.png'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '2016',
    title: 'The Foundation',
    desc: 'A small studio, a desk full of blueprints, and a massive vision to redefine architectural luxury.',
    img: img2016
  },
  {
    year: '2018',
    title: 'Residential Mastery',
    desc: 'Completed our first 50 luxury residential projects, establishing our signature blend of warmth and modern minimalism.',
    img: img2018
  },
  {
    year: '2020',
    title: 'Exterior Dominance',
    desc: 'Expanded into exterior facades, mastering ACP cladding and structural glazing for towering commercial spaces.',
    img: img2020
  },
  {
    year: '2022',
    title: 'Award-Winning Spaces',
    desc: 'Recognized regionally for crafting corporate headquarters that inspire productivity through light and space.',
    img: img2022
  },
  {
    year: '2025',
    title: 'The IIES Legacy',
    desc: 'Today, we stand as the premier interior and exterior solutions studio, transforming skylines and living spaces.',
    img: img2025
  }
]

export default function CompanyTimeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      // Calculate total width to scroll based on the number of panels minus one viewport width
      const scrollWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })
      
      // Parallax effect on the images inside the track
      const images = gsap.utils.toArray('.timeline-img')
      images.forEach((img) => {
        gsap.fromTo(img, 
          { x: -100 }, 
          { 
            x: 100, 
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: gsap.getById('timeline-scroll'), // We need an ID for containerAnimation
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen bg-[#050505] overflow-hidden"
    >
      {/* ── Fixed overlay UI ── */}
      <div className="absolute top-10 left-10 md:left-20 z-50 pointer-events-none">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white/80 border border-white/20 backdrop-blur-md">
          A Documentary Timeline
        </span>
      </div>

      {/* ── Horizontal Track ── */}
      <div 
        ref={trackRef} 
        className="flex h-full w-max"
        id="timeline-scroll"
      >
        {MILESTONES.map((milestone, i) => (
          <div 
            key={i}
            className="w-screen h-full flex-shrink-0 relative flex items-center justify-center p-6 md:p-20"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 overflow-hidden opacity-40">
              <img 
                src={milestone.img} 
                alt={milestone.title} 
                className="timeline-img w-full h-[120%] object-cover object-center -top-[10%] relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              
              {/* Year (Left) */}
              <div className="w-full md:w-1/3 text-center md:text-left">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ margin: '-200px' }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600 leading-none select-none drop-shadow-[0_0_30px_rgba(247,135,1,0.4)]"
                  style={{ fontSize: 'clamp(4.5rem, 11vw, 9rem)' }}
                >
                  {milestone.year}
                </motion.div>
                <div className="h-px w-full bg-gradient-to-r from-orange-500 to-transparent mt-4" />
              </div>

              {/* Text / Image Split (Right) */}
              <div className="w-full md:w-2/3 flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
                
                {/* Secondary Image floating card */}
                <motion.div 
                  initial={{ opacity: 0, y: 50, rotateY: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ margin: '-200px' }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-full lg:w-72 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shrink-0 hidden md:block"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  <img src={milestone.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border border-white/20 rounded-2xl" />
                </motion.div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar Fixed at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
          style={{ width: '0%' }}
          // GSAP updates this width inside a scroll trigger if needed, 
          // or we can use Framer Motion useScroll
        />
      </div>

    </section>
  )
}
