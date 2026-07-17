import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Pause, Play, ChevronLeft, ChevronRight, BadgeCheck, Leaf, Hourglass, Sun, Sparkles } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  thumbnail: string;
  mainImage: string;
  brand: string;
  icon: any;
  duration: number; // in seconds
}

const testimonials: Testimonial[] = [
  {
    name: "Johny Guetaro",
    role: "CEO, TeamTalk",
    quote: "Techren Solar completely transformed our headquarters' energy grid. We slashed our carbon footprint and saved over $40,000 in our first year alone!",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "TEAMTALK",
    icon: BadgeCheck,
    duration: 120,
  },
  {
    name: "Lina Gomez",
    role: "Founder, Bloom Cafe",
    quote: "Installing their rooftop solar array gave our cozy local cafe 100% clean power. Our customers love supporting an eco-friendly business!",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "BLOOM CAFE",
    icon: Leaf,
    duration: 94,
  },
  {
    name: "Haruto Tanaka",
    role: "Facility Manager, Apex Logistics",
    quote: "We added their state-of-the-art battery backup systems, and now our entire automated fulfillment warehouse runs uninterrupted during severe storms.",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "APEX LOGS",
    icon: Hourglass,
    duration: 145,
  },
  {
    name: "Emily Rhodes",
    role: "Eco Columnist, GreenLife",
    quote: "Their custom residential design blended perfectly with my home architecture while providing robust, high-efficiency solar harvesting day after day.",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "GREENLIFE",
    icon: Sparkles,
    duration: 110,
  },
  {
    name: "Marcus Vance",
    role: "VP of Operations, NeoPower Labs",
    quote: "The thermographic scanning and efficiency auditing was incredibly eye-opening. They found and resolved system leaks we didn't even know existed.",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "NEOPOWER",
    icon: BadgeCheck,
    duration: 135,
  },
  {
    name: "Sophia Chen",
    role: "COO, Nexus Commerce",
    quote: "Switching to Techren Solar's commercial installations was the best operational decision we made. Slashed monthly overhead by 35% instantly.",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "NEXUS CO",
    icon: Leaf,
    duration: 150,
  },
  {
    name: "David Miller",
    role: "Owner, Miller Farms",
    quote: "Powering our smart automated irrigation pumps with solar panels keeps operational costs extremely low, making our agricultural yields far more profitable.",
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "MILLER FARMS",
    icon: Sun,
    duration: 180,
  },
  {
    name: "Elena Rostova",
    role: "Sustainability Officer, BioFlow Corp",
    quote: "Their team handled everything from local zoning permits to utility grid connections seamlessly. It was an exceptionally professional, turn-key experience.",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "BIOFLOW",
    icon: Sparkles,
    duration: 105,
  },
  {
    name: "Julian Mercer",
    role: "Principal Architect, Climatix Design",
    quote: "We partner exclusively with Techren Solar for our sustainable high-rise projects. Their technical execution and panel styling are unmatched.",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "CLIMATIX",
    icon: Hourglass,
    duration: 160,
  },
  {
    name: "Amara Okafor",
    role: "Executive Director, Helios Microgrids",
    quote: "By deploying solar-plus-storage mini-grids in rural communities, we have brought reliable, resilient power to hundreds of families for the first time.",
    thumbnail: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "HELIOS",
    icon: Sun,
    duration: 125,
  },
  {
    name: "Liam Carter",
    role: "Asset Manager, Terra Heights Estates",
    quote: "Our residential microgrids boosted the value of every home in the development. Homeowners absolutely love having independent clean energy.",
    thumbnail: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "TERRA HEIGHTS",
    icon: BadgeCheck,
    duration: 140,
  },
  {
    name: "Natalie Watson",
    role: "Managing Director, Omni Energy",
    quote: "They designed a massive, ground-mounted industrial array that exceeded our baseline power estimates, delivering peak efficiency even in heavy overcast.",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=300&q=80",
    mainImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&h=675&q=80",
    brand: "OMNI ENERGY",
    icon: Sparkles,
    duration: 175,
  },
];

interface CaseStudiesProps {
  isNight: boolean;
}

