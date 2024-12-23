'use client';
import { useBlogContext } from '@/app/context/BlogProvider';
import Link from 'next/link';
import React, { useState } from 'react';
import CategorySkeleton from '../ui/CategorySkeleton';

const PostHeader = () => {
  const [dorpDownOpen, setDorpDownOpen] = useState(false);
  const { categoryList, isLoading } = useBlogContext();
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-2xl py-6">All posts</h1>
      <form className="w-1/2 ">
        <button
          onClick={() => setDorpDownOpen(!dorpDownOpen)}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          More categories
          <svg
            class="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dorpDownOpen && (
          <div class="z-10   relative  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul
              class="absolute h-52 overflow-y-scroll top-2 rounded-lg bg-slate-900 w-full py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {isLoading ? (
                <CategorySkeleton />
              ) : categoryList ? (
                categoryList.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/blogs/category/${category.id}`}
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No categories available</p>
              )}
            </ul>
          </div>
        )}

        {/* <label
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
        </div> */}
      </form>
    </div>
  );
};

export default PostHeader;
