import React from 'react';

const PostHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-2xl py-6">All posts</h1>
      <form className="w-1/2 ">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-white "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-white border placeholder:text-white border-gray-300 rounded-lg bg-orange-500 hover:bg-orange-600 "
            placeholder="Search posts"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default PostHeader;
