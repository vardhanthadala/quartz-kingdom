'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function VisionMissionSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".mission-vision-wrapper", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#fafafa] flex flex-col items-center gap-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="text-center relative z-10 max-w-2xl">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1D9E75] mb-4 block">— OUR PURPOSE</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight italic">
          Values that <span className="font-light not-italic text-slate-400">Define Us</span>
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-24">
        
        {/* VISION CARD */}
        <div className="mission-vision-wrapper">
          <div className="wipe-card" data-content="To redefine the future of high-grade raw materials globally, empowering breakthrough technologies and sustainable progress.">
            <span className="label font-serif italic text-[#0F2027]">OUR VISION</span>
          </div>
        </div>

        {/* MISSION CARD */}
        <div className="mission-vision-wrapper">
          <div className="wipe-card" data-content="To rigorously refine industrial minerals while maintaining environmental stewardship and consistent innovation.">
            <span className="label font-serif italic text-[#0F2027]">OUR MISSION</span>
          </div>
        </div>

      </div>

      <style jsx>{`
        .wipe-card {
          position: relative;
          width: 300px;
          height: 380px;
          background: #ffffff !important; /* Force white background */
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.08); /* Stronger shadow for visibility */
          transition: all 0.5s ease;
          border: 1px solid rgba(0,0,0,0.05); /* Subtle border for definition */
          z-index: 1;
        }

        .label {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0F2027 !important; /* Force dark color */
          letter-spacing: -0.02em;
          z-index: 5; /* Ensure it stays above corners */
          transition: all 0.5s ease;
        }

        .wipe-card::before,
        .wipe-card::after {
          position: absolute;
          content: "";
          width: 25%;
          height: 25%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #9FE1CB; /* Brand Light Green */
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 2;
          overflow: hidden;
          padding: 2rem;
          text-align: center;
          font-size: 0.95rem;
          font-weight: 400;
          color: transparent;
          line-height: 1.6;
        }

        .wipe-card::before {
          top: 0;
          right: 0;
          border-radius: 0 15px 0 100%;
        }

        .wipe-card::after {
          bottom: 0;
          left: 0;
          border-radius: 0 100% 0 15px;
        }

        .wipe-card:hover {
          box-shadow: 0 40px 60px rgba(29, 158, 117, 0.15);
          transform: translateY(-10px);
          border-color: #1D9E75;
        }

        .wipe-card:hover .label {
          opacity: 0;
          transform: scale(0.8);
        }

        .wipe-card:hover::before,
        .wipe-card:hover::after {
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background-color: #0F2027; /* Brand Dark Accent */
        }

        .wipe-card:hover::after {
          content: attr(data-content);
          color: #9FE1CB; /* Brand Light Green for text */
          font-weight: 500;
        }

        .wipe-card:hover::before {
           background-color: #ffffff;
           /* Optionally put a small icon or secondary text in ::before on hover */
        }

        @media (max-width: 640px) {
          .wipe-card {
            width: 280px;
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
}
