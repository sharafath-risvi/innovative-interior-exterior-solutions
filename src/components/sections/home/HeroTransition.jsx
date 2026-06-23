import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroTransition() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current.children,
        { 
          opacity: 0, 
          y: 20 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Trigger when the top of the section hits 85% down the viewport
            once: true,       // Animate only once
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="bg-white w-full py-8 md:py-10 lg:py-12 flex flex-col items-center justify-center relative z-10"
      aria-label="Transition Section"
    >
      <div 
        ref={containerRef} 
        className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center justify-center"
      >
        {/* Thin Orange Accent Line */}
        <div className="w-12 h-[2px] bg-[#f78701] mb-3 md:mb-4" />
        
        {/* Heading */}
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#111111] uppercase tracking-wider mb-2 md:mb-3 leading-tight">
          Turning Ideas Into Reality
        </h2>
        
        {/* Paragraph */}
        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-[#636363] leading-relaxed max-w-2xl mx-auto">
          From concept sketches to beautifully crafted interiors and exteriors, every project begins with a vision.
        </p>
      </div>
    </section>
  );
}
