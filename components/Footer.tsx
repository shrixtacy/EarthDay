'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const text = textRef.current;

    if (!footer || !text) return;

    // Text fade-in animation
    gsap.fromTo(
      text,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footer,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === footer) t.kill();
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative h-screen w-full flex items-center justify-center bg-charcoal"
    >
      <div ref={textRef} className="text-center px-6">
        <p className="font-montserrat editorial-subheading text-sage-green text-sm mb-8 tracking-widest">
          AN INITIATIVE BY
        </p>
        <h1 className="font-playfair editorial-heading text-7xl md:text-9xl lg:text-[12rem] text-off-white">
          Elixios
        </h1>
        <div className="mt-12 text-muted-lavender font-montserrat text-xs tracking-wider">
          © 2026 Elixios. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
