'use client';

import { useBlogContext } from '@/app/context/BlogProvider';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ClearFilter from '../Reusable/ClearFilter';

const SalaryCheckbox = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected job type
  const { jobSalaries } = useBlogContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  console.log('search:', search);
  console.log('category:', selectedCategory);

  const handleRadioChange = (event) => {
    const value = event.target.value;

    if (selectedCategory === value) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(value);
    }
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
    if (selectedCategory !== '') {
      router.push(`/jobs?search=${selectedCategory}`);
    }
  }, [selectedCategory, router]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md px-2">
          Salary
        </div>
        {selectedCategory !== '' && <ClearFilter handleClear={handleClear} />}
      </div>
      {jobSalaries?.map((salary) => (
        <label
          key={salary.label}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="radio"
            name="salary"
            value={salary.label}
            checked={selectedCategory && search === salary.label}
            onChange={handleRadioChange}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{salary.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SalaryCheckbox;
