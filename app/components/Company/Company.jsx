'use client';

import { useBlogContext } from '@/app/context/BlogProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Company = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const router = useRouter();
  const { companies } = useBlogContext();
  console.log(companies);

  const handleCompanySelection = (company) => {
    setSelectedCompany(company.name);
    setSelectedCompanyId(company.id);
  };

  return (
    <div className="max-w-7xl py-5 bg-blue-gray-100 mx-auto h-full">
      <div className="flex justify-between items-center">
        <div className="p-6">
          <h3 className="text-2xl font-semibold">Your Company</h3>
          <p className="text-sm text-gray-600">
            Select a company to create a job
          </p>
        </div>
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
      <div className="flex flex-wrap sm:mx-auto sm:mb-2 -mx-2 p-4">
        {companies.map((company, index) => (
          <div key={index} className="p-2 sm:w-1/2 w-full">
            <div
              onClick={() => handleCompanySelection(company)}
              className={`bg-gray-100 rounded flex p-4 h-full items-center cursor-pointer ${
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
        ))}
      </div>
      <div className="px-6">
        {selectedCompany && (
          <p className="text-sm font-medium mb-4">
            Selected Company:{' '}
            <span className="text-cyan-700">{selectedCompany}</span>
          </p>
        )}
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
    </div>
  );
};

export default Company;
