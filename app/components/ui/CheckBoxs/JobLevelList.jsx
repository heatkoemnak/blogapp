'use client';

import React, { useState, useEffect } from 'react';
import { Chip } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/app/context/BlogProvider';
import ClearFilter from '../Reusable/ClearFilter';

export function JobLevelList() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const router = useRouter();
  const { jobLevels } = useBlogContext();

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedLevel === value) {
      setSelectedLevel(''); // Remove if already selected
    } else {
      setSelectedLevel(value); // Add if not selected
    }
  };
  const handleClear = () => {
    if (selectedLevel !== '') {
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

    setSelectedLevel('');
    router.push(`/jobs?search=`);
  };
  // Effect to trigger whenever selectedLevels changes
  useEffect(() => {
    const sendQuery = () => {
      const query = selectedLevel;
      if (query === '') return;
      router.push(`/jobs?search=${query}`);
    };

    sendQuery();
  }, [selectedLevel, router]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md px-2">
          Job Level
        </div>
        {selectedLevel !== '' && <ClearFilter handleClear={handleClear} />}
      </div>
      {jobLevels?.map((jobLevel) => (
        <label
          key={jobLevel.id}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={jobLevel.name}
            checked={selectedLevel === jobLevel.name} // Set checked status based on state
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
