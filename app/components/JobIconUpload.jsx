import React from 'react';

export default function JobIconUpload() {
  return (
    <>
      <div className="relative my-6 bg-white">
        <input
          id="id-dropzone01"
          name="file-upload"
          type="file"
          className="hidden"
        />
        <label
          for="id-dropzone01"
          className="relative flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-3 py-6 text-center text-sm font-medium transition-colors"
        >
          <span className="inline-flex h-12 items-center justify-center self-center rounded-full bg-slate-100/70 px-3 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="File input icon"
              role="graphics-symbol"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
          </span>
          <span className="text-slate-500">
            Drag & drop or
            <span className="text-emerald-500"> upload a file</span>
          </span>
        </label>
      </div>
    </>
  );
}
