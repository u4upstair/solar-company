/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { FileText, Menu, X, Sparkles, ArrowUpRight, Sun, Play, Star, StarHalf, BadgeCheck, Leaf, Hourglass, ArrowUp, ArrowDown, Phone, Mail, Sparkle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import CaseStudies from '../components/CaseStudies';

import dayHouseImage from '../assets/images/day.jpeg';
import nightHouseImage from '../assets/images/night.jpeg';
import staticThumbnail from '../assets/images/thumbnail.jpeg';
import solarImage from '../assets/images/solar.jpg';
import demoVideo from '../assets/Techren Solar Promo  Video by Cut To Create  Video Production Houston Texas - CutToCreate (1080p, h264, youtube).mp4';

interface StatCardProps {
  value: string;
  caption: string;
  progress?: number;
  gauge?: boolean;
  isNight: boolean;
}

function StatCard({ value, caption, progress, gauge, isNight }: StatCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimatedProgress(progress ?? 0), 400);
    return () => clearTimeout(t);
  }, [progress]);

  return (
    <div className="liquid-glass rounded-2xl p-4 w-full sm:max-w-[200px] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-grotesk text-3xl font-bold text-white">{value}</div>
          <p className="text-xs text-white/60 mt-1 max-w-[120px]">{caption}</p>
        </div>
        {gauge && (
          <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: 'rotate(135deg)', transformOrigin: '50% 50%' }}>
              {/* Background Arc: 270 degrees */}
              <circle
                cx="20"
                cy="20"
                r="15"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15 * 0.75} ${2 * Math.PI * 15 * 0.25}`}
              />
              {/* Progress Arc */}
              <circle
                cx="20"
                cy="20"
                r="15"
                fill="none"
                stroke={isNight ? '#06CDEB' : '#CEFE49'}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15 * 0.75 * (animatedProgress / 100)} ${2 * Math.PI * 15}`}
                style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)' }}
              />
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-[1.5px]">
              <span className="font-grotesk text-[8px] font-bold text-white leading-none">
                {animatedProgress}%
              </span>
              <span className="text-[4.5px] text-white/50 font-bold uppercase tracking-wider leading-none mt-0.5">
                MAX
              </span>
            </div>
          </div>
        )}
      </div>
      {!gauge && (
        <div className="h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden w-full">
          <div
            className={`h-full rounded-full ${isNight ? 'bg-[#06CDEB]' : 'bg-[#CEFE49]'}`}
            style={{ width: `${animatedProgress}%`, transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)' }}
          />
        </div>
      )}
    </div>
  );
}

interface MediaCardProps {
  isNight: boolean;
  mediaThumbnail: string;
  onPlayClick: () => void;
}

