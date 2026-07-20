// =================================================
// PROJECTS DATA — PORTFOLIO & ICONIC LANDMARKS
// =================================================
// File: src/components/sections/projects/projectsData.js
// Purpose: Central data repository for all IIES portfolio projects,
//          separated into Completed Projects (standard grid) and
//          Iconic Projects (premium highlight section).
//          Updated with real client images from iiesImages where matching.
// =================================================

// ── 1. COMPLETED PROJECTS (9 Projects) ──
export const COMPLETED_PROJECTS = [
  {
    id: 'comp-1',
    title: 'Chennai Metro Rail',
    location: 'Chennai',
    category: 'Infrastructure Project',
    description: 'Interior and architectural finishing solutions delivered for selected Chennai Metro stations with a strong focus on durability, precision, and modern public infrastructure.',
    image: '/iiesImages/metrostation.jpeg',
    year: '2025',
    highlights: [
      'High-durability public station interior finishing',
      'Precision architectural cladding & ceiling installations',
      'Strict adherence to public safety & quality standards'
    ]
  },
  {
    id: 'comp-2',
    title: 'Amazon Office',
    location: 'Hyderabad',
    category: 'Corporate Interior',
    description: 'Premium corporate workspace featuring executive cabins, collaborative workspaces, conference rooms, reception areas, and modern interior finishes.',
    image: '/iiesImages/amazonhyderabad.jpg',
    year: '2025',
    highlights: [
      'Acoustic-engineered executive boardrooms & cabins',
      'Dynamic open-plan collaborative work environments',
      'Bespoke reception and lounge architectural finishes'
    ]
  },
  {
    id: 'comp-3',
    title: 'Statue of Unity',
    location: 'Gujarat',
    category: 'Landmark Project',
    description: 'Architectural finishing work delivered for one of India\'s most iconic national landmarks, maintaining exceptional quality and execution standards.',
    image: '/iiesImages/statueofunity.webp',
    year: '2024',
    highlights: [
      'Monumental architectural finishing execution',
      'Weather-resistant exterior and interior detailing',
      'Uncompromising adherence to national heritage standards'
    ]
  },
  {
    id: 'comp-4',
    title: 'World Trade Center',
    location: 'Chennai',
    category: 'Commercial Interior',
    description: 'High-end commercial interior and finishing solutions executed for one of Chennai\'s most prestigious business destinations.',
    image: '/iiesImages/worldtradecenter.webp',
    year: '2025',
    highlights: [
      'Luxury corporate lobby and common area finishing',
      'High-spec flooring and linear false ceiling systems',
      'Premium architectural partition and glazing solutions'
    ]
  },
  {
    id: 'comp-5',
    title: 'Butterfly Marketing Office',
    location: 'Chennai',
    category: 'Corporate Office',
    description: 'Modern office interiors with executive workspaces, meeting rooms, reception zones, and premium architectural finishes.',
    image: '/iiesImages/butterflyoffice.avif',
    year: '2024',
    highlights: [
      'Ergonomic executive suites and workstation zones',
      'Custom decorative false ceilings with integrated lighting',
      'Sophisticated reception and client experience centers'
    ]
  },
  {
    id: 'comp-6',
    title: 'Apollo Hospital (Interior View)',
    location: 'Chennai',
    category: 'Healthcare Interior',
    description: 'Specialized medical and healthcare interior finishing work delivered for Apollo Hospital with a focus on hygiene, acoustic comfort, and modern clinical aesthetics.',
    image: '/iiesImages/appollo.jpg',
    year: '2025',
    highlights: [
      'Clinical-grade hygienic surface finishing',
      'Acoustic and ambient interior healthcare environment',
      'Precision architectural healthcare interior execution'
    ]
  },
  {
    id: 'comp-7',
    title: 'Madras Boat Club',
    location: 'Chennai',
    category: 'Premium Hospitality',
    description: 'Elegant interior finishing and customized design solutions delivered for one of Chennai\'s most prestigious private clubs.',
    image: '/iiesImages/madrasboatclub.png',
    year: '2025',
    highlights: [
      'Heritage-inspired luxury hospitality interiors',
      'Custom acoustic timber paneling and lounge seating zones',
      'Sophisticated ambient lighting and ceiling architecture'
    ]
  },
  {
    id: 'comp-8',
    title: 'Premium Commercial Interior',
    location: 'Chennai',
    category: 'Commercial Interior',
    description: 'A modern commercial workspace featuring contemporary office planning, premium finishes, conference spaces, executive cabins, and reception areas.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    year: '2024',
    highlights: [
      'Turnkey commercial office spatial planning',
      'Seamless glass partitions and executive cabin layouts',
      'High-durability commercial flooring and ceiling treatments'
    ]
  },
  {
    id: 'comp-9',
    title: 'Luxury Residential Interior',
    location: 'Chennai',
    category: 'Residential Interior',
    description: 'A complete luxury residence featuring customized interiors, modular furniture, elegant lighting, premium finishes, and thoughtfully designed living spaces.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    year: '2024',
    highlights: [
      'Bespoke modular kitchen and wardrobe architecture',
      'Designer false ceilings with concealed mood lighting',
      'Premium Italian marble flooring and custom wall paneling'
    ]
  }
]

// ── 2. ICONIC PROJECTS (6 Landmark Projects) ──
export const ICONIC_PROJECTS = [
  {
    id: 'iconic-1',
    title: 'Amazon Hyderabad Office',
    location: 'Hyderabad',
    category: 'Corporate Interior',
    description: 'Crafting an ultra-modern global technology workspace featuring acoustic conference hubs, collaborative open spaces, executive suites, and bespoke architectural elements.',
    image: '/iiesImages/amazonhyderabad.jpg',
    year: '2025',
    scale: 'Global Corporate Campus',
    highlights: [
      'Next-generation collaborative tech workspace design',
      'Acoustic ceiling and glass partition integration',
      'Premium ergonomic lounge and conference environments'
    ]
  },
  {
    id: 'iconic-2',
    title: 'Statue of Unity',
    location: 'Gujarat',
    category: 'Landmark Project',
    description: 'Executing meticulous architectural finishing work for one of India\'s most globally renowned monuments, upholding uncompromising execution and precision engineering standards.',
    image: '/iiesImages/statueofunity.webp',
    year: '2024',
    scale: 'National Heritage Landmark',
    highlights: [
      'Architectural surface finishing for an iconic global monument',
      'Specialized all-weather exterior and interior treatments',
      'Strict adherence to national execution benchmarks'
    ]
  },
  {
    id: 'iconic-3',
    title: 'Apollo Hospital (Interior View)',
    location: 'Chennai',
    category: 'Healthcare Interior',
    description: 'Delivering clinical-grade healthcare interior finishing and specialized medical environment aesthetics for Apollo Hospital.',
    image: '/iiesImages/appollo.jpg',
    year: '2025',
    scale: 'Healthcare Infrastructure',
    highlights: [
      'Clinical-grade hygienic interior finishing',
      'Specialized healthcare architectural detailing',
      'Precision acoustic and patient environment execution'
    ]
  }
]
