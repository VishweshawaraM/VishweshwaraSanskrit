/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ 
  children, 
  delay = 0, 
  className = '',
  direction = 'up',
  duration = 0.8
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getInitialY = () => {
    if (direction === 'up') return 40;
    if (direction === 'down') return -40;
    return 0;
  };

  const getInitialX = () => {
    if (direction === 'left') return 40;
    if (direction === 'right') return -40;
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        y: getInitialY(),
        x: getInitialX()
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : getInitialY(),
        x: isInView ? 0 : getInitialX()
      }}
      transition={{ 
        duration: duration, 
        delay: delay / 1000, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }}
    >
      {children}
    </motion.div>
  );
};
