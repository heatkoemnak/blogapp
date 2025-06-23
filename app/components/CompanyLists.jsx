'use client';

import {
  BriefcaseIcon,
  ChevronDownIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';

const CompanyLists = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 my-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image src={company?.logoUrl} width={50} height={50} alt="" />
          </div>
          <span className="text-md font-semibold ml-3">{company?.name}</span>
        </div>
        <button className="text-teal-700 border-cyan-800 hover:bg-cyan-800 hover:text-white border text-xs font-medium rounded-full py-1 px-2 transition transform duration-500">
          View
        </button>
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        <div className="flex gap-2 items-center">
          <div className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-cyan-800 ring-1 ring-inset ring-green-300/20 w-fit">
            <BriefcaseIcon
              aria-hidden="true"
              className="mr-1.5 h-4 w-4 shrink-0"
            />
            {company?.Job.length} Posted
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

