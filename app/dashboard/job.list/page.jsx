'use client';
import React, { useEffect, useState } from 'react';
import JobLayoutDashbord from '@/app/components/Dashboard/JobLayoutDashbord';
import OpenPosition from '@/app/components/ui/jobs/OpenPosition';
import Link from 'next/link';
import HeaderSection from '@/app/components/ui/Reusable/HeaderSection';
import { LiaEditSolid } from 'react-icons/lia';
import { CgExport, CgImport } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import useSWR from 'swr';
import { timeAgo } from '@/app/utils/timeAgo';
import { useSession } from 'next-auth/react';
import Processing from '@/app/components/ui/Reusable/Processing';
import { BiSave } from 'react-icons/bi';
import CompanyForm from '@/app/components/ui/Reusable/CompanyForm';
const fetcher = (url) => fetch(url).then((res) => res.json());

const JobPage = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

  const { data, error, isLoading } = useSWR(
    `/api/jobs/user/${session?.user?.email}`,
    fetcher,
    {}
  );
  console.log(data);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const togglePopup = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  if (isLoading) {
    return <Processing state="Loading..." />;
  }
const toogleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  return (
    <JobLayoutDashbord>
      <HeaderSection title="Jobs" />
      <div className="flex items-center mt-4 px-4 justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
                <div className="relative flex items-center gap-2">
                  <button
                    id="dropdownActionButton"
                    onClick={toogleEdit}
                    className="flex gap-1 items-center text-white bg-teal-400 border border-gray-300 focus:outline-none hover:bg-teal-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    {isEdit ? (
                      <div className="flex gap-1 items-center">
                        <BiSave />
                        <span className="text-white">Save</span>
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center">
                        <span className="text-white">Edit</span>
                        <LiaEditSolid />
                      </div>
                    )}
                  </button>
                  <button
                    id="dropdownActionButton"
                    onClick={toggleDropdown}
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    Action
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute shadow-lg top-10 left-14 z-10 bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-1 list-none text-sm text-gray-700 dark:text-gray-200">
                        <Link
                          href="#"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          <CgImport />
                          Import
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          <CgExport />
                          Export
                        </Link>
                      </ul>
                      <div className="py-1">
                        <Link
                          href="#"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          <RiDeleteBinLine />
                          Delete
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    className=" p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users"
                  />
                </div>
              </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-100 border border-gray-200">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Icon
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Applied
            </th>
            <th scope="col" className="px-6 py-3">
              By
            </th>
            <th scope="col" className="px-6 py-3">
              Posted Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((job) => (
            <tr
              key={job.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={job.icon}
                  alt={job.name}
                />
                {/* <div className="ps-3">
                  <div className="text-base font-semibold">{job.title}</div>
                  <div className="font-normal text-gray-500">
                    {job?.email}
                  </div>
                </div> */}
              </th>
              <td className="px-6 py-4">{job.title}</td>
              <td className="px-6 py-4">{job.Applications?.length}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">{job.Company?.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {timeAgo(job?.createdAt)}
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex justify-start items-center  bg-gray-100">
        <Link href={'/dashboard/job.create'} className="px-4 py-2  text-gray-600">
          {isOpen ? 'Close' : 'Add'} a job...
        </Link>
      </div> */}
      <div className="flex justify-start items-center  bg-gray-100">
        {isEdit && (
          <Link href={'/dashboard/job.list/new'} className="px-4 py-2  text-gray-600">
            {isOpen ? 'Close' : 'Add'} a job...
          </Link>
        )}
        {isOpen && (
          <CompanyForm setIsOpen={setIsOpen} />
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="font-medium text-teal-400 hover:text-indigo-500"
          >
            Previous
          </a>
          <a
            href="#"
            className="font-medium text-teal-400 hover:text-indigo-500"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">3</span> of{' '}
              <span className="font-medium">{data?.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </JobLayoutDashbord>
  );
};

export default JobPage;
