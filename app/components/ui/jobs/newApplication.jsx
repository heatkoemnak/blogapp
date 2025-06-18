'use client';

import {
  TableCellsIcon,
} from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { TbFolderOpen } from 'react-icons/tb';
const jobApplications = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    position: 'Software Engineer',
    linkedin: 'https://www.linkedin.com/in/johndoe/',
    portfolio: 'https://www.example.com/portfolio',
    resume: 'https://www.example.com/resume.pdf',
    coverLetter: 'https://www.example.com/cover-letter.pdf',
    location: 'New York, NY',
    education: 'Bachelor of Science in Computer Science',
    // experience: '3+ years of experience in software development',
    // skills: 'JavaScript, React, Node.js, MongoDB',
    // expectedSalary: '$100,000',
    // status: 'Pending',
    // appliedDate: '2022-01-01',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '098-765-4321',
    position: 'Data Scientist',
    linkedin: 'https://www.linkedin.com/in/janedoe/',
    portfolio: 'https://www.example.com/portfolio',
    resume: 'https://www.example.com/resume.pdf',
    coverLetter: 'https://www.example.com/cover-letter.pdf',
    location: 'San Francisco, CA',
    education: 'Master of Science in Data Science',
    // experience: '5+ years of experience in data analysis',
    // skills: 'Python, TensorFlow, PyTorch, SQL',
    // expectedSalary: '$150,000',
    // status: 'Rejected',
    // appliedDate: '2022-02-01',
  },
  {
    id: 3,
    name: 'Mike Smith',
    email: 'mike.smith@example.com',
    phone: '555-555-5555',
    position: 'Software Engineer',
    linkedin: 'https://www.linkedin.com/in/mikesmith/',
    portfolio: 'https://www.example.com/portfolio',
    resume: 'https://www.example.com/resume.pdf',
    coverLetter: 'https://www.example.com/cover-letter.pdf',
    location: 'Los Angeles, CA',
    education: 'Master of Business Administration',
    // experience: '7+ years of experience in product management',
    // skills: 'Agile, Scrum, Lean, product development',
    // expectedSalary: '$120,000',
    // status: 'Approved',
    // appliedDate: '2022-03-01',
  },
  {
    id: 4,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '555-555-5555',
    position: 'UX Designer',
    linkedin: 'https://www.linkedin.com/in/bobjohnson/',
    portfolio: 'https://www.example.com/portfolio',
    resume: 'https://www.example.com/resume.pdf',
    coverLetter: 'https://www.example.com/cover-letter.pdf',
    location: 'New York, NY',
    education: 'Bachelor of Fine Arts in Graphic Design',
    // experience: '3+ years of experience in UX design',
    // skills: 'Sketch, Figma, Adobe XD, user experience',
    // expectedSalary: '$80,000',
    // status: 'Pending',
    // appliedDate: '2022-04-01',
  },
  {
    id: 5,
    name: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    phone: '555-555-5555',
    position: 'Digital Marketing Manager',
    linkedin: 'https://www.linkedin.com/in/sarahlee/',
    portfolio: 'https://www.example.com/portfolio',
    resume: 'https://www.example.com/resume.pdf',
    coverLetter: 'https://www.example.com/cover-letter.pdf',
    location: 'Chicago, IL',
    education: 'Master of Business Administration',
    // experience: '5+ years of experience in digital marketing',
    // skills: 'Google Analytics, AdWords, Facebook Ads, marketing strategy',
    // expectedSalary: '$100,000',
    // status: 'Approved',
    // appliedDate: '2022-05-01',
  },
];

export default function NewApplications() {
  const [selected, setSelected] = useState([]);
  const [groupByPosition, setGroupByPosition] = useState(false);

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
    ? jobApplications.reduce((acc, current) => {
        const key = current.position;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(current);
        return acc;
      }, {})
    : { All: jobApplications };

  return (
    <>
      <div className="w-full">
        <div className="mb-4 flex gap-2 justify-between items-center text-nowrap">
          <div>
            <button className="px-4 ml-2 py-1 border rounded-full flex items-center">
              <AiOutlineCloudDownload className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>

          <div className="flex grow-1 ">
            <button className="px-4 py-1 border rounded-full flex items-center">
              <TableCellsIcon className="h-5 w-5 mr-2" />
              View Table
            </button>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-1 border rounded-full mr-2 flex items-center"
              onClick={handleGroupByPosition}
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
        </div>
        <div className="">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-nowrap">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => {
                      const newSelected = jobApplications.map((app) => app.id);
                      setSelected(newSelected);
                    }}
                    aria-label="Select all"
                  />
                </th>
                <th className="border p-2 text-nowrap">Name</th>
                <th className="border p-2 text-nowrap">Email</th>
                <th className="border p-2 text-nowrap">Phone</th>
                <th className="border p-2 text-nowrap">Position</th>
                <th className="border p-2 text-nowrap">LinkedIn</th>
                <th className="border p-2 text-nowrap">Portfolio</th>
                <th className="border p-2 text-nowrap">Resume</th>
                <th className="border p-2 text-nowrap">Cover Letter</th>
                <th className="border p-2 text-nowrap">Location</th>
                {/* <th className="border p-2">Education</th> */}
                {/* <th className="border p-2">Experience</th>
                <th className="border p-2">Skills</th>
                <th className="border p-2">Expected Salary</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Applied Date</th> */}
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
                      {key}
                    </th>
                  </tr>
                  {value.map((app) => (
                    <tr key={app.id} className="border">
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          checked={selected.includes(app.id)}
                          onChange={() => handleToggle(app.id)}
                          aria-label={`Select ${app.name}`}
                        />
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        {app.name}
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        {app.email}
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        {app.phone}
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        {app.position}
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        <a
                          href={app.linkedin}
                          target="_blank"
                          className="text-blue-600"
                        >
                          Link
                        </a>
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        <a
                          href={app.portfolio}
                          target="_blank"
                          className="text-blue-600"
                        >
                          Link
                        </a>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          <a
                            href={app.resume}
                            target="_blank"
                            className="text-blue-600"
                          >
                            Resume
                          </a>
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          <a
                            href={app.coverLetter}
                            target="_blank"
                            className="text-blue-600"
                          >
                            Letter
                          </a>
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.location}
                        </div>
                      </td>
                      {/* <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.education}
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.experience}
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.skills}
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.expectedSalary}
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.status}
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {app.appliedDate}
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
