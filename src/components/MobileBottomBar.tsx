import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageView } from '../types';
import { Button } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileBottomBarProps {
  onViewChange: (view: PageView) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onViewChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom bar only on mobile/tablet when scrolled down past 120px
      if (window.innerWidth < 768) {
        setIsVisible(window.scrollY > 120);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleBeginClick = () => {
    onViewChange('begin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0E0B07]/90 backdrop-blur-md border-t border-gold-mid px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl flex items-center justify-between gap-3 min-h-[76px]"
        >
          {/* Ghost WhatsApp CTA Button */}
          <Button
            href="https://wa.me/919482698612?text=Hari%20Om,%20I%20am%20interested%20in%20learning%20Sanskrit%20and%20Vedic%20wisdom."
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="flex-1 !px-2"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
            <span>Write</span>
          </Button>

          {/* Primary Gold CTA Button */}
          <Button
            to="/begin"
            variant="primary"
            className="flex-[1.5] !px-2 group"
          >
            <span>Begin Journey</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
