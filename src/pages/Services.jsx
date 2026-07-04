// =================================================
// SERVICES PAGE — COMPLETE & CLIENT-APPROVED
// =================================================
// File: src/pages/Services.jsx
// Purpose: Comprehensive services showcase with all IIES
//          interior & exterior services organized into 4 major
//          professional categories:
//          1. Residential Interiors
//          2. Commercial Interiors
//          3. False Ceiling Solutions
//          4. Flooring Solutions
//          Plus Consultation CTA.
// =================================================

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/ui/SectionHeading'
import { CONTACT_INFO } from '../lib/constants'

// Import images for service representation
import flooringImg      from '../assets/images/flooring.webp'
import wallpaperImg     from '../assets/images/wallpaper.webp'
import glassImg         from '../assets/images/glass-partition.webp'
import upvcImg          from '../assets/images/upvc-windows.webp'
import falseCeilingImg  from '../assets/images/false-ceiling.webp'
import exteriorAcpImg   from '../assets/images/exterior-acp.webp'
import residentialImg   from '../assets/images/residential.webp'
import commercialImg    from '../assets/images/commercial.webp'
import luxuryRevealImg  from '../assets/images/luxury-reveal.webp'
import modernVillaImg   from '../assets/images/modern-villa-exterior.webp'
import premiumHeroImg   from '../assets/images/premium-hero-interior.webp'
import aboutTeamImg     from '../assets/images/about-team.webp'

gsap.registerPlugin(ScrollTrigger)

// ──────────────────────────────
// SERVICE CATEGORIES DATA
// ──────────────────────────────

const RESIDENTIAL_SERVICES_DATA = [
  {
    id: 'res-kitchen',
    title: 'Modular Kitchen',
    subtitle: 'Ergonomic Culinary Excellence',
    description: 'Bespoke modular kitchen layouts designed for effortless workflow, optimized storage, and enduring elegance. Constructed with premium moisture-resistant cabinetry, soft-closing hardware, and luxury stone finishes.',
    features: ['Ergonomic Workflow Layouts', 'Moisture-Resistant Cabinetry', 'Soft-Close German Hardware', 'Custom Countertop Integration'],
    image: luxuryRevealImg,
  },
  {
    id: 'res-wardrobes',
    title: 'Wardrobes',
    subtitle: 'Intelligent Storage & Style',
    description: 'Custom-designed floor-to-ceiling wardrobes that seamlessly integrate into your bedroom architecture. Featuring smart organizational systems, integrated sensor lighting, and sliding or hinged designer shutters.',
    features: ['Floor-to-Ceiling Fit', 'Integrated Sensor Lighting', 'Custom Organizer Sections', 'Designer Glass & Laminate Shutters'],
    image: residentialImg,
  },
  {
    id: 'res-tv-units',
    title: 'TV Units',
    subtitle: 'The Focal Point of Entertainment',
    description: 'Statement entertainment wall units that blend acoustic functionality with sophisticated design. Expertly crafted with concealed wire management, floating consoles, and back-lit accent panels.',
    features: ['Concealed Cable Management', 'Floating Console Architecture', 'Ambient Backlighting', 'Acoustic Wall Paneling'],
    image: premiumHeroImg,
  },
  {
    id: 'res-pooja',
    title: 'Pooja Units',
    subtitle: 'Sacred Spaces of Serenity',
    description: 'Devotional spaces crafted with reverence and intricate detailing. Incorporating traditional bells, CNC-cut jali partitions, warm backlighting, and premium marble or teakwood finishes.',
    features: ['Intricate CNC Jali Partitions', 'Warm Ambient Backlighting', 'Premium Marble & Teakwood', 'Custom Spatial Sizing'],
    image: wallpaperImg,
  },
  {
    id: 'res-dividers',
    title: 'Divider Partitions',
    subtitle: 'Sculptural Spatial Separation',
    description: 'Elegant room dividers and display showcases that define open-plan living areas without obstructing natural light. Featuring geometric metalwork, fluted glass, and custom display shelving.',
    features: ['Open-Plan Zoning', 'Fluted & Beveled Glass', 'Custom Display Shelving', 'Geometric Metal Framework'],
    image: glassImg,
  },
  {
    id: 'res-shower-cubicles',
    title: 'Shower Cubicles',
    subtitle: 'Modern Bathroom Elegance',
    description: 'Custom glass shower cubicles and bathroom partitions designed for luxury, cleanliness, and spatial optimization. Featuring toughened safety glass, corrosion-resistant hardware, and seamless frameless configurations.',
    features: ['Toughened Safety Glass', 'Frameless & Semi-Frameless Options', 'Corrosion-Resistant Hardware', 'Custom Spatial Sizing'],
    image: glassImg,
  },
  {
    id: 'res-ceiling-painting',
    title: 'False Ceiling & Interior Painting',
    subtitle: 'Architectural Atmosphere',
    description: 'Comprehensive overhead styling combined with flawless interior painting. From designer gypsum coves with mood lighting to luxury wall textures and low-VOC premium paint applications.',
    features: ['Designer Gypsum Cove Lighting', 'Luxury Wall Textures', 'Low-VOC Premium Finishes', 'Flawless Surface Preparation'],
    image: falseCeilingImg,
  },
]

