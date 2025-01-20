'use client';
import React, { useState, useMemo } from 'react';
import { Radio, Card, Typography } from '@material-tailwind/react';
import { motion, AnimatePresence } from 'framer-motion';

export function JobCategorySelection({
  jobCategories,
  selectedJobIndustry,
  setSelectedCategory,
  showMoreThreshold = 10,
}) {
  const [selectedOption, setCategorySelect] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Determine the category list based on selected industry or fallback to all categories
  const categoryList = useMemo(() => {
    if (selectedJobIndustry && selectedJobIndustry.JobCategory) {
      return selectedJobIndustry.JobCategory;
    }
    return jobCategories || [];
  }, [selectedJobIndustry, jobCategories]);

  // Determine displayed categories based on showAll state
  const displayedCategoryList = useMemo(() => {
    if (showAll || !categoryList) return categoryList;
    return categoryList.slice(0, showMoreThreshold);
  }, [showAll, categoryList, showMoreThreshold]);

  const handleCategoryChange = (category) => {
    setCategorySelect(category.name);
    setSelectedCategory?.(category); // Pass the selected category to the parent
  };

  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
  };

  if (!categoryList || categoryList.length === 0) {
    return <span>No categories found with industry selected!.</span>;
  }

  return (
    <div className="px-1 flex flex-wrap py-1">
      <AnimatePresence>
        {displayedCategoryList.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center cursor-pointer gap-2 px-2 py-1"
          >
            <input
              type="radio"
              name="jobLevel"
              value={category.name}
              checked={selectedOption === category.name}
              onChange={() => handleCategoryChange(category)}
              className="cursor-pointer w-4 h-4 accent-cyan-700"
            />
            <label
              htmlFor={category.name}
              className="ml-1 text-sm text-gray-800 cursor-pointer"
            >
              {category.name}
            </label>
          </motion.div>
        ))}
        {categoryList.length > showMoreThreshold && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full py-1 px-4"
          >
            <button
              type="button"
              className="text-blue-gray-700 focus:outline-none"
              onClick={handleShowAllToggle}
            >
              {showAll
                ? 'Show Less'
                : `Show More (${categoryList.length - showMoreThreshold})`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
