'use client';

import {
  BriefcaseIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import { timeAgo } from '@/app/utils/timeAgo';
import { RiCalendarCloseFill } from 'react-icons/ri';
import { BsBookmarkPlus, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Job({ job }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  console.log(job);
  return (
    <div className="relative rounded-lg shadow-md  p-5 border-2 border-teal-100/30 bg-white cursor-pointer">
      <div class=" absolute top-1 right-0 z-10 pl-5 pr-3 whitespace-no-wrap">
        <span class="text-gray-400 text-xs">{timeAgo(job?.createdAt)}</span>
      </div>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center">
          <Image
            src={
              job?.icon ||
              'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'
            }
            alt=""
            width={500}
            height={500}
            className="w-10 h-10 border bg-cover rounded-full"
          />
          <div className="flex flex-col px-2">
            <span className="text-cyan-700 font-bold">{job?.title}</span>
            <span className="text-blue-gray-600 font-light text-sm">
              {job?.Company?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mt-1 flex flex-col space-y-2">
          <div className="flex gap-2 items-center">
            <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-cyan-800 ring-1 ring-inset ring-green-300/20 w-fit">
              <BriefcaseIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 shrink-0"
              />
              {job?.JobType?.name}
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
              <span className="text-xs">{job?.JobSalary?.label}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700 ">
            <div className="flex items-center gap-2 ">
              <RiCalendarCloseFill className="h-4 w-4 shrink-0 text-red-800" />
              <span className="text-xs">Closing on - {job?.closeDate}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/jobs/apply/${job?.id}`)}
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
            {/* <div>
              <button class="mr-2 my-1 uppercase tracking-wider px-2 text-cyan-800 border-cyan-800 hover:bg-cyan-800 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                Apply
              </button>
            </div> */}
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
