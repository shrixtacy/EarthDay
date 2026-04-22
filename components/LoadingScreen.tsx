'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setIsLoading(false), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 bg-charcoal z-[100] flex items-center justify-center transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-muted-lavender/20 border-t-muted-lavender rounded-full animate-spin mx-auto" />
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl text-off-white mb-2">
          Loading Experience
        </h2>
        <p className="font-montserrat text-muted-lavender/80 text-sm tracking-wide">
          Preparing your journey through Earth...
        </p>
      </div>
    </div>
  );
}
