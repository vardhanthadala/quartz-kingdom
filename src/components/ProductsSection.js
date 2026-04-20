'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".product-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  const products = [
    {
      name: "Quartz Glassy",
      category: "A1 Grade",
      desc: "Exceptional purity and transparency. Ideal for high-end optical and laboratory equipment.",
      img: "/quartz-glassy.png"
    },
    {
      name: "Quartz Powder",
      category: "B Grade",
      desc: "Finely micronized for industrial fillers, coatings, and specialized ceramic glazes.",
      img: "/quartz-powder.png"
    },
    {
      name: "Mica Quartz",
      category: "A1 Grade",
      desc: "A unique blend of mica and quartz, offering superior thermal and electrical insulation.",
      img: "/mica-quartz.png"
    },
    {
      name: "Quartz Granular",
      category: "A1 Grade",
      desc: "Consistent grain size for water filtration, architectural plaster, and industrial flooring.",
      img: "/quartz-granular.png"
    }
  ];

  return (
    <section 
      id="our-products"
      ref={containerRef}
      className="relative py-32 md:py-34 px-6 md:px-12 bg-white text-[#0f172a] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_bottom_right,#f0fdf4_0%,transparent_50%),radial-gradient(circle_at_top_left,#e0f2fe_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400 font-bold mb-8">Selected Materials</h2>
            <h3 className="text-4xl md:text-7xl font-serif font-light leading-none">
              Precision for <span className="italic font-bold text-[#4ade80]">Infinite</span> <br /> Possibilities
            </h3>
          </div>
          <Link href="/our-products" className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-bold">
            <span className="border-b border-slate-200 pb-1 group-hover:border-[#38bdf8] transition-colors">View All Products</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-all group-hover:bg-[#38bdf8] group-hover:text-white group-hover:border-[#38bdf8]">
              →
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="product-card group cursor-pointer will-change-transform">
              <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-slate-100">
                <Image 
                  src={product.img} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" 
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 will-change-transform" />
                <div className="absolute top-6 left-6">
                    <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 text-[9px] uppercase tracking-widest font-bold text-[#0f172a]">
                        {product.category}
                    </span>
                </div>
              </div>
              <h4 className="text-2xl font-serif mb-4 flex justify-between items-center text-[#0f172a]">
                {product.name}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {product.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
