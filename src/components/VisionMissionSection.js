'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Eye, Target } from 'lucide-react';
import ElectricBorderCard from './ElectricBorderCard';

export default function VisionMissionSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal full section
    gsap.fromTo(
      ".vm-card",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#fafafa] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Very faint background gradients */}
      <div className="absolute top-1/4 left-0 w-[50vh] h-[50vh] bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[50vh] h-[50vh] bg-[#22c55e]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Vision Card */}
        <div className="vm-card flex-1">
          <ElectricBorderCard color="#0284c7">
            <div className="w-16 h-16 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#0284c7]/30 transition-all duration-500">
              <Eye className="w-7 h-7 text-[#0284c7]" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-[#0f172a] mb-6 tracking-tight">
              Our <span className="italic font-bold">Vision</span>
            </h3>
            
            <p className="text-slate-600 font-light leading-relaxed text-base md:text-lg">
              To redefine the future of high-grade raw materials globally. We envision an industry where purity and precision empower breakthrough technologies, architectural masterpieces, and sustainable progress, setting unparalleled benchmarks for quality and reliability.
            </p>
          </ElectricBorderCard>
        </div>

        {/* Mission Card */}
        <div className="vm-card flex-1">
          <ElectricBorderCard color="#16a34a">
            <div className="w-16 h-16 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#16a34a]/30 transition-all duration-500">
              <Target className="w-7 h-7 text-[#16a34a]" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-[#0f172a] mb-6 tracking-tight">
              Our <span className="italic font-bold">Mission</span>
            </h3>
            
            <p className="text-slate-600 font-light leading-relaxed text-base md:text-lg">
              To rigorously extract and refine industrial minerals while maintaining strict environmental stewardship. We commit to consistent innovation, transparent relationships with our partners, and delivering materials that serve as the flawless foundation for tomorrow's creations.
            </p>
          </ElectricBorderCard>
        </div>

      </div>
    </section>
  );
}
