'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SectionDivider() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Subtle animated underline/shimmer
    gsap.fromTo(
      ".divider-line",
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(
      ".divider-text",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#fafafa] py-20 flex flex-col items-center justify-center border-t border-[#e2e8f0]"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="divider-text text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold">
          — OUR PRODUCT
        </span>
        <div className="divider-line w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#0284c7]/50 to-transparent transform-gpu origin-center" />
      </div>
    </div>
  );
}
