'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhaleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const text = textRef.current;

    if (!section || !bg || !text) return;

    // Slow zoom on background
    gsap.fromTo(
      bg,
      { scale: 1 },
      {
        scale: 1.15,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    // Text animation - fade and scale
    gsap.fromTo(
      text,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
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
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/images/whale.webp)',
        }}
      />

      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative h-full flex items-center justify-center z-10">
        <div className="text-center">
          <p className="font-montserrat editorial-subheading text-sage-green text-sm md:text-base mb-8 tracking-widest">
            CELEBRATE
          </p>
          <h1
            ref={textRef}
            className="font-playfair editorial-heading text-8xl md:text-[12rem] lg:text-[16rem] text-off-white/40 px-6"
          >
            Earth Day
          </h1>
        </div>
      </div>
    </section>
  );
}
