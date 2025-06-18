'use client';

import React, { useState, useEffect } from 'react';
import { Chip } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/app/context/BlogProvider';
import ClearFilter from '../Reusable/ClearFilter';

export function JobTypeCheckbox() {
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected job type
  const { jobTypes } = useBlogContext();
  const router = useRouter();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedCategory === value) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(value);
    }

    window.scrollTo({
      top: 900,
      behavior: 'smooth',
    });
  };

  const handleClear = () => {
    if (selectedCategory !== '') {
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

    setSelectedCategory('');
    router.push(`/jobs?search=`);
  };

  useEffect(() => {
    const query = selectedCategory;
    if (query === '') return;
    router.push(`/jobs?search=${query}`);
  }, [selectedCategory, router]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md pt-5 px-2">
          Job types
        </div>
        {selectedCategory !== '' && <ClearFilter handleClear={handleClear} />}
      </div>
      {jobTypes?.map((type) => (
        <label
          key={type.id}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={type.name}
            checked={selectedCategory === type.name}
            onChange={handleCheckboxChange}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{type.name}</span>
          <Chip
            value={type?.jobs.length}
            variant="ghost"
            size="sm"
            className="rounded-full"
          />
        </label>
      ))}
    </div>
  );
}
