import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-10' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 48 48" 
      className={className}
      aria-label="Mecca Buys Logo"
    >
      <circle cx="24" cy="24" r="22" fill="#0066FF" stroke="#FFDD00" strokeWidth="4"/>
      <circle cx="24" cy="24" r="8" fill="#FFDD00"/>
      <path d="M32 16L16 32" stroke="#FFDD00" strokeWidth="4" strokeLinecap="round"/>
      <path d="M16 16L32 32" stroke="#FFDD00" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
};

export default Logo;
