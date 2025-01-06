'use client';
import React, { useState } from 'react';

import { Radio, Card, ListItem, Typography } from '@material-tailwind/react';

const qualificationList = [
  {
    id: 1,
    name: "Bachelor's Degree",
  },
  {
    id: 2,
    name: "Master's Degree",
  },
  {
    id: 3,
    name: 'Doctorate',
  },
];

export function QualificationSelection({
  setSelectionQualification,
  showMoreThreshold = 3,
}) {
  const [selectedOption, setSelectedValue] = useState(null);
  const [showAll, setShowAll] = useState(false);
  console.log(selectedOption);

  const handleValueChange = (qualification) => {
    setSelectedValue(qualification.name);
    setSelectionQualification(qualification); // Pass selected qualification to parent component
  };
  const handleShowAllToggle = () => {
    setShowAll(!showAll); // Toggle the showAll state
  };
  const displayedQualificationList = showAll
    ? qualificationList
    : qualificationList.slice(0, showMoreThreshold);

  return (
    <Card className="px-1 flex flex-wrap py-1">
      <div className="space-y-2 p-4">
        {displayedQualificationList.map((qualification, index) => (
          <div key={index} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="qualification"
              value={qualification.name}
              checked={selectedOption === qualification.name}
              onChange={() => handleValueChange(qualification)}
              className="cursor-pointer w-4 h-4 accent-cyan-700"
            />
            <label
              htmlFor={qualification.name}
              className="ml-2 text-base text-gray-800 cursor-pointer"
            >
              {qualification.name}
            </label>
          </div>
        ))}
      </div>

      {qualificationList.length > showMoreThreshold && ( // Conditionally render "Show More" button
        <ListItem className="text-center py-2">
          <button
            type="button"
            className="text-blue-gray-700 focus:outline-none"
            onClick={handleShowAllToggle}
          >
            {showAll
              ? 'Show Less'
              : `Show More (${qualificationList.length - showMoreThreshold})`}
          </button>
        </ListItem>
      )}
    </Card>
  );
}
