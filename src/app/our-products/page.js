'use client';

import { useRef, useEffect } from 'react';
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
    bg: '#A7867A',
    image: '/products/product1.jpg'
  },
  {
    id: '02',
    name: 'Quartz Granular',
    grade: 'A1 Grade',
    description: 'Meticulously processed to ensure consistent granule size and purity. Widely used in applications requiring high strength and durability, such as construction, glass manufacturing, and water filtration systems.',
    pills: ['High Durability', 'Water Filtration'],
    bg: '#1BAB9D',
    image: '/products/product2.jpg'
  },
  {
    id: '03',
    name: 'Quartz Glassy',
    grade: 'A1 Grade',
    description: 'Distinguished by brilliant transparency and high purity levels. Essential for applications demanding exceptional clarity and chemical inertness, such as optical devices, high-performance glass, and laboratory equipment.',
    pills: ['Optical Grade', 'Chemical Inert'],
    bg: '#306fa7ff',
    image: '/products/product3.jpg'
  },
  {
    id: '04',
    name: 'Quartz Powder',
    grade: 'B Grade',
    description: 'A versatile product suitable for various industrial uses. Widely utilized in the manufacturing of paints, coatings, adhesives, and ceramics. Offers excellent consistency and performance at scale.',
    pills: ['Multi-Industry', 'Cost Effective'],
    bg: '#bb596eff',
    image: '/products/product4.jpg'
  },
  {
    id: '05',
    name: 'Black Galaxy Granite',
    grade: 'Industrial',
    description: 'A versatile granite product suitable for various industrial uses where high purity is not a critical factor. Available in Golden Spark big size 180cm–300cm and small size 100cm–180cm.',
    pills: ['100–300cm Sizes', 'Golden Spark'],
    bg: '#9ad035ff', 
    image: '/products/product5.jpg'
  }
];

export default function ProductsPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  
      smoothWheel: true,
      syncTouch: true
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
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() { this.y -= this.speedY; if (this.y < -10) this.reset(); }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    resize();
    particles = Array.from({ length: 40 }, () => new Particle());
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  useGSAP(() => {
    gsap.timeline()
      .from('.hero-label', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.hero-title span', { y: 100, stagger: 0.1, duration: 1.2, ease: 'expo.out' }, '-=0.5');

    // Unified horizontal scroll for all screen sizes as per user request
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".horizontal-container",
        pin: true,
        start: "top top",
        end: () => `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    pinTl.to(horizontalRef.current, {
      x: () => -(horizontalRef.current.scrollWidth - window.innerWidth),
      ease: "none",
    });

    gsap.utils.toArray('.product-card').forEach((card) => {
        gsap.from(card.querySelector('.card-content'), {
            y: 40,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                containerAnimation: pinTl,
                start: "left center",
                toggleActions: "play none none reverse"
            }
        });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white selection:bg-[#1D9E75] selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar threshold={20} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F2027] z-10">
        <div className="absolute inset-0 z-0">
          <Image src="/hero_updated1.png" alt="Quartz Hero" fill priority className="hero-bg-img object-cover opacity-100" />
          <div className="absolute inset-0 bg-transparent z-[1]" />
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="hero-label block text-[#9FE1CB] text-xs font-medium tracking-[0.4em] mb-6 uppercase">— OUR PRODUCTS</span>
          <h1 className="hero-title text-white text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tighter uppercase">
            <span className="inline-block overflow-hidden">PURE </span>
            <span className="inline-block italic text-transparent font-outline">QUARTZ.</span>
          </h1>
          <p className="hero-sub text-white/60 text-lg md:text-xl mt-8 font-light max-w-xl mx-auto">Precision-engineered minerals for the global high-tech supply chain.</p>
        </div>
      </section>

      {/* ── HORIZONTAL PRODUCTS SECTION ─────────────────────────────────── */}
      <div className="horizontal-container bg-white relative overflow-hidden py-10 md:py-20">
        <div ref={horizontalRef} className="flex h-[75vh] md:h-[80vh] w-max items-center px-4 md:px-10">
            
            {/* INTRO PANEL */}
            <div className="w-[85vw] lg:w-[90vw] h-full flex items-center px-8 md:px-20 shrink-0 bg-white">
                <div className="max-w-3xl">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.6em] text-[#1D9E75] mb-8 block uppercase">— PRODUCT CATALOG</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-[#0F2027] leading-[1.1] mb-8">
                        Refined <span className="italic font-medium">Minerals</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-light leading-relaxed max-w-md">
                        Meticulously processed to meet the rigorous demands of specialized industries.
                    </p>
                </div>
            </div>

            {/* PRODUCT PANELS */}
            {productsData.map((prod, idx) => (
                <div key={prod.id} className="product-card w-[85vw] lg:w-[95vw] h-full flex flex-col lg:flex-row shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden mx-4 shadow-2xl" style={{ backgroundColor: prod.bg }}>
                    {/* Content Part */}
                    <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 py-10 lg:py-0 card-content text-white order-2 lg:order-1">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#9FE1CB] mb-4 block uppercase">— {prod.grade}</span>
                        <h3 className="text-2xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-4 md:mb-6">{prod.name}</h3>
                        <p className="text-xs md:text-base lg:text-lg font-light text-white/70 leading-relaxed max-w-lg mb-6 md:mb-10 line-clamp-4 lg:line-clamp-none">
                            {prod.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
                            {prod.pills.map((p, pIdx) => (
                                <div key={pIdx} className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[7px] md:text-[8px] uppercase font-bold tracking-widest">{p}</div>
                            ))}
                        </div>
                        <Link href="/contact" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9FE1CB]">
                            Enquire <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>

                    {/* Image Part */}
                    <div className="w-full h-[40%] lg:h-full lg:w-[45%] relative card-image-box order-1 lg:order-2">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" quality={100} sizes="(max-width: 1024px) 80vw, 40vw" />
                        <div className="absolute inset-0 bg-black/5"></div>
                    </div>
                </div>
            ))}

            {/* OUTRO PANEL */}
            <div className="w-[80vw] lg:w-[90vw] h-full flex flex-col items-center justify-center bg-[#0F2027] shrink-0 text-white rounded-[2rem] md:rounded-[3rem] mx-4">
                <h2 className="text-4xl lg:text-6xl font-serif text-center italic mb-10 tracking-tight px-10 leading-tight">Ready to <span className="not-italic font-medium">Partner?</span></h2>
                <Link href="/contact" className="px-10 py-4 bg-[#1D9E75] text-white rounded-full uppercase text-[9px] font-bold tracking-[0.4em] hover:bg-[#158060] transition-all">
                    Contact Us
                </Link>
            </div>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        .font-outline { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); }
      `}</style>
    </div>
  );
}


