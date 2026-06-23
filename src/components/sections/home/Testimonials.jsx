import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

import blueprintImg from '../../../assets/images/blueprint-dark.png'

const TESTIMONIALS = [
  { name: "Ahmed Khan", location: "Dubai", type: "Luxury Villa", review: "Exceptional craftsmanship and attention to detail. They transformed our dream home into reality.", rating: 5, avatar: "https://i.pravatar.cc/150?u=ahmed" },
  { name: "Sarah Williams", location: "London", type: "Commercial Office", review: "The workspace they designed has completely transformed our team's productivity and morale.", rating: 5, avatar: "https://i.pravatar.cc/150?u=sarah" },
  { name: "Mohammed Habtoor", location: "Abu Dhabi", type: "Exterior Facade", review: "Their exterior cladding work gave our building a highly premium and distinctive modern look.", rating: 5, avatar: "https://i.pravatar.cc/150?u=mohammed" },
  { name: "Elena Rostova", location: "Moscow", type: "Glass Partitions", review: "Flawless execution. The structural glass completely opened up our living space with elegance.", rating: 5, avatar: "https://i.pravatar.cc/150?u=elena" },
  { name: "James Chen", location: "Singapore", type: "Luxury Flooring", review: "The flooring selection and installation process was seamless. Truly a luxurious finish.", rating: 5, avatar: "https://i.pravatar.cc/150?u=james" },
  { name: "Fatima Maktoum", location: "Dubai", type: "Ceiling Design", review: "The custom false ceilings added an unparalleled level of sophistication to our villa's lighting.", rating: 5, avatar: "https://i.pravatar.cc/150?u=fatima" },
  { name: "Michael Sterling", location: "New York", type: "Architectural Remodel", review: "They managed to blend modern aesthetics with functional architecture perfectly. Outstanding.", rating: 5, avatar: "https://i.pravatar.cc/150?u=michael" },
  { name: "Aisha Rahman", location: "Doha", type: "Window Systems", review: "The energy efficiency and noise reduction from their UPVC systems is simply incredible.", rating: 5, avatar: "https://i.pravatar.cc/150?u=aisha" },
  { name: "David Dubois", location: "Paris", type: "Wall Finishes", review: "The premium wallpaper and texturing work brought a warm, luxurious feel to our boutique.", rating: 5, avatar: "https://i.pravatar.cc/150?u=david" },
  { name: "Omar Saeed", location: "Riyadh", type: "Corporate HQ", review: "Professional, punctual, and exceptionally talented. The corporate HQ design speaks for itself.", rating: 5, avatar: "https://i.pravatar.cc/150?u=omar" },
  { name: "Priya Sharma", location: "Mumbai", type: "Residential", review: "A masterpiece of design. Every room flows beautifully into the next with high-end finishes.", rating: 5, avatar: "https://i.pravatar.cc/150?u=priya" },
  { name: "Thomas Wright", location: "Chicago", type: "Showroom", review: "Our showroom has never looked better. The aesthetic directly elevated our brand perception.", rating: 5, avatar: "https://i.pravatar.cc/150?u=thomas" },
  { name: "Hassan Ali", location: "Jeddah", type: "Luxury Facade", review: "The exterior transformation was breathtaking. It is now a landmark building in the area.", rating: 5, avatar: "https://i.pravatar.cc/150?u=hassan" },
  { name: "Isabella Martinez", location: "Madrid", type: "Boutique Hotel", review: "They truly understand luxury hospitality. Every detail contributes to an amazing guest experience.", rating: 5, avatar: "https://i.pravatar.cc/150?u=isabella" },
  { name: "Chen Wei", location: "Shanghai", type: "Executive Office", review: "An incredibly sleek and modern design that reflects our company's forward-thinking vision.", rating: 5, avatar: "https://i.pravatar.cc/150?u=wei" }
];

