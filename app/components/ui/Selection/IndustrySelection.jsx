'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '@/app/context/BlogProvider';

export function IndustrySelection({
  showMoreThreshold = 6,
  setSelectedJobIndustry,
}) {
  const { industriesList } = useBlogContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);
  console.log(industriesList);

  const displayedIndustryList = useMemo(() => {
    if (showAll || !industriesList) return industriesList;
    return industriesList.slice(0, showMoreThreshold);
  }, [showAll, industriesList, showMoreThreshold]);
  const handleSelect = (industry) => {
    setSelectedOption(industry.name);
    setIsOpen(false);
    if (setSelectedJobIndustry) setSelectedJobIndustry(industry); // Update external state if function is passed
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
    <div className="w-full max-w-lg mx-auto">
      <div className="max-w-md mx-auto space-y-6">
        <div
          className="relative border border-gray-300 bg-white shadow-sm px-4 py-2"
          ref={dropdownRef}
        >
          {/* Dropdown Trigger */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="text-base font-medium text-gray-700">
              {selectedOption || 'Select Industry'}
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
                  <div className="space-y-2 p-4 h-auto ">
                    {displayedIndustryList?.map((industry, index) => (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSelect(industry)}
                      >
                        <input
                          type="radio"
                          name="jobLocation"
                          value={industry.name}
                          checked={selectedOption === industry.name}
                          onChange={() => handleSelect(industry)}
                          className="cursor-pointer w-4 h-4 accent-cyan-700"
                        />
                        <label
                          htmlFor={industry.name}
                          className="ml-2 text-base text-gray-800 cursor-pointer"
                        >
                          {industry.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {industriesList.length > showMoreThreshold && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-cyan-800 cursor-pointer px-4 pb-2"
                      onClick={handleShowAllToggle}
                    >
                      {showAll
                        ? 'Show Less'
                        : `Show More (${
                            industriesList.length - showMoreThreshold
                          })`}
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
