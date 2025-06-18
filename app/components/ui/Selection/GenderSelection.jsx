'use client';
import React, { useState } from 'react';

import { Radio, Card, ListItem, Typography } from '@material-tailwind/react';

const genderList = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
  {
    id: 3,
    name: 'Male/Female',
  },
];

export function GenderSelection({
  setSelectedGender,
  showMoreThreshold = 3,
  name,
}) {
  const [selectedOption, setSelectedValue] = useState(name || null);
  const [showAll, setShowAll] = useState(false);
  console.log(selectedOption);

  const handleValueChange = (gender) => {
    setSelectedValue(gender.name);
    setSelectedGender(gender); // Pass selected industry to parent component
  };
  const handleShowAllToggle = () => {
    setShowAll(!showAll); // Toggle the showAll state
  };
  const displayedGenderList = showAll
    ? genderList
    : genderList.slice(0, showMoreThreshold);

  return (
    <div className="px-1 flex flex-wrap ">
      <div className="space-y-2 p-4">
        {displayedGenderList.map((gender, index) => (
          <div key={index} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={gender.name}
              checked={selectedOption === gender.name}
              onChange={() => handleValueChange(gender)}
              className="cursor-pointer w-4 h-4 accent-cyan-700"
            />
            <label
              htmlFor={gender.name}
              className="ml-1 text-sm text-gray-800 cursor-pointer"
            >
              {gender.name}
            </label>
          </div>
        ))}
      </div>

      {genderList.length > showMoreThreshold && ( // Conditionally render "Show More" button
        <ListItem className="text-center py-2">
          <button
            type="button"
            className="text-blue-gray-700 focus:outline-none"
            onClick={handleShowAllToggle}
          >
            {showAll
              ? 'Show Less'
              : `Show More (${genderList.length - showMoreThreshold})`}
          </button>
        </ListItem>
      )}
    </div>
  );
}
