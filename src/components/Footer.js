'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#f1f5f9] text-[#0f172a] overflow-hidden pt-24 pb-8 px-4 sm:px-6 lg:px-12 border-t border-[#e2e8f0]">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#0284c7]/20 to-transparent blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between mb-24">
        
        {/* Brand Section */}
        <div className="flex flex-col w-full lg:w-1/3">
          <Link href="/" className="mb-6 inline-block">
            <Image
              src="/logo-2.png"
              alt="Quartz Logo"
              width={140}
              height={45}
              className="h-12 w-auto object-contain brightness-0 opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
          <p className="text-slate-600 font-light text-sm leading-relaxed mb-8 max-w-xs">
            Welcome to Quartz Kingdom, where quality meets integrity. Redefining industrial minerals since 1998.
          </p>
          <div className="flex gap-4">
            {[InstagramIcon, LinkedinIcon, TwitterIcon].map((Icon, idx) => (
              <a 
                key={idx}
                href="#" 
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0f172a] hover:border-slate-400 hover:bg-slate-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col w-full lg:w-1/4">
          <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8">Navigation</h4>
          <nav className="flex flex-col gap-4">
            {['Home', 'About', 'Products', 'Contact'].map((link) => (
              <Link 
                key={link} 
                href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                className="group relative inline-flex w-fit text-slate-500 hover:text-[#0f172a] transition-colors duration-300 font-light"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#0f172a] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col w-full lg:w-1/3">
          <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8">Contact Us</h4>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 group">
              <div className="mt-1 text-[#0284c7] group-hover:scale-110 transition-transform">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <p className="text-slate-600 font-light text-sm leading-relaxed group-hover:text-[#0f172a] transition-colors">
                123 Mineral Exchange Blvd,<br />Industrial District, CA 90210
              </p>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="text-[#0284c7] group-hover:scale-110 transition-transform">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <p className="text-slate-600 font-light text-sm group-hover:text-[#0f172a] transition-colors">
                +1 (555) 123-4567
              </p>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="text-[#0284c7] group-hover:scale-110 transition-transform">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <p className="text-slate-600 font-light text-sm group-hover:text-[#0f172a] transition-colors">
                info@quartzkingdom.com
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full pt-8 border-t border-slate-200 flex flex-col items-center justify-center">
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold text-center">
          © All Copyright 2024 by quartzkingdom.com
        </p>
      </div>
    </footer>
  );
}
