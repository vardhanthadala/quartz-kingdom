'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('@/components/AboutSection'));
const Footer = dynamic(() => import('@/components/Footer'));
const Navbar = dynamic(() => import('@/components/Navbar'));

export default function AboutUs() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });
    
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateLenis);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".char-reveal",
      { y: 100, opacity: 0, skewY: 7 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo.out',
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white text-[#0f172a] selection:bg-black selection:text-white font-main leading-relaxed antialiased overflow-x-hidden min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <Navbar />

      <section id="hero_updated2" ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image 
            src="/hero_updated2.jpeg" 
            alt="About Hero" 
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover scale-110 will-change-transform" 
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-9xl font-serif font-light leading-none tracking-tighter text-white overflow-hidden">
            <span className="inline-block char-reveal">Our</span> <br />
            <span className="inline-block char-reveal italic font-bold">Legacy</span>
          </h1>
          <p className="mt-8 text-white/50 text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold">Purity • Precision • Performance</p>
        </div>
      </section>

      <AboutSection />
      <Footer />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        body { scrollbar-width: none; background: #fff; overflow-x: hidden; font-family: var(--font-poppins), sans-serif; }
        .font-display { font-family: var(--font-poppins), sans-serif; }
        .font-serif { font-family: var(--font-poppins), sans-serif; }
        .font-main { font-family: var(--font-poppins), sans-serif; }
      `}</style>
    </div>
  );
}
