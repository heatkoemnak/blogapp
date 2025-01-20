'use client';

import { useState } from 'react';
import { generateJobRecords } from '../../fakeData/generateJobRecords';
import LatestJobs from './LatestJobs';

const JobRows = () => {
  const jobLists = generateJobRecords();
  console.log(jobLists);

  return (
    <div class="w-full flex justify-center h-screen">
      <div class="w-full h-full flex flex-col">
        <div class="bg-white  text-blue-gray-600 font-semibold text-lg  px-5 py-3 border-b border-gray-300">
          Latest jobs
        </div>
        <div
          class="w-full h-full overflow-auto bg-white"
          id="journal-scroll"
        >
          {jobLists.map((job, index) => (
            <LatestJobs job={job} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobRows;