const COMMERCIAL_SERVICES_DATA = [
  {
    id: 'com-workstations',
    title: 'Workstations',
    subtitle: 'Collaborative Productivity Hubs',
    description: 'Ergonomically engineered office workstations designed to foster team collaboration while maintaining individual focus. Equipped with modular privacy screens, integrated raceways for clean cabling, and robust build quality.',
    features: ['Ergonomic Modular Design', 'Integrated Cabling Raceways', 'Acoustic Privacy Screens', 'Flexible Scalability'],
    image: commercialImg,
  },
  {
    id: 'com-executive',
    title: 'Executive Cabins',
    subtitle: 'Leadership in Design',
    description: 'Prestigious private office suites tailored for leadership and executive decision-making. Incorporating custom executive desks, premium wall paneling, sophisticated acoustic treatments, and integrated finishing solutions.',
    features: ['Bespoke Executive Desks', 'Acoustic Wall Treatments', 'Integrated Storage Consoles', 'Premium Leather & Wood Finishes'],
    image: aboutTeamImg,
  },
  {
    id: 'com-conference',
    title: 'Conference Rooms',
    subtitle: 'Immersive Meeting Environments',
    description: 'State-of-the-art boardrooms and meeting spaces built for impactful presentations and seamless video conferencing. Featuring acoustic wall paneling, custom boardroom tables, and optimized lighting.',
    features: ['Acoustic Echo Reduction', 'AV & Video Conferencing Integration', 'Custom Boardroom Tables', 'Smart Lighting Controls'],
    image: glassImg,
  },
  {
    id: 'com-reception',
    title: 'Reception Zone',
    subtitle: 'Commanding First Impressions',
    description: 'Striking entrance lobbies and reception lounges that embody your corporate brand identity from the first step inside. Built with statement reception desks, brand signage walls, and luxury waiting area seating.',
    features: ['Statement Reception Desks', 'Custom Brand Signage Walls', 'Luxury Visitor Lounge Seating', 'Architectural Lighting Accent'],
    image: modernVillaImg,
  },
  {
    id: 'com-partitions',
    title: 'Cabin Partitions',
    subtitle: 'Transparent & Acoustic Zoning',
    description: 'Advanced office partitioning systems offering the perfect balance of visual transparency and speech privacy. Available in double-glazed acoustic glass, slim-line aluminum frames, and frosted branding films.',
    features: ['Double-Glazed Acoustic Glass', 'Slim-Line Aluminum Profiling', 'Custom Frosted Branding Films', 'Seamless Door Integration'],
    image: upvcImg,
  },
  {
    id: 'com-flooring',
    title: 'Commercial Flooring',
    subtitle: 'Heavy-Duty Elegance',
    description: 'High-performance commercial flooring engineered to withstand heavy daily foot traffic while elevating office aesthetics. We install carpet tiles, heavy-duty SPC planks, and raised access flooring systems.',
    features: ['Heavy-Duty Wear Resistance', 'Acoustic Carpet Tile Systems', 'Raised Access Floor Options', 'Seamless Maintenance'],
    image: flooringImg,
  },
  {
    id: 'com-windows',
    title: 'Windows',
    subtitle: 'Architectural UPVC & Aluminum Windows',
    description: 'Modern UPVC windows provide durability, security, weather resistance, thermal insulation, and low maintenance. They improve energy efficiency while offering a stylish and long-lasting solution for residential and commercial spaces.',
    features: ['UPVC & Structural Aluminum', 'Superior Thermal Insulation', 'Acoustic Noise Dampening', 'Weatherproof Precision Sealing'],
    image: upvcImg,
  },
  {
    id: 'com-wallpapers',
    title: 'Wallpapers',
    subtitle: 'Custom Brand & Designer Wall coverings',
    description: 'Wallpaper enhances interior spaces with a wide range of colours, textures, and patterns. It creates stylish feature walls, complements different design themes, and is suitable for both residential and commercial interiors.',
    features: ['Commercial-Grade Vinyl', 'Custom Brand Graphic Murals', 'Textured Architectural Finishes', 'Seamless Professional Installation'],
    image: wallpaperImg,
  },
  {
    id: 'com-painting',
    title: 'Painting',
    subtitle: 'Precision Commercial Surface Coating',
    description: 'Painting transforms interiors by adding colour, depth, and personality to every space. Professional painting enhances ambience, protects surfaces, and gives homes and commercial interiors a refined, elegant finish.',
    features: ['Low-VOC High-Durability Coatings', 'Flawless Surface Preparation', 'Custom Brand Color Matching', 'Protective Commercial Finishes'],
    image: exteriorAcpImg,
  },
]

