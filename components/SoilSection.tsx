'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SoilSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const text = textRef.current;

    if (!section || !bg || !text) return;

    // Parallax background
    gsap.to(bg, {
      y: -100,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Text animation - slide from right
    gsap.fromTo(
      text,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-[150vh] w-full overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/images/soil.jpeg)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-l from-charcoal/70 to-transparent" />

      <div className="relative h-full flex items-center justify-end z-10">
        <div ref={textRef} className="w-full md:w-2/3 lg:w-1/2 px-8 md:px-16 text-right">
          <p className="font-montserrat editorial-subheading text-sage-green text-xs md:text-sm mb-4 tracking-widest">
            BENEATH OUR FEET
          </p>
          <h2 className="font-playfair editorial-heading text-7xl md:text-8xl lg:text-9xl text-off-white mb-6">
            Earth
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-off-white/75 leading-relaxed font-light">
            Foundation of life, rich and fertile,
            <br />
            Where seeds become forests, and hope takes root.
          </p>
        </div>
      </div>
    </section>
  );
}
