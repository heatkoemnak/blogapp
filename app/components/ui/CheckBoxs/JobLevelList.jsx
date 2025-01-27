'use client';

import React, { useState, useEffect } from 'react';
import { Chip } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/app/context/BlogProvider';

export function JobLevelList() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const router = useRouter();
  const { jobLevels } = useBlogContext();

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
  const handleClear = () => {
    if (selectedLevels.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 900, // Scroll to the top of the page
        behavior: 'smooth',
      });
    }

    setSelectedLevels([]);
    router.push(`/jobs?search=`);
  };
  // Effect to trigger whenever selectedLevels changes
  useEffect(() => {
    const sendQuery = () => {
      const query = selectedLevels.join(',');
      if (query === '') return;
      router.push(`/jobs?search=${query}`);
    };

    sendQuery();
  }, [selectedLevels, router]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md px-2">
          Job Level
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="font-semibold text-gray-600 text-sm pt-5 px-2"
        >
          Clear
        </button>
      </div>
      {jobLevels.map((jobLevel) => (
        <label
          key={jobLevel.id}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={jobLevel.name}
            checked={selectedLevels.includes(jobLevel.name)} // Set checked status based on state
            onChange={handleCheckboxChange} // Handle state change
            className="mr-4 w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{jobLevel.name}</span>
          <Chip
            value={jobLevel?.jobs.length}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </label>
      ))}
    </div>
  );
}
