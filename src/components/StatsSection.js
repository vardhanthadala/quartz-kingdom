'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function StatsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Number counter animation focusing on the 'landing' (last 10 units)
    gsap.utils.toArray('.stat-number').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-value'));
      const isFloat = el.getAttribute('data-value').includes('.');
      const startVal = target - 10;

      gsap.fromTo(el, 
        { textContent: startVal }, 
        {
          textContent: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: isFloat ? 0.1 : 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          }
        }
      );
    });

    // Fade up animations for items
    gsap.fromTo('.stat-item', 
      { y: 40, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  const stats = [
    { value: "25", label: "Years of Excellence", suffix: "+" },
    { value: "40", label: "Countries Served", suffix: "+" },
    { value: "99.9", label: "Quartz Purity", suffix: "%" },
    { value: "12", label: "Active Mines", suffix: "" }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 md:py-28 bg-white border-t border-[#e2e8f0] overflow-hidden"
    >
      <div className="bg-grain absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x divide-transparent md:divide-[#e2e8f0]">
          
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-center text-center px-4">
              <div className="relative mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#0f172a] to-slate-500 font-serif font-light text-5xl md:text-6xl lg:text-7xl xl:text-[108px] tracking-tighter flex items-center">
                  <span className="stat-number" data-value={stat.value}>{parseFloat(stat.value) - 10}</span>
                  <span className="text-4xl md:text-5xl font-light">{stat.suffix}</span>
                </span>
                <div className="absolute -inset-4 bg-[#1D9E75]/5 rounded-full blur-[20px] -z-10" />
              </div>
              
              <h4 className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
                {stat.label}
              </h4>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
