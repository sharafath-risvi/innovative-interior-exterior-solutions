import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Splits a word into individual character <span>s — mirrors Hero.jsx renderAnimatedWord
const renderWord = (word, keyPrefix) => (
  <span key={keyPrefix} className="inline-block whitespace-nowrap">
    {word.split('').map((char, i) => (
      <span
        key={i}
        className="ph-title-char inline-block opacity-0 will-change-transform"
        style={{ transformOrigin: '50% 100%' }}
      >
        {char}
      </span>
    ))}
  </span>
);

// Renders a full line of text, splitting on spaces and preserving word gaps
const renderLine = (text, lineKey) =>
  text.split(' ').map((word, wi, arr) => (
    <React.Fragment key={`${lineKey}-${wi}`}>
      {renderWord(word, `${lineKey}-w${wi}`)}
      {wi < arr.length - 1 && (
        <span className="inline-block" style={{ width: '0.35em' }}>&nbsp;</span>
      )}
    </React.Fragment>
  ));

export default function PremiumHero() {
  const containerRef = useRef(null);
  const stickyRef   = useRef(null);
  const bgRef       = useRef(null);
  const textRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── LOAD TIMELINE ──────────────────────────────────────────
      const tlLoad = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background image zooms in elegantly
      tlLoad.fromTo(bgRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.0 }
      );

      // 2. Content wrapper fades in over the image
      tlLoad.to(textRef.current,
        { opacity: 1, duration: 0.5 },
        '-=1.4'
      );

      // 3. Heading: exact same character animation as second Hero
      // opacity:0, rotateX:-90, y:20 → opacity:1, rotateX:0, y:0
      // duration:0.9, stagger:0.05, ease:back.out(1.7), delay:0.3
      tlLoad.fromTo('.ph-title-char',
        { opacity: 0, rotateX: -90, y: 20 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 0.9,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 0.3,
        },
        '-=0.6'
      );

      // ── All other elements: label, divider, paragraph, CTA ──
      tlLoad.fromTo('.ph-elem',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power2.out' },
        '-=0.4'
      );

      // ── SCROLL TIMELINE ────────────────────────────────────────
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      tlScroll.to(textRef.current,   { y: -100, opacity: 0, duration: 1 }, 0);
      tlScroll.to(bgRef.current,     { scale: 1.07, duration: 1 }, 0);
      tlScroll.to(stickyRef.current, { opacity: 0, duration: 0.5 }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[200vh] bg-black z-10"
      aria-label="Premium First Impression"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black will-change-opacity"
      >

        {/* ── BACKGROUND IMAGE ──────────────────────────────────── */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full will-change-transform opacity-0"
        >
          <img
            src="/assets/premium-hero-bg.webp"
            alt="Premium Luxury Interior"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[65%_center]"
          />

          {/* Cinematic left-to-right gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(4,4,4,0.82) 0%, rgba(4,4,4,0.58) 30%, rgba(4,4,4,0.20) 58%, transparent 80%)',
            }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 38%)',
            }}
          />
        </div>

        {/* ── LEFT SIDE CONTENT ─────────────────────────────────── */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div
            ref={textRef}
            className="opacity-0 will-change-transform"
            style={{
              marginLeft: 'clamp(32px, 10vw, 160px)',
              maxWidth: '520px',
            }}
          >

            {/* ① Eyebrow label */}
            <div
              className="ph-elem opacity-0 will-change-transform"
              style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}
            >
              {/* Animated accent line */}
              <span
                style={{
                  display: 'block',
                  width: '36px',
                  height: '1.5px',
                  background: 'linear-gradient(to right, #f97316, #fb923c)',
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '11px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: '#fb923c',
                }}
              >
                Architectural Excellence
              </span>
            </div>

            {/* ② Main heading — character-by-character animation matching second Hero */}
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(48px, 5.4vw, 76px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                textShadow: '0 4px 40px rgba(0,0,0,0.55)',
                margin: 0,
                marginBottom: '36px',
                perspective: '1000px',
              }}
            >
              <span className="block">{renderLine('Where Dreams', 'l1')}</span>
              <span className="block">{renderLine('Become Reality', 'l2')}</span>
            </h1>

            {/* ③ Accent rule — breaks heading from body copy */}
            <div
              className="ph-elem opacity-0 will-change-transform"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#f97316', flexShrink: 0 }} />
              <span style={{ display: 'block', flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            </div>

            {/* ④ Subtext paragraph */}
            <p
              className="ph-elem opacity-0 will-change-transform"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 1.85,
                color: 'rgba(255,255,255,0.68)',
                maxWidth: '520px',
                marginBottom: '48px',
                textShadow: '0 1px 8px rgba(0,0,0,0.35)',
              }}
            >
              Welcome to IIES – Your Trusted Interior Partner. Innovative Interior & Exterior Solutions (IIES) is your one-stop solution for all design needs. We blend creativity with functionality to redefine spaces and elevate experiences, utilizing a wide range of interior and exterior products.
            </p>

            {/* ⑤ Editorial CTA link */}
            <div className="ph-elem opacity-0 will-change-transform">
              <button
                onClick={() => {
                  const el =
                    document.getElementById('services') ||
                    document.querySelector('[data-section="services"]');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.scrollBy({ top: window.innerHeight * 2, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  outline: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.ph-link-text').style.transform  = 'translateX(6px)';
                  e.currentTarget.querySelector('.ph-link-text').style.color      = '#f97316';
                  e.currentTarget.querySelector('.ph-link-arrow').style.transform = 'translateX(6px)';
                  e.currentTarget.querySelector('.ph-link-arrow').style.color     = '#f97316';
                  e.currentTarget.querySelector('.ph-link-bar').style.transform   = 'scaleX(1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.ph-link-text').style.transform  = 'translateX(0)';
                  e.currentTarget.querySelector('.ph-link-text').style.color      = '#F0F0F0';
                  e.currentTarget.querySelector('.ph-link-arrow').style.transform = 'translateX(0)';
                  e.currentTarget.querySelector('.ph-link-arrow').style.color     = '#F0F0F0';
                  e.currentTarget.querySelector('.ph-link-bar').style.transform   = 'scaleX(0)';
                }}
              >
                <span style={{ position: 'relative' }}>
                  <span
                    className="ph-link-text"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: '14px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#F0F0F0',
                      display: 'inline-block',
                      transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), color 0.3s ease',
                    }}
                  >
                    View Our Portfolio
                  </span>
                  {/* Underline grows left → right */}
                  <span
                    className="ph-link-bar"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: '#f97316',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left center',
                      transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />
                </span>
                <span
                  className="ph-link-arrow"
                  style={{
                    fontSize: '16px',
                    color: '#F0F0F0',
                    display: 'inline-block',
                    transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), color 0.3s ease',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
