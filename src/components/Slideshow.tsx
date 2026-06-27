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

export function HeroSlideshow({ slides, interval = 6000, onBeginClick, onExploreClick }: HeroSlideshowProps) {
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
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0E0B07] text-white">
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
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto w-full pt-20">
        
        <div className="max-w-3xl space-y-6 relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction === 1 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -40 : 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#FAFAFA] via-gold-bright to-gold-base tracking-tight leading-[1.05] mb-6 drop-shadow-sm">
                {slides[currentIndex].title}
              </h1>
              <div className="font-sans text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mb-10 font-medium">
                {slides[currentIndex].subtitle}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16 flex justify-between items-end">
          
          {/* Play/Pause Button */}
          <div className="flex items-center">
            <button 
              onClick={togglePlay}
              className="flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-gold-base hover:border-gold-base transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Slider Navigation Arrows */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-1 py-1 rounded-full border border-white/10">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-transparent text-white hover:bg-gold-base transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-transparent text-white hover:bg-gold-base transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
