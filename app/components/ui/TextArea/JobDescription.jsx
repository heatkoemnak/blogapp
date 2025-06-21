'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export function JobDescription({ errors, description, setDescription }) {
  const [currentInput, setCurrentInput] = useState(description || '');

  useEffect(() => {
    setCurrentInput(description || '');
  }, [description]);

  // Auto-save while typing
  const handleQuillChange = (value) => {
    setCurrentInput(value);
    setDescription(value); // auto-save
  };

  const handleClearAll = () => {
    setCurrentInput('');
    setDescription('');
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
      <QuillEditor
        value={currentInput}
        onChange={handleQuillChange}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Enter job description..."
        className="min-h-[120px]"
      />

      {errors.description && (
        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
      )}

      <div className="flex justify-end items-center mt-4">
        <Button size="sm" color="red" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
}
