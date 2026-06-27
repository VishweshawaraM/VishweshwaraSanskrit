/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  variant?: 'symbol' | 'horizontal' | 'primary' | 'favicon';
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'horizontal', className = '', size }) => {
  if (variant === 'symbol') {
    return (
      <img 
        src="./symbol-only.PNG" 
        alt="Vishweshwara Symbol" 
        className={`inline-block shrink-0 ${className}`}
        style={{ width: size || 48, height: size || 48 }}
        onError={(e) => {
          // Fallback if image not uploaded yet
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  if (variant === 'favicon') {
    return (
      <div className={`relative flex items-center justify-center p-1 rounded-2xl bg-[#0E0B07] border border-[#2A1E12] shadow-2xl ${className}`} style={{ width: size || 56, height: size || 56 }}>
        <img 
          src="./favicon-logo.PNG" 
          alt="Vishweshwara Favicon" 
          className="shrink-0 rounded-xl"
          style={{ width: (size || 56) - 12, height: (size || 56) - 12, objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }

  if (variant === 'primary') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <img 
          src="./primary-logo.PNG" 
          alt="Vishweshwara Primary Logo" 
          style={{ width: size || 240, height: 'auto' }}
          className="max-w-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Default: variant === 'horizontal'
  return (
    <div className={`flex items-center space-x-3 cursor-pointer select-none ${className}`}>
      <img 
        src="./horizontal-logo.PNG" 
        alt="Vishweshwara Horizontal Logo" 
        className={`w-auto ${size ? '' : 'h-8 md:h-12'}`}
        style={size ? { height: size } : {}}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
