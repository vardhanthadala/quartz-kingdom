'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const founders = [
  {
    name: "V. Siva Prasad",
    role: "Founder & Visionary Leader",
    bio: "The driving force behind Quartz Kingdom's commitment to global excellence. With decades of industry foresight, he has transformed raw mineral potential into a high-technology supply chain staple.",
    image: "/about-quartz.png" 
  },
  {
    name: "Depuru Ravindra Reddy",
    role: "Co-Founder & Mining Expert",
    bio: "A veteran in mining geology and mineral resources. His hands-on expertise in sustainable extraction ensures that every gram of quartz meets our rigorous purity standards.",
    image: "/mica-quartz.png"
  },
  {
    name: "Hari Prasad Pamuru",
    role: "Executive Partner",
    bio: "Bringing 36 years of expertise in finance and administration. His operational precision forms the backbone of our transparent and reliable partner relationships worldwide.",
    image: "/quartz-glassy.png"
  },
  {
    name: "Sri Vatsav Vempuluru",
    role: "Director",
    bio: "Leading our strategic initiatives and global expansion. Focused on bridge-building between industrial needs and our refined material innovations.",
    image: "/quartz-granular.png"
  }
];

export default function FoundersSection() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${horizontalRef.current.offsetWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Move the horizontal strip
      scrollTl.to(horizontalRef.current, {
        x: () => -(horizontalRef.current.scrollWidth - window.innerWidth),
        ease: "none",
      });
    });

    // Mobile fallback
    mm.add("(max-width: 1023px)", () => {
      gsap.from(".founder-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".founders-mobile",
          start: "top 80%",
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white">
      
      {/* --- DESKTOP/TABLET VIEW (HORIZONTAL STRIP) --- */}
      <div className="hidden md:block h-screen w-full relative">
        <div ref={horizontalRef} className="flex h-screen w-max items-center flex-nowrap">
          
          {/* INTRO PANEL */}
          <div className="w-screen h-screen flex items-start pt-20 md:pt-32 lg:pt-40 px-8 md:px-12 lg:px-24 bg-white shrink-0">
            <div className="max-w-4xl">
               <span className="text-[13px] font-medium uppercase tracking-[0.4em] text-[#1D9E75] mb-6 block">— THE PEOPLE BEHIND THE PURITY</span>
               <h2 className="text-6xl lg:text-7xl font-serif font-light text-[#0F2027] leading-[1.1]">
                  Visionary <span className="italic font-medium">Leadership</span>
               </h2>
               <p className="mt-8 text-xl text-slate-500 max-w-xl font-light leading-relaxed">
                  Meet the minds committed to refining the future of industrial minerals.
               </p>
            </div>
          </div>

          {/* FOUNDER PANELS */}
          {founders.map((founder, i) => (
            <div key={i} className="w-screen h-screen flex bg-white shrink-0 border-l border-slate-100">
              {/* Split Layout: Left Content / Right Image */}
              <div className="w-[60%] flex flex-col justify-center px-8 md:px-12 lg:px-24">
                <div className="founder-info">
                   <span className="text-[10px] font-medium tracking-[0.5em] text-[#9FE1CB] mb-4 block uppercase">— 0{i+1} / 04</span>
                   <h3 className="text-4xl md:text-5xl font-serif font-medium text-[#0F2027] mb-2">{founder.name}</h3>
                   <p className="text-[#1D9E75] text-lg font-medium tracking-widest uppercase mb-8">{founder.role}</p>
                   <div className="h-[2px] w-24 bg-[#1D9E75]/20 mb-8" />
                   <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                     {founder.bio}
                   </p>
                </div>
              </div>
              <div className="w-[40%] relative">
                 <Image 
                   src={founder.image} 
                   alt={founder.name} 
                   fill 
                   className="object-cover"
                   sizes="40vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
              </div>
            </div>
          ))}

          {/* OUTRO PANEL */}
          <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0F2027] text-white shrink-0">
             <h2 className="text-4xl lg:text-7xl font-serif text-center italic mb-12 px-12">Building the future with <br/> <span className="not-italic font-medium">Unrivaled Purity</span></h2>
             <div className="px-10 py-5 border border-white/20 hover:bg-white hover:text-[#0F2027] transition-all duration-500 rounded-full cursor-pointer uppercase text-xs font-medium tracking-widest">
                Contact the Team
             </div>
          </div>

        </div>
      </div>

      {/* --- MOBILE VIEW (STACKED) --- */}
      <div className="md:hidden pt-10 pb-24 px-6 space-y-20 founders-mobile border-t border-slate-100">
        <div className="mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#1D9E75] mb-4 block">Leadership</span>
          <h2 className="text-4xl font-serif font-light text-[#0F2027]">Visionary <span className="italic font-medium">Leadership</span></h2>
        </div>
        {founders.map((founder, i) => (
          <div key={i} className="founder-card space-y-6">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
               <Image src={founder.image} alt={founder.name} fill className="object-cover" />
            </div>
            <div>
               <h3 className="text-3xl font-serif font-medium text-[#0F2027]">{founder.name}</h3>
               <p className="text-[#1D9E75] text-sm font-medium uppercase tracking-widest mb-4">{founder.role}</p>
               <p className="text-slate-600 font-light leading-relaxed">{founder.bio}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
