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
  for (let i = 0; i < jobs.length; i += 4) {
    groupedJobs.push(jobs.slice(i, i + 4));
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const GridDisplay = () => {
    return (
      <>
        {groupedJobs.map((group, index) => (
          <motion.div key={index} className="flex w-full gap-4">
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
      </>
    );
  };
  return (
    <>
      <div className="flex border-t-2 border-green-200 mt-5 items-center justify-between">
        <h2 className="text-white">Job Lists</h2>

        <div className="flex items-center">
          {showGrid ? (
            <button
              type="button"
              onClick={() => setShowGrid(!showGrid)}
              className="-m-2 ml-5 p-2 text-gray-50 hover:text-gray-500 sm:ml-7"
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
                color="#fff"
                className="cursor-pointer text-gray-50 hover:text-gray-500 "
              />
            </button>
          )}
          <button
            type="button"
            // onClick={() => setMobileFiltersOpen(true)}
            className="  p-2 text-white hover:text-gray-500 "
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon className="size-4" />
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-50 hover:text-gray-900">
                Sort
                <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
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
          className="rounded-xl border-b-2 border-green-100  lg:pb-16 flex items-center "
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
              className="absolute left-4 lg:bottom-0 -bottom-10 z-50  flex items-center lg:bg-transparent bg-blue-700  text-white px-3 py-1 rounded-full  hover:bg-blue-700 transition"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Prev
            </button>
          )}
          nextArrow={({ handleNext }) => (
            <button
              onClick={handleNext}
              className="absolute flex items-center right-4 lg:bottom-0 -bottom-10 z-50 lg:bg-transparent bg-blue-700  text-white px-3 py-1 rounded-full  hover:bg-blue-700 transition"
            >
              Next
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          )}
        >
          {groupedJobs.map((group, index) => (
            <div key={index} className="lg:flex w-full gap-4 ">
              {group.map((job) => (
                <div key={job.id} className=" lg:mb-4">
                  <div className="rounded-lg shadow-md ">
                    <Job job={job} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
}
