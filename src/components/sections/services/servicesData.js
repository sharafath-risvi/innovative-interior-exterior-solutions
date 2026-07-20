// =================================================
// SERVICES DATA STORE
// =================================================
// File: src/components/sections/services/servicesData.js
// Purpose: Centralized service data for the main Services page
//          and all 4 dedicated category pages:
//          1. Residential Interiors
//          2. Commercial Interiors
//          3. False Ceiling Solutions
//          4. Flooring Solutions
// =================================================

import flooringImg      from '../../../assets/images/flooring.webp'
import wallpaperImg     from '../../../assets/images/wallpaper.webp'
import glassImg         from '../../../assets/images/glass-partition.webp'
import upvcImg          from '../../../assets/images/upvc-windows.webp'
import falseCeilingImg  from '../../../assets/images/false-ceiling.webp'
import exteriorAcpImg   from '../../../assets/images/exterior-acp.webp'
import residentialImg   from '../../../assets/images/residential.webp'
import commercialImg    from '../../../assets/images/commercial.webp'
import luxuryRevealImg  from '../../../assets/images/luxury-reveal.webp'
import modernVillaImg   from '../../../assets/images/modern-villa-exterior.webp'
import premiumHeroImg   from '../../../assets/images/premium-hero-interior.webp'
import aboutTeamImg     from '../../../assets/images/about-team.webp'

export const RESIDENTIAL_SERVICES_DATA = [
  {
    id: 'res-kitchen',
    title: 'Modular Kitchen',
    subtitle: 'Ergonomic Culinary Excellence',
    description: 'Bespoke modular kitchen layouts designed for effortless workflow, optimized storage, and enduring elegance. Constructed with premium moisture-resistant cabinetry, soft-closing hardware, and luxury stone finishes.',
    features: ['Ergonomic Workflow Layouts', 'Moisture-Resistant Cabinetry', 'Soft-Close German Hardware', 'Custom Countertop Integration'],
    image: '/servicesImages/kitchen.JPG',
  },
  {
    id: 'res-wardrobes',
    title: 'Wardrobes',
    subtitle: 'Intelligent Storage & Style',
    description: 'Custom-designed floor-to-ceiling wardrobes that seamlessly integrate into your bedroom architecture. Featuring smart organizational systems, integrated sensor lighting, and sliding or hinged designer shutters.',
    features: ['Floor-to-Ceiling Fit', 'Integrated Sensor Lighting', 'Custom Organizer Sections', 'Designer Glass & Laminate Shutters'],
    image: '/servicesImages/wardrobes.JPG',
  },
  {
    id: 'res-tv-units',
    title: 'TV Units',
    subtitle: 'The Focal Point of Entertainment',
    description: 'Statement entertainment wall units that blend acoustic functionality with sophisticated design. Expertly crafted with concealed wire management, floating consoles, and back-lit accent panels.',
    features: ['Concealed Cable Management', 'Floating Console Architecture', 'Ambient Backlighting', 'Acoustic Wall Paneling'],
    image: '/servicesImages/tvunit.JPG',
  },
  {
    id: 'res-pooja',
    title: 'Pooja Units',
    subtitle: 'Sacred Spaces of Serenity',
    description: 'Devotional spaces crafted with reverence and intricate detailing. Incorporating traditional bells, CNC-cut jali partitions, warm backlighting, and premium marble or teakwood finishes.',
    features: ['Intricate CNC Jali Partitions', 'Warm Ambient Backlighting', 'Premium Marble & Teakwood', 'Custom Spatial Sizing'],
    image: '/servicesImages/poojaunit.jpeg',
  },
  {
    id: 'res-dividers',
    title: 'Divider Partitions',
    subtitle: 'Sculptural Spatial Separation',
    description: 'Elegant room dividers and display showcases that define open-plan living areas without obstructing natural light. Featuring geometric metalwork, fluted glass, and custom display shelving.',
    features: ['Divider Partitions', 'Shower Cubicles'],
    image: '/servicesImages/dividerpartition.webp',
  },
  {
    id: 'res-ceiling-painting',
    title: 'False Ceiling & Interior Painting',
    subtitle: 'Architectural Atmosphere',
    description: 'Comprehensive overhead styling combined with flawless interior painting. From designer gypsum coves with mood lighting to luxury wall textures and low-VOC premium paint applications.',
    features: ['Designer Gypsum Cove Lighting', 'Luxury Wall Textures', 'Low-VOC Premium Finishes', 'Flawless Surface Preparation'],
    image: falseCeilingImg,
  },
  {
    id: 'res-upvc',
    title: 'UPVC Windows',
    subtitle: 'Energy Efficient & Modern Fenestration',
    description: 'Modern UPVC windows providing superior durability, weather resistance, thermal insulation, and acoustic sound dampening for residential spaces. Engineered for elegant design and effortless maintenance.',
    features: ['UPVC & Structural Aluminum', 'Superior Thermal Insulation', 'Acoustic Noise Dampening', 'Weatherproof Precision Sealing'],
    image: upvcImg,
  },
  {
    id: 'res-walldecor',
    title: 'Wall Decor',
    subtitle: 'Designer Wall Coverings & Textures',
    description: 'Enhance your living spaces with curated wall coverings, custom wallpapers, and architectural wall treatments. Designed to create stunning accent walls and complement your personal interior aesthetic.',
    features: ['Wallpaper', 'Wall Cladding', 'Wall Decor', 'Painting'],
    image: '/servicesImages/walldecor.webp',
  },
]

