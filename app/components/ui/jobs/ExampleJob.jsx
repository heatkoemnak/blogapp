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
import { timeAgo } from '@/app/utils/timeAgo';
import Link from 'next/link';

export function ExampleJob({ job }) {
  console.log(job);
  return (
    <div className="p-5 grow border border-gray-200 bg-white cursor-pointer">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center">
          <Image
            src={
              job?.icon ||
              'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'
            }
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex grow flex-col bg-blue-gray-200 px-4">
            <div className="flex justify-between">
              <Link
                href={`jobs/${job?.id}`}
                className="text-cyan-700 grow    text-sm font-light hover:text-teal-700"
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
            <span className="text-cyan-700 font-bold">{job?.title}</span>
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
              {job?.ProvinceCity.name}
            </div>
            <div className="flex items-center text-cyan-700 text-sm ">
              <CurrencyDollarIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0 text-orange-300"
              />
              <span className="text-xs">{job?.JobSalary.label}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700 ">
            <div className="flex items-center  ">
              <CalendarIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0 text-red-500"
              />
              <span className="text-xs">{timeAgo(job?.createdAt)}</span>
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
