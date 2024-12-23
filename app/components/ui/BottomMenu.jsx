'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { BiLogoBlogger } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiAccountCircle2Fill } from 'react-icons/ri';

const BottomMenu = () => {
  const currentPath = usePathname();

  const isActive = (path) => currentPath === path;

  return (
    <div className="fixed z-50 w-full lg:w-80 shadow-lg p-2 lg:bottom-4 bottom-0 -translate-x-1/2 bg-white border border-gray-200 lg:rounded-full left-1/2 bg-gray-40 dark:border-gray-600">
      <div className="grid max-w-lg grid-cols-5 mx-auto">
        <Link
          href={'/'}
          className={`inline-flex flex-col items-center justify-center lg:rounded-s-full ${
            isActive('/') ? 'text-orange-600 font-bold' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-6 hover:text-orange-500 ${
              isActive('/') ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <small>Home</small>
        </Link>

        <Link
          href={'/blogs'}
          className={`inline-flex flex-col items-center justify-center p-2 ${
            isActive('/blogs') ? 'text-orange-600 font-bold' : ''
          }`}
        >
          <BiLogoBlogger
            size={25}
            className={`hover:text-orange-500 ${
              isActive('/blogs') ? 'text-orange-600' : 'text-gray-500'
            }`}
          />
          <small>Blog</small>
        </Link>

        <div className="flex flex-col items-center cursor-pointer justify-center">
          <Link
            href={'/create-post'}
            className={`inline-flex items-center justify-center w-8 h-8 font-medium rounded-full ${
              isActive('/create-post')
                ? 'bg-orange-700'
                : 'bg-gradient-to-r from-orange-500 to-orange-700'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <small>Create</small>
        </div>

        <Link
          href={'/dashboard'}
          className={`inline-flex flex-col items-center justify-center p-2 ${
            isActive('/dashboard') ? 'text-orange-600 font-bold' : ''
          }`}
        >
          <MdSpaceDashboard
            size={25}
            className={`hover:text-orange-500 ${
              isActive('/dashboard') ? 'text-orange-600' : 'text-gray-500'
            }`}
          />
          <small>Dashboard</small>
        </Link>

        <Link
          href={'/profile'}
          className={`relative inline-flex flex-col items-center justify-center lg:rounded-e-full ${
            isActive('/profile') ? 'text-orange-600 font-bold' : ''
          }`}
        >
          <RiAccountCircle2Fill
            size={25}
            className={`hover:text-orange-500 ${
              isActive('/profile') ? 'text-orange-600' : 'text-gray-500'
            }`}
          />
          <small>Profile</small>
        </Link>
      </div>
    </div>
  );
};

export default BottomMenu;
