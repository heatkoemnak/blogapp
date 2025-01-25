'use client';

import React, { useState, useEffect } from 'react';
import { jobLevelLists } from '@/app/data';
import { Chip } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

export function JobLevelList() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const router = useRouter();

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedLevels((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value); // Remove if already selected
      } else {
        return [...prevSelected, value]; // Add if not selected
      }
    });
  };

  // Example function to simulate sending a query with selected levels
  const sendQuery = () => {
    const query = selectedLevels.join(',');
    if (query === '') return;
    router.push(`/jobs?search=${query}`);
  };

  // Effect to trigger whenever selectedLevels changes
  useEffect(() => {
    sendQuery();
  }, [selectedLevels]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md px-2">
          Job Level
        </div>
        <div className="font-semibold text-gray-600 text-sm px-2">
          Clear
        </div>
      </div>
      {jobLevelLists.map((jobLevel) => (
        <label
          key={jobLevel.label}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={jobLevel.label}
            checked={selectedLevels.includes(jobLevel.label)} // Set checked status based on state
            onChange={handleCheckboxChange} // Handle state change
            className="mr-4 w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{jobLevel.label}</span>
          <Chip
            value={jobLevel.count}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </label>
      ))}
    </div>
  );
}
