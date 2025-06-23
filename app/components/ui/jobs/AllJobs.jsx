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

  const router = useRouter();
  const initialRender = useRef(true);
  const params = new URLSearchParams();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get('sort');
  const search = searchParams.get('search');
  const [text, setText] = useState('');
  const [query] = useDebounce(text, 500);
  const [isGrid, showGridSystem] = useState(false);
  const [page, setPage] = useState(1);
  const jobListRef = useRef(null);
  const [filter, setFilter] = useState(false);
  const [jobsPerPage, setJobsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(Math.ceil(jobs?.length / jobsPerPage) );
  if (query) params.append('search', query);
  if (sortBy) params.append('sort', sortBy);

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
    const searchString = params.toString();
    router.push(`/jobs${searchString ? `?${searchString}` : ''}`);
  }, [query, router, sortBy]);
useEffect(() => {
  if (search && hasResults && jobListRef.current) {
    jobListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [search, hasResults]);

  const GridDisplay = () => (
    <div className={`grid ${isGrid ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-2`}>
      {hasResults ? jobList.slice((page - 1) * jobsPerPage, page * jobsPerPage)?.map((job, index) => <JobRow key={index} job={job} grid={isGrid} />)
        :
        <div className="col-span-2 text-center text-gray-500 py-4">
            No jobs found matching your criteria.
          </div>
      }
    </div>
  );

    const handlePageChange = (page) => {
      setPage(page);
    };

    const toggleView = () => {
      showGridSystem(!isGrid);
    };

  return (
    <div>
     <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-gray-300 rounded-md px-4 py-3 mt-4 shadow-sm">
  {/* Search Bar */}
  <div className="w-full md:w-2/3">
    <Search text={text} setText={setText} />
  </div>

  {/* View Toggle + Sort Dropdown */}
  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
    {/* Grid/List Toggle */}
    <button
      type="button"
      onClick={toggleView}
      className="flex items-center gap-1 px-3 py-2 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800"
    >
      {isGrid ? (
        <>
          <MdViewList size={18} className="text-teal-500" />
          <span className="text-sm">List View</span>
        </>
      ) : (
        <>
          <BiGridHorizontal size={18} className="text-gray-700" />
          <span className="text-sm">Grid View</span>
        </>
      )}
    </button>

    {/* Sort Dropdown */}
    <div className="relative inline-block text-left">
  <button
    onClick={() => setFilter((prev) => !prev)}
    className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 bg-gray-50 rounded-md hover:bg-gray-100 text-gray-800"
  >
    Sort
    <ChevronDownIcon className="w-4 h-4" />
    <BiFilterAlt className="w-4 h-4 text-gray-500" />
  </button>

  {filter && (
    <div className="absolute right-0 z-20 mt-2 w-52 rounded-md bg-white shadow-lg ring-1 ring-black/10">
      <ul className="py-1 list-none text-sm text-gray-700">
        {sortOptions.map((option) => (
          <li key={option.name}>
            <Link
              href={option.href}
              className={`block px-4 py-2 hover:bg-gray-100 transition ${
                option.current ? 'font-semibold text-teal-700' : 'text-gray-700'
              }`}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  </div>
</div>

      <div className="border-gray-300">
        {search?.length > 0 && (
          <div className="my-4 rounded-md border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-4 py-3">
              {hasResults ? (
                <>
                  <span className="text-gray-700 text-sm sm:text-base">
                    🔍 Found <strong>{jobList.length}</strong> result{jobList.length > 1 && 's'} for <strong>{search}</strong>
                  </span>
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 transition"
                  >
                    <MdOutlineClearAll size={18} />
                    <span>Clear Search</span>
                  </button>
                </>
              ) : (
                <span className="text-gray-600 text-sm">
                  ❌ No results found for <strong>{search}</strong>. Try a different keyword.
                </span>
              )}
            </div>
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
