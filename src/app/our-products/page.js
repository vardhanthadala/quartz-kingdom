'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = dynamic(() => import('@/components/Footer'));
const Navbar = dynamic(() => import('@/components/Navbar'));

const productsData = [
  {
    id: '01',
    name: 'Mica Quartz',
    grade: 'A1 Grade',
    description: 'Our Mica Quartz is of A1 Grade quality, known for its exceptional purity and performance. Highly sought after for thermal and electrical insulation, perfect for use in electronics, ceramics, and other specialized industries.',
    pills: ['Thermal Insulation', 'Electrical Grade'],
    bg: '#f0faf6',
    image: '/products/product1.jpg'
  },
  {
    id: '02',
    name: 'Quartz Granular',
    grade: 'A1 Grade',
    description: 'Meticulously processed to ensure consistent granule size and purity. Widely used in applications requiring high strength and durability, such as construction, glass manufacturing, and water filtration systems.',
    pills: ['High Durability', 'Water Filtration'],
    bg: '#f0f7ff',
    image: '/products/product2.jpg'
  },
  {
    id: '03',
    name: 'Quartz Glassy',
    grade: 'A1 Grade',
    description: 'Distinguished by brilliant transparency and high purity levels. Essential for applications demanding exceptional clarity and chemical inertness, such as optical devices, high-performance glass, and laboratory equipment.',
    pills: ['Optical Grade', 'Chemical Inert'],
    bg: '#f5fff8',
    image: '/products/product3.jpg'
  },
  {
    id: '04',
    name: 'Quartz Powder',
    grade: 'B Grade',
    description: 'A versatile product suitable for various industrial uses. Widely utilized in the manufacturing of paints, coatings, adhesives, and ceramics. Offers excellent consistency and performance at scale.',
    pills: ['Multi-Industry', 'Cost Effective'],
    bg: '#fff8f0',
    image: '/products/product4.jpg'
  },
  {
    id: '05',
    name: 'Black Galaxy Granite',
    grade: 'Industrial',
    description: 'A versatile granite product suitable for various industrial uses where high purity is not a critical factor. Available in Golden Spark big size 180cm–300cm and small size 100cm–180cm.',
    pills: ['100–300cm Sizes', 'Golden Spark'],
    bg: '#1a1a1a', 
    isDark: true,
    image: '/products/product5.jpg'
  }
];

