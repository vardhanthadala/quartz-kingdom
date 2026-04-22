'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';

const ProductsSection = dynamic(() => import('@/components/ProductsSection'));
const AboutIntroSection = dynamic(() => import('@/components/AboutIntroSection'));
const VisionMissionSection = dynamic(() => import('@/components/VisionMissionSection'));
const StatsSection = dynamic(() => import('@/components/StatsSection'));
const SectionDivider = dynamic(() => import('@/components/SectionDivider'));
const Footer = dynamic(() => import('@/components/Footer'));
const Navbar = dynamic(() => import('@/components/Navbar'));

export default function Home() {
  const containerRef = useRef(null);
  const topImageRef = useRef(null);
  const introContentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Global Smooth Scroll (Lenis) for Premium Feel synced perfectly with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis perfectly with GSAP ticker using a named function reference
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
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isTablet: "(min-width: 641px) and (max-width: 1023px)",
      isMobile: "(max-width: 640px)"
    }, (context) => {
      let { isMobile, isTablet } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nav = document.getElementById('main-nav');
            if (!nav) return;
            // hero-1 fades over first 50% of the scrub → show nav as soon as hero-2 is dominant
            if (self.progress >= 0.5) {
              nav.style.opacity = '1';
              nav.style.pointerEvents = 'auto';
              nav.classList.add('nav-light');
            } else {
              nav.style.opacity = '';
              nav.style.pointerEvents = '';
              nav.classList.remove('nav-light');
            }
          },
          onLeave: () => {
            const nav = document.getElementById('main-nav');
            if (!nav) return;
            nav.style.opacity = '1';
            nav.style.pointerEvents = 'auto';
            nav.classList.add('nav-light');
          },
        },
      });

      // Zoom front image towards the camera and fade it out
      tl.to(topImageRef.current, {
        scale: 3,
        z: 350,
        opacity: 0,
        transformOrigin: "center center",
        ease: "none",
        duration: 1,
        force3D: true,
      }, 0);

      // Same for the intro content (Quartz text)
      tl.to(introContentRef.current, {
        scale: 2.5,
        opacity: 0,
        transformOrigin: "center center",
        ease: "none",
        duration: 1,
        force3D: true,
      }, 0);

      // Very subtle zoom in on the background hero matching reference
      tl.to(
        heroSectionRef.current,
        {
          scale: 1.1,
          transformOrigin: "center center",
          ease: "none",
          duration: 1,
          force3D: true,
        },
        0
      );

      tl.fromTo(
        titleRef.current,
        {
          y: 150,
          opacity: 0,
          skewY: 4,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          ease: 'expo.out'
        },
        "-=0.5"
      );

      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        },
        "-=0.7"
      );


      return () => { };
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <div className="bg-[#020202] text-white selection:bg-black selection:text-white font-main leading-relaxed antialiased overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <Navbar threshold={1000} initialHidden={true} />

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <section
            ref={heroSectionRef}
            className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 will-change-transform bg-black overflow-hidden"
          >

            {/* Using next/image for hero_updated2 instead of css bg-image for smoother scale transforms on mobile */}
            <Image
              src="/hero_updated2.jpeg"
              alt="Hero Background"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            {/* No overlay as per user request */}

            <div className="relative z-10 py-4 w-full px-4 max-w-5xl mx-auto flex flex-col items-center">
              <h1
                ref={titleRef}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[108px] font-serif font-light text-white leading-[1] tracking-tight break-words w-full drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
              >
                Delivering <span className="italic font-medium">High-Grade</span> <br />
                <span className="opacity-80">Industrial Minerals</span> <br />
                <span className="italic font-medium">& Quartz</span>
              </h1>
            </div>

            <div className="relative z-10 overflow-hidden px-4">
              <p
                ref={descRef}
                className="mt-8 md:mt-10 text-white/40 text-[8px] md:text-[10px] max-w-xl font-medium uppercase tracking-[0.6em] font-main"
              >
                Precision Processed • Global Standards Since 1998
              </p>
            </div>

            <div className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-6">
              <div className="w-[1px] h-12 md:h-24 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </section>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden origin-center">
          <Image
            ref={topImageRef}
            src="/hero_updated1.png"
            alt="Intro"
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover md:object-center origin-center will-change-transform"
          />
          {/* Absolute overlay removed as per user request */}
          <div className="absolute inset-0 bg-transparent pointer-events-none" />

          <div
            ref={introContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center origin-center px-6 will-change-transform"
          >
            <div className="w-full h-full relative max-w-[1400px] mx-auto">
              <div className="absolute top-[15%] xxs:top-[3%] xs:top-[3%] left-[8%] md:top-[25%] md:left-[10%] hero-title">
                <span className="block text-3xl md:text-[2.5rem] lg:text-5xl xl:text-[144px] font-serif font-medium tracking-tighter leading-none drop-shadow-2xl text-white">
                  Quartz
                </span>
              </div>
              <div className="absolute top-[15%] xxs:top-[3%] xs:top-[3%] left-[52%] md:top-[25%] md:left-[70%] hero-title">
                <span className="block text-3xl md:text-[2.5rem] lg:text-5xl xl:text-[144px] font-serif font-medium tracking-tighter leading-none drop-shadow-2xl text-white">
                  Kingdom
                </span>
              </div>


            </div>
          </div>
        </div>
      </div>

      <AboutIntroSection />
      <VisionMissionSection />
      <StatsSection />
      <SectionDivider />
      <ProductsSection />
      <Footer />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        
        body {
          scrollbar-width: none;
          background: #000;
          overflow-x: hidden;
          font-family: var(--font-poppins), sans-serif;
        }
        
        .font-display { font-family: var(--font-poppins), sans-serif; }
        .font-serif { font-family: var(--font-poppins), sans-serif; }
        .font-main { font-family: var(--font-poppins), sans-serif; }

        ::selection { background: #000; color: #fff; }

        #main-nav {
          color: #ffffff;
        }
        #main-nav .nav-logo-img {
          filter: none;
        }
        #main-nav .nav-links a {
          color: #ffffff;
        }

        .nav-light {
          color: #000000 !important;
        }
        .nav-light .nav-logo-img {
          filter: brightness(0) !important;
        }
        .nav-light .nav-links a {
          color: #000000 !important;
        }

        /* Hero_updated1 Mobile Responsiveness */
        @media (max-width: 425px) {
          .hero-tagline {
            font-size: 1.5rem !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center !important;
            bottom: auto !important;
            right: auto !important;
            max-width: 250px !important;
          }
        }

        @media (max-width: 375px) {
          .hero-tagline {
            font-size: 1.25rem !important;
          }
        }

        @media (max-width: 320px) {
          .hero-tagline {
            font-size: 1.1rem !important;
          }
        }

        /* Medium (Tablet) Responsiveness */
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-tagline {
            font-size: 3.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}