// =================================================
// HOME PAGE
// =================================================
// File: src/pages/Home.jsx
// Purpose: Assembles all 6 home page sections in order:
//          1. Hero
//          2. Featured Services (Bento Grid)
//          3. Storytelling Experience (GSAP Scroll)
//          4. Projects Gallery (Horizontal Scroll)
//          5. Why Choose Us (Stats + Values)
//          6. Premium CTA
// =================================================
// Responsive: Each section manages its own responsive layout
// Future Developer Notes:
//   - Section order can be changed here
//   - New sections: create in src/components/sections/home/ and import
// =================================================

import Hero               from '../components/sections/home/Hero'
import FeaturedServices   from '../components/sections/home/FeaturedServices'
import StorytellingSection from '../components/sections/home/StorytellingSection'
import ProjectsGallery    from '../components/sections/home/ProjectsGallery'
import WhyChooseUs        from '../components/sections/home/WhyChooseUs'
import Testimonials       from '../components/sections/home/Testimonials'
import PremiumCTA         from '../components/sections/home/PremiumCTA'

export default function Home() {
  return (
    <main id="main-content">
      {/* ── Section 1: Hero ── */}
      <Hero />

      {/* ── Section 2: Featured Services ── */}
      <FeaturedServices />

      {/* ── Section 3: Storytelling Experience ── */}
      <StorytellingSection />

      {/* ── Section 4: Projects Gallery ── */}
      <ProjectsGallery />

      {/* ── Section 5: Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── Section 6: Testimonials (Hero Parallax) ── */}
      <Testimonials />

      {/* ── Section 7: Premium CTA ── */}
      <PremiumCTA />
    </main>
  )
}
