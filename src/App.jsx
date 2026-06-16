import { useEffect, useRef } from 'react'
import heroBg from './assets/hero_bg.png'
import './App.css'

/* ── Particle component rendered via canvas-free DOM approach ── */
function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const COUNT = 28
    const particles = []

    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div')
      p.className = 'particle'

      const size = Math.random() * 4 + 2          // 2–6px
      const left = Math.random() * 100             // 0–100%
      const delay = Math.random() * 18             // 0–18s stagger
      const duration = Math.random() * 14 + 12    // 12–26s
      const opacity = Math.random() * 0.5 + 0.2   // 0.2–0.7

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -10px;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${opacity};
      `
      container.appendChild(p)
      particles.push(p)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return <div className="particles-container" ref={containerRef} aria-hidden="true" />
}

/* ── Main App Component ── */
function App() {
  return (
    <>
      {/* Floating Particles */}
      <Particles />

      {/* ── Hero Section ── */}
      <main id="hero">
        <section className="hero" aria-label="Hero Section">
          {/* Cinematic Background */}
          <img
            src={heroBg}
            alt="Luxury interior design space"
            className="hero__bg"
            loading="eager"
          />

          {/* Overlay Layers */}
          <div className="hero__overlay" aria-hidden="true" />
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__glow-top" aria-hidden="true" />

          {/* Hero Content */}
          <div className="hero__content">

            {/* Main Glass Card – wrapped for floating logo positioning */}
            <div className="hero__card-wrap">

              {/* Floating Company Logo – straddles top border of card */}
              <img
                src="/IIES.png"
                alt="Innovative Interior & Exterior Solutions"
                className="hero__brand-logo"
              />

              <article className="hero__card">

                {/* Status Badge */}
                <div className="hero__status" role="status" aria-label="Website status">
                  <span className="hero__status-icon" aria-hidden="true">🚧</span>
                  <span className="hero__status-text">Website Under Development</span>
                </div>

                {/* Ornamental Divider */}
                <div className="hero__divider" aria-hidden="true">
                  <span className="hero__divider-line" />
                  <span className="hero__divider-dot" />
                  <span className="hero__divider-line hero__divider-line--right" />
                </div>

                {/* Headline */}
                <h1 className="hero__headline">
                  Crafting Spaces That <span>Inspire.</span>
                </h1>

                {/* Subheading */}
                <p className="hero__subheading">
                  Innovative Interior &amp; Exterior Solutions
                </p>

                {/* Description */}
                <p className="hero__description">
                  We are preparing an exceptional digital experience that reflects our
                  commitment to innovative interior and exterior design. Our complete
                  website will be launching soon with our portfolio, services, and much more.
                </p>

                {/* CTA Button */}
                <button
                  id="launch-btn"
                  className="hero__btn"
                  type="button"
                  aria-label="Website launching soon"
                  disabled
                >
                  Launching Soon
                  <svg
                    className="hero__btn-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </article>
            </div>

            {/* Developer Notice Card */}
            <div
              className="dev-notice"
              role="note"
              aria-label="Developer information"
            >
              <p className="dev-notice__title">Official Development Notice</p>
              <p className="dev-notice__text">
                This website has been officially undertaken and is currently being
                designed and developed by the team at
              </p>
              <img
                src="/thajiratechworks.png"
                alt="Thajira Techworks"
                className="dev-notice__logo"
              />
            </div>

          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p className="footer__copyright">
          © 2026 Innovative Interior &amp; Exterior Solutions. All rights reserved.
        </p>
        <p className="footer__credit">
          Website Design &amp; Development by{' '}
          <a href="https://thajiratechworks.com" target="_blank" rel="noopener noreferrer">
            <strong>Thajira Techworks</strong>
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
