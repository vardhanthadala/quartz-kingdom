'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';

export default function Home() {
  const containerRef = useRef(null);
  const topImageRef = useRef(null);
  const introContentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Global Smooth Scroll (Lenis) for Premium Feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
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
          end: '+=280%',
          pin: true,
          scrub: 2,
          anticipatePin: 1,
        },
      });

      tl.to(topImageRef.current, {
        scale: isMobile ? 12 : isTablet ? 15 : 20,
        opacity: 0,
        rotate: isMobile ? 0 : 5,
        filter: 'blur(8px)',
        ease: 'power2.inOut',
        duration: 1,
        force3D: true,
      }, 0);

      tl.to(introContentRef.current, {
        scale: isMobile ? 10 : isTablet ? 12 : 15,
        opacity: 0,
        filter: 'blur(5px)',
        ease: 'power2.inOut',
        duration: 1,
        force3D: true,
      }, 0.05);

      tl.to(
        heroSectionRef.current,
        {
          scale: 1,
          borderRadius: '0px',
          opacity: 1,
          ease: 'power3.inOut',
          duration: 1,
        },
        0.1
      );

      tl.fromTo(
        titleRef.current,
        {
          y: 150,
          opacity: 0,
          skewY: 4,
          filter: 'blur(8px)'
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          filter: 'blur(0px)',
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

      // Navbar theme switch - using global selector since it's outside this container's scope
      ScrollTrigger.create({
        trigger: "#about-us",
        start: "top 10%",
        onEnter: () => {
          document.getElementById('main-nav')?.classList.add('nav-light');
        },
        onLeaveBack: () => {
          document.getElementById('main-nav')?.classList.remove('nav-light');
        }
      });

      return () => { };
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <div className="bg-[#020202] text-white selection:bg-black selection:text-white font-main leading-relaxed antialiased overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <nav id="main-nav" className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-[100] pointer-events-auto transition-colors duration-500 text-white">
        <Link href="/" className="group">
          <img
            src="/logo-2.png"
            alt="Quartz Logo"
            className="h-10 md:h-14 w-auto object-contain transition-all duration-500 nav-logo-img"
          />
        </Link>
        <div className="flex gap-8 items-center nav-links">
          <Link href="/our-products" className="text-xs uppercase tracking-[0.2em] font-bold hover:opacity-60 transition-opacity text-white">Products</Link>
          <Link href="/about-us" className="text-xs uppercase tracking-[0.2em] font-bold hover:opacity-60 transition-opacity text-white">About</Link>
        </div>
      </nav>

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <section
            ref={heroSectionRef}
            className="opacity-0 scale-[0.15] rounded-full relative w-full h-full bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center text-center px-4"
            style={{ backgroundImage: `url('/hero-2.png')` }}
          >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 py-4 w-full px-4 max-w-5xl mx-auto flex flex-col items-center">
              <h1
                ref={titleRef}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1] tracking-tight break-words w-full"
              >
                Delivering <span className="italic font-bold">High-Grade</span> <br />
                <span className="opacity-80">Industrial Minerals</span> <br />
                <span className="italic font-bold">& Quartz</span>
              </h1>
            </div>

            <div className="relative z-10 overflow-hidden px-4">
              <p
                ref={descRef}
                className="mt-8 md:mt-10 text-white/40 text-[8px] md:text-[10px] max-w-xl font-bold uppercase tracking-[0.6em] font-main"
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
          <img
            ref={topImageRef}
            src="/hero-1.png"
            alt="Intro"
            className="w-full h-full object-cover md:object-center origin-center grayscale brightness-[0.7] will-change-transform"
          />

          <div
            ref={introContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center origin-center px-6 will-change-transform"
          >
            <div className="w-full h-full relative max-w-[1400px] mx-auto">
              <div className="absolute top-[22%] left-[5%] md:top-[25%] md:left-[10%] hero-title">
                <span className="block text-6xl md:text-[11rem] font-serif font-black tracking-tighter leading-none drop-shadow-2xl">
                  Quartz
                </span>
              </div>

              <div className="absolute bottom-[22%] right-[5%] md:bottom-[25%] md:right-[10%] text-right max-w-[280px] md:max-w-md hero-tagline">
                <span className="block text-2xl md:text-5xl font-serif font-light italic leading-tight opacity-90 tracking-tight drop-shadow-xl">
                  holds the language of light
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <ProductsSection />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,300;1,700&family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
        
        ::-webkit-scrollbar { display: none; }
        
        body {
          scrollbar-width: none;
          background: #000;
          overflow-x: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-main { font-family: 'Plus Jakarta Sans', sans-serif; }

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
          filter: invert(1) brightness(0);
        }
        .nav-light .nav-links a {
          color: #000000 !important;
        }

        /* Hero-1 Mobile Responsiveness */
        @media (max-width: 425px) {
          .hero-title {
            font-size: 4rem !important;
            top: 25% !important;
          }
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
          .hero-title {
            font-size: 3.5rem !important;
          }
          .hero-tagline {
            font-size: 1.25rem !important;
          }
        }

        @media (max-width: 320px) {
          .hero-title {
            font-size: 3rem !important;
            top: 28% !important;
          }
          .hero-tagline {
            font-size: 1.1rem !important;
          }
        }

        /* Medium (Tablet) Responsiveness */
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-title {
            font-size: 8rem !important;
          }
          .hero-tagline {
            font-size: 3.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}