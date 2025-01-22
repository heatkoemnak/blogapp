'use client';

import React, { useState, useEffect } from 'react';
import { Chip } from '@material-tailwind/react';
import { JOBTypes } from '@/app/data';
import { useRouter } from 'next/navigation';

export function CountByCategories() {
  // Initialize state for selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  const router = useRouter();
  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prevSelected) => {
      // Add or remove the value based on whether it's checked
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  // Example function to simulate sending query
  const sendQuery = () => {
    const query = selectedCategories.join(',');
    console.log('Selected categories:', query);
    if (query === '') return;
    router.push(`/jobs?search=${query}`);
    // Add your query or API call logic here
  };

  useEffect(() => {
    sendQuery();
  }, [selectedCategories]); // Trigger sendQuery on category change

  return (
    <div className="w-full bg-white">
      {JOBTypes.map((type) => (
        <label
          key={type.id}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={type.label}
            checked={selectedCategories.includes(type.label)} // Check if the category is selected
            onChange={handleCheckboxChange} // Update state on change
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