export const COMMERCIAL_SERVICES_DATA = [
  {
    id: 'com-workstations',
    title: 'Workstations',
    subtitle: 'Collaborative Productivity Hubs',
    description: 'Ergonomically engineered office workstations designed to foster team collaboration while maintaining individual focus. Equipped with modular privacy screens, integrated raceways for clean cabling, and robust build quality.',
    features: ['Ergonomic Modular Design', 'Integrated Cabling Raceways', 'Acoustic Privacy Screens', 'Flexible Scalability'],
    image: '/servicesImages/workstation.jpeg',
  },
  {
    id: 'com-executive',
    title: 'Executive Cabins',
    subtitle: 'Leadership in Design',
    description: 'Prestigious private office suites tailored for leadership and executive decision-making. Incorporating custom executive desks, premium wall paneling, sophisticated acoustic treatments, and integrated finishing solutions.',
    features: ['Bespoke Executive Desks', 'Acoustic Wall Treatments', 'Integrated Storage Consoles', 'Premium Leather & Wood Finishes'],
    image: '/servicesImages/officecabin.webp',
  },
  {
    id: 'com-conference',
    title: 'Conference Rooms',
    subtitle: 'Immersive Meeting Environments',
    description: 'State-of-the-art boardrooms and meeting spaces built for impactful presentations and seamless video conferencing. Featuring acoustic wall paneling, custom boardroom tables, and optimized lighting.',
    features: ['Acoustic Echo Reduction', 'AV & Video Conferencing Integration', 'Custom Boardroom Tables', 'Smart Lighting Controls'],
    image: '/servicesImages/conferenceimage.jpeg',
  },
  {
    id: 'com-reception',
    title: 'Reception Zone',
    subtitle: 'Commanding First Impressions',
    description: 'Striking entrance lobbies and reception lounges that embody your corporate brand identity from the first step inside. Built with statement reception desks, brand signage walls, and luxury waiting area seating.',
    features: ['Statement Reception Desks', 'Custom Brand Signage Walls', 'Luxury Visitor Lounge Seating', 'Architectural Lighting Accent'],
    image: '/servicesImages/receptionarea.avif',
  },
  {
    id: 'com-flooring',
    title: 'Flooring',
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
    image: '/servicesImages/windowscommercial.webp',
  },
  {
    id: 'com-painting',
    title: 'Painting',
    subtitle: 'Precision Commercial Surface Coating',
    description: 'Painting transforms interiors by adding colour, depth, and personality to every space. Professional painting enhances ambience, protects surfaces, and gives homes and commercial interiors a refined, elegant finish.',
    features: ['Low-VOC High-Durability Coatings', 'Flawless Surface Preparation', 'Custom Brand Color Matching', 'Protective Commercial Finishes'],
    image: '/servicesImages/commercialinteriiorpainting.jpg',
  },
]

