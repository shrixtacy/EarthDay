'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroHeroSection from '@/components/IntroHeroSection';
import VideoSection from '@/components/VideoSection';
import SpaceSection from '@/components/SpaceSection';
import SkySection from '@/components/SkySection';
import ForestSection from '@/components/ForestSection';
import SoilSection from '@/components/SoilSection';
import OceanSection from '@/components/OceanSection';
import WhaleSection from '@/components/WhaleSection';
import PledgeSection from '@/components/PledgeSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Initialize Lenis smooth scroll
    const initSmoothScroll = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Connect Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Single RAF loop
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    };

    initSmoothScroll();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <main ref={mainRef} className="relative bg-charcoal">
        <IntroHeroSection />
        <VideoSection />
        <SpaceSection />
        <SkySection />
        <ForestSection />
        <SoilSection />
        <OceanSection />
        <WhaleSection />
        <PledgeSection />
        <Footer />
      </main>
    </>
  );
}
