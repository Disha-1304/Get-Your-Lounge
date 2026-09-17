import React from 'react';
import { Link } from 'react-router-dom';

export const AppLogo = ({ className = '', size = 'md', isDark = false, useOrangeLogo = false }) => {
  const sizeMap = {
    sm: 'h-14 w-14 sm:h-16 sm:w-16',
    md: 'h-18 w-18 sm:h-22 sm:w-22',
    lg: 'h-24 w-24 sm:h-28 sm:w-28'
  }[size] || 'h-18 w-18 sm:h-22 sm:w-22';

  const fontMap = {
    sm: 'text-[18px] sm:text-[21px]',
    md: 'text-[22px] sm:text-[26px]',
    lg: 'text-[26px] sm:text-[32px]'
  }[size] || 'text-[22px] sm:text-[26px]';

  // Use black emblem on home/light pages by default
  const logoSrc = isDark ? '/brand-logo-orange.svg' : (useOrangeLogo ? '/brand-logo-orange.svg' : '/brand-logo-dark.svg');

  return (
    <Link to="/" className={`flex items-center gap-3 sm:gap-4 no-underline group ${className}`}>
      <div className={`${sizeMap} shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center`}>
        <img 
          src={logoSrc} 
          alt="Get My Lounge Logo" 
          className="w-full h-full object-contain filter drop-shadow-xs" 
        />
      </div>
      <div className="flex flex-col leading-none">
        <div className={`font-outfit ${fontMap} font-extrabold tracking-wide uppercase`}>
          <span className={isDark ? 'text-white' : 'text-navy'}>GET MY </span>
          <span className="text-[#FE2C1C]">LOUNGE</span>
        </div>
      </div>
    </Link>
  );
};
