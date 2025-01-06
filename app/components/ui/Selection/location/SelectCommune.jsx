'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '@/app/context/BlogProvider';

export function SelectCommune({
  selectDistrict,
  setSelectCommune,
  showMoreThreshold = 5, // Default number of items to show
}) {
  const { communes } = useBlogContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);

  // Memoized list of communes
  const communeList = useMemo(() => {
    return selectDistrict?.communes || communes || [];
  }, [selectDistrict, communes]);

  // Memoized list for the "Show More" functionality
  const displayedCommunes = useMemo(() => {
    if (showAll || !communeList) return communeList;
    return communeList.slice(0, showMoreThreshold);
  }, [showAll, communeList, showMoreThreshold]);

  // Handle commune selection
  const handleSelect = (commune) => {
    setSelectedOption(commune.name);
    setIsOpen(false);
    if (setSelectCommune) setSelectCommune(commune);
  };

  // Toggle "Show More" functionality
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  // Handle outside click
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

  if (!communeList?.length) {
    return (
      <div className="w-full max-w-lg py-2 mx-auto text-center text-gray-500">
        No communes available for the selected district.
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg py-2 mx-auto">
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Trigger */}
        <div
          className="bg-white rounded-lg shadow-xl px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-base font-medium text-gray-700">
            {selectedOption || 'Select a Commune'}
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
              <div className="space-y-2 p-4 max-h-64 overflow-y-auto">
                {displayedCommunes.map((commune) => (
                  <div
                    key={commune.name}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSelect(commune)}
                  >
                    <input
                      type="radio"
                      name="commune"
                      value={commune.name}
                      checked={selectedOption === commune.name}
                      onChange={() => handleSelect(commune)}
                      className="cursor-pointer w-4 h-4 accent-cyan-700"
                    />
                    <label
                      htmlFor={commune.name}
                      className="ml-2 text-base text-gray-800 cursor-pointer"
                    >
                      {commune.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Show More/Less Toggle */}
              {communeList.length > showMoreThreshold && (
                <div
                  className="text-sm text-cyan-800 cursor-pointer px-4 pb-2"
                  onClick={toggleShowAll}
                >
                  {showAll
                    ? 'Show Less'
                    : `Show More (${communeList.length - showMoreThreshold})`}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
