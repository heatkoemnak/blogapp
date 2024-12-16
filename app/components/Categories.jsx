'use client';

import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';

const Categories = () => {
  const { categoryList, isLoading } = useBlogContext();

  return (
    <div className="flex items-center py-2 flex-wrap">
      {categoryList ? (
        categoryList.map((category) => (
          <Link
            href={`/blogs/category/${category.id}`}
            key={category.id}
            className="text-sm"
          >
            <button
              type="button"
              class="bg-[#212121] border text-white  hover:border-gray-200 border-gray-900 dark:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-sm font-medium px-3 py-2 text-center me-3 mb-3 dark:focus:ring-gray-800"
            >
             # {category.name}
            </button>
            {/* <button
              role="status"
              className={
                isLoading
                  ? 'animate-pulse bg-gray-300  '
                  : 'group relative flex items-center justify-center gap-1 bg-[#212121] rounded-2xl px-4 py-1.5 text-sm font-medium transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]'
              }
              aria-label={`Category: ${category.name}`}
            >
              <div
                className="shrink-0 w-[1px] h-4 bg-border"
                role="none"
                data-orientation="vertical"
              ></div>
              <span className="inline-block animate-gradient whitespace-pre text-white">
                {category.name}
              </span>
            </button> */}
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default Categories;
