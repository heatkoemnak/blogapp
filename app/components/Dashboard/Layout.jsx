'use client';
import Link from 'next/link';
import Logo from '../Logo';

import { useSession, signOut, signIn } from 'next-auth/react';
import Image from 'next/image';
import { IoIosSettings } from 'react-icons/io';
import { IoChevronBack, IoLogOut } from 'react-icons/io5';
import { GrOrganization } from 'react-icons/gr';

import { CgWorkAlt } from 'react-icons/cg';
import { TbCheckupList, TbDashboard } from 'react-icons/tb';
import { IoMdApps } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';
import { LuSettings } from 'react-icons/lu';
import { RiDraftLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useParams, usePathname } from 'next/navigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

function Layout({ children }) {
  const { data: session } = useSession();
  const params = useParams();
  const id = params.id;
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');
  const { data, error, isLoading } = useSWR(`/api/jobs/apply`, fetcher, {});

  const currentPath = usePathname();
  console.log(currentPath);

  const DROPDOWN_PROFILE = [
    {
      id: 1,
      icon: <CgProfile className="w-6 h-6 text-teal-500" />,
      title: 'Profile',
      route: '/profile',
    },
    {
      id: 2,
      icon: <IoIosSettings className="w-6 h-6 text-teal-500" />,
      title: 'Setting',
      route: '/setting',
    },
  ];
  const MENU_LIST = [
    {
      name: 'Dashboard',
      icon: <TbDashboard size={25} />,
      route: '/dashboard',
      role: 'candidate',
    },
    {
      name: 'Dashboard',
      icon: <TbDashboard size={25} />,
      role: 'employer',
      route: '/dashboard',
    },
    {
      name: 'Organizations',
      icon: <GrOrganization size={20} />,
      route: '/dashboard/orgs',
      role: 'employer',
    },

    {
      name: 'Jobs',
      icon: <CgWorkAlt size={25} />,
      route: '/dashboard/job.list',
      role: 'employer',
    },
    {
      name: 'Applications',
      icon: <TbCheckupList size={25} />,
      route: '/dashboard/application',
      badge: data?.length,
      role: 'employer',
    },
    {
      name: 'My Applications',
      icon: <IoMdApps size={25} />,
      route: '/dashboard/application',
      role: 'candidate',
    },
    {
      name: 'My CV',
      icon: <RiDraftLine size={25} />,
      route: '/dashboard/user/mycv',
      role: 'candidate',
    },
    {
      name: 'My Profile',
      icon: <CgProfile size={25} />,
      route: '/dashboard/user/profile',
      role: 'candidate',
    },
    {
      name: 'Reports',
      icon: <TbReportAnalytics size={25} />,
      route: '/dashboard/new',
      role: 'employer',
    },
    {
      name: 'Setting',
      icon: <LuSettings size={25} />,
      route: '/dashboard/setting',
      role: 'candidate',
    },
    {
      name: 'Setting',
      icon: <LuSettings size={25} />,
      route: '/dashboard/setting',
      role: 'employer',
    },
  ];
  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full fixed top-0 z-50 flex justify-between border-b items-center bg-white px-6 py-0">
        <div className="flex items-center px-2 py-2 rounded-lg">
          <div className="flex items-center space-x-2 bg-white border py-2.5 px-2.2 rounded-none">
            <Link href="/jobs" className="flex items-center gap-2 px-2">
              <IoChevronBack size={20} />
            </Link>
          </div>
          <div className="flex items-center space-x-2 ml-5">
            <img
              src="https://res.cloudinary.com/dakqa3htw/image/upload/v1746889435/jobspace-high-resolution-logo-transparent_bo4hs2.png"
              alt=""
              width="60"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative group">
            <div className="  flex items-center space-x-2 focus:outline-none">
              <button
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 rounded-full bg-white p-1 border"
              >
                {session?.user?.image ? (
                  <Image
                    width={45}
                    height={45}
                    className="w-10 h-10 rounded-full"
                    src={
                      session?.user?.image ||
                      'https://www.creativefabrica.com/wp-content/uploads/2022/11/21/Beautiful-African-American-Brown-Skin-Woman-Avatar-47788434-1.png'
                    }
                    alt={session?.user?.name || 'Anonymous'}
                  />
                ) : (
                  <div className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-full">
                    {getInitial(session?.user?.name)}
                  </div>
                )}
              </button>
              <span className="hidden md:block text-gray-700 font-medium">
                {session?.user?.name || 'Quest'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="absolute z-10 right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
              <ul className="py-1 px-4 list-none">
                {DROPDOWN_PROFILE.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 mb-1 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-700"
                  >
                    <button>{item.icon}</button>
                    <li>
                      <Link href={item.route} className="block py-2 px-2 ">
                        {item.title}
                      </Link>
                    </li>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="flex  gap-1 items-center w-full px-4  py-2 text-left border-t-2 text-gray-700 transition-colors duration-200 "
                >
                  <IoLogOut className="w-6 h-6 text-teal-500" />
                  <span className="px-2">Logout</span>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="flex gap-5 h-screen">
        <aside className="fixed top-16 left-0 w-64 border bg-white text-teal-800 px-4 h-screen">
          <nav className="px-2 pt-4 pb-8 border-teal-600">
            <ul className="space-y-3 list-none">
              {MENU_LIST.filter((item) => item.role == session?.user?.role).map(
                (menu, index) => (
                  <li key={index}>
                    <Link
                      href={menu.route}
                      className={`flex items-center justify-between py-2 px-4 rounded-lg hover:bg-teal-300 hover:text-white transition duration-150 ${
                        currentPath === menu.route
                          ? 'bg-teal-400 text-white'
                          : ''
                      }`}
                    >
                      <span className="flex items-center space-x-3">
                        <span>{menu.icon}</span>
                        <span className="font-medium">{menu.name}</span>
                      </span>
                      {menu.badge && (
                        <span className="bg-orange-500 text-white font-bold px-2 py-0.5 text-xs rounded-lg">
                          {menu.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>
        <section
          style={{ marginLeft: '270px', width: '100%' }}
          className="rounded-lg"
        >
          {children}
        </section>
      </div>
    </main>
  );
}
export default ProtectedRoute(Layout);
