'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 right-0 w-1 h-full bg-charcoal/50 z-50">
      <div
        ref={progressRef}
        className="w-full h-full bg-gradient-to-b from-muted-lavender via-sage-green to-muted-lavender origin-top"
        style={{ transform: 'scaleY(0)' }}
      />
    </div>
  );
}
