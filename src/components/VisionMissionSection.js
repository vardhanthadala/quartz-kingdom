'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Target, Eye, ArrowUpRight } from 'lucide-react';

const Card = ({ title, content, index, icon: Icon, color, isDark = false }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const iconBoxRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    
    // Mouse Tilt Effect
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(card, {
        rotationY: x * 15,
        rotationX: -y * 15,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(iconBoxRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([card, iconBoxRef.current], {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className={`relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] p-10 lg:p-12 overflow-hidden cursor-pointer group shadow-2xl transition-shadow duration-500 hover:shadow-${color}/20 
        ${isDark ? 'bg-[#0F2027] text-white' : 'bg-white text-[#0F2027] border border-slate-100'}`}
    >
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] -mr-20 -mt-20 opacity-20 ${isDark ? 'bg-[#1D9E75]' : 'bg-[#9FE1CB]'}`} />
      <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[60px] -ml-10 -mb-10 opacity-10 ${isDark ? 'bg-white' : 'bg-[#1D9E75]'}`} />
      
      {/* Index Badge */}
      <div className="flex justify-between items-start mb-16">
        <div 
          ref={iconBoxRef}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500
            ${isDark ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-[#f8fafc] text-[#1D9E75]'}`}
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <span className={`text-[10px] font-medium tracking-[0.4em] uppercase ${isDark ? 'text-white/30' : 'text-slate-300'}`}>
          — 0{index}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-4xl lg:text-5xl font-serif font-medium mb-6 tracking-tight">
          {title.split(' ')[0]} <span className="italic font-light opacity-60 block">{title.split(' ')[1]}</span>
        </h3>
        
        <div className="flex-1">
          <p className={`text-lg lg:text-xl font-light leading-relaxed mb-10 transition-colors duration-500 
            ${isDark ? 'text-white/70 group-hover:text-white' : 'text-slate-500 group-hover:text-[#0F2027]'}`}>
            {content}
          </p>
        </div>

        <div className="flex items-center gap-4 group/btn overflow-hidden">
           <div className={`h-[1px] w-12 transition-all duration-500 group-hover:w-20 ${isDark ? 'bg-white/20 group-hover:bg-[#1D9E75]' : 'bg-slate-200 group-hover:bg-[#1D9E75]'}`} />
           <span className="text-[10px] lg:text-xs uppercase tracking-[0.3em] font-medium hover:opacity-60 transition-opacity">Explore More</span>
           <ArrowUpRight size={14} className="opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1D9E75] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </div>
  );
};

export default function VisionMissionSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".vision-card-reveal", {
      opacity: 0,
      y: 60,
      stagger: 0.3,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Grainy Background Animation
    gsap.to(".bg-grain", {
      opacity: 0.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-30 px-6 lg:px-12 bg-[#fafafa] overflow-hidden"
    >
      {/* Premium Texture Overlay */}
      <div className="bg-grain absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24 md:mb-32">
          <span className="text-[12px] font-medium uppercase tracking-[0.6em] text-[#1D9E75] mb-6 block">— CORE ANCHORS</span>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-[#0F2027] leading-[1.1] tracking-tighter">
            Purpose that <br />
            <span className="italic font-medium">Shapes the Future</span>
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">
          <div className="vision-card-reveal w-full flex justify-center">
            <Card 
              index={1}
              title="Our Vision"
              content="To redefine the future of high-grade raw materials globally, empowering breakthrough technologies and sustainable progress through purity."
              icon={Eye}
              color="emerald"
            />
          </div>
          <div className="vision-card-reveal w-full flex justify-center">
            <Card 
              index={2}
              title="Our Mission"
              content="To rigorously refine industrial minerals while maintaining strict environmental stewardship and delivering materials that serve as the foundation for tomorrow."
              icon={Target}
              isDark={true}
              color="emerald"
            />
          </div>
        </div>

        {/* Decorative Quote */}
        <div className="mt-32 text-center opacity-20 hidden md:block">
           <p className="text-sm font-medium uppercase tracking-[1em] text-[#0F2027]">Quartz Kingdom Establish 1998</p>
        </div>
      </div>
    </section>
  );
}
