// =================================================
// CONSTANTS & SITE DATA
// =================================================
// File: src/lib/constants.js
// Purpose: Centralized data store for all site content.
//          Services, navigation, stats, values, process steps.
// =================================================
// Future Developer Notes:
// - Import service images directly and reference here
// - When adding new services, update INTERIOR_SERVICES or EXTERIOR_SERVICES
// - All content changes should happen in this file, not in components
// =================================================

import residentialImg  from '../assets/images/residential.webp'
import commercialImg   from '../assets/images/commercial.webp'
import falseCeilingImg from '../assets/images/false-ceiling.webp'
import exteriorAcpImg  from '../assets/images/exterior-acp.webp'
import flooringImg     from '../assets/images/flooring.webp'
import glassImg        from '../assets/images/glass-partition.webp'
import wallpaperImg    from '../assets/images/wallpaper.webp'
import upvcImg         from '../assets/images/upvc-windows.webp'
import heroBgImg       from '../assets/images/hero-bg.webp'
import aboutTeamImg    from '../assets/images/about-team.webp'

// ── Navigation Links ──────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact' },
]

// ── Hero Images ───────────────────────────────────
export { heroBgImg, aboutTeamImg }

// ── Interior Services ─────────────────────────────
export const INTERIOR_SERVICES = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    subtitle: 'Where Home Meets Luxury',
    description:
      'We craft personalized living spaces that reflect your lifestyle and personality. From concept to completion, every corner is thoughtfully designed — combining functionality with timeless elegance.',
    features: ['Space Planning', 'Furniture Selection', 'Lighting Design', 'Colour Consulting'],
    image: residentialImg,
    icon: '🏠',
    color: '#F78701',
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    subtitle: 'Inspiring Workspaces & Retail Environments',
    description:
      'Transform your office, retail outlet, or hospitality venue into a dynamic space that drives productivity, elevates brand identity, and impresses every visitor from day one.',
    features: ['Office Interiors', 'Retail Design', 'Hospitality Spaces', 'Brand Integration'],
    image: commercialImg,
    icon: '🏢',
    color: '#FC6B00',
  },
  {
    id: 'false-ceiling',
    title: 'False Ceiling',
    subtitle: 'Elevate Every Room Above',
    description:
      'From sleek minimalist gypsum boards to elaborate decorative plaster ceilings with embedded LED lighting, our false ceiling solutions add a dramatic dimension to any interior.',
    features: ['Gypsum Board', 'POP Ceilings', 'Designer Ceilings', 'LED Integration'],
    image: falseCeilingImg,
    icon: '✨',
    color: '#F78701',
  },
  {
    id: 'flooring',
    title: 'Flooring Solutions',
    subtitle: 'The Foundation of Luxury',
    description:
      'Premium flooring sets the foundation for every luxury interior. We offer marble, vitrified tiles, hardwood, vinyl plank, epoxy, and custom inlay designs — all expertly installed.',
    features: ['Marble & Granite', 'Vitrified Tiles', 'Hardwood', 'Epoxy Flooring'],
    image: flooringImg,
    icon: '🪨',
    color: '#FC6B00',
  },
  {
    id: 'glass-partitions',
    title: 'Glass Partitions',
    subtitle: 'Transparent Elegance',
    description:
      'Create open, airy interiors with our frameless and framed glass partition systems. Frosted, tinted, or clear — glass partitions offer privacy without sacrificing light or space.',
    features: ['Frameless Systems', 'Frosted Glass', 'Tinted Panels', 'Sliding Partitions'],
    image: glassImg,
    icon: '🪟',
    color: '#F78701',
  },
  {
    id: 'wallpaper',
    title: 'Wallpaper & Wall Art',
    subtitle: 'Walls That Tell Stories',
    description:
      'Premium European and Asian wallpaper collections in hundreds of textures, patterns, and finishes. From subtle linen textures to bold architectural murals — we bring walls to life.',
    features: ['European Collections', 'Textured Wallpaper', 'Murals', 'Acoustic Panels'],
    image: wallpaperImg,
    icon: '🎨',
    color: '#FC6B00',
  },
  {
    id: 'painting',
    title: 'Premium Painting',
    subtitle: 'Colour is Architecture',
    description:
      'Interior painting with precision — premium paints, smooth finishes, textured effects, and accent walls. Our painters work meticulously to deliver flawless results every time.',
    features: ['Interior Painting', 'Texture Finishes', 'Accent Walls', 'Epoxy Coatings'],
    image: residentialImg,
    icon: '🖌️',
    color: '#F78701',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    subtitle: 'Vision to Reality',
    description:
      'End-to-end interior design service — our expert designers translate your vision into detailed floor plans, mood boards, 3D visualizations, and complete project execution.',
    features: ['3D Visualization', 'Mood Boards', 'Space Planning', 'Project Management'],
    image: commercialImg,
    icon: '📐',
    color: '#FC6B00',
  },
]

