import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from './Button';

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

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides, interval]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0E0B07] text-white">
      {/* Background Image Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={slides[currentIndex].image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt={`Slide ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {/* Gradient Overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B07] via-transparent to-transparent z-10 pointer-events-none opacity-80" />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto w-full pt-20">
        
        <div className="max-w-3xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
                {slides[currentIndex].title}
              </h1>
              <div className="font-sans text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl mb-8">
                {slides[currentIndex].subtitle}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button onClick={onBeginClick} variant="primary" className="w-full sm:w-auto">
                  Begin Your Journey
                </Button>
                <Button onClick={onExploreClick} variant="secondary" className="w-full sm:w-auto bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50">
                  Explore Subjects
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls and info block */}
        <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0">
          
          {/* Info Block with "Play" styling like user's screenshot */}
          <div className="flex items-start gap-4 max-w-md bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <button className="flex items-center justify-center w-12 h-12 shrink-0 bg-white text-black rounded-full hover:bg-gold-base hover:text-white transition-colors">
              <Play className="w-5 h-5 ml-1" />
            </button>
            <p className="text-sm text-gray-300">
              We prioritize traditional, uncompromising oral transmission of ancient wisdom. Disconnect from the noise and connect with the source.
            </p>
          </div>

          {/* Slider Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
