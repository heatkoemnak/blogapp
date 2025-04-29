'use client';
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import {
  BiBuilding,
  BiSolidMinusCircle,
  BiSolidPlusCircle,
  BiX,
} from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import { BiGridHorizontal } from 'react-icons/bi';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { MenuItem } from '@material-tailwind/react';
import JobRow from './JobRow';
import { useSearchParams, useRouter } from 'next/navigation';
const AllJobs = ({ filterList, jobs }) => {
  const [isGrid, showGridSystem] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  console.log(search);
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

  const jobList = search?.length ? filterList : jobs;
  const hasResults = jobList?.length > 0;
  const handleClear = () => {
    router.push(`/jobs?search=`);
  };
  return (
    <div>
      <div className="bg-teal-900 flex border-t-2 mt-4 justify-between items-center py-2 px-4 ">
        <div class=" text-white font-semibold text-lg  px-2 border-gray-300">
          All jobs
        </div>
        <div className="flex items-center">
          {isGrid ? (
            <button
              type="button"
              onClick={() => showGridSystem(!isGrid)}
              className="-m-2 ml-5 p-2 text-gray-100 hover:text-gray-500 sm:ml-7"
            >
              <Squares2X2Icon className="size-4 text-gray-100" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => showGridSystem(!isGrid)}
              className="-m-2 ml-5 p-2 sm:ml-7"
            >
              <BiGridHorizontal
                size={30}
                className="cursor-pointer text-gray-100 hover:text-gray-500 "
              />
            </button>
          )}
          <button type="button" className="  p-2 hover:text-gray-500 ">
            <FunnelIcon className="size-4 text-gray-100" />
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-100 hover:text-teal-900">
                Sort
                <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-100 group-hover:text-teal-500" />
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
      <div className="border-gray-300">
        {search?.length > 0 && (
          <div className="py-2 px-4 bg-gray-100 text-gray-700">
            <p>
              {hasResults ? (
                <div className="flex justify-between py-2 px-4 bg-gray-100 text-gray-700 rounded-md mb-4">
                  <span>
                    Found {jobList.length} result(s) for{' '}
                    <strong>{search}</strong>
                  </span>
                  <button
                    onClick={handleClear}
                    className="bg-blue-gray-500/20 flex items-center gap-2 py-1 px-2  rounded-full"
                  >
                    <span>Clear</span>
                    <BiX
                      size={20}
                      className="text-red-700 bg-blue-gray-500/20 rounded-full"
                    />
                  </button>
                </div>
              ) : (
                <>
                  No results found for <strong>{search}</strong>. Please try a
                  different keyword.
                </>
              )}
            </p>
          </div>
        )}

        <div>
          {hasResults
            ? jobList.map((job, index) => (
                <div
                  key={index}
                  className={isGrid ? 'col-span-2' : 'col-span-4'}
                >
                  <JobRow job={job} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
