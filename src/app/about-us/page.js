'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('@/components/AboutSection'));

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

      <nav id="main-nav" className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-[100] pointer-events-auto transition-colors duration-500 text-white">
        <Link href="/" className="group">
          <Image
            src="/logo-2.png"
            alt="Quartz Logo"
            width={120}
            height={40}
            priority
            className="h-10 md:h-14 w-auto object-contain transition-all duration-500 nav-logo-img"
          />
        </Link>
        <div className="flex gap-8 items-center nav-links">
          <Link href="/our-products" className="text-xs uppercase tracking-[0.2em] font-bold hover:opacity-60 transition-opacity text-white">Products</Link>
          <Link href="/about-us" className="text-xs uppercase tracking-[0.2em] font-bold hover:opacity-60 transition-opacity border-b border-black md:border-transparent text-white">About</Link>
        </div>
      </nav>

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

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        body { scrollbar-width: none; background: #fff; overflow-x: hidden; font-family: var(--font-plus-jakarta-sans), sans-serif; }
        .font-display { font-family: var(--font-syne), sans-serif; }
        .font-serif { font-family: var(--font-cormorant-garamond), serif; }
        .font-main { font-family: var(--font-plus-jakarta-sans), sans-serif; }

        #main-nav { color: #ffffff; }
        #main-nav .nav-logo-img { filter: none; }
        #main-nav .nav-links a { color: #ffffff; }

        .nav-light { color: #000000 !important; }
        .nav-light .nav-logo-img { filter: invert(1) brightness(0); }
        .nav-light .nav-links a { color: #000000 !important; }
      `}</style>
    </div>
  );
}
