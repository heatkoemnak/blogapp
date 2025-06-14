'use client';

import { TableCellsIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { TbFolderOpen } from 'react-icons/tb';
export default function AllApplication() {
  const [selected, setSelected] = useState([]);
  const [groupByPosition, setGroupByPosition] = useState(false);
  // const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('applications:', jobs);

  const jobApplications = [
    {
      id: '67ea8d82fd351c00a8f04374',
      name: 'HEAT KOEMNAK',
      postiton: 'Software Support',
      email: 'heatkoemnak@gmail.com',
      about:
        'Dear sir/Madam \nI am writing to interest in position Software Support',
      attachment:
        'https://res.cloudinary.com/dakqa3htw/image/upload/v1743424899/blog_images/ovoqvfmmo46omblt7fpa.pdf',
      userID: '678ea6cea9d303f01f5b9399',
      jobID: '67cababee063187577437674',
      Job: {
        id: '67cababee063187577437674',
        title: 'Software Support',
        pax: 1,
        description:
          '<p>GIANTFOCUS Co., Ltd is a leading agency of fully digital marketing solutions that maximize results and demonstrate return on marketing investment. We provide the framework for organizations to apply quantitative marketing strategies to their marketing programs.</p><p><br></p><p>From designing, developing, and optimizing websites, to increasing sales through tactical digital marketing activities, we work with our clients to raise their brand awareness, generate more sales opportunities, and maximize their marketing budget ROI.</p><p><br></p><p><span style="color: rgb(134, 136, 144);">We implement a range of digital marketing services to drive results for clients. We offer services in the areas of Branding/Creative, Website Design, Mobile APP Development, Video/Photography, Digital Marketing (Social Media, Google Ads &amp; SEO), Digital PR/Influencer &amp; CRM Software in Cambodia.</span></p>',
        icon: 'https://res.cloudinary.com/dakqa3htw/image/upload/v1741339326/blog_images/dykmvr6udzz6c8psvpaz.png',
        authorEmail: 'recruiter@gmail.com',
        contact: [' info@giantfocus.com', ' +855 98 239900 | +855 98 900022'],
        published: true,
        likes: 0,
        views: 0,
        publishedAt: 'Mar 7, 2025',
        closeDate: 'Mar 7, 2025',
        gender: 'Male/Female',
        qualification: "Bachelor's Degree",
        createdAt: '2025-03-07T09:22:06.545Z',
        updatedAt: '2025-03-07T09:22:06.545Z',
        jobCategoryId: '6777e973188f92efbf07bff2',
        companyId: '6790800f7dceb0c60fccf9cb',
        jobTypeId: '6776ab1de5bb7aa7b1bd3b2d',
        jobIndustryId: '67768f17e5bb7aa7b1bd3b2b',
        jobLevelId: '6776afbcd62ee437a8224f9a',
        jobLocationId: '6776b31bd62ee437a8224f9c',
        jobSalaryId: '6776b196d62ee437a8224f9b',
        communesId: null,
        districtsId: null,
        provinceCityId: '67781e0de1198506d837d1c7',
      },
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/apply`);
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
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
    ? jobs.reduce((acc, current) => {
        const key = current.position;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(current);
        return acc;
      }, {})
    : { All: jobs };

  return (
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
                    <td className="border p-2 whitespace-nowrap">{app.name}</td>
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
                 
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
