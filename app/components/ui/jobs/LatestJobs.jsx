'use client';

import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/app/utils/timeAgo';

const LatestJobs = ({ job }) => {
  console.log(job);
  return (
    <div className="px-5  py-4 grow border-b border-gray-200 bg-white hover:bg-blue-gray-50 cursor-pointer">
      <Link href={`jobs/details/${job?.id}`}>
        <div className="lg:flex  lg:items-center lg:justify-between">
          <div className="text-lg grow font-semibold text-bookmark-blue flex space-x-1 items-center">
            <Image
              src={
                job?.icon ||
                'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=500&q=80'
              }
              alt=""
              width={500} // Larger width for better quality
              height={500}
              className="w-24 h-auto cover border border-blue-gray-100 rounded-full"
              layout="intrinsic" // Helps maintain aspect ratio with appropriate sizing
            />

            <div className="flex grow flex-col px-4">
              <span className="text-teal-700 font-medium text-sm">
                {job?.Company.name}
              </span>
              <span className="text-cyan-700 text-md font-semibold">
                {job?.title}
              </span>
              <div className="mt-1 flex justify-between ">
                <div className="flex gap-2 ">
                  <div className="inline-flex rounded items-center py-1 text-xs  px-1 font-medium text-teal-500 w-fit">
                    <BriefcaseIcon
                      aria-hidden="true"
                      className="mr-1.5 h-6 w-6 p-1 shrink-0 bg-teal-100"
                    />
                    {job?.JobType.name}
                  </div>
                  <div className="flex items-center text-blue-gray-600">
                    <MapPinIcon
                      aria-hidden="true"
                      color="gray"
                      className="mr-1.5 h-4 w-4  shrink-0"
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
                <button class="mr-2 my-1 tracking-wider px-2 text-teal-700 border-cyan-800 hover:bg-cyan-800 hover:text-white border text-sm font-medium rounded-full py-1 transition transform duration-500 cursor-pointer">
                  Apply
                </button>
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
      </Link>
    </div>
  );
};

export default LatestJobs;
