import React, { useState } from 'react';
import { Textarea, Button, IconButton, Input } from '@material-tailwind/react';

export function TextPosition({ positions, setPositions }) {
  const [currentInput, setCurrentInput] = useState('');
  const [currentPax, setCurrentPax] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddPosition = () => {
    if (currentInput.trim() && currentPax.trim() && !isNaN(currentPax)) {
      setPositions((prevPositions) => [
        ...prevPositions,
        { title: currentInput, pax: currentPax },
      ]);
      setCurrentInput('');
      setCurrentPax('');
    }
  };

  const handleEditPosition = (index) => {
    setCurrentInput(positions[index].title);
    setCurrentPax(positions[index].pax);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (currentInput.trim() && currentPax.trim() && !isNaN(currentPax)) {
      setPositions((prev) =>
        prev.map((position, index) =>
          index === editingIndex
            ? { title: currentInput, pax: currentPax }
            : position
        )
      );
      setCurrentInput('');
      setCurrentPax('');
      setIsEditing(false);
      setEditingIndex(null);
    }
  };

  const removePosition = (index) => {
    setPositions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative bg-white p-4    ">
      <div className="bg-gray-100 border rounded p-3 h-32 overflow-y-auto">
        {positions.length === 0 ? (
          <p className="text-gray-400">Your job positions will appear here</p>
        ) : (
          <ul className="list-disc pl-5">
            {positions.map((position, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-gray-500"
              >
                <div className="flex gap-2 items-center">
                  <span className="text-gray-600">{index + 1} .</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {position.title}
                  </span>
                  <span className="text-gray-600">({position.pax} pax)</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditPosition(index)}
                    className="text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 2.487a2.25 2.25 0 013.181 3.181l-11.25 11.25a4.5 4.5 0 01-1.89 1.127l-3.195.852a.375.375 0 01-.46-.46l.852-3.195a4.5 4.5 0 011.127-1.89l11.25-11.25z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removePosition(index)}
                    className="text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6l12 12M6 18L18 6"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative bg-white mt-4">
        <Textarea
          value={currentInput}
          label="Enter Position"
          onChange={(e) => setCurrentInput(e.target.value)}
          className="ps-4"
        />
        <Input
          type="number"
          label="Number of pax"
          value={currentPax}
          onChange={(e) => setCurrentPax(e.target.value)}
        />
        <div className="flex w-full justify-between py-2 mt-2">
          {isEditing ? (
            <Button size="sm" className="rounded-md" onClick={handleSaveEdit}>
              Save
            </Button>
          ) : (
            <Button
              onClick={handleAddPosition}
              variant="gradient"
              color="blue"
              size="sm"
              className="capitalize font-normal text-sm"
            >
              Add Position
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
