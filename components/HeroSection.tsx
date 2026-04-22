'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const section = sectionRef.current;
    const video = videoRef.current;
    const text = textRef.current;

    if (!section || !video || !text) return;

    // Load video metadata first
    video.load();
    
    const onLoadedMetadata = () => {
      // Video scroll scrubbing - frame by frame
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        pin: false,
        onUpdate: (self) => {
          if (video.duration) {
            const targetTime = video.duration * self.progress;
            video.currentTime = targetTime;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    // Text animation
    gsap.fromTo(
      text,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'center top',
          scrub: 1,
        },
      }
    );

    // Zoom effect
    gsap.to(video, {
      scale: 1.2,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden grain-overlay"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/videos/earth-hero.mp4"
        muted
        playsInline
        preload="auto"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/80" />
    </section>
  );
}
