'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Globe } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';

const Navbar = dynamic(() => import('@/components/Navbar'));
const Footer = dynamic(() => import('@/components/Footer'));

// --- 3D SCENE COMPONENT ---
function MineralScene() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#1D9E75" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#9FE1CB" />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={2.4}>
          <MeshDistortMaterial
            color="#1D9E75"
            attach="material"
            distort={0.4}
            speed={4}
            roughness={0}
            metalness={0.8}
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const phoneRef = useRef(null);
  const formRef = useRef(null);
  const containerRef = useRef(null);

  // Phone shake animation
  useGSAP(() => {
    const shake = gsap.to(phoneRef.current, {
      x: 3,
      repeat: -1,
      yoyo: true,
      duration: 0.1,
      paused: true,
    });

    phoneRef.current?.addEventListener('mouseenter', () => shake.play());
    phoneRef.current?.addEventListener('mouseleave', () => {
      shake.pause();
      gsap.to(phoneRef.current, { x: 0, duration: 0.2 });
    });

    // Content reveal
    gsap.from(".reveal-item", {
       y: 50,
       opacity: 0,
       stagger: 0.1,
       duration: 1,
       ease: "expo.out"
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1D9E75', '#9FE1CB', '#ffffff']
      });
    }, 2000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-[#1D9E75] selection:text-white overflow-hidden">
      <Navbar />

      <div className="relative pt-24 md:pt-32 lg:pt-48 pb-20 px-4 md:px-8 lg:px-12">
        {/* 3D Canvas Background - Constrained for performance on 4K */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <MineralScene />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          
          <div className="mb-12 md:mb-24 reveal-item">
             <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] text-[#1D9E75] mb-4 block">— CONNECT WITH THE KINGDOM</span>
             <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-serif font-light text-[#0F2027] leading-[1] tracking-tighter">
                Let's Start a <span className="italic font-bold">Dialogue.</span>
             </h1>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 xl:gap-32 items-start">
            
            {/* LEFT SIDE: INFO */}
            <div className="space-y-10 md:space-y-16">
              <div className="reveal-item">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0F2027] mb-6 underline decoration-[#1D9E75]/20 underline-offset-8">Contact Information</h2>
                <p className="text-slate-500 font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-md">
                  Whether you're inquiring about bulk shipments or precision-grade powders, our experts are ready to assist.
                </p>
              </div>

              <div className="space-y-8 md:space-y-10 reveal-item">
                <div className="flex items-center gap-4 md:gap-8 group">
                   <div 
                     ref={phoneRef} 
                     className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-[#1D9E75] shadow-sm cursor-pointer shrink-0 transition-transform hover:scale-110"
                   >
                     <Phone size={24} className="md:w-8 md:h-8" />
                   </div>
                   <div>
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Call Us Directly</span>
                      <p className="text-lg md:text-2xl font-bold text-[#0F2027]">+91 98765 43210</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 md:gap-8 group">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-[#1D9E75] shadow-sm shrink-0 transition-transform hover:scale-110">
                     <Mail size={24} className="md:w-8 md:h-8" />
                   </div>
                   <div>
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Email Inquiry</span>
                      <p className="text-lg md:text-2xl font-bold text-[#0F2027]">sales@quartzkingdom.com</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 md:gap-8 group">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-[#1D9E75] shadow-sm shrink-0 transition-transform hover:scale-110">
                     <MapPin size={24} className="md:w-8 md:h-8" />
                   </div>
                   <div>
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Global Headquarters</span>
                      <p className="text-lg md:text-2xl font-bold text-[#0F2027]">Plot No. 14, Rohini Layout, Hyderabad</p>
                   </div>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-100 reveal-item">
                 <h4 className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-6">Our Working Hours</h4>
                 <div className="flex justify-between max-w-sm">
                    <span className="text-slate-600 text-sm md:text-base">Mon - Fri Opening Doors</span>
                    <span className="font-bold text-[#0F2027] text-sm md:text-base">09:00 - 18:00</span>
                 </div>
              </div>
            </div>

            {/* RIGHT SIDE: FORM */}
            <div className="reveal-item">
               <div className="bg-white p-6 md:p-10 lg:p-16 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                  {formState === 'success' ? (
                     <div className="py-20 text-center space-y-6">
                        <div className="w-20 h-20 bg-[#1D9E75] text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
                           <Send size={40} />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-[#0F2027]">Message Received!</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">Thank you for reaching out. A Quartz Kingdom specialist will contact you shortly.</p>
                        <button 
                          onClick={() => setFormState('idle')}
                          className="text-[#1D9E75] font-bold uppercase tracking-widest text-[10px]"
                        >
                          Send another message
                        </button>
                     </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
                       <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
                          <div className="space-y-2 group">
                             <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
                                <User size={12} /> Full Name
                             </label>
                             <input 
                               required 
                               className="w-full bg-[#f8fafc] border-b border-slate-200 focus:border-[#1D9E75] outline-none py-4 px-1 transition-all duration-300 text-base lg:text-lg"
                               placeholder="John Doe"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
                                <Mail size={12} /> Email Address
                             </label>
                             <input 
                               required 
                               type="email"
                               className="w-full bg-[#f8fafc] border-b border-slate-200 focus:border-[#1D9E75] outline-none py-4 px-1 transition-all duration-300 text-base lg:text-lg"
                               placeholder="john@company.com"
                             />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
                             <Globe size={12} /> Inquiry Type
                          </label>
                          <select className="w-full bg-[#f8fafc] border-b border-slate-200 focus:border-[#1D9E75] outline-none py-4 px-1 transition-all duration-300 cursor-pointer text-base lg:text-lg">
                             <option>Bulk Material Inquiry</option>
                             <option>Quality Report Request</option>
                             <option>General Support</option>
                             <option>Partnership Proposal</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
                             <MessageSquare size={12} /> Your Message
                          </label>
                          <textarea 
                             required 
                             rows={4}
                             className="w-full bg-[#f8fafc] border-b border-slate-200 focus:border-[#1D9E75] outline-none py-4 px-1 transition-all duration-300 resize-none text-base lg:text-lg"
                             placeholder="How can we help your business..."
                          />
                       </div>

                       <button 
                         disabled={formState === 'sending'}
                         className="w-full py-6 lg:py-8 bg-[#0F2027] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] lg:text-xs hover:bg-[#1D9E75] transition-all duration-500 overflow-hidden relative group"
                       >
                          <span className={`${formState === 'sending' ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                             Send Message
                          </span>
                          {formState === 'sending' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             </div>
                          )}
                       </button>
                    </form>
                  )}
               </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
