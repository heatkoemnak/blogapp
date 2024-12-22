'use client';

import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';
import CategorySkeleton from './ui/CategorySkeleton';

const Categories = () => {
  const { categoryList, isLoading } = useBlogContext();



  return (
    <div className="flex items-center py-2 flex-wrap">
      {isLoading ? (
        <CategorySkeleton />
      ) : categoryList ? (
        categoryList.map((category) => (
          <Link
            href={`/blogs/category/${category.id}`}
            key={category.id}
            className="text-sm"
          >
            <button
              type="button"
              className="bg-[#212121] border text-white  hover:border-gray-200 border-gray-900 dark:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-sm font-medium px-3 py-2 text-center me-3 mb-3 dark:focus:ring-gray-800"
            >
              # {category.name}
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

