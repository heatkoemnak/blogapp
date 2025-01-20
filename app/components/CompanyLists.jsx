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

const CompanyLists = () => {
  return (
    <div className="py-2 px-5 mt-1 grow border-b border-gray-200 bg-white cursor-pointer">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="text-lg w-full font-semibold text-bookmark-blue flex justify-between items-center">
          {/* <Image
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          /> */}
          <div className="flex items-center">
            <svg
              viewBox="0 0 37 38"
              className="h-8 w-8  "
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill-rule="nonzero" fill="none">
                <path
                  d="M31.821 30.764C16.797 37.914 7.473 31.932 1.505 28.3c-.37-.23-.997.053-.453.679 1.989 2.41 8.505 8.222 17.011 8.222 8.512 0 13.576-4.644 14.21-5.455.628-.803.184-1.246-.452-.98z"
                  fill="#F90"
                ></path>
                <path
                  d="M36.04 28.434c-.403-.525-2.453-.623-3.743-.465-1.292.154-3.231.944-3.062 1.418.086.178.263.098 1.15.018.89-.089 3.383-.403 3.903.276.522.684-.795 3.941-1.036 4.467-.232.525.09.66.526.31.43-.35 1.21-1.255 1.733-2.537.52-1.289.836-3.087.53-3.487z"
                  fill="#F90"
                ></path>
                <path
                  d="M26.575 27.912c-.318.285-.778.305-1.137.115-1.599-1.327-1.883-1.944-2.764-3.21-2.641 2.696-4.51 3.501-7.938 3.501-4.05 0-7.206-2.499-7.206-7.504 0-3.908 2.12-6.57 5.134-7.87 2.614-1.152 6.265-1.355 9.055-1.673v-.623c0-1.145.088-2.5-.582-3.488-.59-.887-1.714-1.253-2.703-1.253-1.835 0-3.474.941-3.874 2.892-.081.433-.4.86-.833.88l-4.673-.5c-.393-.089-.826-.407-.718-1.01C9.413 2.507 14.526.8 19.105.8c2.343 0 5.404.623 7.254 2.398 2.343 2.187 2.12 5.106 2.12 8.283v7.504c0 2.256.934 3.245 1.815 4.464.311.433.379.955-.014 1.28-.982.82-2.73 2.343-3.691 3.197l-.014-.014"
                  fill="#000"
                ></path>
                <path
                  d="M21.72 16.175c0 1.876.047 3.44-.902 5.106-.765 1.355-1.977 2.188-3.332 2.188-1.849 0-2.926-1.409-2.926-3.488 0-4.104 3.678-4.85 7.16-4.85v1.044z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
            <span className="text-cyan-700 font-medium text-sm px-2">Amazon</span>
          </div>
          <button class="mr-2 my-1 tracking-wider px-2 text-teal-700 border-cyan-800 hover:bg-cyan-800 hover:text-white border text-xs font-medium rounded-full py-1 transition transform duration-500 cursor-pointer">
            View
          </button>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {/* <h2 className=" font-bold text-slate-900 sm:text-xl lg:text-2xl">
            {job?.title}
          </h2> */}
        <div className="mt-1 flex flex-col space-y-2">
          <div className="flex gap-2 items-center">
            <div className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-cyan-800 ring-1 ring-inset ring-green-300/20 w-fit">
              <BriefcaseIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0"
              />
              35 jobs
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon
                aria-hidden="true"
                color="gray"
                className="mr-1.5 h-4 w-4  shrink-0"
              />
              Phnom Penh
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

export default CompanyLists;
