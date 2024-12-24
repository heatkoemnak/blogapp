'use client';

import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';
import CategorySkeleton from './ui/CategorySkeleton';

// Function to generate random colors
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
    <div className="py-3">
      {isLoading ? (
        <CategorySkeleton />
      ) : categoryList ? (
        categoryList.slice(0, 4).map((category) => {
          const bgColor = generateRandomColor();
          return (
            <Link key={category.id} href={`/blogs/category/${category.id}`}>
              <button
                type="button"
                style={{ color: bgColor }}
                className="text-white border-cyan-600  hover:border-gray-200 dark:border-gray-900 bg-white  dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3"
              >
                {category.name}
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
