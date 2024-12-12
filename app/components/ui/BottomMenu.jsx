import Link from 'next/link';
import React from 'react';
import { BiLogoBlogger } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiAccountCircle2Fill } from 'react-icons/ri';
const BottomMenu = () => {
  return (
    <div class="fixed z-50 w-full lg:bottom-4 bottom-0 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full left-1/2 bg-gray-40 dark:border-gray-600">
      <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link
          href={'/'}
          class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-900 dark:hover:bg-gray-400 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </Link>
        <Link
          href={'/blogs'}
          class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-400 group"
        >
          <BiLogoBlogger size={25} className="text-gray-900" />
        </Link>
        <div class="flex items-center justify-center">
          <Link
            href={'/create-post'}
            class="inline-flex items-center justify-center w-10 h-10 font-medium bg-gradient-to-r from-orange-500 to-purple-500 rounded-full hover:bg-blue-700 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <Link
          href={'/dashboard'}
          class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-400 group"
        >
          <MdSpaceDashboard size={25} className="text-gray-900" />
        </Link>
        <Link
          href={'/profile'}
          class="relative inline-flex flex-col items-center justify-center px-5 rounded-e-full group"
        >
          <RiAccountCircle2Fill size={25} className="text-gray-900" />
        </Link>
      </div>
    </div>
  );
};

export default BottomMenu;
