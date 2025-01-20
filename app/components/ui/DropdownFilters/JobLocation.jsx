'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '@/app/context/BlogProvider';

export function JobLocation({ setSelectedJobLevel, showMoreThreshold = 6 }) {
  const { provinceCities } = useBlogContext();
  console.log(provinceCities);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);
  const displayedProvinceCities = useMemo(() => {
    if (showAll || !provinceCities) return provinceCities;
    return provinceCities.slice(0, showMoreThreshold);
  }, [showAll, provinceCities, showMoreThreshold]);

  const handleSelect = (location) => {
    setSelectedOption(location.name);
    setIsOpen(false);
    if (setSelectedJobLevel) setSelectedJobLevel(location); // Update external state if function is passed
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full max-w-lg py-2 mx-auto">
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative" ref={dropdownRef}>
          {/* Selected Box */}
          <div
            className="bg-white border border-blue-gray-300 flex items-center px-4 py-2 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <input
              type="text"
              placeholder={
                !provinceCities
                  ? 'Loading...'
                  : selectedOption || 'Select a location'
              }
              readOnly
              className="pointer-events-none text-base placeholder-gray-700 outline-none w-full h-full flex-1"
            />
            <svg
              className={`transform transition-transform duration-200 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              width="15"
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
                          type="checkbox"
                          name="provinceCity"
                          value={provinceCity.name}
                          checked={selectedOption === provinceCity.name}
                          onChange={() => handleSelect(provinceCity)}
                          className="cursor-pointer w-4 h-4 accent-cyan-700"
                        />
                        <label
                          htmlFor={provinceCity.name}
                          className="ml-3 text-base text-gray-800 cursor-pointer"
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
    </div>
  );
}
