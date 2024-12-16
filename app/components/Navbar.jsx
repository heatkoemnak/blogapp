'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IoSearchCircle } from 'react-icons/io5';
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
    <nav className="px-5 max-w-8xl mx-auto border-b">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        <IoSearchCircle className="lg:hidden cursor-pointer" size={35} />
        <Logo />

        {/* Desktop Screen */}
        <Search />
        <div className="hidden lg:flex space-x-5 items-center">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={
                currentPath === link.href
                  ? 'text-blue-500 font-semibold'
                  : link.href === '/create-post'
                  ? `flex gap-2 items-center bg-gradient-to-r from-orange-500 to-purple-500 hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 text-white`
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
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 "
                href="/login"
              >
                Login or Create Account
              </Link>
            </div>
          )}
        </div>

        {/* mobile screen */}

        <div className="lg:hidden flex items-center">
          {status == 'authenticated' ? (
            <>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex w-full justify-center items-center gap-1 rounded-full px-2 py-2x text-sm font-semibold text-gray-900"
              >
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    width={25}
                    height={25}
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
                <HiMenu size={25} />
              ) : (
                <CgClose
                  size={30}
                  className="bg-gradient-to-r from-orange-500 to-purple-500 p-1 text-white rounded-md"
                />
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
