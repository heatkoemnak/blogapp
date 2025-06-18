'use client';
import { useState } from 'react';

export default function OpenPosition() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Job Title</h2>
        <button
          onClick={handleOpen}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          View
        </button>
      </div>
      <p className="mt-2">Job description</p>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Job Title</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium">Job Description</h4>
              <p className="mt-2">Detailed job description here...</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
