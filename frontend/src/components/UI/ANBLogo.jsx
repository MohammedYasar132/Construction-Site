import React from 'react';

const ANBLogo = ({ size = 40, className = '', showText = true, textClass = '', darkText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Scalable Engineering SVG Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background Hexagon Shield Frame */}
        <polygon 
          points="50,6 90,29 90,71 50,94 10,71 10,29" 
          fill="var(--color-secondary)" 
          stroke="var(--color-primary)" 
          strokeWidth="5" 
        />
        
        {/* The 'A' beam */}
        <path 
          d="M30 72 L50 32 L70 72" 
          stroke="var(--color-primary)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M38 56 L62 56" 
          stroke="var(--color-primary)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        
        {/* The 'N' cross beam line (representing architectural grid overlay) */}
        <path 
          d="M30 72 L30 32 L70 72 L70 32" 
          stroke="#ffffff" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          opacity="0.9" 
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left leading-none select-none">
          <span className={`logo-title font-display font-black text-xl tracking-tight uppercase ${darkText ? 'text-secondary' : 'text-secondary dark:text-white'} ${textClass}`}>
            <span className="text-primary">ANB</span> Constructions
          </span>
          <span className="logo-tagline text-[9px] tracking-[0.3em] font-extrabold text-primary uppercase mt-0.5">
            Engineering & Build
          </span>
        </div>
      )}
    </div>
  );
};

export default ANBLogo;
