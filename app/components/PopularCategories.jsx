'use client';
import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';

const PopularCategories = () => {
  const { categories } = useBlogContext();

  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categories &&
        categories.map((category) => (
          <Link
            className="px-4 py-2 rounded-md bg-slate-800 text-white"
            href={`/blogs/category/${category.id}`}
            key={category.id}
          >
            {category.name}
          </Link>
        ))}
    </div>
  );
};

export default PopularCategories;
