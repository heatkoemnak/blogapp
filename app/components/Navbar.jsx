'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaRegEdit } from 'react-icons/fa';
import Logo from './Logo';

const Navbar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  const [show, setShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const popupRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShow(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(!mobileMenuOpen);
    }
  };

  useEffect(() => {
    if (show || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, mobileMenuOpen]);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');

  return (
    <nav className="px-5 max-w-8xl mx-auto border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Logo />
        <div className="lg:hidden flex items-center">
          {status === 'authenticated' ? (
            <button
              type="button"
              className="flex w-full justify-center items-center gap-1 rounded-full px-2 py-2x bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
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
            <div className="relative inline-block text-left" ref={popupRef}>
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
              {show && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  onClick={() => setShow(false)}
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    {session && (
                      <div className="flex flex-col">
                        <span className="block font-bold px-4 py-2 text-sm text-gray-700">
                          {session?.user?.name}
                        </span>
                        <span className="block text-sm px-4 text-gray-700">
                          {session?.user?.email}
                        </span>
                      </div>
                    )}
                    <Link
                      href="/create-post"
                      onClick={() => setShow(false)}
                      className="block hover:underline px-4 py-2 text-sm text-gray-700"
                    >
                      Create post
                    </Link>

                    <Link
                      href="/my-blog"
                      onClick={() => setShow(false)}
                      className="block hover:underline px-4 py-2 text-sm text-gray-700"
                    >
                      My dashboard
                    </Link>
                    <div className="mx-2 my-2">
                      <button
                        type="submit"
                        className="block w-full text-center font-bold text-white rounded-md bg-slate-500 hover:bg-slate-800 py-2 text-sm"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
        <div className="lg:hidden bg-white border-t" ref={mobileMenuRef}>
          <div className="p-4">
            <Link
              href="/blogs"
              className={`block py-2 ${
                currentPath === '/blogs'
                  ? 'text-blue-500 font-semibold'
                  : 'text-gray-900'
              }`}
            >
              Blogs
            </Link>
            <Link
              href="/my-blog"
              className={`block py-2 ${
                currentPath === '/my-blog'
                  ? 'text-blue-500 font-semibold'
                  : 'text-gray-900'
              }`}
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
                <div className="flex flex-col py-2">
                  <span className="font-bold text-gray-700">
                    {session?.user?.name}
                  </span>
                  <span className="text-sm text-gray-700">
                    {session?.user?.email}
                  </span>
                </div>
                <div className="py-2">
                  <div className="flex items-center gap-2">
                    <Link
                      class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 py-2">
                <Link href="/login">
                  <button
                    type="submit"
                    className="lg:p-2 w-full text-center font-bold text-white rounded-full bg-slate-800 hover:bg-slate-500 p-4 text-sm"
                  >
                    Login or Create account
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
