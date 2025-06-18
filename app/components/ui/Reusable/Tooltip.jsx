
'use client';
import { useState } from 'react';

export default function Tooltip({ children, text, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipPosition = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1',
  };

  return (
    <div 
      className="relative "
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`absolute ${tooltipPosition[position]} text-nowrap bg-gray-800 text-white text-sm py-1 px-2 rounded-md shadow-md`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
