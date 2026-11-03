import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp, Send, Instagram, Facebook, Star } from 'lucide-react';
import { Logo } from './Logo';
import { PageView } from '../types';
import { Button } from './Button';
import { Share } from './Share';

interface FooterProps {
  onViewChange: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (view: PageView) => {
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-1 border-t border-gold-mid pt-16 pb-8 px-4 md:px-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-[#C8860A]/2 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
        {/* Column 1 - Brand Identity */}
        <div className="md:col-span-1 space-y-4">
          <Logo variant="horizontal" size={38} />
          <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-sm mt-3">
            A Living tradition brought into the digital era, dedicated to the uncompromising oral & analytical transmission of Vedas, Vyakarana, and Shastras.
          </p>
          <div className="pt-2 flex items-center space-x-3">
            <span className="font-mono text-[10px] tracking-[0.15em] text-text-gold uppercase">Traditional Lineage</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-bright animate-pulse-slow"></span>
          </div>
        </div>

        {/* Column 2 - Shastra Traditions */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs tracking-[0.15em] text-text-gold uppercase font-semibold">
            Traditions
          </h4>
          <ul className="space-y-2.5">
            {['Samskrita Language', 'Bhagavad Gita', 'Veda Mantra Chanting', 'Advaita Vedanta', 'Puja Vidhi & Rituals'].map((item) => (
              <li key={item}>
                <Link
                  to="/teachings"
                  onClick={scrollToTop}
                  className="font-sans text-xs text-text-tertiary hover:text-text-gold transition-colors text-left"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Navigation */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs tracking-[0.15em] text-text-gold uppercase font-semibold">
            Institutional
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/about" onClick={scrollToTop} className="font-sans text-xs text-text-tertiary hover:text-text-gold transition-colors">
                The Acharya's Story
              </Link>
            </li>
            <li>
              <Link to="/teachings" onClick={scrollToTop} className="font-sans text-xs text-text-tertiary hover:text-text-gold transition-colors">
                Curriculum Details
              </Link>
            </li>
            <li>
              <Link to="/dakshina" onClick={scrollToTop} className="font-sans text-xs text-text-tertiary hover:text-text-gold transition-colors">
                Guru Dakshina Concept
              </Link>
            </li>
            <li>
              <Link to="/testimonials" onClick={scrollToTop} className="font-sans text-xs text-text-tertiary hover:text-text-gold transition-colors">
                Student Testimonials
              </Link>
            </li>
            <li>
              <Link to="/begin" onClick={scrollToTop} className="font-sans text-xs text-text-tertiary hover:text-text-gold transition-colors">
                Begin Enquiry
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact Details */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs tracking-[0.15em] text-text-gold uppercase font-semibold">
            Enquiry & Communication
          </h4>
          <ul className="space-y-3 font-sans text-xs text-text-tertiary">
            <li className="flex items-start space-x-2.5">
              <Mail className="w-4 h-4 text-text-gold shrink-0 mt-0.5" />
              <a href="mailto:namaste@vishweshwarasanskrit.com" className="hover:text-text-gold transition-colors break-all">
                namaste@vishweshwarasanskrit.com
              </a>
            </li>
            <li className="flex items-start space-x-2.5">
              <Phone className="w-4 h-4 text-text-gold shrink-0 mt-0.5" />
              <a href="tel:+919482698612" className="hover:text-text-gold transition-colors">
                +91 94826 98612
              </a>
            </li>
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-text-gold shrink-0 mt-0.5" />
              <span>Bangalore, Karnataka, India</span>
            </li>
          </ul>
          <div className="flex items-center space-x-3 pt-1">
            <a 
              href="https://www.instagram.com/vishweshwara_sanskrit?igsh=MThoZ255OGlvZnVxcQ==" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-tertiary hover:text-text-gold transition-colors p-1.5 bg-surface-2 rounded border border-gold-dim/40 hover:border-text-gold"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://www.facebook.com/share/18inj2iS8o/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-tertiary hover:text-text-gold transition-colors p-1.5 bg-surface-2 rounded border border-gold-dim/40 hover:border-text-gold"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://share.google/YJDHCZgoFpiePUgA6" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-tertiary hover:text-text-gold transition-colors p-1.5 bg-surface-2 rounded border border-gold-dim/40 hover:border-text-gold"
              aria-label="Google My Business"
              title="Review us on Google"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h5.4c-.2 1.4-.8 2.6-1.9 3.4v2.8h3.1c1.8-1.7 2.9-4.1 2.9-7.3z" fill="currentColor" stroke="none" />
                <path d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.1-2.8c-.9.6-2.1.9-3.4.9-2.6 0-4.9-1.8-5.7-4.2H3.2v2.9C4.9 19.8 8.2 22 12 22z" fill="currentColor" stroke="none" />
                <path d="M6.3 13.5c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V6.8H3.2c-.6 1.3-1 2.7-1 4.3s.4 3 1 4.3l3.1-2.9z" fill="currentColor" stroke="none" />
                <path d="M12 5.5c1.4 0 2.7.5 3.8 1.5l2.8-2.8C16.9 2.5 14.7 1.6 12 1.6 8.2 1.6 4.9 3.8 3.2 7.1l3.1 2.9c.8-2.4 3.1-4.2 5.7-4.2z" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <Share className="p-1.5 bg-surface-2 rounded border border-gold-dim/40 hover:border-text-gold !text-text-tertiary hover:!text-text-gold" />
          </div>
          <div className="pt-2">
            <Button
              onClick={() => handleLinkClick('begin')}
              variant="outline"
              className="!px-4 !py-1 text-[10px]"
            >
              <span>Schedule Call</span>
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Philosophy Banner Verse (Strategic placement: Italic, gold, centered, smaller size) */}
      <div className="my-10 text-center select-none border-y border-gold-dim/40 py-6">
        <p className="font-devanagari text-lg md:text-xl text-text-gold font-light tracking-wide leading-relaxed animate-pulse-slow">
          ॥ लोकाः समस्ताः सुखिनो भवन्तु ॥
        </p>
        <p className="font-serif text-xs italic text-text-tertiary mt-1.5 tracking-widest">
          "May all worlds and all beings be happy, peaceful, and free."
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-gold-dim/40 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
        <div className="space-y-1">
          <p className="font-sans text-[10px] text-text-tertiary tracking-wider">
            &copy; {currentYear} Vishweshwara Sanskrit. Built strictly with traditional purity and digital precision.
          </p>
          <p className="font-mono text-[9px] text-[#C8860A]/40 uppercase tracking-[0.2em]">
            Advaita Vedanta ✦ Taittiriya Samhita ✦ Laghu Kaumudi
          </p>
        </div>

        <div className="flex items-center space-x-6 text-[10px] font-mono tracking-wider uppercase">
          <button onClick={scrollToTop} className="text-text-gold hover:text-gold-bright transition-colors flex items-center space-x-1">
            <span>Scroll Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
