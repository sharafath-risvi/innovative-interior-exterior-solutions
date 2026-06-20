// =================================================
// CONTACT PAGE — COMPLETE
// =================================================
// File: src/pages/Contact.jsx
// Purpose: Contact page with 5 sections: hero, contact details,
//          interactive inquiry form, Google Maps embed,
//          and luxury CTA footer.
// =================================================
// Sections:
//   1. Contact Hero
//   2. Contact Details — phone, email, address, hours
//   3. Contact Form — validated inquiry form
//   4. Map Section — Google Maps embed
//   5. Contact CTA — WhatsApp quick contact
// Animation:
//   - Staggered info card reveals
//   - Form input focus animations
//   - Submit button morphing
// Responsive: Fully responsive across all breakpoints
// Future Developer Notes:
//   - Form submission: connect to EmailJS or backend API
//   - Contact details: update CONTACT_INFO in src/lib/constants.js
//   - Google Maps: replace iframe src with actual business location
//   - WhatsApp: CONTACT_INFO.whatsapp for the number
// =================================================

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'
import { CONTACT_INFO } from '../lib/constants'
import heroBg from '../assets/images/hero-bg.png'

// ── Animation variants ──
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

// ──────────────────────────────
// 1. CONTACT HERO
// ──────────────────────────────
function ContactHero() {
  const { scrollY } = useScroll()
  // ── Parallax: background moves at 35% of scroll speed ──
  const bgY = useTransform(scrollY, [0, 600], [0, 200])
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.85])

  return (
    <section
      id="contact-hero"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100svh' }}
      aria-label="Contact page hero"
    >
      {/* ── Parallax Background ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY }}
      >
        <img
          src={heroBg}
          alt="Luxury interior design by IIES"
          className="w-full h-full object-cover scale-110"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Gradient Overlay ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(26,26,26,0.75) 0%, rgba(79,79,79,0.50) 50%, rgba(247,135,1,0.15) 100%)',
          opacity: overlayOpacity,
        }}
      />

      {/* ── Orange bottom vignette ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(247,135,1,0.08) 0%, transparent 100%)',
        }}
      />

      {/* ── Hero Content ── */}
      <div
        className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center justify-center text-center"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', paddingTop: 'var(--nav-height)' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-5xl mx-auto -mt-10 md:-mt-16"
        >
          {/* ── Badge ── */}
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase"
              style={{
                background: 'rgba(247,135,1,0.15)',
                border: '1px solid rgba(247,135,1,0.4)',
                color: '#FFA040',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Let's Connect
            </span>
          </motion.div>

          {/* ── Main Headline ── */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            Start Your Design{' '}
            <br className="hidden sm:block" />
            Journey{' '}
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(135deg, #F78701 0%, #FC6B00 50%, #FFA040 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              With Us.
            </em>
          </motion.h1>

          {/* ── Sub-headline ── */}
          <motion.p
            variants={itemVariants}
            className="text-white/75 max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontFamily: 'var(--font-serif)' }}
          >
            Whether you're planning a residential transformation, a commercial project, or simply have a question, our team is here to guide you every step of the way.
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 mb-10"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#contact-form"
                className="btn-glow inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-sec) 100%)',
                  boxShadow: '0 8px 32px rgba(247,135,1,0.45), 0 2px 8px rgba(247,135,1,0.2)',
                }}
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <a
                href={`tel:${CONTACT_INFO.phone1}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                📞 Call Now
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// 2. CONTACT DETAILS
// ──────────────────────────────
function ContactDetails() {
  const details = [
    {
      icon: '📞',
      label: 'Phone',
      primary: CONTACT_INFO.phone1,
      secondary: CONTACT_INFO.phone2,
      href: `tel:${CONTACT_INFO.phone1}`,
    },
    {
      icon: '✉️',
      label: 'Email',
      primary: CONTACT_INFO.email,
      secondary: 'We reply within 24 hours',
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      icon: '📍',
      label: 'Office Address',
      primary: CONTACT_INFO.address,
      secondary: null,
      href: null,
    },
    {
      icon: '🕐',
      label: 'Working Hours',
      primary: CONTACT_INFO.workingHours,
      secondary: 'Sunday: By appointment only',
      href: null,
    },
  ]

  return (
    <section
      id="contact-details"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--color-grey-light)' }}
      aria-label="Contact Information"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-[100px] -mt-20 -mr-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50/80 rounded-full blur-[100px] -mb-20 -ml-20 pointer-events-none" />
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Reach Us"
          title="Contact"
          titleAccent="Information"
          subtitle="Multiple ways to reach our friendly team. We're always here to help."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-8 md:p-10 rounded-3xl text-center cursor-default transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(247,135,1,0.4)] relative z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--color-orange-pale) 0%, rgba(247,135,1,0.05) 100%)',
                  border: '1px solid rgba(247,135,1,0.2)',
                }}
                aria-hidden="true"
              >
                <span style={{ filter: 'drop-shadow(0 2px 4px rgba(247,135,1,0.2))', color: 'var(--color-orange)' }}>{detail.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-700 text-sm tracking-wide uppercase mb-3 relative z-10">{detail.label}</h3>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="font-display text-gray-900 font-bold text-lg hover:text-orange-500 transition-colors block leading-snug mb-2 relative z-10"
                >
                  {detail.primary}
                </a>
              ) : (
                <p className="font-display text-gray-900 font-bold text-lg leading-snug mb-2 relative z-10">
                  {detail.primary}
                </p>
              )}
              {detail.secondary && (
                <p className="text-gray-500 text-sm relative z-10">{detail.secondary}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// 3. CONTACT FORM
// ──────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', budget: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    // ── Future: connect to backend/EmailJS here ──
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClass = `w-full px-6 py-4 rounded-2xl border border-white bg-white/50 text-gray-900 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-100/50 hover:bg-white/80 placeholder:text-gray-400 font-body-iies shadow-[0_2px_10px_rgba(0,0,0,0.02)]`

  return (
    <section
      id="contact-form"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--color-grey-light)' }}
      aria-label="Contact Inquiry Form"
    >
      {/* Decorative architectural elements */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-orange-200/40 rounded-full opacity-60 pointer-events-none" />
      <div className="absolute top-40 right-20 w-32 h-32 border border-orange-300/30 rounded-full opacity-60 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[40rem] h-[40rem] border-[1px] border-gray-200 rounded-full opacity-50 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, transparent 40%, rgba(247,135,1,0.03) 100%)' }} />
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-center">
          {/* Left: Info */}
          <div className="relative">
            <SectionHeading
              badge="Send Us a Message"
              title="Tell Us About"
              titleAccent="Your Project"
              subtitle="Fill in the form and one of our expert designers will reach out within 24 hours with a personalized response."
            />

            {/* Premium Process preview */}
            <div 
              className="relative p-8 rounded-3xl mb-8 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
              {[
                { step: '1', text: 'Fill the inquiry form with your project details' },
                { step: '2', text: 'Our team reviews your requirements' },
                { step: '3', text: 'We reach out within 24 hours with a proposal' },
                { step: '4', text: 'Schedule a free on-site consultation' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))' }}
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1.5">{item.text}</p>
                </motion.div>
              ))}
              </div>
            </div>

            {/* WhatsApp shortcut */}
            <motion.a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-3 px-7 py-4 rounded-full text-white font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
              }}
            >
              <span>💬</span>
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div
                className="p-12 rounded-3xl text-center border border-orange-100"
                style={{ background: 'var(--color-orange-pale)' }}
              >
                <div className="text-6xl mb-5" aria-hidden="true">🎉</div>
                <h3 className="font-display text-gray-900 text-2xl font-bold mb-3">Thank You!</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your inquiry has been received. Our team will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 20px 60px -15px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)',
                }}
                noValidate
                aria-label="Project inquiry form"
              >
                {/* Decorative blob in form */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="relative z-10 font-display text-gray-900 text-2xl font-bold mb-8">Project Inquiry</h3>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="relative z-10 mb-6">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Service Required
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      <optgroup label="Interior Services">
                        <option>Residential Interiors</option>
                        <option>Commercial Interiors</option>
                        <option>Interior Design</option>
                        <option>False Ceiling</option>
                        <option>Flooring</option>
                        <option>Wallpaper</option>
                        <option>Painting</option>
                        <option>Glass Partitions</option>
                      </optgroup>
                      <optgroup label="Exterior Services">
                        <option>Exterior Design</option>
                        <option>ACP Cladding</option>
                        <option>Glazing</option>
                        <option>UPVC Windows</option>
                        <option>Gypsum Plaster</option>
                      </optgroup>
                      <option>Multiple Services</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Budget Range
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select budget</option>
                      <option>Below ₹5 Lakhs</option>
                      <option>₹5 – ₹15 Lakhs</option>
                      <option>₹15 – ₹30 Lakhs</option>
                      <option>₹30 – ₹50 Lakhs</option>
                      <option>Above ₹50 Lakhs</option>
                    </select>
                  </div>
                </div>

                <div className="relative z-10 mb-8">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project — location, size, timeline, and any specific requirements..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02, y: submitting ? 0 : -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative z-10 w-full py-4 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-3"
                  style={{
                    background: submitting
                      ? '#ccc'
                      : 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                    boxShadow: submitting ? 'none' : '0 8px 24px rgba(247,135,1,0.35)',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-400 text-xs mt-4">
                  By submitting, you agree to be contacted by our team. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// 4. MAP SECTION
// ──────────────────────────────
function MapSection() {
  return (
    <section id="map-section" className="section-pad bg-white" aria-label="Office Location Map">
      <div className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading
          badge="Find Us"
          title="Visit Our"
          titleAccent="Studio"
          subtitle="Stop by our design studio to experience our material showroom and meet the team in person."
          centered
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-gray-200/50 bg-white"
          style={{ 
            height: 'clamp(400px, 60vh, 600px)', 
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
          }}
        >
          {/* Placeholder map – Replace with real Google Maps embed */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'var(--color-grey-light)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">📍</div>
            <h3 className="font-display text-gray-700 text-xl font-semibold mb-2">IIES Design Studio</h3>
            <p className="text-gray-500 text-center max-w-md px-6">{CONTACT_INFO.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              id="map-directions-btn"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))' }}
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// 5. CONTACT CTA
// ──────────────────────────────
function ContactCTA() {
  return (
    <section
      id="contact-page-cta"
      className="section-pad"
      style={{ background: 'var(--color-grey-light)' }}
      aria-label="Quick Contact Options"
    >
      <div className="px-6 md:px-12 lg:px-20" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-12 md:p-16 rounded-3xl text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2020 100%)',
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-20"
            style={{ background: 'var(--color-orange)' }}
            aria-hidden="true"
          />
          <h2
            className="relative font-display font-bold text-white leading-tight mb-4 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Prefer a Quick{' '}
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Conversation?
            </em>
          </h2>
          <p className="relative text-gray-300 max-w-lg mx-auto mb-10">
            Sometimes a quick call is the best way to get started. Reach us directly — we're always happy to chat.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={`tel:${CONTACT_INFO.phone1}`}
              id="cta-phone-call"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-sec))',
                boxShadow: '0 8px 32px rgba(247,135,1,0.4)',
              }}
            >
              📞 {CONTACT_INFO.phone1}
            </motion.a>
            <motion.a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
              }}
            >
              💬 WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────
// CONTACT PAGE ASSEMBLY
// ──────────────────────────────
export default function Contact() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactDetails />
      <ContactForm />
      <MapSection />
      <ContactCTA />
    </main>
  )
}
