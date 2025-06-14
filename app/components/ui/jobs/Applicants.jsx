'use client';

import React from 'react';
import ApplicantsTable from '@/app/components/ui/jobs/ApplicantsTable';

const applicantsList = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    resume: 'https://example.com/john-doe-resume.pdf',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '098-765-4321',
    resume: 'https://example.com/jane-doe-resume.pdf',
  },
  {
    id: 3,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    phone: '555-555-5555',
    resume: 'https://example.com/bob-smith-resume.pdf',
  },
];

const Applicants = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>
      <ApplicantsTable applicants={applicantsList} />
    </div>
  );
};

export default Applicants;

