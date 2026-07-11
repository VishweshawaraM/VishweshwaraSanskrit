import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Slide {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

interface HeroSlideshowProps {
  slides: Slide[];
  interval?: number;
  onBeginClick: () => void;
  onExploreClick: () => void;
}

export function HeroSlideshow({ slides, interval = 5000, onBeginClick, onExploreClick }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], ['0%', '20%']);

  useEffect(() => {
    if (slides.length <= 1 || !isPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides, interval, isPlaying]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const togglePlay = () => setIsPlaying(!isPlaying);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-[#0E0B07] text-white">
      {/* Background Image Slideshow with Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-[-10%] w-[120%] h-[120%] z-0 pointer-events-none">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].image}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            alt={`Slide ${currentIndex + 1}`}
          />
        </AnimatePresence>
      </motion.div>

      {/* Gradient Overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B07] via-transparent to-transparent z-10 pointer-events-none opacity-80" />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-4 sm:px-6 md:px-16 max-w-7xl mx-auto w-full pt-28 md:pt-32 pb-8 md:pb-10">
        
        <div className="max-w-4xl space-y-6 relative mt-auto mb-16 md:ml-auto w-full md:w-auto flex flex-col items-center md:items-end">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction === 1 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -40 : 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[69px] font-bold text-white tracking-tight leading-[1.1] md:leading-[1.05] md:-mb-3 md:-mr-[10px] md:ml-[1px] mt-0 pb-0 pr-0 md:border-[#c98400] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-center md:text-right px-2 md:px-0">
                {slides[currentIndex].title}
              </h1>
              <div className="font-sans text-[15px] sm:text-base md:text-lg text-white/90 leading-relaxed w-full md:w-[725px] max-w-full md:mb-[5px] font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center md:text-right md:ml-auto mt-4 md:mt-0 px-4 md:px-0">
                {slides[currentIndex].subtitle}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-4 mt-8 md:mt-8 w-full md:w-auto px-4 md:px-0">
                <button 
                  onClick={onBeginClick}
                  className="w-full sm:w-auto px-6 py-3.5 md:py-3 bg-gold-base hover:bg-gold-bright text-ground font-mono text-sm tracking-widest uppercase transition-colors shadow-lg active:scale-95 rounded-sm"
                >
                  Begin Journey
                </button>
                <button 
                  onClick={onExploreClick}
                  className="w-full sm:w-auto px-6 py-3.5 md:py-3 bg-transparent border border-white/30 hover:border-gold-mid text-white hover:text-gold-bright font-mono text-sm tracking-widest uppercase transition-colors shadow-lg active:scale-95 backdrop-blur-sm rounded-sm"
                >
                  Explore Teachings
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="flex justify-between items-end">
          
          {/* Play/Pause Button */}
          <div className="flex items-center">
            <button 
              onClick={togglePlay}
              className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 bg-black/40 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-gold-base hover:border-gold-base transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 md:w-3 md:h-3" /> : <Play className="w-4 h-4 md:w-3 md:h-3 ml-0.5" />}
            </button>
          </div>

          {/* Slider Navigation Arrows */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-1.5 py-1.5 rounded-full border border-white/10">
            <button 
              onClick={prevSlide}
              className="p-2 md:p-1.5 rounded-full bg-transparent text-white hover:bg-gold-base transition-colors"
            >
              <ChevronLeft size={18} className="md:w-[14px] md:h-[14px]" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 md:p-1.5 rounded-full bg-transparent text-white hover:bg-gold-base transition-colors"
            >
              <ChevronRight size={18} className="md:w-[14px] md:h-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
