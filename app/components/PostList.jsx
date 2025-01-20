// components/PostList.js
'use client';
import React, { useState } from 'react';
import Post from './Post';
import PostSkeleton from './ui/PostSkeleton';
import MostLikePost from './Post/MostLikePost';
import { CountByCategories } from './ui/CheckBoxs/CountByCategories';
import { BiGridHorizontal } from 'react-icons/bi';
import { JobLevelList } from './ui/CheckBoxs/JobLevelList';
import { useBlogContext } from '../context/BlogProvider';
import JobRows from './ui/jobs/JobRows';
import SalaryCheckbox from './ui/CheckBoxs/SalaryCheckbox';
import { JobLocation } from './ui/DropdownFilters/JobLocation';
import CompanyLists from './CompanyLists';
import Advertisment from './Advertisment';
import Announcement from './Announcement';
import JobIndustry from './ui/DropdownFilters/JobIndustry';
import JobList from './JobList';
import { ExampleJob } from './ui/jobs/ExampleJob';
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { MenuItem } from '@material-tailwind/react';
import CategoriesLists from './ui/Selection/CategoriesLists';

const PostList = () => {
  const { announcement } = useBlogContext();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className="max-w-7xl mx-auto py-6">
      {!loading ? (
        <div className="grid grid-cols-5 gap-x-2 gap-y-2">
          <div className="lg:w-full h-auto col-span-3 ">
            <JobRows />
            <div className="flex justify-between items-center py-4 px-4 bg-white">
              <div className="font-semibold text-blue-gray-900 text-md ">
                Job List
              </div>
              <div className="flex items-center">
                {showGrid ? (
                  <button
                    type="button"
                    onClick={() => setShowGrid(!showGrid)}
                    className="-m-2 ml-5 p-2 text-blue-gray-900 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="size-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowGrid(!showGrid)}
                    className="-m-2 ml-5 p-2 sm:ml-7"
                  >
                    <span className="sr-only ">View grid</span>
                    <BiGridHorizontal
                      size={30}
                      className="cursor-pointer text-blue-gray-900 hover:text-gray-500 "
                    />
                  </button>
                )}
                <button
                  type="button"
                  // onClick={() => setMobileFiltersOpen(true)}
                  className="  p-2 text-blue-gray-900 hover:text-gray-500 "
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="size-4" />
                </button>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-blue-gray-900 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-blue-gray-900 group-hover:text-gray-500" />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              'block px-4  text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none'
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="py-2 border-b-2 border-gray-300 grid grid-cols-4 gap-x-2 gap-y-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className={`${showGrid ? 'col-span-2' : 'col-span-4' }`}>
                  <ExampleJob />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-full h-fit col-span-2 bg-white px-5 ">
            <div className="lg:w-full h-fit col-span-1 bg-white px-5 ">
              <div className="font-semibold text-blue-gray-900 text-md pt-5 px-2">
                Categories
              </div>
              <CategoriesLists />
              <div className="font-semibold text-blue-gray-900 text-md pt-5 px-2">
                Job types
              </div>
              <CountByCategories />
              <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
                Job level
              </div>
              <JobLevelList />
              <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
                Industry
              </div>
              <JobIndustry />
              <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
                Salary range
              </div>
              <SalaryCheckbox />
              <div className="font-semibold  text-blue-gray-900 text-md pt-5 px-2">
                Location
              </div>
              <JobLocation />
            </div>
            <div className="lg:w-full h-fit col-span-1 bg-white px-5 ">
              <div className="font-semibold text-blue-gray-900 text-md pt-5 pb-2 px-2">
                Companies
              </div>
              <CompanyLists />
              <CompanyLists />
              <CompanyLists />
              <CompanyLists />
              <div className="font-semibold text-blue-gray-900 text-md pt-5 pb-2 px-2">
                Announcements
              </div>
              <Announcement />
              <div className="font-semibold text-blue-gray-900 text-md pt-5 pb-2 px-2">
                Advertisments
              </div>
              <Advertisment />
            </div>
          </div>
        </div>
      ) : (
        <PostSkeleton postLength={6} latestPost={3} />
      )}
    </div>
  );
};

export default PostList;
