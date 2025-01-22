'use client';

import {
  BriefcaseIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/app/utils/timeAgo';
import { BsBookmarkPlus, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { useState } from 'react';

const LatestJobs = ({ job }) => {
  console.log(job);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  return (
    <div className="px-5  py-6 grow border-b border-gray-200 bg-white hover:bg-gray-100/95 cursor-pointer">
      <div className="lg:flex  lg:items-center lg:justify-between">
        <div className="text-lg grow font-semibold text-bookmark-blue flex space-x-1 items-center">
          <Link href={`jobs/${job?.id}`}>
            <Image
              src={
                job?.icon ||
                'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=500&q=80'
              }
              alt=""
              width={500} // Larger width for better quality
              height={500}
              className="w-24 h-auto cover border border-blue-gray-100"
              layout="intrinsic" // Helps maintain aspect ratio with appropriate sizing
            />
          </Link>

          <div className="flex grow flex-col px-4">
            <div className="flex justify-between">
              <Link
                href={`jobs/${job?.id}`}
                className="text-cyan-700 text-sm font-light hover:text-teal-700"
              >
                {job?.Company.name}
              </Link>
              <Link
                href={`jobs/${job?.id}`}
                className="text-teal-700 font-medium text-sm"
              >
                view
              </Link>
            </div>
            <Link
              href={`jobs/${job?.id}`}
              className="text-cyan-700 text-md font-semibold"
            >
              {job?.title}
            </Link>
            <div className="mt-1 flex  justify-between ">
              <div className="flex gap-2 ">
                <div className="flex gap-1 rounded items-center text-xs font-medium text-teal-500 ">
                  <BriefcaseIcon aria-hidden="true" className=" h-4 w-4  " />
                  {job?.JobType.name}
                </div>
                <div className="flex  gap-1 rounded items-center text-blue-gray-600">
                  <MapPinIcon
                    aria-hidden="true"
                    color="gray"
                    className="h-4 w-4 "
                  />
                  <span className="text-xs font-light">
                    {job?.ProvinceCity?.name}
                  </span>
                </div>
                <div className="flex items-center text-blue-gray-600 ">
                  <CurrencyDollarIcon
                    aria-hidden="true"
                    className="mr-1.5 h-4 w-4 shrink-0 text-yellow-800"
                  />
                  <span className="text-xs font-light">
                    {job?.JobSalary.label}
                  </span>
                </div>
                <div className="flex grow items-center text-blue-gray-600">
                  <span className="text-xs font-light">
                    {timeAgo(job?.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => routeros.push(`/jobs/apply/${job?.id}`)}
                  class="mr-2 my-1 tracking-wider px-2 text-teal-700 border-teal-100 hover:bg-cyan-800 hover:text-white border text-sm font-medium rounded-full py-1 transition transform duration-500 cursor-pointer"
                >
                  Apply
                </button>
                <div className="flex items-center gap-2 cursor-pointer">
                  {isBookmarked ? (
                    <BsFillBookmarkPlusFill
                      className="text-cyan-700"
                      size={20}
                      onClick={toggleBookmark}
                    />
                  ) : (
                    <BsBookmarkPlus
                      className="text-teal-700"
                      size={20}
                      onClick={toggleBookmark}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex lg:mt-0 lg:ml-4 lg:shrink-0">
        <Menu as="div" className="relative sm:hidden">
          <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
            More
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 ml-1.5 h-4 w-4 text-gray-400"
            />
          </MenuButton>

          <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                Edit
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                View
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default LatestJobs;
