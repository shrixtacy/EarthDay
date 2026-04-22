'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;

    if (!section || !videoContainer || !video) return;

    // Scale up video container from small to full screen
    gsap.fromTo(
      videoContainer,
      {
        scale: 0.3,
        borderRadius: '50%',
      },
      {
        scale: 1,
        borderRadius: '0%',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
          onEnter: () => {
            // Play video when it starts scaling
            video.play().catch(() => {
              // Autoplay might be blocked, that's okay
            });
          },
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-charcoal"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          ref={videoContainerRef}
          className="relative w-full h-full overflow-hidden"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/videos/earth-hero.mp4"
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/20" />
        </div>
      </div>
    </section>
  );
}
