import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppWidget: React.FC = () => {
  return (
    <a
      href="https://wa.me/919482698612?text=Hari%20Om,%20I%20am%20interested%20in%20learning%20Sanskrit%20and%20Vedic%20wisdom."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_16px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
      {/* Optional tooltip */}
      <span className="absolute right-full mr-4 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
        Message on WhatsApp
      </span>
    </a>
  );
};
