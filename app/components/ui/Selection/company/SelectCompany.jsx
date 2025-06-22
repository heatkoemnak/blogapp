'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
export function SelectCompany({
//   selectProvinceCity,
//   setSelectDistrict,
setCompanyId,
  showMoreThreshold = 5,
}) {
  // const { districts } = useBlogContext();
const { data, error, isLoading } = useSWR('/api/companies', fetcher);


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);

  // Memoized district list
  const companylist = useMemo(() => {
    return data || [];
  }, [ data]);

  // Memoized list for "Show More" functionality
  const displayedCompanies = useMemo(() => {
    if (showAll || !companylist) return companylist;
    return companylist?.slice(0, showMoreThreshold);
  }, [showAll, companylist, showMoreThreshold]);

  // Handle district selection
  const handleSelect = (company) => {
    setSelectedOption(company.name);
    setCompanyId(company?.id); // Assuming company has an _id field
    setIsOpen(false);
    // if (setSelectDistrict) setSelectDistrict(company);
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
    if (typeof document !== 'undefined') {
      // Add event listener if running client-side
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, []);

  if (!companylist?.length) {
    return (
      <div className="w-full max-w-lg py-2 mx-auto text-center text-gray-500">
        No company available.
      </div>
    );
  }

  return (
    <div className="min-w-52 max-w-lg py-2 mx-auto">
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <div
          className="bg-white shadow-sm border border-gray-300 px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-base font-medium text-gray-700">
            {selectedOption || 'Select a company'}
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
              <div className="space-y-2 p-4 max-h-64 overflow-y-auto">
                {displayedCompanies.map((company, index) => (
                  <div
                    key={company.name}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSelect(company)}
                  >
                    <input
                      type="radio"
                      name="company"
                      value={company.name}
                      checked={selectedOption === company.name}
                      onChange={() => handleSelect(company)}
                      className="cursor-pointer w-4 h-4 accent-cyan-700"
                    />
                    <label
                      htmlFor={company.name}
                      className="ml-2 text-base text-gray-800 cursor-pointer"
                    >
                      {company.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Show More/Less */}
              {companylist.length > showMoreThreshold && (
                <div
                  className="text-sm text-cyan-800 cursor-pointer px-4 pb-2"
                  onClick={toggleShowAll}
                >
                  {showAll
                    ? 'Show Less'
                    : `Show More (${companylist.length - showMoreThreshold})`}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
