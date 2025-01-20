'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '@/app/context/BlogProvider';

export function SelectProvinceCity({
  showMoreThreshold = 6, // Default number of items to show before "Show More" toggle
  setSelectProvinceCity,
}) {
  const { provinceCities } = useBlogContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);

  // Memoized list based on showAll state
  const displayedProvinceCities = useMemo(() => {
    if (showAll || !provinceCities) return provinceCities;
    return provinceCities.slice(0, showMoreThreshold);
  }, [showAll, provinceCities, showMoreThreshold]);

  const handleSelect = (provinceCity) => {
    setSelectedOption(provinceCity.name);
    setIsOpen(false);
    if (setSelectProvinceCity) setSelectProvinceCity(provinceCity); // Update external state if provided
  };

  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Add event listener if running client-side
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, []);

  return (
    <div className="w-full max-w-lg py-2 mx-auto">
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Trigger */}
        <div
          className="bg-white shadow-sm border border-gray-300 px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-base font-medium text-gray-700">
            {selectedOption || 'Select Province/City'}
          </span>
          <svg
            className={`transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            width="10"
            height="10"
            viewBox="0 0 20 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="0" x2="10" y2="10" stroke="#9CA3AF" />
            <line x1="20" y1="0" x2="10" y2="10" stroke="#9CA3AF" />
          </svg>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-sm mt-2 z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2 p-4 max-h-80 overflow-y-auto">
                  {displayedProvinceCities?.map((provinceCity, index) => (
                    <div
                      key={index}
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSelect(provinceCity)}
                    >
                      <input
                        type="radio"
                        name="provinceCity"
                        value={provinceCity.name}
                        checked={selectedOption === provinceCity.name}
                        onChange={() => handleSelect(provinceCity)}
                        className="cursor-pointer w-4 h-4 accent-cyan-700"
                      />
                      <label
                        htmlFor={provinceCity.name}
                        className="ml-2 text-base text-gray-800 cursor-pointer"
                      >
                        {provinceCity.name}
                      </label>
                    </div>
                  ))}
                </div>
                {provinceCities.length > showMoreThreshold && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-blue-700 cursor-pointer px-4 pb-2"
                    onClick={handleShowAllToggle}
                  >
                    <div className="text-sm text-cyan-800 cursor-pointer px-4 pb-2">
                      {showAll
                        ? 'Show Less'
                        : `Show More (${
                            provinceCities.length - showMoreThreshold
                          })`}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