const FALSE_CEILING_DATA = [
  {
    id: 'ceil-gypsum',
    title: 'Gypsum False Ceiling',
    subtitle: 'Seamless Architectural Contours',
    description: 'Versatile monolithic ceiling boards that allow for unlimited design creativity. Ideal for creating multi-level drop ceilings, curved architectural contours, and concealed perimeter cove lighting.',
    features: ['Monolithic Seamless Finish', 'Multi-Level Design Capable', 'Integrated Cove Lighting', 'Fire & Moisture Resistant'],
    image: falseCeilingImg,
  },
  {
    id: 'ceil-metal',
    title: 'Metal Ceiling',
    subtitle: 'Modern Industrial Durability',
    description: 'Contemporary aluminum and galvanized steel ceiling panels offering exceptional durability and a clean technical aesthetic. Highly resistant to humidity and effortless to dismount for utility access.',
    features: ['Aluminum & Galvanized Steel', 'Corrosion & Humidity Resistant', 'Easy Utility Access', 'Long-Lifespan Durability'],
    image: exteriorAcpImg,
  },
  {
    id: 'ceil-grid',
    title: 'Grid Ceiling',
    subtitle: 'Modular Functional Efficiency',
    description: 'Exposed T-grid ceiling systems paired with mineral fiber or metal tiles. The industry standard for corporate offices and commercial facilities requiring quick maintenance access to overhead HVAC and electrical piping.',
    features: ['Exposed Modular T-Grid', 'Instant Overhead Maintenance Access', 'High Light Reflectance', 'Cost-Effective Commercial Solution'],
    image: commercialImg,
  },
  {
    id: 'ceil-baffle',
    title: 'Baffle Ceiling',
    subtitle: 'Vertical Linear Dynamics',
    description: 'Vertically suspended linear baffle panels that add striking visual depth and directional rhythm to large commercial spaces. Excellent for masking overhead utilities while maintaining open airflow.',
    features: ['Striking Vertical Depth', 'Open Airflow Architecture', 'Overhead Utility Masking', 'Custom Spacing & Depths'],
    image: falseCeilingImg,
  },
  {
    id: 'ceil-linear',
    title: 'Linear Ceiling',
    subtitle: 'Streamlined Continuous Flow',
    description: 'Parallel metal or wood-look linear strip ceilings that guide sightlines and elongate room perception. Perfect for corridors, airport terminals, corporate lobbies, and contemporary exterior overhangs.',
    features: ['Continuous Visual Elongation', 'Metal & Wood-Grain Finishes', 'Integrated Linear LED Tracks', 'Interior & Exterior Application'],
    image: upvcImg,
  },
  {
    id: 'ceil-acoustic',
    title: 'Acoustic Ceiling',
    subtitle: 'Sound Absorption & Clarity',
    description: 'Specialized acoustic ceiling panels and perforated boards engineered to absorb ambient noise and eliminate reverberation. Essential for auditoriums, boardrooms, open offices, and home theaters.',
    features: ['Superior Noise Reduction Coeff (NRC)', 'Perforated Acoustic Panels', 'Eliminates Echo & Reverberation', 'Aesthetic & Functional Harmony'],
    image: wallpaperImg,
  },
]

