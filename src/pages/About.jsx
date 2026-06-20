// =================================================
// ABOUT PAGE — CINEMATIC REDESIGN
// =================================================
// File: src/pages/About.jsx
// Purpose: Immersive storytelling experience using heavy 
//          GSAP scrolling, 3D CSS, and Framer Motion.
// =================================================
// Sections:
//   1. AboutHero       (Blueprint to Reality morph)
//   2. OurFounder      (3D portrait, glow, signature)
//   3. CinematicStory  (Our Story)
//   4. MissionVision   (Mission & Vision)
//   5. OurStory        (Three-Chapter Storytelling)
//   6. WhyChooseUs     (Interactive 3D blocks)
//   7. CompanyTimeline (Horizontal scrolling documentary)
//   8. PremiumCTA      (Movie-ending luxury CTA)
// =================================================

import AboutHero from '../components/sections/about/AboutHero'
import OurFounder from '../components/sections/about/OurFounder'
import CinematicStory from '../components/sections/about/CinematicStory'
import MissionVision from '../components/sections/about/MissionVision'
import OurStory from '../components/sections/about/OurStory'
import WhyChooseUs from '../components/sections/about/WhyChooseUs'
import CompanyTimeline from '../components/sections/about/CompanyTimeline'
import PremiumCTA from '../components/sections/about/PremiumCTA'

export default function About() {
  return (
    <main id="main-content" className="bg-black">
      <AboutHero />
      <OurFounder />
      <CinematicStory />
      <MissionVision />
      <OurStory />
      <WhyChooseUs />
      <CompanyTimeline />
      <PremiumCTA />
    </main>
  )
}
