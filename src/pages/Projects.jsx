// =================================================
// PROJECTS PAGE — PORTFOLIO & ICONIC LANDMARKS
// =================================================
// File: src/pages/Projects.jsx
// Purpose: Dedicated Projects page showcasing IIES's legacy through
//          Section 2 (Iconic Projects highlight landscape section) and
//          Section 1 (Completed Projects 9-card responsive grid),
//          equipped with interactive detail modal & consultation CTA.
// =================================================

import { useState } from 'react'
import IconicProjects from '../components/sections/projects/IconicProjects'
import CompletedProjects from '../components/sections/projects/CompletedProjects'
import ProjectDetailModal from '../components/sections/projects/ProjectDetailModal'
import ConsultationCTA from '../components/sections/services/ConsultationCTA'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <main id="main-content" className="bg-white">
      {/* ── Section 2: Iconic Projects (Highlight Section - Starts page directly) ── */}
      <IconicProjects onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* ── Section 1: Completed Projects (3-2-1 Responsive Grid) ── */}
      <CompletedProjects onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* ── Consultation CTA ── */}
      <ConsultationCTA />

      {/* ── Interactive Detail Modal (For Completed Projects) ── */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  )
}
