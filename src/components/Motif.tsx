import React from 'react';
import { motion } from 'motion/react';

interface MotifProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
  animate?: boolean;
}

export const Motif: React.FC<MotifProps> = ({ 
  className = '', 
  size = 40, 
  opacity = 0.5, 
  color = 'currentColor',
  animate = true
}) => {
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 60, repeat: Infinity, ease: "linear" } : {}}
    >
      <g stroke={color} strokeWidth="1" opacity="0.8">
        {/* Lotus petals */}
        <path d="M50 20 Q 60 40 50 50 Q 40 40 50 20" fill="none" />
        <path d="M50 80 Q 60 60 50 50 Q 40 60 50 80" fill="none" />
        <path d="M20 50 Q 40 60 50 50 Q 40 40 20 50" fill="none" />
        <path d="M80 50 Q 60 60 50 50 Q 60 40 80 50" fill="none" />
        
        {/* Diagonals */}
        <path d="M28.7 28.7 Q 40 40 50 50 Q 60 40 71.3 28.7" fill="none" />
        <path d="M71.3 71.3 Q 60 60 50 50 Q 40 60 28.7 71.3" fill="none" />
        <path d="M28.7 71.3 Q 40 60 50 50 Q 60 60 71.3 71.3" fill="none" />
        
        <circle cx="50" cy="50" r="40" strokeDasharray="1 4" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="15" />
        <circle cx="50" cy="50" r="5" fill={color} />
      </g>
    </motion.svg>
  );
};

export const DecorativeBorder: React.FC<{ className?: string, color?: string }> = ({ className = '', color = 'currentColor' }) => {
  return (
    <div className={`flex justify-center items-center space-x-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-current opacity-30 max-w-[100px]"></div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="opacity-50">
        <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-current opacity-30 max-w-[100px]"></div>
    </div>
  );
};