// ── Exterior Services ─────────────────────────────
export const EXTERIOR_SERVICES = [
  {
    id: 'exterior-design',
    title: 'Exterior Design',
    subtitle: 'First Impressions Last Forever',
    description:
      'Comprehensive exterior design services covering façade planning, elevation design, and landscaping concepts. We create curb appeal that commands attention and communicates quality.',
    features: ['Façade Planning', 'Elevation Design', 'Landscaping Concept', 'Colour Schemes'],
    image: exteriorAcpImg,
    icon: '🏗️',
    color: '#F78701',
  },
  {
    id: 'acp-cladding',
    title: 'ACP Cladding',
    subtitle: 'Modern Façades, Lasting Impact',
    description:
      'Aluminium Composite Panel cladding transforms building exteriors with a sleek, modern aesthetic. Durable, weather-resistant, and available in premium metallic and matte finishes.',
    features: ['Metallic Finishes', 'Weather Resistant', 'Lightweight', 'Fire Retardant'],
    image: exteriorAcpImg,
    icon: '🔩',
    color: '#FC6B00',
  },
  {
    id: 'glazing',
    title: 'Glazing Systems',
    subtitle: 'Light, Structure, Elegance',
    description:
      'Structural glazing and curtain wall systems for commercial and residential buildings. Our glazing solutions maximize natural light while maintaining thermal efficiency and structural integrity.',
    features: ['Curtain Wall', 'Structural Glazing', 'Spider Glazing', 'Double Glazing'],
    image: glassImg,
    icon: '🔷',
    color: '#F78701',
  },
  {
    id: 'upvc-windows',
    title: 'UPVC Windows',
    subtitle: 'Energy Efficient, Elegantly Designed',
    description:
      'Premium uPVC windows and door systems that combine thermal efficiency, sound insulation, and weather resistance. Available in casement, sliding, and tilt-and-turn configurations.',
    features: ['Energy Efficient', 'Sound Insulation', 'Low Maintenance', 'Weather Proof'],
    image: upvcImg,
    icon: '🪟',
    color: '#FC6B00',
  },
  {
    id: 'gypsum-plaster',
    title: 'Gypsum Plaster',
    subtitle: 'Smooth, Strong, Beautiful',
    description:
      'High-quality gypsum plastering for interior and exterior surfaces. Machine-applied and hand-finished, delivering perfectly smooth walls that accept paint, texture, or wallpaper flawlessly.',
    features: ['Machine Applied', 'Hand Finishing', 'Interior & Exterior', 'Crack Resistant'],
    image: falseCeilingImg,
    icon: '🏛️',
    color: '#F78701',
  },
]

// ── All Services for Home Bento Grid ─────────────
export const ALL_SERVICES = [
  { id: 1,  icon: '🏠', title: 'Residential Interiors',  size: 'large',  color: '#F78701' },
  { id: 2,  icon: '🏢', title: 'Commercial Interiors',   size: 'medium', color: '#FC6B00' },
  { id: 3,  icon: '📐', title: 'Interior Design',        size: 'medium', color: '#F78701' },
  { id: 4,  icon: '✨', title: 'False Ceiling',          size: 'small',  color: '#FC6B00' },
  { id: 5,  icon: '🪨', title: 'Flooring',               size: 'small',  color: '#F78701' },
  { id: 6,  icon: '🎨', title: 'Wallpaper',              size: 'small',  color: '#FC6B00' },
  { id: 7,  icon: '🖌️', title: 'Painting',              size: 'small',  color: '#F78701' },
  { id: 8,  icon: '🪟', title: 'Glass Partitions',       size: 'medium', color: '#FC6B00' },
  { id: 9,  icon: '🏗️', title: 'Exterior Design',       size: 'large',  color: '#F78701' },
  { id: 10, icon: '🔩', title: 'ACP Cladding',           size: 'medium', color: '#FC6B00' },
  { id: 11, icon: '🔷', title: 'Glazing',                size: 'small',  color: '#F78701' },
  { id: 12, icon: '🏛️', title: 'Gypsum Plaster',        size: 'small',  color: '#FC6B00' },
]

