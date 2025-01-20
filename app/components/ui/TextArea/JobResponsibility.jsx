'use client';

import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export function JobResponsibility({ jobResponsibility, setJobResponsibility }) {
  const [currentInput, setCurrentInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleQuillChange = (value) => {
    setCurrentInput(value);
  };
  const addOrEditResponsibility = () => {
    if (!currentInput.trim()) return; // Prevent empty input
    setJobResponsibility(currentInput.trim());
    setCurrentInput('');
    setIsEditing(false);
    setIsSaved(true);
  };
  const handleEditResponsibility = () => {
    setCurrentInput(jobResponsibility);
    setIsEditing(true);
    setIsSaved(false);
  };

  const handleCancelEdit = () => {
    setCurrentInput('');
    setIsEditing(false);
  };

  const handleClearAll = () => {
    setJobResponsibility('');
    setCurrentInput('');
    setIsEditing(false);
    setIsSaved(false);
  };

  // Quill toolbar configuration
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
    <div className="bg-gray-100 rounded-md">
      {/* Display Section */}
      <div>
        {jobResponsibility ? (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-2">
                Job Responsibilities
              </h3>
              {jobResponsibility && !isEditing && (
                <Button
                  size="sm"
                  color="yellow"
                  onClick={handleEditResponsibility}
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="mx-2 p-4 bg-gray-100 rounded-md">
              {jobResponsibility ? parse(jobResponsibility) : null}
            </div>
          </>
        ) : (
          <div className="mx-2 p-4 bg-gray-100 rounded-md">
            No job jobResponsibility added yet.
          </div>
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
          placeholder="Enter job jobResponsibility..."
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
            onClick={addOrEditResponsibility}
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

        {jobResponsibility && (
          <Button size="sm" color="red" onClick={handleClearAll}>
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
