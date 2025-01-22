// components/PostList.js
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PostSkeleton from './ui/PostSkeleton';
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
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { MenuItem } from '@material-tailwind/react';
import CategoriesLists from './ui/Selection/CategoriesLists';
import LatestJobs from './ui/jobs/LatestJobs';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const PostList = () => {
  const { companies } = useBlogContext();
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [isLoading, setIsLoading] = useState(false);

  const SearchHandler = useCallback(() => {
    const filterData = jobs?.filter((job) => {
      return job.title?.toLowerCase().includes(search?.toLowerCase());
    });
    setFilterList(filterData);
  }, [jobs, search]);

  console.log(filterList);

  useEffect(() => {
    const timer = setTimeout(() => {
      SearchHandler();
    }, 1000);

    return () => clearTimeout(timer);
  }, [SearchHandler]);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
    <div className="max-w-7xl mx-auto py-6 ">
      {!loading ? (
        <div className="grid grid-cols-5 gap-x-2 gap-y-2">
          <div className="lg:w-full h-auto col-span-3 ">
            <JobRows jobs={search?.length > 0 ? filterList : jobs} />
            <div className="flex border-t-2 mt-4 justify-between items-center py-4 px-4 bg-white">
              <div class="bg-white  text-blue-gray-600 font-semibold text-lg  px-2 py-1 border-gray-300">
                All jobs
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
            <div className=" border-gray-300">
              {search?.length && filterList ? (
                <div>
                  {filterList?.map((job, index) => (
                    <div
                      key={index}
                      className={`${showGrid ? 'col-span-2' : 'col-span-4'}`}
                    >
                      <LatestJobs job={job} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {jobs?.map((job, index) => (
                    <div
                      key={index}
                      className={`${showGrid ? 'col-span-2' : 'col-span-4'}`}
                    >
                      <LatestJobs job={job} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:w-full h-fit col-span-4 bg-white px-5 ">
              <div className="font-semibold text-blue-gray-900 text-md pt-5 pb-2 px-2">
                Companies
              </div>
              {companies &&
                companies.map((company, index) => (
                  <CompanyLists company={company} key={index} />
                ))}
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
              <div class="my-10 ">
                <h1 class="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                  Our location
                </h1>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028974562!2d38.613328040215286!3d8.963479542403238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1710567234587!5m2!1sen!2set"
                  className="rounded-lg w-full h-full"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
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
