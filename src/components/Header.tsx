import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown, Sparkles, GraduationCap } from 'lucide-react';
import { Logo } from './Logo';
import { PageView } from '../types';
import { Button } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  currentView: PageView;
  onViewChange: (view: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTeachingsDropdownOpen, setIsTeachingsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'about', label: 'About', view: 'about' as PageView },
  ];

  const subjects = [
    { id: 'gita', name: 'Bhagavad Gita', desc: 'Sadhana & Shastra Bhashya' },
    { id: 'samskrita', name: 'Sanskrit Language', desc: 'Foundations & Conversational Grammar' },
    { id: 'veda', name: 'Veda Chanting', desc: 'Vedic Phonetics & Svara Chanting' },
    { id: 'vedanta', name: 'Advaita Vedanta', desc: 'Prakarana Granthas & Upanishads' },
    { id: 'puja', name: 'Puja Vidhi', desc: 'Science & Art of Ritual Worship' },
    { id: 'stotra', name: 'Stotras and Suktams', desc: 'Devotional Metric Verses' },
  ];

  const handleNavClick = (view: PageView) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
    setIsTeachingsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-[#060504]/75 backdrop-blur-xl border-b border-gold-mid/60 shadow-lg py-3'
            : 'bg-gradient-to-b from-[#060504]/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Brand Logo Wordmark */}
          <Link to="/" onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }} className="z-50">
            <Logo variant="horizontal" />
          </Link>

          {/* Desktop Navigation - 3 + 1 */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Teachings Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsTeachingsDropdownOpen(true)}
              onMouseLeave={() => setIsTeachingsDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 font-mono text-xs tracking-[0.12em] uppercase transition-colors py-2 px-3 rounded-lg hover:text-text-gold ${
                  currentView === 'teachings' ? 'text-text-gold font-semibold' : 'text-text-secondary'
                }`}
              >
                <span>Teachings</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-220 ${isTeachingsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Overlay */}
              <AnimatePresence>
                {isTeachingsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-[#0E0B07] border border-gold-mid rounded-lg p-5 shadow-2xl z-50 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gold-dim">
                      <span className="font-mono text-[10px] tracking-widest text-text-gold uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Core Subjects
                      </span>
                      <Link
                        to="/teachings"
                        onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                        className="text-[10px] font-mono tracking-wider text-text-tertiary hover:text-text-gold transition-colors"
                      >
                        View Teaching Approach →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {subjects.map((sub) => (
                        <Link
                          to="/teachings"
                          key={sub.id}
                          onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                          className="group flex flex-col p-2.5 rounded-md hover:bg-surface-3 transition-all duration-150 cursor-pointer border border-transparent hover:border-gold-dim"
                        >
                          <span className="font-serif text-sm text-text-primary group-hover:text-text-gold transition-colors font-medium">
                            {sub.name}
                          </span>
                          <span className="font-sans text-[10px] text-text-tertiary mt-0.5 leading-tight group-hover:text-text-secondary transition-colors">
                            {sub.desc}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold-dim text-center">
                      <Link
                        to="/teachings"
                        onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                        className="inline-flex items-center justify-center space-x-1 font-mono text-[10px] tracking-wider text-text-gold hover:text-gold-bright transition-colors uppercase"
                      >
                        <GraduationCap className="w-3 h-3" />
                        <span>Explore Curriculum details</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simple Link - About */}
            <Link
              to="/about"
              onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
              className={`font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:text-text-gold ${
                currentView === 'about' ? 'text-text-gold font-semibold' : 'text-text-secondary'
              }`}
            >
              About
            </Link>

            {/* Simple Link - Testimonials */}
            <Link
              to="/testimonials"
              onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
              className={`font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:text-text-gold ${
                currentView === 'testimonials' ? 'text-text-gold font-semibold' : 'text-text-secondary'
              }`}
            >
              Students
            </Link>

            {/* Simple Link - Dakshina */}
            <Link
              to="/dakshina"
              onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
              className={`font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:text-text-gold ${
                currentView === 'dakshina' ? 'text-text-gold font-semibold' : 'text-text-secondary'
              }`}
            >
              Dakshina
            </Link>

            {/* CTA Button - Begin (Only conversion needed) */}
            <Button
              to="/begin"
              onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
              variant="primary"
              className="group !px-5"
            >
              <span>Begin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
            </Button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-gold transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay (Translate from Right) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <React.Fragment key="mobile-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            />
            
            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-[340px] bg-[#0E0B07] border-l border-gold-mid z-[60] flex flex-col p-6 shadow-2xl backdrop-blur-md overflow-y-auto"
            >
              {/* Top Logo / Spacer */}
              <div className="flex justify-between items-center -mt-2 shrink-0">
                <Logo variant="horizontal" size={32} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-text-secondary hover:text-text-gold transition-colors shrink-0"
                  aria-label="Close navigation menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
              <div className="h-[1px] w-full bg-gold-dim my-6 shrink-0"></div>

            {/* Nav Menu List */}
            <nav className="flex flex-col space-y-4 text-left flex-1 mb-8">
              <Link
                to="/"
                onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                className={`font-serif text-xl tracking-wide text-left py-3 hover:text-text-gold transition-colors ${
                  currentView === 'home' ? 'text-text-gold' : 'text-text-secondary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/teachings"
                onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                className={`font-serif text-xl tracking-wide text-left py-3 hover:text-text-gold transition-colors ${
                  currentView === 'teachings' ? 'text-text-gold' : 'text-text-secondary'
                }`}
              >
                Teachings
              </Link>
              <Link
                to="/about"
                onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                className={`font-serif text-xl tracking-wide text-left py-3 hover:text-text-gold transition-colors ${
                  currentView === 'about' ? 'text-text-gold' : 'text-text-secondary'
                }`}
              >
                About Acharya
              </Link>
              <Link
                to="/dakshina"
                onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                className={`font-serif text-xl tracking-wide text-left py-3 hover:text-text-gold transition-colors ${
                  currentView === 'dakshina' ? 'text-text-gold' : 'text-text-secondary'
                }`}
              >
                Guru Dakshina
              </Link>
              <Link
                to="/testimonials"
                onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                className={`font-serif text-xl tracking-wide text-left py-3 hover:text-text-gold transition-colors ${
                  currentView === 'testimonials' ? 'text-text-gold' : 'text-text-secondary'
                }`}
              >
                Student Voices
              </Link>
            </nav>

            {/* Bottom Actions */}
            <div className="space-y-4 shrink-0 pb-4">
              <div className="h-[1px] w-full bg-gold-dim mb-6"></div>
              <Button
                to="/begin"
                onClick={() => { setIsMobileMenuOpen(false); setIsTeachingsDropdownOpen(false); }}
                variant="primary"
                className="w-full group"
              >
                <span>Begin Your Journey</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                href="https://wa.me/919482698612?text=Hari%20Om,%20I%20am%20interested%20in%20learning%20Sanskrit%20and%20Vedic%20wisdom."
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className="w-full flex items-center justify-center space-x-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};
