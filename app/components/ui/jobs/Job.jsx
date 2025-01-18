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

export function Job({ job }) {
  return (
    <div className=" p-5 border border-b-2 mb-2 rounded-lg mt-2 bg-white cursor-pointer">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div class="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
          {job?.image ? (
            <Image
              src={job?.image}
              alt={''}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-cyan-100">
              <svg
                class="w-5 h-5 text-cyan-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
          )}
          <div className="job-text flex flex-col">
            <span className="text-cyan-700 font-light text-sm px-2">
              Amazon
            </span>
            <span className="text-cyan-700 font-bold px-2">{job.position}</span>
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {/* <h2 className=" font-bold text-slate-900 sm:text-xl lg:text-2xl">
            {job?.title}
          </h2> */}
        <div className="mt-1 flex flex-col space-y-2">
          <div className="flex gap-2 items-center">
            <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-cyan-800 ring-1 ring-inset ring-green-300/20 w-fit">
              <BriefcaseIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0"
              />
              {job?.JobType.name}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon
                aria-hidden="true"
                color="gray"
                className="mr-1.5 h-4 w-4  shrink-0"
              />
              {job?.ProvinceCity?.name}
            </div>
            <div className="flex items-center text-cyan-700 text-sm ">
              <CurrencyDollarIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0 text-orange-300"
              />
              {job?.JobSalary?.label}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700 ">
            <div className="flex items-center  ">
              <CalendarIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0 text-red-500"
              />
              <span className="text-xs">Closing on {job?.closeDate}</span>
            </div>
            <div>
              <button class="mr-2 my-1 uppercase tracking-wider px-2 text-cyan-800 border-cyan-800 hover:bg-cyan-800 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
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
    </div>
  );
}
