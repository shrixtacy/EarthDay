'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function IntroHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const earth = earthRef.current;

    if (!section || !content || !earth) return;

    // Fade out text content as we scroll
    gsap.to(content, {
      opacity: 0,
      y: -100,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Earth: scale down and move up as we scroll away
    gsap.to(earth, {
      scale: 0.15,
      y: '-120%',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '80% top',
        scrub: 3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center bg-charcoal overflow-hidden"
    >
      {/* Layer 1 - Text (behind globe) */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginTop: '-20vh' }}>
        <p className="font-montserrat editorial-subheading text-muted-lavender text-sm md:text-base mb-2 tracking-widest relative z-30">
          THE FUTURE OF
        </p>
        <div className="font-playfair editorial-heading text-off-white leading-none text-center">
          <span className="block text-8xl md:text-[10rem] lg:text-[12rem] relative z-30">Our</span>
          <span className="block text-[7rem] sm:text-[7rem] md:text-[16rem] lg:text-[20rem] relative z-[5] px-4 md:px-0" style={{ marginTop: '-0.2em' }}>Planet</span>
        </div>
      </div>

      {/* Layer 2 - Globe PNG (animates on scroll) */}
      <div
        ref={earthRef}
        className="absolute z-[15]"
        style={{
          top: '58%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110vw',
          pointerEvents: 'none',
          transformOrigin: 'center top',
        }}
      >
        <img
          src="/assets/earth 4.png"
          alt="Earth"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            animation: 'spin 20s linear infinite',
          }}
        />
      </div>

      {/* Layer 3 - Subtitle */}
      <p className="absolute bottom-12 left-0 right-0 text-center font-montserrat text-lg md:text-2xl text-off-white/80 leading-relaxed font-light z-[30]">
        A journey through Earth's most precious ecosystems
      </p>
    </section>
  );
}
