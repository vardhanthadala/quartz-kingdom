'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

export default function AboutSection() {
  const statsRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade in intro text
    gsap.fromTo(
      ".about-text-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-text-reveal",
          start: "top 85%",
        }
      }
    );

    // Stats counter animation
    gsap.utils.toArray('.stat-count').forEach((stat) => {
      const targetValue = parseFloat(stat.getAttribute('data-target'));
      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: stat.getAttribute('data-target').includes('.') ? 0.1 : 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 95%",
          }
        }
      );
    });

    gsap.fromTo(
      ".stat-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="about-us"
      ref={containerRef}
      className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 bg-white text-[#0f172a] border-t border-slate-100"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_top_right,#e0f2fe_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#f0fdf4_0%,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400 font-bold mb-8">Who We Are</h2>
            <p className="about-text-reveal text-3xl md:text-5xl font-serif font-light leading-snug will-change-transform">
              Since 1998, Quartz has been at the forefront of <span className="italic font-bold text-[#38bdf8]">industrial mineral processing</span>, bridging the gap between raw earth and high-performance technology.
            </p>
          </div>
          
          <div className="flex flex-col gap-12">
            <p className="about-text-reveal text-slate-500 text-lg md:text-xl font-light leading-relaxed will-change-transform">
              We specialize in the extraction and refinement of premium quartz and silica, serving global industries ranging from semiconductor manufacturing to high-end architectural surfaces. Our commitment to purity is unmatched.
            </p>
            
            <div ref={statsRef} className="grid grid-cols-2 gap-8 pt-12 border-t border-slate-100">
              <div className="stat-item will-change-transform">
                <span className="block text-4xl md:text-6xl font-display font-black leading-none mb-2 text-[#0f172a]">
                  <span className="stat-count" data-target="25">25</span>+
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Years of Excellence</span>
              </div>
              <div className="stat-item will-change-transform">
                <span className="block text-4xl md:text-6xl font-display font-black leading-none mb-2 text-[#4ade80]">
                  <span className="stat-count" data-target="40">40</span>+
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Countries Served</span>
              </div>
              <div className="stat-item will-change-transform">
                <span className="block text-4xl md:text-6xl font-display font-black leading-none mb-2 text-[#38bdf8]">
                  <span className="stat-count" data-target="99.9">99.9</span>%
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Quartz Purity</span>
              </div>
              <div className="stat-item will-change-transform">
                <span className="block text-4xl md:text-6xl font-display font-black leading-none mb-2 text-[#0f172a]">
                  <span className="stat-count" data-target="12">12</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Active Mines</span>
              </div>
            </div>

            <div className="mt-8">
                <Link href="/about-us" className="text-xs uppercase tracking-[0.4em] font-bold border-b border-slate-200 pb-2 hover:border-[#38bdf8] transition-colors inline-block">
                    Read our full story
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
