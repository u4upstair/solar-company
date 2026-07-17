import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Sun, ArrowUpRight, Leaf, Hourglass, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '../context';
import { createPortal } from 'react-dom';

const navLinks = [
  { label: 'Home', href: '/#' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Case Studies', href: '/#case-studies' },
];

export default function Layout() {
  const { isNight, setIsNight } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(href);
    // After navigation, we might need to scroll
    setTimeout(() => {
      const hash = href.split('#')[1];
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen ${isNight ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'} font-sans selection:bg-neutral-800 selection:text-white p-[clamp(1.5px,0.2vw,3px)] flex flex-col box-border transition-colors duration-500`}>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 ${
          menuOpen ? 'z-[9999]' : 'z-50'
        } flex items-center justify-between px-4 sm:px-6 md:px-10 transition-all duration-300 ${
          showNav || menuOpen ? 'translate-y-0' : '-translate-y-full'
        } ${
          menuOpen
            ? 'bg-transparent py-3 sm:py-4'
            : isScrolled
              ? isNight
                ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-lg py-3 sm:py-4'
                : 'bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm py-3 sm:py-4'
              : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        {/* Left side — Logo block */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="relative flex items-center justify-center">
            <Sun className={`w-5 h-5 flex-shrink-0 transition-transform duration-700 ease-in-out group-hover:rotate-180 group-hover:scale-110 ${isNight ? 'text-[#07CCEA]' : 'text-[#CEFE49]'}`} />
            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isNight ? 'bg-[#07CCEA]' : 'bg-[#CEFE49]'}`}></div>
          </div>
          <div className="flex flex-col">
            <span className={`text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 leading-none ${
              (isScrolled && !isNight) || (menuOpen && !isNight) ? 'text-gray-900' : (location.pathname === '/' ? 'text-white nav-text-shadow' : (isNight ? 'text-white' : 'text-gray-900'))
            }`}>
              FluxSolar<sup className="text-[9px] font-medium">TM</sup>
            </span>
            <span className={`text-[10px] sm:text-[11px] transition-colors duration-300 font-medium tracking-wide leading-tight mt-0.5 ${
              (isScrolled && !isNight) || (menuOpen && !isNight) ? 'text-gray-500' : (location.pathname === '/' ? 'text-gray-400' : (isNight ? 'text-gray-400' : 'text-gray-500'))
            }`}>
              Solar Energy
            </span>
          </div>
        </div>

        {/* Center — Nav links as a small centered glass pill */}
        <div className={`hidden lg:flex items-center gap-1 sm:gap-1.5 rounded-full px-5 py-2 transition-all duration-300 ${
          (isScrolled && !isNight) || (location.pathname !== '/' && !isNight) ? 'bg-black/[0.04] border border-black/5' : 'apple-glass'
        }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === '/' && location.hash === link.href.split('/')[1] || (location.hash === '' && link.href === '/#');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-semibold transition-all duration-300 rounded-full ${
                  isActive
                    ? `px-4 py-2 ${
                        isNight ? 'bg-[#07CCEA] text-slate-950' : 'bg-[#CEFE49] text-[#1f2a1d]'
                      }`
                    : `px-3 py-2 ${
                        (isScrolled && !isNight) || (location.pathname !== '/' && !isNight)
                          ? 'text-gray-600 hover:text-gray-900'
                          : 'text-white/80 hover:text-white nav-text-shadow'
                      }`
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right side — CTA cluster and hamburger */}
        <div className="flex items-center gap-3">
          {/* CTA cluster for sm and up */}
          <div 
            className="group hidden sm:flex items-center gap-0 cursor-pointer"
            onClick={() => navigate('/quote')}
          >
            <button className={`font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap z-10 pointer-events-none ${
              (isScrolled && !isNight) || (location.pathname !== '/' && !isNight)
                ? 'bg-gray-900 text-white group-hover:bg-gray-800 group-hover:scale-105'
                : 'bg-white text-[#1f2a1d] group-hover:bg-neutral-50 group-hover:scale-105 active:scale-95'
            }`}>
              Get a Quote
            </button>
            <button className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm flex-shrink-0 border-0 border-transparent outline-none ring-0 focus:outline-none focus:ring-0 pointer-events-none ${
              (isScrolled && !isNight) || (location.pathname !== '/' && !isNight)
                ? 'bg-gray-900 text-white group-hover:bg-[#CEFE49] group-hover:text-gray-900 group-hover:scale-110'
                : `bg-white text-[#1f2a1d] ${isNight ? 'group-hover:bg-[#06CDEB]' : 'group-hover:bg-[#CEFE49]'} group-hover:scale-110 active:scale-95`
            }`}>
              <ArrowUpRight
                className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  (isScrolled && !isNight) || (location.pathname !== '/' && !isNight) ? 'text-white group-hover:text-gray-900' : 'text-[#1f2a1d]'
                }`}
              />
            </button>
          </div>

          {/* Hamburger button for lg:hidden */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              (isScrolled && !isNight) || (menuOpen && !isNight) || (location.pathname !== '/' && !isNight)
                ? 'text-gray-800 hover:bg-black/5'
                : 'text-white hover:bg-white/10'
            } z-[60]`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu full-screen overlay */}
      {typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed inset-0 z-[9998] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div
            className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm flex flex-col p-6 sm:p-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isNight ? 'bg-slate-900/95 border-l border-white/10' : 'bg-white/95 border-l border-black/5'
            } backdrop-blur-xl shadow-2xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex-1 flex flex-col overflow-y-auto mt-16 sm:mt-20 no-scrollbar">
              <div className="flex flex-col gap-6">
                <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Navigation</div>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === '/' && location.hash === link.href.split('/')[1] || (location.hash === '' && link.href === '/#');
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-2xl font-bold py-3.5 px-6 rounded-full transition-all duration-500 block ${
                          menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                        } ${
                          isActive
                            ? (isNight ? 'bg-[#07CCEA] text-slate-950' : 'bg-[#CEFE49] text-[#1f2a1d]')
                            : (isNight ? 'text-slate-200 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-black/5')
                        }`}
                        style={{ transitionDelay: menuOpen ? `${150 + i * 50}ms` : '0ms' }}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* CTA cluster in drawer */}
              <div
                className={`mt-auto pt-8 flex flex-col gap-4 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
              >
                <div 
                  className="group flex items-center gap-0 w-full cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/quote');
                  }}
                >
                  <button className={`flex-1 font-bold text-base py-4 rounded-full transition-all duration-300 shadow-md text-center pointer-events-none ${
                    isNight ? 'bg-white text-slate-950 group-hover:bg-neutral-100' : 'bg-gray-900 text-white group-hover:bg-gray-800'
                  }`}>
                    Get a Quote
                  </button>
                  <button className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 shadow-md flex-shrink-0 border-0 outline-none ${
                    isNight ? 'bg-white text-slate-950' : 'bg-gray-900 text-white'
                  }`}>
                    <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Main Content */}
      <Outlet />

      {/* Global Footer / Contact Section */}
      <footer id="contact" className="bg-black px-6 lg:px-16 py-16 lg:py-20 overflow-x-hidden mt-auto rounded-b-[2rem] sm:rounded-b-[32px] mx-1 mb-1">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-left w-full min-w-0">
          <div className="grid lg:grid-cols-2 gap-10 items-start w-full min-w-0">
            {/* LEFT */}
            <div className="flex flex-col gap-5 w-full min-w-0">
              <h2 className="font-grotesk font-extrabold text-3xl lg:text-4xl leading-tight text-white">
                Power Your Life With Clean Energy
              </h2>
              <p className="text-sm text-gray-400 max-w-md">
                Explore our range of solar services designed to reduce your energy bills, lower carbon footprint, and ensure long-term environmental benefits.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div 
                  className="group flex items-center gap-1 w-fit cursor-pointer"
                  onClick={() => navigate('/quote')}
                >
                  <button className={`${isNight ? 'bg-[#07CCEA]' : 'bg-[#CEFE49]'} text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition-all group-hover:scale-[1.03] cursor-pointer focus:outline-none focus-visible:ring-2 ${isNight ? 'focus-visible:ring-[#07CCEA]' : 'focus-visible:ring-[#CEFE49]'} focus-visible:ring-offset-2 focus-visible:ring-offset-black pointer-events-none`}>
                    Get Free Quote
                  </button>
                  <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center transition-transform group-hover:rotate-45 pointer-events-none">
                    <ArrowUpRight className={`w-4 h-4 ${isNight ? 'text-[#07CCEA]' : 'text-[#CEFE49]'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid sm:grid-cols-2 gap-8 w-full min-w-0">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-white text-lg font-grotesk">Solutions</h3>
                <ul className="flex flex-col gap-3">
                  {['Residential Solar', 'Commercial Solar', 'Battery Storage', 'Maintenance'].map((item) => (
                    <li key={item}>
                      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/#services'); }} className="text-gray-400 hover:text-white transition-colors text-sm font-medium hover:underline underline-offset-4 decoration-white/30">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-white text-lg font-grotesk">Company</h3>
                <ul className="flex flex-col gap-3">
                  {['About Us', 'Case Studies', 'Careers', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/#${item.toLowerCase().replace(' ', '-')}`); }} className="text-gray-400 hover:text-white transition-colors text-sm font-medium hover:underline underline-offset-4 decoration-white/30">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 my-4" />

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full min-w-0">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <div className="relative flex items-center justify-center">
                <Sun className={`w-6 h-6 transition-transform duration-700 ease-in-out group-hover:rotate-180 group-hover:scale-110 ${isNight ? 'text-[#07CCEA]' : 'text-[#CEFE49]'}`} />
                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isNight ? 'bg-[#07CCEA]' : 'bg-[#CEFE49]'}`}></div>
              </div>
              <span className="font-grotesk font-bold text-xl tracking-tight text-white transition-colors group-hover:text-gray-200">FluxSolar</span>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-400 hover:bg-[#07CCEA] hover:text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-400 hover:bg-[#07CCEA] hover:text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-400 hover:bg-[#07CCEA] hover:text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-400 hover:bg-[#07CCEA] hover:text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</a>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm text-center md:text-right mt-2 md:mt-0">
                © {new Date().getFullYear()} FluxSolar Technologies Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