export const FALSE_CEILING_DATA = [
  {
    id: 'ceil-gypsum',
    title: 'Gypsum Ceiling',
    subtitle: 'Seamless Architectural Contours',
    description: 'Versatile monolithic ceiling boards that allow for unlimited design creativity. Ideal for creating multi-level drop ceilings, curved architectural contours, and concealed perimeter cove lighting.',
    features: ['Monolithic Seamless Finish', 'Multi-Level Design Capable', 'Integrated Cove Lighting', 'Fire & Moisture Resistant'],
    image: '/servicesImages/gypsumceiling.jpeg',
  },
  {
    id: 'ceil-metal',
    title: 'Metal Ceiling',
    subtitle: 'Modern Industrial Durability',
    description: 'Contemporary aluminum and galvanized steel ceiling panels offering exceptional durability and a clean technical aesthetic. Highly resistant to humidity and effortless to dismount for utility access.',
    features: ['Aluminum & Galvanized Steel', 'Corrosion & Humidity Resistant', 'Easy Utility Access', 'Long-Lifespan Durability'],
    image: '/servicesImages/metalceiling.jpg',
  },
  {
    id: 'ceil-grid',
    title: 'Grid Ceiling',
    subtitle: 'Modular Functional Efficiency',
    description: 'Exposed T-grid ceiling systems paired with mineral fiber or metal tiles. The industry standard for corporate offices and commercial facilities requiring quick maintenance access to overhead HVAC and electrical piping.',
    features: ['Exposed Modular T-Grid', 'Instant Overhead Maintenance Access', 'High Light Reflectance', 'Cost-Effective Commercial Solution'],
    image: '/servicesImages/gridceiling.jpeg',
  },
  {
    id: 'ceil-baffle',
    title: 'Baffle Ceiling',
    subtitle: 'Vertical Linear Dynamics',
    description: 'Vertically suspended linear baffle panels that add striking visual depth and directional rhythm to large commercial spaces. Excellent for masking overhead utilities while maintaining open airflow.',
    features: ['Striking Vertical Depth', 'Open Airflow Architecture', 'Overhead Utility Masking', 'Custom Spacing & Depths'],
    image: '/servicesImages/baffleceiling.jpg',
  },
  {
    id: 'ceil-linear',
    title: 'Linear Ceiling',
    subtitle: 'Streamlined Continuous Flow',
    description: 'Parallel metal or wood-look linear strip ceilings that guide sightlines and elongate room perception. Perfect for corridors, airport terminals, corporate lobbies, and contemporary exterior overhangs.',
    features: ['Continuous Visual Elongation', 'Metal & Wood-Grain Finishes', 'Integrated Linear LED Tracks', 'Interior & Exterior Application'],
    image: '/servicesImages/linearceiling.webp',
  },
]

export const FLOORING_DATA = [
  {
    id: 'floor-wooden',
    title: 'Wooden Flooring',
    subtitle: 'Timeless Warmth & Natural Luxury',
    description: 'Authentic engineered hardwood and premium laminate wooden planks that infuse interiors with natural organic warmth. Treated with multi-layer UV protection for scratch resistance and lasting richness.',
    features: ['Engineered Hardwood & Laminate', 'Multi-Layer UV Protection', 'Rich Organic Grain Textures', 'Warm Underfoot Comfort'],
    image: '/servicesImages/Wooden-Flooring.png',
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
    image: '/servicesImages/vinylflooring.jpeg',
  },
  {
    id: 'floor-corporate',
    title: 'Corporate Flooring',
    subtitle: 'Engineered for High-Performance Business',
    description: 'Specialized commercial flooring solutions including heavy-duty carpet tiles, anti-static epoxy coatings, and raised access floors designed for demanding corporate offices and data centers.',
    features: ['Modular Carpet Tile Systems', 'Anti-Static & ESD Coatings', 'Raised Access Floor Compatibility', 'Engineered for Heavy Traffic'],
    image: '/servicesImages/corporateflooring.JPG',
  },
]

