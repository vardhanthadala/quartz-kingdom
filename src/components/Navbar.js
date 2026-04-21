'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar({ threshold = 50, initialHidden = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/our-products' },
    { name: 'About', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        id="main-nav"
        // className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center ${isScrolled
        //     ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4 md:py-[10px] text-black opacity-100'
        //     : initialHidden
        //       ? 'opacity-0 pointer-events-none text-white'
        //       : 'text-white opacity-100'
        //   }`}
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 
px-6 md:px-12 flex justify-between items-center

h-[60px] md:h-[55px] lg:h-[65px] xl:h-[65px] 2xl:h-[68px]

${isScrolled
  ? 'bg-white/80 backdrop-blur-lg shadow-sm h-[56px] md:h-[58px] lg:h-[60px] xl:h-[64px] 2xl:h-[68px] text-black'
  : initialHidden
    ? 'opacity-0 pointer-events-none text-white'
    : 'text-white'
}`}
      >
        <Link href="/" className="group relative z-[1001] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          <Image
            src="/logo-2.png"
            alt="Quartz Logo"
            width={120}
            height={40}
            priority
            className={`h-8 md:h-12 w-auto object-contain transition-all duration-500 nav-logo-img ${isScrolled || isOpen ? 'brightness-0' : ''
              }`}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center nav-links drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
className="text-[10px] md:text-xs lg:text-md xl:text-lg 2xl:text-xl uppercase tracking-[0.3em] font-medium"            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-[1001] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} className="text-black" /> : <Menu size={24} />}
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[999] transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        } flex flex-col items-center justify-center gap-8 md:hidden`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-serif text-[#0f172a] tracking-widest uppercase hover:text-[#0284c7] transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <style jsx global>{`
        /* Handling the class-based theme switcher from page.js triggers */
        .nav-light {
          background-color: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(12px) !important;
          color: #000000 !important;
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .nav-light .nav-logo-img {
          filter: brightness(0) !important;
        }
        .nav-light a, .nav-light button, .nav-light .lucide {
          color: #000000 !important;
          stroke: #000000 !important;
        }
      `}</style>
    </>
  );
}