// Double the items so the columns have plenty of scrolling content
const SCROLL_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  const containerRef = useRef(null);

  // Bind scroll progress for the parallax scrubbing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── 3D ENTRANCE ANIMATION ──
  // Active during the first 15% of the section scroll to create the "fade in and scale up" effect
  const rotateX = useTransform(scrollYProgress, [0, 0.15], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 0.15], [10, 0]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  // ── COLUMN PARALLAX ENGINE ──
  // Scrubbing through the remaining scroll height
  const yUp = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-1200, 0]);

  // Split arrays for the Desktop 3-Column Layout
  const desktopCol1 = SCROLL_ITEMS.filter((_, i) => i % 3 === 0);
  const desktopCol2 = SCROLL_ITEMS.filter((_, i) => i % 3 === 1);
  const desktopCol3 = SCROLL_ITEMS.filter((_, i) => i % 3 === 2);

  // Split arrays for the Tablet 2-Column Layout
  const tabletCol1 = SCROLL_ITEMS.filter((_, i) => i % 2 === 0);
  const tabletCol2 = SCROLL_ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] bg-[#0a0a0a]" 
      aria-label="Client Testimonials"
    >
      
      {/* ── STICKY PINNED VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10 pt-20 pb-10">
        
        {/* Subtle Architectural Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <img src={blueprintImg} loading="lazy" alt="Blueprint" className="w-full h-full object-cover mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]" />
        </div>

        {/* ── SECTION INTRODUCTION ── */}
        <div className="relative w-full max-w-7xl mx-auto px-6 z-20 mb-8 shrink-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              Client Testimonials
            </span>
            <h3 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Clients Say</span>
            </h3>
            <p className="text-gray-400 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Crafting beautiful spaces is only half our story. The other half is the trust and satisfaction of every client we serve.
            </p>
          </motion.div>
        </div>

        {/* ── 3D ANIMATED GALLERY ── */}
        <motion.div 
          style={{ rotateX, scale, opacity, filter, transformPerspective: 1200 }}
          className="relative w-full max-w-7xl mx-auto flex-1 overflow-hidden z-20 px-6"
        >
          {/* Edge gradients removed to ensure zero overlay on cards */}

          {/* 📱 MOBILE: 1 Column (Scrolls Up) */}
          <div className="flex md:hidden flex-col items-center w-full h-full">
            <motion.div style={{ y: yUp }} className="flex flex-col gap-6 w-full max-w-md pt-10">
              {SCROLL_ITEMS.slice(0, 10).map((item, i) => (
                <TestimonialCard key={`mob-${i}`} item={item} />
              ))}
            </motion.div>
          </div>

          {/* 💻 TABLET: 2 Columns (Left Up, Right Down) */}
          <div className="hidden md:flex lg:hidden flex-row justify-center gap-6 w-full h-full">
            <motion.div style={{ y: yUp }} className="flex flex-col gap-6 w-1/2 pt-10">
              {tabletCol1.map((item, i) => <TestimonialCard key={`tab1-${i}`} item={item} />)}
            </motion.div>
            <motion.div style={{ y: yDown }} className="flex flex-col gap-6 w-1/2">
              {tabletCol2.map((item, i) => <TestimonialCard key={`tab2-${i}`} item={item} />)}
            </motion.div>
          </div>

          {/* 🖥️ DESKTOP: 3 Columns (Left Up, Center Down, Right Up) */}
          <div className="hidden lg:flex flex-row justify-center gap-8 w-full h-full">
            <motion.div style={{ y: yUp }} className="flex flex-col gap-8 w-1/3 pt-10">
              {desktopCol1.map((item, i) => <TestimonialCard key={`desk1-${i}`} item={item} />)}
            </motion.div>
            
            <motion.div style={{ y: yDown }} className="flex flex-col gap-8 w-1/3">
              {desktopCol2.map((item, i) => <TestimonialCard key={`desk2-${i}`} item={item} />)}
            </motion.div>
            
            <motion.div style={{ y: yUp }} className="flex flex-col gap-8 w-1/3 pt-24">
              {desktopCol3.map((item, i) => <TestimonialCard key={`desk3-${i}`} item={item} />)}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}

function TestimonialCard({ item }) {
  return (
    <div className="relative w-full rounded-[2rem] p-6 md:p-8 border border-white/10 bg-[#141414]/40 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-xl hover:bg-[#141414]/60 hover:border-white/20 flex flex-col gap-5 md:gap-6 group">
      
      {/* Header: Avatar & Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
          <span className="text-white font-display font-bold text-lg md:text-xl uppercase">
            {item.name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm md:text-base">
            {item.name}
          </h4>
          <p className="text-gray-400 text-[10px] md:text-xs tracking-wide uppercase mt-0.5">
            {item.location}
          </p>
        </div>
      </div>

      {/* Review Body */}
      <p className="text-gray-300 italic font-serif text-sm md:text-base leading-relaxed">
        "{item.review}"
      </p>

      {/* Footer: Project Type & Rating */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
        <p className="text-orange-500/90 text-[10px] md:text-xs tracking-wider uppercase font-semibold">
          {item.type}
        </p>
        <div className="flex gap-1">
          {[...Array(item.rating)].map((_, i) => (
            <span key={i} className="text-orange-500 text-[10px] md:text-xs">★</span>
          ))}
        </div>
      </div>

    </div>
  )
}
