'use client';

import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';
import CategorySkeleton from './ui/CategorySkeleton';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Categories = () => {
  const { categoryList, isLoading } = useBlogContext();

  return (
    <div className="flex items-center py-3 flex-wrap">
      {isLoading ? (
        <CategorySkeleton />
      ) : categoryList ? (
        categoryList.map((category) => {
          const bgColor = generateRandomColor();
          return (
            <Link
              href={`/blogs/category/${category.id}`}
              key={category.id}
              className=" my-1"
            >
              <button
                type="button"
                style={{ color: bgColor }}
                className="border text-white hover:scale-105  hover:bg-gray-100 bg-slate-50 border-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 text-center mx-1 font-medium dark:focus:ring-gray-800"
              >
                # {category.name}
              </button>
            </Link>
          );
        })
      ) : (
        <p className="text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default Categories;
