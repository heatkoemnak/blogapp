'use client';
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';

import { useDebounce } from 'use-debounce';

import { BiFilterAlt, BiX } from 'react-icons/bi';
import React, { useEffect, useState, useRef } from 'react';
import { BiGridHorizontal } from 'react-icons/bi';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { MenuItem } from '@material-tailwind/react';
import JobRow from './JobRow';
import { useSearchParams, useRouter } from 'next/navigation';
import Search from '../Search';
import { MdOutlineClearAll, MdViewList } from 'react-icons/md';
import ClearFilter from '../Reusable/ClearFilter';
import Link from 'next/link';

const sortOptions = [
  { name: 'Latest', href: `/jobs/?sort=${'latest'}`, current: true },
  { name: 'Salary: Low to High', href: `/jobs/?sort=${'desc'}`, current: false },
  { name: 'Salary: High to Low', href: `/jobs/?sort=${'asc'}`, current: false },
];

const AllJobs = ({ filterList, jobs }) => {
  const [isGrid, showGridSystem] = useState(false);
  const [page, setPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(jobs?.length / jobsPerPage)
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sort');

  const [text, setText] = useState('');
  const [query] = useDebounce(text, 500);
  const initialRender = useRef(true);

  const jobList = search?.length ? filterList : jobs;
  const hasResults = jobList?.length > 0;

  const handleClear = () => {
    router.push('/jobs?search=');
  };
  useEffect(() => {
    if (hasResults) {
      setTotalPages(Math.ceil(jobList?.length / jobsPerPage));
    }
  }, [jobList, jobsPerPage]);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (sortBy) params.append('sort', sortBy);

    const searchString = params.toString();
    router.push(`/jobs${searchString ? `?${searchString}` : ''}`);
  }, [query, router, sortBy]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const toggleView = () => {
    showGridSystem(!isGrid);
  };

  const GridDisplay = () => (
    <div
      className={`grid ${isGrid ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-2`}
    >
      {hasResults
        ? jobList
            .slice((page - 1) * jobsPerPage, page * jobsPerPage)
            .map((job, index) => <JobRow key={index} job={job} grid={isGrid} />)
        :
          <div className="col-span-2 text-center text-gray-500 py-4">
            No jobs found matching your criteria.
          </div>

              }
    </div>
  );

  const groupJobsBySortOption = (jobs, option) => {
    // Implement sorting logic here based on the option
    return jobs;
  };

  return (
    <div>
      <div className="grid grid-cols-4 border-2 border-gray-300 bg-white mt-4 justify-between items-center">
        <div className="col-span-3 text-gray-700 font-semibold text-md">
          <Search text={text} setText={setText} />
        </div>
        <div className="col-span-1 w-full flex items-center justify-center">
          {isGrid ? (
            <button
              type="button"
              onClick={toggleView}
              className="ml-5 p-2 text-teal-700 hover:text-gray-500 sm:ml-7"
            >
              <MdViewList size={20} className="text-teal-500" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleView}
              className="ml-5 p-2 sm:ml-7"
            >
              <BiGridHorizontal
                size={25}
                className="cursor-pointer text-gray-900 hover:text-gray-500"
              />
            </button>
          )}
          <Menu as="div" className="relative inline-block text-left border py-1 px-2 ml-2">
            <div className="flex items-center">
              <MenuButton className="group flex items-center text-sm font-medium text-gray-900 hover:text-teal-900">
                Sort
                <ChevronDownIcon className="size-5 shrink-0 text-gray-900 group-hover:text-teal-500" />
                <BiFilterAlt className="size-4 text-gray-600" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    <Link
                      href={option.href}
                      className={`block px-4 text-sm ${
                        option.current
                          ? 'font-medium text-gray-900'
                          : 'text-gray-900'
                      } data-[focus]:bg-gray-100 data-[focus]:outline-none`}
                    >
                      {option.name}
                    </Link>
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
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1 font-semibold text-red-600 text-sm pt-5 px-2"
                  >
                    <MdOutlineClearAll size={20} />
                    <span>Clear</span>
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
        <GridDisplay />
        {hasResults && (
          <nav className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-gray-100 border-t border-b border-gray-300"
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 bg-gray-100 border-t border-b border-gray-300"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