const FLOORING_DATA = [
  {
    id: 'floor-wooden',
    title: 'Wooden Flooring',
    subtitle: 'Timeless Warmth & Natural Luxury',
    description: 'Authentic engineered hardwood and premium laminate wooden planks that infuse interiors with natural organic warmth. Treated with multi-layer UV protection for scratch resistance and lasting richness.',
    features: ['Engineered Hardwood & Laminate', 'Multi-Layer UV Protection', 'Rich Organic Grain Textures', 'Warm Underfoot Comfort'],
    image: flooringImg,
  },
  {
    id: 'floor-spc',
    title: 'SPC Flooring',
    subtitle: '100% Waterproof Rigid Core',
    description: 'Stone Plastic Composite (SPC) flooring combines the beauty of natural wood and stone with extreme waterproof durability. Its rigid core prevents indentation and withstands heavy residential or commercial wear.',
    features: ['100% Waterproof Core', 'Extreme Indentation Resistance', 'Realistic Wood & Stone Textures', 'Rapid Click-Lock Installation'],
    image: luxuryRevealImg,
  },
  {
    id: 'floor-vinyl',
    title: 'Vinyl Flooring',
    subtitle: 'Versatile, Silent & Resilient',
    description: 'Luxury Vinyl Tiles (LVT) and continuous sheet vinyl offering exceptional cushioning, underfoot comfort, and sound dampening. Ideal for healthcare, retail, educational, and modern residential spaces.',
    features: ['Soft & Silent Underfoot', 'High Stain & Scratch Resistance', 'Versatile Pattern Configurations', 'Easy Hygienic Maintenance'],
    image: residentialImg,
  },
  {
    id: 'floor-corporate',
    title: 'Corporate Flooring',
    subtitle: 'Engineered for High-Performance Business',
    description: 'Specialized commercial flooring solutions including heavy-duty carpet tiles, anti-static epoxy coatings, and raised access floors designed for demanding corporate offices and data centers.',
    features: ['Modular Carpet Tile Systems', 'Anti-Static & ESD Coatings', 'Raised Access Floor Compatibility', 'Engineered for Heavy Traffic'],
    image: commercialImg,
  },
]

// ──────────────────────────────
// 1. SERVICES HERO
// ──────────────────────────────
function ServicesHero() {
  const containerRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    let ctx;
    const video = videoRef.current;

    const initAnimation = () => {
      if (!video || isNaN(video.duration)) return;

      ctx = gsap.context(() => {
        // Pin the hero section on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%', // Extended scroll for smooth video scrubbing
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        // Fade out text elegantly early in the scroll (first ~15%)
        tl.to(textRef.current, { y: -20, opacity: 0, ease: 'power2.out', duration: 0.15 }, 0)
        
        // Slight scale effect on video container to keep cinematic feel
        tl.to(videoContainerRef.current, { scale: 1.05, ease: 'none', duration: 1 }, 0)

        // Scrub video playback mapping scroll to currentTime
        tl.to(video, { currentTime: video.duration, ease: 'none', duration: 1 }, 0)

      }, containerRef)
    }

    if (video) {
      if (video.readyState >= 1) {
        initAnimation()
      } else {
        video.addEventListener('loadedmetadata', initAnimation)
      }
    }

    return () => {
      if (ctx) ctx.revert()
      if (video) video.removeEventListener('loadedmetadata', initAnimation)
    }
  }, [])

  // Split text animation for initial load
  const headingText = "Complete Interior & Exterior."

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 z-0"
      >
        <video 
          ref={videoRef}
          src="/videos/unfurniture to furniture.mp4"
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div 
        ref={textRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-orange-400 border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
            Interior & Exterior Services
          </span>
        </motion.div>

        <h1 
          className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 overflow-hidden flex flex-wrap justify-center gap-x-3 md:gap-x-4 px-2 max-w-[90vw] mx-auto"
          style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
        >
          {headingText.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex overflow-hidden">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.8 + (wordIndex * 0.1) + (charIndex * 0.02)
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white text-lg md:text-xl font-serif italic font-medium max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] px-6 py-2"
        >
          Delivering complete residential, commercial, ceiling, flooring, and premium architectural solutions. We transform homes, offices, and landmark projects with bespoke craftsmanship and enduring elegance.
        </motion.p>
      </div>
    </section>
  )
}