// ── Why Choose Us Stats ───────────────────────────
export const STATS = [
  { value: 250,  suffix: '+', label: 'Projects Completed' },
  { value: 8,    suffix: '+', label: 'Years of Excellence' },
  { value: 98,   suffix: '%', label: 'Client Satisfaction' },
  { value: 15,   suffix: '+', label: 'Expert Designers' },
]

// ── Company Values ────────────────────────────────
export const VALUES = [
  {
    icon: '💎',
    title: 'Premium Quality',
    description: 'We use only the finest materials and work with master craftsmen to ensure every detail exceeds expectations.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    description: 'We respect your time. Every project is managed with clear timelines and delivered on schedule — no excuses.',
  },
  {
    icon: '💡',
    title: 'Innovation First',
    description: 'Our design philosophy embraces the latest global trends while respecting timeless principles of elegant design.',
  },
  {
    icon: '🤝',
    title: 'Client Partnership',
    description: 'We listen deeply to your vision and collaborate transparently through every stage of the project journey.',
  },
  {
    icon: '🌱',
    title: 'Sustainable Approach',
    description: 'We prioritize eco-friendly materials and energy-efficient design choices for a better tomorrow.',
  },
  {
    icon: '🛡️',
    title: 'Warranty Assurance',
    description: 'All our work comes with service warranty, ensuring peace of mind long after your project is complete.',
  },
]

// ── Working Process ───────────────────────────────
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'We begin with a detailed discussion to understand your vision, requirements, budget, and timeline.',
    icon: '📞',
  },
  {
    step: '02',
    title: 'Design Concept',
    description: 'Our designers create mood boards, 3D visualizations, and detailed floor plans tailored to your needs.',
    icon: '✏️',
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'We guide you through premium material selections — from flooring to fixtures — ensuring quality at every level.',
    icon: '🎨',
  },
  {
    step: '04',
    title: 'Project Execution',
    description: 'Our skilled team brings the design to life with precision craftsmanship and strict quality control.',
    icon: '🔨',
  },
  {
    step: '05',
    title: 'Final Handover',
    description: 'We conduct a thorough walkthrough and ensure your complete satisfaction before the official handover.',
    icon: '🏆',
  },
]

// ── Testimonials ──────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Arjun Mehta',
    title: 'Homeowner, Premium Villa',
    rating: 5,
    review: 'IIES transformed our house into a breathtaking home. Their attention to detail and professionalism is unmatched. The false ceiling and flooring work is absolutely stunning.',
    avatar: '👨‍💼',
  },
  {
    name: 'Sarah Johnson',
    title: 'Director, TechSpace Offices',
    rating: 5,
    review: 'We hired IIES for our 10,000 sq ft office renovation. The glass partitions and modern interior exceeded all expectations. Our team productivity has visibly improved.',
    avatar: '👩‍💼',
  },
  {
    name: 'Khalid Al-Rashid',
    title: 'Property Developer',
    rating: 5,
    review: 'The ACP cladding work on our commercial complex was delivered on time and on budget. The quality and finish are exceptional. We now work exclusively with IIES.',
    avatar: '👨‍💼',
  },
]

// ── Core Values for About Page ────────────────────
export const CORE_VALUES = [
  { icon: '🎯', title: 'Purpose-Driven Design', desc: 'Every design decision serves a purpose — aesthetic, functional, or both.' },
  { icon: '✨', title: 'Uncompromised Excellence', desc: 'We set the highest standards for ourselves and our materials.' },
  { icon: '🤝', title: 'Honest Partnership', desc: 'Transparent communication and genuine care for our clients.' },
  { icon: '🌍', title: 'Responsible Craftsmanship', desc: 'Sustainable choices that respect both people and planet.' },
]

// ── Contact Information (Placeholder) ────────────
export const CONTACT_INFO = {
  phone1: '+91 98765 43210',
  phone2: '+91 87654 32109',
  email: 'info@iiesolutions.com',
  address: '123 Design Avenue, Business District, Your City — 000000',
  workingHours: 'Mon – Sat: 9:00 AM – 7:00 PM',
  whatsapp: '+919876543210',
}
