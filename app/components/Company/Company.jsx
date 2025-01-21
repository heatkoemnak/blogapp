'use client';

import { useBlogContext } from '@/app/context/BlogProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Company = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const router = useRouter();
  const { companies, isLoading } = useBlogContext();

  useEffect(() => {
    // Restore selected company from local storage on component mount
    const savedCompany = localStorage.getItem('selectedCompany');
    const savedCompanyId = localStorage.getItem('selectedCompanyId');

    if (savedCompany && savedCompanyId) {
      setSelectedCompany(savedCompany);
      setSelectedCompanyId(savedCompanyId);
    }
  }, []);

  const handleCompanySelection = (company) => {
    setSelectedCompany(company.name);
    setSelectedCompanyId(company.id);

    // Save selected company to local storage
    localStorage.setItem('selectedCompany', company.name);
    localStorage.setItem('selectedCompanyId', company.id);
  };

  return (
    <div className="max-w-7xl h-screen p-5 my-5 bg-blue-gray-50 mx-auto">
      <div className="flex justify-between px-6 items-center">
        <div>
          <h3 className="text-2xl font-semibold">Your Company</h3>
          <p className="text-sm text-gray-600">
            Select a company to create a job
          </p>
        </div>
        <div>
          <button
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 flex items-center"
            onClick={() => router.push('/company/new')}
          >
            Create New Company
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <button
            type="button"
            className="py-2 px-4 flex justify-center items-center text-gray-800 bg-transparent focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
            Loading
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap sm:mx-auto sm:mb-2 -mx-2 p-4">
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <div key={index} className="p-2 sm:w-1/2 w-full">
                <div
                  onClick={() => handleCompanySelection(company)}
                  className={`bg-gray-100 border border-blue-gray-300 rounded flex p-4 h-full items-center cursor-pointer ${
                    selectedCompany === company?.name
                      ? 'border-2 border-cyan-700'
                      : ''
                  }`}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="font-medium">{company?.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No companies found. Create a new one!</p>
          )}
        </div>
      )}
      {!isLoading && selectedCompany && (
        <div className="px-6">
          <p className="text-sm font-medium mb-4">
            Selected Company: <span className="text-cyan-700">{selectedCompany}</span>
          </p>
          <button
            className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 flex items-center"
            onClick={() => {
              router.push(`/company/${selectedCompanyId}`);
            }}
          >
            Create Job for Selected Company
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Company;
