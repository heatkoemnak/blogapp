'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export function JobType({ setShowJobType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);
  const [jobTypes, steJobTypes] = useState([]);
  console.log(jobTypes);
  const options = [
    'Part-time',
    'Full-time',
    'Internship',
    'Volunteer',
    'Freelance',
  ];

  useEffect(() => {
    fetchJobType();
  }, []);

  const fetchJobType = async () => {
    try {
      const response = await axios.get('/api/job/type');
      steJobTypes(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  const handleSelect = (type) => {
    setSelectedOption(type.name);
    setIsOpen(false);
    if (setShowJobType) setShowJobType(type); // Update external state if function is passed
  };

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
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative" ref={dropdownRef}>
          {/* Selected Box */}
          <div
            className="bg-white rounded-lg shadow-lg flex items-center px-4 py-4 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <input
              type="text"
              placeholder={selectedOption || 'Select Job Type'}
              readOnly
              className="pointer-events-none text-base placeholder-gray-700 outline-none w-full h-full flex-1"
            />
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
                className="absolute top-full right-0 bg-white rounded-lg shadow-xl px-4 mt-2 z-10 w-full"
              >
                <svg
                  className="absolute bottom-full right-4"
                  width="30"
                  height="20"
                  viewBox="0 0 30 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="15, 0 30, 20 0, 20" fill="#FFFFFF" />
                </svg>

                {jobTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="py-4 flex items-center w-full hover:bg-gray-50 cursor-pointer border-t border-gray-200 first:border-0"
                    onClick={() => handleSelect(type)}
                  >
                    <span className="flex-1 text-gray-900 text-base">
                      {type.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
