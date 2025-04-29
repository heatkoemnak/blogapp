'use client';

import { useBlogContext } from '@/app/context/BlogProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const SalaryCheckbox = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected job types
  const { jobSalaries } = useBlogContext();
  console.log(jobSalaries);
  const router = useRouter();
  console.log(router);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });

    window.scrollTo({
      top: 900,
      behavior: 'smooth',
    });
  };

  const handleClear = () => {
    // if (selectedCategories.length > 0) {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    //   });
    // } else {
    //   window.scrollTo({
    //     top: 900, // Scroll to the top of the page
    //     behavior: 'smooth',
    //   });
    // }

    setSelectedCategories([]);
    router.push(`/jobs?search=`);
  };
  useEffect(() => {
    const query = selectedCategories.join(',');
    if (query === '') return;
    router.push(`/jobs?search=${query}`);
  }, [selectedCategories, router]);

  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md px-2">
          Salary
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="font-semibold text-gray-600 text-sm pt-5 px-2"
        >
          Clear
        </button>
      </div>
      {jobSalaries.map((jobLevel) => (
        <label
          key={jobLevel.label}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={jobLevel.label}
            checked={selectedCategories.includes(jobLevel.label)}
            onChange={handleCheckboxChange}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{jobLevel.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SalaryCheckbox;
