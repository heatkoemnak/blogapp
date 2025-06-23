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
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const Applications = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [groupByPosition, setGroupByPosition] = useState(false);
  const { data, error, isLoading } = useSWR(session?.user?.role ==='candidate' ? `/api/jobs/applications/users/${session?.user?.id}`: `/api/jobs/apply?email=${session?.user?.email}` , fetcher, {
  });
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
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
  const handleStatusChange =(id, newStatus) => {
     updateApplicationStatus(id, newStatus)
  }

  async function updateApplicationStatus(id, newStatus) {
  setLoadingId(id);
  setError(null);
  try {
    const res = await fetch(`/api/jobs/applications/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error('Failed to update status');
    }

    await mutate(`/api/jobs/apply?email=${session?.user?.email}`);
  } catch (error) {
    setError(error.message);
    throw error;
  } finally {
    setLoadingId(null);
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'public':
      return 'Pending';
    case 'reviewing':
      return 'Reviewing';
    case 'shortlisted':
      return 'Shortlisted';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    default:
      return 'Unknown';
  }
};



  const groupedApplications = groupByPosition
    ? data?.reduce((acc, current) => {
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
          {
            selected.length > 0 && (
              <button
                onClick={() => {
                  selected.forEach((id) => {
                    updateApplicationStatus(id, 'accepted')
                      .then(() => {
                        console.log(`Application ${id} updated to accepted`);
                      })
                      .catch((error) => {
                        console.error(`Error updating application ${id}:`, error);
                      });
                  });
                  setSelected([]);
                }}
                className="inline-flex items-center text-white bg-green-500 border border-gray-300 focus:outline-none hover:bg-green-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Accept Selected
              </button>
            )
          }
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
            <th scope="col" className="px-6 py-3 items-center">
              {
                session?.user?.role === 'employer' ?
                  'Applicant': 'Name'
              }
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
              View
            </th>
            <th scope="col" className="px-6 py-3">
              Status
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
                  <td className="px-6 py-2">
                    {session?.user?.role === 'employer' ? (
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
                        disabled={loadingId === application.id}
                        className="border rounded-md text-sm px-2 py-1 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="public" className='text-blue-600'>Pending</option>
                        <option value="reviewing" className='text-yellow-600'>Reviewing</option>
                        <option value="shortlisted" className='text-green-600'>Shortlisted</option>
                        <option value="accepted" className='text-green-700 font-semibold'>Accepted</option>
                        <option value="rejected" className='text-red-600'>Rejected</option>
                      </select>
                    ) :''
                    // (
                    //   <span
                    //     className={
                    //       application.status === 'public'
                    //         ? 'text-blue-600'
                    //         : application.status === 'reviewing'
                    //         ? 'text-yellow-600'
                    //         : application.status === 'shortlisted'
                    //         ? 'text-green-600'
                    //         : application.status === 'accepted'
                    //         ? 'text-green-700 font-semibold'
                    //         : 'text-red-600'
                    //     }
                    //   >
                    //     {getStatusLabel(application.status)}
                    //   </span>
                    // )
                    }
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
                          href={`/dashboard/application/${application.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    <td className="px-6 py-4">
                      {session?.user?.role === 'employer' ? (
                        <button
                          onClick={() => {
                            if (application.status === 'public') {
                              handleStatusChange(application?.id, 'reviewing');
                            } else if (application.status === 'reviewing') {
                              handleStatusChange(application?.id, 'shortlisted');
                            } else if (application.status === 'shortlisted') {
                              handleStatusChange(application?.id, 'accepted');
                            } else if (application.status === 'accepted') {
                              handleStatusChange(application?.id, 'rejected');
                            }
                          }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {loadingId === application.id ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
                            </svg>
                          ) : (
                            getStatusLabel(application.status)
                          )}
                        </button>
                      ) : (
                        <span className={
                          application.status === 'public' ? 'text-blue-600' :
                          application.status === 'reviewing' ? 'text-yellow-600' :
                          application.status === 'shortlisted' ? 'text-green-600' :
                          application.status === 'accepted' ? 'text-green-600' :
                          'text-red-600'
                        }>
                          {getStatusLabel(application.status)}
                        </span>
                      )}
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
