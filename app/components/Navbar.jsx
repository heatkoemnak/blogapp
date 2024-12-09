'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaRegEdit } from 'react-icons/fa';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  const [show, setShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');

  return (
    <nav className="px-5 max-w-8xl mx-auto border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Logo />

        <div className="lg:hidden flex items-center">
          {status === 'authenticated' ? (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex w-full justify-center items-center gap-1 rounded-full px-2 py-2x text-sm font-semibold text-gray-900"
            >
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  width={30}
                  height={30}
                  alt="Profile Image"
                  className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full">
                  {getInitial(session?.user?.name)}
                  {/* K */}
                </div>
              )}
            </button>
          ) : (
            <button
              className="text-gray-900 hover:text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}
        </div>
        {/* search */}
        <div className="hidden lg:flex items-center space-x-2 bg-white py-1 px-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="outline-none bg-transparent"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* close search */}

        <div className="hidden lg:flex space-x-5 items-center">
          <Link
            href="/blogs"
            className={
              currentPath === '/blogs'
                ? 'text-blue-500 font-semibold'
                : 'text-gray-900'
            }
          >
            Blogs
          </Link>
          <Link
            href="/my-blog"
            className={
              currentPath === '/my-blog'
                ? 'text-blue-500 font-semibold'
                : 'text-gray-900'
            }
          >
            My dashboard
          </Link>
          <Link
            className={`flex gap-2 items-center text-white bg-gradient-to-r from-orange-500 to-purple-500 hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  ${
              currentPath === '/create-post'
                ? 'text-blue-500 font-semibold'
                : 'text-gray-900'
            }`}
            href="/create-post"
          >
            <FaRegEdit />
            Write
          </Link>
          {status === 'authenticated' ? (
            <>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center items-center rounded-full px-2 py-2 ring-pink-500 ring-inset border bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 hover:bg-gray-50"
                    onClick={() => setShow(!show)}
                  >
                    <span className="mr-2">{session?.user?.name}</span>
                    {session?.user?.image ? (
                      <Image
                        src={session?.user?.image}
                        width={25}
                        height={25}
                        alt="Profile Image"
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-7 h-7 flex items-center justify-center bg-gray-500 text-white rounded-full">
                        {getInitial(session?.user?.name)}
                      </div>
                    )}
                  </button>
                </div>
                {show && <ProfileDropdown />}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 "
                href="/login"
              >
                Login or Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="p-4">
            <ProfileDropdown />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
