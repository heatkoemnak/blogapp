'use client';
import { useBlogContext } from '@/app/context/BlogProvider';
import Link from 'next/link';
import React from 'react';

const CategoriesLists = () => {
  const { jobCategories } = useBlogContext();

  return (
    <aside className="w-full rounded-lg border-2 mt-4 p-4 max-w-md mx-auto">
      <h2 className="font-bold text-2xl mb-4">Browse by Categories</h2>
      <ul className=" list-none">
        <li className="">
          <Link
            className="p-1 px-3 mb-4 rounded-none font-medium hover:bg-transparent hover:border bg-teal-400/50 text-teal-500"
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
            <li key={index} className="">
              <Link
                className=" px-1 rounded-none font-medium hover:bg-transparent hover:border  text-teal-500"
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
          <li className="flex flex-col mx-1">
            <Link
              className="p-1 px-3 rounded-full font-medium hover:bg-transparent hover:border bg-teal-400/15 text-teal-500"
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
