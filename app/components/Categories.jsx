'use client';
import Link from 'next/link';
import { useBlogContext } from '../context/BlogProvider';
import CategorySkeleton from './ui/CategorySkeleton';
import { Badge, Carousel } from '@material-tailwind/react';
import { MoreCategories } from './ui/Selection/MoreCategories';

const Categories = () => {
  const { categoryList, isLoading } = useBlogContext();

  return (
    <div className="py-2 w-full">
      {isLoading ? (
        <CategorySkeleton />
      ) : categoryList ? (
        <div className="flex flex-col gap-4">
          {/* Carousel for small screens */}
          <div className="block lg:hidden">
            <Carousel
              className="rounded-lg bg-cyan-900 "
              autoplay={false}
              loop={true}
            >
              {categoryList.map((category) => (
                <div key={category.id} className="flex h-40 justify-center items-center px-12">
                  <Link href={`/blogs/category/${category.id}`} className="w-full flex justify-center ">
                    <Badge
                      content="15"
                      withBorder
                      className="bg-yellow-200 font-bold  shadow-md text-cyan-800"
                    >
                      <button className="text-base font-medium hover:bg-cyan-900 w-full px-4 py-2 bg-cyan-500 rounded-md whitespace-nowrap">
                        {category.name}
                      </button>
                    </Badge>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Standard layout for large screens */}
          <div className="hidden lg:flex items-center gap-2 justify-between">
            <div className="flex w-full items-center">
              {categoryList.map((category) => (
                <Link
                  key={category.id}
                  href={`/blogs/category/${category.id}`}
                  className="flex mr-2 items-center capitalize text-white rounded-lg px-3 py-5 transition-transform hover:scale-105"
                >
                  <Badge
                    content="15"
                    withBorder
                    className="bg-yellow-200 -z-10 font-bold rounded-s-2xl mt-3 -mr-3 shadow-md text-cyan-800"
                  >
                    <button className="text-base font-medium hover:bg-cyan-900 w-auto px-3 py-2 bg-cyan-800 rounded-md whitespace-nowrap">
                      {category.name}
                    </button>
                  </Badge>
                </Link>
              ))}
              <div className="flex px-2 w-full justify-end">
                <MoreCategories />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center rounded-lg bg-gray-100 px-4 py-2">
          No categories available
        </p>
      )}
    </div>
  );
};

export default Categories;
