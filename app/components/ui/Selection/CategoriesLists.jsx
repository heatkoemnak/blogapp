import { useBlogContext } from '@/app/context/BlogProvider';
import Link from 'next/link';
import React from 'react';

const CategoriesLists = () => {
  const { jobCategories } = useBlogContext();
  return (
    <aside className="w-full rounded-lg border-2 mt-4 p-4 max-w-md mx-auto">
      <ul className="flex items-start flex-wrap mt-4">
        {jobCategories &&
          jobCategories?.map((cate, index) => (
            <li key={index} className="flex mx-1">
              <Link
                className="p-2 px-3 
       mb-4 rounded font-medium hover:bg-transparent hover:
       border bg-teal-400/25 text-teal-500"
                href="category/all"
              >
                {cate?.name}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default CategoriesLists;