function MediaCard({ isNight, mediaThumbnail, onPlayClick }: MediaCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="liquid-glass rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-stretch flex-1 w-full max-w-none sm:max-w-[420px] hero-anim hero-fade" style={{ animationDelay: '0.9s' }}>
      <div
        className="relative w-24 sm:w-28 rounded-xl overflow-hidden shrink-0 cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onPlayClick}
      >
        <img src={mediaThumbnail} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'} border-0 outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              onPlayClick();
            }}
          >
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-900 fill-gray-900 ml-0.5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between py-1 min-w-0">
        <div>
          <h3 className="font-grotesk font-semibold text-white text-sm sm:text-base leading-snug break-words">
            Accelerating Renewable Energy Expansion
          </h3>
          <p className="text-white/60 text-[11px] sm:text-xs mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">
            Discover how we're leading the charge in transforming energy systems with innovative renewable solutions.
          </p>
        </div>
        <div 
          className="group flex items-center gap-0 mt-2 sm:mt-3 cursor-pointer"
          onClick={() => navigate('/quote')}
        >
          <button className="bg-white text-gray-900 text-[10px] sm:text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-transform duration-300 group-hover:scale-[1.03] active:scale-95 z-10 pointer-events-none">
            Get Started
          </button>
          <button className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-0 border-transparent outline-none ring-0 focus:outline-none focus:ring-0 bg-white ${isNight ? 'group-hover:bg-[#06CDEB] text-slate-950' : 'group-hover:bg-[#CEFE49] text-[#1f2a1d]'} flex items-center justify-center transition-all duration-300 group-hover:rotate-45 pointer-events-none`}>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, isNight }: { icon: React.ReactNode; title: string; desc: string; isNight?: boolean }) {
  return (
    <div className={`rounded-2xl p-7 transition-colors duration-500 ${isNight ? 'bg-slate-800' : 'bg-gray-100'}`}>
      <div className="mb-6">{icon}</div>
      <h3 className={`font-jakarta font-bold text-lg mb-2 transition-colors duration-500 ${isNight ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed font-jakarta transition-colors duration-500 ${isNight ? 'text-slate-400' : 'text-gray-500'}`}>{desc}</p>
    </div>
  );
}

interface ServiceItem {
  image: string;
  title: string;
  rating: string;
  description: string;
  price: string;
  originalPrice: string;
}

const servicesData: ServiceItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    title: 'Residential Solar Installation',
    rating: '5.0',
    description: 'Custom solar panel systems for homes, ensuring efficient and cost-saving clean energy tailored to your household\'s needs.',
    price: '299.99',
    originalPrice: '399.99',
  },
  {
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    title: 'Commercial Solar Solutions',
    rating: '4.9',
    description: 'Scalable commercial solar panel deployments to significantly cut operational electricity overhead and meet corporate ESG targets.',
    price: '1,499.99',
    originalPrice: '1,899.99',
  },
  {
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
    title: 'Off-Grid Battery Storage',
    rating: '4.8',
    description: 'State-of-the-art backup battery systems and smart power walls that secure absolute energy independence during outages.',
    price: '599.99',
    originalPrice: '799.99',
  },
  {
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    title: 'Solar Maintenance & Audits',
    rating: '5.0',
    description: 'Comprehensive thermographic scanning, efficiency auditing, panel washing, and electrical inspection to keep your system at peak performance.',
    price: '99.99',
    originalPrice: '149.99',
  },
];

function ServiceCard({ image, title, rating, description, price, originalPrice, isNight }: ServiceItem & { isNight: boolean }) {
  return (
    <div className="bg-[#1C1C1C] rounded-2xl overflow-hidden w-full max-w-md ml-auto border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/10 flex flex-col h-[480px] sm:h-auto">
      <img src={image} alt={title} className="w-full h-44 sm:h-48 sm:aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700 shrink-0" referrerPolicy="no-referrer" />
      <div className="p-4 sm:p-6 flex flex-col flex-1 gap-3 justify-between min-h-0">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-white font-grotesk leading-tight">{title}</h3>
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 shrink-0">
              <Star className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${isNight ? 'text-[#07CCEA]' : 'text-[#CEFE49]'}`} />
              <span className="text-[10px] sm:text-xs font-semibold text-white">{rating}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans line-clamp-3 sm:line-clamp-4">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-2 sm:gap-3 mt-auto">
          <div className="group flex items-center gap-1 shrink-0 cursor-pointer">
            <button className="border border-white text-white font-semibold text-[10px] sm:text-xs md:text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full transition-transform group-hover:scale-[1.03] whitespace-nowrap pointer-events-none">
              Get Started
            </button>
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white flex items-center justify-center shrink-0 transition-transform group-hover:rotate-45 ${isNight ? 'group-hover:bg-[#07CCEA] group-hover:text-slate-950' : 'group-hover:bg-[#CEFE49] group-hover:text-[#1f2a1d]'}`}>
              <ArrowUpRight className="w-3 sm:w-4 h-3 sm:h-4 text-white group-hover:text-current transition-colors" />
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-white text-sm sm:text-lg whitespace-nowrap">${price}</p>
            <p className="text-[10px] sm:text-sm text-gray-500 line-through whitespace-nowrap">${originalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const aboutImg1 = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80';
const aboutImg2 = solarImage;
const avatarUrls = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
];

import { useTheme } from '../context';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isNight, setIsNight } = useTheme();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('#');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [servicesIndex, setServicesIndex] = useState(0);

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<any>(null);

  const lockScrollSpy = () => {
    isManualScrollRef.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'case-studies', 'contact'];
    const idMap: { [key: string]: string } = {
      'home': '#',
      'about': '#about',
      'services': '#services',
      'case-studies': '#case-studies',
      'contact': '#contact'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mappedHash = idMap[entry.target.id];
            if (mappedHash) {
              setActiveLink(mappedHash);
            }
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeightVal = heroRef.current?.offsetHeight || 800;
      const pastHero = currentScrollY > heroHeightVal;

      setIsScrolled(currentScrollY > 50);

      if (!pastHero) {
        setShowNav(true); // always visible within hero
      } else if (currentScrollY > lastScrollY) {
        setShowNav(false); // scrolling down -> hide
      } else {
        setShowNav(true); // scrolling up -> show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (menuOpen || isVideoOpen) {
      document.body.style.overflow = 'hidden';
      if (menuOpen) {
        // Run diagnostic logs to verify portal mounting and stacking context properties
        setTimeout(() => {
          const menuEl = document.querySelector('[data-mobile-menu]');
          console.group('--- MOBILE MENU DOM DIAGNOSTICS ---');
          console.log('Mobile menu open status:', menuOpen);
          console.log('Menu Element found in DOM:', !!menuEl);
          if (menuEl) {
            console.log('Element tag name:', menuEl.tagName);
            console.log('Parent Element tag name:', menuEl.parentElement?.tagName);
            console.log('Parent Element ID:', menuEl.parentElement?.id || '(none)');
            console.log('Parent Element ClassName:', menuEl.parentElement?.className || '(none)');
            
            // Check computed styles
            const computedStyle = window.getComputedStyle(menuEl);
            console.log('Computed position:', computedStyle.position);
            console.log('Computed z-index:', computedStyle.zIndex);
            console.log('Computed bg-color:', computedStyle.backgroundColor);
            console.log('Computed width / height:', computedStyle.width, 'x', computedStyle.height);
            console.log('Computed opacity:', computedStyle.opacity);
            
            // Trace full ancestor chain and stacking context properties
            let ancestor = menuEl.parentElement;
            const chain = [];
            while (ancestor) {
              const aStyle = window.getComputedStyle(ancestor);
              const hasTransform = aStyle.transform !== 'none';
              const hasFilter = aStyle.filter !== 'none';
              const hasWillChange = aStyle.willChange !== 'auto';
              const isNotStatic = aStyle.position !== 'static';
              const opacity = parseFloat(aStyle.opacity);
              
              chain.push({
                element: ancestor,
                tag: ancestor.tagName,
                id: ancestor.id,
                className: ancestor.className,
                position: aStyle.position,
                zIndex: aStyle.zIndex,
                transform: aStyle.transform,
                filter: aStyle.filter,
                willChange: aStyle.willChange,
                opacity: opacity
              });
              
              if (hasTransform || hasFilter || hasWillChange || isNotStatic || opacity < 1) {
                console.warn(`Stacking context trigger on ancestor <${ancestor.tagName.toLowerCase()} id="${ancestor.id}">:`, {
                  position: aStyle.position,
                  zIndex: aStyle.zIndex,
                  transform: aStyle.transform,
                  filter: aStyle.filter,
                  willChange: aStyle.willChange,
                  opacity: opacity
                });
              }
              ancestor = ancestor.parentElement;
            }
            console.log('Full DOM ancestor chain:', chain.map(c => `${c.tag}${c.id ? '#' + c.id : ''}`));
          }
          console.groupEnd();
        }, 600);
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, isVideoOpen]);

  // Handle window resize to close mobile menu on desktop breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isNight) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#090d16';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [isNight]);

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#case-studies', label: 'Case Studies' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <div className={`relative flex-1 rounded-3xl sm:rounded-[32px] overflow-hidden ${isNight ? 'bg-slate-900' : 'bg-[#FAFAFA]'} flex flex-col mb-6 sm:mb-8 md:mb-10 isolate transition-colors duration-500`}>
        {/* Hero Section Container */}
        <div id="home" ref={heroRef} className="relative min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] flex flex-col">
          {/* Background with requested blur overlay structure */}
      <div className="absolute inset-0 z-0 rounded-3xl sm:rounded-[32px] overflow-hidden">
        <div className="hero rounded-3xl sm:rounded-[32px] overflow-hidden">
          <div className="blur-overlay blur-overlay-top rounded-t-3xl sm:rounded-t-[32px]" />
          <div className="blur-overlay blur-overlay-bottom rounded-b-3xl sm:rounded-b-[32px]" />
          
          {/* Day Background image with smooth fade transition */}
          <motion.img
            key="day-bg-image"
            src={dayHouseImage}
            alt="Day background"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl sm:rounded-[32px]"
            style={{ zIndex: 1 }}
            referrerPolicy="no-referrer"
            animate={{ opacity: isNight ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Night Background image with smooth fade transition */}
          <motion.img
            key="night-bg-image"
            src={nightHouseImage}
            alt="Night background"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl sm:rounded-[32px]"
            style={{ zIndex: 1 }}
            referrerPolicy="no-referrer"
            animate={{ opacity: isNight ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

        {/* Content wrapper */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-6 md:px-[60px] pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-8 box-border">


        {/* Main hero stats and media content block */}
        <div className="flex-1 flex flex-col justify-end gap-10 mt-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-16">
            <div className="max-w-xl">
              {/* Top-left badge */}
              <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90 w-fit hero-anim hero-fade" style={{ animationDelay: '0.3s' }}>
                <Sun className={`w-4 h-4 ${isNight ? 'text-[#06CDEB]' : 'text-[#CEFE49]'}`} />
                <span>Renew. Power. Thrive.</span>
              </div>

              {/* Headline with fade-out mask on the last word */}
              <h2
                className="font-grotesk font-bold text-white leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mt-6 hero-anim hero-reveal"
                style={{ animationDelay: '0.45s' }}
              >
                <span className="block">Clean Energy,</span>
                <span
                  className="block"
                  style={{
                    maskImage: 'linear-gradient(90deg, #fff 55%, rgba(255,255,255,0.15) 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, #fff 55%, rgba(255,255,255,0.15) 85%, transparent 100%)',
                  }}
                >
                  Infinite Possibilities
                </span>
              </h2>

              {/* CTA row */}
              <div 
                className="group flex items-center gap-0 mt-8 cursor-pointer hero-anim hero-fade" 
                style={{ animationDelay: '0.6s' }}
                onClick={() => navigate('/quote')}
              >
                <button className="bg-white text-gray-900 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 group-hover:scale-[1.03] active:scale-95 z-10 pointer-events-none">
                  Get a Quote
                </button>
                <button className={`w-12 h-12 rounded-full border-0 border-transparent outline-none ring-0 focus:outline-none focus:ring-0 ${isNight ? 'bg-[#06CDEB] text-slate-950 group-hover:bg-[#06CDEB]/90' : 'bg-[#CEFE49] text-[#1f2a1d] group-hover:bg-[#CEFE49]/90'} flex items-center justify-center transition-all duration-300 group-hover:rotate-45 pointer-events-none`}>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stat cards and Media card on the right */}
            {/* Mobile Layout: Row 1 has two columns, Row 2 is full-width media card */}
            <div className="flex flex-col gap-4 sm:hidden w-full">
              <div className="grid grid-cols-2 gap-3 w-full">
                <StatCard value="72%" caption="Renewable energy has grown*" progress={72} isNight={isNight} />
                <StatCard value="89%" caption="Accelerating R.E Energy Expansion" progress={89} gauge isNight={isNight} />
              </div>
              <div className="w-full">
                <MediaCard isNight={isNight} mediaThumbnail={staticThumbnail} onPlayClick={() => setIsVideoOpen(true)} />
              </div>
            </div>

            {/* Desktop / Tablet Layout: Side-by-side arrangement */}
            <div className="hidden sm:flex flex-row items-stretch gap-3 w-full lg:w-auto max-w-[540px]">
              <div className="flex flex-col gap-3 w-44 flex-shrink-0">
                <StatCard value="72%" caption="Renewable energy has grown*" progress={72} isNight={isNight} />
                <StatCard value="89%" caption="Accelerating R.E Energy Expansion" progress={89} gauge isNight={isNight} />
              </div>
              <MediaCard isNight={isNight} mediaThumbnail={staticThumbnail} onPlayClick={() => setIsVideoOpen(true)} />
            </div>
          </div>

          {/* Theme Switcher at bottom center */}
          <div className="flex justify-center items-center pt-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="z-10 relative"
            >
              <ThemeToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />
            </motion.div>
          </div>
        </div>
      </div>
      </div>

      {/* About Section */}
      <section id="about" className={`py-20 lg:py-28 px-6 lg:px-16 rounded-b-3xl sm:rounded-b-[32px] transition-colors duration-500 ${isNight ? 'bg-slate-900 text-slate-100' : 'bg-[#FAFAFA] text-gray-900'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* LEFT: badge + image stack */}
          <div className="flex flex-col gap-5 h-full">
            <div className={`inline-flex items-center gap-2 border rounded-full px-4 py-2 w-fit shrink-0 transition-colors duration-500 ${isNight ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-900'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#CEFE49]" />
              <span className={`text-[11px] font-bold tracking-wider font-jakarta transition-colors duration-500 ${isNight ? 'text-white' : 'text-gray-900'}`}>WHO WE ARE</span>
            </div>

            <div className="flex flex-col gap-5 flex-1 min-h-0">
              <img src={aboutImg1} alt="Solar farm on hillside" className="w-full flex-1 min-h-0 object-cover rounded-3xl animate-fade-in" referrerPolicy="no-referrer" />
              <img src={aboutImg2} alt="Aerial lake view with rooftop panels" className="w-full flex-1 min-h-0 object-cover rounded-3xl animate-fade-in" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* RIGHT: heading + CTA + cards */}
          <div className="flex flex-col gap-8">
            <h2 className={`font-jakarta font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] transition-colors duration-500 ${isNight ? 'text-white' : 'text-gray-900'}`}>
              We provide sustainable and affordable solar energy solutions to power homes{' '}
              <span className="text-gray-400">and businesses, helping reduce energy costs and protect the environment for a cleaner future.</span>
            </h2>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="group flex items-center gap-1 w-fit">
                <button className={`font-bold text-sm px-6 py-3 rounded-full transition-all duration-500 group-hover:scale-[1.03] active:scale-95 cursor-pointer border-0 outline-none ${isNight ? 'bg-[#07CCEA] text-slate-950' : 'bg-[#CEFE49] text-gray-900'}`}>
                  Read More
                </button>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 ${isNight ? 'bg-slate-800 text-white' : 'bg-gray-900 text-white'}`}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {avatarUrls.map((src, i) => (
                    <img key={i} src={src} className="w-9 h-9 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" alt="" />
                  ))}
                </div>
                <div>
                  <div className={`flex gap-0.5 transition-colors duration-500 ${isNight ? 'text-[#07CCEA]' : 'text-[#CEFE49]'}`}>
                    {[...Array(4)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    <StarHalf className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 font-jakarta">500+ Happy Customers</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FeatureCard icon={<BadgeCheck className={`w-8 h-8 ${isNight ? 'text-[#06CDEB]' : 'text-gray-900'}`} strokeWidth={1.5} />} title="Certified Experts" desc="Experienced solar engineers and licensed technicians." isNight={isNight} />
              <FeatureCard icon={<Leaf className={`w-8 h-8 ${isNight ? 'text-[#06CDEB]' : 'text-gray-900'}`} strokeWidth={1.5} />} title="Eco-Friendly Systems" desc="Environmentally conscious and energy-efficient panel installations." isNight={isNight} />
              <FeatureCard icon={<Sun className={`w-8 h-8 ${isNight ? 'text-[#06CDEB]' : 'text-gray-900'}`} strokeWidth={1.5} />} title="Seamless Installation" desc="Hassle-free process from assessment to activation." isNight={isNight} />
              <FeatureCard icon={<Hourglass className={`w-8 h-8 ${isNight ? 'text-[#06CDEB]' : 'text-gray-900'}`} strokeWidth={1.5} />} title="Long-Term Savings" desc="Reduce utility bills and maximize energy independence." isNight={isNight} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`px-4 sm:px-6 lg:px-10 py-10 transition-colors duration-500 ${isNight ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="relative bg-black rounded-[2rem] px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 max-w-[1600px] mx-auto overflow-hidden">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 w-fit">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isNight ? 'bg-[#07CCEA]' : 'bg-[#CEFE49]'}`} />
            <span className="text-[11px] font-bold tracking-wider text-white font-grotesk">OUR SERVICES</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end mt-12 sm:mt-16">
            {/* LEFT: heading + paragraph */}
            <div className="flex flex-col gap-6">
              <h2 className="font-grotesk font-extrabold text-4xl lg:text-5xl leading-[1.1] text-white">
                Harness the Sun's Energy Solutions
              </h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-md font-sans">
                Explore our range of solar services designed to reduce your energy bills, lower carbon footprint, and ensure long-term environmental and financial benefits.
              </p>
            </div>

            {/* RIGHT: service card & controls in a clean flex layout */}
            <div className="flex items-stretch gap-3 sm:gap-4 lg:gap-6 w-full max-w-md ml-auto">
              <div className="flex-1 min-w-0">
                <motion.div
                  key={servicesIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full"
                >
                  <ServiceCard
                    {...servicesData[servicesIndex]}
                    isNight={isNight}
                  />
                </motion.div>
              </div>

              {/* Controls column — sibling, NOT absolute, NOT inside the card */}
              <div className="flex flex-col items-center justify-between py-1 shrink-0">
                {/* Up Button */}
                <button
                  onClick={() => setServicesIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer border-0 transition-all duration-500 hover:scale-105 active:scale-95 outline-none ${isNight ? 'bg-[#07CCEA] text-slate-950 hover:bg-[#07CCEA]/90' : 'bg-[#CEFE49] text-black hover:bg-[#CEFE49]/90'}`}
                  title="Previous Service"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Vertical Dash Indicator */}
                <div className="flex flex-col items-center gap-2 flex-1 justify-center my-4">
                  {servicesData.map((_, i) => {
                    const isActive = i === servicesIndex;
                    if (isActive) {
                      return (
                        <button
                          key={i}
                          onClick={() => setServicesIndex(i)}
                          className="w-[2px] h-10 rounded-full transition-all duration-300 outline-none border-0 p-0 cursor-pointer"
                          style={{ backgroundColor: isNight ? '#07CCEA' : '#CEFE49' }}
                          title={`Active Service ${i + 1}`}
                        />
                      );
                    } else {
                      return (
                        <button
                          key={i}
                          onClick={() => setServicesIndex(i)}
                          className="w-[2px] h-6 rounded-full transition-all duration-300 hover:bg-gray-400 outline-none border-0 p-0 cursor-pointer"
                          style={{ borderLeft: '2px dashed #4B5563', background: 'none' }}
                          title={`Go to Service ${i + 1}`}
                        />
                      );
                    }
                  })}
                </div>

                {/* Down Button */}
                <button
                  onClick={() => setServicesIndex((prev) => (prev + 1) % servicesData.length)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-95 text-white outline-none"
                  title="Next Service"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Testimonials Section */}
      <CaseStudies isNight={isNight} />

      {/* Global Footer / Contact Section */}
      </div>

      {/* Fullscreen Video Popup Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-black/85 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsVideoOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full h-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border-0 border-transparent outline-none ring-0 focus:outline-none focus:ring-0 cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <video
              src={demoVideo}
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}



