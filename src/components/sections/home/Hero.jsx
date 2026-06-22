import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const renderAnimatedWord = (word, wordIndex) => (
  <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
    {word.split('').map((char, i) => (
      <span 
        key={i} 
        className="hero-title-char inline-block opacity-0 will-change-transform" 
        style={{ transformOrigin: '50% 100%' }}
      >
        {char}
      </span>
    ))}
  </span>
);

export default function Hero() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  
  // Animation Refs
  const vignetteRef = useRef(null)
  const text0Ref = useRef(null)
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const scrollBounceRef = useRef(null)

  useEffect(() => {
    let ctx;
    let rafId;

    const frameCount = 299;
    const dur = 10; // Virtual timeline duration in seconds

    const initAnimation = (images) => {
      ctx = gsap.context(() => {
        // Continuous bounce for scroll indicator dot
        gsap.to(scrollBounceRef.current, {
          y: 8,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });

        // ── ON MOUNT CHARACTER ANIMATION ──
        gsap.fromTo(".hero-title-char",
          { opacity: 0, rotateX: -90, y: 20 },
          { 
            opacity: 1, 
            rotateX: 0, 
            y: 0, 
            duration: 0.9, 
            stagger: 0.05, 
            ease: "back.out(1.7)",
            delay: 0.2
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Buttery smooth interpolation lag
          }
        })

        // ── ZERO-RENDER DOM ANIMATIONS ──
        // VIGNETTE OVERLAY: Fades out by 1s
        tl.to(vignetteRef.current, { opacity: 0, duration: 1, ease: "power3.out" }, 0)

        // TEXT 0 (Initial Minimal Intro): Fades out by 1s
        tl.to(text0Ref.current, { opacity: 0, duration: 1, ease: "power2.inOut" }, 0)
        tl.to(".line1-exit", { x: -120, opacity: 0, duration: 0.8, ease: "power3.out" }, 0)
        tl.to(".line2-exit", { x: 120, opacity: 0, duration: 0.8, ease: "power3.out" }, 0)
        tl.to(".service-list-exit", { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0)

        // SCROLL SECTION 1 (Left Aligned): Fades in at 2.7s, out at 4.2s
        tl.fromTo(text1Ref.current, 
          { opacity: 0, x: -40, filter: 'blur(8px)' }, 
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" }, 
          2.7
        )
        tl.to(text1Ref.current, { opacity: 0, y: -25, filter: 'blur(0px)', duration: 0.4, ease: "power3.out" }, 4.2)

        // SCROLL SECTION 2 (Right Aligned): Fades in at 7.5s
        tl.fromTo(text2Ref.current,
          { opacity: 0, x: 40, filter: 'blur(8px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" },
          7.5
        )

        // SCROLL INDICATOR: Fades out immediately upon scrolling
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 20, duration: 0.4, ease: "power3.out" }, 0)

        // ── OPTIMIZED CANVAS FRAME SCRUBBING ──
        const proxy = { frame: 0 };
        tl.to(proxy, {
          frame: frameCount - 1,
          snap: "frame", // Lock to precise frame indices
          ease: "none",
          duration: dur
        }, 0);

        // Highly tuned hardware-accelerated rendering loop
        let currentPaintedFrame = -1;
        const renderCanvas = () => {
          const targetFrame = Math.round(proxy.frame);
          
          if (canvasRef.current && targetFrame !== currentPaintedFrame) {
            const context = canvasRef.current.getContext('2d');
            const img = images[targetFrame];
            
            // Only draw if image is fully downloaded and decoded in memory
            if (img && img.complete && img.naturalHeight !== 0) {
              const canvas = canvasRef.current;
              const canvasRatio = canvas.width / canvas.height;
              const imgRatio = img.width / img.height;
              
              let sWidth = img.width;
              let sHeight = img.height;
              let sx = 0;
              let sy = 0;

              // Object-fit: cover equivalent math
              if (imgRatio > canvasRatio) {
                sWidth = img.height * canvasRatio;
                sx = (img.width - sWidth) / 2;
              } else {
                sHeight = img.width / canvasRatio;
                sy = (img.height - sHeight) / 2;
              }
              
              // Clear previous frame to prevent ghosting on transparent edges
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
              
              currentPaintedFrame = targetFrame;
            }
          }
          rafId = requestAnimationFrame(renderCanvas);
        };
        rafId = requestAnimationFrame(renderCanvas);

      }, containerRef)
    }

    // ── ASYNC BACKGROUND PRELOADER (Ultra-fast initial load) ──
    const images = new Array(frameCount).fill(null);
    
    // 1. Immediately load ONLY the first frame to guarantee an instant first-paint
    const firstImg = new Image();
    firstImg.src = `/frames/frame_0001.jpg`;
    images[0] = firstImg;

    // 2. Defer loading the remaining 298 frames so we don't block the main thread or network queue
    setTimeout(() => {
      let currentFrameIndex = 2;
      
      const loadNextChunk = () => {
        // Load in tiny chunks of 10 to keep the CPU completely free for animations
        const end = Math.min(currentFrameIndex + 10, frameCount + 1);
        for (; currentFrameIndex < end; currentFrameIndex++) {
          const img = new Image();
          const frameStr = currentFrameIndex.toString().padStart(4, '0');
          img.src = `/frames/frame_${frameStr}.jpg`;
          images[currentFrameIndex - 1] = img; // Array is 0-indexed
        }
        
        if (currentFrameIndex <= frameCount) {
          // Schedule next chunk cleanly in the background
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadNextChunk);
          } else {
            setTimeout(loadNextChunk, 10);
          }
        }
      };
      
      // Give the browser 100ms to finish rendering the first paint and the UI
      loadNextChunk();
    }, 100);
    
    // Auto-scale canvas natively for retina displays
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const parent = canvasRef.current.parentElement;
        canvasRef.current.width = parent.clientWidth * dpr;
        canvasRef.current.height = parent.clientHeight * dpr;
        
        // Force repaint on resize
        if (ctx) {
          ctx.revert();
          initAnimation(images);
        }
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    
    // Give DOM a microtick to establish parent height before sizing canvas
    setTimeout(() => {
      if (canvasRef.current && !ctx) {
        const dpr = window.devicePixelRatio || 1;
        const parent = canvasRef.current.parentElement;
        canvasRef.current.width = parent.clientWidth * dpr;
        canvasRef.current.height = parent.clientHeight * dpr;
        initAnimation(images);
      }
    }, 50);

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (ctx) ctx.revert()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-black text-white z-0" aria-label="Cinematic Hero Storytelling">
      {/* ── STICKY CONTAINER ── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        
        {/* ── CANVAS RENDERER ── */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center pointer-events-none will-change-transform"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          />
        </div>

        {/* ── STATIC DOM OVERLAYS (GPU Accelerated, No React Renders) ── */}
        
        {/* ── CINEMATIC VIGNETTE OVERLAY ── */}
        <div 
          ref={vignetteRef} 
          className="absolute inset-0 z-10 pointer-events-none will-change-opacity"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.75) 100%)'
          }}
        />

        {/* 0. INITIAL MINIMAL LUXURY INTRO */}
        <div ref={text0Ref} className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6 will-change-transform">
          <div className="flex flex-col items-center justify-center gap-8 md:gap-12 mt-10">
            <h1 
              className="text-white font-display font-extrabold text-4xl md:text-6xl uppercase tracking-[-0.03em] leading-tight md:leading-snug max-w-5xl mx-auto"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)', perspective: '1000px' }}
            >
              <span className="inline-block line1-exit will-change-transform">
                {"Innovative Interior".split(' ').map((word, i, arr) => (
                  <span key={`l1-${i}`}>
                    {renderAnimatedWord(word, i)}
                    {i !== arr.length - 1 && <span className="inline-block w-[0.5em]">&nbsp;</span>}
                  </span>
                ))}
              </span>
              <br className="hidden md:block" />
              <span className="inline-block w-[0.5em] md:hidden">&nbsp;</span>
              <span className="inline-block line2-exit will-change-transform">
                {"& Exterior Solutions".split(' ').map((word, i, arr) => (
                  <span key={`l2-${i}`}>
                    {renderAnimatedWord(word, i)}
                    {i !== arr.length - 1 && <span className="inline-block w-[0.5em]">&nbsp;</span>}
                  </span>
                ))}
              </span>
            </h1>
            
            <p 
              className="text-white/95 font-serif italic text-xl md:text-[22px] font-medium service-list-exit will-change-opacity mt-4 md:mt-6 max-w-2xl mx-auto"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Every extraordinary transformation begins with a single vision.
            </p>
          </div>
        </div>

        {/* 1. SCROLL SECTION 1 (LEFT) */}
        <div ref={text1Ref} className="absolute inset-0 z-20 pointer-events-none flex flex-col items-start justify-center pl-8 md:pl-16 lg:pr-8 lg:pl-32 opacity-0 will-change-transform">
          <div className="w-[320px] md:w-[480px] text-left">
            <h2 
              className="font-display font-extrabold text-2xl md:text-4xl leading-tight mb-5 text-white uppercase tracking-[-0.02em]"
              style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
            >
              Innovative Interior<br />& Exterior Solutions
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mb-5 drop-shadow-lg mr-auto ml-0" />
            <p 
              className="text-white text-base md:text-lg font-serif italic font-medium leading-relaxed"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              From concept to completion, we transform spaces into timeless interiors and exteriors defined by exceptional craftsmanship. Every project is thoughtfully designed to reflect elegance, functionality, and lasting value.
            </p>
          </div>
        </div>

        {/* 2. SCROLL SECTION 2 (RIGHT) */}
        <div ref={text2Ref} className="absolute inset-0 z-20 pointer-events-none flex flex-col items-end justify-center pr-8 md:pr-16 lg:pr-32 opacity-0 will-change-transform">
          <div className="w-[320px] md:w-[480px] text-left">
            <h2 
              className="font-display font-extrabold text-2xl md:text-4xl leading-tight mb-5 text-white uppercase tracking-[-0.02em]"
              style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
            >
              Designed For Life<br />Built To Last
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mb-5 drop-shadow-lg mr-auto ml-0" />
            <p 
              className="text-white text-base md:text-lg font-serif italic font-medium leading-relaxed mb-8"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              Every detail is thoughtfully crafted to create timeless interiors and exteriors that combine elegance, comfort, and lasting quality.
            </p>
            
            <button 
              onClick={() => {
                const el = document.getElementById('services') || document.querySelector('[data-section="services"]');
                if(el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              }}
              className="pointer-events-auto inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-white font-semibold text-[13px] tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, var(--color-orange, #f97316), var(--color-orange-sec, #ea580c))',
                boxShadow: '0 8px 32px rgba(249,115,22,0.4)',
              }}
            >
              Explore Our Services
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none will-change-transform">
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">Scroll to Explore</span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div ref={scrollBounceRef} className="w-1 h-2 rounded-full bg-white/60 will-change-transform" />
          </div>
        </div>
      </div>
    </section>
  )
}

