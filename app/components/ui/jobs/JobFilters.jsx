'use client';

import { useState } from 'react';
import JobIndustry from '../DropdownFilters/JobIndustry';
import { JobType } from '../DropdownFilters/JobType';
import { JobLevel } from '../DropdownFilters/JobLevel';
import { SalaryRange } from '../DropdownFilters/SalaryRange';
import { JobLocation } from '../DropdownFilters/JobLocation';

function JobFilters() {
  const [showJobType, setShowJobType] = useState('');
  const [showJobIndustry, setShowJobIndustry] = useState('');
  const [showJobLevel, setShowJobLevel] = useState('');
  const [showSalaryRange, setShowSalaryRange] = useState('');
  const [showJobLocation, setShowJobLocation] = useState('');

  console.log(showJobType);
  console.log(showJobIndustry);
  console.log(showJobLevel);
  console.log(showSalaryRange);
  console.log(showJobLocation);

  return (
    <div className="flex flex-col md:flex-row items-center my-5 justify-between gap-1 md:gap-4">
      <JobIndustry setShowJobIndustry={setShowJobIndustry} />
      <JobType setShowJobType={setShowJobType} />
      <JobLevel setShowJobLevel={setShowJobLevel} />
      <SalaryRange setShowSalaryRange={setShowSalaryRange} />
      <JobLocation setShowJobLocation={setShowJobLocation} />
    </div>
  );
}

export default JobFilters;
