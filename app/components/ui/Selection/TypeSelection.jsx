'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '@/app/context/BlogProvider';

export function TypeSelection({ setSelectedJobType }) {
  const { jobTypes } = useBlogContext();

  const showMoreThreshold = 6; // Number of options shown initially
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Show More/Less toggle
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  const displayedTypesList = useMemo(() => {
    if (isExpanded || !jobTypes) return jobTypes;
    return jobTypes.slice(0, showMoreThreshold);
  }, [isExpanded, jobTypes, showMoreThreshold]);
  const handleSelect = (type) => {
    setSelectedOption(type.name);
    setIsOpen(false);
    if (setSelectedJobType) setSelectedJobType(type); // Update external state
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
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <div
          className="bg-white border border-gray-300 shadow-sm px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-base font-medium text-gray-700">
            {selectedOption || 'Select Job Type'}
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
                <div className="space-y-2 p-4">
                  {displayedTypesList.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSelect(type)}
                    >
                      <input
                        type="radio"
                        name="jobLevel"
                        value={type.name}
                        checked={selectedOption === type.name}
                        onChange={() => handleSelect(type)}
                        className="cursor-pointer w-4 h-4 accent-cyan-700"
                      />
                      <label
                        htmlFor={type.name}
                        className="ml-2 text-base text-gray-800 cursor-pointer"
                      >
                        {type.name}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
              {jobTypes.length > showMoreThreshold && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-cyan-800 cursor-pointer px-4 pb-2"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  {isExpanded
                    ? 'Show Less'
                    : `Show More (${jobTypes.length - showMoreThreshold})`}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
