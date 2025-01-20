'use client';

import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export function JobDescription({ errors, description, setDescription }) {
  const [currentInput, setCurrentInput] = useState('');
  console.log(currentInput);
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

  return (
    <div className="bg-white rounded-md">
      {/* Display Section */}
      <div>
        {description ? (
          <>
            <div className="flex items-center justify-end py-2  ">
              {description && !isEditing && (
                <div div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    color="yellow"
                    onClick={handleEditDescription}
                  >
                    Edit
                  </Button>
                  <Button size="sm" color="red" onClick={handleClearAll}>
                    Clear All
                  </Button>
                </div>
              )}
            </div>
            <div className="px-10 py-5 bg-gray-100 rounded-md">
              {description ? parse(description) : null}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-sm text-gray-500 font-semibold text-center">
              Description will be shown here.
            </h3>
          </>
        )}
      </div>

      {/* Input Section */}
      <div className="mt-4">
        <QuillEditor
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
      {errors.description && (
        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 ">
          <button
            size="sm"
            type='button'
            disabled={isSaved}
            className="bg-cyan-700 text-white px-4 py-2 rounded-md"
            onClick={addOrEditDescription}
          >
            {isEditing ? 'Save Edit' : 'Save Description'}
          </button>
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
      </div>
    </div>
  );
}
