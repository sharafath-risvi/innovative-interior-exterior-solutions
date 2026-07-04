import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

import blueprintImg from '../../../assets/images/blueprint-dark.webp'

const TESTIMONIALS = [
  { name: "Aakarsha Sha", location: "Chennai", type: "Boutique Interior", review: "The quality and work were excellent. Everything was completed within budget, and now our boutique looks beautiful and aesthetic.", rating: 5, avatar: "https://i.pravatar.cc/150?u=aakarsha" },
  { name: "Leo George", location: "OMR, Chennai", type: "Office Workspace", review: "Mr. Dhivahar transformed my office from a normal workspace into an excellent one. Outstanding creativity, professionalism, and attention to detail.", rating: 5, avatar: "https://i.pravatar.cc/150?u=leogeorge" },
  { name: "Hari Krishna", location: "Anna Nagar, Chennai", type: "Residential Interior", review: "Recommended IIES for a residential interior project. They executed everything perfectly within budget, and the final outcome was mind-blowing.", rating: 5, avatar: "https://i.pravatar.cc/150?u=harikrishna" },
  { name: "Arul Mozhi", location: "Velachery, Chennai", type: "Home Renovation", review: "Exceptional workmanship with outstanding attention to detail. The entire project exceeded my expectations.", rating: 5, avatar: "https://i.pravatar.cc/150?u=arulmozhi" },
  { name: "Rajasekar Selvaraj", location: "Coimbatore", type: "Modular Wardrobes", review: "Modern designs combined with functionality. Excellent wardrobes, premium finishes, and highly professional execution.", rating: 5, avatar: "https://i.pravatar.cc/150?u=rajasekar" },
  { name: "Rose Kumar", location: "Guindy, Chennai", type: "Commercial Office", review: "The team guided us from concept to completion. The final office space turned out even better than we imagined.", rating: 5, avatar: "https://i.pravatar.cc/150?u=rosekumar" },
  { name: "Srinivasulu (SSS Eng. Works)", location: "Ambattur, Chennai", type: "Industrial Finishing", review: "Latest technology finishing, on-time delivery, and 100% satisfaction.", rating: 5, avatar: "https://i.pravatar.cc/150?u=srinivasulu" },
  { name: "Venkat Ramani", location: "T. Nagar, Chennai", type: "Villa Interior", review: "Our dream home became reality thanks to the professional design and execution provided by IIES.", rating: 5, avatar: "https://i.pravatar.cc/150?u=venkatramani" },
  { name: "Dr. Sathish", location: "Adyar, Chennai", type: "Clinic & Interior", review: "Excellent and professional interior service with outstanding execution and customer support.", rating: 5, avatar: "https://i.pravatar.cc/150?u=drsathish" },
  { name: "Aishwarya Ganesh", location: "Maduravoyal, Chennai", type: "Residential Finishing", review: "Best quality work at an affordable price with neat finishing. Highly satisfied.", rating: 5, avatar: "https://i.pravatar.cc/150?u=aishwarya" },
  { name: "Moni Manju", location: "Bangalore", type: "Interior & Exterior", review: "Creative interior and exterior solutions tailored to customer needs. Truly impressed with the final output.", rating: 5, avatar: "https://i.pravatar.cc/150?u=monimanju" },
  { name: "Subramani Gunasekaran", location: "Porur, Chennai", type: "Turnkey Execution", review: "Professional execution completed within the promised timeline. Highly recommended.", rating: 5, avatar: "https://i.pravatar.cc/150?u=subramani" },
  { name: "MD Riyaz Raza", location: "Hyderabad", type: "Office & Interior", review: "Professional work from start to finish. Great quality and impressive execution.", rating: 5, avatar: "https://i.pravatar.cc/150?u=riyazraza" },
  { name: "Jeyasivam Jake", location: "Madurai", type: "Custom Interior", review: "Affordable, high-quality interior designs with flexible management that understands customer ideas.", rating: 5, avatar: "https://i.pravatar.cc/150?u=jeyasivam" },
  { name: "Arunkumar Sundar", location: "Tambaram, Chennai", type: "Exterior & Interior", review: "Excellent experience completing an exterior and interior project. Wishing the team continued success.", rating: 5, avatar: "https://i.pravatar.cc/150?u=arunkumar" }
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
  const yUp = useTransform(scrollYProgress, [0, 1], [0, -1500]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-1500, 0]);

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
      className="relative h-[450vh] bg-[#0a0a0a]" 
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
              {SCROLL_ITEMS.slice(0, 15).map((item, i) => (
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
      <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <p className="text-orange-500/90 text-[10px] md:text-xs tracking-wider uppercase font-semibold">
            {item.type}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(item.rating)].map((_, i) => (
                <span key={i} className="text-orange-500 text-[10px] md:text-xs">★</span>
              ))}
            </div>
            <span className="text-white font-bold text-[10px] md:text-xs">5.0</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 text-[9px] md:text-[10px] text-gray-400">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[8px]">✓</span>
          <span>Verified Google Review</span>
        </div>
      </div>

    </div>
  )
}
