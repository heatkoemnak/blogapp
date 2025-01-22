'use client';
import { motion } from 'framer-motion';
import { Carousel, MenuItem } from '@material-tailwind/react';
import { Job } from './ui/jobs/Job';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';
import { BiGridHorizontal } from 'react-icons/bi';
import { useState } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useBlogContext } from '../context/BlogProvider';
import { ExampleJob } from './ui/jobs/ExampleJob';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];
export default function JobList() {
  const { jobs } = useBlogContext();
  const [showGrid, setShowGrid] = useState(false);
  console.log(jobs);
  const groupedJobs = [];
  for (let i = 0; i < jobs?.length; i += 2) {
    groupedJobs.push(jobs?.slice(i, i + 2));
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const GridDisplay = () => {
    return (
      <>
        <div className="max-w-7xl mx-auto py-2 border-b-2 border-gray-300 grid grid-cols-4 gap-x-2 gap-y-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="col-span-1">
              <ExampleJob />
            </div>
          ))}
        </div>
        {/* <div className="max-w-7xl mx-auto py-2 border-b-2 border-gray-300 grid grid-cols-3 gap-x-2 gap-y-2">
          {groupedJobs.map((group, index) => (
            <motion.div key={index} className="flex items-center w-full gap-4">
              {group.map((job, jobIndex) => (
                <motion.div
                  key={job.id}
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: jobIndex * 0.1, // Adjust delay for desired stagger
                    duration: 1.2, // Adjust duration for animation speed
                    ease: [0.4, 0.1, 0.4, 1], // Apply easing for smoother animation
                  }}
                >
                  <div className="rounded-lg shadow-md">
                    <Job job={job} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div> */}
      </>
    );
  };
  return (
    <>
      <div className="max-w-7xl mx-auto mt-4  flex px-4 bg-white border border-b border-gray-300 items-center justify-between">
        <div className="text-blue-gray-600 text-md font-semibold py-3 px-1 ">
          Latest jobs
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
      {showGrid ? (
        <GridDisplay />
      ) : (
        <Carousel
          className=" max-w-7xl mx-auto   lg:pb-10 flex items-center "
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-5 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill('').map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-xl transition-all ${
                    activeIndex === i
                      ? 'w-8 bg-cyan-200'
                      : 'w-4 lg:bg-black bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={({ handlePrev }) => (
            <button
              onClick={handlePrev}
              className="absolute left-4 lg:bottom-0 -bottom-10 z-50  flex items-center bg-cyan-800  text-white px-3 py-1 rounded-full  hover:bg-cyan-800 transition"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Prev
            </button>
          )}
          nextArrow={({ handleNext }) => (
            <button
              onClick={handleNext}
              className="absolute flex items-center right-4 lg:bottom-0 -bottom-10 z-50 bg-cyan-800  text-white px-3 py-1 rounded-full  hover:bg-cyan-800 transition"
            >
              Next
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          )}
        >
          {groupedJobs.map((group, index) => (
            <div key={index} className="flex gap-2 py-2 border-gray-300 ">
              {group.map((job) => (
                <div key={job.id} className="grow">
                  <Job job={job} key={job.id} />
                </div>
              ))}
            </div>
          ))}
          {/* {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex gap-2 py-2 border-gray-300 ">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="grow">
                  <ExampleJob key={index} />
                </div>
              ))}
            </div>
          ))} */}
        </Carousel>
      )}
    </>
  );
}