export default function CaseStudies({ isNight }: CaseStudiesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const activeTestimonial = testimonials[activeIndex];
  const duration = activeTestimonial.duration;

  // Track progress and count elapsed/remaining time
  useEffect(() => {
    let intervalId: any = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0; // reset
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, duration]);

  // Handle slide/testimonial swap
  useEffect(() => {
    setElapsedTime(0);
    setIsPlaying(false); // Disable autoplay
  }, [activeIndex]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = Math.max(0, Math.min(1, clickX / width));
    setElapsedTime(Math.round(clickPercent * duration));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${String(rem).padStart(2, '0')}`;
  };

  const progressPercent = (elapsedTime / duration) * 100;
  const remaining = duration - elapsedTime;
  const currentPage = activeIndex + 1;
  const totalPages = testimonials.length;
  const ActiveIcon = activeTestimonial.icon;

  return (
    <section
      id="case-studies"
      className={`transition-colors duration-500 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-16 ${
        isNight ? 'bg-slate-900 text-slate-100' : 'bg-[#F5F5F4] text-gray-900'
      }`}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 border rounded-full px-4 py-2 w-fit shadow-sm transition-all duration-500 ${
            isNight ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#CEFE49]" />
          <span className="text-[11px] font-bold tracking-wider uppercase font-grotesk">
            TRUSTED VOICES
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`font-grotesk font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight transition-colors duration-500 ${
            isNight ? 'text-white' : 'text-gray-900'
          }`}
        >
          What Our Happy Clients Are Saying
        </h2>

        {/* Subheading */}
        <p
          className={`text-sm max-w-md transition-colors duration-500 ${
            isNight ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Hear real stories from satisfied clients who have experienced clean, sustainable energy and massive cost savings with Techren Solar.
        </p>

        {/* Main testimonial video card */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mt-8 shadow-2xl bg-black border border-white/5 group">
          {/* Animated Transition for background image */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img
              src={activeTestimonial.mainImage}
              alt={activeTestimonial.name}
              className="absolute inset-0 w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/45" />
          </motion.div>

          {/* Top row: name/role + brand logo */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-start justify-between z-10">
            <div className="text-left">
              <p className="font-bold text-white text-xs sm:text-base md:text-lg filter drop-shadow">
                {activeTestimonial.name}
              </p>
              <p className="text-white/80 text-[10px] sm:text-xs md:text-sm filter drop-shadow">
                {activeTestimonial.role}
              </p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold tracking-wider text-[10px] sm:text-xs md:text-sm bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 select-none">
              <ActiveIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CEFE49]" />
              <span className="uppercase">{activeTestimonial.brand}</span>
            </div>
          </div>

          {/* Quote */}
          <div className="absolute inset-x-4 sm:inset-x-10 bottom-16 sm:bottom-24 text-center z-10 flex flex-col items-center justify-center pointer-events-none">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-white text-xs sm:text-base md:text-lg lg:text-2xl font-medium leading-snug max-w-[90%] sm:max-w-[85%] filter drop-shadow-lg font-sans"
            >
              "{activeTestimonial.quote}"
            </motion.p>
          </div>

          {/* Scrubber */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center gap-2 sm:gap-3 z-10 bg-black/40 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none p-2 sm:p-0 rounded-full border border-white/5 sm:border-0">
            <button
              onClick={togglePlay}
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
              ) : (
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
              )}
            </button>
            <span className="text-[9px] sm:text-xs text-white/80 font-mono select-none shrink-0">
              {formatTime(elapsedTime)}
            </span>
            <div
              onClick={handleScrub}
              className="flex-1 h-[3px] sm:h-[4px] bg-white/30 rounded-full relative cursor-pointer group/bar overflow-visible flex items-center"
            >
              <div
                className="h-full bg-white rounded-full group-hover/bar:bg-[#CEFE49] transition-colors"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-lg"
                style={{ left: `calc(${progressPercent}% - 4px)` }}
              />
            </div>
            <span className="text-[9px] sm:text-xs text-white/80 font-mono select-none shrink-0">
              -{formatTime(remaining)}
            </span>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="w-full flex gap-4 sm:gap-5 overflow-x-auto mt-6 pb-2 scrollbar-hide snap-x scroll-smooth">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 w-[130px] sm:w-[180px] flex flex-col gap-2 text-left transition-all duration-300 focus:outline-none scroll-mx-4 snap-start border border-transparent rounded-2xl ${
                i === activeIndex
                  ? 'scale-[1.02] opacity-100'
                  : 'opacity-60 hover:opacity-90'
              }`}
            >
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                <img
                  src={t.thumbnail}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {i === activeIndex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/35 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                      {isPlaying ? (
                        <Pause className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white fill-white" />
                      ) : (
                        <Play className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white fill-white ml-0.5" />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="px-1">
                <p className={`font-bold text-xs sm:text-sm truncate leading-tight ${isNight ? 'text-white' : 'text-gray-900'}`}>
                  {t.name}
                </p>
                <p className={`text-[10px] sm:text-xs truncate ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.role}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div
          className={`inline-flex items-center gap-4 border rounded-full px-4 py-2 mt-4 shadow-sm transition-all duration-500 ${
            isNight ? 'bg-slate-800 border-slate-700 text-slate-300 animate-fade-in' : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <button
            onClick={goPrev}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer outline-none border-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs sm:text-sm select-none font-medium">
            <span className="font-bold">{currentPage}</span>
            <span className={isNight ? 'text-gray-500' : 'text-gray-400'}> of {totalPages}</span>
          </span>
          <button
            onClick={goNext}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer outline-none border-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
