'use client';

import React, { useState, useEffect } from 'react';
import { Chip } from '@material-tailwind/react';
import { JOBTypes } from '@/app/data';
import { useRouter } from 'next/navigation';

export function JobTypeCheckbox() {
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected job types
  const router = useRouter();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });

    // Scroll smoothly depending on selected items
    window.scrollTo({
      top: 900, // Adjust this based on the height you need to scroll
      behavior: 'smooth',
    });
  };

  // Clear selected categories and control scrolling
  const handleClear = () => {
    if (selectedCategories.length > 0) {
      // If there were selected categories, scroll down
      window.scrollTo({
        top: 0, // Adjust this based on your UI structure
        behavior: 'smooth',
      });
    } else {
      // If no categories were selected, scroll up
      window.scrollTo({
        top: 900, // Scroll to the top of the page
        behavior: 'smooth',
      });
    }

    setSelectedCategories([]); // Reset the categories
    router.push(`/jobs?search=`); // Redirect with an empty query
  };

  useEffect(() => {
    const query = selectedCategories.join(',');
    if (query === '') return;
    router.push(`/jobs?search=${query}`);
  }, [selectedCategories, router]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md pt-5 px-2">
          Job types
        </div>
        <button
          type="button"
          onClick={handleClear} // Attach the Clear function
          className="font-semibold text-gray-600 text-sm pt-5 px-2"
        >
          Clear
        </button>
      </div>
      {JOBTypes.map((type) => (
        <label
          key={type.id}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={type.label}
            checked={selectedCategories.includes(type.label)}
            onChange={handleCheckboxChange}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{type.label}</span>
          <Chip
            value={type.count}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </label>
      ))}
    </div>
  );
}
