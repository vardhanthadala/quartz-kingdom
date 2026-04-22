'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutIntroSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useGSAP(() => {
    // Premium Clip-path Reveal for the Image Container
    gsap.fromTo(
      imageWrapperRef.current,
      { clipPath: 'inset(10% 10% 10% 10% round 2rem)', scale: 0.9, opacity: 0 },
      {
        clipPath: 'inset(0% 0% 0% 0% round 1rem)',
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    );

    // Subtle continuous internal parallax, constant scale prevents gaps
    gsap.fromTo(
      imageRef.current,
      { scale: 1.15, yPercent: -5 },
      {
        scale: 1.15,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );

    // Stagger text reveal
    gsap.fromTo(
      '.about-intro-reveal',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="about-us"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#ffffff] text-[#0f172a] py-24 md:py-32 px-4 sm:px-6 lg:px-12 flex items-center justify-center border-t border-slate-100"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left: Image with wrapper for parallax/zoom */}
        <div ref={imageWrapperRef} className="w-full lg:w-1/2 h-[50vh] md:h-[65vh] relative overflow-hidden group rounded-2xl will-change-transform shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <Image
            ref={imageRef}
            src="/about-quartz.png"
            alt="Premium Quartz Rock"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover will-change-transform grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          {/* Crisp overlay accent */}
          <div className="absolute bottom-4 left-4 right-4 z-20 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm" />
            <div className="relative p-4 md:p-6 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
              <span className="text-[#0f172a] text-xs tracking-widest uppercase font-bold drop-shadow-sm">Unrivaled Purity</span>
              <span className="w-8 h-[1px] bg-[#0f172a]/30" />
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="about-intro-reveal mb-6 text-[#0284c7] text-[10px] md:text-xs tracking-[0.4em] font-bold uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#0284c7]/40 inline-block" />
            Welcome to Quartz Kingdom
          </div>

          <h2 className="about-intro-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#0f172a] mb-8 leading-tight tracking-tight">
            About <span className="italic font-bold">Us</span>
          </h2>

          <div className="about-intro-reveal space-y-6 text-slate-600 text-base md:text-lg font-light leading-relaxed mb-12">
            <p>
              Since 1998, Quartz Kingdom has established the global standard for industrial mineral extraction. We are dedicated to delivering pristine quality, merging raw earth with cutting-edge refinement technology.
            </p>
            <p>
              Our process strips away imperfection, unlocking materials essential to the world's most demanding industries—from advanced semiconductor manufacturing to architectural surfaces of unparalleled elegance.
            </p>
          </div>

          <div className="about-intro-reveal">
            <Link
              href="/about-us"
              className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-[#0f172a] hover:bg-[#1e293b] transition-all duration-300 rounded-full overflow-hidden shadow-md hover:shadow-xl"
            >
              <div className="absolute inset-0 w-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] group-hover:w-[200%] transition-all duration-700 ease-out skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
              <span className="relative z-10 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">Know More</span>
              <div className="relative z-10 w-2 h-2 rounded-full bg-[#38bdf8] group-hover:scale-150 group-hover:shadow-[0_0_10px_#38bdf8] transition-all duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
