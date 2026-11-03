import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from './Button';

interface Slide {
  image: string;
  alt?: string;
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
  const [isPlaying, setIsPlaying] = useState(() => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

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
    <div className="on-maroon relative w-full min-h-[100svh] overflow-hidden">
      {/* Background image slideshow with gentle parallax */}
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
            alt={slides[currentIndex].alt ?? ''}
            width={1672}
            height={941}
            decoding="async"
            fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
          />
        </AnimatePresence>
      </motion.div>

      {/* Maroon tint keeps the photograph warm and the text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-ruby-deep/95 via-ruby-deep/75 to-ruby-deep/15 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ruby-deep/90 via-transparent to-ruby-deep/40 z-10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-5 sm:px-8 md:px-16 max-w-7xl mx-auto w-full pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-2xl mt-auto mb-10 md:mb-16 w-full">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p lang="sa" className="font-devanagari text-lg md:text-xl text-text-gold mb-5 flex items-center gap-4">
                <span aria-hidden="true" className="inline-block w-10 h-px bg-gold-base"></span>
                विद्या ददाति विनयम्
              </p>
              <h2 className="font-display text-[2.6rem] sm:text-6xl md:text-7xl font-light text-text-primary tracking-[-0.02em] leading-[1.04]">
                {slides[currentIndex].title}
              </h2>
              <div className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mt-6">
                {slides[currentIndex].subtitle}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-9">
                <Button onClick={onBeginClick} variant="primary" className="w-full sm:w-auto">
                  Begin Journey
                </Button>
                <Button onClick={onExploreClick} variant="outline" className="w-full sm:w-auto !text-text-primary">
                  Explore Teachings
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="flex justify-between items-end">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="flex items-center justify-center w-10 h-10 border border-gold-mid text-text-primary rounded-full hover:bg-gold-base hover:text-gold-ink hover:border-gold-base transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="flex items-center gap-1 border border-gold-mid rounded-full p-1">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-2.5 rounded-full text-text-primary hover:bg-gold-base hover:text-gold-ink transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-label text-[11px] tracking-widest text-text-secondary tabular-nums px-1" aria-hidden="true">
              {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-2.5 rounded-full text-text-primary hover:bg-gold-base hover:text-gold-ink transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Temple-border edge */}
      <div aria-hidden="true" className="temple-edge absolute bottom-0 left-0 right-0 z-30"></div>
    </div>
  );
}
