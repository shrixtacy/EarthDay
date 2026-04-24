'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PledgeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pledge: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    // Form animation
    gsap.fromTo(
      form,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', pledge: '' });
        }, 5000);
      }
    } catch (err) {
      console.error('Error submitting pledge:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #1a1a1d 0%, #2a2a2d 50%, #1a1a1d 100%)',
      }}
    >
      <div ref={formRef} className="w-full max-w-2xl">
        <h2 className="font-playfair editorial-heading text-6xl md:text-8xl text-off-white text-center mb-4">
          Take the Pledge
        </h2>
        <p className="font-montserrat text-base md:text-lg text-muted-lavender text-center mb-12 font-light">
          Join us in protecting our planet for future generations
        </p>

        {!isMounted ? (
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <div className="text-white/50">Loading form...</div>
          </div>
        ) : !submitted ? (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-12">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block font-montserrat text-off-white/90 mb-2 text-sm uppercase tracking-wide"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-montserrat text-off-white/90 mb-2 text-sm uppercase tracking-wide"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="pledge"
                className="block font-montserrat text-off-white/90 mb-2 text-sm uppercase tracking-wide"
              >
                What will you do to protect Earth today?
              </label>
              <textarea
                id="pledge"
                name="pledge"
                value={formData.pledge}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Share your commitment..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-sage-green/20 hover:bg-sage-green/30 border border-sage-green/40 rounded-lg text-off-white font-montserrat font-medium text-base uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Take the Pledge
            </button>
          </form>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="font-playfair text-4xl text-off-white mb-2">
              Thank You!
            </h3>
            <p className="font-montserrat text-muted-lavender font-light">
              Your pledge has been recorded. Together, we can make a difference.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