export const ELEVATION_SERVICES_DATA = [
  {
    id: 'elev-acp',
    title: 'ACP Cladding',
    subtitle: 'Modern Façades & Architectural Sleekness',
    description: 'Aluminium Composite Panel (ACP) cladding delivers a sleek, modern aesthetic with superior weather resistance, thermal insulation, and fire-retardant durability. Expertly installed on residential façades, corporate headquarters, and commercial complexes.',
    features: ['Weather & UV Resistance', 'Fire-Retardant Core Options', 'Metallic, Matte & Wood Finishes', 'Precision Seamless Installation'],
    image: '/servicesImages/acpcladding.jpeg',
  },
  {
    id: 'elev-glazing',
    title: 'Glazing',
    subtitle: 'Structural Curtain Walls & Glass Elevations',
    description: 'High-performance structural glazing and curtain wall systems engineered for striking visual transparency, acoustic dampening, and superior energy efficiency. Custom-designed for commercial towers, showrooms, and luxury villas.',
    features: ['Structural & Curtain Wall Glazing', 'Spider Glazing Systems', 'High-Performance Insulated Glass', 'Acoustic & Thermal Optimization'],
    image: '/servicesImages/glazing.jpeg',
  },
  {
    id: 'elev-fluted',
    title: 'Fluted Panel Cladding',
    subtitle: 'Rhythmic 3D Exterior Texture',
    description: 'Exterior-grade WPC and metallic fluted panel cladding that adds architectural depth, vertical rhythm, and sophisticated shadow lines to modern building exteriors and feature walls.',
    features: ['Exterior-Grade UV Protection', 'Striking 3D Linear Rhythm', 'Termite & Moisture Resistant', 'Low-Maintenance Durability'],
    image: '/servicesImages/flutedpanelcladding.jpeg',
  },
  {
    id: 'elev-louvres',
    title: 'Louvre Panels',
    subtitle: 'Dynamic Solar Shading & Ventilation',
    description: 'Architectural aluminum and composite louvre panel systems engineered to provide natural airflow, privacy, and effective solar heat reduction while defining contemporary building elevations.',
    features: ['Dynamic Solar Heat Shielding', 'Optimized Natural Ventilation', 'Fixed & Adjustable Systems', 'Architectural Aluminum Profiles'],
    image: '/servicesImages/louvrepanels.jpeg',
  },
]

export const GYPSUM_PLASTER_SERVICES_DATA = [
  {
    id: 'gyp-wall',
    title: 'Interior Wall Gypsum Plastering',
    subtitle: 'Smooth Crack-Free Premium Wall Finishes',
    description: 'High-grade gypsum plaster application for internal brick, block, and RCC walls. Delivers a perfectly level, supremely smooth, crack-free surface ready for direct painting or wallpapering without any putty required.',
    features: ['Direct Application on Bricks & Blocks', 'Zero Water Curing Required', 'Supremely Smooth Level Finish', 'Thermal & Acoustic Insulation'],
    image: '/servicesImages/gypsumplaster.jpg',
  },
  {
    id: 'gyp-ceiling',
    title: 'RCC Ceiling Levelling & Finishing',
    subtitle: 'Direct Bonding Ceiling Plaster',
    description: 'Specialized gypsum plaster formulated for direct application on RCC ceilings and soffits. Excellent bonding strength eliminates the need for rough sand-cement rendering while drastically reducing structural dead load.',
    features: ['Direct RCC Ceiling Bonding', 'Lightweight Structural Load', 'Rapid Setting & Drying Time', 'Seamless Flawless Surface'],
    image: '/servicesImages/gypsumplaster2.webp',
  },
  {
    id: 'gyp-eco',
    title: 'Eco-Friendly Green Building Plaster',
    subtitle: 'Sustainable Interior Construction',
    description: 'Environmentally responsible gypsum plaster solutions that conserve millions of liters of water by requiring zero curing. Non-combustible, fire-retardant, and certified safe for sustainable residential and commercial developments.',
    features: ['100% Water Curing Free', 'Fire Retardant & Non-Combustible', 'Green Building Compatible', 'Accelerated Project Delivery'],
    image: '/servicesImages/gypsumplaster4.jpg',
  },
]

