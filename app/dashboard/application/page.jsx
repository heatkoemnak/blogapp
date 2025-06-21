'use client';
import React, { Fragment, useEffect, useState } from 'react';
import ApplicationDashboardLayout from '@/app/components/Dashboard/ApplicationDashboardLayout';
import AllApplication from '@/app/components/ui/jobs/allApplication';
import HeaderSection from '@/app/components/ui/Reusable/HeaderSection';
import Link from 'next/link';
import { CgExport, CgImport } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import { LiaEditSolid } from 'react-icons/lia';
import Processing from '@/app/components/ui/Reusable/Processing';
import useSWR from 'swr';
import { TbFolderOpen } from 'react-icons/tb';
import { IoMdArrowDropright } from 'react-icons/io';
const fetcher = (url) => fetch(url).then((res) => res.json());

const Applications = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [groupByPosition, setGroupByPosition] = useState(false);
  const { data, error, isLoading } = useSWR(`/api/jobs/apply`, fetcher, {});
  console.log(data);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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

  const handleToggle = (id) => {
    const currentIndex = selected.indexOf(id);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleGroupByPosition = () => {
    setGroupByPosition(!groupByPosition);
  };

  const groupedApplications = groupByPosition
    ? data.reduce((acc, current) => {
        const key = current.position;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(current);
        return acc;
      }, {})
    : { All: data };

  if (isLoading) {
    return <Processing state="Loading..." />;
  }
  return (
    <ApplicationDashboardLayout>
      <HeaderSection title="Applications" />
      <div className="flex items-center mt-4 px-4 justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
        <div className="relative flex items-center gap-2">
          {/* <button
            id="dropdownActionButton"
            onClick={toggleDropdown}
            className="flex gap-1 items-center text-white bg-teal-400 border border-gray-300 focus:outline-none hover:bg-teal-500 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Edit
            <LiaEditSolid />
          </button> */}
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
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
        <button
          id="dropdownActionButton"
          onClick={handleGroupByPosition}
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          {groupByPosition ? (
            <>
              <TbFolderOpen className="h-5 w-5 mr-2" />
              Ungroup
            </>
          ) : (
            <>
              <TbFolderOpen className="h-5 w-5 mr-2" />
              Group by Position
            </>
          )}
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-600 bg-gray-100 border border-gray-200">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => {
                    const newSelected = data?.map((app) => app.id);
                    setSelected(newSelected);
                  }}
                  aria-label="Select all"
                />
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Apply for
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Tel
            </th>
            <th scope="col" className="px-6 py-3">
              Resume
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedApplications).map(([key, value]) => (
            <Fragment key={key}>
              <tr className="bg-gray-200 border">
                <th
                  colSpan="16"
                  className="border p-2 bg-gray-50 shadow-inner text-start"
                >
                  <div className="flex items-center gap-1">
                    <IoMdArrowDropright />

                    {key}
                  </div>
                </th>
              </tr>
              {value?.map((application) => (
                <tr
                  key={application.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selected.includes(application.id)}
                        onChange={() => handleToggle(application.id)}
                        aria-label={`Select ${application.name}`}
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="ps-3">
                      <div className="text-base font-md">
                        {application.name}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">{application.email}</td>
                  <td className="px-6 py-4">{application.position}</td>
                  <td className="px-6 py-4">{application?.Job?.Company?.name}</td>
                  <td className="px-6 py-4">{application.phone}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={application?.attachment}
                      className="flex items-center text-blue-300"
                    >
                      Resume
                    </Link>
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
            </Fragment>
          ))}
        </tbody>
      </table>

      {/* <AllApplication /> */}
    </ApplicationDashboardLayout>
  );
};

export default Applications;
