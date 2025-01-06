'use client';

import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
    ['link'],
  ],
};

const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'outdent',
  'align',
  'color',
  'background',
  'script',
  'link',
];

export function JobDescription({ description, setDescription }) {
  const [currentInput, setCurrentInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  console.log(description);
  console.log(isEditing);
  // Handle Quill editor changes
  const handleQuillChange = (value) => {
    setCurrentInput(value);
  };

  // Add or edit description
  const addOrEditDescription = () => {
    if (!currentInput.trim()) return; // Prevent empty input
    setDescription(currentInput.trim());
    setCurrentInput('');
    setIsEditing(false);
    setIsSaved(true);
  };

  // Start editing
  const handleEditDescription = () => {
    setCurrentInput(description);
    setIsEditing(true);
    setIsSaved(false);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setCurrentInput('');
    setIsEditing(false);
  };

  // Clear description
  const handleClearAll = () => {
    setDescription('');
    setCurrentInput('');
    setIsEditing(false);
    setIsSaved(false);
  };

  return (
    <div className="bg-white p-4 rounded-md">
      {/* Display Section */}
      <div>
        {description ? (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              {description && !isEditing && (
                <Button
                  size="sm"
                  color="yellow"
                  onClick={handleEditDescription}
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="mx-2 p-4 bg-gray-100 rounded-md">
              {description ? parse(description) : null}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-sm text-gray-500 font-semibold text-center">
              No job description added yet.
            </h3>
          </>
        )}
      </div>

      {/* Input Section */}
      <div className="mt-4">
        <ReactQuill
          value={currentInput}
          onChange={handleQuillChange}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Enter job description..."
          className="min-h-[120px]"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 ">
          <Button
            variant="gradient"
            color="blue"
            size="sm"
            disabled={isSaved}
            onClick={addOrEditDescription}
          >
            {isEditing ? 'Save Edit' : 'Save'}
          </Button>
          {isEditing && (
            <Button
              size="sm"
              className="bg-cyan-700"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
        </div>

        {description && (
          <Button size="sm" color="red" onClick={handleClearAll}>
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
