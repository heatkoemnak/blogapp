'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CgClose } from 'react-icons/cg';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';
import { HiMenu } from 'react-icons/hi';
import { links } from '../data';
import Search from './ui/Search';
import { useDebounce } from 'use-debounce';

const Navbar = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const currentPath = usePathname();
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');


  const [searchQuery, setSearchQuery] = useState('');
  const [query] = useDebounce(searchQuery, 500);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) {
      router.push(`/blogs`);
    } else {
      router.push(`/blogs?search=${query}`);
    }
  }, [query, router]);

  // Handle clicks outside the dropdown menus
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }

    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setMobileSearchOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="px-5 max-w-9xl mx-auto border-b bg-white">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        {/* Mobile Search */}
        {!mobileSearchOpen ? (
          <div
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="lg:hidden cursor-pointer"
          >
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
        ) : (
          <div className="flex items-center gap-1">
            <CgClose
              onClick={() => setMobileSearchOpen((prev) => !prev)}
              size={25}
              className="text-orange-600"
            />
            <span>Close search</span>
          </div>
        )}

        {/* Logo */}
        <Logo />

        {/* Desktop Search */}
        <Search placeholder="Search..." background="bg-gray-50" />

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-5 items-center">
          {links.map(({ href, label, icon }, index) => (
            <Link
              key={index}
              href={href}
              className={
                currentPath === href
                  ? 'text-orange-500 font-semibold'
                  : href === '/create-post'
                  ? 'flex gap-2 items-center bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 text-white'
                  : 'text-gray-900'
              }
            >
              {icon && icon}
              {label}
            </Link>
          ))}
          {status === 'authenticated' ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 rounded-full bg-white px-2 py-2 border"
              >
                <span>{session?.user?.name}</span>
                {session?.user?.image ? (
                  <Image
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    src={
                      session?.user?.image ||
                      'https://www.creativefabrica.com/wp-content/uploads/2022/11/21/Beautiful-African-American-Brown-Skin-Woman-Avatar-47788434-1.png'
                    }
                    alt={session?.user?.name || 'Anonymous'}
                  />
                ) : (
                  <div className="w-7 h-7 flex items-center justify-center bg-gray-500 text-white rounded-full">
                    {getInitial(session?.user?.name)}
                  </div>
                )}
              </button>
              {showDropdown && <ProfileDropdown />}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-gray-900 border px-5 py-2 rounded-xl hover:text-orange-500"
            >
              Login or Create Account
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            {!mobileMenuOpen ? (
              <HiMenu size={25} />
            ) : (
              <CgClose size={30} className="text-orange-600" />
            )}
          </button>
        </div>
      </div>
      {mobileSearchOpen && (
        <div ref={searchRef} className="lg:hidden">
          <form className="w-full h-15 py-5 ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                value={searchQuery}
                type="search"
                id="default-search"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-2 ps-4 text-sm text-gray-500 placeholder:text-gray-600 border border-gray-200 rounded-full bg-white  "
                placeholder="Search everything here..."
                required
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden">
          {status === 'authenticated' ? (
            <ProfileDropdown />
          ) : (
            <Link
              href="/login"
              className="block text-center py-3 text-orange-500 font-semibold"
            >
              Login or Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
