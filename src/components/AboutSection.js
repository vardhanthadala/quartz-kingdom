'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HOVER_COLORS = ['#1D9E75', '#38bdf8', '#4ade80', '#9FE1CB', '#2DD4BF', '#0EA5E9'];

export default function AboutSection() {
  const statsRef = useRef(null);
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);

  const mainSentance = "Since 1998, Quartz has been at the forefront of industrial mineral processing, bridging the gap between raw earth and high-performance technology.";

  useGSAP(() => {
    // Word reveal animation for the big paragraph
    const words = gsap.utils.toArray('.word-reveal');
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftTextRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        }
      }
    );

    // Stats counter animation
    gsap.utils.toArray('.stat-count').forEach((stat) => {
      const targetValue = parseFloat(stat.getAttribute('data-target'));
      gsap.fromTo(
        stat,
        { textContent: targetValue - 10 },
        {
          textContent: targetValue,
          duration: 2.5,
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

  const handleCharMouseEnter = (e) => {
    const randomColor = HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];
    e.target.style.color = randomColor;
  };

  const handleCharMouseLeave = (e) => {
    e.target.style.color = 'inherit';
  };

  return (
    <section
      id="about-us"
      ref={containerRef}
      className="relative pt-24 pb-20 md:pt-40 md:pb-40 px-6 md:px-12 bg-white text-[#0f172a] border-t border-slate-100 selection:bg-[#1D9E75] selection:text-white"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_top_right,#e0f2fe_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#f0fdf4_0%,transparent_50%)]"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-20 md:gap-32 items-start">

          <div ref={leftTextRef} className="w-full xl:w-[70%]">
            <h2 className="text-xs uppercase tracking-[0.6em] text-[#1D9E75] font-bold mb-10">— WHO WE ARE</h2>
            <div className="text-4xl md:text-6xl lg:text-7xl xl:text-[85px] font-serif font-light leading-[1.15] text-balance tracking-tighter">
              {mainSentance.split(" ").map((word, i) => (
                <span key={i} className="word-reveal inline-block mr-[0.3em]">
                  {word.split("").map((char, ci) => (
                    <span
                      key={ci}
                      onMouseEnter={handleCharMouseEnter}
                      onMouseLeave={handleCharMouseLeave}
                      className="inline transition-colors duration-300 cursor-default"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-16 w-full xl:w-[30%] xl:pt-24">
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed border-l-2 border-[#1D9E75]/20 pl-8">
              We specialize in the extraction and refinement of premium quartz and silica, serving global industries ranging from semiconductor manufacturing to high-end architectural surfaces. Our commitment to purity is unmatched.
            </p>

            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-8">
              <div className="stat-item group">
                <span className="block text-5xl md:text-7xl font-sans font-medium leading-none mb-3 text-[#0f172a] flex items-baseline">
                  <span className="stat-count" data-target="25">15</span>
                  <span className="text-[#1D9E75] ml-1 group-hover:translate-y-[-5px] transition-transform">+</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400">Years Heritage</span>
              </div>
              <div className="stat-item group">
                <span className="block text-5xl md:text-7xl font-sans font-medium leading-none mb-3 text-[#0f172a] flex items-baseline">
                  <span className="stat-count" data-target="40">30</span>
                  <span className="text-[#1D9E75] ml-1 group-hover:translate-y-[-5px] transition-transform">+</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400">Global Sales</span>
              </div>
              <div className="stat-item group">
                <span className="block text-5xl md:text-7xl font-sans font-medium leading-none mb-3 text-[#0f172a] flex items-baseline">
                  <span className="stat-count" data-target="99.9">89.9</span>
                  <span className="text-[#1D9E75] ml-1 group-hover:translate-y-[-5px] transition-transform">%</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400">Purity Level</span>
              </div>
              <div className="stat-item group">
                <span className="block text-5xl md:text-7xl font-sans font-medium leading-none mb-3 text-[#0f172a] flex items-baseline">
                  <span className="stat-count" data-target="12">2</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400">Active Sites</span>
              </div>
            </div>

            <div className="mt-4">
              <Link href="/about-us" className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.6em] text-[#1D9E75]">
                <span>Our Heritage</span>
                <div className="w-12 h-[1px] bg-[#1D9E75] group-hover:w-20 transition-all duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
