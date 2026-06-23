// =================================================
// FOOTER COMPONENT
// =================================================
// File: src/components/layout/Footer.jsx
// Purpose: Premium multi-column footer with company info,
//          quick links, services, contact details, social icons,
//          and Thajira Techworks developer credit.
// =================================================
// Animation:
//   - Subtle fade-up on viewport entry (Framer Motion)
//   - Hover glow on social icons
//   - Orange accent underlines on links
// Responsive:
//   - Desktop: 4-column grid
//   - Tablet: 2-column grid
//   - Mobile: single column stack
// Future Developer Notes:
//   - Update CONTACT_INFO in src/lib/constants.js for contact details
//   - Social links: replace '#' hrefs with actual profile URLs
//   - Thajira Techworks link MUST remain unchanged per client requirement
// =================================================

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONTACT_INFO } from '../../lib/constants'

// ── Footer column fade-up animation variant ──
const colVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 50%, #1A1A1A 100%)' }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Decorative top border ── */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-orange), transparent)' }}
      />

      {/* ── Background decoration ── */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-5"
        style={{ background: 'var(--color-orange)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-5"
        style={{ background: 'var(--color-orange-sec)', transform: 'translate(-30%, 30%)' }}
      />

      <div
        className="relative px-6 md:px-12 lg:px-20 pt-16 pb-8"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Column 1: Brand ── */}
          <motion.div
            custom={0}
            variants={colVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link 
              to="/" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
              }}
              className="flex items-center gap-3 mb-5" 
              aria-label="IIES Home"
            >
              <img loading="lazy" src="/IIES.png" alt="IIES" className="w-12 h-12 object-contain" />
              <div>
                <p className="font-display text-white text-sm font-semibold leading-tight">Innovative Interior</p>
                <p className="text-[11px] tracking-widest leading-tight" style={{ color: 'var(--color-orange)' }}>
                  & EXTERIOR SOLUTIONS
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming spaces with passion, precision, and purpose. Your premier partner for luxury interior and exterior design solutions.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3" aria-label="Social media links">
              {[
                { label: 'Facebook',  href: '#', icon: 'F' },
                { label: 'Instagram', href: '#', icon: 'In' },
                { label: 'WhatsApp',  href: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`, icon: 'W' },
                { label: 'LinkedIn',  href: '#', icon: 'Li' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/20 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-orange)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links ── */}
          <motion.div custom={1} variants={colVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home',     href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact',  href: '/contact' },
                { label: 'Get a Quote', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => {
                      if (link.href === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
                      }
                    }}
                    className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-4 h-0.5 rounded-full transition-all duration-300 group-hover:w-6"
                      style={{ background: 'var(--color-orange)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services ── */}
          <motion.div custom={2} variants={colVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Residential Interiors', 'Commercial Interiors', 'False Ceiling',
                'Flooring', 'ACP Cladding', 'Glazing', 'UPVC Windows',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services#services-section"
                    onClick={() => {
                      if (window.location.pathname === '/services') {
                        const el = document.getElementById('services-section');
                        if (el) {
                          if (window.lenis) {
                            window.lenis.scrollTo(el, { duration: 1.2, offset: -80 });
                          } else {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }
                    }}
                    className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-4 h-0.5 rounded-full transition-all duration-300 group-hover:w-6"
                      style={{ background: 'var(--color-orange)' }}
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact ── */}
          <motion.div custom={3} variants={colVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-0.5 shrink-0">📍</span>
                <span className="text-gray-400 text-sm leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-400 shrink-0">📞</span>
                <a href={`tel:${CONTACT_INFO.phone1}`} className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  {CONTACT_INFO.phone1}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-400 shrink-0">📱</span>
                <a href={`tel:${CONTACT_INFO.phone2}`} className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  {CONTACT_INFO.phone2}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-400 shrink-0">✉️</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 text-sm hover:text-orange-400 transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-400 shrink-0">🕐</span>
                <span className="text-gray-400 text-sm">{CONTACT_INFO.workingHours}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {year} Innovative Interior &amp; Exterior Solutions. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm text-center sm:text-right">
            Designed &amp; Developed by{' '}
            <a
              href="https://thajiratechworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors duration-300 hover:text-orange-400"
              style={{ color: 'var(--color-orange)' }}
              aria-label="Thajira Techworks - opens in new tab"
            >
              Thajira Techworks
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
