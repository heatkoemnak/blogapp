'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '@/app/context/BlogProvider';

export function SalarySelection({
  showMoreThreshold = 5, // Default number of visible items before "Show More"
  setSelectedSalaryRange,
}) {
  const { jobSalaries } = useBlogContext(); // Use jobSalaries from context
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAll, setShowAll] = useState(false); // Toggle for showing all items
  const dropdownRef = useRef(null);

  // Memoized list based on showMoreThreshold
  const displayedSalaries = useMemo(() => {
    if (showAll || !jobSalaries) return jobSalaries;
    return jobSalaries.slice(0, showMoreThreshold);
  }, [showAll, jobSalaries, showMoreThreshold]);

  // Handle selecting a salary
  const handleSelect = (salary) => {
    setSelectedOption(salary.label);
    setIsOpen(false);
    if (setSelectedSalaryRange) setSelectedSalaryRange(salary); // Update external state
  };

  // Toggle "Show All" or "Show Less"
  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full max-w-lg py-2 mx-auto">
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <div
          className="bg-white rounded-lg shadow-xl px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-base font-medium text-gray-700">
            {selectedOption || 'Select Salary Range'}
          </span>
          <svg
            className={`transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            width="20"
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
              className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2 z-10"
            >
              <div className="space-y-2 p-4 h-auto">
                {/* Salary Options */}
                {displayedSalaries?.map((salary, index) => (
                  <div
                    key={index}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSelect(salary)}
                  >
                    <input
                      type="radio"
                      name="salaryRange"
                      value={salary.label}
                      checked={selectedOption === salary.label}
                      onChange={() => handleSelect(salary)}
                      className="cursor-pointer w-4 h-4 accent-cyan-700"
                    />
                    <label
                      htmlFor={salary.label}
                      className="ml-2 text-base text-gray-800 cursor-pointer"
                    >
                      {salary.label}
                    </label>
                  </div>
                ))}
                {/* Show More/Show Less */}
                {jobSalaries?.length > showMoreThreshold && (
                  <div
                    className="text-sm text-cyan-800 cursor-pointer px-4 pt-2"
                    onClick={handleShowAllToggle}
                  >
                    {showAll
                      ? 'Show Less'
                      : `Show More (${jobSalaries.length - showMoreThreshold})`}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
