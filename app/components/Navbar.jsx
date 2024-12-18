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
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const currentPath = usePathname();
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');

  // Handle clicks outside the dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="px-5 max-w-9xl mx-auto border-b bg-white">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        {/* Mobile Search */}
        <div
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
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

        {/* Logo */}
        <Logo />

        {/* Desktop Search */}
        <Search placeholder="Search..." background="bg-gray-50" />

        {/* Desktop Menu */}
        <div
          ref={dropdownRef}
          className="hidden lg:flex space-x-5 items-center"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={
                currentPath === link.href
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-900'
              }
            >
              {link.icon && link.icon}
              {link.label}
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
                    src={session?.user?.image}
                    width={30}
                    height={30}
                    alt="Profile"
                    className="rounded-full"
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
        <div ref={mobileMenuRef} className="lg:hidden">
          <input
            className={`outline-none w-full p-2 rounded-full  `}
            type="text"
            placeholder="Search..."
          />
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