export const CATEGORY_METADATA = {
  residential: {
    id: 'residential',
    badge: 'Service Category 01',
    title: 'Residential',
    titleAccent: 'Interiors',
    subtitle: 'Residential interior design combines functionality and aesthetics to create comfortable and elegant living spaces. Every home is designed to reflect the lifestyle, personality, and preferences of its owner while ensuring comfort, beauty, and practical everyday living.',
    isDark: false,
    services: RESIDENTIAL_SERVICES_DATA,
  },
  commercial: {
    id: 'commercial',
    badge: 'Service Category 02',
    title: 'Commercial',
    titleAccent: 'Interiors',
    subtitle: 'Commercial interior design creates productive and inspiring workplaces that enhance employee efficiency and leave a lasting impression on clients. Well-designed commercial spaces improve brand identity, functionality, and user experience.',
    isDark: true,
    services: COMMERCIAL_SERVICES_DATA,
  },
  'false-ceiling': {
    id: 'false-ceiling',
    badge: 'Service Category 03',
    title: 'False Ceiling',
    titleAccent: 'Solutions',
    subtitle: 'False ceilings conceal electrical wiring, plumbing, ducts, and utilities while improving the overall appearance of interiors. They add elegance, enhance lighting, improve acoustics, and create a clean architectural finish.',
    isDark: false,
    services: FALSE_CEILING_DATA,
  },
  flooring: {
    id: 'flooring',
    badge: 'Service Category 04',
    title: 'Flooring',
    titleAccent: 'Solutions',
    subtitle: 'Quality flooring provides a durable, comfortable, and visually appealing surface for every space. It enhances aesthetics, improves functionality, and increases the long-term value of residential and commercial interiors.',
    isDark: true,
    services: FLOORING_DATA,
  },
  elevation: {
    id: 'elevation',
    badge: 'Service Category 05',
    title: 'Elevation',
    titleAccent: 'Solutions',
    subtitle: 'Elevation and exterior cladding transform building façades with sleek architectural design, weather resistance, and lasting durability. Well-designed exterior elevations elevate curb appeal while providing structural protection and thermal efficiency.',
    services: ELEVATION_SERVICES_DATA,
  },
  'gypsum-plaster': {
    id: 'gypsum-plaster',
    badge: 'Service Category 06',
    title: 'Gypsum',
    titleAccent: 'Plaster',
    subtitle: 'Gypsum plaster is an eco-friendly alternative to traditional sand-cement plaster, delivering smooth premium finishes with faster application. It requires no water curing, enhances durability, and is ideal for modern residential and commercial interiors.',
    isDark: true,
    services: GYPSUM_PLASTER_SERVICES_DATA,
  },
}

export const GYPSUM_PLASTER_DATA = {
  id: 'gyp-plaster',
  title: 'Gypsum Plaster',
  subtitle: 'Environment-Friendly Interior Plastering',
  description: 'Gypsum plaster is an environmentally friendly alternative to traditional sand-cement plastering for interior walls and ceilings. It provides a smooth, durable finish with faster application, eliminates the need for water curing, reduces construction time, and creates an ideal surface for premium interior finishes.',
  applications: [
    'Brick / Block Masonry',
    'Blocks',
    'RCC Walls & Ceilings',
    'Interior Levelling (Gypsum Plastering)',
    'Finishing (Paint Application)',
  ],
  image: '/servicesImages/gypsumplaster.jpg',
}

export const getCategoryById = (id) => CATEGORY_METADATA[id] || CATEGORY_METADATA.residential

