import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
  isNight: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isNight, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle-button"
      onClick={onToggle}
      className="relative w-[84px] h-[38px] rounded-full p-[3px] cursor-pointer overflow-hidden select-none shadow-inner border border-neutral-200/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      aria-label="Toggle day and night mode"
    >
      {/* Background gradients and visual skies */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: isNight
            ? 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)' // deep starry midnight
            : 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)', // bright sky day
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Cloud Layers (Visible in Day mode) */}
      <AnimatePresence>
        {!isNight && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Stacked stylized vector clouds on the right side */}
            <div className="absolute right-1 bottom-[-2px] w-[34px] h-[18px] bg-white/30 rounded-t-full" />
            <div className="absolute right-4 bottom-[-1px] w-[26px] h-[15px] bg-white/50 rounded-t-full" />
            <div className="absolute right-2 bottom-[-2px] w-[30px] h-[16px] bg-white/70 rounded-t-full" />
            
            {/* Soft day atmospheric ring */}
            <div className="absolute left-6 top-1 w-8 h-8 rounded-full border border-white/10" />
            <div className="absolute left-4 top-2 w-10 h-10 rounded-full border border-white/5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Star/Space Layers (Visible in Night mode) */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none flex items-center pl-2.5 gap-1.5"
          >
            {/* Stars */}
            <div className="w-[3px] h-[3px] bg-white rounded-full animate-pulse [animation-duration:2.5s]" />
            <div className="w-[4px] h-[4px] bg-white/90 rounded-full animate-pulse [animation-duration:1.5s]" />
            <div className="w-[2px] h-[2px] bg-white rounded-full" />
            
            {/* A small sparkling cross-star on the left */}
            <div className="relative w-2.5 h-2.5 opacity-90 animate-pulse [animation-duration:3s]">
              <span className="absolute inset-0 m-auto w-[1px] h-2.5 bg-white" />
              <span className="absolute inset-0 m-auto w-2.5 h-[1px] bg-white" />
            </div>

            {/* Micro stars */}
            <div className="absolute left-9 top-1.5 w-[2px] h-[2px] bg-white/50 rounded-full" />
            <div className="absolute left-11 top-6 w-[2px] h-[2px] bg-white/70 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Handle (Sun / Moon) */}
      <motion.div
        className="absolute top-[2px] left-[3px] z-10 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
        animate={{
          x: isNight ? 44 : 0,
          backgroundColor: isNight ? '#d1d5db' : '#facc15', // Moon (gray-300) vs Sun (yellow-400)
          boxShadow: isNight
            ? '0 0 10px rgba(226,232,240,0.6), inset -2px -2px 5px rgba(0,0,0,0.25), inset 2px 2px 5px rgba(255,255,255,0.4)'
            : '0 0 14px rgba(250,204,21,0.8), inset -2px -2px 5px rgba(0,0,0,0.15), inset 2px 2px 5px rgba(255,255,255,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        {isNight ? (
          // Moon Craters (Inspiration-accurate craters)
          <div className="relative w-full h-full rounded-full bg-neutral-300">
            <div className="absolute top-[6px] left-[6px] w-[7px] h-[7px] bg-neutral-400/80 rounded-full shadow-inner" />
            <div className="absolute bottom-[5px] left-[13px] w-[5px] h-[5px] bg-neutral-400/80 rounded-full shadow-inner" />
            <div className="absolute top-[16px] right-[5px] w-[4px] h-[4px] bg-neutral-400/80 rounded-full shadow-inner" />
          </div>
        ) : (
          // Sun Inner Glow Accent
          <div className="w-[18px] h-[18px] bg-amber-400 rounded-full opacity-90 animate-pulse [animation-duration:3s]" />
        )}
      </motion.div>
    </button>
  );
}
