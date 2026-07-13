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

import React, { useState, lazy, Suspense } from 'react'
import PremiumHero        from '../components/sections/home/PremiumHero'
import Hero               from '../components/sections/home/Hero'
import LeadPopup          from '../components/sections/home/LeadPopup'
import ProjectDetailModal from '../components/sections/projects/ProjectDetailModal'

const FeaturedServices    = lazy(() => import('../components/sections/home/FeaturedServices'))

const ProjectsGallery     = lazy(() => import('../components/sections/home/ProjectsGallery'))
const WhyChooseUs         = lazy(() => import('../components/sections/home/WhyChooseUs'))
const Testimonials        = lazy(() => import('../components/sections/home/Testimonials'))
const PremiumCTA          = lazy(() => import('../components/sections/home/PremiumCTA'))

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <main id="main-content">
      {/* ── Section 0: Premium Hero (First Impression) ── */}
      <PremiumHero />

      {/* ── Section 1: Cinematic Hero ── */}
      <Hero />

      {/* ── Secondary Sections (Lazy Loaded) ── */}
      <Suspense fallback={null}>
        {/* ── Section 2: Featured Services ── */}
        <FeaturedServices onSelectProject={setSelectedProject} />
        {/* ── Section 4: Projects Gallery ── */}
        <ProjectsGallery onSelectProject={setSelectedProject} />

        {/* ── Section 5: Why Choose Us ── */}
        <WhyChooseUs />

        {/* ── Section 6: Testimonials (Hero Parallax) ── */}
        <Testimonials />

        {/* ── Section 7: Premium CTA ── */}
        <PremiumCTA />
      </Suspense>

      {/* ── Lead Generation Popup ── */}
      <LeadPopup />

      {/* ── Interactive Detail Modal (Shared with Projects page) ── */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </main>
  )
}