// ──────────────────────────────
// SERVICE DETAIL CARD (Alternating)
// ──────────────────────────────
function ServiceDetailCard({ service, index, isDark = false }) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      id={service.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0"
      aria-label={`Service: ${service.title}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden rounded-2xl ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ height: '440px' }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        {/* Number badge */}
        <div
          className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-orange)' }}
        >
          {service.subtitle}
        </p>
        <h2
          className={`font-display font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          {service.title}
        </h2>
        <div
          className="w-12 h-0.5 rounded-full mb-5"
          style={{ background: 'var(--color-orange)' }}
          aria-hidden="true"
        />
        <p className={`leading-relaxed mb-7 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{service.description}</p>

        {/* Features */}
        <ul className="grid grid-cols-2 gap-3" aria-label={`Features of ${service.title}`}>
          {service.features.map((feature, fi) => (
            <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                style={{ background: 'var(--color-orange)' }}
                aria-hidden="true"
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

// ──────────────────────────────
// 2. RESIDENTIAL INTERIORS SECTION
// ──────────────────────────────
function ResidentialInteriorsSection() {
  return (
    <section id="residential" className="section-pad bg-white" aria-label="Residential Interiors">
      <div id="services-section" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 01"
          title="Residential"
          titleAccent="Interiors"
          subtitle="Residential interior design combines functionality and aesthetics to create comfortable and elegant living spaces. Every home is designed to reflect the lifestyle, personality, and preferences of its owner while ensuring comfort, beauty, and practical everyday living."
          centered
        />
        {RESIDENTIAL_SERVICES_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 3. COMMERCIAL INTERIORS SECTION
// ──────────────────────────────
function CommercialInteriorsSection() {
  return (
    <section
      id="commercial"
      className="section-pad"
      style={{ background: '#111111' }}
      aria-label="Commercial Interiors"
    >
      <div id="commercial-interiors" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 02"
          title="Commercial"
          titleAccent="Interiors"
          subtitle="Commercial interior design creates productive and inspiring workplaces that enhance employee efficiency and leave a lasting impression on clients. Well-designed commercial spaces improve brand identity, functionality, and user experience."
          centered
          light={true}
        />
        {COMMERCIAL_SERVICES_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} isDark={true} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 4. FALSE CEILING SOLUTIONS SECTION
// ──────────────────────────────
function FalseCeilingSection() {
  return (
    <section id="false-ceiling" className="section-pad bg-white" aria-label="False Ceiling Solutions">
      <div id="false-ceiling-solutions" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 03"
          title="False Ceiling"
          titleAccent="Solutions"
          subtitle="False ceilings conceal electrical wiring, plumbing, ducts, and utilities while improving the overall appearance of interiors. They add elegance, enhance lighting, improve acoustics, and create a clean architectural finish."
          centered
        />
        {FALSE_CEILING_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 5. FLOORING SOLUTIONS SECTION
// ──────────────────────────────
function FlooringSolutionsSection() {
  return (
    <section
      id="flooring"
      className="section-pad"
      style={{ background: '#111111' }}
      aria-label="Flooring Solutions"
    >
      <div id="flooring-solutions" className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Service Category 04"
          title="Flooring"
          titleAccent="Solutions"
          subtitle="Quality flooring provides a durable, comfortable, and visually appealing surface for every space. It enhances aesthetics, improves functionality, and increases the long-term value of residential and commercial interiors."
          centered
          light={true}
        />
        {FLOORING_DATA.map((service, i) => (
          <ServiceDetailCard key={service.id} service={service} index={i} isDark={true} />
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────
// 6. CONSULTATION CTA
// ──────────────────────────────
function ConsultationCTA() {
  return (
    <section
      id="consultation-cta"
      className="section-pad"
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2020 100%)',
      }}
      aria-label="Book a Consultation"
    >
      <div
        className="px-6 md:px-12 lg:px-20"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-2xl">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-orange-light)' }}
            >
              Ready to Begin?
            </p>
            <h2
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Let's Build Something{' '}
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Extraordinary
              </em>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Book a free consultation with our expert designers. Tell us about your project and we'll craft a bespoke design proposal — tailored specifically to your vision and budget.
            </p>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 sm:gap-4 shrink-0 w-full sm:w-auto max-w-[340px] sm:max-w-none mx-auto lg:mx-0 mt-8 sm:mt-0">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="flex-1 sm:flex-none">
              <Link
                to="/contact"
                id="services-consultation-cta"
                className="inline-flex w-full items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-semibold text-[10px] sm:text-sm whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                  boxShadow: '0 8px 32px rgba(247,135,1,0.4)',
                }}
              >
                <span className="sm:hidden">Consultation</span>
                <span className="hidden sm:inline">Book Free Consultation</span>
                <svg className="hidden sm:block w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
            <a
              href={`tel:${CONTACT_INFO.phone1}`}
              id="services-call-cta"
              className="flex-1 sm:flex-none inline-flex w-full items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-[10px] sm:text-sm text-white border border-white/20 transition-all duration-300 hover:border-orange-400 whitespace-nowrap"
            >
              <span>📞</span>
              <span className="sm:hidden">Call Us</span>
              <span className="hidden sm:inline">Call {CONTACT_INFO.phone1}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// SERVICES PAGE ASSEMBLY
// ──────────────────────────────
export default function Services() {
  return (
    <main id="main-content">
      <ServicesHero />
      <ResidentialInteriorsSection />
      <CommercialInteriorsSection />
      <FalseCeilingSection />
      <FlooringSolutionsSection />
      <ConsultationCTA />
    </main>
  )
}
