'use client';
import { useBlogContext } from '@/app/context/BlogProvider';
import Link from 'next/link';
import React from 'react';

const CategoriesLists = () => {
  const { jobCategories } = useBlogContext();

  return (
    <aside className="w-full rounded-lg border-2 mt-4 p-4 max-w-md mx-auto">
      <ul className="flex items-start flex-wrap mt-4">
        <li className="flex mx-1">
          <Link
            className="p-2 px-3 mb-4 rounded-full font-medium hover:bg-transparent hover:border bg-teal-400/50 text-teal-500"
            href={{
              pathname: '/jobs/',
              query: { search: '' },
            }}
          >
            All
          </Link>
        </li>
        {jobCategories &&
          jobCategories.slice(0, 5).map((cate, index) => (
            <li key={index} className="flex mx-1">
              <Link
                className="p-1 px-3 mb-4 rounded-full font-medium hover:bg-transparent hover:border bg-teal-400/15 text-teal-500"
                href={{
                  pathname: '/jobs/',
                  query: { search: cate?.name },
                }}
              >
                {cate?.name}
              </Link>
            </li>
          ))}

        {jobCategories && jobCategories.length > 5 && (
          <li className="flex mx-1">
            <Link
              className="p-1 px-3 mb-4 rounded-full font-medium hover:bg-transparent hover:border bg-teal-400/15 text-teal-500"
              href={{
                pathname: '/jobs/',
                query: { search: '' },
              }}
            >
              Show More ({jobCategories.length - 5})
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default CategoriesLists;
