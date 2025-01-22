'use client';

import { useCallback, useEffect, useState } from 'react';
import LatestJobs from './LatestJobs';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const JobRows = ({ jobs }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div class="w-full flex justify-center ">
      <div class="w-full h-auto flex flex-col">
        <div class="bg-white  text-blue-gray-600 font-semibold text-lg  px-5 py-3 border-b border-gray-300">
          Job Urgency
        </div>
        <div class="w-full h-auto bg-white" id="journal-scroll">
          {isLoading ? (
            <div className="flex justify-center">
              <button
                type="button"
                className="py-2 px-4 flex justify-center items-center text-gray-800 bg-transparent focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
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
            <div>
              {jobs?.map((job, index) => (
                <LatestJobs job={job} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRows;
