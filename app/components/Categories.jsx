'use client';

import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';

const Categories = () => {
  const { categoryList } = useBlogContext();

  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categoryList ? (
        categoryList.map((category) => (
          <Link
            href={`/blogs/category/${category.id}`}
            key={category.id}
            className="uppercase text-sm"
          >
            <button
              className="group relative flex items-center justify-center gap-1 bg-[#212121] rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
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
            </button>
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default Categories;
