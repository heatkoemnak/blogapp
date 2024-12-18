'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CgClose } from 'react-icons/cg';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';
import { HiMenu } from 'react-icons/hi';
import { links } from '../data';
import Search from './ui/Search';

const Navbar = () => {
  const { status, data: session } = useSession();
  const [show, setShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');

  return (
    <nav className="px-5 max-w-9xl mx-auto border-b bg-white ">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        <div className="lg:hidden cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* <IoSearchCircle className="lg:hidden cursor-pointer" size={35} /> */}
        <Logo />

        {/* Desktop Screen */}
        <Search placeholder="Search..." background={'bg-gray-50'} />
        <div className="hidden lg:flex space-x-5 items-center">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={
                currentPath === link.href
                  ? 'text-orange-500 font-semibold'
                  : link.href === '/create-post'
                  ? `flex gap-2 items-center bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 text-white`
                  : 'text-gray-900'
              }
            >
              {link.icon && link.icon}
              {link.label}
            </Link>
          ))}

          {status === 'authenticated' ? (
            <>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center items-center rounded-full px-2 py-2 ring-gray-500 ring-inset border bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 hover:bg-gray-50"
                    onClick={() => setShow(!show)}
                  >
                    <span className="mr-2">{session?.user?.name}</span>
                    {session?.user?.image ? (
                      <Image
                        src={session?.user?.image}
                        width={30}
                        height={30}
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
                className="text-gray-900 bg-gray-150  border-gray-100 hover:text-orange-500 focus:ring-1 focus:outline-none focus:ring-gray-100 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:border-gray-700 me-2 "
                href="/login"
              >
                Login or Create Account
              </Link>
            </div>
          )}
        </div>

        {/* mobile screen */}

        <div className="lg:hidden flex items-center">
          {session ? (
            <>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex w-full justify-center items-center gap-1 rounded-full px-2 py-2x text-sm font-semibold text-gray-900"
              >
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    width={32}
                    height={32}
                    alt="Profile Image"
                    className="flex items-center justify-center bg-gray-500 text-white rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full">
                    {getInitial(session?.user?.name)}
                    {/* K */}
                  </div>
                )}
              </button>
            </>
          ) : (
            <button
              className="text-gray-900 hover:text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {!mobileMenuOpen ? (
                // <button
                //   type="button"
                //   onClick={() => signOut()}
                //   className="flex items-center space-x-3 py-2 px-4 w-full   text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                // >
                //   <svg
                //     xmlns="http://www.w3.org/2000/svg"
                //     aria-hidden="true"
                //     className="w-5 h-5"
                //     width={24}
                //     height={24}
                //     viewBox="0 0 24 24"
                //     strokeWidth={2}
                //     stroke="currentColor"
                //     fill="none"
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //   >
                //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                //     <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                //     <path d="M9 12h12l-3 -3" />
                //     <path d="M18 15l3 -3" />
                //   </svg>
                //   <span>Logout</span>
                // </button>
                <HiMenu size={25} />
              ) : (
                <CgClose size={30} className=" text-orange-600 rounded-md" />
              )}
            </button>
          )}
        </div>
        {/*end mobile screen */}
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <ProfileDropdown />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
