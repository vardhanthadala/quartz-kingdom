'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = dynamic(() => import('@/components/Footer'));
const Navbar = dynamic(() => import('@/components/Navbar'));

const products = [
  {
    name: 'Mica Quartz - A1 Grade',
    grade: 'A1 Grade',
    description: 'Our Mica Quartz is of A1 Grade quality, known for its exceptional purity and performance. The high mica content enhances its thermal and electrical insulation capabilities, making it perfect for use in electronics, ceramics, and other specialized industries.',
    features: ['Thermal Insulation', 'Electrical Insulation', 'Exceptional Purity'],
    image: '/products/product1.png'
  },
  {
    name: 'Quartz Granular - A1 Grade',
    grade: 'A1 Grade',
    description: 'Meticulously processed to ensure consistent granule size and purity. Widely used in applications requiring high strength and durability, such as construction, glass manufacturing, and water filtration systems.',
    features: ['High Strength', 'Consistent Granule Size', 'Structural Durability'],
    image: '/products/product2.png'
  },
  {
    name: 'Quartz Glassy - A1 Grade',
    grade: 'A1 Grade',
    description: 'Distinguished by brilliant transparency and high purity levels. Essential for applications demanding exceptional clarity and chemical inertness, such as optical devices and laboratory equipment.',
    features: ['Brilliant Transparency', 'Chemical Inertness', 'Refined Clarity'],
    image: '/products/product3.png'
  },
  {
    name: 'Quartz Powder - B Grade',
    grade: 'B Grade',
    description: 'A versatile product suitable for various industrial uses where high purity is not a critical factor. Widely utilized in the manufacturing of paints, coatings, adhesives, and ceramics.',
    features: ['Industrial Consistency', 'Cost-Effective', 'Fine Texture'],
    image: '/products/product4.png'
  },
  {
    name: 'Black Galaxy Granite',
    grade: 'Premium',
    description: 'A versatile product suitable for various industrial uses. Available in Golden Spark big size (180cm – 300cm) and small size (100cm – 180cm). Perfect for architectural masterpieces.',
    features: ['Golden Spark particles', 'Elite Durability', 'Custom Sizing'],
    image: '/products/product5.png'
  }
];

export default function Products() {
  const containerRef = useRef(null);

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
    // Reveal text
    gsap.fromTo(
      ".hero-reveal",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
    );

    // Reveal items
    gsap.utils.toArray('.product-item').forEach((item) => {
      gsap.fromTo(item, 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white text-[#0f172a] selection:bg-black selection:text-white font-main leading-relaxed antialiased overflow-x-hidden min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Navbar className="nav-light" />

      {/* LIGHT editorial hero */}
      <section className="relative min-h-[65vh] w-full flex items-center justify-center pt-[40px] md:pt-0 px-6 md:px-12 lg:px-24 bg-[#fafafa]">
        <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-end justify-between gap-12 text-center md:text-left">
          <div className="flex-1 w-full">
            <span className="hero-reveal block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-6 mt-12 md:mt-0">— OUR PRODUCTS</span>
            <h1 className="hero-reveal text-5xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.8] tracking-tighter mb-8 italic">
              Quartz <span className="font-bold">Kingdom</span>
            </h1>
          </div>
           <div className="max-w-md pb-4">
              <p className="hero-reveal text-slate-500 font-light text-base md:text-lg leading-relaxed">
                Priding ourselves on delivering the highest quality quartz products to meet the diverse needs of our clients. Our commitment to excellence ensures our products stand out in the global market.
              </p>
           </div>
        </div>
      </section>

      {/* Detailed Products List */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          {products.map((product, idx) => (
            <div key={idx} className="product-item group flex flex-col md:flex-row gap-12 md:gap-16 items-start lg:items-center">
              
              {/* MOBILE ONLY HEADER: Name first */}
              <div className="md:hidden w-full space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-serif text-[#0f172a]/10 italic">0{idx + 1}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">{product.grade}</span>
                </div>
                <h2 className="text-4xl font-serif font-bold tracking-tight text-[#0f172a]">
                  {product.name}
                </h2>
              </div>

              {/* IMAGE: Under name on mobile, Right side on md+ */}
              <div className="w-full md:w-[40%] lg:w-2/5 aspect-square relative rounded-full overflow-hidden bg-white border-8 border-[#f1f5f9] shadow-sm transition-all duration-700 group-hover:shadow-2xl md:order-2 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-105"
                />
              </div>

              {/* CONTENT: Bottom on mobile, Left side on md+ */}
              <div className="flex-1 space-y-8 md:order-1">
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-4xl font-serif text-[#0f172a]/10 italic">0{idx + 1}</span>
                  <div className="h-[1px] w-24 bg-[#f1f5f9]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">{product.grade}</span>
                </div>

                <h2 className="hidden md:block text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight text-[#0f172a]">
                  {product.name}
                </h2>

                <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                  {product.description}
                </p>

                <ul className="flex flex-wrap gap-x-8 gap-y-4">
                  {product.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <Star size={12} className="text-[#0284c7]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest group-hover:gap-8 transition-all duration-500">
                  Request Quality Report <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