export default function ProductsPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const canvasRef = useRef(null);
  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const updateLenis = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.y -= this.speedY;
        if (this.y < -10) this.y = canvas.height + 10;
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) particles.push(new Particle());
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };
    resize();
    init();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useGSAP(() => {
    const heroTl = gsap.timeline();
    heroTl.from('.hero-label', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.hero-title span', { y: 100, stagger: 0.1, duration: 1.2, ease: 'expo.out' }, '-=0.5')
      .from('.hero-sub', { opacity: 0, scale: 0.95, duration: 1 }, '-=0.8')
      .from('.hero-cta', { opacity: 0, y: 20, duration: 1 }, '-=0.5');

    gsap.to('.hero-bg-img', {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(heroRef.current, {
      scale: 0.85,
      opacity: 0.8,
      borderRadius: '40px',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        const leftPanel = section.querySelector('.product-left');
        const img = leftPanel.querySelector('img');
        const rightPanel = section.querySelector('.product-right');
        const ghostNum = section.querySelector('.ghost-num');
        const lines = rightPanel.querySelectorAll('.animate-line');
        const pills = rightPanel.querySelectorAll('.stat-pill');

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
            onToggle: self => self.isActive && setActiveSegment(index + 1)
          }
        });

        sectionTl.fromTo(img,
          { scale: 1.25, clipPath: 'inset(0 100% 0 0)' },
          { scale: 1, clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'power2.inOut' }
        )
          .from(ghostNum, { x: 50, opacity: 0, duration: 1 }, '-=1')
          .from(lines, { y: 60, opacity: 0, stagger: 0.15, duration: 1 }, '-=1.2')
          .from(pills, { x: -30, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.8');
      });

      gsap.to('.progress-line-fill', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.products-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    });

    // Mobile fallback animations
    mm.add("(max-width: 1024px)", () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.from(section.querySelectorAll('.animate-line'), {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%'
          }
        });
      });
    });

    gsap.from('.outro-band', {
      y: 80,
      opacity: 0,
      scrollTrigger: {
        trigger: '.outro-band',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: containerRef });

  const scrollToSection = (index) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: sectionsRef.current[index].offsetTop,
      ease: 'power3.inOut'
    });
  };

  return (
    <div ref={containerRef} className="bg-white selection:bg-[#1D9E75] selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F2027] z-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_updated1.png"
            alt="Premium Texture"
            fill
            priority
            className="hero-bg-img object-cover opacity-100 transition-transform duration-100 ease-out"
          />
          <div className="absolute inset-0 bg-transparent z-1" />
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="hero-label block text-[#9FE1CB] text-xs font-medium tracking-[0.4em] mb-6 uppercase">
            — OUR PRODUCTS
          </span>
          <h1 className="hero-title text-white text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tighter uppercase">
            <span className="inline-block overflow-hidden">PURE </span>
            <span className="inline-block italic text-transparent stroke-text">QUARTZ.</span>
          </h1>
          <p className="hero-sub text-white/60 text-lg md:text-xl mt-8 font-light max-w-xl mx-auto">
            Sourced from nature. Engineered for excellence.
          </p>
          <div className="hero-cta mt-12">
            <button className="group relative bg-[#1D9E75] text-white px-8 py-4 rounded-full font-medium uppercase tracking-widest text-[10px] transition-all hover:bg-[#158060] overflow-hidden">
              <span className="relative z-10">Explore Products ↓</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute -inset-1 rounded-full border border-[#1D9E75] opacity-0 group-hover:opacity-100 animate-pulse" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* PRODUCTS CONTAINER */}
      <div className="products-container relative bg-white">
        {productsData.map((prod, idx) => (
          <section
            key={prod.id}
            ref={el => sectionsRef.current[idx] = el}
            className="relative lg:h-screen w-full flex flex-col lg:flex-row overflow-hidden border-b border-slate-100 lg:border-none"
          >
            <div className="product-left w-full lg:w-[45%] h-[50vh] lg:h-[80vh] lg:my-[10vh] lg:ml-10 relative overflow-hidden bg-slate-50 pt-20 shadow-2xl rounded-3xl">
              <Image 
                src={prod.image} 
                alt={prod.name} 
                fill 
                className="object-cover" 
                quality={100}
                priority
                sizes="100vw"
              />
            </div>

            <div
              className={`product-right w-full lg:w-[50%] flex items-center justify-center p-8 md:p-20 lg:p-32 pt-32 lg:pt-0 relative transition-colors duration-1000 lg:h-[80vh] lg:my-[10vh] lg:mr-10 shadow-xl rounded-3xl`}
              style={{ backgroundColor: prod.bg, color: prod.isDark ? 'white' : '#1a1a1a' }}
            >
              <div className={`ghost-num absolute top-[5%] right-[10%] text-[8rem] md:text-[12rem] lg:text-[18rem] font-bold select-none pointer-events-none transition-opacity duration-1000 ${prod.isDark ? 'text-white opacity-[0.03]' : 'text-[#1D9E75] opacity-[0.06]'}`}>
                {prod.id}
              </div>

              <div className="relative z-10 w-full max-w-lg">
                <span className="animate-line block text-[#1D9E75] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  — {prod.grade}
                </span>
                <h2 className="animate-line text-4xl md:text-5xl font-bold leading-tight tracking-tighter mb-6">
                  {prod.name}
                </h2>
                <p className={`animate-line text-sm md:text-base mb-10 leading-relaxed font-light ${prod.isDark ? 'text-white/70' : 'text-[#555555]'}`}>
                  {prod.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  {prod.pills.map((pill, pIdx) => (
                    <div key={pIdx} className={`stat-pill px-5 py-2 rounded-full text-[9px] uppercase font-bold tracking-widest border ${prod.isDark ? 'border-white/20 bg-white/5' : 'border-black/5 bg-black/5 text-[#555555]'}`}>
                      {pill}
                    </div>
                  ))}
                </div>

                <button className={`animate-line flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest group transition-all`}>
                  <span className={prod.isDark ? 'text-[#9FE1CB]' : 'text-[#1D9E75]'}>Request a Quote</span>
                  <ArrowRight size={14} className={`transition-transform group-hover:translate-x-2 ${prod.isDark ? 'text-[#9FE1CB]' : 'text-[#1D9E75]'}`} />
                </button>
              </div>
            </div>
          </section>
        ))}

        {/* PROGRESS INDICATOR (Desktop Only) */}
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-[101] flex-col items-center gap-6">
          <div className="relative w-[2px] h-40 bg-slate-100 overflow-hidden">
            <div className="progress-line-fill absolute top-0 left-0 w-full h-0 bg-[#1D9E75]" />
          </div>
          <div className="flex flex-col gap-5">
            {productsData.map((p, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(i)}
                className={`group relative w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${activeSegment === i + 1 ? 'border-[#1D9E75] bg-[#1D9E75] scale-125' : 'border-slate-200 bg-white hover:border-[#1D9E75]'
                  }`}
              >
                <span className="absolute right-8 top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white text-[9px] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest font-bold">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OUTRO SECTION */}
      <section className="bg-[#0F2027] py-24 md:py-40 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 outro-band">
          <p className="mt-8 text-white/50 text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-medium">Purity • Precision • Performance</p>
          <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-12">
            Ready to source premium quartz?
          </h3>
          <Link href="/contact" className="inline-flex items-center gap-6 text-[#1D9E75] text-xs font-bold uppercase tracking-[0.3em] group transition-all">
            Contact Us <ArrowRight size={18} className="transition-transform group-hover:translate-x-4" />
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1D9E75]/5 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      <Footer />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        @media (max-width: 1024px) {
          .products-container { scroll-behavior: smooth; }
        }
      `}</style>
    </div>
  );
}
